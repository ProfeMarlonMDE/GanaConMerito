# Taxonomía y nomenclatura del banco de preguntas

## Objetivo

Definir una convención consistente para:
- nombrar ítems
- construir slugs
- clasificar áreas
- clasificar subáreas
- clasificar competencias
- evitar desorden editorial en el banco de preguntas

Este documento complementa:
- `docs/project/reference/plantillas-y-estructura-de-preguntas.md`

---

# 1. Principio general

## Regla principal

La taxonomía del banco debe ser:
- estable
- legible
- reusable
- suficientemente específica para filtrar
- suficientemente simple para no fragmentar el banco artificialmente

## Prioridad de clasificación

1. **Área**
2. **Subárea**
3. **Competencia**
4. **Dificultad / nivel**
5. **Tipo de examen**
6. **Etiquetas futuras** (cargo, convocatoria, entidad, etc.)

---

# 2. Nomenclatura del `id`

## Propósito

El `id` es la identidad editorial estable.

## Reglas
- no debe depender del título
- no debe depender del slug
- no debe cambiar cuando el texto mejora
- debe ser único
- conviene que sea corto y secuencial

## Formato recomendado

```text
item-doc-001
item-doc-002
item-doc-003
```

## Variante por área (opcional)
Si quieres mayor legibilidad editorial:

```text
item-ped-0001
item-nor-0001
item-mat-0001
item-ges-0001
```

## Recomendación
Si el banco crecerá mucho, usar prefijo por área ayuda.

---

# 3. Nomenclatura del `slug`

## Propósito

El `slug` es el identificador funcional y humano.

## Regla general
Debe expresar al menos:
- área
- subtema o foco
- consecutivo

## Formato recomendado

```text
<area>-<subtema>-<consecutivo>
```

### Ejemplos
```text
pedagogia-evaluacion-formativa-001
normatividad-convivencia-escolar-001
matematicas-pensamiento-numerico-001
gestion-planeacion-institucional-001
lectura_critica-inferencia-textual-001
```

## Reglas de estilo del slug
- solo minúsculas
- usar guiones medios para separar segmentos
- evitar tildes, ñ y caracteres especiales
- no meter demasiados detalles
- debe ser identificable pero no excesivamente largo

## No recomendado
```text
docente-convocatoria-territorial-2026-pregunta-larga-que-explica-demasiado
```

---

# 4. Taxonomía sugerida de áreas

## Áreas ya alineadas con el modelo actual

```text
matematicas
pedagogia
normatividad
gestion
lectura_critica
competencias_ciudadanas
```

## Definición breve por área

### `matematicas`
Preguntas sobre razonamiento cuantitativo, pensamiento numérico, algebraico, geométrico, variacional o análisis de información.

### `pedagogia`
Preguntas sobre didáctica, evaluación, currículo, planeación, aprendizaje, mediación, inclusión y práctica pedagógica.

### `normatividad`
Preguntas sobre marco legal, reglamentario y normativo del sector educativo.

### `gestion`
Preguntas sobre organización, planeación institucional, liderazgo, procesos, seguimiento y gestión escolar.

### `lectura_critica`
Preguntas sobre comprensión, inferencia, interpretación, análisis argumentativo y lectura de información compleja.

### `competencias_ciudadanas`
Preguntas sobre convivencia, participación, ética pública, resolución de conflictos, ciudadanía y clima escolar.

---

# 5. Taxonomía sugerida de subáreas

## 5.1 `matematicas`

Subáreas sugeridas:
- `pensamiento_numerico`
- `pensamiento_algebraico`
- `pensamiento_variacional`
- `pensamiento_aleatorio`
- `pensamiento_espacial`
- `resolucion_de_problemas`

## 5.2 `pedagogia`

Subáreas sugeridas:
- `didactica`
- `evaluacion_del_aprendizaje`
- `planeacion_de_aula`
- `curriculo`
- `inclusion`
- `ambientes_de_aprendizaje`
- `estrategias_pedagogicas`
- `mediacion_pedagogica`

## 5.3 `normatividad`

Subáreas sugeridas:
- `convivencia_escolar`
- `derechos_de_los_ninos`
- `manual_de_convivencia`
- `organizacion_del_servicio_educativo`
- `funcion_docente`
- `inclusion_y_atencion_a_la_diversidad`
- `evaluacion_normativa`

## 5.4 `gestion`

Subáreas sugeridas:
- `planeacion_institucional`
- `gestion_academica`
- `gestion_directiva`
- `gestion_comunitaria`
- `seguimiento_y_mejora`
- `uso_de_indicadores`
- `liderazgo_escolar`

## 5.5 `lectura_critica`

Subáreas sugeridas:
- `comprension_literal`
- `inferencia_textual`
- `analisis_argumentativo`
- `proposito_comunicativo`
- `estructura_textual`
- `evaluacion_de_fuentes`

## 5.6 `competencias_ciudadanas`

Subáreas sugeridas:
- `convivencia`
- `participacion`
- `resolucion_de_conflictos`
- `pluralidad_y_diversidad`
- `toma_de_perspectiva`
- `responsabilidad_democratica`

---

# 6. Taxonomía sugerida de competencias

## Regla

Las competencias deben nombrar la capacidad que se evalúa, no solo el tema.

## Ejemplos por área

### Matemáticas
- `razonamiento_cuantitativo`
- `interpretacion_de_patrones`
- `resolucion_de_problemas`
- `analisis_de_datos`

### Pedagogía
- `planeacion_pedagogica`
- `evaluacion_formativa`
- `diseno_de_estrategias`
- `toma_de_decisiones_didacticas`
- `atencion_a_la_diversidad`

### Normatividad
- `interpretacion_normativa`
- `aplicacion_del_marco_legal`
- `juicio_regulatorio`

### Gestión
- `analisis_de_gestion`
- `toma_de_decisiones_institucionales`
- `lectura_de_indicadores`
- `planeacion_estrategica`

### Lectura crítica
- `inferencia`
- `analisis_argumentativo`
- `interpretacion_textual`
- `evaluacion_de_informacion`

### Competencias ciudadanas
- `juicio_etico`
- `resolucion_dialogica`
- `convivencia_democratica`
- `toma_de_perspectiva`

---

# 7. Convención para consecutivos

## Recomendación
Usar consecutivos de tres dígitos.

### Ejemplo
```text
001
002
003
```

## Beneficio
- orden consistente
- crecimiento previsible
- fácil lectura en listados

---

# 8. Ejemplos completos de nomenclatura

## Ejemplo 1
```yaml
id: item-ped-0007
slug: pedagogia-evaluacion-formativa-001
title: Uso pedagógico de la evaluación formativa
area: pedagogia
subarea: evaluacion_del_aprendizaje
competency: evaluacion_formativa
```

## Ejemplo 2
```yaml
id: item-nor-0003
slug: normatividad-convivencia-escolar-001
title: Aplicación del marco de convivencia escolar
area: normatividad
subarea: convivencia_escolar
competency: interpretacion_normativa
```

## Ejemplo 3
```yaml
id: item-mat-0012
slug: matematicas-pensamiento-numerico-002
title: Interpretación de patrones numéricos
area: matematicas
subarea: pensamiento_numerico
competency: razonamiento_cuantitativo
```

---

# 9. Qué evitar en la taxonomía

## No conviene
- usar nombres distintos para la misma idea
- mezclar tema con competencia sin criterio
- inventar subáreas nuevas para cada pregunta
- clasificar por convocatoria como estructura base
- clasificar por cargo como estructura primaria
- usar slugs largos e inestables

## Ejemplos de mala práctica
- `pedagogia1`
- `didactica2`
- `pregunta_docente_001`
- `leyes-y-normas-importantes-001`
- `competencia_general`

---

# 10. Estructura sugerida de carpetas

## Estructura recomendada actual

```text
content/items/
  matematicas/
  pedagogia/
  normatividad/
  gestion/
  lectura_critica/
  competencias_ciudadanas/
```

## Recomendación adicional
No hace falta crear subcarpetas por subárea todavía si el volumen es pequeño.

Cuando el banco crezca, puedes pasar a:

```text
content/items/
  pedagogia/
    evaluacion_del_aprendizaje/
    planeacion_de_aula/
  normatividad/
    convivencia_escolar/
    funcion_docente/
```

---

# 11. Estructura de metadatos recomendada a futuro

Si luego quieres introducir segmentación más rica, agrega campos adicionales, pero **sin romper el eje principal**.

## Campos futuros opcionales
- `targetRole`
- `targetPosition`
- `applicantProfile`
- `institutionType`
- `territorialContext`
- `callType`
- `tags`

## Regla
Esos campos deben ser secundarios, no la base organizativa del banco.

---

# 12. Recomendación final

## Organiza así

### Base del banco
- área
- subárea
- competencia

### Afinamiento
- dificultad
- nivel objetivo
- tipo de examen

### Segmentación futura
- cargo
- aspirante
- convocatoria
- entidad

## Decisión editorial recomendada

**Primero construye un banco cognitivamente sólido.**

Después, si hace falta, agregas capas de clasificación por rol, aspirante o convocatoria.
