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
last_reviewed: 2026-04-27
---

# Backlog de producto

## Criterio de uso
Este backlog distingue entre trabajo confirmado, trabajo propuesto y vacíos de contexto. No se debe marcar como hecho nada que no tenga evidencia en repo, sprint log o validación humana.

## En curso o altamente probable por evidencia en repo
- Consolidar y estabilizar módulo editorial administrativo.
- Endurecer autenticación y flujos de acceso.
- Mejorar madurez operativa del runtime.
- Mantener consistencia entre migraciones de Supabase y modelo de datos activo.

### Frente diferido a deuda técnica: banco de preguntas
- Estado: DIFERIDO DEL SPRINT / TRATADO COMO DEUDA TÉCNICA.
- Alcance diferido: validación funcional final del banco activo, alineación documental adicional del banco, segmentación asociada y proceso de gestión/editorial del banco.
- Criterio operativo actual: no meter este frente dentro del sprint vigente ni hacerlo competir con UX, asistentes, trazabilidad y calidad operativa central.
- Reentrada sugerida: cuando exista un sprint dedicado a datos/editorial o cuando el trabajo de asistentes requiera reabrir explícitamente este dominio.

## Prioridad ejecutiva

### Now
1. Decidir y endurecer onboarding si `Áreas activas` no debe permitirse vacío.
2. Corregir trazabilidad de despliegue (`Build/Commit` visibles).
3. Formalizar mapa de features activas con estado real.
4. Aplicar disciplina operativa sobre ADR-001 ya aprobado.
5. Diseñar formalmente la siguiente etapa de asistentes dentro del producto antes de implementación multiagente.

### Next
1. Definir política operativa para cambios estructurales y releases.
2. Operativizar known issues con owner, impacto y ruta.
3. Normalizar documentos críticos de arquitectura, project, database y api.
4. Alinear backlog funcional con evidencia real de auth, onboarding, práctica, dashboard y editorial.
5. Preparar el spec funcional/técnico de asistentes visibles del producto (roles, personalidad, intervención, contrato).

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
- `question-bank`: queda diferido como deuda técnica; no debe competir en el sprint vigente salvo decisión ejecutiva explícita.
