---
id: GOV-WORKING-AGREEMENT
name: working-agreement
project: ganaconmerito
owner: marlon-arcila
status: active
artifact_type: governance
modules: [core, platform]
tags: [gobernanza, acuerdos, operacion]
related:
  - GOV-AGENT-ROSTER
  - GOV-HUMAN-APPROVAL
last_reviewed: 2026-04-23
---

# Working agreement

## Principios
1. Git es la fuente oficial de verdad.
2. Lo no trazado no se asume como decidido.
3. Ningún cambio estructural avanza sin ADR aprobado.
4. Todo workaround genera deuda registrada.
5. La velocidad no justifica pérdida de contexto.
6. Seguridad, auth, datos y costos tienen control humano obligatorio.

## Regla de lectura mínima
Antes de tocar código o estructura, se debe leer:
- `README.md`
- `docs/03-architecture/system-overview.md`
- `docs/01-product/backlog.md`
- ADRs aplicables
- deuda e issues del módulo

## Reglas de ejecución
- Diferenciar explícitamente entre hecho, supuesto y pendiente.
- No borrar historial de decisiones.
- No introducir secretos en markdown o logs.
- No cerrar deuda crítica sin validación humana.
- No cambiar migraciones o auth como si fueran cambios menores.

## Regla de escalamiento
Escalar de inmediato cuando haya:
- impacto transversal a varios módulos
- cambio de esquema o permisos
- implicación en costos o seguridad
- ambigüedad fuerte del contexto heredado

## Calidad mínima de artefactos
Todo documento crítico debe tener:
- frontmatter válido
- owner humano
- estado claro
- relaciones relevantes
- fecha de revisión
