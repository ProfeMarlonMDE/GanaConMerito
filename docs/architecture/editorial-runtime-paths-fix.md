# Fix de rutas runtime para `/editorial`

## Problema
El módulo `/editorial` estaba leyendo archivos desde una ruta absoluta fija del workspace de OpenClaw:

- `/home/node/.openclaw/workspace/docs/...`

Eso funcionaba en el workspace, pero fallaba en producción porque la app corre desde:

- `/var/www/cnsc`

## Corrección aplicada
Se reemplazó la raíz hardcodeada por:

```ts
const PROJECT_ROOT = process.cwd();
const DOCS_ROOT = path.join(PROJECT_ROOT, "docs");
```

## Resultado esperado
- en workspace: lee desde el repo actual del workspace
- en VPS productivo: lee desde `/var/www/cnsc/docs`

## Impacto
Corrige lectura online y descarga de archivos del módulo `/editorial` en producción, siempre que los archivos existan en el repo desplegado.
