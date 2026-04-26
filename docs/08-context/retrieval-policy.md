---
id: CTX-RETRIEVAL-POLICY
name: retrieval-policy
project: ganaconmerito
owner: marlon-arcila
status: active
artifact_type: ops
modules: [core]
tags: [contexto, retrieval, ia]
related:
  - CTX-TAGGING-SCHEMA
  - CTX-CONTEXT-INDEX
last_reviewed: 2026-04-23
---

# Retrieval policy

## Objetivo
Entregar a cada agente solo el contexto mínimo útil para actuar con precisión y sin sobrecarga.

## Contexto base obligatorio
1. `README.md`
2. `docs/06-governance/working-agreement.md`
3. `docs/03-architecture/system-overview.md`
4. `docs/01-product/backlog.md`

## Contexto adicional por tarea
- spec del feature o módulo
- ADRs relacionados
- deuda del módulo
- issues del módulo
- runbook o política sensible aplicable

## Reglas
- no entregar todo el repo por defecto
- priorizar documentos activos o approved
- si falta evidencia, marcar vacío de contexto
- si el cambio es estructural, incluir ADR aplicable o bloquear acción
