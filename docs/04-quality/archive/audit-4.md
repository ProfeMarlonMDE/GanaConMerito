Haz esto **en el VPS** y no te salgas del orden. Aquí sí toca ser estrictos.

# Objetivo
Remediar el cierre de Sprint 4 para que quede **operativamente válido**, **documentalmente trazable** y **sin drift** entre fuente, deploy y runtime.

---

# 1. Carpeta fuente que debes tratar como verdad
## Fuente canónica de producto
```bash
/home/ubuntu/.openclaw/product
```

Aquí debe vivir el estado correcto del código y de la documentación antes de considerar cualquier cierre limpio.

---

# 2. Carpeta de deploy que debes auditar y alinear
## Árbol de deploy en VPS
```bash
/opt/gcm/app
```

Esta carpeta **no es la fuente principal de desarrollo**.
Solo debe quedar alineada con la fuente canónica.

---

# 3. Archivo de entorno persistente que no debes romper
## Entorno real de deploy
```bash
/opt/gcm/env/gcm-app.env
```

Esto es crítico.
**No vuelvas a depender de**:
```bash
/opt/gcm/app/.env.production
```
Ese patrón ya quedó superado porque `git clean -fdx` puede romper el deploy.

---

# 4. Rutas exactas que debes modificar/remediar en la fuente canónica

## Documentación obligatoria a corregir
Estas son las rutas más importantes que **sí o sí** debes ajustar:

```bash
/home/ubuntu/.openclaw/product/docs/project/status.md
/home/ubuntu/.openclaw/product/docs/02-delivery/sprint-log.md
/home/ubuntu/.openclaw/product/docs/02-delivery/change-log.md
/home/ubuntu/.openclaw/product/docs/01-product/backlog.md
```

### Qué debe quedar explícito ahí
- que **Sprint 4 sí existió**
- que el foco fue **productización del core**
- que se tocaron:
  - navegación
  - home
  - práctica
  - estados loading/empty/error
  - polish móvil
- que **Tutor GCM no se implementó**
- que **editorial/biblioteca salió de la navegación principal del usuario**
- que el sprint **no reabrió** banco de preguntas ni editorial como frente activo
- que el estado de release/deploy quedó pendiente de validación final si aún no has verificado runtime visible

---

# 5. Rutas exactas del código que debes revisar en VPS/fuente
Estas son las superficies reales del sprint que debes confirmar visual y técnicamente:

```bash
/home/ubuntu/.openclaw/product/package.json
/home/ubuntu/.openclaw/product/src/components/navigation/app-nav.tsx
/home/ubuntu/.openclaw/product/src/app/(authenticated)/home/page.tsx
/home/ubuntu/.openclaw/product/src/app/(authenticated)/practice/page.tsx
/home/ubuntu/.openclaw/product/src/components/practice/practice-session.tsx
/home/ubuntu/.openclaw/product/src/components/ui/loading-state.tsx
/home/ubuntu/.openclaw/product/src/components/ui/empty-state.tsx
/home/ubuntu/.openclaw/product/src/components/ui/error-state.tsx
/home/ubuntu/.openclaw/product/src/app/globals.css
```

### Qué debes confirmar ahí
- `package.json` en `0.5.0`
- nav principal solo con:
  - Inicio
  - Práctica
  - Métricas
- editorial fuera de navegación principal
- estados `LoadingState`, `EmptyState`, `ErrorState` presentes y usados
- práctica endurecida visualmente
- home orientado a continuidad
- sin implementación funcional de Tutor GCM

---

# 6. Qué debes revisar en deploy VPS
En el árbol desplegado debes confirmar que coincida con la fuente:

```bash
/opt/gcm/app/package.json
/opt/gcm/app/src/components/navigation/app-nav.tsx
/opt/gcm/app/src/app/(authenticated)/home/page.tsx
/opt/gcm/app/src/app/(authenticated)/practice/page.tsx
/opt/gcm/app/src/components/practice/practice-session.tsx
/opt/gcm/app/src/components/ui/loading-state.tsx
/opt/gcm/app/src/components/ui/empty-state.tsx
/opt/gcm/app/src/components/ui/error-state.tsx
/opt/gcm/app/src/app/globals.css
```

### Enfático:
Si `~/.openclaw/product` y `/opt/gcm/app` no coinciden, **no declares cierre**.

---

# 7. Qué debes hacer exactamente
## Paso 1 — corregir la fuente canónica
Trabaja primero en:
```bash
/home/ubuntu/.openclaw/product
```

### Debes:
- actualizar docs
- confirmar versión
- confirmar archivos del sprint
- commitear cualquier remediación documental faltante

---

## Paso 2 — alinear deploy
Solo después de corregir la fuente:

alinear:
```bash
/opt/gcm/app
```
con lo que ya quedó correcto en:
```bash
/home/ubuntu/.openclaw/product
```

**No edites `/opt/gcm/app` como si fuera la fuente original.**

---

## Paso 3 — reconstruir runtime
Debes levantar el runtime desde el árbol correcto y con el env correcto:

- código desde `/opt/gcm/app`
- variables desde `/opt/gcm/env/gcm-app.env`

---

## Paso 4 — validar runtime visible
Tienes que comprobar que el runtime visible refleje:
- commit correcto
- buildTime correcto
- navegación correcta
- editorial fuera del flujo principal del usuario

---

# 8. Qué no debes hacer
## Prohibido
- no usar `/opt/gcm/app` como fuente principal de edición
- no reabrir editorial como módulo activo
- no tocar migraciones Supabase en esta remediación
- no meter Tutor GCM funcional
- no mezclar esta remediación con features nuevas
- no declarar “quedó listo” solo porque GitHub está al día
- no confiar solo en `git status`
- no depender de `.env.production` dentro de `/opt/gcm/app`

---

# 9. Criterio exacto de remediación exitosa
Esto solo queda bien si se cumple todo:

1. `~/.openclaw/product` correcto
2. docs canónicas corregidas
3. `/opt/gcm/app` alineado con esa fuente
4. runtime levantado con `/opt/gcm/env/gcm-app.env`
5. runtime visible refleja el commit correcto
6. navegación principal sin editorial
7. build pasa
8. smoke/E2E pasan con servidor realmente arriba

---

# 10. Mi instrucción más importante
**Primero remedia documentación en la fuente canónica.
Después alinea deploy.
Después valida runtime.
No al revés.**

Si quieres, te hago en el siguiente mensaje un **checklist operativo de VPS paso a paso**, con formato de ejecución tipo:
- carpeta
- acción
- resultado esperado
- criterio de fallo

para que lo sigas sin pensar.