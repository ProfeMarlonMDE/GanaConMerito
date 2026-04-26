---
id: DOC-OPS-001
name: runbook
project: ganaconmerito
owner: ops-owner
status: active
artifact_type: runbook
modules: [core]
tags: [operacion, runbook]
related: [DOC-OPS-002, DOC-OPS-003, DOC-ARCH-001]
last_reviewed: 2026-04-26
---

# Runbook

## Objetivo

Operar el proyecto con pasos mínimos reproducibles y sin depender de memoria informal.

## Checklist de arranque

1. Confirmar branch y estado Git.
2. Leer contexto mínimo obligatorio.
3. Revisar ADRs aplicables.
4. Revisar deuda y issues del módulo.
5. Confirmar si se requiere aprobación humana.

## Checklist antes de merge o push

1. Ejecutar `python3 scripts/validate_docs.py`.
2. Ejecutar `python3 scripts/build_context_index.py`.
3. Verificar deuda nueva o changelog propuesto.
4. Confirmar que no hay cambios estructurales sin ADR aprobado.

## Incidentes operativos mínimos

- fallo por falta de contexto
- bloqueo por ADR faltante
- conflicto entre documentación y código
- hallazgo de secreto o dato sensible

## Escalamiento

- Seguridad o secretos: humano obligatorio.
- Cambios estructurales: humano obligatorio.
- Cierre de deuda crítica: humano obligatorio.

## Guardrails mínimos — corridas de importación de banco de preguntas

### Antes de ejecutar
1. Confirmar que la `service_role` vigente no haya pasado por chat, prompt, shell history o archivos versionados.
2. Cargar secretos solo desde `EnvironmentFile` o `.env` no versionado en el host autorizado.
3. Congelar un manifiesto de corrida con:
   - lista exacta de archivos aprobados
   - conteo esperado
   - ids excluidos
   - fecha/hora UTC
4. Ejecutar preflight sin escritura real:
   - presencia de variables requeridas
   - sincronización entre set canónico y árbol del importador
   - validación estructural local del lote
5. Tener aprobación humana explícita antes de cualquier operación con `service_role`.

### Ejecución mínima segura
1. Probar primero un solo archivo de bajo riesgo.
2. Revisar resultado del import mínimo antes del batch completo.
3. Solo después sincronizar el árbol del importador y lanzar el lote cerrado.
4. Registrar evidencia mínima: comando usado, manifiesto, conteo importado, errores y UTC.

### Cierre de corrida
1. Reconciliar conteo esperado vs conteo real en Supabase.
2. Verificar que no aparecieron ids fuera del manifiesto.
3. Documentar incidentes, bloqueos o desvíos en `incident-log.md`.
4. Si hubo exposición de secreto, tratar la credencial como comprometida y rotarla antes de la siguiente corrida.

## Pendientes

- TODO: comandos reales de arranque del producto.
- TODO: flujo de despliegue.
- TODO: criterios de rollback.
