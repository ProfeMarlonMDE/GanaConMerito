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
last_reviewed: 2026-04-28
---

# Change log

## 2026-05-01
- tipo: docs+ops
- modulo: documentation/editorial
- resumen: se limpió la superficie activa `/editorial` para dejar solo documentación canónica vigente, se archivó con nombres fechados el inbox temporal y planes editoriales/question-bank superados, y se regeneró `site-docs` para eliminar referencias activas al legado.
- sprint: Sprint siguiente - Normalización operativa y blindaje del core
- relacionados: docs/project/source-of-truth.md, docs/05-ops/2026-05-01-document-archive-and-naming-policy.md

## 2026-05-01
- tipo: docs+architecture
- modulo: ai/session-orchestrator
- resumen: se formaliza ADR propuesto para gobernanza del componente de asistentes, fijando `Tutor GCM` como asistente visible único y manteniendo la lógica crítica fuera del LLM visible.
- sprint: Sprint siguiente - Hardening de dashboard y estabilidad QA
- relacionados: ADR-002-assistant-component-governance, ARCH-ASSISTANT-COMPONENT-SPEC, GOV-HUMAN-APPROVAL

## 2026-05-01
- tipo: fix+qa
- modulo: qa/ops
- resumen: se corrigió la limpieza de usuarios QA para tolerar identidades stale ya borradas en Supabase (`User not found`) y se revalidó el runtime objetivo `:3000` con smoke postdeploy y E2E UI Chromium verdes (`5` turnos).
- sprint: Sprint siguiente - Hardening de dashboard y estabilidad QA
- relacionados: QUAL-QA-SEMANTICA-RUNBOOK, docs/project/e2e-status.md, docs/project/status.md

## 2026-04-29
- tipo: hardening
- modulo: dashboard/qa/ops
- resumen: se formaliza el contrato del dashboard, se aísla la lógica de clasificación en módulo reutilizable con prueba determinista, la QA E2E pasa a usar identidades únicas por corrida, se agrega smoke postdeploy mínimo y se actualiza la documentación operativa con evidencia real.
- sprint: Sprint siguiente - Hardening de dashboard y estabilidad QA
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
