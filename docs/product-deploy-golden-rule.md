# Regla de Oro — Código, GitHub y Deploy de GanaConMerito

## Decisión oficial

### 1) `~/.openclaw/product` es la fuente de verdad para desarrollo
- Aquí se construye y modifica el código de la aplicación.
- Aquí se ejecutan pruebas, QA y validaciones previas a integración.
- Este es el árbol que debe considerarse **canónico para trabajo de producto**.

### 2) GitHub se alimenta desde `~/.openclaw/product`
- Todo cambio de aplicación que vaya al repositorio oficial debe salir desde este árbol.
- Flujo oficial:
  1. editar en `~/.openclaw/product`
  2. validar
  3. commit
  4. push a GitHub

### 3) `/opt/gcm/app` es solo entorno de deploy
- `/opt/gcm/app` **no es fuente de verdad de desarrollo**.
- `/opt/gcm/app` existe para ejecutar la app desplegada en VPS.
- No se debe usar como árbol manual de edición cotidiana.
- No se debe considerar referencia principal para saber “qué código va”.

### 4) El deploy debe reconstruir `/opt/gcm/app` desde Git
- El contenido de `/opt/gcm/app` debe provenir del repo oficial.
- Regla operativa:
  - push desde `~/.openclaw/product`
  - luego redeploy
  - el redeploy actualiza/reconstruye `/opt/gcm/app`
- Queda prohibido tratar `/opt/gcm/app` como rama paralela de trabajo.

### 5) Prohibición explícita
- No editar en paralelo `~/.openclaw/product` y `/opt/gcm/app`.
- No hacer fixes “solo en VPS” que no queden en GitHub.
- No usar `/opt/gcm/app` como lugar principal de commit/push.

## Frase corta de operación

**`~/.openclaw/product` = desarrollo y GitHub**  
**`/opt/gcm/app` = deploy reconstruido desde Git**

## Interpretación práctica

Si hay diferencia entre ambos árboles:
- se asume correcto `~/.openclaw/product` si ya fue validado y empujado a GitHub
- `/opt/gcm/app` debe volver a generarse/sincronizarse desde ese estado
- nunca al revés, salvo incidente explícito de recuperación

## Excepción controlada

Solo en incidentes de producción se permite inspección temporal en `/opt/gcm/app`.
Aun así:
- el fix definitivo debe regresar a `~/.openclaw/product`
- debe quedar committeado
- debe empujarse a GitHub
- luego debe redeployarse

## Motivo de esta regla

Esta regla existe para evitar:
- bifurcación de código
- confusión sobre cuál árbol manda
- deploys no auditables
- hotfixes perdidos
- desalineación entre QA, GitHub y producción
