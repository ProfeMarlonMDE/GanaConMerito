---
id: OPS-QUESTION-BANK-LOAD
name: question-bank-load-runbook
project: ganaconmerito
owner: marlon-arcila
status: active
artifact_type: runbook
modules: [question-bank, supabase]
tags: [runbook, banco-de-preguntas, importacion, validacion]
related:
  - OPS-RUNBOOK
  - DEL-QB-LOAD-CLOSE-2026-04-26
  - docs/database/content-model.md
last_reviewed: 2026-04-26
---

# Runbook mínimo — validación e importación controlada del banco

## Objetivo
Dejar repetible la validación local y la recarga controlada del corpus actual del banco sin depender de selección manual de archivos.

## Alcance actual
Este runbook apunta al corpus operativo cerrado en abril de 2026:
- 27 ítems del corpus actual
- no mezcla los 3 ítems legados `item-doc-0001..0003`

Fuente del lote controlado:
- `scripts/question-bank-current-corpus.ts`

## Preflight local
Desde `/home/ubuntu/.openclaw/product`:

```bash
npm run content:validate
npm run content:smoke:active
```

Resultado esperado:
- ambos comandos con exit code `0`
- `content:validate` devuelve resumen JSON con `scope = current-corpus`, `validatedFiles = 27` y `errorCount = 0`
- `content:smoke:active` devuelve `summary.errorCount = 0` y confirma exclusión de legacy del banco activo

Si se necesita auditar todo `content/items`, incluyendo legados:

```bash
npm run content:validate:all
```

## Importación controlada del corpus actual
Solo ejecutar cuando exista `SUPABASE_SERVICE_ROLE_KEY` válida en el entorno activo.

```bash
npm run content:import:current
```

Comportamiento:
- importa únicamente el lote definido en `question-bank-current-corpus.ts`
- respeta el orden controlado del lote
- devuelve resumen JSON con `attempted`, `ok` y `failed`
- sale con código `1` si falla al menos un archivo

## Secuencia operativa recomendada
1. Ejecutar `npm run content:validate`
2. Ejecutar `npm run content:smoke:active`
3. Confirmar variables Supabase del entorno real
4. Ejecutar `npm run content:import:current`
5. Guardar evidencia del resumen de salida si la carga fue parte de una operación real
6. Si cambia el corpus aprobado, actualizar primero `question-bank-current-corpus.ts`

## Qué no hace este runbook
- no redefine arquitectura del importador
- no reemplaza futuras decisiones sobre staging, versionado o pipeline avanzado
- no convierte los ítems legados en parte del lote actual por defecto
