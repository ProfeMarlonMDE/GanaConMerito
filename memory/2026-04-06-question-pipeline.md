# Session: 2026-04-06 Question Pipeline

## Contexto ejecutivo
Se intentó procesar un lote de 30 preguntas tipo multiple_choice para GanaConMerito usando una agencia de roles (Editorial -> QA -> Data -> Backend) con Gauss como orquestadora.

## Objetivo operativo
Llevar cada pregunta a uno de estos estados finales:
- `ready_for_insert`
- `needs_fix`
- `rejected`

sin enviar basura a BD.

## Lotes definidos
- Lote A: Matemáticas (001–005)
- Lote B: Pedagogía (006–010)
- Lote C: Normatividad (011–015)
- Lote D: Gestión (016–020)
- Lote E: Lectura crítica (021–025)
- Lote F: Competencias ciudadanas (026–030)

## Qué se descubrió
1. La infraestructura base de OpenClaw y las sesiones/agentes existen, pero la sesión principal no tenía permiso de envío cruzado (`tools.sessions.visibility=all` no habilitado).
2. Por esa restricción, no fue posible despachar mensajes directos a sesiones como `qa-validation`, `data-supabase` o `backend-services`.
3. Se decidió asumir todos los roles dentro de esta sesión y, después, usar subagentes efímeros (`sessions_spawn runtime=subagent mode=run`) para procesamiento por etapas.
4. Se intentó procesar preguntas mediante subagentes por ítem y por micro-lote.
5. Apareció el error `Context overflow: prompt too large for the model`, causado por historial largo + instrucciones extensas + metadata completa + lote pegado dentro del prompt.

## Decisión estratégica final
La mejor estrategia para continuar NO es por pregunta suelta permanente ni por lote gigante de 30.
La estrategia recomendada es:
- micro-lotes de 2–3 preguntas por ejecución (máximo 5 si el contexto está limpio)
- prompts mínimos
- sesiones frescas
- input persistido en archivos locales
- Gauss como coordinadora central de handoffs

## Persistencia creada en workspace
Archivos creados durante esta ejecución:
- `/home/ubuntu/.openclaw/workspace/OPERACION-30-PREGUNTAS.md`
- `/home/ubuntu/.openclaw/workspace/lotes-input/lote-001-015.md`
- `/home/ubuntu/.openclaw/workspace/lotes-input/micro-lote-001-005.md`

## Estado real al cierre
- El lote 001–015 quedó consolidado en archivo local.
- El micro-lote 001–005 quedó separado para ejecución.
- Hubo intentos de lanzar subagentes sobre ítems 001, 002, 015, 016 y luego sobre el micro-lote 001–005.
- Los intentos de subagentes fallaron o quedaron interrumpidos por overflow / timeout.
- No existe todavía salida consolidada confiable de Editorial/QA/Data/Backend para marcar ítems como `ready_for_insert`.

## Recomendación para retomar en sesión fresca
1. No arrastrar este historial largo.
2. Usar una sesión nueva.
3. Cargar solo el resumen operativo y los archivos locales.
4. Procesar primero `001–003` o `001–002` con prompt mínimo.
5. Consolidar salida, luego pasar a la siguiente capa.
6. Repetir banda transportadora por micro-lotes.

## Regla operativa clave
Si un ítem llega incompleto:
- marcar `blocked_waiting_full_item`
- no inventar contenido
- no pasarlo a la siguiente capa
