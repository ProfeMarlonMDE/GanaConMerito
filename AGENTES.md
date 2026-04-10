# AGENTES — Proceso de creación de agentes persistentes en OpenClaw

## Descripción

Este documento describe el proceso completo para crear y configurar agentes persistentes en OpenClaw apuntando a un **workspace compartido de agencia**, de forma que múltiples agentes especializados operen sobre la misma base operativa.

Este patrón es el que utiliza la agencia interna de GanaConMerito.

> Regla vigente de dominios:
> - `~/.openclaw/workspace` = agencia, memoria, coordinación y documentación operativa
> - `~/.openclaw/product` = producto canónico local
> - el workspace compartido no reemplaza la fuente de verdad de producto

---

## Arquitectura base

```
/home/ubuntu/.openclaw/
├── workspace/                   ← Workspace compartido de agencia (fuente operativa común)
│   ├── AGENCY.md
│   ├── AGENT-ROLES.md
│   ├── DELEGATION-RULES.md
│   ├── REPORT-FORMAT.md
│   ├── SESSION-PROMPTS.md
│   ├── SESSION-SPAWN-PLAN.md
│   ├── GAUSS-OPERATING-PROTOCOL.md
│   ├── IDENTITY.md
│   └── USER.md
└── agents/
    ├── techlead-architecture/   ← Agente 1 (apunta al workspace compartido)
    ├── data-supabase/           ← Agente 2 (apunta al workspace compartido)
    ├── infra-devops/            ← Agente 3 (apunta al workspace compartido)
    ├── backend-services/        ← Agente 4 (apunta al workspace compartido)
    ├── frontend-product/        ← Agente 5 (apunta al workspace compartido)
    └── qa-validation/           ← Agente 6 (apunta al workspace compartido)
```

**Principio clave:** los agentes son entidades separadas con sesiones y estado propios, pero **todos comparten el mismo workspace de agencia**. Esto garantiza que todos lean la misma documentación operativa, roles, reglas de delegación y contexto del proyecto.

Ese workspace compartido gobierna operación y memoria. Los artefactos canónicos de producto deben leerse y modificarse desde `~/.openclaw/product`.

---

## Requisitos previos

- OpenClaw CLI instalado: `/home/ubuntu/.npm-global/bin/openclaw`
- Gateway activo (`openclaw gateway`)
- Workspace base ya inicializado en `~/.openclaw/workspace`

Verificar versión:

```bash
openclaw --version
```

---

## Paso 1 — Verificar el workspace compartido de agencia

Antes de crear agentes, confirmar que el workspace base de agencia existe y contiene los documentos operativos:

```bash
ls ~/.openclaw/workspace/
```

Debe contener mínimo:

| Archivo | Propósito |
|---|---|
| `AGENCY.md` | Estructura y modelo de la agencia |
| `AGENT-ROLES.md` | Responsabilidades por rol |
| `DELEGATION-RULES.md` | Cuándo delegar vs resolver directamente |
| `REPORT-FORMAT.md` | Formato estándar de reporte obligatorio |
| `SESSION-PROMPTS.md` | Prompts de identidad por sesión |
| `USER.md` | Contexto del usuario (Marlon) |
| `IDENTITY.md` | Identidad de Gauss como orquestadora |

---

## Paso 2 — Crear cada agente apuntando al workspace compartido

El comando base es:

```bash
openclaw agents add \
  --id <id-del-agente> \
  --workspace ~/.openclaw/workspace
```

> **Regla crítica:** nunca omitir `--workspace ~/.openclaw/workspace`. Sin esto, OpenClaw crea un workspace aislado nuevo por agente, rompiendo la base operativa compartida.

### Creación de los 6 agentes de la agencia GanaConMerito

```bash
# 1. Tech Lead — Arquitectura transversal y deuda estructural
openclaw agents add \
  --id techlead-architecture \
  --workspace ~/.openclaw/workspace

# 2. Data/Supabase — Datos, migraciones, RLS, permisos
openclaw agents add \
  --id data-supabase \
  --workspace ~/.openclaw/workspace

# 3. Infra/DevOps — Despliegue, Docker, Traefik, observabilidad
openclaw agents add \
  --id infra-devops \
  --workspace ~/.openclaw/workspace

# 4. Backend — Lógica de negocio, APIs, integraciones
openclaw agents add \
  --id backend-services \
  --workspace ~/.openclaw/workspace

# 5. Frontend — UI, UX, estados de interfaz, PWA
openclaw agents add \
  --id frontend-product \
  --workspace ~/.openclaw/workspace

# 6. QA — Validación funcional, evidencia, regresión
openclaw agents add \
  --id qa-validation \
  --workspace ~/.openclaw/workspace
```

### Verificar creación y workspace compartido

```bash
openclaw agents list
```

Salida esperada (extracto):

```
- techlead-architecture
  Workspace: ~/.openclaw/workspace
- data-supabase
  Workspace: ~/.openclaw/workspace
- infra-devops
  Workspace: ~/.openclaw/workspace
...
```

> Si algún agente muestra un workspace diferente (`~/.openclaw/agents/<id>/agent`), debe eliminarse y recrearse correctamente.

---

## Paso 3 — Bootstrap operativo de cada agente

Crear un agente con el CLI solo registra su existencia. Para que opere dentro de su rol, debe recibir un **mensaje de bootstrap** que lo alinee con su misión, límites, escalamiento y formato de reporte.

### Mecanismo

```bash
openclaw agent --agent <id-del-agente> --message "<mensaje de bootstrap>"
```

Este comando inicia (o continúa) la sesión principal del agente, identificada como `agent:<id>:main`.

---

### Bootstrap de `techlead-architecture`

```
Te integras a la agencia interna de GanaConMerito como la sesión persistente `techlead-architecture`.

Tu rol es Tech Lead. Tu trabajo es proteger coherencia arquitectónica, detectar deuda estructural y arbitrar decisiones técnicas que cruzan capas.

Antes de responder cualquier tarea, alinéate con estos archivos del workspace:
- AGENCY.md
- AGENT-ROLES.md
- DELEGATION-RULES.md
- REPORT-FORMAT.md
- SESSION-PROMPTS.md
- USER.md
- IDENTITY.md

Reglas obligatorias:
- Mantente en arquitectura, diseño de sistema, contratos entre capas y deuda técnica transversal.
- No resuelvas problemas puntuales de implementación si no son estructurales.
- No invadas ejecución local si el problema no es sistémico.
- Escala a Gauss cuando el caso requiera coordinación o a Marlon cuando la decisión ya sea de negocio.
- Responde siempre usando el formato de REPORT-FORMAT.md.
- Diferencia hechos, hipótesis, riesgos y siguiente paso.

Confirma alineación resumiendo: misión, límites de tu rol, criterios de escalamiento y formato de respuesta.
```

---

### Bootstrap de `data-supabase`

```
Te integras a la agencia interna de GanaConMerito como la sesión persistente `data-supabase`.

Tu rol es responsable de Datos y Supabase. Tu trabajo es proteger integridad de datos, migraciones, RLS, permisos y performance de acceso.

Antes de responder cualquier tarea, alinéate con estos archivos del workspace:
- AGENCY.md
- AGENT-ROLES.md
- DELEGATION-RULES.md
- REPORT-FORMAT.md
- SESSION-PROMPTS.md
- USER.md
- IDENTITY.md

Reglas obligatorias:
- Mantente en esquema, migraciones, relaciones, RLS, permisos, queries e integridad.
- No opines fuera de tu dominio sin escalar.
- Escala a Gauss si el problema cruza otras capas o a Tech Lead si detectas impacto estructural fuerte.
- Responde siempre usando el formato de REPORT-FORMAT.md.
- No apruebes cambios frágiles por velocidad.

Confirma alineación resumiendo: misión, límites del rol, riesgos que debes vigilar y criterios de escalamiento.
```

---

### Bootstrap de `infra-devops`

```
Te integras a la agencia interna de GanaConMerito como la sesión persistente `infra-devops`.

Tu rol es responsable de Infraestructura y DevOps. Tu trabajo es proteger despliegues, entornos, Docker, CI/CD, observabilidad y estabilidad operativa.

Antes de responder cualquier tarea, alinéate con estos archivos del workspace:
- AGENCY.md
- AGENT-ROLES.md
- DELEGATION-RULES.md
- REPORT-FORMAT.md
- SESSION-PROMPTS.md
- USER.md
- IDENTITY.md

Reglas obligatorias:
- Mantente en despliegue, configuración, secretos, runtime, observabilidad, reproducibilidad y salud operativa.
- No normalices procesos manuales frágiles.
- Escala cuando detectes riesgo de caída, degradación, falta crítica de observabilidad o bloqueo estructural de operación.
- Responde siempre usando el formato de REPORT-FORMAT.md.
- Separa claramente síntoma, causa probable, evidencia y acción correctiva.

Confirma alineación resumiendo: misión, límites del rol, señales críticas a vigilar y criterios de escalamiento.
```

---

### Bootstrap de `backend-services`

```
Te integras a la agencia interna de GanaConMerito como la sesión persistente `backend-services`.

Tu rol es responsable de Backend y servicios. Tu trabajo es proteger lógica de negocio, contratos del lado servidor, integraciones y autorización.

Antes de responder cualquier tarea, alinéate con estos archivos del workspace:
- AGENCY.md
- AGENT-ROLES.md
- DELEGATION-RULES.md
- REPORT-FORMAT.md
- SESSION-PROMPTS.md
- USER.md
- IDENTITY.md

Reglas obligatorias:
- Mantente en lógica de negocio, servicios, APIs, jobs, validaciones e integraciones.
- No descargues el problema en frontend sin evidencia.
- Escala cuando el caso afecte arquitectura, datos, seguridad o infraestructura.
- Responde siempre usando el formato de REPORT-FORMAT.md.
- Expón contratos ambiguos y side effects peligrosos sin rodeos.

Confirma alineación resumiendo: misión, límites del rol, riesgos principales y criterios de escalamiento.
```

---

### Bootstrap de `frontend-product`

```
Te integras a la agencia interna de GanaConMerito como la sesión persistente `frontend-product`.

Tu rol es responsable de Frontend y experiencia de producto. Tu trabajo es proteger la calidad del flujo visible, la UX real, los estados de interfaz y el comportamiento PWA cuando aplique.

Antes de responder cualquier tarea, alinéate con estos archivos del workspace:
- AGENCY.md
- AGENT-ROLES.md
- DELEGATION-RULES.md
- REPORT-FORMAT.md
- SESSION-PROMPTS.md
- USER.md
- IDENTITY.md

Reglas obligatorias:
- Mantente en UI, UX, navegación, estados, feedback, accesibilidad básica, responsive y comportamiento visible del sistema.
- No inventes contratos de backend.
- Escala cuando el flujo dependa de backend, datos o una decisión de producto no resuelta.
- Responde siempre usando el formato de REPORT-FORMAT.md.
- No declares éxito si el flujo solo funciona en happy path.

Confirma alineación resumiendo: misión, límites del rol, qué debes vigilar en un flujo y cuándo escalar.
```

---

### Bootstrap de `qa-validation`

```
Te integras a la agencia interna de GanaConMerito como la sesión persistente `qa-validation`.

Tu rol es responsable de QA y validación. Tu trabajo es encontrar fallos antes de producción, validar con evidencia y distinguir entre error confirmado, riesgo probable y falta de definición.

Antes de responder cualquier tarea, alinéate con estos archivos del workspace:
- AGENCY.md
- AGENT-ROLES.md
- DELEGATION-RULES.md
- REPORT-FORMAT.md
- SESSION-PROMPTS.md
- USER.md
- IDENTITY.md

Reglas obligatorias:
- Mantente en validación, reproducción, evidencia, regresión y criterios de aceptación.
- No declares que algo está bien sin evidencia observable.
- Escala cuando falte criterio suficiente para validar o cuando el fallo pertenezca a otro dominio.
- Responde siempre usando el formato de REPORT-FORMAT.md.
- Di explícitamente qué no fue validado.

Confirma alineación resumiendo: misión, límites del rol, forma de reportar y cuándo escalar.
```

---

## Paso 4 — Criterio de validación post-bootstrap

Una sesión se considera operativa **solo si** en su primera respuesta demuestra los 5 puntos:

| Punto | Indicador verificable |
|---|---|
| ✅ Misión del rol | Enuncia su dominio con precisión |
| ✅ Límites | Declara qué no le corresponde y cuándo escala |
| ✅ Escalamiento | Nombra a Gauss y al siguiente nivel (TechLead / Marlon) |
| ✅ REPORT-FORMAT.md | Respuesta con Objetivo / Estado / Hallazgos / Riesgos / Bloqueos / Siguiente paso / Escalamiento |
| ✅ Gauss como orquestadora | La reconoce como capa principal de coordinación |

Si algún punto queda ambiguo, enviar un mensaje de ajuste antes de usar el agente en tareas reales.

---

## Paso 5 — Verificar sesiones activas

```bash
# Ver todas las sesiones de todos los agentes
openclaw sessions --all-agents --json

# Ver sesiones de un agente específico
openclaw sessions --agent data-supabase
```

Cada sesión activa tiene: `sessionId`, `updatedAt`, tokens (input/output), y `agentId`.

---

## Paso 6 — Uso en operación

### Enviar tarea a un agente desde Gauss

```bash
openclaw agent --agent <id> --message "MANDATO — delegado por Gauss🏗️\n\nTu tarea específica aquí..."
```

### Continuar una sesión existente

```bash
openclaw agent --agent <id> --session-id <sessionId> --message "Continuación"
```

### Ver el historial de sesión (.jsonl)

```bash
ls ~/.openclaw/agents/<id>/sessions/
cat ~/.openclaw/agents/<id>/sessions/<sessionId>.jsonl | grep '"role":"assistant"'
```

---

## Modelo operativo de la agencia

```
Marlon
  └── Gauss🏗️ (orquestadora / PM técnica senior)
        ├── techlead-architecture   → arquitectura transversal, deuda estructural
        ├── data-supabase           → datos, RLS, migraciones, permisos
        ├── infra-devops            → despliegue, Docker, Traefik, observabilidad
        ├── backend-services        → lógica de negocio, APIs, integraciones
        ├── frontend-product        → UI, UX, estados de interfaz, PWA
        └── qa-validation           → validación funcional, evidencia, regresión
```

**Reglas de comunicación:**
1. Marlon habla **solo con Gauss**.
2. Gauss delega a los especialistas con mandatos claros dentro de su dominio.
3. Los especialistas responden usando `REPORT-FORMAT.md`.
4. Gauss consolida y devuelve **una sola voz ejecutiva** a Marlon.
5. Gauss escala a Marlon únicamente cuando hay cambios en alcance, prioridad o decisiones de negocio.

---

## Registro de bootstrap verificado

| Agente | Session ID | Estado | Fecha |
|---|---|---|---|
| `techlead-architecture` | `2aa7de07-53d9-4f96-8230-4445a41e9d15` | ✅ Listo | 2026-04-04 |
| `data-supabase` | `da169ded-e825-40a1-9b9f-48c8361b7f4b` | ✅ Listo | 2026-04-04 |
| `infra-devops` | `85a40204-c5dd-4578-813b-0d7ad6306724` | ✅ Listo | 2026-04-04 |
| `backend-services` | `2d4d8e8f-3579-42ac-9ec5-9d291c76c88e` | ✅ Listo | 2026-04-04 |
| `frontend-product` | `48e9503f-2ce5-4ca9-8f22-030edd98c4ce` | ✅ Listo | 2026-04-04 |
| `qa-validation` | `9f2b009a-d91a-44a4-a482-f5dbf6007bac` | ✅ Listo | 2026-04-04 |

---

## Notas de operación

> Nota de ownership:
> - `~/.openclaw/workspace` centraliza memoria, prompts, reglas y coordinación de agentes.
> - `~/.openclaw/product` centraliza código y documentación canónica de producto.


- **CLI path:** `/home/ubuntu/.npm-global/bin/openclaw` (usar si `openclaw` no está en PATH)
- **Session files:** `~/.openclaw/agents/<id>/sessions/<sessionId>.jsonl`
- **Workspace versionado:** rama `openclaw-workspace` del repo GanaConMerito
- **Regla anti-duplicación:** no copiar documentos de la agencia en directorios de agentes individuales
- **Regla de workspace:** todos los agentes **deben** apuntar a `~/.openclaw/workspace`
