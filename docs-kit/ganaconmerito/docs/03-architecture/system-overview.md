---
id: DOC-ARCH-001
name: system-overview
project: ganaconmerito
owner: architecture-owner
status: active
artifact_type: product
modules: [core]
tags: [arquitectura, sistema, herencia]
related: [ADR-001, DOC-QUAL-001, DOC-OPS-001]
last_reviewed: 2026-04-23
---

# System Overview

## Propósito

Describir la arquitectura recibida, la arquitectura actualmente aprobada y la arquitectura objetivo, con trazabilidad suficiente para bloquear improvisación estructural.

## Alcance

- componentes principales
- relaciones entre módulos
- integraciones críticas
- vacíos de contexto heredados
- decisiones pendientes de ADR

## Arquitectura recibida

- Estado: TODO
- Fuente de información: TODO
- Supuestos heredados:
  - TODO
- Riesgos observados:
  - continuidad: TODO
  - mantenibilidad: TODO
  - contexto perdido: TODO

## Arquitectura aprobada actual

- Estado: TODO
- Base de aprobación: PENDIENTE
- Restricciones activas:
  - no cambiar estructura sin ADR aprobado
  - no tocar auth, datos o jobs sin revisión humana

## Arquitectura objetivo

- Estado objetivo: TODO
- Capacidades deseadas:
  - documentación recuperable por agentes
  - ownership claro por módulo
  - deuda visible
  - decisiones estructurales trazables

## Vacíos de contexto

- módulos sin owner claro: TODO
- dependencias opacas: TODO
- decisiones previas sin ADR: TODO
- integraciones críticas no documentadas: TODO

## Mapa de módulos

| módulo | propósito | owner | estado | notas |
|---|---|---|---|---|
| core | núcleo operativo | TODO | desconocido | TODO |
| auth | autenticación | TODO | desconocido | requiere ADR específico |
| dashboard | operación y visualización | TODO | desconocido | TODO |
| reportes | reporting | TODO | desconocido | TODO |
