# Fix de rutas runtime para `/editorial`

## Problema
El módulo `/editorial` estaba leyendo archivos desde una ruta absoluta fija del workspace de OpenClaw.

Ejemplo histórico de ruta rígida:
- `/home/node/.openclaw/workspace/docs/...`

Ese patrón funcionaba en un workspace/local anterior, pero falla cuando cambia la raíz real del proyecto en runtime.

En la topología actual del host, la app vive en:
- `/opt/gcm/app`

Y el principio correcto ya no es depender de una ruta absoluta histórica, sino de la raíz real del proceso.

## Corrección aplicada
Se reemplazó la raíz hardcodeada por:

```ts
const PROJECT_ROOT = process.cwd();
const DOCS_ROOT = path.join(PROJECT_ROOT, "docs");
```

## Resultado esperado
- en cualquier entorno: lee desde `process.cwd()/docs`
- en la topología actual del VPS: resuelve contra `/opt/gcm/app/docs`
- si el proyecto cambia de ruta en el host, el módulo sigue funcionando mientras `docs/` exista dentro de la raíz real del repo

## Impacto
Corrige lectura online y descarga de archivos del módulo `/editorial` sin acoplarlo a rutas históricas del workspace o a una ruta fija de despliegue anterior.
