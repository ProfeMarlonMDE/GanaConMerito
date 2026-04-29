---
id: QUAL-QA-SEMANTICA-RUNBOOK
name: qa-semantica-runbook
project: ganaconmerito
owner: qa
status: active
artifact_type: quality
modules: [qa, practice, dashboard, sessions]
tags: [qa, semantica, e2e, runbook]
related:
  - QUAL-CHROMIUM-QA-2026-04-27
  - QUAL-KNOWN-ISSUES
  - docs/05-ops/runbook.md
last_reviewed: 2026-04-29
---

# Runbook corto — QA semántica operativa

## Objetivo
Ejecutar una validación reproducible del flujo real `home -> onboarding -> practice -> dashboard` y fallar si UI, API, dashboard y BD divergen.

## Runners oficiales
### 1. API-first
```bash
QA_BASE_URL=http://127.0.0.1:3001 npm run qa:e2e:api
```

### 2. UI real con Chromium
```bash
QA_BASE_URL=http://127.0.0.1:3001 npm run qa:e2e:ui
```

## Preconditions mínimas
- app levantada y accesible en `QA_BASE_URL`
- `NEXT_PUBLIC_SUPABASE_URL` presente
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` presente
- `SUPABASE_SERVICE_ROLE_KEY` presente

## Regla funcional vigente para competencias
- `Fuertes`: competencias con al menos `1` intento, al menos `1` acierto, `estimated_level > 0` y precisión `>= 50%`.
- `Por reforzar`: competencias con al menos `1` intento que no hayan entrado en `Fuertes`.
- ambas listas deben ser mutuamente excluyentes; la QA falla si una competencia aparece en las dos.

## Evidencia esperada
### API-first
Directorio `artifacts/qa-e2e-<timestamp>/` con mínimo:
- `meta.json`
- `prep.json`
- `results.json`
- `assertions.json`
- `01-home.html`
- `02-onboarding.html`
- `03-practice.html`
- `04-dashboard-session.html`
- `05-dashboard-historical.html`
- `turn-01.json` ... `turn-05.json`

### UI Chromium
Directorio `artifacts/qa-ui-e2e-<timestamp>/` con mínimo:
- `prep.json`
- `results.json`
- `assertions.json`
- `01-home.png`
- `02-after-onboarding.png`
- `04-dashboard-session.png`
- `05-dashboard-historical.png`
- `turn-01.html` ... `turn-05.html`
- `trace.zip`

## Pass
- exit code `0`
- `assertions.json` con `ok = true`
- `results.json` con `turnCount = 5` o equivalente observable
- sesión final en BD con:
  - `status = completed`
  - `current_state = session_close`
  - `ended_at != null`
- dashboard de sesión consistente con `user_topic_stats`, `session_turns` y `evaluation_events`
- separación visible y contractual entre `currentSession` e `historical` cuando hay `sessionId`
- sin solapamiento entre `Fuertes` y `Por reforzar`

## Fail
Cualquier condición de estas vuelve la corrida inválida:
- error HTTP en onboarding, start, item, advance o dashboard
- menos de `5` turnos efectivos
- `assertions.json.ok = false`
- divergencia entre API/UI y persistencia en BD
- sesión no cerrada correctamente
- dashboard con métricas distintas a las derivadas de BD
- dashboard de sesión sin separación entre `currentSession` e `historical`
- artefactos incompletos o ausentes

## Fuente real de aserción
La fuente dura de validación está en:
- `scripts/qa-e2e-semantic-assertions.js`

No confiar solo en screenshots o navegación exitosa.

## Salida mínima de reporte
Cada corrida debe dejar:
1. comando ejecutado
2. `artifactRoot`
3. resultado pass/fail
4. primer fallo observable si existe
5. commit/build verificado si la corrida se hizo sobre runtime desplegado
