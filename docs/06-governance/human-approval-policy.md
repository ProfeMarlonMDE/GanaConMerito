---
id: GOV-HUMAN-APPROVAL
name: human-approval-policy
project: ganaconmerito
owner: marlon-arcila
status: active
artifact_type: governance
modules: [core, platform, auth, data]
tags: [aprobacion, hitl, control]
related:
  - GOV-WORKING-AGREEMENT
  - ADR-001-stack-base
last_reviewed: 2026-04-23
---

# Human approval policy

## Cambios que requieren aprobación humana obligatoria
- ADR nuevos o modificados
- cambios de stack
- cambios de base de datos o migraciones sensibles
- cambios de auth, permisos o seguridad
- manejo de secretos
- releases a producción
- cierre de deuda crítica
- cambios con impacto material en costos
- borrado de archivos históricos

## Qué puede aprobar la IA
- propuestas documentales
- borradores de sprint log y changelog
- registros preliminares de deuda e issues
- propuestas de ADR en estado `proposed` o `review`

## Qué no puede aprobar la IA
- arquitectura final
- excepciones de seguridad
- cambios estructurales productivos
- cierres de deuda crítica
- liberaciones a producción

## Estados válidos para ADR
- proposed
- review
- approved
- superseded
- rejected

## Regla de bloqueo
Si un cambio es estructural y el ADR relacionado no está en `approved`, el desarrollo queda bloqueado para integración o push como cambio autorizado.

## Tratamiento de deuda crítica y seguridad
- deuda crítica no se cierra sin evidencia humana
- hallazgos de seguridad se escalan primero, se documentan después si aplica
- si hay duda sobre exposición de secretos, se actúa como incidente

## Contexto heredado
Dado que ganaconmerito proviene de una operación anterior, la ausencia de evidencia no equivale a aprobación. Ante duda, el cambio se considera no aprobado hasta validación humana.
