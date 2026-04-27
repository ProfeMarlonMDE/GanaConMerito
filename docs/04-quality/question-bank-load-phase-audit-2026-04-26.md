---
id: QUAL-QB-LOAD-AUDIT-2026-04-26
name: question-bank-load-phase-audit-2026-04-26
project: ganaconmerito
owner: marlon-arcila
status: active
artifact_type: quality
modules: [question-bank, editorial, data, supabase]
tags: [qa, banco-de-preguntas, cierre-de-fase, riesgos]
related:
  - DEL-QB-LOAD-CLOSE-2026-04-26
  - QUAL-KNOWN-ISSUES
  - QUAL-DEBT-REGISTER
last_reviewed: 2026-04-26
---

# Auditoría QA — cierre de fase de carga del banco de preguntas

## Alcance auditado
Se auditó el cierre documental de la fase cerrada con evidencia local del repo.

Fuentes principales:
- `docs/02-delivery/question-bank-load-phase-close.md`
- `docs/banco-preguntas/matematicas.md`
- `docs/banco-preguntas/lectura-critica.md`
- `docs/project/reference/taxonomia-y-nomenclatura-del-banco-de-preguntas.md`
- `/home/ubuntu/.openclaw/workspace/docs/QUESTION-BANK-INDEX.md`
- `/home/ubuntu/.openclaw/workspace/memory/2026-04-26.md`

## Hallazgos activos

### QB-ISSUE-001 — nomenclatura mixta entre legado y corpus actual
- severidad: media
- owner sugerido: data + doc-control
- estado: abierto
- evidencia:
  - el cierre de fase registra coexistencia de `item-doc-0001..0003` con 27 ítems del corpus actual (`docs/02-delivery/question-bank-load-phase-close.md`)
  - la referencia de taxonomía recomienda formato `item-doc-0001` como convención base (`docs/project/reference/taxonomia-y-nomenclatura-del-banco-de-preguntas.md`)
- riesgo:
  - ambigüedad operativa al reconciliar `001` vs `0001`
  - mayor probabilidad de errores en filtros, trazabilidad y migraciones documentales
- ruta de salida:
  1. definir convención canónica única para ids editoriales
  2. documentar estrategia de compatibilidad o migración para ids ya cargados
  3. reflejar la decisión en taxonomía, importador y artefactos de cierre

### QB-ISSUE-003 — persisten 3 ítems legados sin recertificación visible en este cierre
- severidad: media
- owner sugerido: data
- estado: abierto
- evidencia:
  - el cierre reconoce 3 ítems legados activos: `item-doc-0001`, `item-doc-0002`, `item-doc-0003` (`docs/02-delivery/question-bank-load-phase-close.md`)
  - la memoria operativa del 2026-04-26 confirma 30 filas totales por coexistencia de esos legados con el corpus actual (`/home/ubuntu/.openclaw/workspace/memory/2026-04-26.md`)
  - en la documentación de referencia `item-doc-0001` aparece como ejemplo de estructura, no como inventario operativo certificado para la fase (`docs/arquitectura-mvp.md`, `docs/project/reference/plantillas-y-estructura-de-preguntas.md`)
- riesgo:
  - mezcla entre contenido legado y corpus vigente sin sello explícito de recertificación QA de esta fase
  - posibilidad de que runtime, métricas o futuras depuraciones traten estos registros como parte homogénea del corpus
- ruta de salida:
  1. inventariar origen, estado y uso runtime de `item-doc-0001..0003`
  2. decidir si se conservan, migran, versionan o se excluyen de selección activa
  3. dejar evidencia documental de la decisión en delivery y calidad

### QB-ISSUE-004 — drift documental entre índice operativo y cierre real de fase
- severidad: media
- owner sugerido: delivery
- estado: abierto
- evidencia:
  - el índice operativo del workspace aún muestra estados previos como `021-025 ready_for_insert` y `matemáticas` en `in_review` (`/home/ubuntu/.openclaw/workspace/docs/QUESTION-BANK-INDEX.md`)
  - el cierre de fase ya reporta 27 ítems cargados (`docs/02-delivery/question-bank-load-phase-close.md`)
- riesgo:
  - una nueva operación puede arrancar desde un tablero viejo y reintroducir errores o trabajo redundante
  - aumenta la divergencia entre trazabilidad operativa y estado real de Supabase
- ruta de salida:
  1. reconciliar o archivar el índice operativo previo
  2. dejar un snapshot final único enlazado desde delivery/quality
  3. exigir actualización del tablero al cerrar cada fase de carga

## Qué quedó validado en esta auditoría
- existe un cierre documental explícito de la fase con resultado `27` cargados + `3` excluidos + `3` legados
- la deuda visual está respaldada por evidencia en los archivos fuente y en el cierre
- la coexistencia de ids `0001..0003` con `001..030` es verificable en la documentación del repo
- hay drift documental real entre el índice operativo y el cierre consolidado

## Qué no quedó validado en esta auditoría
- no se reejecutaron consultas remotas a Supabase desde esta auditoría
- no se revalidó en vivo el contenido exacto de `item-doc-0001..0003`
- no se auditó el comportamiento runtime de selección para confirmar si los ítems legados siguen expuestos al usuario final
