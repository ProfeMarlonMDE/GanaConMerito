---
id: ARCH-VISUAL-SYSTEM-DESIGN-TOKENS
name: visual-system-and-design-tokens
project: ganaconmerito
owner: Google_Antigravity
status: active
artifact_type: architecture
modules: [ui, design-system, tokens, onboarding, practice, dashboard, home, login, landing]
tags: [visual-system, design-tokens, ui-homogenization, mobile-first]
last_reviewed: 2026-09-06
---

<!-- Agent: Google_Antigravity | Model: Gemini 3.6 Flash -->

# Sistema Visual y Tokens de Diseño — GanaConMérito

## 1. Propósito y Fuente Canónica
Este documento gobierna la presentación visual, componentes UI y tokens de diseño de **GanaConMérito**.
La fuente de referencia visual autoritativa del sistema es la página de **Perfil / Onboarding** (`/onboarding`), aprobada como estándar de diseño del producto.

Todas las páginas públicas y autenticadas deben adherirse a esta especificación para garantizar una experiencia limpia, sobria, responsiva y homogénea.

---

## 2. Paleta de Colores y Tokens Canónicos
Los tokens se definen semánticamente en `src/app/globals.css` bajo la pseudoclase `:root`.

### Colores Principales
- **Fondo General (`--gcm-bg`)**: `#f7f8f4` (superficie neutra sobria)
- **Fondo de Tarjetas (`--gcm-surface-card`)**: `#ffffff` (blanco puro con sombra sutil)
- **Fondo Secundario (`--gcm-surface-secondary`)**: `#eef3ed` (verde suave de contraste)
- **Fondo Terciario (`--gcm-surface-tertiary`)**: `#f4f8f3` (superficie para notas/pistas)
- **Verde Bosque (`--gcm-forest`)**: `#153f32` (color de marca principal, encabezados, acento principal)
- **Verde Lima (`--gcm-lime`)**: `#d9f56f` (acciones primarias, badges destacados, puntos de marca)
- **Verde Esmeralda (`--gcm-emerald`)**: `#16a34a` (estados de éxito y verificación)

### Tipografía
- **Texto Principal (`--gcm-text-primary`)**: `#17231e`
- **Texto Secundario (`--gcm-text-secondary`)**: `#52615a`
- **Texto Muted (`--gcm-text-muted`)**: `#66716c`
- **Texto Inverso (`--gcm-text-inverse`)**: `#ffffff`

### Bordes, Radios y Sombras
- **Borde sutil (`--gcm-border-subtle`)**: `#dfe4dd`
- **Borde destacado (`--gcm-border-strong`)**: `#9cb5a8`
- **Radio de tarjetas (`--gcm-radius-lg`)**: `24px`
- **Radio de botones / selectores (`--gcm-radius-md`)**: `14px` - `16px`
- **Radio de pills (`--gcm-radius-pill`)**: `999px`
- **Sombra de tarjetas (`--gcm-shadow-card`)**: `0 10px 35px rgba(24, 43, 34, 0.04)`

---

## 3. Componentes Reutilizables Homogéneos
1. **Contenedor Principal (`.app-shell`)**: Ancho máximo `1120px` (`--gcm-content-width`), centrado con padding responsivo.
2. **Encabezado / Eyebrow (`.eyebrow`)**: Texto en mayúsculas con tracking `0.12em`, tamaño `12px`, acompañado obligatoriamente del indicador de punto verde (`.eyebrow-dot`).
3. **Botón Primario (`.primary`)**: Fondo `#d9f56f`, texto `#173326`, peso `900`, borde redondeado `14px`.
4. **Botón Secundario (`.secondary`)**: Fondo `#eef3ed`, texto `#17231e`, peso `700`, borde redondeado `14px`.
5. **Selector Combo (`PositionSelector`)**: Wrapper con icono integrado, borde `#dfe4dd`, hover `#9cb5a8`, foco `#153f32`. Usa el catálogo canónico de perfiles (`CANONICAL_POSITIONS`).
6. **Tarjeta Estándar (`.card`)**: Fondo blanco `#ffffff`, borde `#dfe4dd`, sombra sutil, radio `24px`.
7. **Tarjeta de Oportunidad / Foco (`.opportunity`)**: Fondo `#edf7d4`, borde `#d2e59e`, radio `24px`.
8. **Estados UI (`EmptyState`, `ErrorState`, `LoadingState`)**: Estilizados con tokens `--gcm-*`.

---

## 4. Inventario de Páginas Migradas
| Ruta | Clasificación | Estado de Homogeneización | Referencia Visual Preservada |
|---|---|---|---|
| `/onboarding` | Autenticada | **REFERENCIA AUTORITATIVA** | SÍ |
| `/home` | Autenticada | Homogeneizado | SÍ |
| `/dashboard` | Autenticada | Homogeneizado | SÍ |
| `/practice` | Autenticada | Homogeneizado | SÍ |
| `/tutor-gcm-ia` | Pública / Info | Homogeneizado | SÍ |
| `/login` | Pública | Homogeneizado | SÍ |
| `/` (Landing) | Pública | Homogeneizado | SÍ |
| `/como-funciona` | Pública | Homogeneizado | SÍ |
| `/preguntas-verificadas` | Pública | Homogeneizado | SÍ |
| `/editorial` | Autenticada | Homogeneizado | SÍ |

---

## 5. Reglas para Crear o Adaptar Componentes y Páginas
- **Nunca hardcodear códigos de color hexadecimales** fuera de `:root` en CSS o estilos inline.
- Usar siempre tokens semánticos: `var(--gcm-bg)`, `var(--gcm-forest)`, `var(--gcm-lime)`, `var(--gcm-border-subtle)`.
- Todo encabezado de sección debe usar el patrón `.eyebrow` con `<span className="eyebrow-dot" />`.
- Mantener la accesibilidad con contraste superior a 4.5:1 en todos los textos sobre fondo verde o blanco.
- Verificar responsividad en móvil (375px), tablet (768px) y escritorio (1024px+).

---

## 6. Estrategia de Pruebas y Rollback
- Pruebas unitarias y de tipo: `npm run typecheck && npm run test:unit`
- Compilación completa: `npm run build`
- Sincronización del runtime local (ASUS WSL2): `./scripts/gcm-local-sync-if-applicable.sh HEAD`
- Rollback en caso de fallos: `./scripts/gcm-local-rollback.sh`
