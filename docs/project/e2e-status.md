# Estado de prueba E2E

## Objetivo
Verificar que la app puede compilar/arrancar como Next.js real y que el flujo base pueda probarse de extremo a extremo.

## Estado actual
Bloque técnico de build/arranque cerrado. E2E autenticada mínima real ejecutada con éxito controlado.

## Bloqueos encontrados y resueltos
- el proyecto necesitaba consolidación como app Next real (`tsconfig.json`, `next-env.d.ts`, scripts de package.json)
- `NODE_ENV=production` estaba omitiendo `devDependencies`, dejando `next` fuera de `node_modules`
- varios imports en `src/app/api/**` estaban rompiendo la build real de Next por rutas incorrectas
- el middleware original rompía el runtime edge con `EvalError: Code generation from strings disallowed for this context`

## Acción correctiva aplicada
- se añadió configuración base de TypeScript y Next
- se definieron scripts `dev`, `build`, `start`
- se reinstalaron dependencias con inclusión explícita de devDependencies
- se sustituyeron imports problemáticos en rutas API críticas por imports relativos correctos
- se reemplazó la protección dispersa por una utilidad reusable `requireAuthenticatedUser(...)` para páginas server-side
- se dejó el `middleware.ts` en modo seguro mínimo para no romper build/runtime mientras se mantiene la protección en páginas y handlers server-side

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
- E2E autenticada mínima real:
  - login Google real ✅
  - callback real a `/api/auth/callback` con aterrizaje exitoso en `/home` ✅
  - onboarding real ejecutado ✅
  - práctica real con `sessionId` visible y transición de estado ✅
  - dashboard real con datos coherentes tras la práctica ✅

## Hallazgos funcionales de la corrida real
- el flujo principal `login -> onboarding -> practice -> dashboard` ya funciona de extremo a extremo
- `onboarding` permitió guardar con `Áreas activas` en blanco; esto debe decidirse como comportamiento válido de MVP o endurecerse como validación
- la práctica llegó a estado `remediation`, pero el sistema informó que no había siguiente ítem disponible; esto no rompe la E2E mínima, pero sí limita continuidad real del producto
- el dashboard respondió con métricas coherentes con la práctica recién realizada
- se confirmó actividad real en Supabase remoto (`profiles`, `item_bank`, `user_topic_stats` y tablas asociadas)

## Nota de seguridad
Durante una auditoría externa se imprimieron secretos operativos desde el host/contenedor. Esos valores no deben volver a exponerse en salidas de diagnóstico, logs compartidos ni documentación. Corresponde rotarlos si se considera comprometido el material expuesto.

## Siguiente paso
- actualizar `status.md` y el assessment de madurez con la nueva evidencia E2E real
- corregir trazabilidad de despliegue para evitar `Build: unknown` / `Commit desplegado: unknown`
- decidir si `Áreas activas` puede seguir vacío en onboarding o si debe endurecerse
- ampliar banco de contenido o ajustar selector para evitar corte prematuro tras el primer turno
