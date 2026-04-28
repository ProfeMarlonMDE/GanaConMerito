---
id: PROJ-REAL-BUG-FIX-PLAN-2026-04-28
name: real-bug-fix-plan-2026-04-28
project: ganaconmerito
owner: marlon-arcila
status: active
artifact_type: remediation-plan
modules: [platform, product, data, qa]
tags: [bugs, remediation, execution]
last_reviewed: 2026-04-28
---

# Plan de trabajo inmediato sobre bugs reales

## Objetivo
Corregir primero los bugs confirmados por evidencia de repo y dejar explícito qué queda pendiente por falta de validación remota o infraestructura E2E.

## Prioridad 1 — Cierre real de sesión
- problema: una sesión puede llegar a `session_close` sin persistir estado terminal en `sessions.status` ni `sessions.ended_at`
- impacto: rompe trazabilidad, QA y lecturas analíticas por sesión
- acción:
  1. agregar migración correctiva sobre `advance_session_atomic`
  2. al persistir `session_close`, marcar `status = completed` y `ended_at = now()`
  3. evitar sobreescritura accidental de `ended_at` en estados no terminales

## Prioridad 2 — Contratos funcionales visibles
### 2.1 Dashboard
- problema: `Fuertes` y `Por reforzar` pueden solaparse
- acción: separar listas con selección mutuamente excluyente cuando haya pocos registros

### 2.2 Onboarding
- problema: `Áreas activas` puede quedar vacío sin bloqueo explícito
- acción: endurecer validación cliente + servidor para requerir al menos 1 área activa

## Prioridad 3 — Trazabilidad mínima de despliegue
- problema: existe hash de commit visible, pero falta trazabilidad mínima más completa y el issue sigue abierto
- acción:
  1. mantener commit visible
  2. añadir build time si no rompe despliegue
  3. documentar claramente la brecha E2E real en lugar de inventar scripts

## Prioridad 4 — QA realista
- problema: no existe evidencia local nueva de E2E autenticada de 5 turnos en scripts automatizados consumibles hoy
- acción:
  1. no inventar rutas ni scripts inexistentes
  2. dejar preparado el código para validación posterior
  3. documentar dependencia de infraestructura/credenciales para cierre total

## Criterio de cierre
- diff aplicado
- validación local mínima ejecutada
- riesgos remanentes documentados
