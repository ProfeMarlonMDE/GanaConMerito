---
id: ADR-001-stack-base
name: adr-stack-base
project: ganaconmerito
owner: marlon-arcila
status: approved
artifact_type: adr
modules: [platform, auth, data]
tags: [adr, stack, arquitectura]
related:
  - ARCH-SYSTEM-OVERVIEW
  - GOV-HUMAN-APPROVAL
last_reviewed: 2026-04-24
---

# ADR-001: Stack base de GanaConMerito

## Estado
approved

## Fecha
2026-04-24

## Contexto
El repositorio ya opera sobre una base funcional validada con evidencia en código, migraciones, despliegue y documentación operativa. Existe implementación real y trazabilidad suficiente para congelar formalmente el stack vigente como baseline arquitectónico, evitando cambios estructurales implícitos sobre una base heredada.

## Decisión
Se aprueba como stack base oficial de GanaConMerito:
- Next.js como aplicación principal web y servidor del producto
- Supabase como plataforma de autenticación, persistencia y operaciones de datos
- Docker como mecanismo estándar de empaquetado y despliegue reproducible
- Git + Markdown + scripts locales como sistema documental y de gobernanza operativa del producto

Cualquier cambio sobre estos componentes base, o la incorporación de un sustituto estructural, requerirá un ADR nuevo o un ADR que reemplace explícitamente este.

## Alternativas consideradas
1. Mantener el stack sin ADR formal. Rechazada por falta de trazabilidad.
2. Replantear stack completo antes de estabilizar operación. Rechazada por alto riesgo y poca evidencia.
3. Formalizar stack actual y revisar cambios mayores vía ADR posterior. Aprobada.

## Consecuencias
- El stack actual queda congelado como baseline aprobado.
- Se desbloquea la formalización del Sprint 1 de producto sobre gobernanza, trazabilidad y normalización documental.
- No se permite introducir cambios estructurales de stack sin nuevo ADR aprobado.
- La deuda heredada asociada a decisiones sin ADR uniforme permanece visible en el debt register hasta completar la normalización documental.
- La prioridad inmediata del producto no es cambiar de stack, sino endurecer trazabilidad, ownership, continuidad funcional y calidad operativa.

## Impacto en módulos
- `platform`: referencia principal de ejecución
- `auth`: acoplado a Supabase hasta nueva decisión aprobada
- `data`: migraciones y modelo deben mantenerse coherentes

## Aprobación humana
- Estado de aprobación: APROBADO
- Aprobador: Marlon Arcila
- Observaciones: Se aprueba el stack vigente como baseline oficial del producto. La siguiente fase se enfoca en gobernanza mínima, normalización documental y ejecución controlada del roadmap inmediato.
