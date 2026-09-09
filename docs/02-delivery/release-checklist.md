# Checklist de Release - GanaConMerito

Status: canonical
Owner: Release Owner
Last reviewed: 2026-09-01
Related files:
- `VERSION.json`
- `docs/02-delivery/versioning-and-releases.md`
- `docs/05-ops/runtime-and-release.md`

Este archivo contiene el baseline vigente y el procedimiento reutilizable para la siguiente release. La evidencia historica permanece en Git, tags, GitHub Releases y closeouts versionados.

## Baseline vigente

- VERSION=`0.13.0`
- RELEASE_DATE=`2026-09-06`
- RELEASE_STATUS=`CLOSED`
- FINAL_RELEASE_SHA=`9bea4d4959f11231c4c2e61f7f1eda5fe5caf87e`
- PRODUCTION_URL=`https://ganaconmerito.com`
- PRODUCTION_RUNTIME=`gcm-production-9bea4d4`
- PRODUCTION_PORT=`3008`
- PRODUCTION_RUNTIME_SHA=`9bea4d4959f11231c4c2e61f7f1eda5fe5caf87e`
- RELEASE_STAMP=`PASS`
- PUBLIC_RUNTIME_SMOKE=`PASS`
- AUTHENTICATED_SMOKE=`PASS`
- RELEASE_TAG=`v0.13.0`
- GITHUB_RELEASE=`published`

## Cierre v0.13.0

- [x] Release SHA exacto desplegado y verificado (`9bea4d4959f11231c4c2e61f7f1eda5fe5caf87e`).
- [x] Production promotion PASS.
- [x] ReleaseStamp PASS.
- [x] Public smoke PASS.
- [x] Authenticated smoke PASS.
- [x] Dashboard desktop/mobile PASS.
- [x] Tutor visible PASS.
- [x] Tag `v0.13.0` publicado sobre el release SHA.
- [x] GitHub Release publicada.
- [x] Sin migraciones, Content Sync ni cambios Supabase remoto.

Evidencia de cierre: `docs/05-ops/V0.13.0-PRODUCTION-CLOSEOUT-20260906.md`.

## Procedimiento para la siguiente release

1. Determinar bump SemVer por alcance real.
2. Actualizar `VERSION.json`.
3. Definir `CANDIDATE_SHA`.
4. Ejecutar solo validaciones proporcionales al cambio y CI requerido.
5. Fusionar por PR y registrar `FINAL_RELEASE_SHA`.
6. Desplegar exactamente ese SHA en Canary / Producción.
7. Promover el mismo artefacto validado cuando sea posible.
8. Verificar ReleaseStamp, public smoke y gates afectados.
9. Hacer smoke autenticado cuando cambien superficies autenticadas o sea requerido para retirar rollback.
10. Publicar tag y GitHub Release sobre el release SHA, no sobre commits documentales posteriores.
11. Retirar rollback en gate separado cuando la nueva produccion este suficientemente validada.

No repetir tests, sync, G6, migraciones o deploys si el cambio no los afecta.

## Candidata v0.13.1 - metadata preparada

- VERSION=`0.13.1`
- RELEASE_DATE=`2026-09-07`
- RELEASE_STATUS=`CANDIDATE_METADATA_PREPARED`
- PR_RANGE=`9bea4d4959f11231c4c2e61f7f1eda5fe5caf87e -> 63b8b52262fa2119c56e624759ce38540db3b2bd`
- FUNCTIONAL_PRS=`#137, #138, #139, #140, #141, #142`
- CANDIDATE_METADATA_PRS=`#143 (metadata-only)`
- POST_BASELINE_CLOSEOUT_PRS=`#144 (release docs closeout)`
- SAVED_RESPONSE_CASE=`CLOSED`
- CODE_BASELINE_SHA=`63b8b52262fa2119c56e624759ce38540db3b2bd`
- PRODUCTION_VERSION_REMAINS=`0.13.0`
- VALIDATIONS=`PASS`
- CI=`PASS`
- CANARY=`PENDING`
- PRODUCTION_PROMOTION=`PENDING (Gate V0_13_1_PRODUCTION_RELEASE)`
- RELEASE_TAG=`PENDING (TAG_CREATED=false)`
- GITHUB_RELEASE=`PENDING`
- MIGRATIONS=`NO`
- CONTENT_SYNC=`NO`
- G6=`NO`
- SUPABASE_REMOTE_CHANGE=`NO`

Esta seccion prepara metadata candidata. No declara v0.13.1 desplegada, publicada, cerrada ni promovida a produccion.
