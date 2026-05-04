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
last_reviewed: 2026-05-04
---

# Backlog de producto

## Criterio de uso
Este backlog distingue entre trabajo confirmado, trabajo propuesto y vacios de contexto. No se debe marcar como hecho nada que no tenga evidencia en repo, sprint log, PR cerrado, runtime validado o validacion humana.

## Estado ejecutivo actual
GanaConMerito tiene activo el core real de producto:

- auth/login/logout
- onboarding
- practica
- dashboard historico y por sesion
- banco de preguntas activo gobernado
- Tutor GCM integrado en practica con guardrails
- metricas prudentes para no vender conclusiones fuertes con poca senal
- runtime con metadata visible y disciplina de triple verificacion

## Implementado y validado recientemente

### PR #1 — Fix de login / Supabase runtime public config
- Estado: CERRADO.
- Resultado: login Google/Supabase recuperado y fallback runtime de configuracion publica aplicado.

### PR #2 — Humanizacion UX de etiquetas tecnicas
- Estado: CERRADO.
- Resultado: slugs tecnicos en practica/dashboard reemplazados por etiquetas legibles.

### PR #3 — Rotacion controlada de seleccion de items
- Estado: CERRADO.
- Resultado: nuevas sesiones ya no dependen de primer item fijo por ordenamiento simple.

### Sprint 10 / PR #4 — Tutor GCM fuente de verdad y contrato pedagogico v1
- Estado: CERRADO.
- Resultado: contratos, evidence builder, modos, intenciones, guardrails y degradacion honesta implementados.

### Sprint 11 / PR #5 — Tutor GCM sincronizacion post-respuesta
- Estado: CERRADO.
- Resultado: Tutor reconoce estado post-respuesta y puede explicar clave/feedback/distractores solo cuando corresponde.

### Sprint 12 / PR #6 — Metricas confiables y utiles v1
- Estado: CERRADO CON PASS/WARN MENOR.
- Resultado: dashboard con contrato de senal, copy prudente, percentil condicionado y recomendaciones accionables.

## Now
1. Cerrar Sprint 12.1: reconciliacion documental y mapa real del producto.
2. Mantener disciplina de triple verificacion `~/.openclaw/product = /opt/gcm/app = runtime visible`.
3. Agregar script general `npm test` y baseline local de QA para evitar reportes repetidos de “npm test no existe”.
4. Mantener dashboard honesto: metricas visibles, pero interpretadas con nivel de senal.
5. Mantener Tutor GCM bajo contrato: sin scoring, sin avance, sin cierre, sin fuente normativa inventada.

## Next
1. **Fuente de verdad normativa sintetizada v1**: concurso, acuerdo, guia metodologica, estructura de prueba, perfil/empleo, competencias funcionales/comportamentales y alineacion MIPG en version gobernada.
2. **Persistencia de trazas del Tutor GCM**: guardar `TutorTurnTrace` para metricas pedagogicas y auditoria.
3. **UX guiada del Tutor GCM**: reemplazar caja libre dominante por acciones pedagogicas guiadas como pista, explicar enunciado, comparar opciones y explicar feedback.
4. **CI minimo en GitHub Actions**: build, tests unitarios, validacion documental y validacion de contenido.
5. **Runtime topology doc**: documentar `docker-compose.yml`, env file, dominio, proxy y politica de secretos.

## Later
1. Admin para editar fuente de verdad normativa y perfiles.
2. Expansion gobernada del banco de preguntas.
3. LLM real bajo contrato y solo despues de fuente normativa suficiente.
4. Dashboard interno de uso del Tutor GCM.
5. Personalizacion pedagogica avanzada por concurso/perfil.

## Deuda tecnica viva

### Alta prioridad
- Documentacion de estado aun requiere reconciliacion completa hasta Sprint 12.1.
- No existe `npm test` como contrato general.
- Fuente normativa del Tutor GCM sigue con placeholders.
- `TutorTurnTrace` no se persiste aun en base de datos.

### Media prioridad
- `PracticeSession` crece como componente grande; refactor futuro, no inmediato.
- `TutorInterface` sigue siendo UI basica de pregunta abierta; evolucionar a acciones guiadas.
- Falta documento formal de topologia runtime.
- Falta diagrama oficial de flujos end-to-end.

## Relacion con modulos
- `auth`: activo y prioritario; mantener estable.
- `onboarding`: activo y endurecido.
- `practice`: nucleo principal del producto; debe seguir siendo practice-first.
- `dashboard`: activo; debe reflejar progreso real sin inflar capacidades analiticas.
- `editorial`: biblioteca documental de solo lectura; no tratar como CMS activo.
- `ai`: Tutor GCM activo con guardrails y contrato de fuente de verdad v1; no es LLM libre.
- `question-bank`: activo y gobernado; expansion solo con decision ejecutiva.

## Criterios de priorizacion
1. Seguridad/auth/datos antes que UX cosmetica.
2. Fuente de verdad antes que LLM real.
3. Trazabilidad antes que personalizacion avanzada.
4. Metricas honestas antes que claims de progreso.
5. Documentacion canonica actualizada antes de abrir nuevos frentes grandes.
