---
id: QUAL-CHROMIUM-QA-2026-04-27
name: chromium-qa-run-2026-04-27
project: ganaconmerito
owner: marlon-arcila
status: active
artifact_type: quality
modules: [practice, dashboard, sessions, qa]
tags: [qa, chromium, e2e, dashboard, sessions]
related:
  - QUAL-KNOWN-ISSUES
  - docs/project/e2e-status.md
last_reviewed: 2026-04-27
---

# Corrida QA Chromium — 2026-04-27

## Resumen
Corrida real en `artifacts/qa-ui-e2e-2026-04-27T15-49-56-219Z` sobre `http://localhost:3001`. El flujo `home -> onboarding -> practice -> dashboard` completó `5` turnos y la UI llegó a `session_close`, pero la evidencia funcional y de BD confirmó inconsistencias de cierre de sesión y de cálculo/presentación del dashboard.

## Hallazgos confirmados
1. **Cierre de sesión inconsistente**: la UI termina en `session_close`, pero en BD la sesión `9d667ac3-65ab-4676-835a-50c6fd420d9e` quedó con `status=active` y `ended_at=null`.
2. **Competencias fuertes inconsistentes**: el dashboard marca como fuertes competencias que también aparecen en `Por reforzar`, lo que rompe la interpretación del resultado.
3. **Mezcla de histórico y corrida actual**: el dashboard mostró `10` intentos y `2` aciertos, mientras la corrida Chromium ejecutó `5` turnos y `1` acierto; la vista no está aislando correctamente la sesión/corrida validada.

## Decisiones tomadas
- Empujar primero los fixes de **cierre de sesión** y **fuente de datos del dashboard** antes de considerar el flujo como estable.
- Endurecer QA sobre dashboard y persistencia, no solo sobre navegación/UI.
- Mantener esta corrida como evidencia base para validar la corrección y evitar regresiones.

## Acciones siguientes
- Corregir el contrato de cierre para persistir `status=completed|closed` y `ended_at` al finalizar `session_close`.
- Ajustar el dashboard para separar claramente métricas de la sesión actual vs. histórico acumulado.
- Revisar la lógica de clasificación `Fuertes` / `Por reforzar` para que sea mutuamente excluyente y consistente con `user_topic_stats`.
- Añadir aserciones QA automáticas post-run sobre: estado final de sesión en BD, conteos esperados por corrida y consistencia de competencias en dashboard.
