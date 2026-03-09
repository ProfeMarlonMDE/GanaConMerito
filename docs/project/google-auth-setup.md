# Configuración de Google Auth para Supabase

## Estado actual

El proyecto ya tiene:
- variables de entorno locales para Supabase
- cliente browser y server listos
- callback route en `src/app/api/auth/callback/route.ts`

## Lo que falta habilitar manualmente

La activación final de Google Auth se hace en el dashboard de Supabase y en Google Cloud Console.

## Paso 1. Crear credenciales OAuth en Google Cloud

Crear un cliente OAuth 2.0 de tipo Web application.

## Paso 2. Configurar Authorized redirect URI

Usar como URI principal:

```text
https://tsyutluozccpltygdrlb.supabase.co/auth/v1/callback
```

Si luego se requiere callback propia en frontend, se mantiene además la ruta de la app para retorno posterior.

## Paso 3. Activar Google provider en Supabase

En Supabase:
- Authentication
- Providers
- Google

Configurar:
- Client ID
- Client Secret
- Enable provider

## Paso 4. Configurar Site URL y Redirect URLs

Definir al menos:
- entorno local de desarrollo
- URL pública futura

Ejemplo local:

```text
http://localhost:3000
http://localhost:3000/api/auth/callback
```

## Paso 5. Flujo esperado en app

1. usuario elige login con Google
2. Supabase redirige a Google
3. Google vuelve al callback
4. la ruta `src/app/api/auth/callback/route.ts` intercambia el code por sesión
5. el usuario vuelve a la app autenticado

## Siguiente trabajo técnico después de habilitarlo

- crear helper `signInWithGoogle`
- proteger rutas privadas
- bootstrap automático de `profiles`
- bootstrap automático de `learning_profiles`
