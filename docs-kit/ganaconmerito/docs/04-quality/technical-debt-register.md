---
id: DOC-QUAL-001
name: technical-debt-register
project: ganaconmerito
owner: tech-lead
status: active
artifact_type: quality
modules: [core]
tags: [deuda-tecnica, calidad, herencia]
related: [DOC-ARCH-001, DOC-DEL-001]
last_reviewed: 2026-04-23
---

# Technical Debt Register

## Reglas

- Todo workaround relevante se registra.
- Separar deuda heredada de deuda nueva.
- No cerrar deuda crítica sin aprobación humana.

## Deuda heredada identificada

| ID | Título | Descripción | Origen | Tipo | Módulo | Impacto | Costo estimado | Interés de demora | Owner | Estado | Relación |
|---|---|---|---|---|---|---|---|---|---|---|---|
| DEBT-L-001 | Arquitectura heredada sin mapa validado | No existe aún un levantamiento aprobado de la arquitectura recibida | agencia-anterior | arquitectura | core | alto | TODO | alto | architecture-owner | abierta | DOC-ARCH-001 |
| DEBT-L-002 | Decisiones previas sin ADR | Existen decisiones heredadas sin trazabilidad formal | agencia-anterior | gobernanza | core | alto | TODO | alto | tech-lead | abierta | ADR-001 |
| DEBT-L-003 | Owners no confirmados por módulo | No hay ownership validado para varios módulos | agencia-anterior | operacion | core | medio | TODO | medio | delivery-lead | abierta | DOC-GOV-001 |

## Deuda nueva detectada por la nueva operación

| ID | Título | Descripción | Origen | Tipo | Módulo | Impacto | Costo estimado | Interés de demora | Owner | Estado | Relación |
|---|---|---|---|---|---|---|---|---|---|---|---|
| DEBT-N-001 | Vacíos de contexto crítico | Faltan datos verificables para visión, owners y arquitectura objetivo | nueva-operacion | contexto | core | alto | medio | alto | tech-lead | abierta | DOC-PROD-001 |

## Disparadores automáticos

Se propone deuda cuando aparezcan señales como `TODO`, `FIXME`, `HACK`, `TEMP`, bypasses, validaciones duplicadas, tests omitidos o suppress warnings relevantes.
