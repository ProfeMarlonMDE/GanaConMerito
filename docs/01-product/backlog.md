---
id: PROD-BACKLOG
name: product-backlog
project: ganaconmerito
owner: marlon-arcila
status: active
artifact_type: product
modules: [core, editorial, auth, evaluacion]
tags: [backlog, prioridades, trazabilidad]
related:
  - PROD-VISION
  - DEL-SPRINT-LOG
  - QUAL-DEBT-REGISTER
last_reviewed: 2026-04-26
---

# Backlog de producto

## Criterio de uso
Este backlog distingue entre trabajo confirmado, trabajo propuesto y vacíos de contexto. No se debe marcar como hecho nada que no tenga evidencia en repo, sprint log o validación humana.

## En curso o altamente probable por evidencia en repo
- Consolidar y estabilizar módulo editorial administrativo.
- Endurecer autenticación y flujos de acceso.
- Mejorar madurez operativa del runtime.
- Alinear documentación del banco de preguntas con implementación real.
- Mantener consistencia entre migraciones de Supabase y modelo de datos activo.
- Activar el frente `banco activo` con tres líneas en ejecución: vista activa, adopción en runtime y smoke test controlado.

### Frente activo: banco activo
- Estado: EN PROGRESO.
- Alcance del bloque: exponer la vista activa del banco, adoptar el flujo en runtime sin asumir rollout completo, y dejar smoke test mínimo definido/ejecutado cuando exista evidencia.
- Criterio de cierre: evidencia en repo o validación operativa de que la vista activa está disponible, el runtime apunta al banco activo esperado y el smoke test deja resultado verificable.
- Restricción documental: no marcar como entregado hasta contar con evidencia técnica o validación humana explícita.

## Prioridad ejecutiva

### Now
1. Ejecutar el frente `banco activo`: vista activa, adopción en runtime y smoke test con trazabilidad de cierre.
2. Formalizar mapa de features activas con estado real.
3. Consolidar owner humano mínimo del producto y roles operativos de apoyo.
4. Separar deuda heredada de deuda nueva en calidad y arquitectura.
5. Aplicar disciplina operativa sobre ADR-001 ya aprobado.
6. Definir tratamiento para `item-doc-003`, `item-doc-005` e `item-doc-021` excluidos de la carga actual por dependencia visual/imagen.

### Next
1. Definir política operativa para cambios estructurales y releases.
2. Operativizar known issues con owner, impacto y ruta.
3. Normalizar documentos críticos de arquitectura, project, database y api.
4. Alinear backlog funcional con evidencia real de auth, onboarding, práctica, dashboard y editorial.
5. Decidir manejo documental y operativo de los ítems legados `item-doc-0001..0003`.

### Later
1. Definición oficial de roadmap por trimestre.
2. Features descartadas o congeladas con criterio explícito.
3. SLA o expectativas formales de operación.

## Vacíos de contexto
- TODO: priorización explícita por impacto de negocio validada por Marlon.
- TODO: definición oficial de roadmap por trimestre.
- TODO: features descartadas o congeladas.
- TODO: SLA o expectativas de operación.

## Relación con módulos
- `editorial`: requiere orden documental y claridad de flujo.
- `auth`: requiere control de seguridad y decisiones explícitas.
- `supabase`: requiere coherencia de migraciones, políticas y estado real de carga.
- `question-bank`: requiere trazabilidad funcional y técnica, incluyendo exclusiones vigentes y legado.
