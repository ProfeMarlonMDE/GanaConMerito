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
- callback auth preparado en `src/app/api/auth/callback/route.ts`

### Supabase en proyecto
- variables de entorno locales configuradas
- cliente browser Supabase listo
- cliente server Supabase listo
- cliente admin Supabase listo

## Ya versionado

- `v0.1.0` — esquema y seed iniciales
- `v0.2.0` — scaffold backend tipado
- `v0.2.1` — documentación de arquitectura organizada
- `v0.2.2` — inicialización local de Supabase
- `v0.2.3` — seed remoto funcional

## Próximo trabajo recomendado

1. helper de login con Google
2. protección de rutas privadas
3. bootstrap real de `profiles`
4. bootstrap real de `learning_profiles`
5. parser Markdown real
6. carga persistente de contenido
7. sesiones con DB real

## Documentos relevantes

- `docs/architecture/overview.md`
- `docs/architecture/decisions.md`
- `docs/api/contracts.md`
- `docs/project/google-auth-setup.md`
- `docs/project/tooling-stack.md`

## Observación importante

Google Auth aún requiere activación manual en dashboard de Supabase y Google Cloud Console.
