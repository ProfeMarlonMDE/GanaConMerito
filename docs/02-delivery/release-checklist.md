# Checklist de Release — GanaConMerito

Este documento define los pasos obligatorios para considerar un release como exitoso y estable.

## 1. Validación Pre-Release (Local)
- [ ] `npm run build` exitoso sin errores de lint ni tipos.
- [ ] `npm run test` exitoso (unitarias y de contrato).
- [ ] `git status` limpio (sin archivos sin trackear o cambios sin commit).
- [ ] Versión actualizada en `package.json`.
- [ ] Documentación actualizada (`status.md`, `change-log.md`).

## 2. Proceso de Deploy
- [ ] Push a la rama `master`.
- [ ] En el VPS: `git pull origin master`.
- [ ] En el VPS: Verificar que el HEAD coincida con el local (`git rev-parse --short HEAD`).
- [ ] Rebuild de contenedores:
  ```bash
  docker compose build --build-arg APP_COMMIT=$(git rev-parse --short HEAD) --build-arg APP_BUILD_TIME=$(date -u +"%Y-%m-%dT%H:%M:%SZ")
  docker compose up -d
  ```

## 3. Triple Verificación (Post-Deploy)
- [ ] **Capa 1 (Source)**: El commit en local es `X`.
- [ ] **Capa 2 (Deploy Tree)**: El commit en `/opt/gcm/app` es `X`.
- [ ] **Capa 3 (Runtime)**: La página `/login` muestra el commit `X` y el `buildTime` reciente.

## 4. Pruebas de Humo (Runtime)
- [ ] Acceso a `/login` carga correctamente.
- [ ] Login con Google funciona.
- [ ] Flujo de práctica carga ítems.
- [ ] Dashboard muestra estadísticas.
- [ ] Ejecutar `npm run qa:smoke:postdeploy` (si está disponible).

## 5. Cierre de Release
- [ ] Actualizar `docs/02-delivery/sprint-log.md` con el resultado.
- [ ] Notificar al USER el éxito verificado.
