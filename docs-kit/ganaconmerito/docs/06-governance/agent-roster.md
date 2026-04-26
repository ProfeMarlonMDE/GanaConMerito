---
id: DOC-GOV-001
name: agent-roster
project: ganaconmerito
owner: tech-lead
status: active
artifact_type: governance
modules: [core]
tags: [agentes, roster, governance]
related: [DOC-WA-001]
last_reviewed: 2026-04-23
---

# Agent Roster

| Agente | Propósito | Puede | No puede |
|---|---|---|---|
| doc-control-agent | memoria operativa y consistencia documental | crear docs, actualizar changelog, proponer sprint log, registrar deuda propuesta | aprobar ADR, cerrar deuda crítica, borrar historial |
| architecture-agent | decisiones estructurales | analizar impacto, proponer ADR, actualizar overview, marcar deuda arquitectónica | aprobar ADR, ejecutar cambios estructurales sin humano |
| dev-agent | implementar funcionalidad | desarrollar sobre specs aprobadas, actualizar docs técnicas, registrar deuda derivada | cambiar arquitectura por su cuenta, tocar secretos |
| qa-agent | validar calidad | registrar issues, abrir deuda de pruebas, proponer riesgos | aprobar releases sensibles |
| compliance-agent | proteger seguridad y costos | vigilar loops costosos, exposición de secretos y cambios sensibles | aprobar riesgos críticos por sí solo |
