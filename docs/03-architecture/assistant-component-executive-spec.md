---
id: ARCH-ASSISTANT-COMPONENT-SPEC
name: assistant-component-executive-spec
project: ganaconmerito
owner: marlon-arcila
status: proposed
artifact_type: architecture
modules: [session-orchestrator, evaluation, dashboard, ai]
tags: [assistant, tutor, llm, governance, testability]
related:
  - ARCH-SYSTEM-OVERVIEW
  - PROD-BACKLOG
  - GOV-WORKING-AGREEMENT
  - GOV-HUMAN-APPROVAL
last_reviewed: 2026-04-30
---

# Spec ejecutiva — componente de asistentes

## 1. Objetivo
Definir la arquitectura recomendada del componente de asistentes de GanaConMerito antes de implementar flujos multiagente o UX conversacional más rica.

El foco explícito de esta spec es:
- minimizar alucinaciones
- maximizar gobernabilidad
- maximizar testabilidad
- preservar una experiencia pedagógica clara para el usuario

## 2. Decisión ejecutiva

### Recomendación
**Adoptar un solo asistente visible para el usuario: `Tutor GCM`, soportado por servicios internos especializados no visibles.**

### Decisión descartada por ahora
**No exponer varios asistentes visibles** (por ejemplo, coach, evaluador, motivador, orientador) en la primera etapa.

### Justificación
Un solo asistente visible reduce:
- ambigüedad sobre quién responde
- inconsistencias de tono y criterio
- superficie de alucinación por handoffs visibles entre prompts/personas
- complejidad de QA conversacional
- costo de operación y observabilidad

Servicios internos sí pueden separarse, porque esa separación:
- mejora control del flujo
- permite contratos claros por responsabilidad
- hace posible probar cada función con entradas/salidas acotadas
- evita que el LLM visible controle lógica crítica

## 3. Principios rectores
1. **Un solo rostro visible, varios servicios internos si aportan control.**
2. **La lógica crítica vive fuera del LLM.** El asistente no decide scoring, avance de sesión, selección final de ítems ni estados terminales.
3. **Toda afirmación relevante debe venir de contexto verificable o declararse como incertidumbre.**
4. **El asistente explica; el sistema determina.**
5. **Cada turno debe ser auditable y reproducible con trazas mínimas.**
6. **No mezclar en esta fase el banco editorial ni su operación.**

## 4. Arquitectura recomendada

```text
Usuario
  -> Tutor GCM (única interfaz conversacional visible)
      -> Orquestador de turno
          -> Servicio de contexto permitido
          -> Servicio de explicación pedagógica
          -> Servicio de chequeo de seguridad/honestidad
          -> Motor determinístico de sesión/evaluación
          -> Selector de ítems y estado
          -> Persistencia y trazabilidad
```

## 5. Roster formal

### 5.1 Visible al usuario
#### Tutor GCM
**Rol:** guía pedagógica conversacional única.

**Responsabilidades:**
- explicar preguntas, resultados y próximos pasos
- pedir aclaraciones cuando falte contexto
- ofrecer feedback pedagógico acotado al estado real de la sesión
- reconocer límites cuando no haya evidencia suficiente

**No puede:**
- inventar resultados, puntajes, progreso o reglas
- prometer contenido no habilitado por producto
- decidir por sí solo cambios de estado de sesión
- responder como si fuera múltiples expertos independientes

### 5.2 Servicios internos no visibles
#### A. Orquestador de turno
Responsable de ensamblar entradas permitidas, invocar servicios y devolver una respuesta final única del Tutor.

#### B. Servicio de contexto permitido
Filtra y resume solo el contexto autorizado para el turno: estado de sesión, ítem actual, respuesta del usuario, señales evaluativas, memoria resumida y reglas activas.

#### C. Servicio de explicación pedagógica
Genera borrador explicativo del Tutor con base exclusiva en datos estructurados y contexto permitido.

#### D. Servicio de chequeo de seguridad/honestidad
Verifica que la respuesta:
- no contradiga estado real
- no afirme datos ausentes
- no use lenguaje de falsa certeza
- no salga del alcance del turno

#### E. Motor determinístico de sesión/evaluación
Mantiene la autoridad sobre:
- scoring
- transición de estados
- clasificación de resultado
- disponibilidad de siguiente paso

#### F. Persistencia y trazabilidad
Registra insumos, decisiones de sistema, versión de prompt/plantilla, flags de riesgo y salida final.

## 6. Por qué no varios asistentes visibles

### Riesgos de un esquema multi-asistente visible temprano
- contradicciones entre agentes visibles
- dificultad para definir autoridad pedagógica
- mayor probabilidad de “teatro de inteligencia” sin control real
- explosión combinatoria de casos de prueba
- más complejidad para soporte, métricas y fallback
- mayor fragilidad si un subagente falla o produce una salida dudosa

### Excepción futura
Solo considerar varios asistentes visibles cuando exista evidencia de que:
- hay dominios realmente distintos
- cada uno tiene frontera funcional estable
- hay contratos y métricas independientes
- el costo de coordinación es menor que el beneficio UX

Hasta entonces, la separación debe permanecer interna.

## 7. Contrato funcional mínimo por turno
Cada turno del componente de asistentes debe operar con un contrato mínimo, estable y testeable.

### 7.1 Input mínimo del turno
- `sessionState`: estado vigente de la sesión
- `userMessage`: mensaje o respuesta actual del usuario
- `currentItem`: ítem/pregunta activa si existe
- `evaluationSignals`: señales determinísticas disponibles
- `learnerProfileSummary`: resumen corto permitido del perfil
- `memorySummary`: memoria resumida permitida del hilo/sesión
- `allowedActions`: acciones autorizadas para este turno
- `policyFlags`: restricciones activas de honestidad/seguridad

### 7.2 Output mínimo del turno
- `assistantMessage`: respuesta final del Tutor GCM
- `intentLabel`: tipo de intervención realizada
- `citationsToState`: referencias a datos estructurados usados
- `uncertaintyFlags`: dudas o límites declarados
- `recommendedUiAction`: siguiente acción sugerida a la UI
- `traceRecord`: registro mínimo auditable del turno

### 7.3 Reglas mínimas del contrato
- si falta `currentItem` y el turno depende de él, el Tutor no improvisa; explica la limitación
- si `allowedActions` no permite evaluar o avanzar, el Tutor no lo promete
- si las señales evaluativas son insuficientes, el Tutor responde con cautela y pide siguiente paso válido
- toda salida debe poder reconstruirse desde el `traceRecord`

## 8. Política anti-alucinación

### 8.1 Regla base
**El Tutor solo puede afirmar como hecho aquello que esté presente en estado estructurado, reglas del sistema o contexto explícitamente autorizado.**

### 8.2 Prohibiciones explícitas
El asistente no debe:
- inventar puntajes, porcentajes o niveles
- inventar historial, intentos previos o progreso
- asumir profesión, intención o debilidad del usuario sin soporte
- citar contenidos no cargados en el turno
- simular certeza sobre decisiones del motor determinístico
- llenar vacíos con lenguaje persuasivo que oculte incertidumbre

### 8.3 Comportamientos obligatorios
Cuando falte evidencia, debe:
- decir que no tiene base suficiente
- pedir aclaración o siguiente acción válida
- limitar la respuesta a explicación general no factual, si aplica
- preferir una respuesta más corta y honesta sobre una respuesta completa pero inventada

### 8.4 Guardrails de implementación recomendados
- prompts con instrucciones de evidencia obligatoria
- salida estructurada antes de render conversacional final
- chequeo automático de contradicción contra `sessionState`
- catálogo de frases de incertidumbre permitidas
- bloqueo o degradación segura cuando falle el chequeo de honestidad

## 9. Orden de implementación por fases

### Fase 0 — Spec y decisión estructural
- aprobar esta dirección o ajustarla vía ADR/validación humana
- congelar nomenclatura oficial: `Tutor GCM` + servicios internos
- definir contrato de turno v1

### Fase 1 — Núcleo gobernable
- implementar orquestador de turno simple
- conectar motor determinístico como autoridad única de estado
- definir input/output estructurado del Tutor
- registrar trazabilidad mínima por turno

### Fase 2 — Honestidad y testabilidad
- añadir servicio de chequeo de seguridad/honestidad
- crear suite de pruebas de contrato por turno
- crear casos negativos de alucinación y contradicción
- medir tasa de respuestas degradadas vs respuestas aceptadas

### Fase 3 — Calidad pedagógica controlada
- mejorar explicación pedagógica y memoria resumida
- introducir plantillas por intención de turno
- calibrar tono, brevedad y utilidad sin tocar autoridad del motor

### Fase 4 — Evolución opcional
- evaluar herramientas internas adicionales solo si mejoran métricas
- considerar fallback de proveedor LLM sin cambiar el contrato externo
- revaluar multi-asistente visible únicamente con evidencia fuerte

## 10. Riesgos principales

### Riesgos de producto
- que el Tutor parezca más capaz de lo que realmente controla
- que UX conversacional prometa personalización aún no soportada
- que memoria/resumen introduzca sesgos o sobreinferencias

### Riesgos técnicos
- acoplar demasiado prompt y lógica de negocio
- trazas incompletas que impidan auditar errores
- introducir demasiados servicios internos demasiado pronto

### Riesgos operativos
- falta de métricas para detectar alucinación silenciosa
- cambios de prompt sin versionado
- dificultad para reproducir respuestas si el contexto no queda congelado

### Mitigaciones clave
- contrato de turno pequeño y estable
- autoridad determinística fuera del LLM
- versionado de prompt/plantilla
- trazabilidad por turno
- pruebas de contradicción, límites e incertidumbre

## 11. Criterios de aceptación ejecutivos
Se considerará bien encaminado el componente cuando:
1. exista un único asistente visible consistente
2. el LLM no controle scoring ni estados críticos
3. cada turno tenga contrato verificable de entrada y salida
4. la respuesta pueda degradarse con honestidad ante falta de evidencia
5. QA pueda probar casos positivos y negativos sin depender de interpretación subjetiva extensa

## 12. Fuera de alcance explícito
Esta spec **no** cubre:
- operación editorial del banco
- gobierno del banco de preguntas
- workflows de carga, curación o segmentación editorial
- expansión de dominios de contenido fuera del flujo actual de práctica/evaluación

## 13. Siguiente decisión requerida
La decisión ejecutiva ya puede cerrarse sobre esta base en ADR-002. La recomendación operativa es:
- aprobar `Tutor GCM` como único asistente visible inicial
- congelar la autoridad del motor determinístico fuera del LLM visible
- exigir contrato v1 de turno y trazabilidad mínima antes de implementación funcional
- prohibir expansión editorial o multi-asistente visible dentro de este sprint sin nuevo ADR
