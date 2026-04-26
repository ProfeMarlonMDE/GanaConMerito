---
id: ARCH-SYSTEM-OVERVIEW
name: system-overview
project: ganaconmerito
owner: marlon-arcila
status: active
artifact_type: ops
modules: [platform, editorial, auth, data]
tags: [arquitectura, overview, herencia]
related:
  - ADR-001-stack-base
  - QUAL-DEBT-REGISTER
last_reviewed: 2026-04-23
---

# System overview

## Resumen ejecutivo
El repositorio evidencia una base sobre Next.js y Supabase, con documentación previa distribuida en arquitectura, proyecto, base de datos y operación. La prioridad inmediata no es reinventar la arquitectura, sino volverla trazable, gobernable y consistente con el código real.

## Componentes observados
- Aplicación web en Next.js bajo `src/app`
- Componentes UI y lógica de soporte en `src/components` y `src/lib`
- Dominio de negocio segmentado en `src/domain`
- Supabase con migraciones en `supabase/migrations`
- Documentación previa repartida en `docs/architecture`, `docs/project`, `docs/database` y `docs/api`
- Activos de contenido y banco de preguntas bajo `content/`

## Arquitectura recibida
- Existe documentación previa, pero no toda está normalizada bajo un mismo sistema documental.
- Hay decisiones históricas dispersas en varios markdowns.
- Existen migraciones y planes de implementación que sugieren evolución incremental del producto.
- Supuesto heredado: parte de la arquitectura fue definida sin ADR formal uniforme.

## Arquitectura aprobada actual
- Frontend y servidor sobre Next.js.
- Persistencia, auth y parte del backend operativo sobre Supabase.
- Docker como vehículo de contenedorización.
- Gobernanza documental en Git con Markdown, ADRs y validaciones locales.

## Arquitectura objetivo
- Documentación trazable y consumible por agentes.
- Decisiones estructurales formalizadas por ADR.
- Mapa claro entre módulos, owners, deuda, issues y runbooks.
- Recuperación selectiva de contexto basada en metadatos.
- Bloqueo explícito para cambios estructurales sin aprobación humana.

## Módulos principales
- `editorial`
- `auth`
- `question-bank`
- `dashboard`
- `session/orchestrator`
- `supabase-data`

## Riesgos de continuidad
- Decisiones previas sin ADR aprobado.
- Dependencias implícitas entre frontend, dominio y esquema de datos.
- Owners de algunos artefactos aún no formalizados.
- Posible divergencia entre documentación antigua y estado real del código.

## Vacíos de contexto
- TODO: diagrama oficial de módulos y dependencias.
- TODO: flujo aprobado extremo a extremo de onboarding, login, práctica y editorial.
- TODO: mapa de eventos críticos y observabilidad.
