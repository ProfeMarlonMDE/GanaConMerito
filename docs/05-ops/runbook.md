---
id: OPS-RUNBOOK
name: runbook
project: ganaconmerito
owner: marlon-arcila
status: active
artifact_type: runbook
modules: [platform, auth, data]
tags: [runbook, operacion, soporte]
related:
  - ARCH-SYSTEM-OVERVIEW
  - COMP-SECURITY-GUARDRAILS
last_reviewed: 2026-04-23
---

# Runbook operativo

## Objetivo
Tener una guía mínima para operar, validar y recuperar contexto del repositorio sin depender de memoria informal.

## Verificaciones básicas
1. Confirmar estado de dependencias del proyecto.
2. Confirmar integridad del árbol documental crítico.
3. Revisar migraciones de Supabase pendientes o recientes.
4. Validar que cambios estructurales tengan ADR asociado.

## Antes de desarrollar
- Leer contexto mínimo obligatorio.
- Revisar deuda e issues del módulo.
- Confirmar si el cambio requiere aprobación humana.

## Antes de integrar cambios
- Ejecutar `python3 scripts/validate_docs.py`
- Ejecutar `python3 scripts/build_context_index.py`
- Revisar cambios relevantes en `docs/02-delivery/change-log.md`

## Operación del banco de preguntas
- Runbook específico: `docs/05-ops/question-bank-load-runbook.md`
- Validación local del corpus actual: `npm run content:validate`
- Auditoría de todo `content/items`, incluyendo legados: `npm run content:validate:all`
- Importación controlada del corpus actual: `npm run content:import:current`

## Incidentes operativos comunes
- divergencia entre documentación y código
- migración sin decisión estructural clara
- cambio sensible sin evidencia de aprobación
- workaround sin deuda registrada

## Respuesta mínima
- detener propagación del cambio
- registrar incidente o issue
- vincular ADR o deuda si aplica
- escalar a aprobación humana cuando corresponda

## Vacíos
- TODO: comando oficial de desarrollo y validación end-to-end
- TODO: procedimiento formal de rollback
- TODO: owners operativos por tipo de incidente
