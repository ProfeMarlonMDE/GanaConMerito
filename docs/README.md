# Documentación del proyecto

Este directorio centraliza la arquitectura y el estado técnico del MVP.

## Estado del sistema documental

### Taxonomía canónica objetivo
La estructura canónica objetivo del producto vive en:
- `docs/01-product/`
- `docs/02-delivery/`
- `docs/03-architecture/`
- `docs/04-quality/`
- `docs/05-ops/`
- `docs/06-governance/`
- `docs/07-compliance/`
- `docs/08-context/`

### Canónico puente por tema
Mientras se completa la normalización, estos directorios siguen siendo fuente válida por tema:
- `docs/database/`
- `docs/api/`

### Transición controlada
Estos directorios contienen mezcla de material vigente, puente e histórico:
- `docs/architecture/`
- `docs/project/`

### No canónico
- `docs/temp/` es inbox temporal y no debe usarse como fuente de verdad sin promoción explícita a la taxonomía formal.

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
