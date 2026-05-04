---
id: PROD-FUTURE-PRACTICE-SESSION-LIGHT-REFACTOR
name: future-practice-session-light-refactor
project: ganaconmerito
owner: marlon-arcila
status: proposed
artifact_type: product
modules: [practice, ui, tutor]
tags: [refactor, practice-session, frontend, future-sprint]
last_reviewed: 2026-05-04
---

# Sprint futuro — Refactor liviano de PracticeSession

## Estado
**Planificado, no ejecutado en Sprint 13.**

## Motivo
`PracticeSession` ya integra inicio de práctica, carga de pregunta, respuesta, feedback, navegación, tutor, errores y cierre. Funciona, pero concentra demasiada responsabilidad visual y de orquestación cliente.

El refactor debe ser liviano para no romper el core ni abrir trabajo estructural innecesario.

## Objetivo futuro
Dividir `PracticeSession` en subcomponentes de presentación, conservando la autoridad del flujo en el backend y sin cambiar scoring, avance, selección de ítems ni Tutor GCM.

## Alcance permitido
Crear componentes presentacionales como:

- `PracticeStartCard`
- `PracticeQuestionCard`
- `PracticeOptionList`
- `PracticeFeedbackCard`
- `PracticeSessionActions`
- `PracticeSessionErrorState`
- `PracticeTutorPanel`

## Alcance prohibido
- Cambiar `/api/session/start`.
- Cambiar `/api/session/advance`.
- Cambiar selección de ítems.
- Cambiar scoring.
- Cambiar guardrails del Tutor GCM.
- Cambiar Supabase schema.
- Rediseñar completamente la UI.

## Criterios de aceptación futuros
- La práctica sigue respondiendo al menos 5 preguntas en E2E.
- El Tutor GCM sigue visible dentro de práctica.
- El Tutor no revela clave antes de responder.
- El feedback post-respuesta sigue visible.
- El dashboard por sesión sigue accesible.
- Logout y protección post-logout siguen pasando.
- No hay cambios funcionales en API.

## Riesgo principal
Refactorizar demasiado pronto puede introducir regresiones en un flujo que ya funciona. Por eso este sprint debe ejecutarse solo después de cerrar fuente normativa v1 y con E2E online disponible.
