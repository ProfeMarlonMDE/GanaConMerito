# Máquina de estados del MVP

## Estados persistidos

```ts
onboarding
diagnostic
practice
remediation
review
session_close
expired
error
```

## Procesos operativos

```ts
evaluating_response
updating_memory
selecting_next_item
generating_feedback
```

## Reglas principales

- si no hay onboarding completo -> `onboarding`
- si no hay línea base y no hay ítem siguiente -> `diagnostic`
- si hay onboarding completo y existe ítem -> `practice`
- si hay error -> `error`
- si expira la sesión -> `expired`
- si termina la sesión -> `session_close`
- si necesita refuerzo -> `remediation`
- si corresponde revisión -> `review`
- en otro caso -> `practice`

## Transiciones implementadas en código

Archivo fuente:
- `src/domain/orchestrator/session-machine.ts`

Resumen:
- `onboarding -> diagnostic | practice`
- `diagnostic -> diagnostic | practice`
- `practice -> remediation | review | session_close | practice`
- `remediation -> remediation | practice`
- `review -> session_close | practice`
- `session_close -> session_close`
- `expired -> expired`
- `error -> error`

## Observación

La máquina actual ya es usable para MVP, pero todavía no contiene toda la gobernanza futura del orquestador.
Lo que falta formalizar después:
- expiración real por tiempo
- condiciones pedagógicas más fuertes para `review`
- política formal de `hintLevel`
- transición ligada a snapshots y analítica más rica
