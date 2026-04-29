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
- `artifacts/qa-smoke-postdeploy-smoke-mojhi95t-gddtgp`

### 4. E2E API completa
```bash
QA_BASE_URL=http://127.0.0.1:3001 npm run qa:e2e:api
```
Resultado: pass.
Artifact root:
- `artifacts/qa-e2e-api-mojhj0b2-uufwag`

### 5. E2E UI Chromium completa
```bash
QA_BASE_URL=http://127.0.0.1:3001 npm run qa:e2e:ui
```
Resultado: pass.
Artifact root:
- `artifacts/qa-ui-e2e-ui-mojhkepe-4l4j3u`

## Qué quedó endurecido
- contrato explícito del dashboard con `historical` y `currentSession`
- clasificación `Fuertes` / `Por reforzar` aislada en módulo reutilizable y blindada con prueba determinista
- runners QA con identidad única por corrida (`api`, `ui`, `smoke`)
- purga básica de usuarios QA envejecidos
- smoke postdeploy corto y reusable
- runbook/checklist actualizados para distinguir smoke vs E2E completa

## Riesgos residuales
- falta validar este mismo paquete sobre runtime desplegado después de redeploy
- persiste deuda documental histórica ajena a esta sprint (`validate_docs.py` sigue listando pendientes previos)
