# Estado del proyecto

## Ya implementado

### Base de datos
- migración inicial: `supabase/migrations/0001_init_mvp.sql`
- seed mínimo: `supabase/seed.sql`

### Dominio y tipos
- contratos TS base en `src/types/`
- máquina de estados MVP en `src/domain/orchestrator/session-machine.ts`
- scoring heurístico base en `src/domain/evaluation/score-response.ts`
- validador inicial de opciones en `src/domain/content/validate-item.ts`

### Backend HTTP
- stubs de rutas en `src/app/api/`

## Ya versionado

- `v0.1.0` — esquema y seed iniciales
- `v0.2.0` — scaffold backend tipado

## Próximo trabajo recomendado

1. parser Markdown real
2. validación estructural completa
3. carga persistente de contenido
4. inicio/avance de sesión con DB real
5. auth integrada con Supabase

## Observación importante

La documentación original extensa se conserva en `docs/arquitectura-mvp.md`, pero la referencia diaria debería ser este set de docs organizadas.
