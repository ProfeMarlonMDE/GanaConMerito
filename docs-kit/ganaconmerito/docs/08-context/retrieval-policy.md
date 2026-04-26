---
id: DOC-CTX-003
name: retrieval-policy
project: ganaconmerito
owner: doc-control
status: active
artifact_type: governance
modules: [context]
tags: [retrieval, contexto, ia]
related: [DOC-WA-001, DOC-CTX-001, DOC-CTX-002]
last_reviewed: 2026-04-23
---

# Retrieval Policy

## Regla principal

Los agentes no reciben todo el repo. Reciben solo el contexto mínimo suficiente.

## Paquete mínimo por tarea

1. `README.md`
2. `docs/06-governance/working-agreement.md`
3. `docs/03-architecture/system-overview.md`
4. `docs/01-product/backlog.md`
5. feature spec aplicable
6. ADRs relacionados
7. deuda e issues del módulo

## Criterios de selección

- relación por `modules`
- relación por `tags`
- coincidencia por `related`
- estado del documento
- criticidad del módulo

## Exclusiones

- archivos sin frontmatter no entran al índice oficial
- secretos o material sensible no se inyectan en contexto
