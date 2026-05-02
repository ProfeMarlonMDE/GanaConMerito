---
id: DEL-SPRINT-LOG
name: sprint-log
project: ganaconmerito
owner: marlon-arcila
status: active
artifact_type: delivery
modules: [core, platform]
tags: [sprint, entrega, seguimiento]
related:
  - PROD-BACKLOG
  - DEL-CHANGE-LOG
  - QUAL-RISK-REGISTER
last_reviewed: 2026-05-01
---

# Sprint log

## Sprint cerrado — Sprint 4: Productización del core
- **Estado**: CERRADO
- **Fecha**: 2026-05-02
- **Commit funcional**: `304f950`
- **Commit documental de cierre**: `ef13a4f`
- **Objetivo**: endurecer el core, mejorar UX móvil y retirar superficies no prioritarias del flujo principal.

### Comprometido
- navegación y continuidad entre pantallas
- estados `loading` / `empty` / `error`
- mobile polish y consistencia visual
- copy UX y jerarquía de acciones
- reducción de fricción en onboarding / práctica / dashboard
- QA hardening del core

### Entregado
- `AppNav` reducido a `Inicio / Práctica / Métricas`
- biblioteca/editorial fuera de la navegación principal del usuario
- componentes `LoadingState`, `EmptyState` y `ErrorState`
- mejoras de continuidad en `Home` y endurecimiento de flujo en `Practice`
- versión declarada `0.5.0`
- build validado y `test:dashboard` verde en fuente canónica
- validación de runtime/E2E reportada sobre VPS para el runtime funcional del sprint

### No alcance
- implementación funcional de `Tutor GCM`
- reapertura de editorial como producto de usuario final
- cambios de migraciones o schema de Supabase
- cambios estructurales nuevos de arquitectura fuera del hardening del sprint


## Sprint cerrado
- Nombre: Sprint 2 - Maduración operativa del producto
- Estado: CERRADO OPERATIVAMENTE
- Fecha de inicio: 2026-04-30
- Fecha de cierre efectiva: 2026-05-01
- Responsable humano: Marlon Arcila

## Objetivo del sprint cerrado
- Consolidar navegación/auth del core app, cerrar la verdad operativa entre producto/deploy/runtime, endurecer onboarding y dejar gobernanza inicial del componente de asistentes sin mezclar el frente editorial dentro del sprint.

## Outcome esperado del sprint cerrado
- flujo principal más coherente y verificable
- trazabilidad real de deploy/runtime
- QA postdeploy confiable
- decisión estructural inicial de asistentes formalizada
- reducción de drift documental/editorial

## Comprometido
1. consolidar navegación/auth y gate temprano de onboarding
2. validar runtime real con build + smoke + E2E
3. corregir trazabilidad operativa entre `~/.openclaw/product`, `/opt/gcm/app` y runtime real
4. formalizar gobernanza mínima del componente de asistentes
5. mantener `question-bank/editorial` fuera de alcance funcional del sprint

## Entregado
- Hecho: validación real de `build`, `test:dashboard`, `qa:smoke:postdeploy` y `qa:e2e:ui` sobre runtime objetivo.
- Hecho: fix de tooling QA para tolerar usuarios stale en Supabase (`b3db319`).
- Hecho: revalidación documental de QA/runtime (`557afe1`).
- Hecho: ADR-002 propuesto para gobernanza del componente de asistentes (`0b51047`).
- Hecho: onboarding endurecido con `activeAreas` obligatorio en UI y API, validado con rechazo real `400` (`dc67a0b`).
- Hecho: limpieza de `/editorial`, archivo fechado de inbox/legado y política de archivado/nombres (`f53ecb8`).
- Hecho: archivo de duplicados documentales de `docs/banco-preguntas/*` y reafirmación de `content/items/**` como verdad operativa del corpus (`ac648c4`).
- Hecho: reconciliación operativa entre `product`, `/opt/gcm/app` y runtime visible en `/login`, con redeploy validado en commit `ac648c4`.
- Hecho: extracción del límite rígido de `5` turnos fuera de la ruta de dominio y paso a `MAX_SESSION_TURNS` como configuración de runtime (`1d04637`).
- Hecho: formalización documental de la regla definitiva de verdad de runtime (`c72099b`).
- Hecho: worktree residual `workspace-product-048-fix` neutralizado; no tenía commits propios contra `master`, estaba `43` commits detrás y fue removido junto con su rama local para cerrar la ambigüedad topológica.

## No entregado
- Pendiente: redeploy explícito del commit posterior `1d04637` si se quiere reflejado inmediatamente en runtime productivo.

## Fuera de alcance
- implementación de asistentes visibles
- reapertura del frente editorial/question-bank como trabajo activo de sprint
- migración de `master` a `main`
- cambio de stack o rediseño mayor de arquitectura

## Riesgos y bloqueos remanentes
- el runtime puede volver a divergir si se valida solo Git y no la metadata visible en `/login`
- sigue existiendo deuda documental heredada fuera del circuito crítico

## Criterio de cierre del sprint cerrado
- flujo principal validado con evidencia real
- onboarding endurecido y probado
- `product`, deploy tree y runtime reconciliados operativamente
- regla de deploy/verdad de runtime escrita en docs canónicos
- frente editorial retirado de superficies activas y legado archivado con fecha
- hardcode crítico del límite de sesión retirado de la ruta de dominio

## Lecciones aprendidas
- no basta con alinear `product` y `/opt/gcm/app`; el runtime visible debe validar la tercera capa.
- la mezcla entre documentación activa, inbox temporal y legado sí degrada foco operativo.
- QA útil no debe contaminar reglas de dominio; si una restricción sirve a test, debe ir por configuración.

---

## Sprint cerrado más reciente
- Nombre: Sprint 3 - Normalización operativa final y preparación del frente de asistentes
- Estado: CERRADO FORMAL Y OPERATIVAMENTE
- Fecha de inicio: 2026-05-01
- Fecha de cierre efectiva: 2026-05-01
- Responsable humano: Marlon Arcila

## Objetivo del sprint cerrado más reciente
- Cerrar la ambigüedad topológica residual, consolidar el mapa real de features/estado operativo y dejar lista la base de gobernanza para abrir implementación del frente de asistentes sin comprometer confiabilidad del core.

## Outcome esperado del sprint cerrado más reciente
- topología operativa sin residuos ambiguos
- mapa actualizado de features activas con estado real
- ADR-002 aprobado con guardrails
- disciplina de release/deploy más estable
- baseline QA mantenido como guardián del core

## Cierre operativo confirmado
- Deploy cerrado con triple verificación en commit `701ebcf`.
- `~/.openclaw/product` = `701ebcf`
- `/opt/gcm/app` = `701ebcf`
- runtime visible en `/login` = `701ebcf`
- `buildTime` visible validado: `2026-05-01T18:25:50Z`
- cierre documental local posterior registrado en `dc8f832`, sin cambiar el hecho de que el último runtime triple-verificado sigue siendo `701ebcf`

## Comprometido
1. decidir y resolver el destino del worktree `workspace-product-048-fix`
2. consolidar mapa de features activas con estado real
3. aprobar o ajustar ADR-002 antes de implementación conversacional
4. mantener la triple verificación `product` = `/opt/gcm/app` = runtime visible como regla obligatoria
5. mantener fuera del sprint el frente editorial/question-bank salvo decisión ejecutiva explícita

## Entregado
- Hecho: worktree residual resuelto y ambigüedad topológica cerrada.
- Hecho: mapa formal de features activas creado y alineado con backlog/status.
- Hecho: ADR-002 aprobado con guardrails antes de abrir implementación funcional.
- Hecho: checklist de deploy aplicada en un cierre completo y triple-verificado.
- Hecho: cierre operativo del deploy fijado en `701ebcf` con evidencia visible de `buildTime`.
- Hecho: cierre documental adicional consolidado localmente sin reabrir scope funcional del sprint.

## No alcance del sprint cerrado más reciente
- implementación libre del Tutor GCM
- expansión del banco editorial
- migración de rama `master` a `main`
- nuevos frentes funcionales no respaldados por ADR o evidencia de negocio

## Criterio de terminado del sprint cerrado más reciente
- [x] worktree residual resuelto o neutralizado
- [x] mapa de features activas documentado
- [x] ADR-002 cerrado en decisión humana (aprobado con guardrails)
- [x] checklist de deploy aplicada sin ambigüedad en al menos un cierre completo
- [x] backlog y status alineados al estado real del producto

## Estado posterior al cierre
- No queda abierto un Sprint 4 formal en estos documentos.
- El backlog sigue funcionando como cola priorizada, pero no equivale a apertura automática de un nuevo sprint.
- El siguiente sprint debe abrirse solo cuando exista objetivo, alcance y evidencia suficiente para sostenerlo.

## Frente UI ejecutado en fuente y cerrado en runtime
- La propuesta canónica de rediseño UI premium mobile-first en `docs/01-product/ui-premium-mobile-redesign-proposal.md` ya quedó implementada y liberada sobre el core real del producto.
- Pantallas/superficies intervenidas: `login`, `home`, `onboarding`, `practice`, `dashboard` y `biblioteca editorial`, más shell compartido y sistema visual global.
- El deploy efectivo quedó validado en runtime con commit `df8f949`, contenedor `gcm-app` arriba, smoke postdeploy verde y `qa:e2e:ui` verde contra `:3000`.
- Hardening operativo aplicado durante el cierre: el compose ya consume secretos desde `/opt/gcm/env/gcm-app.env` en vez de `/opt/gcm/app/.env.production`, evitando que limpiezas tipo `git clean -fdx` rompan futuros releases.
- Nota residual: si la QA UI se ejecuta en host tras una limpieza agresiva del worktree, hay que garantizar dependencias de Playwright disponibles fuera del contenedor.

## Sprint 5 — Tutor GCM: base técnica gobernada
- **Estado**: CERRADO FUNCIONALMENTE
- **Fecha**: 2026-05-02
- **Commit funcional**: `5e918a5`
- **Objetivo**: diseñar e implementar la infraestructura mínima gobernada para Tutor GCM sin darle autoridad sobre negocio.

### Entregado
- contrato v1 del turno implementado (`TutorInput`, `TutorOutput`, `TutorTrace`)
- reglas de autoridad explícitas en `src/domain/tutor/contract.ts`
- orquestador con fallback y validación en `src/lib/tutor/tutor-orchestrator.ts`
- QA negativa validando rechazo de acciones no autorizadas
- build del core sin regresiones

### No alcance
- integración real con proveedor LLM
- UI conversacional visible para usuario final
- autoridad sobre scoring, avance o cierre de sesión
