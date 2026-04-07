# QUESTION-BANK-INDEX

## Estado general
Inventario confirmado desde el repositorio remoto y materializado en este workspace.

Ruta activa:
- `/home/ubuntu/.openclaw/workspace/docs/banco-preguntas`

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
| `docs/banco-preguntas/matematicas.md` | Matemáticas | 001-005 | blocked | editorial | corregir 001, 002 y 004; adjuntar tabla/gráfico faltante para 003 y 005 | 2026-04-07T02:11:00Z |
| `docs/banco-preguntas/pedagogia.md` | Pedagogía | 006-010 | partial_ready | editorial | abrir QA para 006-010 por micro-lotes | 2026-04-07T02:15:00Z |
| `docs/banco-preguntas/normatividad.md` | Normatividad | 011-015 | partial_ready | editorial | abrir QA para 011, 013 y 014; corregir 012 y 015 | 2026-04-07T02:19:00Z |
| `docs/banco-preguntas/gestion.md` | Gestión | 016-020 | partial_ready | editorial | abrir QA para 016-019; corregir 020 | 2026-04-07T02:23:00Z |
| `docs/banco-preguntas/lectura-critica.md` | Lectura crítica | 021-025 | partial_ready | editorial | abrir QA para 021-025 por micro-lotes | 2026-04-07T02:27:00Z |
| `docs/banco-preguntas/ciudadanas.md` | Competencias ciudadanas | 026-030 | partial_ready | editorial | abrir QA para 028-030; corregir 026-027 | 2026-04-07T02:31:00Z |

## Regla operativa
- Unidad base: `2` ítems por ejecución
- Secuencia por micro-lote: `Editorial -> QA -> Data -> Backend -> consolidación`
- Si un ítem llega incompleto: `blocked_waiting_full_item`
- No se promueve nada a BD sin pasar por capas
