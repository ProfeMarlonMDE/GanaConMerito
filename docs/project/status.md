---
id: PROJECT-STATUS
name: status
project: ganaconmerito
owner: marlon-arcila
status: active
artifact_type: project
last_reviewed: 2026-08-30
---

# Estado del Proyecto - GanaConMerito

Ultima actualizacion: 2026-09-08 — Cierre de Release v0.13.1 desplegado y verificado en produccion.

---

# Executive Operational Snapshot

## Current Sprint
v0.13.1 Production Release — Finalizado y Desplegado en Produccion.

## Current Runtime State
Runtime publico verificado en `https://ganaconmerito.com` mostrando `e4b3456` y build time 2026-09-08.

El HEAD actual del repo principal es `e4b34561debdca3439e76ed826c7ddfbf5f1ff85`. VPS `/opt/gcm/app` corre la imagen `gcm-canary-app:e4b3456` en el puerto canonico 3008.

## Last Verified Commit
`e4b34561debdca3439e76ed826c7ddfbf5f1ff85` como ultimo commit verificado en produccion.com`.
- Runtime: `gcm-production-9bea4d4`.
- Puerto canónico interno: `3008`.
- Imagen: `gcm-canary-app:9bea4d4`.
- ReleaseStamp: `PASS`.
- Public smoke: `PASS`.
- Authenticated smoke: `PASS`.
- Dashboard desktop/mobile: `PASS`.
- Tutor visible: `PASS`.

## Publicacion

- Tag: `v0.13.0`.
- Tag target: `9bea4d4959f11231c4c2e61f7f1eda5fe5caf87e`.
- GitHub Release: `published`.
- Release closeout: `docs/05-ops/V0.13.0-PRODUCTION-CLOSEOUT-20260906.md`.

## Candidata v0.13.1

- Version candidata: `0.13.1`.
- Release date candidata: `2026-09-07`.
- Master SHA candidata: `63b8b52262fa2119c56e624759ce38540db3b2bd`.
- PR Range (producción -> candidato): `9bea4d4959f11231c4c2e61f7f1eda5fe5caf87e` -> `63b8b52262fa2119c56e624759ce38540db3b2bd`.
- PRs funcionales/experiencia Tutor en candidato: `#137`, `#138`, `#139`, `#140`, `#141`, `#142`.
- PRs metadata en candidato: `#143` (metadata-only).
- PRs de cierre documental posterior: `#144` (release docs closeout).
- Saved response case: `CLOSED`.
- Validaciones: `PASS`.
- Producción activa: permanece en `0.13.0` hasta gate `V0_13_1_PRODUCTION_RELEASE`.
- Tag: pendiente (`TAG_CREATED=false`).


## Residual por clasificar

El inventario del servidor reporto contenedores historicos en `:3003` y `:3004` que no fueron autorizados para borrado en el gate anterior. No forman parte de la ruta productiva verificada. Deben identificarse antes de declararlos eliminables.

## Compatibilidad de contratos historicos

Este bloque existe unicamente para conservar contratos automatizados legacy mientras la historia completa vive fuera del snapshot operativo. No representa el estado vigente.

- Sprint 43 - Learning Paths + Misconception Signals: cerrado; sus senales pedagogicas forman parte de la historia del producto.
- Sprint 42 - Rich Ingestion Normalization: cerrado.
- Sprint 22: evidencia `synthesized_governed_unverified`; no cuenta con anexos oficiales suficientes para considerarse source-verified.

## Fuente de verdad

1. `VERSION.json` para version y fecha de release.
2. Tag/GitHub Release para identidad publicada.
3. `docs/05-ops/runtime-and-release.md` para runtime vigente.
4. Este archivo para snapshot ejecutivo.

No usar documentos historicos para inferir el estado actual de produccion.
\n## Updates\n- Unified Cargo/OPEC selector implemented in Profile. Technical debt and Visual Homogenization plan documented in `docs/project/homogenization-and-opec-debt.md`.
