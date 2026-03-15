# Módulo editorial / biblioteca web del corpus

> Estado: complementado por `docs/architecture/editorial-admin-implementation-plan.md`, que extiende este diseño hacia segmentación por perfil profesional, núcleos temáticos y módulo administrativo `/admin/editorial/*`.


## Objetivo

Diseñar una característica del producto que permita exponer por web la documentación editorial del banco de preguntas, con estas condiciones:

1. debe ser accesible vía web
2. debe poder eliminarse fácilmente si solo se requiere de forma temporal
3. debe poder evolucionar después a un módulo de administración interno
4. debe integrarse de forma limpia con la arquitectura actual de la app

---

# 1. Decisión arquitectónica

## Recomendación

Implementar esta capacidad como un **módulo independiente de biblioteca editorial**, no como páginas sueltas incrustadas sin estructura.

## Nombre sugerido del módulo
- `editorial-library`
- o en español funcional: `biblioteca-editorial`

## Motivo

Porque este bloque tiene identidad propia:
- documenta el corpus
- puede ser público, semiprivado o privado
- puede desaparecer sin romper el núcleo del producto
- puede crecer hacia un panel editorial/admin después

---

# 2. Ubicación en la arquitectura

## Propuesta

Agregar un módulo nuevo dentro del producto web.

### Nivel de app
```text
src/app/editorial/
```

### Nivel documental asociado
```text
docs/project/reference/
```

### Nivel de componentes
```text
src/components/editorial/
```

### Nivel de lectura/renderizado
```text
src/lib/editorial/
```

---

# 3. Fases del módulo

## Fase 1 — Biblioteca web de solo lectura

### Objetivo
Publicar una vista web navegable de los documentos editoriales ya creados.

### Alcance
- índice general
- páginas renderizadas desde markdown local
- navegación por documentos
- acceso simple vía URL

### Documentos a exponer inicialmente
- resumen ejecutivo del corpus
- descripción del corpus
- plantillas y estructura
- taxonomía y nomenclatura
- ejemplos modelo
- checklist editorial

### Rutas sugeridas
```text
/editorial
/editorial/corpus
/editorial/plantillas
/editorial/taxonomia
/editorial/ejemplos
/editorial/checklist
```

### Fuente inicial
Los `.md` ya existentes en:
```text
docs/project/reference/
```

---

## Fase 2 — Biblioteca controlable (activable/desactivable)

### Objetivo
Poder mostrar u ocultar el módulo sin borrar el código.

### Mecanismo sugerido
Feature flag simple por entorno.

### Variable sugerida
```env
ENABLE_EDITORIAL_LIBRARY=true
```

### Comportamiento
- si `true`: las rutas `/editorial/*` existen
- si `false`: responder `404` o redirigir

### Beneficio
- puedes exponerlo temporalmente
- puedes quitarlo sin tocar el núcleo de práctica/auth/dashboard
- puedes usarlo solo en staging o en producción según convenga

---

## Fase 3 — Biblioteca privada

### Objetivo
Restringir acceso solo a usuarios autenticados o admins.

### Opciones
1. solo usuarios autenticados
2. solo `is_admin = true`
3. combinación: lectura privada para equipo editorial

### Recomendación
Si el material es estratégico o interno, este debería ser el estado final mínimo antes del módulo admin.

---

## Fase 4 — Módulo de administración editorial

### Objetivo
Evolucionar la biblioteca a un módulo real de administración.

### Capacidades futuras
- listar ítems
- filtrar por área/subárea/competencia
- ver detalle del item
- validar markdown
- cargar nuevo ítem
- editar borradores
- previsualización
- revisar checklist editorial
- publicar/despublicar
- trazabilidad por versión

### Ruta sugerida
```text
/admin/editorial
```

### Separación recomendada
- `/editorial/*` -> biblioteca / documentación / referencia
- `/admin/editorial/*` -> operaciones de administración

---

# 4. Estructura técnica sugerida

## App routes
```text
src/app/editorial/page.tsx
src/app/editorial/corpus/page.tsx
src/app/editorial/plantillas/page.tsx
src/app/editorial/taxonomia/page.tsx
src/app/editorial/ejemplos/page.tsx
src/app/editorial/checklist/page.tsx
```

## Componentes
```text
src/components/editorial/editorial-layout.tsx
src/components/editorial/editorial-nav.tsx
src/components/editorial/markdown-doc-page.tsx
src/components/editorial/doc-card.tsx
```

## Librería
```text
src/lib/editorial/docs.ts
src/lib/editorial/markdown.ts
```

## Fuente de contenido
Inicialmente:
```text
docs/project/reference/*.md
```

---

# 5. Estrategia de implementación recomendada

## Opción recomendada
Renderizar los `.md` locales del workspace como páginas de solo lectura.

## Beneficios
- cero duplicación de contenido
- los docs siguen siendo la fuente de verdad
- fácil de eliminar después
- fácil de mover luego a `/admin/editorial`

## Cómo hacerlo
Crear un pequeño registro interno tipo:

```ts
[
  {
    slug: "corpus",
    title: "Descripción del corpus",
    filePath: "docs/project/reference/descripcion-del-corpus-de-preguntas.md",
  },
  ...
]
```

Y un renderer Markdown server-side.

---

# 6. Recomendación de acceso

## Fase inicial sugerida
Acceso autenticado, no público abierto.

### Razón
Aunque el contenido es editorial y útil, todavía forma parte del diseño interno del producto.
No conviene asumir desde ya que debe ser público universal.

## Política sugerida
- `/editorial/*` -> requiere login
- luego decidir si:
  - se abre públicamente
  - se deja interno
  - se migra a admin

---

# 7. Criterio de modularidad

Este módulo debe cumplir estas reglas:

## 1. Bajo acoplamiento
No debe romper:
- auth
- práctica
- dashboard
- API de sesiones

## 2. Fuente de verdad única
Los markdown editoriales ya existentes deben seguir siendo la fuente principal.

## 3. Removible
Si decides eliminarlo, debe bastar con:
- desactivar el feature flag
- quitar rutas/components del módulo

## 4. Evolutivo
Debe poder crecer a módulo admin sin rehacer la base.

---

# 8. Recomendación de producto

## Fase inmediata recomendada
Construir primero:
- índice `/editorial`
- 5 páginas server-side renderizadas desde markdown local
- navegación simple
- acceso con login
- feature flag `ENABLE_EDITORIAL_LIBRARY`

Eso da:
- utilidad inmediata
- bajo riesgo
- alta mantenibilidad
- posibilidad real de evolucionar a admin

---

# 9. Decisión sugerida

## Decisión arquitectónica

Implementar una **biblioteca editorial web desacoplada**, de solo lectura en su primera fase, alimentada por los markdown de `docs/project/reference/`, protegida por autenticación y controlada por feature flag, con evolución posterior a módulo de administración en `/admin/editorial`.

---

# 10. Siguiente paso recomendado

## Bloque de implementación sugerido

### Objetivo
Crear el módulo inicial `editorial-library`.

### Primera entrega mínima
- `/editorial`
- navegación interna
- render de los md ya existentes
- feature flag
- guard de autenticación

### Segunda entrega
- endurecer acceso por admin si lo decides
- preparar transición a `/admin/editorial`
