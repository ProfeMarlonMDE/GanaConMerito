---
id: DEL-CHANGE-LOG
name: change-log
project: ganaconmerito
owner: marlon-arcila
status: active
artifact_type: delivery
modules: [core, platform]
tags: [changelog, cambios, entregas]
related:
  - DEL-SPRINT-LOG
last_reviewed: 2026-05-01
---

# Change log

## 2026-05-02
- tipo: feat+docs+closure
- modulo: core/ui
- resumen: se cerró Sprint 4 con nav simplificado (`Inicio`, `Práctica`, `Métricas`), hardening UX mediante `LoadingState` / `EmptyState` / `ErrorState`, salida de editorial del flujo principal del usuario y versión declarada `0.5.0`; el cierre documental posterior quedó registrado en `ef13a4f` sobre el cambio funcional `304f950`.
- sprint: Sprint 4 - Productización del core
- commit funcional: `304f950`
- commit documental: `ef13a4f`


## 2026-05-01
- tipo: deploy+qa+ops
- modulo: platform/ui
- resumen: se cerró el release real del rediseño UI premium mobile-first en runtime con deploy del commit `df8f949`, smoke postdeploy verde y E2E UI Chromium verde contra `:3000`; además se corrigió estructuralmente el manejo de secretos moviendo `env_file` desde `/opt/gcm/app/.env.production` a `/opt/gcm/env/gcm-app.env` para blindar el deploy frente a `git clean -fdx`.
- sprint: SIN SPRINT FORMAL ABIERTO
- relacionados: docs/project/status.md, docs/02-delivery/sprint-log.md, docs/01-product/backlog.md

## 2026-05-01
- tipo: feat+qa+docs
- modulo: ui/ux
- resumen: se implementó en la fuente canónica el rediseño UI premium mobile-first del core real (`login`, `home`, `onboarding`, `practice`, `dashboard`, `biblioteca`), se alineó la QA UI al nuevo flujo explícito de práctica y quedó validado localmente con build + smoke + E2E UI sobre runtime `:3001`; el release de runtime quedó pendiente por falta de permisos Docker en esta sesión.
- sprint: SIN SPRINT FORMAL ABIERTO
- relacionados: docs/01-product/ui-premium-mobile-redesign-proposal.md, docs/01-product/backlog.md, docs/project/status.md

## 2026-05-01
- tipo: docs+product
- modulo: ui/ux
- resumen: se formalizó una propuesta canónica de rediseño UI premium mobile-first con paleta híbrida final, reglas de integración secundaria para `Tutor GCM` y plan de rollout por fases, manteniendo separación explícita entre estado actual validado y propuesta aún no implementada.
- sprint: SIN SPRINT FORMAL ABIERTO
- relacionados: docs/01-product/ui-premium-mobile-redesign-proposal.md, docs/01-product/backlog.md, docs/project/status.md

## 2026-05-01
- tipo: sprint+closure
- modulo: delivery/documentation
- resumen: se cerró formalmente Sprint 3 tras confirmar su cierre operativo efectivo: worktree residual resuelto, mapa de features activas consolidado, ADR-002 aprobado con guardrails y último deploy triple-verificado fijado en `701ebcf`; no se abre un Sprint 4 documental hasta contar con base explícita.
- sprint: Sprint 3 - Normalización operativa final y preparación del frente de asistentes
- relacionados: docs/02-delivery/sprint-log.md, docs/01-product/backlog.md, docs/project/status.md

## 2026-05-01
- tipo: deploy+verification
- modulo: runtime/ops
- resumen: se cerró un deploy completo con triple verificación sobre el commit `701ebcf`: `~/.openclaw/product`, `/opt/gcm/app` y la metadata visible del runtime en `/login` quedaron alineados; `buildTime` validado: `2026-05-01T18:25:50Z`.
- sprint: Sprint 3 - Normalización operativa final y preparación del frente de asistentes
- relacionados: docs/05-ops/deploy-checklist.md, docs/project/status.md, docs/02-delivery/sprint-log.md

## 2026-05-01
- tipo: docs+alignment
- modulo: backlog/status
- resumen: se alinearon `backlog.md` y `status.md` con el mapa formal de features activas y con la aprobación de ADR-002, dejando explícita la diferencia entre core activo, editorial solo lectura y `Tutor GCM` aprobado pero aún no implementado.
- sprint: Sprint 3 - Normalización operativa final y preparación del frente de asistentes
- relacionados: docs/01-product/active-feature-map.md, docs/01-product/backlog.md, docs/project/status.md

## 2026-05-01
- tipo: product+ux
- modulo: feature-map/ui-brief
- resumen: se formalizó el mapa de features activas con estado real y se creó un brief reutilizable para IA de UI mobile-first, alineado al flujo real de producto y a la gobernanza aprobada del futuro `Tutor GCM`.
- sprint: Sprint 3 - Normalización operativa final y preparación del frente de asistentes
- relacionados: docs/01-product/active-feature-map.md, docs/01-product/ui-design-brief-mobile-first.md, docs/03-architecture/adrs/ADR-002-assistant-component-governance.md

## 2026-05-01
- tipo: decision+architecture
- modulo: assistants/governance
- resumen: Marlon aprobó ADR-002 con guardrails. Queda autorizada la preparación técnica gobernada del frente de asistentes con `Tutor GCM` como asistente visible único inicial, contrato v1 obligatorio, trazabilidad mínima por turno y QA negativa antes de cualquier despliegue funcional.
- sprint: Sprint 3 - Normalización operativa final y preparación del frente de asistentes
- relacionados: docs/03-architecture/adrs/ADR-002-assistant-component-governance.md, docs/03-architecture/assistant-component-executive-spec.md, docs/02-delivery/sprint-log.md

## 2026-05-01
- tipo: ops+topology
- modulo: repo/worktree
- resumen: se neutralizó el worktree residual `workspace-product-048-fix` tras confirmar que no contenía commits propios frente a `master`, estaba `43` commits detrás y solo arrastraba un `package-lock.json` local obsoleto; se eliminó el worktree y su rama local para cerrar la ambigüedad topológica.
- sprint: Sprint 3 - Normalización operativa final y preparación del frente de asistentes
- relacionados: docs/02-delivery/sprint-log.md, docs/project/status.md, docs/project/source-of-truth.md

## 2026-05-01
- tipo: delivery+planning
- modulo: governance/product
- resumen: se registra el cierre operativo del Sprint 2 de maduración del producto y la apertura formal de Sprint 3 centrado en normalización operativa final, resolución de ambigüedad topológica residual y preparación formal del frente de asistentes.
- sprint: Sprint 3 - Normalización operativa final y preparación del frente de asistentes
- relacionados: docs/02-delivery/sprint-log.md, docs/01-product/backlog.md, ADR-002-assistant-component-governance

## 2026-05-01
- tipo: docs+ops
- modulo: deploy/runtime
- resumen: se formaliza la regla definitiva de verdad de runtime: un deploy solo se considera cerrado cuando coinciden `~/.openclaw/product`, `/opt/gcm/app` y la metadata visible del runtime en `/login` (`commit` + `buildTime`).
- sprint: Sprint 2 - Maduración operativa del producto
- relacionados: docs/project/source-of-truth.md, docs/05-ops/runbook.md, docs/05-ops/deploy-checklist.md

## 2026-05-01
- tipo: fix+architecture
- modulo: sessions/qa
- resumen: se retiró el límite rígido de `5` turnos de la ruta de avance de sesión y se pasó a configuración explícita por entorno mediante `MAX_SESSION_TURNS`, conservando `5` como default controlado para no romper el baseline actual de QA.
- sprint: Sprint 2 - Maduración operativa del producto
- relacionados: docs/project/status.md, docs/project/e2e-status.md

## 2026-05-01
- tipo: docs+ops
- modulo: documentation/question-bank
- resumen: se archivaron los duplicados documentales de `docs/banco-preguntas/*` con nombres fechados y se reafirmó `content/items/**` como verdad operativa del corpus, ajustando referencias mínimas para evitar que el legado siga compitiendo con la fuente canónica.
- sprint: Sprint 2 - Maduración operativa del producto
- relacionados: docs/project/source-of-truth.md, docs/04-quality/question-bank-load-phase-audit-2026-04-26.md

## 2026-05-01
- tipo: docs+ops
- modulo: documentation/editorial
- resumen: se limpió la superficie activa `/editorial` para dejar solo documentación canónica vigente, se archivó con nombres fechados el inbox temporal y planes editoriales/question-bank superados, y se regeneró `site-docs` para eliminar referencias activas al legado.
- sprint: Sprint 2 - Maduración operativa del producto
- relacionados: docs/project/source-of-truth.md, docs/05-ops/2026-05-01-document-archive-and-naming-policy.md

## 2026-05-01
- tipo: docs+architecture
- modulo: ai/session-orchestrator
- resumen: se formaliza ADR propuesto para gobernanza del componente de asistentes, fijando `Tutor GCM` como asistente visible único y manteniendo la lógica crítica fuera del LLM visible.
- sprint: Sprint 2 - Maduración operativa del producto
- relacionados: ADR-002-assistant-component-governance, ARCH-ASSISTANT-COMPONENT-SPEC, GOV-HUMAN-APPROVAL

## 2026-05-01
- tipo: fix+qa
- modulo: qa/ops
- resumen: se corrigió la limpieza de usuarios QA para tolerar identidades stale ya borradas en Supabase (`User not found`) y se revalidó el runtime objetivo `:3000` con smoke postdeploy y E2E UI Chromium verdes (`5` turnos).
- sprint: Sprint 2 - Maduración operativa del producto
- relacionados: QUAL-QA-SEMANTICA-RUNBOOK, docs/project/e2e-status.md, docs/project/status.md

## 2026-04-29
- tipo: hardening
- modulo: dashboard/qa/ops
- resumen: se formaliza el contrato del dashboard, se aísla la lógica de clasificación en módulo reutilizable con prueba determinista, la QA E2E pasa a usar identidades únicas por corrida, se agrega smoke postdeploy mínimo y se actualiza la documentación operativa con evidencia real.
- sprint: PENDIENTE DE ADSCRIPCIÓN FORMAL
- relacionados: API-DASHBOARD-SUMMARY-CONTRACT, QUAL-DASHBOARD-HARDENING-2026-04-29, QUAL-QA-SEMANTICA-RUNBOOK

## 2026-04-28
- tipo: qa+product
- modulo: practice/dashboard/sessions
- resumen: se cierra el ciclo E2E real en Chromium con dashboard por sesión, assertions semánticas, corrección de clasificación `Fuertes/Por reforzar` y aplicación remota del fix de cierre de sesión en Supabase; la validación final confirma `status=completed` y `ended_at` persistido.
- sprint: Sprint 1 - Gobernanza mínima y baseline operable del producto
- relacionados: DEL-SPRINT-LOG, QUAL-CHROMIUM-QA-2026-04-27, QUAL-KNOWN-ISSUES

## 2026-04-26
- tipo: docs
- modulo: question-bank
- resumen: se registra la entrada en ejecución del frente `banco activo`; se deja trazabilidad de estado en progreso para vista activa, adopción en runtime y smoke test, sin marcar entregables no verificados.
- sprint: Sprint 1 - Gobernanza mínima y baseline operable del producto
- relacionados: DEL-SPRINT-LOG, PROD-BACKLOG

## 2026-04-26
- tipo: docs
- modulo: question-bank
- resumen: se registra el cierre documental de la fase operativa de carga del banco de preguntas con 27 ítems cargados en Supabase y 3 exclusiones por dependencia visual.
- sprint: Sprint 1 - Gobernanza mínima y baseline operable del producto
- relacionados: DEL-QB-LOAD-CLOSE-2026-04-26, DEL-SPRINT-LOG, PROD-BACKLOG

## 2026-04-23
- tipo: docs
- modulo: core
- resumen: se implanta estructura documental operativa inicial para ganaconmerito.
- sprint: PENDIENTE
- relacionados: ADR-001-stack-base, QUAL-DEBT-REGISTER

## 2026-05-02
- tipo: feat+qa
- modulo: tutor/core
- resumen: se implementó la base técnica gobernada de `Tutor GCM`, incluyendo contrato v1 del turno, reglas explícitas de autoridad, orquestador con fallback y pruebas unitarias de guardrails, sin otorgarle autoridad sobre scoring, avance o cierre de sesión.
- sprint: Sprint 5 - Tutor GCM: base técnica gobernada
- commit funcional: `5e918a5`
- relacionados: docs/project/status.md, docs/02-delivery/sprint-log.md, docs/03-architecture/adrs/ADR-002-assistant-component-governance.md
