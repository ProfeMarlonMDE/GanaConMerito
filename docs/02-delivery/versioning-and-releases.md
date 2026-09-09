# GanaConMerito Versioning and Release Policy

Status: canonical
Owner: Release Owner
Last reviewed: 2026-09-01
Related files:
- `VERSION.json`
- `src/lib/app-version.ts`
- `src/lib/build-info.ts`
- `docs/02-delivery/release-checklist.md`
- `docs/05-ops/runtime-and-release.md`

## Fuente de verdad

La version publica de la aplicacion se define unicamente en `VERSION.json`.

Runtime identity:

- version y release date: `VERSION.json`;
- build commit y build time: `src/lib/build-info.ts`;
- evidencia de deploy: runtime visible y `ReleaseStamp`.

No crear una segunda constante editable de version. `package.json.version` no es la fuente publica de release salvo decision futura explicita.

## Release vigente en producción

<!-- Agent: Google_Antigravity | Model: gemini-2.5-pro -->
- Version: `0.13.1`.
- Release date: `2026-09-08`.
- Deployed Application SHA (`DEPLOYED_APPLICATION_SHA` / `RUNTIME_SHA`): `e4b34561debdca3439e76ed826c7ddfbf5f1ff85`.
- Repository governance HEAD: `594083b0922b70b086d894b5094cc6892af4380a`.
- Estado: `CLOSED`.
- Produccion: `https://ganaconmerito.com`.
- Runtime: `gcm-production-e4b3456` en puerto interno `:3008`.
- Tag: `v0.13.1`.
- GitHub Release: `published` (`https://github.com/MarlonMedellin/GanaConMerito/releases/tag/v0.13.1`).
- ReleaseStamp: `PASS`.
- Public smoke: `PASS`.
- Authenticated smoke: `PASS`.
- Rollback disponible: `9bea4d4959f11231c4c2e61f7f1eda5fe5caf87e` (v0.13.0).
- Evidencia de cierre: `docs/05-ops/V0.13.1-PRODUCTION-CLOSEOUT-20260908.md`.
- Estado: `CANDIDATE_METADATA_PREPARED`.
- Validaciones: `PASS` (Functional contracts, real production path regression test, typecheck, build, CI).
- Produccion vigente: `0.13.0` hasta gate `V0_13_1_PRODUCTION_RELEASE` y despliegue.
- Rollback baseline en produccion: `9bea4d4959f11231c4c2e61f7f1eda5fe5caf87e`.
- Tag: pendiente (no creado en este gate; `TAG_CREATED=false`).
- GitHub Release: pendiente.
- Sin migraciones, Content Sync ni cambios Supabase remoto.

## Semantic Versioning

Formato:

`MAJOR.MINOR.PATCH`

- PATCH: correccion compatible sin cambio funcional relevante.
- MINOR: nueva funcionalidad compatible, cambio UX o comportamiento de producto.
- MAJOR: cambio incompatible o milestone formal 1.0+.

Mientras el producto sea pre-1.0 se mantiene la familia `0.x.y`.

## Procedimiento minimo de release

1. Determinar bump SemVer por alcance real.
2. Actualizar `VERSION.json.version` y `releaseDate`.
3. Registrar `CANDIDATE_SHA`.
4. Ejecutar solo validaciones afectadas y CI obligatorio.
5. Fusionar por el camino aprobado y registrar `FINAL_RELEASE_SHA`.
6. Construir/desplegar con metadata coherente.
7. Verificar `ReleaseStamp` y runtime SHA.
8. Promover el artefacto Canary validado cuando sea posible.
9. Ejecutar smoke autenticado solo cuando el riesgo/superficie lo requiera.
10. Publicar tag y GitHub Release sobre `FINAL_RELEASE_SHA`.
11. Retirar rollback en un gate posterior y controlado.

## Reglas criticas

- Nunca reutilizar una version para codigo de release distinto.
- Nunca mover un tag publicado a un commit documental posterior.
- Un rebuild del mismo codigo puede conservar version y release date, pero cambia build time.
- No repetir suites, Content Sync, G6, migraciones o deploys si el cambio no los afecta.
- Commits documentales posteriores al release no cambian la identidad del runtime publicado.
