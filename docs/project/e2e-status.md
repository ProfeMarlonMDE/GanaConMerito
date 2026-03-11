# Estado de prueba E2E

## Objetivo
Verificar que la app puede compilar/arrancar como Next.js real y que el flujo base pueda probarse de extremo a extremo.

## Estado actual
Bloque técnico de build/arranque cerrado. Pendiente E2E autenticada completa.

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

## Siguiente paso
- ejecutar E2E autenticada real: login → onboarding → practice → dashboard
- usar ese primer login real también para validar RA1 contra Supabase remoto, ya que hoy `profiles` y `learning_profiles` están en 0 en el proyecto remoto
- cerrar RA1 y el siguiente bloque con commit, tag y push
