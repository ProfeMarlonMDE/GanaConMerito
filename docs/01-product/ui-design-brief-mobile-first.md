---
id: PROD-UI-DESIGN-BRIEF-MOBILE-FIRST
name: ui-design-brief-mobile-first
project: ganaconmerito
owner: marlon-arcila
status: active
artifact_type: product
modules: [ui, mobile, auth, onboarding, practice, dashboard, ai]
tags: [ui, ux, mobile-first, prompt, design-system]
related:
  - PROD-ACTIVE-FEATURE-MAP
  - ARCH-ASSISTANT-COMPONENT-SPEC
  - ADR-002-assistant-component-governance
  - PROD-BACKLOG
last_reviewed: 2026-05-01
---

# Brief para IA de UI — GanaConMerito (mobile-first, plausible y alineado al producto real)

## Uso recomendado
Este documento está pensado para pegarse en Claude, Stitch u otra IA de diseño/UI para pedir una propuesta visual y estructural creíble, moderna y alineada al estado real del producto.

---

## Prompt base sugerido

Diseña una propuesta de UI/UX para **GanaConMerito**, una app web educativa de práctica guiada orientada inicialmente a usuarios del perfil **docente**, con fuerte prioridad en **móvil** y con un enfoque de producto serio, confiable y moderno.

No quiero una landing genérica ni una app “edtech juguete”. Quiero una propuesta que se sienta como un producto real de 2026: clara, creíble, sobria, útil, con buena jerarquía de información, excelente experiencia en móvil y preparada para crecer hacia un asistente pedagógico conversacional sin romper la arquitectura del producto.

## Qué es la app
GanaConMerito es un sistema de práctica y seguimiento que hoy tiene este flujo real:
1. login con Google
2. onboarding inicial del usuario
3. práctica por sesiones con preguntas de opción múltiple y justificación escrita opcional
4. feedback por respuesta
5. dashboard de progreso histórico y por sesión
6. biblioteca editorial/documental de solo lectura

La app **ya funciona** en ese flujo base. No estás diseñando humo conceptual; estás diseñando una capa UI fuerte sobre un core real ya implementado.

## Público inicial
- usuarios tipo `docente`
- personas que quieren practicar, medir progreso y entender mejor sus resultados
- probable uso muy frecuente desde celular
- necesitan claridad, foco, sensación de avance y cero fricción innecesaria

## Stack y realidad técnica
- framework: **Next.js 15** (App Router)
- lenguaje: **TypeScript**
- frontend: **React 19**
- backend app: rutas API en Next.js
- auth + data: **Supabase**
- validación runtime: **Zod**
- despliegue: **Docker**
- modelo actual: app server-rendered + client components puntuales
- la app actual ya tiene rutas reales de `login`, `home`, `onboarding`, `practice`, `dashboard` y `editorial`

## Restricciones funcionales reales
No inventes features que hoy no existen como si ya estuvieran implementadas.
Sí puedes proponer UI preparada para crecimiento, pero diferenciando claramente entre:
- lo que existe hoy
- lo que puede quedar preparado para una siguiente fase

### Existe hoy
- login con Google
- navegación autenticada básica
- onboarding con perfil profesional, meta activa y áreas activas
- práctica real con sesiones, preguntas, opciones, respuesta y justificación
- feedback por respuesta
- dashboard histórico
- dashboard por sesión
- biblioteca editorial de solo lectura

### Aprobado pero no implementado todavía
- un único asistente visible llamado **Tutor GCM**
- este asistente deberá vivir sobre guardrails estrictos
- la lógica crítica NO vive en el LLM

### No debes asumir como presente
- multi-asistente visible
- chat libre ya desplegado
- CMS editorial maduro
- analítica hiper avanzada no implementada
- gamificación agresiva si no es sobria y útil

## Qué debe transmitir la UI
- confianza
- claridad
- progreso real
- seriedad académica sin volverse fría
- fuerte usabilidad móvil
- sensación de producto premium pero enfocado
- arquitectura preparada para integrar un Tutor GCM en una fase posterior

## Prioridad absoluta: móvil
Quiero una propuesta **mobile-first de verdad**, no una desktop reducida.

Piensa primero en:
- thumb-friendly navigation
- jerarquía vertical clara
- tarjetas compactas pero respirables
- CTAs grandes y obvios
- formularios muy fáciles de completar desde celular
- bloques de feedback que no saturen pantalla
- transiciones cortas y percepción de avance
- buen comportamiento con scroll largo
- uso inteligente de bottom navigation / segmented controls / sticky actions si conviene

## Pantallas que necesito en la propuesta
1. **Login**
   - simple, muy claro, confiable
   - branding sobrio
   - CTA principal único

2. **Home autenticado / hub**
   - debe orientar rápido a “continuar práctica” o “completar onboarding”
   - debe mostrar claramente los caminos principales
   - debe sentirse como panel liviano, no como dashboard pesado

3. **Onboarding**
   - debe sentirse guiado, corto y claro
   - idealmente en pasos o bloques progresivos si eso mejora móvil
   - debe facilitar selección de perfil profesional, meta activa y áreas activas

4. **Práctica**
   - es la pantalla más importante
   - la pregunta debe ser protagonista
   - las opciones deben ser cómodas en móvil
   - la captura de justificación debe ser usable
   - el feedback debe ser muy legible
   - debe sentirse como una sesión guiada moderna, no como formulario tosco

5. **Dashboard**
   - distinguir muy bien histórico vs sesión actual
   - mostrar progreso sin ruido excesivo
   - usar visualizaciones plausibles, sobrias y comprensibles en móvil
   - destacar fortalezas, áreas por reforzar y tendencia

6. **Biblioteca editorial**
   - debe presentarse como consulta documental limpia y seria
   - solo lectura, sin parecer CMS activo

7. **Espacio futuro para Tutor GCM**
   - no diseñes un chat libre dominante desde ya
   - sí deja una integración plausible: un panel contextual, coach card, assistant drawer o módulo de ayuda guiada que pueda crecer después

## Criterios de UX importantes
- minimizar fricción en cada flujo crítico
- que el usuario siempre sepa qué hacer después
- evitar pantallas vacías ambiguas
- cada pantalla debe tener un CTA principal claro
- la navegación no puede sentirse perdida
- diseño accesible y legible
- estados vacíos, loading y error deben verse pensados
- evitar depender de tablas densas en móvil
- priorizar lectura rápida y acción rápida

## Qué quiero que entregues
1. una **dirección visual general** del producto
2. un **sistema de navegación** mobile-first y desktop-adaptable
3. una **arquitectura de pantallas** coherente con el flujo real
4. propuestas de componentes clave
5. lineamientos visuales (tipografía, spacing, densidad, cards, botones, inputs, feedback states)
6. propuesta de cómo se integraría en el futuro el **Tutor GCM** sin romper la claridad del producto
7. racional de por qué tu propuesta es consistente con una app educativa moderna, útil y creíble en 2026

## Estilo visual sugerido
- moderno, sobrio, premium, útil
- evitar estética infantil o excesivamente escolar
- evitar “dashboard enterprise” pesado
- preferir una mezcla de:
  - claridad editorial
  - producto SaaS moderno
  - mobile UX fuerte
  - microinteracciones discretas

## Palabras clave de diseño
- mobile-first
- clean learning product
- trustworthy
- guided practice
- performance-oriented
- focused
- modern but restrained
- pedagogical clarity
- strong information hierarchy
- assistant-ready but not assistant-dependent

## Lo que NO quiero
- mockup genérico con hero marketing
- exceso de glassmorphism vacío
- sobrecarga visual
- múltiples asistentes/personas compitiendo
- UX que parezca chatbot-centered desde el inicio
- una propuesta que invente features no existentes y las venda como hechas
- desktop-first disfrazado de responsive

## Resultado ideal
Quiero que la propuesta parezca la evolución natural y plausible de una app que ya tiene backend real, sesiones reales, evaluación real, dashboard real y una futura capa de asistente bien gobernada. Debe verse fuerte en móvil y lista para crecer con disciplina.

---

## Resumen ejecutivo corto para pegar si quieres algo más compacto
Diseña una UI mobile-first para GanaConMerito, una app educativa web construida con Next.js + TypeScript + React + Supabase. El flujo real existente es login con Google, onboarding, práctica por sesiones con preguntas y justificación, feedback por respuesta, dashboard histórico/por sesión y biblioteca editorial de solo lectura. La propuesta debe sentirse moderna, seria, premium y muy usable en móvil. No inventes features no implementadas. Debe dejar espacio futuro para un único asistente visible llamado `Tutor GCM`, pero sin convertir la app desde ya en un chat libre. Prioriza claridad, progreso, jerarquía informativa, navegación thumb-friendly y experiencia de práctica excelente en celular.
