---
id: QUAL-ACTIVE-QUESTION-BANK-SMOKE
name: active-question-bank-smoke-test
project: ganaconmerito
owner: qa
status: active
artifact_type: quality
modules: [question-bank, qa]
tags: [smoke-test, banco-activo, content]
related:
  - docs/02-delivery/question-bank-load-phase-close.md
  - docs/database/active-question-bank-contract.md
  - docs/05-ops/question-bank-load-runbook.md
last_reviewed: 2026-04-26
---

# Smoke test — banco activo

## Objetivo
Validar rápido el contrato mínimo del banco activo antes de importar o usar el corpus actual en runtime.

## Cobertura mínima
El smoke test runnable `npm run content:smoke:active` verifica:
- unicidad de `content_id`
- unicidad de `slug`
- exactamente 4 opciones por ítem activo
- conteo esperado del corpus activo: `27`

## Comando
Desde `/home/ubuntu/.openclaw/product`:

```bash
npm run content:smoke:active
```

## Salida esperada
- exit code `0`
- JSON con `summary.errorCount = 0`
- check `expected-active-count` en `passed`

## Fuente de verdad usada
- manifiesto activo: `scripts/question-bank-current-corpus.ts`
- parser/validación: `src/domain/content/parse-md.ts`
- cierre operativo: `docs/02-delivery/question-bank-load-phase-close.md`
- contrato de lectura: `docs/database/active-question-bank-contract.md`

## Límite actual
Este smoke test valida el corpus activo local del repo. No confirma por sí mismo que Supabase ya esté alineado; para eso sigue haciendo falta corrida de importación y/o consulta remota al banco publicado.
