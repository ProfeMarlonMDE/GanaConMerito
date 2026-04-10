# QUESTION-PIPELINE-SESSION-PROMPT

Usa este bloque para abrir una sesión fresca y retomar la ejecución del pipeline sin arrastrar overflow.

```md
# Contexto para sesión fresca — ejecución actual del proyecto

Quiero retomar una ejecución operativa sobre el procesamiento de un lote de preguntas para GanaConMerito.

## Modo de trabajo
- Responde en modo ejecución corta
- No rehagas contexto previo
- No inventes avances no confirmados
- Si falta información crítica, pídela en una sola tanda corta
- Prioriza acción, control y trazabilidad
- Evita prompts largos que puedan causar overflow

## Objetivo
Procesar preguntas tipo `multiple_choice` hasta dejarlas exclusivamente en uno de estos estados:
- `ready_for_insert`
- `needs_fix`
- `rejected`

Regla:
ningún ítem debe considerarse listo para BD sin pasar por validación por capas.

## Contexto ejecutivo resumido
Se intentó correr una agencia por roles:
- Editorial
- QA
- Data
- Backend
- coordinación central por Gauss

Pero aparecieron estos problemas:
1. No había permiso de envío cruzado entre sesiones.
2. Se intentó asumir todos los roles en la misma sesión.
3. Se probaron subagentes efímeros.
4. Ocurrió `Context overflow: prompt too large for the model`.

## Decisión estratégica ya tomada
La mejor estrategia para seguir es:
- micro-lotes de 2–3 preguntas por ejecución
- máximo 5 si el contexto está limpio
- prompts mínimos
- sesiones frescas
- input canónico persistido en archivos de producto
- trazabilidad operativa en workspace
- Gauss como coordinadora central

## Estado real al cierre de la sesión anterior
- Se consolidó un archivo con el lote `001–015`
- Se separó un micro-lote `001–005`, hoy archivado para trazabilidad
- Se lanzaron intentos de subagentes sobre algunos ítems y sobre ese micro-lote
- Los intentos no dejaron una salida final confiable por overflow / timeout
- No hay todavía decisiones finales confiables por ítem en `ready_for_insert`

## Regla de procesamiento
Si un ítem llega incompleto:
- marcar `blocked_waiting_full_item`
- no inventar
- no pasarlo a la siguiente capa

## Archivos con contexto útil (rutas absolutas)
- `/home/ubuntu/.openclaw/workspace/docs/QUESTION-PIPELINE-CONTEXT.md`
- `/home/ubuntu/.openclaw/workspace/OPERACION-30-PREGUNTAS.md`
- `/home/ubuntu/.openclaw/product/docs/banco-preguntas/`
- `/home/ubuntu/.openclaw/workspace/lotes-input/lote-001-015.md`
- `/home/ubuntu/.openclaw/workspace/archive/lotes-input/micro-lote-001-005.md`
- `/home/ubuntu/.openclaw/workspace/memory/2026-04-06-question-pipeline.md`

## Qué quiero que hagas ahora
1. Lee primero los artefactos canónicos de producto y luego el contexto operativo del workspace
2. Dame el siguiente movimiento operativo exacto
3. Propón el tamaño de micro-lote a usar en esta sesión fresca
4. Trabaja con prompts mínimos para evitar overflow
5. No rehagas teoría: quiero ejecución controlada
```
