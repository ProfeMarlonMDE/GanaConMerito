# Documentación del proyecto

Este directorio centraliza la arquitectura y el estado técnico del MVP.

## Índice

### Arquitectura
- `architecture/overview.md` — visión general, capas y decisiones rectoras
- `architecture/decisions.md` — decisiones técnicas cerradas del MVP
- `architecture/project-structure.md` — organización de carpetas y responsabilidades
- `architecture/state-machine.md` — estados persistidos, procesos y transiciones

### Base de datos
- `database/schema.md` — modelo de datos resumido
- `database/security.md` — RLS, admin y criterios de seguridad
- `database/content-model.md` — modelo de contenidos Markdown e ítems

### API
- `api/contracts.md` — DTOs oficiales y rutas backend del MVP

### Proyecto
- `project/status.md` — estado real del repo, entregables ya implementados y siguiente trabajo

## Fuente operativa

Los artefactos ejecutables actuales están en:
- `supabase/migrations/0001_init_mvp.sql`
- `supabase/seed.sql`
- `src/types/*`
- `src/domain/*`
- `src/app/api/*`

## Nota

El documento histórico largo original se conserva en:
- `arquitectura-mvp.md`

Ese archivo queda como fuente cronológica. Los documentos anteriores son la versión organizada y mantenible.
