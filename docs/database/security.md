# Seguridad y autorización

## Base de autenticación

Se asume:
- `profiles.auth_user_id = auth.users.id`

## Modelo actual

### Usuario normal
Puede acceder solo a:
- su perfil
- su learning profile
- sus sesiones
- sus turnos
- sus eventos de evaluación
- sus estadísticas
- sus snapshots

### Admin
Puede además:
- insertar y actualizar `item_bank`
- insertar y actualizar `item_options`

## RLS

La RLS está definida en la migración inicial para:
- `profiles`
- `learning_profiles`
- `sessions`
- `item_bank`
- `item_options`
- `session_turns`
- `evaluation_events`
- `user_topic_stats`
- `user_skill_snapshots`

## Criterios prácticos

- cliente: usar `anon key` + sesión autenticada
- backend: usar `service role` solo cuando sea realmente necesario
- el MVP asume un único admin inicial

## Riesgos todavía abiertos

- aún no existe flujo completo de bootstrap automático de `profiles`
- aún no hay auditoría administrativa
- aún no se diferenciaron roles más finos que `is_admin`
