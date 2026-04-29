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
last_reviewed: 2026-04-29
---

# Known issues

## Activos
| issue | severidad | owner sugerido | estado | resumen |
|---|---|---|---|---|
| QB-ISSUE-004 | media | delivery | abierto | drift documental entre índice operativo y cierre real de fase |
| APP-ISSUE-001 | alta | producto + auth | en validación | onboarding endurecido para exigir al menos un `Área activa`; falta confirmarlo en runtime desplegado |
| APP-ISSUE-002 | media | platform | en validación | trazabilidad visible reforzada con `commit` + `buildTime`; falta rebuild/deploy para confirmar salida en entorno objetivo |
| APP-ISSUE-003 | media | producto + qa | en validación | la suite E2E ya usa identidad única por corrida y existe smoke postdeploy mínimo; falta consolidar la validación sobre runtime desplegado |
| APP-ISSUE-004 | alta | backend + producto | en validación | la corrección de persistencia terminal (`status`, `ended_at`) quedó en migración; falta aplicarla en entorno desplegado |
| APP-ISSUE-005 | media | backend + frontend | resuelto local / pendiente deploy | el contrato del dashboard quedó explícito y el render sigue separado entre `currentSession` e `historical`; falta validarlo en runtime desplegado |
| APP-ISSUE-006 | media | frontend + producto | resuelto local / pendiente deploy | `Fuertes` y `Por reforzar` quedaron blindados con prueba determinista adicional y QA local; falta validarlo en runtime desplegado |

## Detalle priorizado
- Ver auditoría específica: `docs/04-quality/question-bank-load-phase-audit-2026-04-26.md`
- Ver corrida base: `docs/04-quality/chromium-qa-run-2026-04-27.md`
- Prioridad inmediata:
  1. rebuild/deploy para aplicar la migración y validar trazabilidad visible
  2. redeployar los fixes de dashboard/QA desde Git hacia `/opt/gcm/app`
  3. ejecutar validación funcional real sobre onboarding, práctica y dashboard en runtime desplegado
  4. conservar la QA autenticada de `5` turnos como gate postdeploy obligatorio

## Nota de alcance
Estos issues están consolidados con evidencia local de repo y cierre documental de fase. No sustituyen una nueva validación remota de Supabase.

## Evidencia local revisada el 2026-04-29
- `package.json` expone runners versionados `qa:smoke:postdeploy`, `qa:e2e:api` y `qa:e2e:ui`.
- smoke local en verde sobre build `9ed03c0`: `artifacts/qa-smoke-postdeploy-smoke-mojhvmwm-qnypgn`.
- corrida API local en verde sobre build `9ed03c0`: `artifacts/qa-e2e-api-mojhwbjw-qoudrd`.
- corrida Chromium local en verde sobre build `9ed03c0`: `artifacts/qa-ui-e2e-ui-mojhxn51-sueeeh`.
- los runners QA ahora generan identidad única por corrida y purga básica de usuarios QA envejecidos.
- el dashboard ya entrega bloques separados `currentSession` e `historical` cuando recibe `sessionId`.
- la clasificación `Fuertes` / `Por reforzar` queda validada por QA semántica y por `npm run test:dashboard`.
