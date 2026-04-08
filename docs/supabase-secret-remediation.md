# Remediación de exposición de `SUPABASE_SERVICE_ROLE_KEY`

## Estado detectado
La `SUPABASE_SERVICE_ROLE_KEY` no quedó almacenada formalmente en un archivo `.env` del repo activo ni en el servicio systemd inspeccionado.

Sí quedó expuesta en:
- `/home/ubuntu/.bash_history`
- múltiples sesiones de OpenClaw bajo `/home/ubuntu/.openclaw/agents/main/sessions/`

## Riesgo
La service role key de Supabase es un secreto de alto privilegio.
Con ella se puede:
- saltar RLS en operaciones administrativas
- leer y escribir datos sensibles
- ejecutar procesos de backend con privilegios elevados sobre la base

Conclusión:
**la key debe tratarse como comprometida y debe rotarse.**

## Inventario de exposición confirmado
### Shell history
- `/home/ubuntu/.bash_history`

### Sesiones OpenClaw
- `4182e3ea-ad00-4de5-ad1c-1ebc1b7d642e.jsonl`
- `c952f4ff-85d4-4062-a9f4-cd224c7c6fcb.jsonl`
- `e77e9331-acea-468d-9d3e-c99bafcc46d1.jsonl`
- `fc7b385d-fb65-4637-8697-97c1c9e26128.jsonl`
- `f8e42ffd-e7e8-4a2d-8f2d-d72b5828f837.jsonl`
- `5e87ceff-5411-49ad-bbd9-16aca19c9d33.jsonl.reset.2026-04-05T17-11-02.018Z`
- `fb8bb467-d36a-4d78-bbb9-f8b2c8450b39.jsonl`
- `9faca828-f1b6-4ca3-bfd8-37b634079d71.jsonl`
- `3b374f32-2269-40ef-a1d1-b2eb5a4b4868.jsonl`
- `b2e17be5-a922-4482-9373-a9e00cd55f2b.jsonl.reset.2026-04-07T04-00-30.583Z`
- `86711e05-ed42-4de6-972a-a6a5f2079e45.jsonl`
- `bbc393fd-f68a-433e-9bec-d4d9a4ae6268.jsonl`
- `66eae287-63bd-4e90-a7be-b2f3730bbec0.jsonl.reset.2026-04-06T00-20-32.023Z`

## Plan de remediación recomendado

### Paso 1. Rotar inmediatamente la service role key
En Supabase:
- generar una nueva `service_role`
- actualizar el runtime con la nueva key
- invalidar la anterior

No seguir construyendo sobre la key expuesta.

### Paso 2. Reemplazar almacenamiento informal por gestión correcta de secretos
Usar una de estas opciones:
- `.env.local` fuera de git en el host de app
- `EnvironmentFile=` en systemd
- secretos de plataforma de despliegue
- variables de entorno inyectadas al contenedor

### Paso 3. Limpiar rastros locales
Acciones sugeridas:
- depurar `.bash_history`
- eliminar o sanear sesiones OpenClaw que contienen la key
- evitar pegar secretos en prompts, chats o shell interactivo

### Paso 4. Revalidar el entorno
Una vez rotada la key:
- recrear `.env.local` o runtime secret source
- verificar que `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY` y `SUPABASE_SERVICE_ROLE_KEY` estén cargadas correctamente
- correr migraciones y pruebas del pipeline

## Configuración objetivo sugerida
Archivo local no versionado:

```env
NEXT_PUBLIC_SUPABASE_URL=...
NEXT_PUBLIC_SUPABASE_ANON_KEY=...
SUPABASE_SERVICE_ROLE_KEY=...
```

Agregar a `.gitignore` si aplica:
- `.env.local`
- `.env.*.local`
- cualquier archivo operativo de secretos

## Notas operativas
- No exponer el valor de la key en tickets, docs o chats.
- No reutilizar la key previamente comprometida.
- Si hubo despliegues o scripts previos con esa key, revisar logs y accesos si el riesgo lo amerita.
