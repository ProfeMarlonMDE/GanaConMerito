# Plan de implementación — segmentación por perfil + módulo editorial/admin

## Objetivo
Implementar una arquitectura que permita:

1. segmentar la disponibilidad de preguntas por **perfil profesional**
2. mantener **núcleos temáticos universales** para todos los perfiles
3. administrar contenidos y preguntas desde un módulo interno
4. conservar el banco organizado por contenido, no por duplicación por profesión

---

## Decisión arquitectónica central

### Modelo de negocio
La relación principal será:

- `professional_profiles` ↔ `thematic_nuclei` = **muchos a muchos**
- `thematic_nuclei` → `item_bank` = **uno a muchos**

### Regla operativa
Una pregunta estará disponible para un usuario si:
- está publicada y activa
- pertenece a un núcleo activo
- el núcleo es universal, o
- el núcleo está habilitado para el perfil profesional del usuario

---

## Estado actual del sistema

### Banco actual
El banco vive principalmente en `item_bank`.

### Selección actual
`selectNextItem(...)` filtra por:
- `is_published = true`
- `area`
- `competency`
- exclusión por ids vistos

### Limitación actual
El sistema todavía **no conoce**:
- perfiles profesionales
- núcleos temáticos como entidad formal
- segmentación perfil ↔ núcleo
- estado editorial más allá de `is_published`

---

## Alcance de implementación

### Bloque A — Modelo de datos
Crear soporte estructural para:
- perfiles profesionales
- núcleos temáticos
- relación perfil ↔ núcleo
- vínculo de cada ítem a un núcleo principal
- estado editorial y activación lógica del ítem

### Bloque B — Lógica de selección
Modificar la selección de ítems para incorporar:
- núcleos universales
- núcleos habilitados por perfil
- estado editorial/publicación

### Bloque C — Perfil del usuario
Extender el perfil del usuario para asociarlo a un `professional_profile`.

### Bloque D — Módulo admin/editorial
Construir el módulo `/admin/editorial/*` para:
- visualizar preguntas
- filtrarlas
- administrarlas
- asociarlas a núcleos
- administrar perfiles
- administrar matriz perfil ↔ núcleo
- cargar y validar contenido

---

## Fases exactas

## Fase 1 — Definición de datos y migración base

### Objetivo
Crear la estructura mínima persistente.

### Entregables
- tabla `professional_profiles`
- tabla `thematic_nuclei`
- tabla `profile_thematic_nuclei`
- columna `thematic_nucleus_id` en `item_bank`
- columnas editoriales mínimas en `item_bank`:
  - `status`
  - `is_active`
  - `source_type`
  - `source_path`
  - `version`
- columna `professional_profile_id` en `profiles` o tabla equivalente

### Resultado esperado
El sistema ya puede expresar qué núcleos corresponden a qué perfiles y a qué núcleo pertenece cada pregunta.

---

## Fase 2 — Backfill y reglas iniciales

### Objetivo
No dejar el sistema en estado mixto inconsistente.

### Entregables
- crear núcleos temáticos iniciales
- asignar núcleos universales
- mapear preguntas existentes (`item_bank`) a un núcleo principal
- definir perfiles profesionales iniciales
- poblar la matriz perfil ↔ núcleo

### Resultado esperado
El banco actual queda migrado al nuevo lenguaje de negocio.

---

## Fase 3 — Adaptación de selección de preguntas

### Objetivo
Modificar la lógica de `selectNextItem`.

### Cambios
La selección ya no solo filtrará por `area/competency`, sino también por:
- `item_bank.status = 'published'`
- `item_bank.is_active = true`
- núcleo activo
- núcleo universal o asignado al perfil del usuario

### Resultado esperado
Los usuarios solo reciben preguntas habilitadas para su perfil profesional.

---

## Fase 4 — Perfil de usuario y onboarding

### Objetivo
Capturar el perfil profesional del usuario.

### Entregables
- actualizar onboarding o perfil
- permitir asignar `professional_profile_id`
- definir fallback si el usuario no tiene perfil aún

### Regla de fallback sugerida
Si no tiene perfil definido:
- solo recibe núcleos universales
- o se bloquea inicio de práctica hasta completar perfil

---

## Fase 5 — Módulo admin/editorial mínimo viable

### Objetivo
Crear la base del módulo administrativo.

### Rutas iniciales
- `/admin/editorial`
- `/admin/editorial/items`
- `/admin/editorial/items/[id]`
- `/admin/editorial/nuclei`
- `/admin/editorial/profiles`
- `/admin/editorial/matrix`

### Funciones mínimas
- listar preguntas
- ver detalle
- filtrar por núcleo/estado/área/competencia
- administrar núcleos
- administrar perfiles
- administrar la matriz perfil ↔ núcleo

---

## Fase 6 — Carga y validación editorial

### Objetivo
Operar el banco desde UI con trazabilidad.

### Rutas futuras
- `/admin/editorial/upload`
- `/admin/editorial/validate`

### Funciones
- cargar markdown
- previsualizar parseo
- validar estructura
- crear/actualizar ítems
- mover estados: `draft`, `review`, `published`, `archived`

---

## Modelo de estados del ítem

### Estados editoriales recomendados
- `draft`
- `review`
- `published`
- `archived`

### Regla de selección
Solo se seleccionan ítems:
- `published`
- `is_active = true`
- con núcleo activo y aplicable al perfil

---

## Reglas de negocio clave

### Regla 1
No segmentar preguntas directamente por profesión si la segmentación puede expresarse por núcleo.

### Regla 2
La unidad de administración de acceso es `perfil ↔ núcleo`, no `perfil ↔ pregunta`.

### Regla 3
Las preguntas universales se modelan por `thematic_nuclei.is_universal = true`, no por duplicación.

### Regla 4
Cada pregunta debe tener un núcleo principal.

### Regla 5
El módulo `/admin/editorial/*` debe estar restringido a roles admin/editor.

---

## Orden recomendado de ejecución

### Paso 1
Documentar y congelar esta arquitectura.

### Paso 2
Crear migración SQL base.

### Paso 3
Definir backfill inicial para datos existentes.

### Paso 4
Adaptar `selectNextItem` y flujo de práctica.

### Paso 5
Actualizar onboarding/perfil.

### Paso 6
Construir admin mínimo viable.

### Paso 7
Construir carga/validación editorial.

---

## Primer entregable técnico recomendado
La siguiente pieza a implementar debe ser:

### `supabase/migrations/0006_profiles_nuclei_editorial_base.sql`

Porque sin esa base persistente, cualquier UI o lógica nueva sería prematura y se rehacería.
