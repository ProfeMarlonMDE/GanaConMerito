---
id: DOC-README
name: readme
author: TODO
project: ganaconmerito
owner: tech-lead
status: active
artifact_type: product
modules: [core]
tags: [repositorio, operacion, trazabilidad]
related: [DOC-WA-001, DOC-ARCH-001, ADR-001]
last_reviewed: 2026-04-23
---

# ganaconmerito

> Estado: TEMPLATE HISTÓRICO. No usar como fuente operativa viva. La fuente canónica del producto vive en `/home/ubuntu/.openclaw/product`.

Sistema operativo documental y operativo para el proyecto **ganaconmerito**.

## Objetivo

Reducir reprocesos, recuperar contexto, hacer visible la deuda técnica y bloquear cambios estructurales sin trazabilidad ni aprobación humana.

## Principios no negociables

- La fuente de verdad es Git.
- Toda la documentación oficial vive en `docs/`.
- No se usan wikis paralelas como fuente oficial.
- Ningún agente implementa sin leer contexto mínimo.
- Ningún cambio estructural se ejecuta sin ADR aprobado.
- Todo workaround crea deuda técnica registrada.
- Todo documento crítico tiene owner humano.
- Ningún secreto entra a prompts, logs o markdown abierto.

## Estructura principal

- `docs/01-product/`: visión, backlog y requirements.
- `docs/02-delivery/`: sprint log, changelog y release notes.
- `docs/03-architecture/`: arquitectura base, modelo de datos, integraciones y ADRs.
- `docs/04-quality/`: deuda, riesgos, issues conocidos y estrategia de pruebas.
- `docs/05-ops/`: runbooks, matriz de entornos, rollback e incidentes.
- `docs/06-governance/`: acuerdos, roster de agentes, políticas y prompts.
- `docs/07-compliance/`: seguridad, secretos, costo IA y manejo de datos.
- `docs/08-context/`: índice contextual y políticas de recuperación.
- `scripts/`: automatización local sin dependencias externas.
- `.githooks/`: validaciones y guardrails previos a commit o push.
- `.ai/`: definición operativa de agentes y prompts reutilizables.

## Flujo operativo mínimo

1. Leer contexto mínimo obligatorio.
2. Confirmar si existe spec o requirement aplicable.
3. Confirmar ADR aprobado si el cambio es estructural.
4. Implementar o documentar.
5. Registrar changelog, deuda e impacto.
6. Pasar por validaciones locales antes de push.

## Contexto heredado

Este proyecto se asume heredado de una agencia anterior. Por eso deben mantenerse explícitos:

- vacíos de contexto
- dependencias opacas
- owners no confirmados
- decisiones previas sin ADR
- deuda heredada vs deuda nueva

## Estado inicial

- Arquitectura recibida: TODO
- Arquitectura aprobada actual: TODO
- Arquitectura objetivo: TODO
- Owners por módulo: TODO
- Primer sprint bajo este modelo: PENDIENTE

## Primeros pasos sugeridos

1. Completar `docs/06-governance/working-agreement.md`.
2. Confirmar owners humanos de documentos críticos.
3. Crear o validar `ADR-001-stack-base.md`.
4. Registrar deuda heredada inicial.
5. Ejecutar `python3 scripts/validate_docs.py`.
6. Instalar hooks con `git config core.hooksPath .githooks`.
