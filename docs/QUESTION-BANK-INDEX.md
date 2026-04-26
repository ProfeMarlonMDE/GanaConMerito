# QUESTION-BANK-INDEX

## Estado general
Fase de carga cerrada operativamente el 2026-04-26.

Estado consolidado actual:
- `27` ítems del corpus vigente cargados y verificados en Supabase.
- `003`, `005` y `021` quedan fuera del corpus activo por dependencia visual/imagen.
- Persisten `3` cargas legadas (`item-doc-0001` a `item-doc-0003`) coexistiendo con la numeración actual `001`–`030`.
- La app no debe asumir continuidad numérica ni usar conteos brutos sobre `item_bank` como si todo fuera el mismo set funcional.

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
| `product/docs/banco-preguntas/matematicas.md` | Matemáticas | 001-005 | completed_with_exclusions | supabase_verified | `001`, `002` y `004` activos en BD; `003` y `005` excluidos por dependencia visual | 2026-04-26T16:44:00Z |
| `product/docs/banco-preguntas/pedagogia.md` | Pedagogía | 006-010 | completed | supabase_verified | `006`-`010` activos en BD | 2026-04-26T16:44:00Z |
| `product/docs/banco-preguntas/normatividad.md` | Normatividad | 011-015 | completed | supabase_verified | `011`-`015` activos en BD | 2026-04-26T16:44:00Z |
| `product/docs/banco-preguntas/gestion.md` | Gestión | 016-020 | completed | supabase_verified | `016`-`020` activos en BD; `020` corregido antes de inserción (`CIE` -> `SIEE`) | 2026-04-26T16:44:00Z |
| `product/docs/banco-preguntas/lectura-critica.md` | Lectura crítica | 021-025 | completed_with_exclusions | supabase_verified | `022`-`025` activos en BD; `021` excluido por dependencia visual | 2026-04-26T16:44:00Z |
| `product/docs/banco-preguntas/ciudadanas.md` | Competencias ciudadanas | 026-030 | completed | supabase_verified | `026`-`030` activos en BD | 2026-04-26T16:44:00Z |

## Cierre de fase
- La fase de carga queda cerrada con éxito operativo sobre el corpus actual útil.
- Los excluidos `003`, `005` y `021` no son errores de carga pendientes; son exclusiones explícitas hasta contar con tratamiento de assets visuales.
- La siguiente fase ya no es de ingestión masiva sino de endurecimiento del contrato de consumo para la app.

## Regla operativa
- Unidad base: `2` ítems por ejecución
- Secuencia por micro-lote: `Editorial -> QA -> Data -> Backend -> consolidación`
- Si un ítem llega incompleto: `blocked_waiting_full_item`
- No se promueve nada a BD sin pasar por capas
- Este índice es operativo. No reemplaza el corpus canónico de producto en `master`.
