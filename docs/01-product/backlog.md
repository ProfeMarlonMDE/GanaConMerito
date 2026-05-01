---
id: PROD-BACKLOG
name: product-backlog
project: ganaconmerito
owner: marlon-arcila
status: active
artifact_type: product
modules: [core, editorial, auth, evaluacion]
tags: [backlog, prioridades, trazabilidad]
related:
  - PROD-VISION
  - DEL-SPRINT-LOG
  - QUAL-DEBT-REGISTER
last_reviewed: 2026-05-01
---

# Backlog de producto

## Criterio de uso
Este backlog distingue entre trabajo confirmado, trabajo propuesto y vacíos de contexto. No se debe marcar como hecho nada que no tenga evidencia en repo, sprint log o validación humana. Tras el cierre de Sprint 3, esta lista queda como prioridad operativa, no como apertura automática de un nuevo sprint.

## En curso o altamente probable por evidencia en repo
- Mantener y endurecer el core activo real: auth, onboarding, práctica y dashboard.
- Mejorar madurez operativa del runtime y disciplina de release/deploy.
- Preparar la base técnica gobernada del frente de asistentes ya aprobado.
- Mantener consistencia entre migraciones de Supabase, modelo de datos activo y corpus operativo.

### Frente diferido a deuda técnica: banco de preguntas
- Estado: DIFERIDO DEL SPRINT / TRATADO COMO DEUDA TÉCNICA.
- Alcance diferido: validación funcional final del banco activo, alineación documental adicional del banco, segmentación asociada y proceso de gestión/editorial del banco.
- Criterio operativo actual: no meter este frente dentro de un sprint no formalizado ni hacerlo competir con UX, asistentes, trazabilidad y calidad operativa central.
- Reentrada sugerida: cuando exista un sprint dedicado a datos/editorial o cuando el trabajo de asistentes requiera reabrir explícitamente este dominio.

## Prioridad ejecutiva

### Now
1. Aplicar disciplina operativa sobre ADR-001 ya aprobado y ADR-002 ya aprobado con guardrails.
2. Mantener baseline operativo de QA postdeploy sobre `:3000`.
3. Ejecutar cierres con triple verificación `product` = `/opt/gcm/app` = runtime visible.
4. Preparar contrato v1, trazabilidad mínima y QA negativa del futuro `Tutor GCM` sin abrir implementación libre.
5. Evitar reintroducir drift entre producto canónico, deploy y documentación.

### Next
1. Definir política operativa para cambios estructurales y releases.
2. Operativizar known issues con owner, impacto y ruta.
3. Normalizar documentos críticos de arquitectura, project, database y api.
4. Convertir el mapa formal de features activas en referencia estable de producto.
5. Preparar la especificación técnica ejecutable del contrato de turno v1 para `Tutor GCM`.
6. Endurecer el runbook de release para que la QA host-required (como Playwright) tenga bootstrap explícito cuando el worktree se limpia con `git clean -fdx`.

### Implementado y validado en runtime
- Rediseño UI premium mobile-first del core real (`login`, `home`, `onboarding`, `practice`, `dashboard`, `biblioteca`) ya aplicado en `~/.openclaw/product` y validado en runtime desplegado con commit `df8f949`.
- Shell compartido migrado hacia navegación móvil más fuerte: top bar consistente, bottom nav persistente y CTA sticky en práctica.
- `Tutor GCM` quedó visualmente preparado como capa secundaria contextual, sin convertir el producto en chat-first y sin contradecir ADR-002.
- Corrección operativa estable ya aplicada: secretos de deploy movidos fuera del árbol redeployable hacia `/opt/gcm/env/gcm-app.env`.

### Later
1. Definición oficial de roadmap por trimestre.
2. Features descartadas o congeladas con criterio explícito.
3. SLA o expectativas formales de operación.

## Vacíos de contexto
- TODO: priorización explícita por impacto de negocio validada por Marlon.
- TODO: definición oficial de roadmap por trimestre.
- TODO: features descartadas o congeladas.
- TODO: SLA o expectativas de operación.

## Relación con módulos
- `auth`: activo y prioritario como parte del core real.
- `onboarding`: activo y endurecido; no debe degradarse ni reabrirse sin evidencia.
- `practice`: activo y núcleo principal del producto; debe seguir siendo practice-first.
- `dashboard`: activo; debe reflejar progreso real sin inflar capacidades analíticas no implementadas.
- `editorial`: hoy es biblioteca documental de solo lectura; no tratar como módulo administrativo activo del sprint.
- `ai`: `Tutor GCM` quedó aprobado a nivel de gobernanza, pero sigue no implementado como feature funcional visible.
- `question-bank`: queda diferido como deuda técnica; no debe competir en un sprint futuro salvo decisión ejecutiva explícita.
