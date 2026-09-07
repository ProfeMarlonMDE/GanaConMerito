# Tutor GCM — Distribución del Panel, Selector de Estilos y Ciclo de Vida de Chips (vNext)

<!-- Agent: Antigravity | Model: Gemini 3.7 Flash -->

**Estado**: Implementado y validado para prueba local  
**Fecha**: 2026-09-05  
**Rama**: `feat/practice-tutor-experience-vnext`  
**Referencia visual**: Mockup aprobado de distribución compacta Tutor GCM

---

## 1. Resumen Ejecutivo

Este documento especifica la distribución visual aprobada, la jerarquía de controles, el selector de estilos y el ciclo de vida de chips del panel Tutor GCM en la experiencia de Práctica.

Se preserva íntegramente la arquitectura existente: contratos backend (`/api/tutor/turn`), autoridad del servidor, guardarraíles pedagógicos (no revelación de clave antes de responder), persistencia, idempotencia y perfiles gobernados.

---

## 2. Distribución y Jerarquía Aprobada

El panel Tutor se organiza estrictamente en el siguiente orden vertical:

1. **Cabecera compacta con identidad y estado**:
   - Icono de identidad `🤖` + título `TUTOR GCM` (eyebrow, `11px`, bold) + subtítulo de contexto.
   - Badge de estado de modalidad existente: `Práctica Guiada` (`mode-guided`), `Simulación` (`mode-simulation`) o `Revisión` (`mode-review`).
2. **Selector compacto desplegable del estilo actual**:
   - Tarjeta disparadora (`.tutor-profile-trigger-card`) con:
     - Badge cuadrado con inicial (`S`, `D`, `B`) en fondo verde oscuro `#153f32` y texto lima `#d9f56f`.
     - Etiqueta `PERFIL DEL TUTOR` y nombre del estilo seleccionado (`Socrático (S)`, `Directo (D)`, `Breve (B)`).
     - Botón indicador `Cambiar ▾` / `Cerrar ▴`.
   - Menú desplegable accesible con opciones de perfil, accesible por teclado (`ArrowDown`, `ArrowUp`, `Enter`, `Space`, `Escape`).
   - Fallback accesible `select#tutor-profile-select` para interoperabilidad y pruebas.
3. **Descripción breve del estilo activo**:
   - Banner estilizado (`.active-profile-banner`) con borde de acento izquierdo `3.5px solid #153f32` y fondo suave `#f4f8f3`:
     - **S · Socrático**: Preguntas guiadas antes de revelar la clave.
     - **D · Directo**: Criterios claros y explicación estructurada.
     - **B · Breve**: Orientación en viñetas sintéticas.
4. **Mensaje inicial del Tutor (Tarjeta de bienvenida)**:
   - Encabezado `Tutor AI GCM 🤖` con marca temporal `Ahora`.
   - Texto canónico exacto: *"Antes de responderte, te ayudaré a pensar. Pregúntame sobre el caso o sobre cómo analizar las alternativas; puedo explicarte por qué una alternativa es plausible o no plausible, sin revelarte la clave."*
   - Ubicado fijamente en el paso 4; **no se duplica** en el hilo de conversación inferior.
5. **Campo de consulta y botón de envío integrados**:
   - Contenedor unificado (`.tutor-input-container`) con borde sutil, foco visible y fondo integrado.
   - Campo de texto (`input#tutor-gcm-message` o `textarea`) con placeholder contextual:
     - Previo a responder (guiado): *"Consulta al Tutor GCM (sin revelar la clave)..."*
     - Previo a responder (simulación): *"Tutor deshabilitado en simulación previa..."*
     - Posterior a responder: *"¿Tienes una objeción o duda sobre la norma? Escribe aquí..."*
   - Botón de envío integrado (`button[data-testid="tutor-gcm-submit"]`) con flecha direccional `→` o spinner de carga animado.
6. **Chips de preguntas sugeridas disponibles**:
   - Encabezado `💡 SUGERENCIAS DE RAZONAMIENTO`.
   - Lista de sugerencias tácticas que sigan disponibles dentro del intento actual.
7. **Conversación creciente bajo los controles**:
   - El espacio disponible crece progresivamente bajo los controles a medida que el usuario realiza consultas.
   - Mensajes del usuario: burbuja alineada a la derecha con fondo oscuro `#153f32` y texto blanco.
   - Respuestas del Tutor: tarjeta estructurada a la izquierda con remitente `Tutor AI GCM 🤖`, hora y texto pedagógico.
   - Desplazamiento suave automático (`behavior: "smooth"`) sin saltos bruscos.
8. **Pie del panel**:
   - Nota sutil: `Protección anticopia de clave activada` y `Tutor GCM vNext`.

---

## 3. Ciclo de Vida de Chips de Razonamiento

Las sugerencias pedagógicas siguen un ciclo de vida granular y no destructivo:

| Evento | Comportamiento del Chip |
|---|---|
| **Inicio de ítem/intento (`mode=guided`)** | Se presentan las 3 sugerencias tácticas iniciales:<br>1. *¿Cuál es mi rol y competencia aquí?*<br>2. *¿Cuál es la tarea evaluativa real?*<br>3. *¿Qué trampa esconden los distractores?* |
| **Envío de consulta mediante un chip** | Se retira **únicamente** el chip pulsado. Los 2 chips restantes permanecen visibles e interactivos. |
| **Envío de consulta mediante un segundo chip** | Se retira el segundo chip pulsado. El chip restante permanece disponible. |
| **Consulta libre escrita en el campo de texto** | **No afecta** a los chips restantes; todos los chips activos se conservan. |
| **Fallo en el envío (error de red o API)** | Si la llamada no completa la interacción, el chip se restablece automáticamente en la lista para permitir reintento. |
| **Cambio de estilo o re-renderizado** | Los chips consumidos se mantienen consumidos dentro del mismo intento (`attemptId`). |
| **Respuesta confirmada al reactivo** | Se ocultan todos los chips (fase post-respuesta). |
| **Nuevo ítem / siguiente pregunta** | Al cambiar `currentItemId` o `attemptId`, se restablecen completamente las 3 sugerencias. |
| **Modo Simulación (`mode=simulation`)** | Chips deshabilitados/ocultos antes de responder según reglas pedagógicas. |

---

## 4. Perfiles del Tutor y Sincronización

- **Perfiles autorizados**:
  - `socratic` (Socrático - S): Guía mayéutica y preguntas reflexivas sin revelar alternativas correctas.
  - `direct` (Directo - D): Criterios normativos y metodológicos estructurados.
  - `brief` (Breve - B): Viñetas sintéticas y orientación condensada (máximo 80 palabras).
  - *Nota*: No existe ni se autoriza el perfil "Balanceado".
- **Sincronización Perfil → Práctica**:
  - El usuario configura su preferencia predeterminada en Onboarding o Configuración de Perfil.
  - Al iniciar sesión de práctica, se hereda la preferencia del perfil.
  - Durante la práctica, el aprendiz puede cambiar temporalmente el estilo mediante el selector compacto sin alterar su preferencia global en base de datos.

---

## 5. Responsividad y Accesibilidad (PC y Móvil)

### PC (Desktop - 1440 × 900)
- Convivencia a 2 columnas: Columna izquierda con reactivo y opciones; columna derecha con panel Tutor.
- Altura acotada (`max-height: 820px`), sin barras de desplazamiento dobles anidadas innecesarias.
- Ancho flexible (`min-width: 0`).

### Móvil (Viewports 390 × 844 y 360 × 800)
- Layout a 1 columna para el reactivo con barra de acciones fija inferior (`.mobile-practice-actions`).
- Botón disparador `🤖 Tutor AI` abre la hoja modal inferior (`.tutor-zone.open`).
- Atrapamiento accesible de foco (`Tab`, `Shift+Tab`) con botón de cierre visible `Cerrar`.
- Cierre mediante tecla `Escape` con devolución automática de foco al disparador.
- Sin desbordamiento horizontal (`overflow-x: hidden`), tipografías legibles y controles táctiles de al menos `44px` de área de pulsación efectiva.

---

## 6. Estado de Contratos y Verificación

### Backend y Base de Datos (Preservados sin cambios)
- `practice_attempts`: Ownership por `profile_id`, RLS intacto.
- Endpoint `/api/tutor/turn`: Validación de esquema con Zod, sanitización de historial efímero (máximo 3 intercambios), autoridad del servidor intacta.
- Idempotencia: Bloqueo de turnos duplicados y protección contra respuestas tardías que lleguen al ítem siguiente.
- Banco de preguntas V4: 0 modificaciones directas, no se tocan esquemas remotos.

### Pendientes de Producción (Excluidos de alcance local)
Los siguientes elementos corresponden a despliegue y validación en infraestructura remota:
1. **Dominio canónico y SHA servido**: Verificación de sincronización `/login` con el último commit desplegado en VPS/Cloudflare.
2. **Esquema y migraciones remotas**: Confirmación de catálogo y tablas en Supabase de producción.
3. **Smoke autenticado remoto**: Prueba con OAuth Google y credenciales reales en `ganaconmerito.com`.
4. **Plan de rollback operativo**: Procedimiento de reversión rápida mediante tags de imagen Docker.
