---
id: QUAL-DASHBOARD-HARDENING-2026-04-29
name: dashboard-hardening-run-2026-04-29
project: ganaconmerito
owner: gauss
status: active
artifact_type: quality
modules: [dashboard, qa, backend, frontend, ops]
tags: [hardening, qa, dashboard, smoke]
related:
  - docs/api/dashboard-summary-contract.md
  - docs/04-quality/qa-semantica-runbook.md
  - docs/04-quality/known-issues.md
  - docs/05-ops/deploy-checklist.md
last_reviewed: 2026-04-29
---

# Evidencia — hardening dashboard y estabilidad QA

## Validaciones ejecutadas
### 1. Prueba determinista de clasificación
```bash
npm run test:dashboard
```
Resultado: pass (`8/8`).

### 2. Build de app
```bash
npm run build
```
Resultado: pass.

### 3. Smoke postdeploy/local mínimo
```bash
QA_BASE_URL=http://127.0.0.1:3001 npm run qa:smoke:postdeploy
```
Resultado: pass.
Artifact root:
- `artifacts/qa-smoke-postdeploy-smoke-mojhvmwm-qnypgn`

### 4. E2E API completa
```bash
QA_BASE_URL=http://127.0.0.1:3001 npm run qa:e2e:api
```
Resultado: pass.
Artifact root:
- `artifacts/qa-e2e-api-mojhwbjw-qoudrd`

### 5. E2E UI Chromium completa
```bash
QA_BASE_URL=http://127.0.0.1:3001 npm run qa:e2e:ui
```
Resultado: pass.
Artifact root:
- `artifacts/qa-ui-e2e-ui-mojhxn51-sueeeh`

## Qué quedó endurecido
- contrato explícito del dashboard con `historical` y `currentSession`
- clasificación `Fuertes` / `Por reforzar` aislada en módulo reutilizable y blindada con prueba determinista
- runners QA con identidad única por corrida (`api`, `ui`, `smoke`)
- purga básica de usuarios QA envejecidos
- smoke postdeploy corto y reusable
- runbook/checklist actualizados para distinguir smoke vs E2E completa

## Validación adicional sobre runtime desplegado
### 6. Redeploy oficial sobre `/opt/gcm/app`
- árbol resincronizado contra `origin/master`
- commit desplegado validado en `/login`: `de108cf`
- build time visible: `2026-04-29T10:40:32Z`

### 7. Smoke postdeploy sobre runtime objetivo (`:3000`)
```bash
QA_BASE_URL=http://127.0.0.1:3000 npm run qa:smoke:postdeploy
```
Resultado: pass.
Artifact root:
- `artifacts/qa-smoke-postdeploy-smoke-mojxgij3-5h863c`

### 8. E2E API autenticada sobre runtime objetivo (`:3000`)
```bash
QA_BASE_URL=http://127.0.0.1:3000 npm run qa:e2e:api
```
Resultado: pass.
Artifact root:
- `artifacts/qa-e2e-api-mojxh6aw-ujwp8m`

## Riesgos residuales
- persiste deuda documental histórica ajena a esta sprint (`validate_docs.py` sigue listando pendientes previos)
- conviene repetir la E2E UI completa en un próximo deploy que sí cambie lógica funcional, para conservar el gate visual junto con smoke + E2E API
