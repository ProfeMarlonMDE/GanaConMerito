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
| APP-ISSUE-001 | alta | producto + auth | abierto | onboarding todavía permite ambigüedad funcional si `Áreas activas` queda vacío |
| APP-ISSUE-002 | media | platform | abierto | trazabilidad de despliegue sigue incompleta (`Build/Commit` visibles no consolidados) |
| APP-ISSUE-003 | media | producto + qa | abierto | falta evidencia E2E autenticada actualizada de `5` turnos sobre el banco curado de `27` preguntas |

## Detalle priorizado
- Ver auditoría específica: `docs/04-quality/question-bank-load-phase-audit-2026-04-26.md`
- Prioridad inmediata:
  1. ejecutar E2E autenticada real de `5` turnos
  2. decidir endurecimiento de onboarding
  3. corregir trazabilidad de despliegue
  4. reconciliar tableros/documentación operativa con el cierre de fase

## Nota de alcance
Estos issues están consolidados con evidencia local de repo y cierre documental de fase. No sustituyen una nueva validación remota de Supabase.
