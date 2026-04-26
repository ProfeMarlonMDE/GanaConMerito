---
id: CTX-TAGGING-SCHEMA
name: tagging-schema
project: ganaconmerito
owner: marlon-arcila
status: active
artifact_type: ops
modules: [core]
tags: [contexto, metadatos, retrieval]
related:
  - CTX-RETRIEVAL-POLICY
last_reviewed: 2026-04-23
---

# Tagging schema

## Campos requeridos
- `id`
- `name`
- `project`
- `owner`
- `status`
- `artifact_type`
- `modules`
- `tags`
- `related`
- `last_reviewed`

## Convenciones
- `id` debe ser único y estable.
- `modules` debe mapear a dominios reales del repositorio.
- `tags` debe ser corto, semántico y útil para recuperación.
- `related` debe enlazar documentos, ADRs o registros relevantes.

## Tipos permitidos
- product
- delivery
- adr
- runbook
- governance
- quality
- ops
- feature-spec
- debt-item
