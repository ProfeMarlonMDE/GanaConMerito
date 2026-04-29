---
id: OPS-DEPLOY-CHECKLIST
name: deploy-checklist
project: ganaconmerito
owner: marlon-arcila
status: active
artifact_type: ops-checklist
modules: [platform, deploy]
tags: [deploy, checklist, product, vps]
related:
  - OPS-RUNBOOK
last_reviewed: 2026-04-29
---

# Checklist operativo de desarrollo y deploy

## Regla base
- `~/.openclaw/product` = desarrollo, QA, commit y push
- `/opt/gcm/app` = deploy reconstruido desde Git

## Checklist corto

### Desarrollo
- [ ] estoy trabajando en `~/.openclaw/product`
- [ ] validé el cambio localmente
- [ ] revisé diff antes de commit
- [ ] hice commit limpio
- [ ] hice push a GitHub

### Deploy
- [ ] `/opt/gcm/app` fue sincronizado desde Git
- [ ] el build usa `APP_COMMIT`
- [ ] el build usa `APP_BUILD_TIME`
- [ ] `docker compose` reconstruyó `gcm-app`
- [ ] `/login` muestra el commit esperado
- [ ] `/login` muestra build time válido

### Regla de incidentes
- [ ] si inspeccioné `/opt/gcm/app`, el fix volvió a `~/.openclaw/product`
- [ ] no dejé hotfix persistente solo en VPS
