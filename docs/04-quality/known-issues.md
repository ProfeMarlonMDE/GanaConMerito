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
last_reviewed: 2026-04-27
---

# Known issues

## Activos
| issue | severidad | owner sugerido | estado | resumen |
|---|---|---|---|---|
| QB-ISSUE-004 | media | delivery | abierto | drift documental entre índice operativo y cierre real de fase |
| APP-ISSUE-001 | alta | producto + auth | cerrado | onboarding ya define `Áreas activas` como campo opcional explícito; frontend, backend y decisión documental quedaron alineados |
| APP-ISSUE-002 | media | platform | cerrado | trazabilidad endurecida con build args obligatorios (`APP_COMMIT`, `APP_BUILD_TIME`) y verificación manual mínima visible en UI |
| APP-ISSUE-003 | media | producto + qa | cerrado | ya existe evidencia E2E autenticada actualizada de `5` turnos con aserciones semánticas reproducibles (`docs/04-quality/qa-semantica-run-2026-04-28.md`) |
| APP-ISSUE-004 | alta | backend + producto | abierto | la UI llega a `session_close` pero la sesión queda `active` con `ended_at = null` en BD |
| APP-ISSUE-005 | alta | backend + frontend | abierto | el dashboard mezcla histórico y corrida actual, generando métricas no atribuibles a la sesión validada |
| APP-ISSUE-006 | media | frontend + producto | abierto | `Fuertes` y `Por reforzar` pueden solaparse, afectando la lectura del diagnóstico |

## Detalle priorizado
- Ver auditoría específica: `docs/04-quality/question-bank-load-phase-audit-2026-04-26.md`
- Ver corrida base: `docs/04-quality/chromium-qa-run-2026-04-27.md`
- Prioridad inmediata:
  1. corregir persistencia de cierre de sesión (`status`, `ended_at`)
  2. separar en dashboard histórico acumulado vs. corrida/sesión actual
  3. hacer excluyente la clasificación `Fuertes` / `Por reforzar`
  4. endurecer QA con aserciones post-run sobre BD + dashboard
  5. decidir endurecimiento de onboarding
  6. corregir trazabilidad de despliegue

## Nota de alcance
Estos issues están consolidados con evidencia local de repo y cierre documental de fase. No sustituyen una nueva validación remota de Supabase.
