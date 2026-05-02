---
id: PROJ-STATUS
name: status
project: ganaconmerito
owner: marlon-arcila
status: active
artifact_type: project
last_reviewed: 2026-05-02
---

# Project Status — GanaConMerito

Última actualización: 2026-05-02 (cierre Sprint 7)

## Estado General: Gobernanza de contenido y banco activo (v0.6.0)
El producto cuenta ahora con una capa de contenido más gobernada: corpus activo documentado, validación explícita del banco y trazabilidad más clara entre repo, documentación y runtime esperado.

## Verdad operativa actual
- **Versión declarada**: 0.6.0
- **Rama canónica**: master
- **HEAD funcional Source / Deploy / Runtime validado previamente**: `deb265c`
- **BuildTime validado previamente**: `2026-05-02T17:46:40Z`
- **Triple verificación de release vigente**: cerrada sobre `deb265c`
- **Corpus activo**: 27 ítems documentados como activos en repo y validados sin drift reportado entre DB y repo durante Sprint 7.

## Historial de sprints recientes

### Sprint 7 — Reapertura selectiva de editorial / question-bank (cerrado)
- **Foco**: gobernanza del banco de preguntas y trazabilidad de corpus.
- **Entregables**:
  - `docs/project/current-corpus-runtime-activation-map.md`
  - validación del corpus activo de 27 ítems
  - saneamiento documental de backlog, status y delivery asociado al banco

### Sprint 6 — Disciplina operativa (cerrado)
- **Foco**: release hardening, trazabilidad y triple verificación.
- **Entregables**:
  - `docs/02-delivery/release-checklist.md`
  - actualización de versión a `0.6.0`
  - saneamiento de permisos Git en VPS
  - deploy validado con metadata visible (`commit` + `buildTime`)

### Sprint 5 — Tutor GCM: base técnica (cerrado)
- **Foco**: gobernanza de asistentes.
- **Entregables**: contrato v1, orquestador con guardrails, tipos estructurados y QA negativa.
- **Commit**: `5e918a5`

### Sprint 4 — Productización del core (cerrado)
- **Foco**: UX/UI y hardening de estados.
- **Commit**: `304f950`

## Módulos y features activos
- **Core**: login, onboarding, práctica y dashboard estables.
- **Tutor GCM**: base técnica lista, sin integración de LLM ni UI final.
- **Editorial / question-bank**: frente reabierto selectivamente bajo gobernanza de corpus; no convertido en módulo principal de usuario final.

## Próximos pasos
1. Consolidar en Git el cierre documental de Sprint 7.
2. Mantener la disciplina de release definida en la checklist vigente.
3. Abrir Sprint 8 con base en este estado ya saneado, sin reintroducir drift documental u operativo.
