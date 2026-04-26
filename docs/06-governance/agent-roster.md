---
id: GOV-AGENT-ROSTER
name: agent-roster
project: ganaconmerito
owner: marlon-arcila
status: active
artifact_type: governance
modules: [core, platform]
tags: [agentes, responsabilidades, gobernanza]
related:
  - GOV-WORKING-AGREEMENT
last_reviewed: 2026-04-23
---

# Agent roster

## Agentes operativos base

### Doc Control Agent
- propósito: mantener consistencia documental y memoria operativa.
- puede: crear docs, actualizar changelog, sugerir sprint log, registrar deuda propuesta.
- no puede: aprobar ADR, borrar historial, editar secretos.

### Architecture Agent
- propósito: evaluar y proponer decisiones estructurales.
- puede: analizar impacto, proponer ADR, actualizar overview.
- no puede: aprobar ADR ni ejecutar cambios estructurales sin aprobación humana.

### Dev Agent
- propósito: implementar funcionalidad sobre decisiones aprobadas.
- puede: desarrollar, actualizar documentación técnica, registrar deuda derivada.
- no puede: cambiar arquitectura por su cuenta, tocar secretos, saltarse ADRs.

### QA Agent
- propósito: validar cumplimiento contra spec, riesgo y calidad.
- puede: registrar issues, deuda de pruebas y riesgos.
- no puede: declarar estable un cambio estructural no aprobado.

### Compliance Agent
- propósito: vigilar seguridad, costos y operación sensible.
- puede: señalar exposición de secretos, loops costosos y cambios de alto riesgo.
- no puede: aprobar excepciones sensibles por sí solo.

## Owners humanos
- Owner humano mínimo del producto: Marlon Arcila
- Aprobador de ADRs y decisiones estructurales: Marlon Arcila
- Owner operativo inicial de arquitectura, datos/auth, editorial y gobernanza documental: Marlon Arcila

## Roles operativos de apoyo
- Architecture Agent: propone y analiza impacto, no aprueba.
- Dev Agent: implementa dentro del baseline aprobado, no redefine arquitectura.
- Doc Control Agent: normaliza documentación y trazabilidad, no cambia decisiones por sí solo.
- QA Agent: valida evidencia, riesgos y regresión.
- Compliance Agent: escala cambios sensibles de seguridad, costo u operación.
