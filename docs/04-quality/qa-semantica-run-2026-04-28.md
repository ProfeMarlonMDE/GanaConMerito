---
id: QUAL-QA-SEMANTICA-2026-04-28
name: qa-semantica-run-2026-04-28
project: ganaconmerito
owner: qa
status: active
artifact_type: quality
modules: [qa, practice, dashboard, sessions]
tags: [qa, semantica, e2e, api]
related:
  - QUAL-QA-SEMANTICA-RUNBOOK
  - QUAL-KNOWN-ISSUES
last_reviewed: 2026-04-28
---

# Corrida QA semántica — 2026-04-28

## Comando ejecutado
```bash
QA_BASE_URL=http://127.0.0.1:3103 npm run qa:e2e:api
```

## Resultado
- `ok: true`
- `turnCount: 5`
- `assertions: passed`
- `sessionId: b1b38113-3425-4924-ab9b-b10b866d0241`
- `artifactRoot: /home/ubuntu/.openclaw/product/artifacts/qa-e2e-2026-04-28T01-27-35-064Z`

## Evidencia mínima confirmada
- onboarding persistido
- sesión creada y avanzada por `5` turnos
- `assertions.json` en verde
- dashboard consistente con `user_topic_stats`, `session_turns` y `evaluation_events`
- sesión final cerrada en BD con `status = completed`, `current_state = session_close` y `ended_at != null`

## Observación operativa
Antes de esta corrida hubo un falso fallo local por artefacto `.next` inconsistente (`Cannot find module './vendor-chunks/@supabase.js'`). Se resolvió regenerando build local limpio; no correspondía a lógica funcional del producto.
