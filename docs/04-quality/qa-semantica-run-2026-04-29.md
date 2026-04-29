---
id: QUAL-QA-SEMANTICA-2026-04-29
name: qa-semantica-run-2026-04-29
project: ganaconmerito
owner: qa
status: active
artifact_type: quality
modules: [qa, practice, dashboard, sessions]
tags: [qa, semantica, e2e, api, chromium]
related:
  - QUAL-QA-SEMANTICA-RUNBOOK
  - QUAL-KNOWN-ISSUES
last_reviewed: 2026-04-29
---

# Corrida QA semántica contractual — 2026-04-29

## Build local validada
```bash
npm run build
```

Resultado: build OK sobre `83b624b`.

## Corrida API-first
```bash
QA_BASE_URL=http://127.0.0.1:3001 npm run qa:e2e:api
```

- `ok: true`
- `turnCount: 5`
- `assertions: passed`
- `sessionId: fc61cad3-365e-4185-bc8f-cd9b2fabd78a`
- `artifactRoot: /home/ubuntu/.openclaw/product/artifacts/qa-e2e-2026-04-29T02-37-26-195Z`

## Corrida UI Chromium
```bash
QA_BASE_URL=http://127.0.0.1:3001 npm run qa:e2e:ui
```

- `ok: true`
- `turnCount: 5`
- `assertions: passed`
- `sessionId: b55b3c5b-e1cc-4ec1-96b2-4c9ed4c808ce`
- `artifactRoot: /home/ubuntu/.openclaw/product/artifacts/qa-ui-e2e-2026-04-29T02-38-34-557Z`

## Qué quedó validado
- onboarding real con `Área activa`
- flujo completo `home -> onboarding -> practice -> session_close -> dashboard`
- cierre terminal correcto en BD (`status = completed`, `current_state = session_close`, `ended_at != null`)
- dashboard de sesión con contrato y render separados entre `currentSession` e `historical`
- corrida actual de `5` turnos visible como corrida actual
- clasificación `Fuertes` / `Por reforzar` sin solapamiento

## Nota operativa
La corrida UI falló una vez cuando se ejecutó en paralelo con la API porque ambas reciclaron el mismo usuario QA y se pisaron la contraseña temporal. La ejecución correcta debe serializar ambas suites cuando compartan identidad de prueba.
