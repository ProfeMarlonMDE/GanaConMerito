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

Última actualización: 2026-05-02 (apertura y ejecución Sprint 8)

## Estado General: Runtime confiable y disciplina operativa verificable (v0.6.0)
El producto mantiene el corpus activo gobernado y entra en Sprint 8 con foco explícito en confiabilidad de runtime, QA postdeploy y cierre operativo basado en evidencia, no en narrativa.

## Verdad operativa actual
- **Versión declarada**: 0.6.0
- **Rama canónica**: master
- **HEAD actual en source**: `c7ec88c`
- **HEAD actual en deploy tree (`/opt/gcm/app`)**: `c7ec88c`
- **Runtime visible validado en `/login`**: `c7ec88c`
- **BuildTime visible validado en `/login`**: `2026-05-02T18:40:22Z`
- **Triple verificación vigente**: `source = deploy = runtime` validada sobre `c7ec88c`
- **QA postdeploy validada en `:3000`**:
  - smoke: verde (`artifacts/qa-smoke-postdeploy-smoke-mooqapqo-4v9emv`)
  - E2E API 5 turnos: verde (`artifacts/qa-e2e-api-mooqbpol-ffih4y`)
  - E2E UI Chromium: verde (`artifacts/qa-ui-e2e-ui-mooqd69x-up3rxi`)
- **Corpus activo**: 27 ítems documentados como activos en repo; Sprint 7 dejó gobernanza activa consolidada en Git con `c7ec88c`.

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
1. Operativizar known issues/riesgos con criterio de tiempo de ejecución, latencia y ownership, no solo histórico documental.
2. Mantener Sprint 8 como nuevo baseline de release: triple verificación + smoke + E2E API + E2E UI sobre `:3000`.
3. Evitar que futuros cierres documentales vuelvan a quedar detrás del runtime real.
