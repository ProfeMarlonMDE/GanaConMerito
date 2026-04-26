---
id: DOC-GOV-005
name: human-approval-policy
project: ganaconmerito
owner: tech-lead
status: active
artifact_type: governance
modules: [core]
tags: [hitl, aprobacion-humana, governance]
related: [ADR-001, DOC-WA-001, DOC-QUAL-001]
last_reviewed: 2026-04-23
---

# Human Approval Policy

## Requiere aprobación humana obligatoria

- ADR nuevos o modificados
- cambios de stack
- cambios de base de datos
- autenticación y permisos
- secretos y credenciales
- releases a producción
- cierre de deuda crítica
- cambios de seguridad o costos
- borrado de archivos históricos

## La IA puede

- proponer documentos
- proponer ADRs
- sugerir changelog, sprint log y deuda
- señalar riesgos y bloqueos

## La IA no puede

- aprobar ADRs
- autorizar cambios estructurales
- cerrar deuda crítica por sí sola
- exponer secretos

## Estados válidos de ADR

- proposed
- review
- approved
- superseded
- rejected

## Regla de bloqueo

Si un cambio es estructural y el ADR aplicable no está en estado `approved`, el desarrollo queda bloqueado.

## Tratamiento de seguridad y deuda crítica

- cualquier hallazgo sensible escala a humano.
- deuda crítica no se cierra sin validación humana.
- si el proyecto heredado trae riesgos no documentados, se registran antes de intervenir a ciegas.
