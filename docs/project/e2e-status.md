# Estado de prueba E2E

## Objetivo
Verificar que la app puede compilar/arrancar como Next.js real y que el flujo base pueda probarse de extremo a extremo.

## Estado actual
Bloque técnico de build/arranque cerrado. E2E autenticada real del flujo completo validada otra vez sobre runtime limpio local. El banco operativo de práctica sigue consolidado en `27` preguntas nuevas y la sesión de práctica permanece en `5` turnos para validación funcional controlada.

## Bloqueos encontrados y resueltos
- el proyecto necesitaba consolidación como app Next real (`tsconfig.json`, `next-env.d.ts`, scripts de package.json)
- `NODE_ENV=production` estaba omitiendo `devDependencies`, dejando `next` fuera de `node_modules`
- varios imports en `src/app/api/**` estaban rompiendo la build real de Next por rutas incorrectas
- el middleware original rompía el runtime edge con `EvalError: Code generation from strings disallowed for this context`
- la QA UI falló temporalmente sobre runtimes viejos con assets/chunks stale de Next; el problema quedó delimitado como inconsistencia de runtime, no como falla funcional del flujo

## Acción correctiva aplicada
- se añadió configuración base de TypeScript y Next
- se definieron scripts `dev`, `build`, `start`
- se reinstalaron dependencias con inclusión explícita de devDependencies
- se sustituyeron imports problemáticos en rutas API críticas por imports relativos correctos
- se reemplazó la protección dispersa por una utilidad reusable `requireAuthenticatedUser(...)` para páginas server-side
- se dejó el `middleware.ts` en modo seguro mínimo para no romper build/runtime mientras se mantiene la protección en páginas y handlers server-side
- se alineó el flujo autenticado para resolver mejor `login -> onboarding -> practice`
- se movió el shell core a layout autenticado compartido para Home / Onboarding / Practice / Dashboard

## Validación realizada
- `npm run build` ✅
- `npm run dev` ✅
- smoke test sin sesión autenticada:
  - `/login` → `200 OK`
  - `/home` → `307 /login`
  - `/onboarding` → `307 /login`
  - `/practice` → `307 /login`
  - `/dashboard` → `307 /login`
- validación Docker mínima en entorno con acceso al daemon:
  - `npm ci` ✅
  - `npm run build` ✅
  - `docker compose build gcm-app` ✅
  - contenedor `gcm-app` levantado ✅
  - el `connection reset by peer` observado en smoke temprano quedó interpretado como latencia de arranque, no como caída persistente
- E2E autenticada real previa:
  - login Google real ✅
  - callback real a `/api/auth/callback` con aterrizaje exitoso en `/home` ✅
  - onboarding real ejecutado ✅
  - práctica real con `sessionId` visible y transición de estado ✅
  - dashboard real con datos coherentes tras la práctica ✅
- revalidación UI Chromium sobre runtime limpio local:
  - `QA_BASE_URL=http://127.0.0.1:3100 npm run qa:e2e:ui` ✅
  - `turnCount = 5` ✅
  - artifact root: `artifacts/qa-ui-e2e-ui-mokwxico-asel89`
- validación postdeploy sobre runtime objetivo `:3000`:
  - `QA_BASE_URL=http://127.0.0.1:3000 npm run qa:smoke:postdeploy` ✅
  - artifact root: `artifacts/qa-smoke-postdeploy-smoke-mokx9i6o-l9bsqm`
  - `QA_BASE_URL=http://127.0.0.1:3000 npm run qa:e2e:ui` ✅
  - `turnCount = 5` ✅
  - artifact root: `artifacts/qa-ui-e2e-ui-mokx9nfj-qf2goy`
- revalidación adicional sobre runtime objetivo tras fix de tooling QA:
  - `QA_BASE_URL=http://127.0.0.1:3000 npm run qa:smoke:postdeploy` ✅
  - artifact root: `artifacts/qa-smoke-postdeploy-smoke-momyxk5z-v4bm9k`
  - `QA_BASE_URL=http://127.0.0.1:3000 npm run qa:e2e:ui` ✅
  - `turnCount = 5` ✅
  - artifact root: `artifacts/qa-ui-e2e-ui-momyyjmk-niwgkj`

## Hallazgos funcionales de la corrida real
- el flujo principal `login -> onboarding -> practice -> dashboard` funciona de extremo a extremo
- el gate de onboarding ya no debe descubrirse tarde desde el botón de iniciar práctica; el flujo base ahora enruta primero a onboarding y luego a práctica
- la limitación anterior de continuidad por banco quedó corregida: el runtime dispone de un pool curado de `27` preguntas nuevas para práctica
- la práctica quedó configurada a `5` turnos para la validación funcional controlada
- el dashboard respondió con métricas coherentes con la práctica recién realizada
- se confirmó actividad real en Supabase remoto (`profiles`, `item_bank`, `user_topic_stats` y tablas asociadas)

## Incidente delimitado
- las corridas fallidas previas de UI sobre runtimes `3001/3002` no probaron un bug funcional del flujo; expusieron **assets/chunks stale de Next** en runtime bajo prueba
- evidencia: `Loading chunk ... failed` y respuestas `400` sobre `/_next/static/chunks/...`
- conclusión operativa: antes de declarar roja una E2E UI en este proyecto, validar si el runtime bajo prueba fue reconstruido limpiamente

## Nota de seguridad
Durante una auditoría externa se imprimieron secretos operativos desde el host/contenedor. Esos valores no deben volver a exponerse en salidas de diagnóstico, logs compartidos ni documentación. Corresponde rotarlos si se considera comprometido el material expuesto.

## Siguiente paso
- formalizar ADR corto del componente de asistentes antes de implementación
- usar esta validación como baseline para futuros cambios de UX/auth/dashboard
- mantener fuera de alcance la operación editorial/banco salvo orden ejecutiva explícita
- mantener el fix de tooling QA (`cleanupOldQaUsers`) como guardrail para evitar falsos rojos por identidades stale en Supabase
- conservar explícitamente `activeAreas` como requisito funcional obligatorio de onboarding
