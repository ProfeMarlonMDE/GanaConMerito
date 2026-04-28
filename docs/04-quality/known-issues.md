---
id: QUAL-KNOWN-ISSUES
name: known-issues
project: ganaconmerito
owner: marlon-arcila
status: active
artifact_type: quality
modules: [platform, editorial, auth, data]
tags: [issues, calidad, riesgos]
related:
  - QUAL-DEBT-REGISTER
  - QUAL-QB-LOAD-AUDIT-2026-04-26
  - DEL-QB-LOAD-CLOSE-2026-04-26
last_reviewed: 2026-04-28
---

# Known issues

## Activos
| issue | severidad | owner sugerido | estado | resumen |
|---|---|---|---|---|
| QB-ISSUE-004 | media | delivery | abierto | drift documental entre índice operativo y cierre real de fase |
| APP-ISSUE-001 | alta | producto + auth | en validación | onboarding endurecido para exigir al menos un `Área activa`; falta confirmarlo en runtime desplegado |
| APP-ISSUE-002 | media | platform | en validación | trazabilidad visible reforzada con `commit` + `buildTime`; falta rebuild/deploy para confirmar salida en entorno objetivo |
| APP-ISSUE-003 | media | producto + qa | abierto | sigue faltando una suite E2E autenticada versionada y reproducible de `5` turnos dentro del repo |
| APP-ISSUE-004 | alta | backend + producto | en validación | la corrección de persistencia terminal (`status`, `ended_at`) quedó en migración; falta aplicarla en entorno desplegado |
| APP-ISSUE-005 | alta | backend + frontend | abierto | el dashboard sigue mezclando histórico acumulado y corrida actual cuando no se consulta por `sessionId` explícito |
| APP-ISSUE-006 | media | frontend + producto | en validación | `Fuertes` y `Por reforzar` ya no deben solaparse; falta validar en entorno desplegado |

## Detalle priorizado
- Ver auditoría específica: `docs/04-quality/question-bank-load-phase-audit-2026-04-26.md`
- Ver corrida base: `docs/04-quality/chromium-qa-run-2026-04-27.md`
- Prioridad inmediata:
  1. rebuild/deploy para aplicar la migración y validar trazabilidad visible
  2. ejecutar validación funcional real sobre onboarding, práctica y dashboard
  3. ejecutar E2E autenticada real de `5` turnos o versionar suite reproducible
  4. separar en dashboard histórico acumulado vs. corrida/sesión actual cuando el producto lo requiera

## Nota de alcance
Estos issues están consolidados con evidencia local de repo y cierre documental de fase. No sustituyen una nueva validación remota de Supabase.

## Evidencia local revisada el 2026-04-28
- `package.json` no expone hoy ningún script `test`, `e2e`, `playwright` ni `cypress`.
- el repo contiene documentación de E2E (`docs/project/e2e-status.md`, `docs/project/docker-e2e-minimum-validation-plan.md`), pero no una suite automatizada versionada para reproducirla dentro del checkout.
- la trazabilidad visible quedó reforzada en `src/lib/build-info.ts` con lectura de metadata generada en build (`.build-meta.json`).
