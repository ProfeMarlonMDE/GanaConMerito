---
id: DEL-PRIORITY-CLOSEOUT-PLAN
name: priority-closeout-plan
project: ganaconmerito
owner: marlon-arcila
status: active
artifact_type: delivery
modules: [qa, tutor, ci, governance]
tags: [prioridades, cierre, tutor-traces, ci, npm-test]
last_reviewed: 2026-05-05
---

# Cierre de prioridades posteriores a control de calidad

## Estado ejecutivo

Este documento registra qué prioridades del control de calidad ya estaban cerradas y cuáles se desarrollaron en la rama `feat/tutor-traces-tests-ci`.

## Prioridad 1 — Reconciliar documentación

**Estado:** Cerrada previamente.

Evidencia:
- PR #7 mergeado.
- `docs/project/status.md`
- `docs/02-delivery/sprint-log.md`
- `docs/02-delivery/change-log.md`
- `docs/01-product/backlog.md`
- `docs/01-product/active-feature-map.md`

No requiere trabajo adicional en esta rama.

## Prioridad 2 — Crear npm test

**Estado:** Desarrollada en esta rama.

Cambios:
- `npm test` agregado como contrato general.
- `test:unit` agregado.
- `test:tutor` agregado.
- `qa:local` agregado.

Contrato esperado:

```bash
npm test
npm run qa:local
```

## Prioridad 3 — Fuente normativa sintetizada

**Estado:** Cerrada previamente como Sprint 13 / PR #8.

Evidencia:
- `src/lib/tutor/normative-source-truth.ts`
- `docs/01-product/source-truth/normative-source-truth-v1.md`
- estado `synthesized_governed_unverified`

No requiere repetición. La fuente solo podrá pasar a `source_verified` cuando se carguen documentos oficiales.

## Prioridad 4 — Persistencia de trazas del Tutor

**Estado:** Desarrollada en esta rama.

Cambios:
- migración `supabase/migrations/0007_tutor_turn_traces.sql`
- repositorio `src/lib/tutor/tutor-trace-repository.ts`
- escritura desde `src/app/api/tutor/turn/route.ts`

Regla:
- La traza se intenta persistir después de procesar el turno.
- Si la persistencia falla, se registra warning y no se bloquea la respuesta del tutor.

## Prioridad 5 — CI / checks de PR

**Estado:** Desarrollada en esta rama.

Cambios:
- `.github/workflows/pr-checks.yml`

Checks:
- `npm ci`
- `npm run content:validate`
- `npm test`
- `npm run build`

## Roadmap desde este punto

### Ya no necesario repetir
- Sprint 13 — Fuente de verdad normativa sintetizada v1.
- Reconciliación documental Sprint 12.1.

### Siguiente sprint recomendado
**Sprint 14 — Tutor GCM trazabilidad y métricas pedagógicas v1**

Objetivo:
- explotar `tutor_turn_traces` para saber cómo se usa el Tutor GCM;
- medir degradaciones;
- detectar preguntas que generan más dudas;
- monitorear intentos de pedir respuesta antes de contestar;
- preparar un dashboard interno/admin posterior.

### Sprint posterior recomendado
**Sprint futuro — Carga verificada de fuentes normativas oficiales**

Requiere volver a cargar:
- acuerdo oficial;
- guía metodológica;
- estructura de prueba;
- perfiles/empleos de convocatoria;
- manual o fuente de funciones/competencias.
