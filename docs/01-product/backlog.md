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
last_reviewed: 2026-05-02
---

# Backlog de producto

## Criterio de uso
Este backlog distingue entre trabajo confirmado, trabajo propuesto y vacíos de contexto. No se debe marcar como hecho nada que no tenga evidencia en repo, sprint log o validación humana. Tras el cierre de Sprint 3, esta lista queda como prioridad operativa, no como apertura automática de un nuevo sprint.

## En curso o altamente probable por evidencia en repo
- Mantener y endurecer el core activo real: auth, onboarding, práctica y dashboard.
- Mejorar madurez operativa del runtime y disciplina de release/deploy.
- Preparar la base técnica gobernada del frente de asistentes ya aprobado.
- Mantener consistencia entre migraciones de Supabase, modelo de datos activo y corpus operativo.

### Frente gobernado: banco de preguntas
- Estado: ACTIVO Y GOBERNADO.
- Alcance: validación funcional del banco activo (27 ítems), alineación documental, mapa de activación y proceso de verificación sin drift.
- Criterio operativo: se mantiene el corpus en 27 ítems hasta nueva instrucción, asegurando 0 drift reportado entre repo y DB/runtime esperado.

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

## Sprint 4: Productización del Core (2026-05-02)
- [x] Navegación: Editorial fuera del nav principal.
- [x] UI: Iconografía SVG real y mobile polish.
- [x] UX: Loading, Empty y Error states implementados.
- [x] QA: E2E validado localmente.

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
- `ai`: `Tutor GCM` integrado funcionalmente de forma mínima en la pantalla de práctica bajo contrato v1 y guardrails de autoridad.
- `question-bank`: activo y gobernado; corpus de 27 ítems validado y sin drift.

## Sprint 9: Integración funcional mínima gobernada de Tutor GCM (2026-05-02)
- [x] UI: `TutorInterface` premium integrado en Práctica.
- [x] API: Ruta `/api/tutor/turn` autenticada y conectada.
- [x] GOV: Guardrails de autoridad y contexto de tema verificados.
