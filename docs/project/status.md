# Estado del proyecto

## Ya implementado

### Base de datos
- migración inicial: `supabase/migrations/0001_init_mvp.sql`
- seed mínimo funcional: `supabase/seed.sql`
- proyecto remoto Supabase enlazado y migración aplicada
- seed remoto aplicado con éxito

### Dominio y tipos
- contratos TS base en `src/types/`
- máquina de estados MVP en `src/domain/orchestrator/session-machine.ts`
- scoring heurístico base en `src/domain/evaluation/score-response.ts`
- validador inicial de opciones en `src/domain/content/validate-item.ts`

### Backend HTTP
- stubs de rutas en `src/app/api/`
- callback auth endurecido en `src/app/api/auth/callback/route.ts`

### Supabase en proyecto
- variables de entorno locales configuradas
- cliente browser Supabase listo
- cliente server Supabase listo
- cliente admin Supabase separado de SSR/cookies
- helper `signInWithGoogle` creado
- helper `signOut` creado
- bootstrap automático de `profiles`
- bootstrap conservador de `learning_profiles`

### Flujo auth visible
- página real de login en `src/app/login/page.tsx`
- botón Google real en `src/components/auth/google-sign-in-button.tsx`
- home protegida en `src/app/home/page.tsx`
- botón de cierre de sesión en `src/components/auth/sign-out-button.tsx`
- middleware de protección básica ampliado en `src/middleware.ts`

### Contenido Markdown mínimo
- estructura inicial `content/`
- 3 ítems canónicos de ejemplo
- 2 referencias normativas base
- checklist editorial mínima

## Ya versionado

- `v0.1.0` — esquema y seed iniciales
- `v0.2.0` — scaffold backend tipado
- `v0.2.1` — documentación de arquitectura organizada
- `v0.2.2` — inicialización local de Supabase
- `v0.2.3` — seed remoto funcional
- `v0.2.4` — integración real de Supabase y preparación de Google Auth
- `v0.2.5` — bootstrap de perfiles tras callback Google
- `v0.2.6` — hardening de auth
- `v0.2.7` — UI base de login y ruta protegida
- `v0.2.8` — sign out y ampliación de rutas protegidas

## Próximo trabajo recomendado

1. parser Markdown real
2. validación estructural completa
3. carga persistente de contenido
4. prueba E2E real de login
5. sesiones con DB real
6. dashboard con datos reales

## Documentos relevantes

- `docs/architecture/overview.md`
- `docs/architecture/decisions.md`
- `docs/api/contracts.md`
- `docs/project/google-auth-setup.md`
- `docs/project/auth-hardening-audit.md`
- `docs/project/tooling-stack.md`

## Observación importante

Ya existe base documental y contenido mínimo suficiente para pasar al parser Markdown y a la carga persistente.
