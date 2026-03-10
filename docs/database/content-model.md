# Modelo de contenido

## Fuente canónica

Los ítems se modelan en Markdown con frontmatter.

## Identidad canónica

Se adopta este criterio:
- `id` del Markdown = `content_id` editorial estable
- `slug` = identificador funcional y humano legible
- `id` UUID DB = identificador interno persistente

## Campos canónicos principales

- `id`
- `slug`
- `title`
- `area`
- `subarea`
- `examType`
- `competency`
- `difficulty`
- `targetLevel`
- `itemType`
- `normativeRefs`
- `published`
- `version`

## Secciones mínimas

- `Enunciado`
- `Opciones`
- `RespuestaCorrecta`
- `Explicacion`
- `ErroresFrecuentes` (recomendado)

## Reglas editoriales

- frontmatter obligatorio
- `difficulty` entre `0` y `1`
- exactamente 4 opciones
- una sola correcta
- opciones no vacías
- warning si hay textos duplicados o casi duplicados
- en esta fase, **no se admiten opciones multilínea**

## Relación con la base de datos

- `item_bank` guarda el ítem principal
- `item_bank.content_id` preserva el `id` editorial del Markdown
- `item_options` guarda las opciones A-D

## Persistencia

La persistencia de contenido ahora se resuelve de forma atómica mediante la función SQL:
- `public.upsert_content_item(...)`

Esa función:
- inserta/actualiza `item_bank`
- reescribe `item_options`
- devuelve `item_id` y `item_version`

## Estado actual

Ya existe:
- validador básico de opciones en `src/domain/content/validate-item.ts`
- parser real Markdown en `src/domain/content/parse-md.ts`
- endpoint real de validación en `src/app/api/content/validate/route.ts`
- endpoint de carga persistente en `src/app/api/content/upload/route.ts`
- importador real por archivos en `src/domain/content/import-from-file.ts`

## Observación

Las referencias normativas aún se conservan en `normativeRefs` dentro del ítem. La persistencia estructurada de normativa queda como evolución posterior.
