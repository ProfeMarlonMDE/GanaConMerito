# Runtime and Release Baseline

Status: canonical
Owner: PM-Governance
Last reviewed: 2026-08-30
Related files:
- `AGENTS.md`
- `VERSION.json`
- `docs/project/status.md`
- `docs/02-delivery/versioning-and-releases.md`
- `docs/02-delivery/release-checklist.md`

## Objetivo

Mantener una sola referencia breve del runtime vigente y evitar que evidencia historica compita con produccion actual.

## Fuente de verdad operacional

1. repositorio remoto principal;
2. `VERSION.json`;
3. runtime visible;
4. evidencia de release/closeout.

Repositorio: `https://github.com/MarlonMedellin/GanaConMerito`

Runtime publico: `https://ganaconmerito.com`


## Producción vigente

<!-- Agent: Google_Antigravity | Model: Gemini 3.6 Flash -->
- Version: `0.13.0`.
- Release date: `2026-09-06`.
- Application release SHA: `9bea4d4959f11231c4c2e61f7f1eda5fe5caf87e`.
- Repository governance HEAD: `c90f21ebf3ac2cdd3eb7b78d9c9a93d88d47c95a`.
- Container: `gcm-production-9bea4d4`.
- Puerto canónico interno: `3008`.
- Imagen inmutable: `gcm-canary-app:9bea4d4`.
- Build time: `2026-09-07T01:13:10Z`.
- nginx upstream: `127.0.0.1:3008`.
- Rollback SHA disponible: `ccf57a671c715ced0697bbb14744c59b19b569e3` (`gcm-canary-app:ccf57a67`).
- ReleaseStamp: `PASS`.
- Public smoke: `PASS`.
- Authenticated smoke: `PASS`.
- Tag: `v0.13.0` -> `9bea4d4959f11231c4c2e61f7f1eda5fe5caf87e`.
- GitHub Release: `published tag`.

## Evidencia de cierre

`docs/05-ops/V0.13.0-PRODUCTION-CLOSEOUT-20260906.md`

## Candidata v0.13.1 - metadata preparada

<!-- Agent: Google_Antigravity | Model: Gemini 3.6 Flash -->
- Version: `0.13.1`.
- Candidate Master SHA: `63b8b52262fa2119c56e624759ce38540db3b2bd`.
- PR Range (producción -> candidato): `9bea4d4959f11231c4c2e61f7f1eda5fe5caf87e` -> `63b8b52262fa2119c56e624759ce38540db3b2bd`.
- PRs funcionales/experiencia Tutor: `#137`, `#138`, `#139`, `#140`, `#141`, `#142`.
- PRs metadata y gobernanza de release: `#143` (metadata-only), `#144` (release docs closeout).
- Saved Response Case: `CLOSED`.
- Validaciones: `PASS` (Functional contracts, production regression test, typecheck, build, CI).
- Producción vigente: permanece en `0.13.0` (`9bea4d4959f11231c4c2e61f7f1eda5fe5caf87e`) hasta gate `V0_13_1_PRODUCTION_RELEASE`.
- Tag: pendiente (`TAG_CREATED=false`).

