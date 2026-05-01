---
id: PROD-UI-PREMIUM-MOBILE-REDESIGN-PROPOSAL
name: ui-premium-mobile-redesign-proposal
project: ganaconmerito
owner: marlon-arcila
status: proposed
artifact_type: product
modules: [ui, ux, mobile, auth, onboarding, practice, dashboard, editorial, ai]
tags: [ui, ux, mobile-first, premium, proposal, rollout]
related:
  - PROD-UI-DESIGN-BRIEF-MOBILE-FIRST
  - PROD-ACTIVE-FEATURE-MAP
  - PROD-BACKLOG
  - ARCH-ASSISTANT-COMPONENT-SPEC
  - ADR-002-assistant-component-governance
last_reviewed: 2026-05-01
---

# Propuesta canónica — rediseño UI premium mobile-first

## Estado del documento
**Propuesta en curso. No equivale a implementación confirmada ni a despliegue realizado.**

Este documento separa explícitamente:
- **estado actual**: runtime hoy validado en `701ebcf` con core real `login -> onboarding -> práctica -> dashboard -> biblioteca`.
- **dirección propuesta**: capa visual/UX premium mobile-first para ese core ya existente.

## Objetivo
Registrar la dirección visual y operativa aprobable para el siguiente frente UI sin inventar features no implementadas y sin romper la gobernanza del futuro `Tutor GCM`.

## Entradas que alimentan esta propuesta
- brief canónico existente para IA/UI mobile-first
- evaluación comparativa de paletas inspiradas en lenguajes Google / Instagram / TikTok
- revisión de propuestas Stitch compartidas para:
  - login
  - home autenticado
  - práctica
  - dashboard
  - biblioteca
- ADR-002 y spec ejecutiva del componente de asistentes

## 1. Estado actual que debe respetarse
### Core activo hoy
- login con Google
- onboarding inicial
- práctica por sesiones con opción múltiple y justificación opcional
- feedback por respuesta
- dashboard histórico y por sesión
- biblioteca editorial/documental de solo lectura

### Restricciones activas
- `Tutor GCM` es el **único asistente visible aprobado** para esta fase
- la lógica crítica no vive en el LLM visible
- no existe multi-asistente visible aprobado
- no existe chat libre dominante aprobado
- no debe venderse analítica avanzada, CMS editorial maduro ni gamificación no implementada

## 2. Dirección UX central propuesta
### Tesis
GanaConMerito debe sentirse como una **app educativa premium, clara y seria, diseñada primero para móvil**, donde la experiencia dominante es **practice-first** y el asistente queda como **capa contextual secundaria**.

### Principios UX
1. **La práctica manda.** La pregunta y el siguiente paso deben dominar la jerarquía.
2. **Móvil real antes que responsive cosmético.** CTA grandes, navegación thumb-friendly y lectura escaneable.
3. **Alta señal / bajo ruido.** Métricas e insights antes que widgets o dashboards pesados.
4. **Tutor GCM acompaña; no invade.** Se integra como ayuda contextual, drawer o card, no como chat central.
5. **Estado actual y propuesta futura siempre diferenciados.**

## 3. Paleta híbrida final propuesta
Base recomendada: **claridad estructural tipo Google + acento premium controlado para identidad/Tutor GCM**.

```yaml
name: GanaConMerito Hybrid Clarity
colors:
  background: '#F7F9FC'
  surface: '#FCFDFE'
  surface-secondary: '#F1F4F8'
  surface-tertiary: '#E9EEF5'

  text-primary: '#0F172A'
  text-secondary: '#475569'
  text-muted: '#64748B'
  text-inverse: '#FFFFFF'

  border-subtle: '#E2E8F0'
  border-strong: '#CBD5E1'
  outline: '#94A3B8'

  primary: '#0F172A'
  on-primary: '#FFFFFF'

  secondary: '#2563EB'
  on-secondary: '#FFFFFF'
  secondary-soft: '#DBEAFE'

  accent-premium: '#7C3AED'
  on-accent-premium: '#FFFFFF'
  accent-premium-soft: '#EDE9FE'

  success: '#059669'
  success-soft: '#D1FAE5'
  warning: '#D97706'
  warning-soft: '#FEF3C7'
  error: '#DC2626'
  error-soft: '#FEE2E2'
  info: '#0284C7'
  info-soft: '#E0F2FE'
```

### Reglas de uso
- distribución recomendada: **70% neutrales / 20% azul funcional / 10% violeta premium + semánticos**
- `primary` oscuro para CTA principal y autoridad visual
- `secondary` azul para navegación, foco, progreso y señales funcionales
- `accent-premium` violeta para `Tutor GCM`, recomendaciones e insights premium
- semánticos reservados a verdad funcional: correcto, error, refuerzo, advertencia

## 4. Tipografía y sistema visual
### Mantener
- **Manrope** como familia principal de producto
- lenguaje visual sobrio de cards claras, bordes finos y radios suaves

### Escala sugerida
- display: 32px / 800
- h1: 24px / 700
- h2: 20px / 600
- body-lg: 18px / 400
- body-md: 16px / 400
- label-caps: 12px / 700
- metric: 28px / 700

### Shape / spacing
- radios: `0.5rem`, `0.75rem`, `1rem`, `1.5rem`
- touch target mínimo: `3rem`
- gutter base: `1rem`
- container margin móvil: `1.25rem`
- section padding: `2rem`

## 5. Lectura de superficies propuesta
### Login
- sobrio, una sola acción principal
- branding limpio, sin parecer landing
- fondo claro con textura muy sutil opcional

### Home autenticado
- función: orientar en 3 segundos
- prioridad: completar onboarding o continuar práctica
- evitar dashboard pesado de entrada

### Onboarding
- guiado por pasos cortos
- foco en perfil, meta activa y áreas activas
- ansiedad/fricción reducida en móvil

### Práctica
- superficie principal del producto
- pregunta protagonista
- opciones amplias y cómodas de tocar
- CTA sticky abajo
- feedback claro y elegante
- cierre de sesión con continuidad natural hacia resultados

### Dashboard
- separar muy claro histórico vs sesión actual
- priorizar insights sobre tablas
- métricas compactas, no densas

### Biblioteca
- librería curada, sobria y legible
- no parecer CMS

## 6. Reglas de Tutor GCM como capa secundaria
### Permitido en propuesta UI
- coach card contextual
- FAB/disparador discreto
- drawer lateral o bottom sheet contextual
- recap de sesión
- ayuda inline puntual

### No permitido en esta fase
- chat libre dominante como eje del producto
- múltiples asistentes visibles
- claims de autonomía sobre scoring, progreso o estado de sesión

### Regla visual
`Tutor GCM` debe sentirse como **capa premium de apoyo** y no como reemplazo del flujo de práctica.

## 7. Arquitectura de navegación propuesta
### Mobile-first
- top bar liviana y consistente
- bottom nav persistente para: Inicio / Práctica / Biblioteca / Métricas
- CTA principal sticky cuando el flujo lo requiera
- segmented controls solo donde reduzcan ruido (ej. dashboard histórico vs sesión)

### Desktop adaptable
- conservar la lógica mobile-first
- permitir layouts más editoriales y mayor composición horizontal sin estirar literalmente la versión móvil

## 8. Plan de despliegue UI propuesto
## Fase 0 — documentación y tokens
- fijar paleta híbrida final
- fijar reglas de uso por superficie
- traducir tokens a theme real del frontend
- congelar reglas visuales de `Tutor GCM`

## Fase 1 — shell y sistema base
- actualizar theme, tipografía, radios, spacing y estados globales
- endurecer app shell compartido (top bar, bottom nav, cards, botones, inputs)
- mantener paridad funcional exacta con el core actual

## Fase 2 — superficies core
- login
- home autenticado
- onboarding
- práctica

## Fase 3 — superficies de lectura e insights
- dashboard histórico / sesión actual
- biblioteca editorial solo lectura
- estados vacíos / loading / error

## Fase 4 — Tutor GCM asistido por guardrails
- solo después de contrato v1, trazabilidad mínima y QA negativa
- integrar disparador o módulo contextual sin volver chat-first el producto

## 9. Criterios de aceptación documentales
No marcar como “hecho” hasta que exista evidencia de:
- implementación real en repo canónico
- build válida
- QA mínima aplicable al flujo impactado
- si hay release: triple verificación `~/.openclaw/product = /opt/gcm/app = runtime visible`

## 10. Matriz de updates listos cuando la implementación se confirme
### `docs/project/status.md`
Agregar:
- sección de “rediseño UI premium mobile-first” con distinción entre superficies ya migradas vs pendientes
- nota explícita de que el core funcional no cambió de alcance, solo de capa UX/UI

### `docs/01-product/backlog.md`
Agregar o mover a prioridad activa:
- rollout del shell premium mobile-first
- migración de práctica como superficie prioritaria
- endurecimiento de dashboard/biblioteca bajo nueva jerarquía visual
- preparación visual de `Tutor GCM` como capa secundaria gobernada

### `docs/02-delivery/sprint-log.md`
Registrar:
- apertura formal del sprint UI solo cuando exista objetivo/alcance humano explícito
- pantallas intervenidas por fase
- QA aplicada al frente UI

### `docs/02-delivery/change-log.md`
Registrar por hitos:
- adopción de paleta híbrida final
- migración de shell compartido
- rediseño de práctica
- rediseño de dashboard/biblioteca
- integración visual controlada de `Tutor GCM` si se implementa

### docs UX / producto
Mantener como fuentes principales:
- este documento como dirección canónica
- `ui-design-brief-mobile-first.md` como prompt/base para IA de diseño
- `active-feature-map.md` como frontera de alcance real

## 11. Riesgos que esta propuesta intenta evitar
- convertir el producto en chat-first antes de tiempo
- usar una estética tipo social/video que rompa el foco académico
- sobrediseñar dashboard y diluir la práctica
- mezclar estado actual con propuesta y sobreprometer implementación

## 12. Decisión recomendada para el siguiente frente
Si se abre sprint o frente formal de UI, la recomendación documental es:
1. usar esta paleta híbrida final como base
2. intervenir primero shell + práctica
3. mantener `Tutor GCM` como capa secundaria y no dominante
4. registrar cada cambio confirmado contra evidencia de repo y QA
