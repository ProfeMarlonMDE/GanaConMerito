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

Última actualización: 2026-05-02 (Cierre operativo Sprint 9 — triple verificación confirmada)

## Estado General: Sprint 9 CERRADO OPERATIVAMENTE (v0.7.0-dev)
La integración mínima gobernada de Tutor GCM está en source, deploy y runtime. Triple verificación confirmada sobre `8ec0ee7`.

## Verdad operativa actual
- **Versión declarada**: 0.6.0
- **Rama canónica**: master
- **HEAD actual en source (`~/.openclaw/product`)**: `8ec0ee7`
- **HEAD actual en deploy tree (`/opt/gcm/app`)**: `8ec0ee7`
- **Runtime visible validado en `:3000/login`**: `8ec0ee7`
- **BuildTime visible validado en `:3000/login`**: `2026-05-02T20:21:39Z`
- **Triple verificación Sprint 9**: `source = deploy = runtime` confirmada sobre `8ec0ee7`
- **Tutor GCM `/api/tutor/turn`**: visible en build, autenticado, contexto derivado de servidor
- **Corpus activo**: 27 ítems; gobernanza intacta desde Sprint 7

## Historial de sprints recientes

### Sprint 9 — Integración funcional mínima gobernada de Tutor GCM (CERRADO)
- **Commit funcional**: `8ec0ee7`
- **Foco**: hacer visible y útil al tutor sin soltar el control del sistema.
- **Triple verificación**: source = deploy = runtime = `8ec0ee7` / `2026-05-02T20:21:39Z`
- **Guardrails aplicados**:
  - contexto de sesión derivado 100% del servidor (Supabase), no del cliente
  - tutor no tiene autoridad sobre scoring, avance ni cierre
  - denegación de intentos de acciones no autorizadas verificada en tests

### Sprint 8 — Runtime confiable, QA postdeploy y disciplina operativa verificable (cerrado)
- **Foco**: release hardening, trazabilidad y triple verificación.
- **Entregables**:
  - `docs/02-delivery/release-checklist.md`
  - actualización de versión a `0.6.0`
  - saneamiento de permisos Git en VPS
  - triple verificación real sobre `c7ec88c`

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
- **Tutor GCM**: integrado funcionalmente en práctica; deploy y runtime verificados en `8ec0ee7`.
- **Editorial / question-bank**: frente reabierto selectivamente bajo gobernanza de corpus; no convertido en módulo principal de usuario final.

## Próximos pasos
1. Sprint 10: conectar Tutor GCM con proveedor LLM real bajo guardrails (score derivado de servidor, no del modelo).
2. Correr QA postdeploy formal (smoke + E2E) sobre el runtime de Sprint 9.
3. Mantener discipline de triple verificación en futuros sprints.
