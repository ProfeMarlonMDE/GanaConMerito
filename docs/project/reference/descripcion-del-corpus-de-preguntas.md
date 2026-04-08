# Descripción del corpus de preguntas

## Objetivo

Definir qué es el corpus de preguntas de GanaConMerito, cómo se estructura, cuáles son sus núcleos temáticos y qué principios deben gobernar su crecimiento.

Este documento sirve como marco conceptual para construir un banco de preguntas consistente, reutilizable y útil para práctica adaptativa.

---

# 1. Qué es el corpus

El corpus de preguntas es el conjunto organizado de ítems evaluativos que alimentan el sistema de práctica, diagnóstico, refuerzo y revisión del proyecto.

No debe entenderse como una colección suelta de preguntas, sino como una **estructura de contenido pedagógico y evaluativo** diseñada para:
- medir competencias
- entrenar razonamiento
- generar retroalimentación
- construir trazabilidad del progreso del usuario

---

# 2. Principio estructural del corpus

## Regla principal

El corpus debe organizarse **por contenido y competencia**, no por listas administrativas de cargos o aspirantes.

## Razón

Porque el valor más estable y reusable del banco está en:
- el área de conocimiento
- la subárea
- la competencia evaluada
- el nivel de dificultad
- el tipo de razonamiento exigido

Mientras que variables como:
- cargo
- aspirante
- convocatoria
- entidad

son útiles, pero deben operar como capas secundarias o filtros posteriores.

---

# 3. Estructura conceptual del corpus

## Nivel 1 — Área
Corresponde al gran dominio temático del ítem.

Áreas actuales del proyecto:
- `matematicas`
- `pedagogia`
- `normatividad`
- `gestion`
- `lectura_critica`
- `competencias_ciudadanas`

## Nivel 2 — Subárea
Especifica el subdominio dentro del área.

Ejemplos:
- `pensamiento_numerico`
- `evaluacion_del_aprendizaje`
- `convivencia_escolar`
- `planeacion_institucional`
- `inferencia_textual`
- `resolucion_de_conflictos`

## Nivel 3 — Competencia
Expresa la capacidad evaluada.

Ejemplos:
- `razonamiento_cuantitativo`
- `planeacion_pedagogica`
- `interpretacion_normativa`
- `lectura_de_indicadores`
- `inferencia`
- `resolucion_dialogica`

## Nivel 4 — Dificultad
Determina la exigencia relativa del ítem dentro del banco.

Escala actual:
- `0.00` a `1.00`

## Nivel 5 — Nivel objetivo
Orienta el tipo de dominio esperado del usuario.

Ejemplos:
- `basico`
- `intermedio`
- `avanzado`

---

# 4. Núcleos temáticos del corpus

## 4.1 Núcleo matemático
Evalúa capacidades de:
- razonamiento cuantitativo
- identificación de patrones
- resolución de problemas
- análisis de relaciones y estructuras

### Subnúcleos sugeridos
- pensamiento numérico
- algebraico
- variacional
- aleatorio
- espacial

---

## 4.2 Núcleo pedagógico
Evalúa capacidades de:
- diseño pedagógico
- evaluación formativa
- planeación de aula
- selección de estrategias didácticas
- atención a la diversidad

### Subnúcleos sugeridos
- didáctica
- evaluación del aprendizaje
- planeación de aula
- currículo
- inclusión
- ambientes de aprendizaje

---

## 4.3 Núcleo normativo
Evalúa capacidades de:
- interpretación normativa
- aplicación del marco legal
- decisiones institucionales ajustadas a norma
- lectura contextual de obligaciones y rutas

### Subnúcleos sugeridos
- convivencia escolar
- función docente
- organización del servicio educativo
- inclusión y derechos
- procedimientos institucionales

---

## 4.4 Núcleo de gestión
Evalúa capacidades de:
- planeación institucional
- lectura de indicadores
- toma de decisiones organizacionales
- seguimiento y mejora
- liderazgo y articulación institucional

### Subnúcleos sugeridos
- gestión directiva
- gestión académica
- gestión comunitaria
- planeación institucional
- seguimiento y mejora

---

## 4.5 Núcleo de lectura crítica
Evalúa capacidades de:
- comprensión e inferencia
- análisis argumentativo
- interpretación textual
- evaluación de información
- lectura de propósito y estructura

### Subnúcleos sugeridos
- comprensión literal
- inferencia textual
- análisis argumentativo
- propósito comunicativo
- evaluación de fuentes

---

## 4.6 Núcleo de competencias ciudadanas
Evalúa capacidades de:
- convivencia
- diálogo
- juicio ético
- resolución de conflictos
- reconocimiento de perspectivas
- participación democrática

### Subnúcleos sugeridos
- convivencia
- resolución de conflictos
- pluralidad y diversidad
- participación
- responsabilidad democrática

---

# 5. Tipos funcionales de preguntas dentro del corpus

Aunque el sistema actual soporta `multiple_choice`, el corpus debe entenderse funcionalmente en varias familias editoriales.

## 5.1 Preguntas conceptuales
Evalúan comprensión de principios, categorías o ideas.

## 5.2 Preguntas basadas en caso
Evalúan análisis situado y toma de decisión contextual.

## 5.3 Preguntas procedimentales
Evalúan reglas, secuencias, operaciones o métodos.

## 5.4 Preguntas normativas
Evalúan interpretación y aplicación del marco regulatorio.

---

# 6. Qué no debe ser el corpus

El corpus no debe convertirse en:
- una lista plana de preguntas sin taxonomía
- un archivo por cargo como eje único
- un banco armado solo por temas vagos
- un conjunto de preguntas memorizables sin valor formativo
- una colección de ítems sin explicación ni trazabilidad

---

# 7. Organización recomendada

## Organización primaria
- área
- subárea
- competencia

## Organización secundaria
- dificultad
- nivel objetivo
- tipo de examen (`examType`)

## Organización terciaria futura
- cargo
- perfil de aspirante
- convocatoria
- entidad
- territorio
- etiquetas temáticas adicionales

---

# 8. Estrategia de crecimiento del corpus

## Etapa 1 — base sólida
Construir un banco pequeño, pero consistente y limpio.

### Prioridades
- claridad editorial
- taxonomía consistente
- distractores plausibles
- explicaciones útiles
- dificultad razonable

## Etapa 2 — cobertura temática
Expandir por:
- áreas
- subáreas
- competencias
- niveles de dificultad

## Etapa 3 — especialización
Agregar capas secundarias como:
- cargo
- convocatoria
- segmento poblacional
- contexto institucional

## Etapa 4 — adaptatividad más rica
Usar el corpus no solo como banco estático, sino como materia prima para:
- selección adaptativa
- retroalimentación diferenciada
- remediación por error frecuente
- analítica por competencia

---

# 9. Recomendación editorial final

## Decisión central

**El corpus debe crecer por competencia y contenido, no por burocracia de convocatoria.**

La convocatoria, el cargo o el aspirante pueden ser filtros útiles después, pero no deben romper la coherencia del banco.

## Fórmula práctica

Construye primero preguntas que respondan a esta lógica:

> área -> subárea -> competencia -> dificultad -> feedback útil

Y solo después añade:

> cargo -> aspirante -> convocatoria -> entidad

---

# 10. Síntesis breve

## El corpus debe ser
- coherente
- reusable
- escalable
- pedagógicamente útil
- técnicamente importable
- analíticamente explotable

## El núcleo del diseño debe estar en
- contenidos
- competencias
- dificultad
- trazabilidad editorial

## El eje de organización recomendado es
- **contenido primero**
- **segmentación administrativa después**
