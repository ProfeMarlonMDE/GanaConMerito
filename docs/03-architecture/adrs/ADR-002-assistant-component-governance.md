---
id: ADR-002-assistant-component-governance
name: adr-assistant-component-governance
project: ganaconmerito
owner: marlon-arcila
status: proposed
artifact_type: adr
modules: [session-orchestrator, evaluation, dashboard, ai]
tags: [adr, assistant, tutor, llm, governance]
related:
  - ARCH-ASSISTANT-COMPONENT-SPEC
  - ARCH-SYSTEM-OVERVIEW
  - GOV-HUMAN-APPROVAL
  - PROD-BACKLOG
last_reviewed: 2026-05-01
---

# ADR-002: Gobernanza del componente de asistentes

## Estado
proposed

## Fecha
2026-05-01

## Contexto
GanaConMerito ya superó la fase donde el problema principal era demostrar si existía flujo real de login, onboarding, práctica y dashboard. Ese núcleo ya tiene evidencia funcional y trazabilidad técnica suficiente.

La siguiente etapa abre el frente de asistentes dentro del producto. Sin una decisión estructural explícita, existe riesgo de introducir múltiples personas/agentes visibles, mezclar lógica crítica con prompts y aumentar la superficie de alucinación, contradicción y fragilidad operativa.

Además, el sprint vigente ya priorizó UX/navegación, calidad operativa y gobernabilidad del producto. El banco editorial y su operación quedaron fuera de alcance de esta decisión.

## Decisión
Se propone adoptar esta dirección estructural para el componente de asistentes:

1. **Un solo asistente visible al usuario:** `Tutor GCM`.
2. **Servicios internos no visibles** para orquestación, contexto, explicación, chequeo de honestidad y trazabilidad.
3. **La lógica crítica queda fuera del LLM visible**:
   - scoring
   - transición de estados
   - cierre de sesión
   - selección de ítems
   - disponibilidad de siguiente paso
4. **Cada turno debe operar con contrato verificable** de entrada y salida.
5. **Toda respuesta debe poder degradarse con honestidad** cuando falte evidencia suficiente.

## Alternativas consideradas

### 1. Exponer varios asistentes visibles desde la primera etapa
Rechazada por ahora.

Razones:
- aumenta contradicciones entre agentes visibles
- vuelve ambigua la autoridad pedagógica
- sube costo de QA conversacional
- incrementa alucinación por handoffs visibles
- complica soporte, observabilidad y fallback

### 2. Un solo asistente visible controlando también lógica de negocio
Rechazada.

Razones:
- mezcla conversación con autoridad de estado
- hace más difícil auditar errores
- sube riesgo de inventar progreso, puntajes o acciones no permitidas

### 3. Un solo asistente visible con motor determinístico y servicios internos
Aprobada como dirección propuesta.

Razones:
- minimiza superficie de alucinación
- mejora gobernabilidad
- permite pruebas por contrato
- conserva UX simple para el usuario

## Consecuencias
- la UX del producto debe presentar una sola identidad conversacional consistente
- cualquier futura expansión a varios asistentes visibles requerirá evidencia y nueva decisión explícita
- la implementación debe empezar por contrato y trazabilidad, no por proliferación de prompts/personas
- el motor determinístico conserva autoridad sobre estado y evaluación
- QA podrá validar el componente por casos positivos, negativos y de incertidumbre declarada

## Impacto en módulos
- `session-orchestrator`: pasa a ser pieza central del turno
- `evaluation`: mantiene autoridad técnica fuera del LLM visible
- `dashboard`: podrá reflejar salidas explicativas sin convertirse en fuente de verdad del estado
- `ai`: queda gobernado por contrato, guardrails y trazabilidad

## Riesgos
- que el producto comunique más capacidad conversacional de la realmente gobernada
- que se implementen servicios internos sin versionado ni trazas mínimas
- que la nomenclatura de asistentes vuelva a contaminarse con agentes operativos internos

## Mitigaciones
- congelar nomenclatura visible: `Tutor GCM`
- mantener el roster operativo interno separado del roster visible de producto
- implementar chequeo de honestidad y contradicción antes de enriquecer personalidad
- exigir contrato de turno v1 antes de despliegue funcional del componente

## Aprobación humana
- Estado de aprobación: PROPUESTO
- Aprobador requerido: Marlon Arcila
- Observaciones: este ADR no autoriza implementación productiva por sí solo; fija la propuesta estructural mínima para revisión humana antes de desarrollo del componente.
