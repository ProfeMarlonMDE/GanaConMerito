# Módulo temporal web para lectura y descarga de docs

## Objetivo
Exponer una biblioteca web temporal, autenticada y de solo lectura para navegar y descargar archivos Markdown seleccionados de `docs/`.

## Alcance inicial
- índice de documentos
- vista de documento
- descarga de `.md`
- whitelist explícita de archivos
- acceso autenticado

## Rutas iniciales
- `/editorial`
- `/editorial/[slug]`
- `/editorial/download/[slug]`

## Reglas de seguridad
- no exponer rutas arbitrarias
- no permitir traversal (`../`)
- leer solo desde `docs/`
- requerir usuario autenticado

## Implementación inicial creada
- `src/lib/editorial/docs.ts`
- `src/components/editorial/editorial-nav.tsx`
- `src/app/editorial/page.tsx`
- `src/app/editorial/[slug]/page.tsx`
- `src/app/editorial/download/[slug]/route.ts`

## Evolución posible
1. render Markdown más rico
2. búsqueda
3. feature flag
4. filtro por categorías
5. restricción admin
6. evolución hacia `/admin/editorial/*`
