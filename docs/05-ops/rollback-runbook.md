---
id: OPS-ROLLBACK-RUNBOOK
name: rollback-runbook
project: ganaconmerito
owner: marlon-arcila
status: active
artifact_type: runbook
modules: [platform, deploy]
tags: [rollback, deploy, incident]
related:
  - OPS-RUNBOOK
  - OPS-DEPLOY-CHECKLIST
last_reviewed: 2026-04-29
---

# Runbook corto de rollback

## Objetivo
Volver producción al último commit estable sin improvisar.

## Cuándo activarlo
Activar rollback si después de deploy ocurre alguno de estos:
- la app no levanta
- `/login` no carga o muestra build inconsistente
- smoke test o QA funcional falla de forma material
- aparece regresión crítica en onboarding, práctica, cierre de sesión o dashboard

## Regla base
- el commit objetivo del rollback debe existir en GitHub
- el rollback se ejecuta sobre `/opt/gcm/app`
- el fix posterior siempre vuelve a `~/.openclaw/product`

## Datos que debes definir antes de correrlo
- `ROLLBACK_COMMIT=<commit_estable>`
- confirmar que ese commit es realmente el último sano

## Secuencia oficial
```bash
git -C /opt/gcm/app fetch origin
git -C /opt/gcm/app checkout master
git -C /opt/gcm/app reset --hard "$ROLLBACK_COMMIT"

APP_COMMIT=$(git -C /opt/gcm/app rev-parse --short HEAD)
APP_BUILD_TIME=$(date -u +%Y-%m-%dT%H:%M:%SZ)

docker compose -f /opt/gcm/docker-compose.yml build \
  --no-cache \
  --build-arg APP_COMMIT="$APP_COMMIT" \
  --build-arg APP_BUILD_TIME="$APP_BUILD_TIME" \
  gcm-app

docker compose -f /opt/gcm/docker-compose.yml up -d gcm-app
```

## Verificación mínima post-rollback
1. abrir `/login`
2. confirmar que `Commit desplegado` coincide con `APP_COMMIT`
3. confirmar que `Build time` cambió y no está vacío
4. correr smoke/QA mínima aplicable
5. confirmar que el síntoma crítico desapareció

## Cierre del incidente
- registrar qué commit se retiró
- registrar a qué commit se volvió
- registrar causa del rollback
- abrir corrección en `~/.openclaw/product`
- prohibido dejar fix definitivo solo en VPS
