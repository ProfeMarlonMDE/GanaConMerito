---
id: DOC-WA-001
name: working-agreement
project: ganaconmerito
owner: tech-lead
status: active
artifact_type: governance
modules: [core]
tags: [governance, working-agreement, agentes]
related: [DOC-GOV-001, DOC-GOV-005, ADR-001]
last_reviewed: 2026-04-23
---

# Working Agreement

## Reglas no negociables

1. Git es la fuente de verdad.
2. `docs/` es la documentación oficial.
3. Ningún agente implementa sin lectura mínima obligatoria.
4. Ningún cambio estructural se ejecuta sin ADR aprobado.
5. Todo workaround relevante crea deuda técnica.
6. Ningún secreto entra a markdown, prompts o logs abiertos.
7. Todo documento crítico tiene owner humano.
8. La IA puede proponer, pero no autoaprobar decisiones estructurales.

## Lectura mínima obligatoria antes de actuar

1. `README.md`
2. `docs/06-governance/working-agreement.md`
3. `docs/03-architecture/system-overview.md`
4. `docs/01-product/backlog.md`
5. feature spec aplicable
6. ADRs relacionados
7. deuda técnica del módulo

## Definición de cambio estructural

Se considera estructural cualquier cambio que afecte stack, autenticación, base de datos, permisos, jobs, caché, observabilidad o varios módulos.

## Reglas de trazabilidad

- Cada cambio debe poder conectarse con backlog, sprint, ADR, deuda o issue.
- Si falta información, marcar `TODO` o `PENDIENTE`, no inventar.
- Diferenciar explícitamente hecho, propuesto y supuesto.

## Bloqueos automáticos

- falta ADR aprobado
- falta owner humano
- cambio sensible sin aprobación humana
- documentación crítica sin frontmatter válido
