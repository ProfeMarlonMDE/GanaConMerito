
<img src="https://r2cdn.perplexity.ai/pplx-full-logo-primary-dark%402x.png" style="height:64px;margin-right:32px"/>

# Quiero que hagas una auditoría técnica y de negocio de una propuesta de evolución arquitectónica para mi aplicación GanaConMerito, antes de implementarla.

## Objetivo de la auditoría

Validar si la propuesta es coherente con:

- la arquitectura actual
- la lógica de negocio
- la inteligencia de negocio del banco de preguntas
- el flujo adaptativo de práctica
- el stack tecnológico real
- la futura evolución hacia un módulo administrativo/editorial


## Contexto del producto

GanaConMerito es una aplicación de práctica y evaluación adaptativa para profesionales de distintas áreas. Entre ellos hay docentes de distintas áreas, que en varios casos pueden asemejarse a otros perfiles profesionales en cuanto a conjuntos de preguntas compartidos.

La nueva necesidad es esta:

- distintos perfiles profesionales deben acceder a distintos conjuntos de preguntas
- varios perfiles pueden compartir un mismo conjunto de preguntas
- además existen conjuntos de preguntas que deben ser universales para todos los perfiles


## Hipótesis arquitectónica a auditar

La propuesta actual plantea:

- muchos perfiles profesionales ↔ muchos núcleos temáticos
- cada pregunta pertenece a un núcleo temático principal
- las preguntas universales no se modelan por duplicación sino por núcleos marcados como universales
- la segmentación debe hacerse en el nivel perfil ↔ núcleo, no perfil ↔ pregunta


## Modelo propuesto

Nuevas tablas:

- professional_profiles
- thematic_nuclei
- profile_thematic_nuclei

Extensiones propuestas:

- profiles.professional_profile_id
- item_bank.thematic_nucleus_id
- item_bank.status
- item_bank.is_active
- item_bank.source_type
- item_bank.source_path

Estados editoriales propuestos:

- draft
- review
- published
- archived


## Regla de negocio propuesta

Una pregunta debe estar disponible para un usuario si:

1. está publicada y activa
2. pertenece a un núcleo activo
3. el núcleo es universal, o
4. el núcleo está habilitado para el perfil profesional del usuario

## Arquitectura actual real

Stack:

- Next.js App Router
- TypeScript
- Supabase
- PostgreSQL
- Supabase Auth
- Nginx
- systemd
- Cloudflare
- producción en [https://cnsc.profemarlon.com](https://cnsc.profemarlon.com)

Estado actual del modelo:

- el banco vive principalmente en item_bank
- la selección actual de preguntas filtra por is_published, area, competency y exclusión de ids vistos
- existen profiles y learning_profiles
- learning_profiles ya contiene target_role, exam_type, active_goal y active_areas


## Lo que necesito que audites

1. si el modelo perfil profesional ↔ núcleo temático es correcto para este negocio
2. si la unidad correcta de segmentación es el núcleo temático
3. si la propuesta duplica mal información ya existente en learning_profiles
4. si esta propuesta rompe o ensucia la lógica adaptativa actual
5. si conviene que cada pregunta tenga un solo núcleo principal
6. si el estado editorial propuesto es suficiente y coherente
7. si el futuro módulo /admin/editorial/* está bien planteado
8. si el orden de implementación propuesto es correcto
9. si la migración base propuesta debería ajustarse antes de aplicarse

## Módulo futuro previsto

/admin/editorial/*
para:

- visualización de preguntas
- administración de contenidos
- carga de markdown
- validación editorial
- administración de núcleos
- administración de perfiles
- matriz perfil ↔ núcleo


## Documentos a auditar

Debes analizar críticamente estas dos piezas:

1. Plan:
docs/architecture/editorial-admin-implementation-plan.md
2. Migración:
supabase/migrations/0006_profiles_nuclei_editorial_base.sql

## Instrucciones de auditoría

No quiero una aprobación superficial.
Quiero que:

- señales inconsistencias reales
- identifiques duplicaciones semánticas
- detectes riesgos de arquitectura o negocio
- propongas ajustes concretos
- me digas si esto está bien para evolucionar la app sin rehacerla después


## Formato de respuesta requerido

Responde en esta estructura:

A. Veredicto general
B. Coherencia de negocio
C. Coherencia técnica
D. Riesgos concretos
E. Ajustes recomendados
F. Orden de implementación recomendado
G. Veredicto puntual sobre la migración 0006
H. Si ves una mejor alternativa, descríbela con precisión

```

---

## 19. Recomendación adicional para la auditoría

explícitamente que evalúa esto con la pregunta central:

> ¿Estamos introduciendo la mínima complejidad necesaria para soportar segmentación real por perfil profesional sin romper el modelo adaptativo actual?

Esa es la pregunta crítica.

Con toda la información del esquema actual (`0001_init_mvp.sql`), la migración propuesta (`0006`), la función `selectNextItem`, el plan de implementación y los documentos de contexto, puedo emitir una auditoría técnica completa.[^1][^2][^3][^4][^5]

***

# Auditoría técnica y de negocio — GanaConMerito
## Evolución arquitectónica: segmentación por perfil + módulo editorial

> **Pregunta crítica que guía toda la auditoría:**
> ¿Estamos introduciendo la mínima complejidad necesaria para soportar segmentación real por perfil profesional sin romper el modelo adaptativo actual?

***

## A. Veredicto general

**✅ Aprobado con ajustes puntuales.** La propuesta es arquitectónicamente sólida, bien pensada para el tamaño actual del producto y no introduce complejidad innecesaria. La dirección `perfil ↔ núcleo → pregunta` es correcta y escala sin requerir reescritura posterior. Sin embargo, hay **4 problemas concretos que deben resolverse antes de aplicar la migración 0006**, y hay **1 ambigüedad semántica crítica** entre `professional_profiles` y `learning_profiles` que, si no se clarifica explícitamente, generará confusión operativa en los próximos 3 meses.

***

## B. Coherencia de negocio

La hipótesis central **es correcta**: la unidad de segmentación debe ser el núcleo temático, no la pregunta individual.  Modelar segmentación a nivel `perfil ↔ pregunta` hubiera creado una tabla de relación O(perfiles × preguntas) que crece exponencialmente y es inmanejable editorialmente. El núcleo temático es el nivel de granularidad correcto: suficientemente fino para diferenciación real entre perfiles, suficientemente grueso para ser administrable.[^3][^4]

El modelo `is_universal = true` para núcleos compartidos por todos los perfiles es la decisión correcta: **evita duplicación de datos y centraliza la política de acceso en un solo campo booleano**, sin duplicar preguntas ni crear relaciones espurias.[^1]

**Inconsistencia de negocio detectada — Ambigüedad entre `professional_profiles` y `learning_profiles.target_role`:**[^5]

`learning_profiles` ya tiene `target_role` (texto libre) y `exam_type`. `professional_profiles` es ahora una entidad formal. Si no se define explícitamente la relación semántica entre ambos, el sistema tendrá **dos representaciones del rol del usuario** sin contrato claro entre ellas. La propuesta no resuelve esto: `profiles.professional_profile_id` apunta a la entidad formal, pero `learning_profiles.target_role` sigue siendo texto libre. Esto **no es duplicación en el sentido de datos repetidos**, pero sí es **ambigüedad de fuente de verdad** que confundirá a cualquier desarrollador que toque ambas tablas.

**Regla de negocio no resuelta — Fallback:** El plan menciona que si el usuario no tiene perfil asignado solo recibe núcleos universales, pero esto no está en la migración ni en ningún contrato de código. Esto se resolverá tarde cuando alguien lo descubra en producción.[^3]

***

## C. Coherencia técnica

### Con el esquema actual
La migración 0006 usa `ALTER TABLE ... ADD COLUMN IF NOT EXISTS`, lo que es **seguro y no destructivo** para producción. El backfill `UPDATE item_bank SET status = 'published' WHERE is_published = true AND status = 'draft'` es correcto en intención pero tiene un problema técnico (ver sección G).[^1]

### Con `selectNextItem`
La función actual filtra por `is_published = true`, `area`, `competency` y exclusión de IDs vistos.  La propuesta no rompe esta función en su estado actual porque `thematic_nucleus_id` es nullable (la columna admite NULL), lo que significa que preguntas sin núcleo asignado seguirán siendo seleccionables mientras `is_published = true`. Esto es **correcto como estrategia de transición**, pero crea un **período de inconsistencia aceptado**: habrá preguntas en el banco que respetan las reglas viejas y no las nuevas simultáneamente.[^2]

### Con las tablas de estadísticas adaptativas
`user_topic_stats` indexa por `(profile_id, area, competency)`. Si en el futuro la lógica adaptativa migra a operar por núcleo en lugar de por `area/competency`, **esta tabla quedará desalineada con el nuevo modelo de navegación**. No es un problema hoy, pero es una deuda técnica que la propuesta no nombra.[^5]

### Con RLS (Row Level Security)
La política de nuevas tablas usa `auth.uid() is not null` — lectura abierta a cualquier usuario autenticado. Esto es razonable como placeholder, pero hay un **riesgo de seguridad real**: la matriz `profile_thematic_nuclei` expone la configuración del negocio (qué perfiles tienen qué núcleos) a todos los usuarios. Un usuario curioso puede descubrir qué perfiles existen y qué contenido tiene cada uno antes de que hayas tomado esa decisión de producto.[^1]

***

## D. Riesgos concretos (priorizados)

| Prioridad | Riesgo | Impacto |
|---|---|---|
| 🔴 Alta | `status` tiene `NOT NULL DEFAULT 'draft'` pero el backfill es condicional — preguntas existentes sin `is_published` quedan en `draft` cuando deberían evaluarse caso a caso | Preguntas previamente activas podrían quedar inaccesibles post-Fase 3 |
| 🔴 Alta | Ambigüedad semántica `professional_profiles` vs `learning_profiles.target_role` sin contrato explícito | Duplicación conceptual que se resolverá mal bajo presión de tiempo |
| 🟡 Media | `thematic_nucleus_id` es nullable en `item_bank` — después del Fase 2 backfill fallido, preguntas sin núcleo quedan en limbo en Fase 3 | Regresión silenciosa en selección adaptativa |
| 🟡 Media | RLS de nuevas tablas expone matriz de negocio a todos los autenticados | Fuga de información de configuración estratégica |
| 🟡 Media | `user_topic_stats` usa `(area, competency)` como unidad de progreso; si el nuevo modelo navega por núcleo, el progreso histórico no es comparable | Incoherencia en dashboard post-migración |
| 🟢 Baja | No hay trigger `updated_at` en `profile_thematic_nuclei` | Menor — dificulta auditoría de cambios en la matriz |
| 🟢 Baja | El plan nombra `version` en las columnas editoriales de `item_bank` pero la migración no la agrega (ya existe en el MVP original) | Inconsistencia documental menor |

***

## E. Ajustes recomendados

**E1. Resolver la ambigüedad `professional_profiles` vs `target_role` explícitamente.** Agregar un comentario de columna en `learning_profiles.target_role` declarando su rol: "valor de onboarding libre, referencial; la fuente de verdad de segmentación es `profiles.professional_profile_id`". Alternativamente, en la Fase 4 reemplazar `target_role` con una FK a `professional_profiles` y deprecar el texto libre.

**E2. Ajustar el backfill de `status` en la migración.** El backfill actual solo convierte preguntas con `is_published = true`. Deberías agregar:

```sql
-- Preguntas inactivas quedan explícitamente en 'draft', no en estado indefinido
UPDATE public.item_bank
SET status = 'draft'
WHERE is_published = false AND status = 'draft';
```

Esto ya ocurre por el DEFAULT, pero hacerlo explícito documenta la intención. El riesgo real es otro: **si en Fase 3 cambias la selección a `status = 'published'` antes de hacer el backfill de núcleos**, todas las preguntas publicadas sin núcleo asignado quedarán seleccionables pero sin poder ser filtradas por perfil, lo cual es inconsistente. El plan debe forzar el orden Fase 2 → Fase 3 con una verificación.

**E3. Endurecer RLS de `profile_thematic_nuclei`.** En lugar de `auth.uid() is not null`, usar lectura solo para admin hasta que decidas política de producto:

```sql
-- Temporal hasta definir política
CREATE POLICY profile_thematic_nuclei_select_admin
ON public.profile_thematic_nuclei FOR SELECT
USING (EXISTS (
  SELECT 1 FROM public.profiles p
  WHERE p.auth_user_id = auth.uid() AND p.is_admin = true
));
```

**E4. Agregar trigger `updated_at` a `profile_thematic_nuclei`.** La tabla tiene `created_at` pero la migración no agrega trigger de actualización, a diferencia de todas las otras tablas del esquema.[^1]

**E5. Documentar el contrato de fallback de selección.** Antes de Fase 3, escribir en el código (no solo en docs) la regla: "Si `profiles.professional_profile_id IS NULL`, la selección opera con `is_universal = true` solamente". Esto debe estar como comentario en `selectNextItem` o como guard explícito.

**E6. No migrar `user_topic_stats` ahora, pero documentar la deuda.** El progreso adaptativo actual por `(area, competency)` no necesita cambiar en esta fase. Pero el plan de evolución debe incluir una Fase futura donde `user_topic_stats` agregue `thematic_nucleus_id` para que el dashboard y el progreso sean coherentes con el nuevo modelo de acceso.

***

## F. Orden de implementación recomendado

El orden del plan es correcto en estructura pero necesita un **gate de verificación** entre Fase 2 y Fase 3 que no está documentado:

1. **Fase 1** — Aplicar migración 0006 con los ajustes de E3 y E4 ✅
2. **Fase 2** — Backfill: crear núcleos, asignar preguntas existentes a núcleos, crear perfiles, poblar matriz ✅
3. **⚠️ Gate obligatorio** — Verificar que `COUNT(*) WHERE thematic_nucleus_id IS NULL AND is_published = true = 0` antes de continuar
4. **Fase 3** — Modificar `selectNextItem` para incorporar la nueva regla de negocio ✅
5. **Fase 4** — Captura de perfil en onboarding / UX ✅
6. **Fase 5** — Módulo `/admin/editorial` mínimo viable ✅
7. **Fase 6** — Carga/validación editorial desde markdown ✅

Lo que **sí deberías aplazar** que el plan no menciona explícitamente: **no construir Fase 5 hasta que Fase 3 esté validada en producción**. El admin editorial sin selección correcta funcionando es decorativo y puede crear falsa confianza.

***

## G. Veredicto sobre la migración 0006

**Estado: Aprobada con 3 correcciones antes de aplicar.**

Lo que está bien:

- Estructura de 3 tablas nuevas es correcta y suficiente[^1]
- Uso de `IF NOT EXISTS` es seguro para producción
- Backfill de `status` desde `is_published` es la transición correcta
- Índices cubren los patrones de consulta previsibles (por código, por activo, por universal, por núcleo en item_bank)
- Triggers `updated_at` en tablas nuevas (excepto el que falta en `profile_thematic_nuclei`)

Lo que debe corregirse **antes** de aplicar:

1. **Falta trigger `updated_at` en `profile_thematic_nuclei`** — todas las otras tablas lo tienen; su ausencia es un error de consistencia
2. **RLS de `profile_thematic_nuclei` es demasiado abierta** para una tabla de configuración estratégica; restringir a admin mientras no hay política de producto definida
3. **`thematic_nucleus_id` en `item_bank` debería tener un comentario SQL explícito** (`COMMENT ON COLUMN`) indicando que es nullable durante la transición y que la Fase 3 requiere que sea NOT NULL antes de activarse — sin ese comentario, alguien puede hacer la Fase 3 prematuramente

***

## H. ¿Hay una mejor alternativa?

No hay una arquitectura materialmente mejor para este tamaño de producto y este equipo. La única alternativa digna de mención es más simple pero menos escalable:

**Alternativa descartable: segmentación por `exam_type` + `target_role` como proxies de perfil**
Usar los campos existentes en `learning_profiles` (`target_role`, `exam_type`) como llaves de segmentación sin crear `professional_profiles` ni `thematic_nuclei`. Ventaja: cero tablas nuevas. Desventaja fatal: no soporta la semántica real del negocio (perfiles que comparten núcleos, núcleos universales, administración editorial de acceso), genera acoplamiento entre datos de aprendizaje y datos de acceso, y no escala al módulo admin. Se descarta correctamente.

**Lo que la propuesta hace bien que no es obvio:** Separar `professional_profiles` (entidad de negocio: qué eres) de `learning_profiles` (entidad pedagógica: cómo aprendes) es la decisión de diseño más importante de esta evolución. Son conceptos distintos que evolucionan a ritmos distintos. Mantenerlos separados es correcto aunque hoy genere algo de fricción de implementación.[^4]

La propuesta **puede implementarse sin rehacer la app después**, siempre que se apliquen los ajustes E1–E6 antes de Fase 3.
<span style="display:none">[^10][^11][^12][^6][^7][^8][^9]</span>

<div align="center">⁂</div>

[^1]: 0006_profiles_nuclei_editorial_base.sql

[^2]: select-next-item-2.ts

[^3]: editorial-admin-implementation-plan-5.md

[^4]: audit-brief-editorial-segmentation-3.md

[^5]: 0001_init_mvp-10.sql

[^6]: editorial-module-plan-6.md

[^7]: contracts-4.md

[^8]: overview-7.md

[^9]: README-8.md

[^10]: schema-9.md

[^11]: audit-brief-editorial-segmentation.md

[^12]: README.md

