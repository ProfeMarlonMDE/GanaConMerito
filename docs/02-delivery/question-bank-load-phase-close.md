---
id: DEL-QB-LOAD-CLOSE-2026-04-26
name: question-bank-load-phase-close
project: ganaconmerito
owner: marlon-arcila
status: completed
artifact_type: delivery
modules: [question-bank, supabase]
tags: [cierre, banco-de-preguntas, carga, trazabilidad]
related:
  - DEL-SPRINT-LOG
  - PROD-BACKLOG
  - docs/project/reference/README-banco-de-preguntas.md
last_reviewed: 2026-04-27
---

# Cierre de fase operativa — carga del banco de preguntas

## Estado
Fase operativa de carga cerrada para el corpus actual y consolidada para runtime.

## Resultado confirmado
- 27 ítems del corpus actual quedaron cargados en Supabase.
- El banco activo remoto quedó depurado para que solo esas 27 preguntas nuevas queden disponibles para runtime/práctica.
- Las preguntas defectuosas y el legado previo quedaron fuera del circuito operativo.
- La validación mínima de build de app quedó completada sobre este baseline.

## Alcance de este cierre
Este cierre deja trazabilidad del estado operativo de la carga del corpus actual y de la normalización del baseline activo. No reemplaza futuras decisiones sobre:
- ampliación del banco con nuevo corpus

## Soporte técnico mínimo dejado
- lote controlado persistido en `scripts/question-bank-current-corpus.ts`
- validación local repetible con `npm run content:validate`, `npm run content:smoke:active` y `npm run content:verify:backfill-active`
- importación controlada del corpus actual con `npm run content:import:current`
- runbook operativo mínimo en `docs/05-ops/question-bank-load-runbook.md`
- contrato de lectura activo en `docs/database/active-question-bank-contract.md`
- validación post-backfill en `docs/04-quality/post-backfill-active-bank-validation.md`
- práctica ajustada a `5` turnos para el siguiente ciclo de pruebas funcionales de app

## Pendientes abiertos
1. Ejecutar evidencia E2E autenticada de práctica sobre este banco curado.
2. Mantener alineada la documentación del banco con el estado real de Supabase en siguientes cargas.
3. Tratar cualquier nueva carga como ampliación o reemplazo explícito del baseline activo de 27.
