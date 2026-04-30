---
id: QUAL-DEBT-REGISTER
name: technical-debt-register
project: ganaconmerito
owner: marlon-arcila
status: active
artifact_type: quality
modules: [platform, editorial, auth, data]
tags: [deuda-tecnica, calidad, herencia]
related:
  - ARCH-SYSTEM-OVERVIEW
  - DEL-SPRINT-LOG
last_reviewed: 2026-04-23
---

# Technical debt register

## Criterio
Toda deuda debe registrar origen, impacto y owner. No se usa este registro para esconder trabajo. Se usa para hacerlo visible y priorizable.

## Deuda heredada

### DEBT-H-001
- título: decisiones estructurales históricas sin ADR uniforme
- descripción: existen artefactos y planes técnicos previos, pero no toda decisión estructural parece haber pasado por ADR formal único.
- origen: herencia de operación anterior
- tipo: arquitectura
- módulo: platform
- impacto: alto
- costo estimado: medio
- interés de demora: alto
- owner: marlon-arcila
- estado: abierto
- relación: ADR-001-stack-base

### DEBT-H-002
- título: documentación dispersa y no normalizada
- descripción: la documentación existe pero está repartida entre varias taxonomías y niveles de madurez.
- origen: herencia documental
- tipo: documentación
- módulo: core
- impacto: alto
- costo estimado: medio
- interés de demora: alto
- owner: marlon-arcila
- estado: abierto
- relación: sistema documental base

### DEBT-H-003
- título: vacíos de ownership por módulo
- descripción: no todos los artefactos críticos tienen owner humano explícito y verificable.
- origen: gobernanza heredada incompleta
- tipo: gobernanza
- módulo: core
- impacto: medio
- costo estimado: bajo
- interés de demora: medio
- owner: marlon-arcila
- estado: abierto
- relación: GOV-AGENT-ROSTER

## Deuda nueva

### DEBT-N-001
- título: falta de validación documental automatizada previa a commits
- descripción: el repositorio no tenía un control uniforme de frontmatter, owners y relaciones críticas.
- origen: implantación actual
- tipo: calidad
- módulo: core
- impacto: medio
- costo estimado: bajo
- interés de demora: medio
- owner: marlon-arcila
- estado: en-remediacion
- relación: scripts/validate_docs.py

### DEBT-N-002
- título: frente de banco de preguntas diferido fuera del sprint actual
- descripción: toda nueva validación funcional final del banco activo, su alineación documental adicional, segmentación y gestión/editorial operativa quedan retiradas del sprint vigente para no competir con UX, asistentes y calidad operativa central.
- origen: repriorización ejecutiva del producto
- tipo: producto-datos
- módulo: question-bank
- impacto: medio
- costo estimado: medio
- interés de demora: medio
- owner: marlon-arcila
- estado: abierto
- relación: PROD-BACKLOG

### DEBT-N-003
- título: proceso de gestión del banco de preguntas sin sprint dedicado
- descripción: el proceso operativo/editorial del banco no se sigue desarrollando en el sprint actual y debe reingresar solo bajo un frente explícito de datos/editorial o por dependencia directa de la futura capa de asistentes.
- origen: recorte de alcance del sprint
- tipo: proceso
- módulo: editorial
- impacto: medio
- costo estimado: medio
- interés de demora: medio
- owner: marlon-arcila
- estado: abierto
- relación: PROD-BACKLOG

## Vacíos explícitos
- TODO: inventario completo de deuda por módulo.
- TODO: clasificación de deuda en seguridad, pruebas y datos.
- TODO: relación formal con PRs o releases históricas.
