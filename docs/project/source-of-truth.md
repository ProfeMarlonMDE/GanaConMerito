# Source of Truth — GanaConMerito

## Objetivo
Definir con claridad cuál es la fuente de verdad en cada capa del proyecto para evitar pérdida de trabajo, divergencia entre entornos y despliegues confusos.

---

## 1. Fuente de verdad por categoría

### Arquitectura, decisiones y planes
**Fuente de verdad:**
- `docs/architecture/*`
- `docs/project/*`

### Código canónico
**Fuente de verdad deseada:**
- GitHub (`ProfeMarlonMDE/GanaConMerito`)

### Código temporal / laboratorio
**Fuente de verdad temporal:**
- `/home/node/.openclaw/workspace`

### Producción / despliegue operativo
**Fuente de verdad operativa:**
- `/var/www/cnsc`

### Estado del servidor real
**Fuente de verdad de infraestructura:**
- VPS real
- systemd
- nginx
- Supabase remota

---

## 2. Regla principal
Nada importante debe quedarse únicamente en:
- Telegram
- `/home/node/.openclaw/workspace`
- `/var/www/cnsc`

Todo cambio serio debe terminar en:
1. commit limpio
2. respaldo en GitHub
3. despliegue validado

---

## 3. Realidad actual del proyecto
Actualmente existen varios centros de trabajo:
- Telegram (dirección y coordinación)
- Google Antigravity / consola con acceso al VPS (ejecución)
- workspace OpenClaw (trabajo temporal)
- GitHub (respaldo/versionado)
- `/var/www/cnsc` en VPS (repo/productivo desplegado)

Esto obliga a mantener una disciplina explícita para no perder cambios.

---

## 4. Regla en caso de divergencia

### Si workspace y VPS difieren
- priorizar estabilizar producción
- documentar diferencia
- consolidar en repo canónico

### Si VPS tiene cambios que GitHub no tiene
- extraer cambios
- hacer commit limpio
- subir a GitHub lo antes posible

### Si GitHub difiere de producción
- identificar si producción está adelantada o atrasada
- nunca asumir que GitHub refleja producción sin verificar

---

## 5. Decisión estratégica
La meta operativa estable debe ser:
- **GitHub = repo canónico**
- **VPS = ejecución**
- **Telegram = dirección técnica**
- **workspace = temporal / laboratorio**

---

## 6. Regla práctica
Cada tarea debe responder estas preguntas:
- ¿Dónde se diseña?
- ¿Dónde se implementa?
- ¿Dónde se versiona?
- ¿Dónde se despliega?
- ¿Dónde se valida?

Si una tarea no puede responder eso, está desordenada.
