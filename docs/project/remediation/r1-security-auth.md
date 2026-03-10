# Fase R1 — Seguridad/Auth crítica

## Objetivo
Cerrar los riesgos críticos abiertos en seguridad y autenticación antes de seguir expandiendo el MVP.

## Remediaciones aplicadas

### 1. Protección de `/api/content/upload`
El endpoint ahora exige:
- usuario autenticado
- perfil existente
- `is_admin === true`

Solo después de esa validación usa el cliente admin de Supabase.

### 2. Callback auth resiliente
El callback ahora:
- intercambia el code por sesión
- obtiene usuario
- intenta bootstrap de perfiles
- si falla el bootstrap, hace `signOut()` y redirige controladamente a `/login?error=profile_bootstrap_failed`

Esto evita sesión válida + perfil inconsistente.

### 3. Bootstrap reparador
`bootstrapUserProfile` ya no intenta un upsert incompleto de `learning_profiles`.

Nuevo comportamiento:
- siempre asegura `profiles`
- consulta si existe `learning_profiles`
- si no existe, lo crea con payload completo

### 4. Ajuste de cookies SSR en middleware
El middleware ahora actualiza tanto `request.cookies` como `response.cookies` al recibir cookies nuevas desde Supabase SSR.

## Riesgos aún abiertos
- bootstrap sigue sin transacción DB global
- aún falta prueba E2E real de login
- aún falta una ruta/estado explícito para usuarios autenticados pero no listos

## Estado de la fase
En implementación / pendiente de cierre formal con commit y push.
