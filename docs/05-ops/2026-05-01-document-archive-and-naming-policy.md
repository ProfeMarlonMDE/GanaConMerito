---
id: OPS-DOCUMENT-ARCHIVE-NAMING-2026-05-01
name: document-archive-and-naming-policy-2026-05-01
project: ganaconmerito
owner: marlon-arcila
status: active
artifact_type: ops
modules: [documentation, platform, governance]
tags: [docs, archive, naming, source-of-truth]
related:
  - docs/project/source-of-truth.md
  - docs/05-ops/runbook.md
last_reviewed: 2026-05-01
---

# Política de archivado y nombres documentales

## Objetivo
Reducir ambigüedad documental en producto y evitar que archivos históricos, inbox temporales o planes superados compitan con la documentación vigente.

## Regla de dominios
- `~/.openclaw/product` contiene documentación canónica del producto.
- `~/.openclaw/workspace` contiene memoria, agencia, prompts y operación de agentes.
- No se deben mezclar artefactos canónicos entre ambos dominios.

## Regla de archivo
Todo documento histórico, transicional, inbox temporal o plan superado debe moverse a `docs/archive/**` y dejar de aparecer en superficies activas del producto.

## Estrategia de nombres
Todo archivo archivado o snapshot documental nuevo debe incluir fecha en el nombre con este patrón:

- `YYYY-MM-DD-tema.ext`

Ejemplos:
- `2026-05-01-editorial-module-plan.md`
- `2026-05-01-runtime-topology-audit.md`
- `2026-05-01-dominios.md`

## Regla de superficies activas
Las rutas web activas del producto que exponen documentación (por ejemplo `/editorial`) solo deben mostrar:
- documentos canónicos vigentes
- referencias operativas todavía aprobadas

No deben mostrar:
- inbox temporales
- prompts comparativos de agentes
- configs heredadas sin vigencia
- planes editoriales o arquitecturas superadas

## Criterio práctico
Si un archivo existe solo para contexto histórico o respaldo, no debe competir en el índice activo del producto.
