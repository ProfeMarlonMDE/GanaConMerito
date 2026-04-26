# QUESTION-BANK-PHASE-CLOSURE-2026-04-26

## Objetivo
Cerrar técnicamente la fase de carga del banco de preguntas y dejar el puente mínimo hacia la fase de consumo estable por la app.

## Estado de cierre
- Supabase contiene `27` ítems vigentes del corpus actual.
- Quedan excluidos del corpus activo `item-doc-003`, `item-doc-005` y `item-doc-021`.
- Siguen coexistiendo `3` registros legados (`item-doc-0001`, `item-doc-0002`, `item-doc-0003`).
- Validación operativa reportada: sin duplicados por `content_id`/`slug`, sin ítems con número distinto de 4 opciones y sin presencia de los excluidos en el set actual cargado.

## Decisiones de cierre
1. **La fase de carga se considera cerrada** para el corpus textual actualmente utilizable.
2. **`003`, `005` y `021` no entran al backlog de bugfix normal**; quedan clasificados como exclusiones por dependencia visual hasta definir soporte de assets/imágenes.
3. **La app no debe consumir `item_bank` como si fuera una secuencia limpia `001`–`030`** ni como si todas las filas fueran parte del mismo release funcional.
4. **El contrato de consumo debe filtrar corpus activo vs legado** antes de construir listados, progreso, analytics o selección aleatoria.

## Deuda estructural corta
### 1) Naming mixto (`0001..0003` vs `001..030`)
Consecuencia:
- cualquier lógica que ordene o cuente por prefijo/ordinal puede mezclar legado con corpus vigente;
- se vuelve frágil la trazabilidad entre docs, importer, app y analytics;
- aumenta el riesgo de mostrar preguntas incorrectas o de inflar métricas de cobertura.

### 2) Exclusiones por dependencia visual no modeladas como estado de producto
Consecuencia:
- si la app espera continuidad `001`–`030`, interpretará huecos como errores;
- QA y soporte pueden reabrir falsos incidentes;
- se dificulta distinguir entre `faltante`, `legacy` y `excluido_intencional`.

### 3) Falta de contrato explícito de lectura para la app
Consecuencia:
- cada feature puede terminar filtrando distinto;
- progreso, práctica, dashboards y selección aleatoria pueden divergir;
- un cambio menor en carga/importación puede romper comportamiento funcional sin romper la BD.

## Recomendaciones mínimas
- Definir un **set activo oficial** consumible por la app, separado de legado y excluidos.
- Adoptar `content_id` como identificador estable de integración y dejar el ordinal como metadata de presentación, no como clave de negocio.
- Registrar estado de disponibilidad por ítem: `active`, `excluded_visual`, `legacy`.

## Top 3 tareas siguientes
### 1. Crear un registro de catálogo activo del banco
Entregable mínimo:
- archivo o tabla de control con `content_id`, `display_order`, `status`, `reason`, `source_generation`.

Impacto:
- elimina ambigüedad entre vigente, legado y excluido;
- permite a la app consumir un inventario explícito sin inferencias peligrosas.

### 2. Exponer una capa de lectura estable para la app
Entregable mínimo:
- una vista SQL o contrato de consulta documentado que devuelva solo el corpus activo.

Regla:
- excluir por defecto `item-doc-0001..0003`, `item-doc-003`, `item-doc-005`, `item-doc-021`.

Impacto:
- reduce fragilidad en selección de preguntas, conteos, progreso y analytics.

### 3. Añadir un smoke test de integridad del banco
Entregable mínimo:
- validación automatizada previa a release/import que revise: ids únicos, slugs únicos, 4 opciones por ítem, conteo esperado del corpus activo y exclusiones esperadas.

Impacto:
- convierte el estado actual en una garantía repetible, no en una verificación manual puntual.

## Criterio para abrir la siguiente fase
La siguiente fase puede abrirse cuando exista al menos:
- un inventario activo explícito;
- una consulta/vista única para consumo de app;
- un smoke test que proteja el set.

Con eso, la app puede seguir construyéndose sobre este banco sin exigir re-arquitectura masiva ni reimportación total.
