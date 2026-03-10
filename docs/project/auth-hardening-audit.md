# Auditoría de hardening del bloque auth

## Correcciones aplicadas

### 1. Sanitización de `next`
La ruta de callback ahora acepta únicamente rutas internas válidas.

Bloquea:
- URLs externas
- rutas con `//`
- valores nulos o malformados

Fallback por defecto:
- `/home`

### 2. Manejo controlado de errores en callback
El callback ahora usa `try/catch` y devuelve redirect controlado en caso de fallo de bootstrap.

### 3. Cliente admin separado de SSR/cookies
El cliente administrativo ahora usa `createClient` de `@supabase/supabase-js` con `service_role` y sin persistencia de sesión.

### 4. Higiene de secretos
`.gitignore` ahora ignora patrones amplios de `.env*` y preserva solo `.env.example`.

### 5. Bootstrap más conservador
El bootstrap evita reescribir ciegamente los defaults de `learning_profiles` en relogins posteriores.

## Riesgos que siguen abiertos

- bootstrap no es transaccional a nivel DB
- falta prueba E2E real de login
- falta UI real de login
- falta protección de rutas privadas
- falta estrategia formal de rotación de secretos compartidos previamente

## Estado

Este bloque queda endurecido para continuar desarrollo, pero todavía no está listo para considerarse cierre final de auth en producción.
