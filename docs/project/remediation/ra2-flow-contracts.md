# RA2 — Semántica de flujo y contratos

## Objetivo
Alinear máquina de estados, semántica de evaluación y contrato de onboarding con el comportamiento real del MVP.

## Cambios aplicados
- onboarding endurecido a los valores realmente soportados por DB (`docente`, `socratic`)
- formulario de onboarding ajustado para no prometer dominios aún no soportados
- `evaluationSource` corregido a `deterministic`
- máquina de estados simplificada para reflejar reglas mínimas reales del flujo
- `session/advance` ya calcula señales menos artificiales para `review` y `session_close`
- documentación de decisiones y máquina de estados reconciliada con el runtime actual

## Validación realizada
- `npm run build` ✅

## Estado
RA2 queda cerrado a nivel técnico local. La validación funcional completa queda unida al siguiente login real/E2E autenticada.

## Siguiente paso recomendado
1. RA3 — honestidad funcional y cierre de trazabilidad
2. E2E autenticada real tras primer login real
