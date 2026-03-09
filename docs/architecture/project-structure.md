# Estructura del proyecto

## Estado actual del repo

```text
docs/
  arquitectura-mvp.md
  README.md
  architecture/
  api/
  database/
  project/
src/
  app/api/
  domain/
  lib/supabase/
  types/
supabase/
  migrations/
  seed.sql
```

## Responsabilidades por carpeta

### `src/types/`
Contratos del sistema:
- sesión
- evaluación
- contenido
- turnos

### `src/domain/`
Lógica de negocio:
- orquestador
- evaluación
- validación de contenido

### `src/app/api/`
Capa de entrada HTTP del backend MVP.

### `src/lib/supabase/`
Clientes de integración con Supabase.

### `supabase/migrations/`
Migraciones SQL ejecutables del esquema.

### `supabase/seed.sql`
Datos mínimos de arranque.

### `docs/`
Arquitectura, contratos y estado del proyecto.

## Criterio de diseño

Los `route.ts` deben mantenerse delgados.
La lógica real debe vivir en `src/domain/*` y apoyarse en `src/types/*`.
