# Modelo de contenido

## Fuente canónica

Los ítems se modelan en Markdown con frontmatter.

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

## Relación con la base de datos

- `item_bank` guarda el ítem principal
- `item_options` guarda las opciones A-D

## Estado actual

- ya existe validador básico de opciones en:
  - `src/domain/content/validate-item.ts`
- todavía falta parser Markdown real y carga persistente
