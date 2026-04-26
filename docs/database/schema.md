# Modelo de datos resumido

## Tablas principales

### `profiles`
Perfil base del usuario autenticado.

### `learning_profiles`
Perfil pedagógico y meta activa del usuario.

### `sessions`
Sesiones de práctica, simulacro o revisión.

### `session_turns`
Turnos individuales dentro de una sesión.

### `item_bank`
Banco principal de preguntas.

### `item_options`
Opciones asociadas a cada ítem.

### `evaluation_events`
Resultado evaluativo por turno.

### `user_topic_stats`
Estadística agregada por usuario y competencia.

### `user_skill_snapshots`
Memoria comprimida por usuario.

## Reglas estructurales relevantes

- `difficulty` entre `0` y `1`
- `correct_option` en `A|B|C|D`
- `selected_option` en `A|B|C|D`
- `confidence_self_report` entre `1` y `5`
- `unique(item_id, option_key)` en `item_options`
- `unique(session_id, turn_number)` en `session_turns`
- `unique(profile_id, area, competency)` en `user_topic_stats`
- `content_id` único en `item_bank`
- `target_role` y `exam_type` restringidos por CHECK para el dominio actual

## Trazabilidad operativa

Tienen `updated_at`:
- `profiles`
- `learning_profiles`
- `item_bank`
- `user_topic_stats`
- `sessions`
- `session_turns`
- `user_skill_snapshots`
- `evaluation_events`

## Contrato activo de lectura del banco

Para consumo seguro de la app, la lectura del banco no debe quedar acoplada a `item_bank` crudo.

Referencia canónica de diseño:
- `docs/database/active-question-bank-contract.md`

## Fuente ejecutable

La definición real vive en:
- `supabase/migrations/0001_init_mvp.sql`
- `supabase/migrations/0002_remediation_r3.sql`
- migraciones posteriores de segmentación/editorial (`0006` y `0007`)
- `supabase/migrations/0008_create_v_item_bank_active.sql` para el contrato ejecutable `public.v_item_bank_active`
