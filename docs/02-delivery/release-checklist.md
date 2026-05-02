# Checklist de Release — GanaConMerito

Este documento define los pasos obligatorios para considerar un release como exitoso, trazable y operativamente verificable.

## 1. Validación Pre-Release (fuente canónica)
- [ ] Trabajo realizado en `/home/ubuntu/.openclaw/product`, no en `/opt/gcm/app`.
- [ ] `git status --short --branch` entendido y bajo control.
- [ ] `npm run build` verde.
- [ ] `npm run test:dashboard` verde como baseline mínima de contrato.
- [ ] Si hubo cambios documentales críticos: `python3 scripts/validate_docs.py` y `python3 scripts/build_context_index.py`.
- [ ] Documentación actualizada sin afirmar como “hecho” nada sin evidencia de runtime.

## 2. Proceso de Deploy
- [ ] Push a `master` con el commit exacto que se quiere ver en runtime.
- [ ] Sincronizar `/opt/gcm/app` desde Git; no editar deploy tree a mano.
- [ ] Confirmar que el HEAD en `/opt/gcm/app` coincide con el commit objetivo.
- [ ] Rebuild/recreate pasando metadata obligatoria:
  ```bash
  APP_COMMIT=$(git -C /opt/gcm/app rev-parse --short HEAD)
  APP_BUILD_TIME=$(date -u +"%Y-%m-%dT%H:%M:%SZ")
  docker compose -f /opt/gcm/docker-compose.yml build \
    --build-arg APP_COMMIT="$APP_COMMIT" \
    --build-arg APP_BUILD_TIME="$APP_BUILD_TIME" \
    gcm-app
  docker compose -f /opt/gcm/docker-compose.yml up -d gcm-app
  ```

## 3. Triple Verificación (obligatoria)
- [ ] **Source**: `git -C /home/ubuntu/.openclaw/product rev-parse --short HEAD` = `X`.
- [ ] **Deploy tree**: `git -C /opt/gcm/app rev-parse --short HEAD` = `X`.
- [ ] **Runtime visible**: `/login` muestra `commit = X`.
- [ ] **BuildTime visible**: `/login` muestra `buildTime` reciente y coherente.
- [ ] Si una de las 4 comprobaciones falla, el release no se considera cerrado.

## 4. Gates QA Postdeploy (runtime `:3000`)
- [ ] `QA_BASE_URL=http://127.0.0.1:3000 npm run qa:smoke:postdeploy`
- [ ] Si el cambio toca backend/sesiones/dashboard: `QA_BASE_URL=http://127.0.0.1:3000 npm run qa:e2e:api`
- [ ] Si el cambio toca onboarding/practice/dashboard/UI: `QA_BASE_URL=http://127.0.0.1:3000 npm run qa:e2e:ui`
- [ ] Guardar artifact roots de cada corrida verde en docs de cierre.
- [ ] Si una corrida tarda anormalmente o depende de bootstrap host-specific, dejarlo explícito como riesgo operativo; no maquillarlo como verde limpio.

## 5. Cierre documental
- [ ] Actualizar `docs/project/status.md`, `docs/02-delivery/sprint-log.md` y `docs/02-delivery/change-log.md`.
- [ ] Diferenciar explícitamente entre HEAD actual del repo y último runtime triple-verificado si no coinciden.
- [ ] No marcar sprint/release como cerrado mientras falte un gate obligatorio o no exista owner claro del bloqueo.
