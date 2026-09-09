---
id: PROJECT-STATUS
name: status
project: ganaconmerito
owner: marlon-arcila
status: active
artifact_type: project
last_reviewed: 2026-08-30
---

# Estado actual - GanaConMerito

Este archivo contiene solo el estado operativo vigente. La historia permanece en Git, tags, GitHub Releases y documentos archivados.

## Produccion

<!-- Agent: Google_Antigravity | Model: Gemini 3.6 Flash -->
- Estado: `GREEN`.
- Version: `0.13.0`.
- Release date: `2026-09-06`.
- Final release SHA: `9bea4d4959f11231c4c2e61f7f1eda5fe5caf87e`.
- Repository governance HEAD: `c90f21eb31a8cdebc7cbfdc63b7849eeef7c11f7`.
- URL: `https://ganaconmerito.com`.
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
