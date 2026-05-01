---
id: PROD-ACTIVE-FEATURE-MAP
name: active-feature-map
project: ganaconmerito
owner: marlon-arcila
status: active
artifact_type: product
modules: [auth, onboarding, practice, dashboard, editorial, ai]
tags: [features, inventory, estado-real, alcance]
related:
  - PROD-BACKLOG
  - DEL-SPRINT-LOG
  - ARCH-ASSISTANT-COMPONENT-SPEC
  - ADR-002-assistant-component-governance
last_reviewed: 2026-05-01
---

# Mapa formal de features activas con estado real

## Objetivo
Dejar inventario explícito de lo que hoy está activo, endurecido, diferido o solo aprobado a nivel de arquitectura para evitar sobreprometer producto.

## Regla de lectura
- **Activo**: existe en runtime/código principal y forma parte del flujo real.
- **Activo con guardrails**: existe y opera, pero con restricciones explícitas.
- **Aprobado, no implementado**: ya tiene decisión estructural, pero no experiencia funcional desplegable.
- **Diferido**: fuera del sprint o tratado como deuda técnica.
- **Archivado / solo lectura**: visible para consulta, no como frente funcional vivo.

## Resumen ejecutivo
- El core activo real hoy es: **login -> onboarding -> práctica -> dashboard**.
- El dominio de asistentes ya está **aprobado a nivel de gobernanza**, pero **no está implementado como feature visible funcional**.
- El frente editorial existe como **biblioteca documental de solo lectura**, no como módulo administrativo vivo dentro del sprint.
- El banco de preguntas está **operativo como corpus activo curado**, pero su expansión/editorial sigue **fuera de alcance**.

---

## 1. Auth y acceso
### 1.1 Login con Google
- Estado: **Activo**
- Evidencia: `src/app/login/page.tsx`, `src/components/auth/google-sign-in-button.tsx`, `src/app/api/auth/callback/route.ts`
- Alcance real:
  - login vía Google
  - redirect automático si ya existe sesión
  - metadata visible de runtime en `/login` (`commit` + `buildTime`)
- Restricciones:
  - no hay catálogo complejo de métodos de acceso
  - no hay IAM avanzado de producto final todavía

### 1.2 Protección de rutas autenticadas
- Estado: **Activo con guardrails**
- Evidencia: `src/middleware.ts`, `src/lib/supabase/guards`
- Alcance real:
  - home, onboarding, práctica, dashboard y editorial requieren sesión
- Restricciones:
  - el modelo de permisos sigue orientado a MVP, no a roles finos multi-actor

### 1.3 Logout
- Estado: **Activo**
- Evidencia: `src/components/auth/sign-out-button.tsx`

---

## 2. Onboarding
### 2.1 Perfil inicial del aprendiz
- Estado: **Activo**
- Evidencia: `src/app/(authenticated)/onboarding/page.tsx`, `src/components/onboarding/onboarding-form.tsx`, `src/app/api/profile/onboarding/route.ts`
- Campos reales soportados:
  - `targetRole` (hoy restringido a `docente`)
  - `examType` (hoy restringido a `docente`)
  - `professionalProfileId`
  - `activeGoal`
  - `preferredFeedbackStyle` (hoy `socratic`)
  - `activeAreas` (obligatorio)

### 2.2 Gate temprano de onboarding
- Estado: **Activo y endurecido**
- Evidencia: `src/app/(authenticated)/practice/page.tsx`, `src/lib/onboarding/status`
- Alcance real:
  - si el perfil no está completo, práctica redirige a onboarding
  - si `activeAreas` viene vacío, API rechaza la operación

### 2.3 Personalización avanzada
- Estado: **No implementado**
- Nota:
  - existe personalización mínima de perfil
  - no existe todavía motor rico de preferencias, tono dinámico ni rutas de aprendizaje avanzadas

---

## 3. Práctica
### 3.1 Inicio de sesión de práctica
- Estado: **Activo**
- Evidencia: `src/components/practice/practice-session.tsx`, `src/app/api/session/start/route.ts`
- Alcance real:
  - crea sesión real backend
  - si falta onboarding, la sesión no continúa y se informa el bloqueo

### 3.2 Carga de ítem activo
- Estado: **Activo**
- Evidencia: `src/app/api/session/item/route.ts`
- Alcance real:
  - carga pregunta actual por `sessionId` + `itemId`

### 3.3 Respuesta y avance de sesión
- Estado: **Activo**
- Evidencia: `src/app/api/session/advance/route.ts`, `public.advance_session_atomic(...)`, `src/domain/orchestrator/session-machine.ts`
- Alcance real:
  - selección de opción
  - envío opcional de justificación textual
  - evaluación backend
  - avance al siguiente ítem o cierre de sesión
- Guardrails:
  - ownership explícito
  - persistencia terminal validada
  - límite de turnos ya gobernado por `MAX_SESSION_TURNS`, no hardcodeado en dominio

### 3.4 Feedback por respuesta
- Estado: **Activo con guardrails**
- Evidencia: `PracticeSession`, `score-response.ts`
- Alcance real:
  - feedback textual
  - `isCorrect`
  - `reasoningScore`
  - `competencyScore`
  - `hintLevel`
  - nota cualitativa opcional
- Restricciones:
  - aún no existe Tutor GCM conversacional visible
  - el feedback actual no debe venderse como experiencia asistida completa

### 3.5 Flujo de práctica mobile-friendly
- Estado: **Funcional, UX básica**
- Observación:
  - el flujo existe y funciona
  - la interfaz sigue siendo mínima; necesita una capa UX/UI fuerte para móvil

---

## 4. Dashboard
### 4.1 Dashboard histórico acumulado
- Estado: **Activo**
- Evidencia: `src/app/(authenticated)/dashboard/page.tsx`, `src/lib/dashboard/summary.ts`, `/api/dashboard/summary`
- Alcance real:
  - intentos totales
  - aciertos
  - precisión
  - tendencia
  - percentil segmentado si aplica
  - fortalezas y áreas por reforzar
  - desglose por tema/competencia

### 4.2 Dashboard por sesión
- Estado: **Activo**
- Evidencia: `dashboard?sessionId=...`
- Alcance real:
  - separa corrida actual vs histórico acumulado

### 4.3 Analytics avanzadas
- Estado: **No implementado**
- Nota:
  - no hay todavía series visuales complejas, coaching longitudinal ni metas adaptativas ricas

---

## 5. Navegación y shell de producto
### 5.1 Entry point coherente
- Estado: **Activo**
- Evidencia: `src/app/page.tsx`, `src/app/login/page.tsx`, `getAuthenticatedLandingPath(...)`
- Alcance real:
  - `/` resuelve según sesión
  - `/login` redirige si ya hay sesión

### 5.2 Layout autenticado compartido
- Estado: **Activo**
- Evidencia: `src/app/(authenticated)/layout.tsx`, `src/components/navigation/app-nav.tsx`
- Alcance real:
  - navegación base: Inicio / Onboarding / Práctica / Dashboard
- Restricción:
  - navegación vigente es funcional, no premium

---

## 6. Editorial
### 6.1 Biblioteca editorial web
- Estado: **Activo como solo lectura**
- Evidencia: `src/app/editorial/page.tsx`, `src/app/editorial/[slug]/page.tsx`, `src/app/editorial/download/[slug]/route.ts`
- Alcance real:
  - consulta de documentación canónica vigente
  - descarga de documentos
- Restricciones:
  - no es CMS editorial completo
  - no debe interpretarse como módulo administrativo activo del sprint

### 6.2 Inbox/legado editorial en superficie activa
- Estado: **Retirado / archivado**
- Evidencia documental: `docs/archive/**`

---

## 7. Banco de preguntas / contenido
### 7.1 Corpus activo curado
- Estado: **Activo**
- Evidencia: `content/items/**`, scripts de validación/importación
- Alcance real:
  - corpus activo de 27 preguntas
  - banco remoto alineado al corpus curado vigente

### 7.2 Operación editorial del banco
- Estado: **Diferido**
- Alcance fuera del sprint:
  - expansión editorial
  - resegmentación mayor
  - workflows de gobierno del banco

---

## 8. Asistentes
### 8.1 Tutor visible dentro del producto
- Estado: **Aprobado, no implementado**
- Evidencia: `docs/03-architecture/adrs/ADR-002-assistant-component-governance.md`, `docs/03-architecture/assistant-component-executive-spec.md`
- Decisión aprobada:
  - un único asistente visible: `Tutor GCM`
  - servicios internos no visibles
  - lógica crítica fuera del LLM
  - contrato v1 obligatorio
  - trazabilidad mínima obligatoria
  - QA negativa obligatoria

### 8.2 Multi-asistente visible
- Estado: **No aprobado para esta fase**

### 8.3 Orquestación conversacional productiva
- Estado: **No implementado**

---

## 9. QA, deploy y trazabilidad
### 9.1 Build metadata visible
- Estado: **Activo**
- Evidencia: `/login`, `src/lib/build-info.ts`, `scripts/prepare-build-metadata.mjs`

### 9.2 Baseline QA real
- Estado: **Activo**
- Evidencia: `qa:smoke:postdeploy`, `qa:e2e:ui`, `qa:e2e:api`, `test:dashboard`
- Alcance real:
  - smoke postdeploy
  - E2E UI Chromium
  - E2E API
  - prueba del dashboard

### 9.3 Regla de triple verificación
- Estado: **Activo como norma operativa**
- Regla:
  - `~/.openclaw/product` = `/opt/gcm/app` = runtime visible en `/login`

---

## 10. Lo que NO debe presentarse como feature activa
- Tutor GCM conversacional ya desplegado
- multi-asistente visible
- módulo editorial administrativo maduro
- roadmap de roles avanzados
- analítica avanzada de aprendizaje
- personalización profunda más allá del onboarding mínimo actual

---

## 11. Prioridades derivadas
1. convertir este mapa en referencia para backlog y status
2. diseñar UI móvil fuerte sin inventar features no implementadas
3. preparar contrato v1 del Tutor GCM sobre el core ya validado
4. mantener fuera del sprint editorial/question-bank salvo decisión ejecutiva explícita
