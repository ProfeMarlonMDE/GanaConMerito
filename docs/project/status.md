# Estado del proyecto

## Ya implementado

### Base de datos
- migración inicial: `supabase/migrations/0001_init_mvp.sql`
- remediación R3 en `supabase/migrations/0002_remediation_r3.sql`
- corrección de función atómica en `supabase/migrations/0003_fix_upsert_content_item_return.sql`
- seed mínimo funcional: `supabase/seed.sql`
- proyecto remoto Supabase enlazado y migración aplicada
- seed remoto aplicado con éxito

### Dominio y tipos
- contratos TS base en `src/types/`
- máquina de estados MVP en `src/domain/orchestrator/session-machine.ts`
- scoring heurístico base en `src/domain/evaluation/score-response.ts`
- validador inicial de opciones en `src/domain/content/validate-item.ts`
- parser Markdown real en `src/domain/content/parse-md.ts`
- selector base de ítems en `src/domain/item-selection/select-next-item.ts`
- importador de contenido desde archivo en `src/domain/content/import-from-file.ts`
- actualización básica de estadísticas en `src/domain/session/update-topic-stats.ts`
- validación runtime con Zod en endpoints críticos
- cálculo real de resumen en dashboard (`src/lib/dashboard/summary.ts`)

### Backend HTTP
- callback auth endurecido en `src/app/api/auth/callback/route.ts`
- validación real de contenido en `src/app/api/content/validate/route.ts`
- carga persistente de contenido en `src/app/api/content/upload/route.ts`
- inicio real de sesión en `src/app/api/session/start/route.ts`
- avance real de sesión en `src/app/api/session/advance/route.ts`
- endpoint para cargar ítem de sesión en `src/app/api/session/item/route.ts`
- dashboard real en `src/app/api/dashboard/summary/route.ts`
- endpoint real de onboarding en `src/app/api/profile/onboarding/route.ts`

### Supabase en proyecto
- variables de entorno locales configuradas
- cliente browser Supabase listo
- cliente server Supabase listo
- cliente admin puro compartido entre backend y scripts
- helper `signInWithGoogle` creado
- helper `signOut` creado
- bootstrap automático/reparador de `profiles`
- bootstrap reparador de `learning_profiles`
- RA1 aplicado: ownership explícito en rutas de sesión y RPC atómica `advance_session_atomic(...)`

### Flujo auth visible
- página real de login en `src/app/login/page.tsx`
- botón Google real en `src/components/auth/google-sign-in-button.tsx`
- home protegida en `src/app/home/page.tsx`
- botón de cierre de sesión en `src/components/auth/sign-out-button.tsx`
- middleware SSR/cookies ajustado y protección básica ampliada en `src/middleware.ts`

### Frontend mínimo de producto
- `src/app/onboarding/page.tsx`
- `src/app/practice/page.tsx`
- `src/app/dashboard/page.tsx`
- `src/app/layout.tsx`
- formulario real para iniciar práctica en `src/components/practice/start-practice-form.tsx`
- sesión de práctica real en `src/components/practice/practice-session.tsx`
- formulario real de onboarding en `src/components/onboarding/onboarding-form.tsx`
- dashboard con desglose real por tema y métricas derivadas
- onboarding endurecido al dominio realmente soportado por DB (`docente`)
- semántica actual de evaluación declarada como `deterministic`

### Banco de preguntas operativo
- corpus curado operativo de `27` preguntas nuevas en `content/items`
- banco activo remoto depurado para que solo esas `27` queden disponibles para runtime/práctica
- preguntas defectuosas y legacy retiradas del repo, validadores, reportes y BD remota
- vista y validación del banco activo alineadas al corpus curado vigente
- script de importación de contenido: `scripts/import-content.ts`
- persistencia atómica vía RPC SQL para `item_bank` + `item_options`

## Plan de remediación
- plan maestro: `docs/project/remediation/plan.md`
- fase R1: `docs/project/remediation/r1-security-auth.md`
- fase R2: `docs/project/remediation/r2-sessions.md`
- fase R3: `docs/project/remediation/r3-db-content.md`
- fase R4: `docs/project/remediation/r4-runtime-product.md`

## Ya versionado

- `v0.1.0` — esquema y seed iniciales
- `v0.2.0` — scaffold backend tipado
- `v0.2.1` — documentación de arquitectura organizada
- `v0.2.2` — inicialización local de Supabase
- `v0.2.3` — seed remoto funcional
- `v0.2.4` — integración real de Supabase y preparación de Google Auth
- `v0.2.5` — bootstrap de perfiles tras callback Google
- `v0.2.6` — hardening de auth
- `v0.2.7` — UI base de login y ruta protegida
- `v0.2.8` — sign out y ampliación de rutas protegidas
- `v0.2.9` — plantillas canónicas de contenido Markdown
- `v0.3.0` — parser Markdown y carga persistente de contenido
- `v0.3.1` — importación real de contenido y flujo de sesiones con DB
- `v0.3.2` — cierre de Fase R1 seguridad/auth crítica
- `v0.3.3` — cierre de Fase R2 núcleo de sesiones
- `v0.3.4` — cierre de Fase R3 DB y contenido
- `v0.3.5` — cierre de Fase R4 robustez de API y producto
- `v0.3.6` — dashboard real base y práctica base
- `v0.3.7` — práctica real con interacción de respuesta
- `v0.3.8` — onboarding real conectado a learning_profiles
- `v0.3.9` — práctica con razonamiento textual y feedback más rico

## Próximo trabajo recomendado

1. ejecutar una E2E autenticada real de práctica con evidencia de `5` turnos sobre el banco curado de `27` preguntas
2. decidir y endurecer la validación de onboarding si `Áreas activas` no debe permitirse vacío
3. corregir trazabilidad de despliegue para eliminar `Build: unknown` / `Commit desplegado: unknown`
4. consolidar validación pública postdeploy con evidencia repetible
5. revisar si la estrategia actual del selector de práctica debe priorizar continuidad por competencia o cobertura por área

## Remediación de auditoría en curso

### RA1 — Seguridad e integridad de sesión
- guards de ownership/autenticación añadidos a rutas de sesión
- `session/item` ahora exige `sessionId`
- `session/advance` ya delega persistencia a la RPC `public.advance_session_atomic(...)`
- migración remota `0004_atomic_session_advance.sql` aplicada con éxito
- validación funcional remota mínima ya confirmada con login real, sesión real y persistencia operativa básica

### RA2 — Semántica de flujo y contratos
- onboarding alineado con restricciones reales de DB
- `evaluationSource` corregido a `deterministic`
- máquina de estados reconciliada con reglas mínimas reales del MVP
- build local validada con éxito

### RA3 — Honestidad funcional y cierre de trazabilidad
- práctica con estados borde más explícitos
- límite de práctica ajustado de `3` a `5` turnos para pruebas funcionales de app
- `package.json` reconciliado con versión publicada
- `supabase/.gitignore` añadido para ignorar `.temp/`

## Documentos relevantes

- `docs/architecture/overview.md`
- `docs/architecture/decisions.md`
- `docs/api/contracts.md`
- `docs/project/google-auth-setup.md`
- `docs/project/auth-hardening-audit.md`
- `docs/project/tooling-stack.md`
- `docs/project/remediation/plan.md`

## Observación importante

El plan de remediación ya quedó cerrado. El proyecto ya cuenta con evidencia de E2E autenticada mínima real en entorno desplegado: login Google, onboarding, práctica y dashboard funcionando con persistencia observable. Además, el banco de preguntas quedó consolidado en un único corpus operativo de `27` preguntas nuevas consumibles por runtime. La etapa dominante deja de ser “cerrar si existe flujo real” y pasa a ser “endurecer calidad operativa, trazabilidad de despliegue y continuidad del producto”.

## Cierre de remediación de dominios y workspaces

Quedó consolidada la separación operativa vigente:
- `master` y `/home/ubuntu/.openclaw/product` = dominio canónico de producto
- `openclaw-workspace` y `/home/ubuntu/.openclaw/workspace` = dominio de agencia, memoria, prompts y operación

También quedó ajustado lo siguiente:
- documentación normativa y de workflow alineada a esa separación
- documentación operativa del question pipeline apuntando al corpus canónico de producto
- `supabase/config.toml` normalizado a `project_id = "gcm-product"`
- residuos menores saneados en workspace sin afectar trazabilidad

Pendiente residual no bloqueante:
- decidir el destino del worktree `/home/ubuntu/.openclaw/workspace-product-048-fix` para cerrar la última ambigüedad topológica

## Referencia de versionado operativo vigente
- App declarada: `0.4.8`
- Rama operativa canónica: `master`
- Último cierre técnico validado en repo: limpieza del banco + práctica a `5` turnos + build verde

Mientras no se haga un release formal nuevo, esta es la forma correcta de reportar el estado real para seguir desarrollo sin ambigüedad.
