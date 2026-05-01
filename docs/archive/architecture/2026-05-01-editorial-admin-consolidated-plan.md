# Plan consolidado — segmentación por perfil profesional + módulo editorial/admin

## Estado del documento
Plan consolidado después de:
- revisión arquitectónica interna
- múltiples auditorías externas
- síntesis final de riesgos y ajustes
- implementación inicial de la Épica 1 en código y migraciones

---

## 1. Decisión arquitectónica consolidada

### Objetivo
Permitir que la disponibilidad de preguntas dependa de:
- el perfil profesional del usuario
- el acceso a núcleos temáticos
- la existencia de núcleos universales

### Decisión central
La arquitectura correcta es:
- `professional_profiles` ↔ `thematic_nuclei` = muchos a muchos
- `thematic_nuclei` → `item_bank` = uno a muchos

### Regla de negocio consolidada
Una pregunta está disponible para un usuario si:
1. `status = 'published'`
2. `is_active = true`
3. pertenece a un núcleo activo
4. el núcleo es universal, o
5. el núcleo está habilitado para el perfil profesional del usuario

---

## 2. Distinción clave de la arquitectura

### Elegibilidad
Define si una pregunta puede ser mostrada:
- perfil profesional
- núcleo temático
- núcleo universal
- estado editorial
- activación lógica

### Adaptatividad
Define cuál pregunta elegible conviene seleccionar:
- área
- competencia
- dificultad
- historial
- remediación

### Regla consolidada
- **núcleo temático** = acceso / elegibilidad
- **area + competency** = pedagogía / adaptatividad / analítica

Esto evita mezclar segmentación de negocio con medición pedagógica.

---

## 3. Ajustes consolidados tras auditoría

### Ajuste 1 — Ubicación correcta del perfil profesional
`professional_profile_id` debe vivir en:
- `learning_profiles`

No en:
- `profiles`

### Razón
`profiles` representa identidad base.
`learning_profiles` representa configuración pedagógica y objetivo de estudio.

---

### Ajuste 2 — Verdad editorial efectiva
La nueva verdad editorial debe ser:
- `item_bank.status`
- `item_bank.is_active`

`is_published` queda como compatibilidad transitoria y no debe seguir siendo el eje de decisión a largo plazo.

---

### Ajuste 3 — Núcleo como capa de acceso
`thematic_nuclei` no reemplaza a:
- `item_bank.area`
- `item_bank.competency`

Los campos `area` y `subarea` en `thematic_nuclei` deben entenderse solo como metadata organizativa/editorial, no como fuente de analítica adaptativa.

---

### Ajuste 4 — Gate obligatorio antes de cambiar práctica
Antes de depender de la nueva selección, debe cumplirse:
- ningún ítem `published` puede quedar con `thematic_nucleus_id = NULL`

---

### Ajuste 5 — Admin después de segmentación
No construir `/admin/editorial/*` antes de validar en práctica la nueva lógica de segmentación.

---

## 4. Estado actual de implementación

## Ya implementado

### Migración base
- `supabase/migrations/0006_profiles_nuclei_editorial_base.sql`

Incluye:
- `professional_profiles`
- `thematic_nuclei`
- `profile_thematic_nuclei`
- `learning_profiles.professional_profile_id`
- columnas editoriales en `item_bank`
- índices
- triggers
- RLS inicial endurecida
- ajuste transitorio de política de `item_bank`

### Backfill inicial
- `supabase/migrations/0007_backfill_profiles_nuclei.sql`

Incluye:
- núcleo universal transitorio `legacy-general`
- perfiles docentes iniciales
- relación inicial perfil ↔ núcleo
- backfill de `item_bank.thematic_nucleus_id`
- gate para impedir publicados sin núcleo

### Lógica de selección
- `src/domain/item-selection/select-next-item.ts`

Ya adaptada para:
- `status = 'published'`
- `is_active = true`
- núcleos universales
- núcleos asignados al perfil
- filtros adaptativos por `area` y `competency`

### Integración de sesión
- `src/app/api/session/start/route.ts`
- `src/app/api/session/advance/route.ts`

Ambos ya pasan `learning_profiles.professional_profile_id` a `selectNextItem(...)`.

---

## 5. Épicas consolidadas

## ÉPICA 1 — Segmentación invisible
### Objetivo
Cambiar la base del sistema sin introducir todavía el módulo admin completo.

### Estado
Parcialmente implementada.

### Pasos
1. Reescritura final de `0006` ✅
2. Backfill inicial `0007` ✅
3. Gate de consistencia mínima ✅
4. Adaptación de `selectNextItem` ✅
5. Alineación de `session/start` y `session/advance` ✅
6. Validación real tras aplicar migraciones en DB remota ⏳

### Resultado esperado
La práctica ya respeta segmentación por perfil/núcleo sin cambiar todavía la UX de administración.

---

## ÉPICA 2 — Perfil y onboarding
### Objetivo
Capturar correctamente `learning_profiles.professional_profile_id` desde la experiencia de usuario.

### Trabajo pendiente
- ajustar onboarding
- permitir selección de perfil profesional
- definir fallback si no existe perfil aún

### Fallback recomendado
- solo núcleos universales, o
- bloqueo suave hasta completar perfil

---

## ÉPICA 3 — Biblioteca editorial web
### Objetivo
Mantener o activar una biblioteca de lectura controlada para documentos editoriales.

### Ruta sugerida
- `/editorial/*`

### Naturaleza
- solo lectura
- desacoplada
- removible
- útil como puente antes del admin completo

---

## ÉPICA 4 — Módulo administrativo/editorial
### Objetivo
Construir el módulo real de administración.

### Ruta
- `/admin/editorial/*`

### Alcance previsto
- dashboard editorial
- listado de preguntas
- detalle de pregunta
- carga de markdown
- validación editorial
- gestión de núcleos
- gestión de perfiles
- matriz perfil ↔ núcleo

### Condición de entrada
No empezar esta épica antes de validar Épica 1 en flujo real.

---

## 6. Riesgos consolidados

### Riesgo 1 — dualidad editorial
Seguir usando `is_published` en queries o lógica nueva puede dejar contradicciones con `status`.

### Riesgo 2 — drift entre perfil y onboarding
Si onboarding no captura bien `professional_profile_id`, la segmentación queda incompleta.

### Riesgo 3 — clasificación pobre en backfill
El núcleo `legacy-general` sirve como transición, pero no debe quedarse como clasificación final del banco.

### Riesgo 4 — endurecer RLS demasiado pronto
La elegibilidad completa por perfil/núcleo puede residir primero en el service layer; endurecer toda la lógica en RLS se debe hacer con evidencia y pruebas.

### Riesgo 5 — empezar admin demasiado pronto
Construir UI de administración antes de validar la segmentación real aumentaría el retrabajo.

---

## 7. Siguiente orden recomendado

### Paso inmediato 1
Aplicar y validar en entorno de DB real:
- `0006_profiles_nuclei_editorial_base.sql`
- `0007_backfill_profiles_nuclei.sql`

### Paso inmediato 2
Verificar gate operativo:
```sql
select count(*)
from public.item_bank
where status = 'published'
  and thematic_nucleus_id is null;
```
Resultado esperado:
- `0`

### Paso inmediato 3
Probar flujo real de práctica:
- iniciar sesión
- responder
- avanzar
- verificar continuidad de selección

### Paso inmediato 4
Diseñar/ajustar onboarding para `professional_profile_id`

### Paso inmediato 5
Solo después: avanzar a `/editorial/*` o `/admin/editorial/*`

---

## 8. Decisión consolidada final

La evolución correcta del sistema es:
1. introducir segmentación por perfil profesional y núcleo temático
2. mantener la adaptatividad sobre `area` y `competency`
3. validar la segmentación en flujo real antes de construir el módulo admin
4. construir luego el módulo editorial/admin sobre una base ya estable

---

## 9. Archivos principales relacionados

### Arquitectura
- `docs/architecture/editorial-admin-implementation-plan.md`
- `docs/architecture/editorial-admin-consolidated-plan.md`
- `docs/architecture/editorial-module-plan.md`

### Migraciones
- `supabase/migrations/0006_profiles_nuclei_editorial_base.sql`
- `supabase/migrations/0007_backfill_profiles_nuclei.sql`

### Lógica
- `src/domain/item-selection/select-next-item.ts`
- `src/app/api/session/start/route.ts`
- `src/app/api/session/advance/route.ts`

---

## 10. Resumen ejecutivo

### 0006
Define la base estructural de segmentación y editorial.

### 0007
Hace el backfill mínimo y evita limbo de preguntas publicadas.

### selectNextItem
Ya separa elegibilidad (perfil/núcleo/estado) de adaptatividad (área/competencia).

### Próximo foco
Aplicar migraciones, validar práctica real y luego ajustar onboarding.
