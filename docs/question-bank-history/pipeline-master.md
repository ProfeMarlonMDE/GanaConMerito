# Pipeline Master — Banco de preguntas

## Mandato obligatorio
**No enviar preguntas que no cumplan con las características definidas en el proyecto.**

## Cola operativa
1. Matemáticas 001-002 -> Editorial [done: 001 needs_fix, 002 needs_fix]
2. Matemáticas 003-004 -> Editorial [done: 003 blocked_waiting_full_item, 004 needs_fix]
3. Matemáticas 005 -> Editorial [done: 005 blocked_waiting_full_item]
4. Pedagogía 006-007 -> Editorial [done: 006 editorial_done, 007 editorial_done]
5. Pedagogía 008-009 -> Editorial [done: 008 editorial_done, 009 editorial_done]
6. Pedagogía 010 -> Editorial [done: 010 editorial_done]
7. Normatividad 011-012 -> Editorial [done: 011 editorial_done, 012 needs_fix]
8. Normatividad 013-014 -> Editorial [done: 013 editorial_done, 014 editorial_done]
9. Normatividad 015 -> Editorial [done: 015 needs_fix]
10. Gestión 016-017 -> Editorial [done: 016 editorial_done, 017 editorial_done]
11. Gestión 018-019 -> Editorial [done: 018 editorial_done, 019 editorial_done]
12. Gestión 020 -> Editorial [done: 020 needs_fix]
13. Lectura crítica 021-022 -> Editorial [done: 021 editorial_done, 022 editorial_done]
14. Lectura crítica 023-024 -> Editorial [done: 023 editorial_done, 024 editorial_done]
15. Lectura crítica 025 -> Editorial [done: 025 editorial_done]
16. Competencias ciudadanas 026-027 -> Editorial [done: 026 needs_fix, 027 needs_fix]
17. Competencias ciudadanas 028-029 -> Editorial [done: 028 editorial_done, 029 editorial_done]
18. Competencias ciudadanas 030 -> Editorial [done: 030 editorial_done]

## Reglas de avance
- No abrir QA para un micro-lote hasta cerrar Editorial del mismo micro-lote.
- No abrir Data hasta tener `qa_pass` o `qa_fix` resuelto.
- No abrir Backend hasta tener `data_ready`.
- Solo `ready_for_insert` es apto para BD.
- Todo ítem defectuoso debe quedarse en `needs_fix`, `rejected` o `blocked_waiting_full_item`.

## Consolidación obligatoria por cada micro-lote
Actualizar:
- `/home/ubuntu/.openclaw/workspace/docs/QUESTION-BANK-INDEX.md`
- `/home/ubuntu/.openclaw/workspace/docs/question-bank-history/<area>.md`

## Estado inicial
- pipeline_status: `active`
- active_micro_lot: `QA Pedagogía 006-007`
- active_layer: `QA`
- next_after_active: `QA Pedagogía 008-009`
- updated_at_utc: `2026-04-07T02:31:00Z`
