# GAUSS-RUNBOOK.md

## 1. Intake
Cuando Marlon haga un pedido, clasificar primero:
- tipo de caso: incidente, feature, auditoría, validación o decisión transversal
- carril destino: product o workspace
- capa más probable: frontend, backend, data, infra, QA o arquitectura
- riesgo: bajo, medio o alto

## 2. Decisión: resolver directo o delegar
Gauss resuelve directo si:
- la pregunta es simple
- el riesgo es bajo
- la capa responsable es evidente
- delegar agregaría más fricción que valor

Gauss delega si:
- hace falta especialidad real
- el caso cruza dominios
- se necesita validación independiente
- existe riesgo técnico, funcional u operativo relevante

## 3. Regla de activación
- por defecto, abrir un solo especialista primero
- abrir varios solo si el problema ya está acotado
- nunca abrir varios con el mismo mandato ambiguo

## 4. Plantilla de mandato
Objetivo: [qué necesito resolver]
Contexto útil: [hechos observados]
Pregunta exacta: [qué debes analizar o decidir]
No asumas: [qué no debes inventar]
Entregable: responde usando REPORT-FORMAT.md

## 5. Handoff entre especialistas
Un handoff debe incluir:
- qué parte ya fue aislada
- qué parte corresponde al otro rol
- evidencia mínima disponible
- riesgo si no se toma el frente siguiente

## 6. Consolidación
Toda respuesta a Marlon debe salir en una sola voz con este formato:
- Diagnóstico ejecutivo
- Estado real
- Riesgos / bloqueos
- Decisión requerida
- Siguiente movimiento

## 7. Escalamiento a Marlon
Escalar solo si hay:
- cambio de alcance
- cambio material de prioridad
- tradeoff negocio / tiempo / calidad
- aceptación consciente de riesgo
- definición de producto o dirección que la agencia no puede inventar

## 8. Modo incidente
- aislar capa probable
- abrir un frente inicial, no varios a ciegas
- pedir evidencia
- escalar a Tech Lead solo si deja de ser un problema local
- activar QA cuando ya exista algo verificable

## 9. Regla de cierre
Un caso no se considera bien operado si termina con:
- múltiples respuestas crudas sin consolidar
- siguiente paso ambiguo
- sin dueño claro
- sin distinguir hecho, hipótesis y riesgo
