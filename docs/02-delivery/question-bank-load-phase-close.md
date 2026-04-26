---
id: DEL-QB-LOAD-CLOSE-2026-04-26
name: question-bank-load-phase-close
project: ganaconmerito
owner: marlon-arcila
status: active
artifact_type: delivery
modules: [question-bank, supabase]
tags: [cierre, banco-de-preguntas, carga, trazabilidad]
related:
  - DEL-SPRINT-LOG
  - PROD-BACKLOG
  - docs/project/reference/README-banco-de-preguntas.md
last_reviewed: 2026-04-26
---

# Cierre de fase operativa — carga del banco de preguntas

## Estado
Fase operativa de carga cerrada para el corpus actual.

## Resultado confirmado
- 27 ítems del corpus actual quedaron cargados en Supabase.
- Se excluyeron `item-doc-003`, `item-doc-005` e `item-doc-021` por dependencia visual/imagen.
- Existen 3 ítems legados: `item-doc-0001`, `item-doc-0002` y `item-doc-0003`.

## Alcance de este cierre
Este cierre deja trazabilidad del estado operativo de la carga del corpus actual. No reemplaza futuras decisiones sobre:
- tratamiento de ítems con dependencia visual
- normalización o migración de ítems legados
- ampliación del banco con nuevo corpus

## Soporte técnico mínimo dejado
- lote controlado persistido en `scripts/question-bank-current-corpus.ts`
- validación local repetible con `npm run content:validate`
- importación controlada del corpus actual con `npm run content:import:current`
- runbook operativo mínimo en `docs/05-ops/question-bank-load-runbook.md`

## Pendientes abiertos
1. Definir tratamiento para los ítems excluidos por dependencia visual/imagen.
2. Decidir manejo documental y operativo de los ítems legados `item-doc-0001..0003`.
3. Mantener alineada la documentación del banco con el estado real de Supabase en siguientes cargas.
