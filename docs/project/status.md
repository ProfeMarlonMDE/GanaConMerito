---
id: PROJ-STATUS
name: status
project: ganaconmerito
owner: marlon-arcila
status: active
artifact_type: project
last_reviewed: 2026-05-04
---

# Project Status — GanaConMerito

Ultima actualizacion: 2026-05-04 — Reconciliacion documental Sprint 12.1.

## Estado general

**Estado:** Sprint 12 cerrado con PASS/WARN menor aceptado.  
**Producto:** MVP avanzado con core operativo, Tutor GCM gobernado y dashboard con metricas prudentes.  
**Rama canonica:** `master`.  
**Version declarada en `package.json`:** `0.6.0`.

## Verdad operativa actual

- **HEAD actual en `master`:** `64d78def1d8dd4f98ec9ae5ba55a3fed97e4e4ba`.
- **Short hash runtime esperado:** `64d78de`.
- **Runtime visible validado en produccion:** `64d78de`.
- **Build time visible validado:** `2026-05-04T03:24:21Z`.
- **Triple verificacion reportada:** `~/.openclaw/product = /opt/gcm/app = runtime visible` sobre `64d78de`.
- **Entorno publico validado:** `https://cnsc.profemarlon.com`.

## Modulos activos

### Auth y acceso
- Login con Google activo.
- Runtime metadata visible en `/login`.
- Rutas privadas protegidas.
- Logout validado con proteccion post-logout.
- Fix de configuracion publica Supabase aplicado en PR #1.

### Practica
- Inicio de sesion real desde backend.
- Carga de item por sesion.
- Respuesta con opcion y justificacion opcional.
- Persistencia de turnos y eventos de evaluacion.
- Avance con `advance_session_atomic`.
- Rotacion controlada de item inicial y siguientes items aplicada en PR #3.

### Dashboard / metricas
- Dashboard historico y por sesion activos.
- Contrato de senal de metricas aplicado en PR #6.
- Estados de senal: `no_signal`, `low_signal`, `emerging_signal`, `usable_signal`.
- Copy prudente para evitar promesas exageradas.
- Percentil condicionado por evidencia suficiente.
- Fortalezas/refuerzos condicionados por umbrales minimos.

### Tutor GCM
- Integrado en pantalla de practica.
- Ruta `/api/tutor/turn` autenticada.
- Contexto critico derivado server-side.
- Contrato de fuente de verdad v1 implementado en PR #4.
- Sincronizacion post-respuesta corregida en PR #5.
- Antes de responder no revela clave.
- Despues de responder puede explicar clave, feedback, distractores y justificacion.
- No tiene autoridad sobre scoring, avance, cierre de sesion ni seleccion de items.

### Banco de preguntas
- Corpus activo gobernado de 27 items segun documentacion vigente.
- Validadores de contenido disponibles en scripts npm.
- Expansion editorial del banco sigue fuera de alcance inmediato salvo decision explicita.

## Historial reciente reconciliado

### PR #6 — Sprint 12: Metricas confiables y utiles v1
- **Merge en master:** `64d78def1d8dd4f98ec9ae5ba55a3fed97e4e4ba`.
- **Foco:** evitar que el dashboard venda conclusiones fuertes con poca senal.
- **Validacion:** deploy y E2E online PASS/WARN menor sobre `64d78de`.
- **Resultado:** dashboard con contrato de senal, copy prudente y restricciones para percentil, fortalezas y refuerzos.

### PR #5 — Sprint 11: Tutor GCM sincronizacion post-respuesta
- **Merge en master:** `1dc454291b22bff41b95125fcbd68e373d8f578a`.
- **Foco:** permitir explicacion post-respuesta sin romper guardrails pre-respuesta.
- **Validacion:** E2E online PASS.
- **Resultado:** `canRevealCorrectAnswer` pasa de `false` a `true` solo despues de respuesta confirmada server-side.

### PR #4 — Sprint 10: Tutor GCM fuente de verdad y contrato pedagogico v1
- **Merge en master:** `7a380328af9fcb974c9ab6497b35380ce9bd06ed`.
- **Foco:** contratos, evidence builder, modos, intenciones, degradacion y trazabilidad preparada.
- **Resultado:** Tutor GCM deja de ser chat libre y opera con fuente de verdad gobernada v1.

### PR #3 — Rotacion controlada de seleccion de items
- **Foco:** evitar que nuevas sesiones inicien siempre con la misma pregunta.
- **Resultado:** seleccion con pool de candidatos, exclusion de recientes y rotacion deterministica.

### PR #2 — Humanizacion UX de etiquetas tecnicas
- **Foco:** evitar slugs crudos como `gestion · lectura_de_indicadores`.
- **Resultado:** etiquetas humanizadas en practica y dashboard.

### PR #1 — Fix de login/Supabase runtime config
- **Foco:** corregir ausencia de variables publicas Supabase en browser bundle.
- **Resultado:** fallback runtime para configuracion publica y login operativo.

## Deuda tecnica viva

1. **Fuente normativa real del Tutor GCM:** hoy existen placeholders gobernados para acuerdo, guia metodologica, estructura de prueba y perfil detallado.
2. **Persistencia de `TutorTurnTrace`:** el contrato existe, pero falta tabla/escritura para metricas del tutor.
3. **Admin de fuente de verdad:** aun no existe superficie administrativa para editar concursos, guias, perfiles y sintesis normativas.
4. **Documentacion arquitectonica visual:** falta mapa oficial actualizado de flujos runtime.
5. **CI y test script general:** falta script `npm test` agregado como contrato general de QA local.
6. **Runtime topology:** falta documento especifico sobre ubicacion de `docker-compose.yml`, env file, proxy/dominio y politica de secretos.

## Proximos pasos recomendados

1. Cerrar Sprint 12.1 con PR documental y actualizar este estado como referencia canonica.
2. Sprint 13 recomendado: Fuente de verdad normativa sintetizada v1.
3. Sprint 14 recomendado: Persistencia y metricas del Tutor GCM.
4. Sprint 15 recomendado: UX guiada del Tutor GCM con intenciones pedagogicas.

## Criterio de cierre del estado actual

El estado actual se considera reconciliado cuando:

- `status.md`, `sprint-log.md`, `change-log.md`, `backlog.md` y `active-feature-map.md` reflejan Sprints 10, 11 y 12.
- El mapa de features reconoce Tutor GCM como activo con guardrails, no como solo aprobado.
- El dashboard se reconoce como activo con contrato de metricas prudentes.
- Las deudas vivas quedan diferenciadas de funcionalidades ya implementadas.
