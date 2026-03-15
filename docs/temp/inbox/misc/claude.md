Tengo todo lo que necesito. Procediendo con la auditoría completa.Ahora tengo el contexto completo. Aquí va la auditoría.

---

# Auditoría técnica y de negocio — Propuesta de segmentación por perfil profesional

**Pregunta central evaluada:** ¿Estamos introduciendo la mínima complejidad necesaria para soportar segmentación real por perfil profesional sin romper el modelo adaptativo actual?

**Respuesta directa:** La dirección arquitectónica es correcta. La propuesta **no debe bloquearse**, pero tiene **tres problemas de fondo** que, si no se corrigen antes de aplicar la migración, crean deuda técnica cara y un bug real en producción.

---

## A. Veredicto general

La propuesta resuelve bien el problema de negocio central: segmentación por perfil sin duplicar preguntas. El modelo `perfil ↔ núcleo ↔ pregunta` es la abstracción correcta para este dominio. El plan de fases es razonable. La migración base está casi bien construida.

Sin embargo hay **un bug real**, **una decisión de ubicación equivocada** y **una zona ciega semántica** que deben resolverse antes de aplicar la migración, porque cambiarlos después implica reescribir lógica de selección, RLS y onboarding.

---

## B. Coherencia de negocio

**Lo que está bien:**

El núcleo temático como unidad de segmentación es la decisión correcta. Segmentar a nivel `perfil ↔ pregunta` sería un desastre operativo: cualquier pregunta nueva requeriría asignaciones manuales por perfil. Segmentar por núcleo es mantenible y expresivo para el dominio editorial.

La bandera `is_universal` en `thematic_nuclei` resuelve elegantemente el caso de preguntas comunes a todos los perfiles sin duplicación. Eso está bien pensado.

Los estados editoriales `draft → review → published → archived` son suficientes para el ciclo de vida real de este banco. No sobran ni faltan.

**Problema 1 — Zona ciega semántica: núcleo vs. área/competencia**

`item_bank` ya tiene `area` y `competency` como categorización temática. La propuesta agrega `thematic_nucleus_id` como una tercera capa sin definir explícitamente la relación entre las tres. ¿Un núcleo es un agrupador de áreas? ¿Un sinónimo de área? ¿Una subdivisión de competencia? El modelo no lo dice.

Esto es un riesgo real: el backfill de Fase 2 tendrá que tomar una decisión implícita que nunca quedó documentada. Si el núcleo es simplemente un alias más fino de `(area, competency)`, entonces estás introduciendo una entidad redundante. Si es una agrupación distinta, necesita estar explícita antes de migrar.

**Recomendación concreta:** Antes de aplicar la migración, definir en el plan si `thematic_nucleus` reemplaza, extiende o se superpone a `area/competency`. Lo más coherente para este dominio sería que un núcleo agrupe múltiples `(area, competency)` pares, o que sea un alias más semántico de un subconjunto de `competency`. Esa decisión debe estar en código (constraint o convención documentada), no solo en prosa.

**Problema 2 — `user_topic_stats` queda huérfana del nuevo modelo**

La tabla `user_topic_stats` tiene `unique(profile_id, area, competency)` como clave de agrupación adaptativa. Es la fuente de verdad para el motor adaptativo: de ahí sale `estimated_level`, `avg_difficulty`, `avg_reasoning_score`. El plan de Fase 3 habla de modificar `selectNextItem`, pero no menciona en ningún momento qué pasa con `user_topic_stats`.

Si la selección migra a núcleos, las estadísticas siguen acumulándose por `(area, competency)`. Eso no es un error fatal en el corto plazo porque `area/competency` aún viven en `item_bank`, pero crea una divergencia: el sistema piensa en núcleos para seleccionar, pero aprende en `(area, competency)`. Esta asimetría limita la evolución futura del motor adaptativo.

No es urgente corregir en esta migración, pero debe documentarse como deuda técnica explícita.

---

## C. Coherencia técnica

**Problema 3 — Bug real: dos fuentes de verdad para publicación**

Este es el problema más urgente. Después de la migración existen en paralelo:

- `item_bank.is_published` (campo original)
- `item_bank.status = 'published'` (campo nuevo)

La política RLS actual dice:

```sql
create policy item_bank_select_published
on public.item_bank
for select
using (is_published = true);
```

La migración hace el backfill en dirección correcta (`is_published = true → status = 'published'`), pero no hace el camino inverso ni unifica la fuente de verdad. Después de la migración, si alguien pone `status = 'archived'` desde el módulo editorial, `is_published` sigue siendo `true` y el ítem sigue siendo visible para todos los usuarios. El nuevo campo editorial no tiene efecto real en RLS.

`selectNextItem` también filtra por `.eq("is_published", true)`, no por `status`. Tiene el mismo bug.

**La corrección necesaria antes de aplicar la migración:**

Opción A (recomendada): Deprecar `is_published` en favor de `status`. Agregar a la migración:

```sql
-- Sincronizar dirección inversa
update public.item_bank
set is_published = false
where status != 'published';

-- Luego en Fase 3, reemplazar la RLS y selectNextItem para usar status
```

Opción B: Mantener `is_published` como campo derivado y agregar un trigger que lo sincronice con `status`. Más costosa pero backward-compatible con cualquier código no auditado.

Sin esto, el módulo editorial tendrá una interfaz que parece controlar la visibilidad pero no la controla.

**Problema 4 — `professional_profile_id` está en la tabla equivocada**

La migración agrega `professional_profile_id` a `profiles` (el perfil base). Pero `learning_profiles` ya existe y contiene `target_role`, `exam_type`, `active_areas`: es el perfil pedagógico del usuario.

Poner el perfil profesional en `profiles` implica que un usuario tiene un solo perfil profesional de por vida. Si un docente quiere practicar para un concurso distinto al de su área original, no puede tener dos perfiles activos. Peor aún, crea una separación conceptual confusa: `profiles` sería a la vez identidad (auth) y categorización de negocio.

El campo debería ir en `learning_profiles`, que es donde ya vive `target_role`. De hecho, la pregunta de auditoría más importante aquí es: **¿`professional_profile_id` es el reemplazo normalizado de `target_role`, o son dos cosas distintas?**

Si `target_role` es free text y `professional_profile_id` es la versión normalizada del mismo concepto, la migración debería ser:
1. Agregar `professional_profile_id` a `learning_profiles`
2. Backfill mapeando `target_role → professional_profile_id`
3. Documentar `target_role` como deprecated

Si son conceptos distintos (el perfil profesional es "quién eres", el `target_role` es "para qué examen estudias"), también van en `learning_profiles` porque ambos son parte del contexto pedagógico, no de la identidad.

**Problema menor — RLS incompleta en las tablas nuevas**

Las tres tablas nuevas tienen política de SELECT para usuarios autenticados, pero ninguna política de INSERT/UPDATE/DELETE. El módulo editorial no podrá operar contra Supabase directamente hasta que esas políticas existan. En el corto plazo se resuelve con service role desde el backend, pero debería documentarse como pendiente explícito, no asumirse silenciosamente.

**Problema menor — Índice compuesto faltante en el hot path**

La consulta principal post-migración será algo como:

```sql
WHERE ib.status = 'published'
  AND ib.is_active = true
  AND ib.thematic_nucleus_id IN (...)
```

Existen índices individuales en `(status)`, `(is_active)` y `(thematic_nucleus_id)`, pero no el compuesto `(thematic_nucleus_id, status, is_active)` que es el que usará el planner en esa consulta. Agregar ese índice a la migración antes de aplicarla.

**Lo que está bien en la migración:**

La separación de `professional_profiles` como entidad propia (con `code`, `name`, `area`, `is_active`) está bien normalizada. El uso de `gen_random_uuid()` es consistente con el resto del esquema. El `unique(profile_id, nucleus_id)` en `profile_thematic_nuclei` previene duplicaciones. Los triggers de `updated_at` son consistentes. La transacción envuelta en `begin/commit` es correcta.

---

## D. Riesgos concretos

**Riesgo crítico:** El bug de doble fuente de verdad en publicación (`is_published` vs `status`) puede hacer que el módulo editorial dé falsa sensación de control. Un editor "archiva" una pregunta, la pregunta sigue apareciendo en práctica. Esto no es un riesgo teórico: es un bug directo que existe el día que se aplique la migración sin corrección.

**Riesgo significativo:** Si `professional_profile_id` va en `profiles`, la arquitectura asume que un usuario = un perfil profesional fijo. Para el caso de uso actual puede funcionar, pero es una decisión restrictiva que se arrepentirá en cuanto aparezca un usuario con doble perfil o que cambie de área.

**Riesgo moderado:** El `priority_weight` en `profile_thematic_nuclei` es un campo que no tiene uso definido en el plan. Si no se usa, es ruido. Si se usa en el futuro para ponderar selección adaptativa, requiere cambios en `selectNextItem`. Dejar ese campo sin documentar su propósito exacta es fuente de confusión editorial.

**Riesgo bajo:** El fallback de usuario sin perfil definido (Fase 4) dice "solo núcleos universales o bloqueo de práctica". Si el banco no tiene suficientes preguntas en núcleos universales, el fallback bloquea la práctica para usuarios nuevos. Esto puede ser un problema de UX en el lanzamiento si los núcleos universales no están correctamente poblaos desde Fase 2.

---

## E. Ajustes recomendados

**Antes de aplicar la migración:**

**E1** — Resolver la doble fuente de verdad. Elegir entre deprecar `is_published` (recomendado) o crear un trigger de sincronización bidireccional. La migración debe incluir la sincronización y el plan debe especificar cuándo se actualiza la RLS y `selectNextItem` para dejar de usar `is_published`.

**E2** — Mover `professional_profile_id` a `learning_profiles`. Documentar si reemplaza o coexiste con `target_role`. Si reemplaza, incluir la ruta de backfill en la misma migración.

**E3** — Agregar el índice compuesto en `item_bank(thematic_nucleus_id, status, is_active)` a la migración.

**E4** — Documentar en el plan (una sección, aunque sea breve) la relación semántica entre `thematic_nucleus` y los campos `area`/`competency` existentes. Esto es obligatorio para que el backfill de Fase 2 sea determinista.

**Antes de Fase 3:**

**E5** — Decidir si `user_topic_stats` se extiende para incluir `thematic_nucleus_id` o si se mantiene en `(area, competency)`. Documentar esa deuda si se deja para después.

**Antes de Fase 5:**

**E6** — Agregar políticas RLS de escritura para `professional_profiles`, `thematic_nuclei`, y `profile_thematic_nuclei` restringidas a `is_admin = true`. Sin esto el módulo editorial solo puede operar con service role.

---

## F. Orden de implementación recomendado

El plan propuesto de 6 fases es correcto en estructura. Ajustar solo esto:

**Fase 1 (migración base):** Aplicar con los tres ajustes de E1, E2 y E3 incorporados. No aplicar sin eso.

**Entre Fase 1 y Fase 2:** Definir y documentar la semántica núcleo/área/competencia (E4). El backfill de Fase 2 no puede hacerse bien sin esa decisión.

**Fase 2 (backfill):** Crear los núcleos, poblar la matriz, y mapear `item_bank` existente. Esta fase es la más riesgosa operativamente porque toca datos en producción. Hacer en ventana de mantenimiento o en horario de bajo tráfico.

**Fase 3 (selectNextItem):** No modificar hasta que Fase 2 esté completa y verificada. Una selección que filtre por núcleos antes de que los ítems tengan núcleo asignado devuelve cero resultados.

**Fase 4 (onboarding):** Puede ir en paralelo con Fase 3 si el fallback a núcleos universales está bien poblado.

**Fases 5 y 6:** Tal como están planteadas.

---

## G. Veredicto puntual sobre la migración 0006

La migración está bien construida como pieza SQL. El uso de `if not exists`, los índices, los triggers y la transacción son correctos.

**No debe aplicarse en su estado actual** por tres razones puntuales:

Primero, no resuelve la doble fuente de verdad en publicación. El backfill solo va en una dirección y la RLS queda inconsistente con el nuevo campo `status`.

Segundo, agrega `professional_profile_id` a `profiles` en lugar de `learning_profiles`, lo que es un error de ubicación semántica con consecuencias en onboarding y flexibilidad futura.

Tercero, falta el índice compuesto que hará eficiente la consulta principal post-migración.

Con esos tres ajustes incorporados, la migración puede aplicarse con confianza.

---

## H. ¿Hay una mejor alternativa?

No en términos de modelo de datos central. La arquitectura `professional_profiles ↔ thematic_nuclei ↔ item_bank` es la correcta para este dominio.

La única alternativa que valdría considerar es más simple y más conservadora: en lugar de crear `thematic_nuclei` como entidad nueva, reusar `area` como el "núcleo" y agregar solo la tabla `profile_areas` (M:M entre perfiles y áreas). Esto evita la pregunta sobre la relación `núcleo vs area/competency` y no introduce nueva nomenclatura.

La razón para **no preferir esa alternativa** es que `thematic_nucleus` como entidad propia tiene valor editorial real: permite nombrar agrupaciones con semántica de dominio que no siempre coincide con las categorías técnicas de `area`. Para un banco de preguntas que va a crecer y a ser administrado por editores no técnicos, esa expresividad vale el costo adicional, siempre que la relación con `area/competency` quede documentada.

La propuesta actual es la correcta. Solo necesita los ajustes descritos antes de ejecutarse.