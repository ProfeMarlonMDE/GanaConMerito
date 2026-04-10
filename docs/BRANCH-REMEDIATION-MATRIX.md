# BRANCH REMEDIATION MATRIX

## Estado base
- Producto canónico: `origin/master`
- Agencia canónica: `origin/openclaw-workspace`
- Workspace local limpio en progreso: commit local `226d4ab`
- Producto limpio montado en: `/home/ubuntu/.openclaw/product`

## Bloque A — mover a producto (`master`)
Estos artefactos existían en `openclaw-workspace` y no existen hoy en `origin/master`. Deben migrarse al árbol de producto.

### Contenido canónico
- `content/items/_transform-report.md`
- `content/items/competencias_ciudadanas/*`
- `content/items/gestion/*`
- `content/items/lectura_critica/*`
- `content/items/matematicas/*`
- `content/items/normatividad/*`
- `content/items/pedagogia/*`

### Arquitectura y plan del banco
- `docs/question-bank-implementation-roadmap.md`
- `docs/question-bank-technical-architecture.md`
- `sql/question_bank_ingestion_schema.sql`

### Tracking editorial a decidir
- `docs/QUESTION-BANK-INDEX.md`
- `docs/QUESTION-BANK-PROCESS.md`
- `docs/question-bank-history/*`

## Bloque B — ya existe en producto (`master`)
No requiere migración inmediata, solo decisión de ownership y posible normalización.

- `docs/banco-preguntas/ciudadanas.md`
- `docs/banco-preguntas/gestion.md`
- `docs/banco-preguntas/lectura-critica.md`
- `docs/banco-preguntas/matematicas.md`
- `docs/banco-preguntas/normatividad.md`
- `docs/banco-preguntas/pedagogia.md`
- `docs/project/reference/README-banco-de-preguntas.md`
- `docs/project/reference/descripcion-del-corpus-de-preguntas.md`
- `docs/project/reference/ejemplos-modelo-de-preguntas.md`
- `docs/project/reference/plantillas-y-estructura-de-preguntas.md`
- `docs/project/reference/taxonomia-y-nomenclatura-del-banco-de-preguntas.md`

## Bloque C — quedarse en agencia (`openclaw-workspace`)
- `AGENTS.md`
- `AGENCY.md`
- `AGENT-ROLES.md`
- `AGENTES.md`
- `SESSION-*`
- `DELEGATION-RULES.md`
- `REPORT-FORMAT.md`
- `SOUL.md`
- `IDENTITY.md`
- `USER.md`
- `TOOLS.md`
- `MEMORY.md`
- `HEARTBEAT.md`
- `memory/*`
- `lotes-input/*`
- `docs/QUESTION-PIPELINE-CONTEXT.md`
- `docs/QUESTION-PIPELINE-SESSION-PROMPT.md`
- `docs/secret-rotation-checklist.md`
- `docs/supabase-secret-remediation.md`

## Criterio operativo
- Política canónica vigente:
  - producto en `master` y `/home/ubuntu/.openclaw/product`
  - agencia, memoria y operación en `openclaw-workspace` y `/home/ubuntu/.openclaw/workspace`
  - el workspace no es source of truth de producto
  - los documentos operativos deben referenciar los artefactos canónicos de producto cuando corresponda
- No empujar `226d4ab` hasta migrar primero Bloque A o decidir exclusiones.
- No usar `master` local como base.
- Trabajar producto solo desde `/home/ubuntu/.openclaw/product`.
- Una vez migrado Bloque A, entonces sí cerrar limpieza de `openclaw-workspace`.
