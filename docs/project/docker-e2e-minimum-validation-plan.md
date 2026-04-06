# Docker + E2E Minimum Validation Plan — GanaConMerito

## Propósito

Definir la secuencia mínima, realista y verificable para validar:
1. que el artefacto Docker de la app es construible,
2. que el runtime levantado corresponde al repo actual,
3. y que el flujo principal autenticado puede ejecutarse de extremo a extremo.

Este plan no busca observabilidad enterprise ni cobertura exhaustiva.
Busca cerrar la verdad operativa mínima.

---

## Objetivo de validación

Cerrar estas tres preguntas:
- ¿el contenedor de la app realmente builda con el código actual?
- ¿el contenedor levantado corresponde a ese build?
- ¿el flujo principal `login -> onboarding -> practice -> dashboard` funciona de verdad?

---

## Precondiciones

Antes de ejecutar este plan, confirmar:
- acceso al daemon Docker en el host
- `docker compose` funcional sobre `/opt/gcm/docker-compose.yml`
- variables de entorno presentes en `/opt/gcm/app/.env.production`
- proveedor de auth real habilitado si la prueba será con Google
- un usuario real de prueba o ruta controlada para primer login

---

## Fase 1 — Validación Docker mínima

### Paso 1. Confirmar configuración efectiva

```bash
docker compose -f /opt/gcm/docker-compose.yml config >/tmp/gcm-compose.resolved.yml
```

Verificar manualmente:
- servicio `gcm-app` presente
- `build.context = /opt/gcm/app`
- `dockerfile = Dockerfile`
- puerto `127.0.0.1:3000:3000`

### Paso 2. Construir imagen

```bash
APP_COMMIT=$(git -C /opt/gcm/app rev-parse --short HEAD)
docker compose -f /opt/gcm/docker-compose.yml build --build-arg APP_COMMIT=$APP_COMMIT gcm-app
```

Criterio de éxito:
- build termina sin error
- `npm run build` dentro de imagen completa con éxito

### Paso 3. Levantar runtime

```bash
docker compose -f /opt/gcm/docker-compose.yml up -d gcm-app
```

### Paso 3.1. Verificar trazabilidad visible de despliegue

Confirmar que login/layout ya no muestran `unknown` como commit/build desplegado.

### Paso 4. Confirmar contenedor arriba

```bash
docker compose -f /opt/gcm/docker-compose.yml ps
docker logs --tail=200 gcm-app
```

Criterio de éxito:
- contenedor `Up`
- sin crash loop
- sin error fatal de variables, build o arranque

### Paso 5. Smoke HTTP mínimo

```bash
curl -I http://127.0.0.1:3000/login
curl -I http://127.0.0.1:3000/home
curl -I http://127.0.0.1:3000/onboarding
curl -I http://127.0.0.1:3000/practice
curl -I http://127.0.0.1:3000/dashboard
```

Criterio de éxito mínimo esperado:
- `/login` responde `200`
- rutas privadas redirigen o protegen consistentemente si no hay sesión

---

## Fase 2 — E2E autenticada mínima real

## Flujo bajo prueba
`login -> onboarding -> practice -> dashboard`

### Evidencia obligatoria a capturar
- video o capturas del flujo
- URL/ruta final por etapa
- primer error visible si aparece
- evidencia de sesión creada
- evidencia de primera escritura/lectura útil post-login

### Paso 1. Login real
Validar:
- el usuario inicia auth correctamente
- vuelve al callback sin error fatal
- aterriza en la ruta esperada

Capturar:
- ruta final
- mensaje visible
- si existen `profiles` y `learning_profiles` tras login

### Paso 2. Onboarding real
Validar:
- el formulario carga
- acepta solo el dominio realmente soportado
- persiste el onboarding
- la transición siguiente es coherente

Capturar:
- datos enviados
- resultado visible
- evidencia de persistencia

### Paso 3. Practice real
Validar:
- se crea sesión
- se obtiene ítem inicial
- se responde al menos un turno
- `session/advance` persiste sin ambigüedad

Capturar:
- `sessionId`
- `currentState` antes y después
- feedback visible
- evidencia de `session_turns` / `evaluation_events` / `user_topic_stats` si aplica

### Paso 4. Dashboard real
Validar:
- carga sin error
- refleja datos compatibles con la interacción previa
- no depende de stubs viejos o placeholders engañosos

Capturar:
- métricas visibles
- coherencia con la práctica realizada

---

## Criterios de cierre

La validación mínima se considera cerrada solo si queda evidencia de que:
1. el build Docker terminó bien
2. el contenedor arrancó sin error fatal
3. login real funcionó
4. onboarding real persistió
5. practice real generó sesión y al menos un avance válido
6. dashboard respondió con datos coherentes

---

## Si falla, cómo reportarlo

No reportar solo “falló login” o “falló Docker”.
Separar el fallo así:

### Falla de Docker
- build
- arranque
- variables
- crash loop

### Falla de auth
- redirección
- callback
- bootstrap de perfil
- sesión creada o no

### Falla de onboarding
- UI
- validación
- persistencia
- transición

### Falla de practice
- creación de sesión
- ítem inicial
- avance
- persistencia

### Falla de dashboard
- carga
- cálculo
- inconsistencia de datos

---

## Siguiente uso documental

Cuando este plan se ejecute, debe actualizar:
- `docs/project/e2e-status.md`
- `docs/project/status.md`
- `docs/project/runtime-maturity-assessment.md`

Y si hay hallazgos estructurales:
- `docs/api/contracts.md`
- `docs/architecture/decisions.md`
- documentos de remediación aplicables

---

## Regla final

No declarar producción temprana por tener Dockerfile, compose o rutas montadas.
Solo subir la lectura de madurez cuando exista evidencia real del flujo autenticado completo sobre el runtime validado.
