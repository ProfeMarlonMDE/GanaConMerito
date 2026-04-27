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
- Alinear documentación del banco de preguntas con implementación real.
- Mantener consistencia entre migraciones de Supabase y modelo de datos activo.
- Ejecutar cierre funcional del frente `banco activo` con pruebas reales sobre el flujo de práctica.

### Frente activo: banco activo
- Estado: CERRADO TÉCNICAMENTE / PENDIENTE DE VALIDACIÓN FUNCIONAL FINAL.
- Alcance del bloque ya ejecutado: vista activa, adopción en runtime, smoke test, verificación remota, limpieza de defectuosas/legacy y consolidación del corpus curado.
- Criterio pendiente para cierre funcional completo: evidencia de práctica autenticada real de `5` turnos consumiendo el banco curado actual.
- Restricción documental: no declararlo como cierre funcional total hasta contar con esa evidencia de práctica.

## Prioridad ejecutiva

### Now
1. Ejecutar E2E autenticada real de `5` turnos sobre el banco curado de `27` preguntas.
2. Decidir y endurecer onboarding si `Áreas activas` no debe permitirse vacío.
3. Corregir trazabilidad de despliegue (`Build/Commit` visibles).
4. Formalizar mapa de features activas con estado real.
5. Aplicar disciplina operativa sobre ADR-001 ya aprobado.

### Next
1. Definir política operativa para cambios estructurales y releases.
2. Operativizar known issues con owner, impacto y ruta.
3. Normalizar documentos críticos de arquitectura, project, database y api.
4. Alinear backlog funcional con evidencia real de auth, onboarding, práctica, dashboard y editorial.
5. Revisar estrategia del selector de práctica para balance entre continuidad por competencia y cobertura por área.

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
- `question-bank`: requiere trazabilidad funcional y técnica sobre el corpus curado vigente y su consumo real desde práctica.
