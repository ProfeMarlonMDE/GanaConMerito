---
id: ADR-001
name: adr-001-stack-base
project: ganaconmerito
owner: tech-lead
status: review
artifact_type: adr
modules: [core]
tags: [adr, stack, arquitectura]
related: [DOC-ARCH-001, DOC-WA-001]
last_reviewed: 2026-04-23
---

# ADR-001, Stack base y reglas estructurales

## Estado

review

## Fecha

2026-04-23

## Contexto

El proyecto viene heredado de una agencia anterior. La arquitectura actual no está completamente levantada y existe riesgo de improvisación estructural, deuda invisible y pérdida de contexto.

## Decisión

Mientras se completa el levantamiento técnico, toda evolución estructural de **ganaconmerito** debe operar bajo estas reglas:

- Git y `docs/` son la fuente de verdad.
- Cambios estructurales requieren ADR aprobado.
- Auth, datos, jobs, caché, observabilidad e integraciones críticas no se alteran sin revisión humana.
- Todo workaround relevante genera deuda técnica registrada.

## Alternativas consideradas

- Seguir operando sin ADRs formales, descartada por riesgo alto.
- Documentar después de implementar, descartada por pérdida de trazabilidad.

## Consecuencias

### Positivas

- Más control estructural.
- Menos deuda invisible.
- Mejor recuperación de contexto por agentes.

### Negativas

- Menor velocidad inicial.
- Más disciplina documental requerida.

## Impacto en módulos

- core
- auth
- data
- jobs
- integrations

## Aprobación humana

- Estado: PENDIENTE
- Approved by: TODO
- Fecha: TODO
