---
id: DEL-SPRINT-LOG
name: sprint-log
project: ganaconmerito
owner: marlon-arcila
status: active
artifact_type: delivery
modules: [core, platform]
tags: [sprint, entrega, seguimiento]
related:
  - PROD-BACKLOG
  - DEL-CHANGE-LOG
  - QUAL-RISK-REGISTER
last_reviewed: 2026-05-04
---

# Sprint log

## Sprint cerrado — Sprint 12: Métricas confiables y útiles v1
- **Estado**: CERRADO CON PASS/WARN MENOR ACEPTADO
- **Fecha**: 2026-05-04
- **PR**: #6
- **Commit en master/runtime validado**: `64d78def1d8dd4f98ec9ae5ba55a3fed97e4e4ba`
- **Short hash runtime**: `64d78de`
- **Build time validado**: `2026-05-04T03:24:21Z`
- **Objetivo**: fortalecer el contrato, lógica y presentación de métricas para que el dashboard sea prudente, simple y accionable sin vender conclusiones fuertes con poca evidencia.

### Entregado
- `MetricSignalLevel` y `MetricInterpretation` incorporados al contrato de evaluación.
- `buildDashboardSummaryMetrics` devuelve nivel de señal, descripción, acción recomendada y flags de confiabilidad.
- Fortalezas, refuerzos, percentil y tendencia quedan condicionados por evidencia suficiente.
- Dashboard histórico y por sesión ajustados con copy prudente.
- E2E online reportado como PASS/WARN menor sobre producción.

### Guardrails preservados
- No se tocó scoring.
- No se tocó avance de sesión.
- No se tocó Tutor GCM.
- No se inventaron percentiles ni promesas de resultado.
- No se ocultaron datos: se calificó su confiabilidad.

## Sprint cerrado — Sprint 11: Tutor GCM sincronización post-respuesta y trazabilidad operativa v1
- **Estado**: CERRADO CON PASS
- **Fecha**: 2026-05-03
- **PR**: #5
- **Commit en master/runtime validado**: `1dc454291b22bff41b95125fcbd68e373d8f578a`
- **Objetivo**: corregir el estado post-respuesta del Tutor GCM para permitir explicación de clave, feedback y distractores solo después de respuesta confirmada server-side.

### Entregado
- `buildTutorEvidence` resuelve el turno respondido por `sessionId + itemId`.
- Evidencia post-respuesta complementa `session_turns` con `evaluation_events`.
- `canRevealCorrectAnswer` queda en `false` antes de responder y `true` después de respuesta confirmada.
- El tutor puede explicar feedback, clave registrada y distractores después de responder.
- E2E online Sprint 11 reportado como PASS.

## Sprint cerrado — Sprint 10: Tutor GCM fuente de verdad y contrato pedagógico v1
- **Estado**: CERRADO CON PASS/WARN MENOR ACEPTADO
- **Fecha**: 2026-05-03
- **PR**: #4
- **Commit en master/runtime validado**: `7a380328af9fcb974c9ab6497b35380ce9bd06ed`
- **Objetivo**: implementar la base contractual del Tutor GCM para que opere con fuente de verdad gobernada, modos pedagógicos, evidencia server-side y degradación honesta.

### Entregado
- Contratos `ContestTruth`, `AspirationalProfileTruth`, `QuestionTruth`, `UserSessionTruth`, `TutorTurnResponse` y `TutorTurnTrace`.
- Modos `current_question`, `contest_preparation` y `performance_analysis`.
- Intenciones pedagógicas v1.
- `tutor-evidence-builder` server-side.
- Guardrails de autoridad y fuente insuficiente.
- `/api/tutor/turn` mantiene payload mínimo desde cliente.

### No alcance
- LLM real.
- Admin de fuente de verdad.
- Embeddings.
- Persistencia real de `TutorTurnTrace`.
- Fuente normativa completa.

## Sprint cerrado — Rotación controlada de selección de ítems
- **Estado**: CERRADO
- **PR**: #3
- **Objetivo**: evitar que nuevas sesiones inicien siempre con la misma pregunta para el mismo usuario.
- **Entregado**: pool de candidatos, exclusión de ítems recientes, rotación determinística y fallback seguro.

## Sprint cerrado — Humanización UX de etiquetas técnicas
- **Estado**: CERRADO
- **PR**: #2
- **Objetivo**: eliminar slugs crudos en UI como `gestion · lectura_de_indicadores`.
- **Entregado**: helper `formatTechnicalLabel`, `formatAreaCompetency`, dashboard y práctica humanizados.

## Sprint cerrado — Fix de login / Supabase runtime public config
- **Estado**: CERRADO
- **PR**: #1
- **Objetivo**: corregir bloqueo de login por ausencia de variables públicas Supabase en el browser bundle.
- **Entregado**: fallback runtime de configuración pública Supabase y login operativo.

---

## Historial operativo anterior

Los Sprints 1 a 9 permanecen vigentes como línea de base operativa. El detalle histórico completo se conserva en `docs/02-delivery/change-log.md` y en el historial Git. Esta reconciliación no reabre esos sprints; solo alinea la vista ejecutiva con el estado real posterior a PR #1-#6.
