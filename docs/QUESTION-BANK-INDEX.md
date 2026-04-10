# QUESTION-BANK-INDEX

## Estado general
Inventario confirmado desde el repositorio remoto y mantenido como tablero operativo en el workspace de agencia.

Ruta canónica de producto:
- `/home/ubuntu/.openclaw/product/docs/banco-preguntas`

Ruta de este documento:
- `/home/ubuntu/.openclaw/workspace/docs/QUESTION-BANK-INDEX.md`

## Orden operativo final
1. `matematicas.md` — ítems 001–005
2. `pedagogia.md` — ítems 006–010
3. `normatividad.md` — ítems 011–015
4. `gestion.md` — ítems 016–020
5. `lectura-critica.md` — ítems 021–025
6. `ciudadanas.md` — ítems 026–030

## Criterio del orden
- Primero las áreas ya abiertas en la operación previa.
- Luego las áreas pendientes de segunda pasada.
- Se mantiene continuidad con el pipeline ya documentado.
- Se reduce riesgo de overflow trabajando por micro-lotes de 2 ítems.

## Tabla de control
| archivo | área | rango_items | estado | última_capa | siguiente_acción | updated_at_utc |
|---|---|---|---|---|---|---|
| `product/docs/banco-preguntas/matematicas.md` | Matemáticas | 001-005 | in_review | editorial | 001, 002 y 004 reingresados y aprobados en Editorial; 003 y 005 siguen bloqueados por insumo | 2026-04-07T02:58:00Z |
| `product/docs/banco-preguntas/pedagogia.md` | Pedagogía | 006-010 | completed | backend | consolidado; 006-010 ready_for_insert | 2026-04-07T02:39:00Z |
| `product/docs/banco-preguntas/normatividad.md` | Normatividad | 011-015 | in_review | correction | 012 y 015 reescritos; listos para reingreso por Editorial | 2026-04-07T02:51:00Z |
| `product/docs/banco-preguntas/gestion.md` | Gestión | 016-020 | in_review | correction | 020 reescrito; listo para reingreso por Editorial | 2026-04-07T02:52:00Z |
| `product/docs/banco-preguntas/lectura-critica.md` | Lectura crítica | 021-025 | completed | backend | consolidado; 021-025 ready_for_insert | 2026-04-07T02:45:00Z |
| `product/docs/banco-preguntas/ciudadanas.md` | Competencias ciudadanas | 026-030 | in_review | correction | 026 reescrito; pendiente reescritura controlada de 027 | 2026-04-07T02:53:00Z |

## Regla operativa
- Unidad base: `2` ítems por ejecución
- Secuencia por micro-lote: `Editorial -> QA -> Data -> Backend -> consolidación`
- Si un ítem llega incompleto: `blocked_waiting_full_item`
- No se promueve nada a BD sin pasar por capas
- Este índice es operativo. No reemplaza el corpus canónico de producto en `master`.
