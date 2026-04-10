# QUESTION-PIPELINE-CONTEXT

## Propósito
Este archivo documenta el contexto operativo más reciente del procesamiento del lote de preguntas para GanaConMerito, con foco en cómo retomar la ejecución sin repetir errores de orquestación ni de contexto.

## Objetivo del flujo
Procesar preguntas tipo `multiple_choice` hasta dejarlas en uno de estos estados finales:
- `ready_for_insert`
- `needs_fix`
- `rejected`

Regla obligatoria:
**ningún ítem debe darse por listo para BD sin pasar por validación por capas.**

## Modelo operativo intentado
Se intentó trabajar con una agencia por roles:
1. Editorial
2. QA
3. Data
4. Backend
5. Coordinación central por Gauss

## Problemas detectados durante la ejecución

### 1. Restricción de despacho entre sesiones
La sesión principal no pudo enviar mensajes directos a otras sesiones/agentes por restricción de visibilidad inter-sesión.

Impacto:
- no fue posible activar de forma nativa los handoffs a `qa-validation`, `data-supabase` y `backend-services`
- se tuvo que migrar a una estrategia de ejecución centralizada desde una sola sesión

### 2. Intento de usar subagentes efímeros
Se usaron subagentes `runtime=subagent` en `mode=run` para procesar preguntas o micro-lotes.

Impacto:
- útil para pruebas rápidas
- pero sin un bus persistente de handoff entre capas
- aumenta la necesidad de consolidación manual/orquestación central

### 3. Context overflow
Apareció el error:
`Context overflow: prompt too large for the model`

Causa principal:
- historial largo de la sesión
- instrucciones extensas
- metadata completa de los ítems
- lotes pegados dentro del prompt
- relanzamientos acumulados

Diagnóstico:
**el fallo principal fue de empaque/contexto, no de lógica del pipeline.**

## Decisión estratégica final
La estrategia recomendada para retomar es:

### Pipeline híbrido por micro-lotes con control central
No usar:
- lote gigante de 30 de una vez
- procesamiento permanente de una sola pregunta con alta sobrecarga de coordinación

Sí usar:
- micro-lotes de **2–3 preguntas por ejecución**
- máximo 5 si el contexto está muy limpio
- prompts mínimos
- sesiones frescas
- preguntas fuente persistidas en artefactos canónicos de producto
- trazabilidad operativa persistida en archivos del workspace
- Gauss como coordinadora central de handoffs

## Estado real de la ejecución al cierre
- El lote `001–015` quedó consolidado como insumo operativo local.
- El micro-lote `001–005` quedó separado y luego archivado para trazabilidad.
- Hubo intentos de lanzar subagentes sobre ítems individuales y sobre el micro-lote inicial.
- No hay salida final confiable todavía para marcar ítems como `ready_for_insert`.
- La siguiente ejecución debe retomarse desde archivos persistidos, no desde historial de chat.

## Regla operativa para retomar
Si un ítem está incompleto:
- marcar `blocked_waiting_full_item`
- no inventar contenido
- no pasarlo a la siguiente capa

## Archivos de referencia
- `/home/ubuntu/.openclaw/product/docs/banco-preguntas/`
- `/home/ubuntu/.openclaw/workspace/OPERACION-30-PREGUNTAS.md`
- `/home/ubuntu/.openclaw/workspace/lotes-input/lote-001-015.md`
- `/home/ubuntu/.openclaw/workspace/archive/lotes-input/micro-lote-001-005.md`
- `/home/ubuntu/.openclaw/workspace/memory/2026-04-06-question-pipeline.md`

## Siguiente movimiento recomendado
1. Abrir sesión fresca.
2. Cargar solo este contexto y los archivos del lote.
3. Procesar primero `001–002` o `001–003` con prompt mínimo.
4. Consolidar salida.
5. Pasar a la siguiente capa solo lo que esté limpio.
6. Repetir la banda por micro-lotes.
