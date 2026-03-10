# Fase R3 — DB y contenido

## Objetivo
Reducir deuda estructural en trazabilidad, dominio y persistencia atómica del bloque de contenido.

## Remediaciones aplicadas

### 1. `updated_at` en tablas operativas
Se añadió `updated_at` a:
- `sessions`
- `session_turns`
- `user_skill_snapshots`
- `evaluation_events`

con triggers de actualización.

### 2. Dominio restringido en `learning_profiles`
Se añadieron checks para el dominio actual:
- `target_role in ('docente')`
- `exam_type in ('docente')`

### 3. Identidad canónica del contenido
Se formalizó:
- `id` del Markdown -> `content_id` en `item_bank`
- `slug` como identificador funcional
- UUID DB como identidad interna

### 4. Persistencia atómica de contenido
Se añadió la función SQL:
- `public.upsert_content_item(...)`

que resuelve en una sola unidad transaccional:
- `item_bank`
- `item_options`

### 5. Corrección posterior de la función SQL
Se añadió `0003_fix_upsert_content_item_return.sql` para corregir una ambigüedad en el `RETURN` de la función atómica detectada durante la prueba real de importación.

## Riesgos aún abiertos
- RLS transitiva costosa sigue pendiente como optimización estructural
- la normativa aún no tiene persistencia estructurada separada

## Estado de la fase
En implementación / pendiente de reaplicar prueba final de importación y cierre formal.
