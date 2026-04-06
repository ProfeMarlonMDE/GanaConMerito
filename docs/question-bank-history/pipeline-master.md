# Pipeline Master — Banco de preguntas

## Mandato obligatorio
**No enviar preguntas que no cumplan con las características definidas en el proyecto.**

## Cola operativa
1. Matemáticas 001-002 -> Editorial
2. Matemáticas 003-004 -> Editorial
3. Matemáticas 005 -> Editorial o emparejar con 006 si conviene por sesión limpia
4. Pedagogía 006-007 -> Editorial
5. Pedagogía 008-009 -> Editorial
6. Pedagogía 010 -> Editorial o emparejar con 011 bajo control
7. Normatividad 011-012 -> Editorial
8. Normatividad 013-014 -> Editorial
9. Normatividad 015 -> Editorial o emparejar con 016 solo si no contamina contexto
10. Gestión 016-017 -> Editorial
11. Gestión 018-019 -> Editorial
12. Gestión 020 -> Editorial o emparejar con 021 bajo sesión limpia
13. Lectura crítica 021-022 -> Editorial
14. Lectura crítica 023-024 -> Editorial
15. Lectura crítica 025 -> Editorial o emparejar con 026 bajo control
16. Competencias ciudadanas 026-027 -> Editorial
17. Competencias ciudadanas 028-029 -> Editorial
18. Competencias ciudadanas 030 -> Editorial

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
- active_micro_lot: `Matemáticas 001-002`
- active_layer: `Editorial`
- next_after_active: `Matemáticas 003-004`
- updated_at_utc: `2026-04-06T21:56:00Z`
