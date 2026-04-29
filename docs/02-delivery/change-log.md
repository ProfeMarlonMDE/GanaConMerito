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
