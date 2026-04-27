---
id: QUAL-POST-BACKFILL-ACTIVE-BANK
name: post-backfill-active-bank-validation
project: ganaconmerito
owner: qa
status: active
artifact_type: quality
modules: [question-bank, qa, supabase]
tags: [backfill, banco-activo, validation, regression]
related:
  - docs/04-quality/active-question-bank-smoke-test.md
  - docs/database/active-question-bank-contract.md
  - scripts/verify-active-bank-backfill.ts
  - scripts/post-backfill-active-bank-validation.sql
last_reviewed: 2026-04-26
---

# Validación post-backfill — banco activo

## Objetivo
Confirmar que el backfill dejó el banco activo alineado con el corpus actual esperado en Supabase y que no introdujo regresiones de lectura para `public.v_item_bank_active`.

## Resultado esperado
Después del backfill, el estado correcto es este:

- `27` ítems actuales en `public.v_item_bank_active` con `read_state = 'active'`
- no hay ítems activos extra por fuera del set actual
- cada ítem activo mantiene `status = 'published'`, `is_active = true`, `thematic_nucleus_id is not null` y núcleo activo
- cada ítem activo mantiene exactamente `4` opciones en `public.item_options`

## Set exacto esperado en `read_state = 'active'`

```text
item-doc-001
item-doc-002
item-doc-004
item-doc-006
item-doc-007
item-doc-008
item-doc-009
item-doc-010
item-doc-011
item-doc-012
item-doc-013
item-doc-014
item-doc-015
item-doc-016
item-doc-017
item-doc-018
item-doc-019
item-doc-020
item-doc-022
item-doc-023
item-doc-024
item-doc-025
item-doc-026
item-doc-027
item-doc-028
item-doc-029
item-doc-030
```

## Checklist operativo

### 1) Gate local del corpus
Correr primero el smoke local para confirmar que el manifiesto del repo no cambió:

```bash
npm run content:smoke:active
```

Debe devolver:
- exit code `0`
- `summary.errorCount = 0`

### 2) Gate remoto automatizado contra Supabase
Con `NEXT_PUBLIC_SUPABASE_URL` y `SUPABASE_SERVICE_ROLE_KEY` cargados:

```bash
npm run content:verify:backfill-active
```

Debe devolver:
- exit code `0`
- `summary.activeCount = 27`
- `summary.errorCount = 0`
- checks `db-active-set-exact` y `db-four-options-per-active` en `passed`

### 3) Gate SQL manual en Supabase
Si hace falta validar desde SQL Editor o dejar evidencia manual:

```sql
-- archivo runnable
scripts/post-backfill-active-bank-validation.sql
```

Interpretación mínima:
- query `summary`: `active_count = 27`
- query `missing_expected_active / unexpected_active`: debe volver `0 filas`
- query de gate failures para expected active: debe volver `0 filas`
- query de `option_count <> 4`: debe volver `0 filas`
- query de duplicados activos: debe volver `0 filas`

## Criterios de aceptación

Se considera exitoso el backfill solo si se cumple todo:

1. el smoke local del corpus actual pasa sin errores
2. `v_item_bank_active` expone exactamente los `27` `content_id` actuales como `active`
3. no aparece ningún `content_id` activo inesperado
4. cada activo conserva sus gates estructurales (`published`, `is_active`, núcleo asignado y núcleo activo)
5. cada activo conserva sus `4` opciones
6. no hay duplicados activos por `content_id` ni por `slug`

## Señales de regresión a vigilar

- `active_count != 27`
- faltantes o sobrantes en el set activo
- un esperado cae en `inactive` por núcleo nulo/inactivo
- un esperado queda `published` pero no `active`
- un activo queda con menos o más de `4` opciones
- aparecen duplicados por `slug` o `content_id`

## Archivos tocados por esta preparación

- `scripts/verify-active-bank-backfill.ts`
- `scripts/post-backfill-active-bank-validation.sql`
- `docs/04-quality/post-backfill-active-bank-validation.md`
