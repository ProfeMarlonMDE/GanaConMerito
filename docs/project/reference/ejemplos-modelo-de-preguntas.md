# Ejemplos modelo de preguntas para GanaConMerito

## Objetivo

Proveer ejemplos completos y consistentes de preguntas alineadas con:
- el modelo editorial del proyecto
- la estructura Markdown actual
- la taxonomía recomendada

Estos ejemplos sirven como:
- referencia de redacción
- patrón de frontmatter
- patrón de secciones
- base para nuevos autores del banco

---

# Ejemplo 1 — Matemáticas

```md
---
id: item-mat-0001
slug: matematicas-pensamiento-numerico-001
title: Interpretación de patrones numéricos
area: matematicas
subarea: pensamiento_numerico
examType: docente
competency: razonamiento_cuantitativo
difficulty: 0.35
targetLevel: basico
itemType: multiple_choice
normativeRefs: []
published: true
version: 1
---

## Enunciado
En una secuencia 2, 5, 11, 23, ? cada término se obtiene multiplicando por 2 y sumando 1. ¿Cuál es el siguiente término?

## Opciones
- A. 35
- B. 45
- C. 46
- D. 47

## RespuestaCorrecta
D

## Explicacion
La opción correcta es D porque 23 * 2 + 1 = 47.

## ErroresFrecuentes
- Aplicar una diferencia constante inexistente
- Ignorar la regla multiplicar por 2 y sumar 1
```

---

# Ejemplo 2 — Pedagogía

```md
---
id: item-ped-0001
slug: pedagogia-evaluacion-formativa-001
title: Uso pedagógico de la evaluación formativa
area: pedagogia
subarea: evaluacion_del_aprendizaje
examType: docente
competency: evaluacion_formativa
difficulty: 0.42
targetLevel: intermedio
itemType: multiple_choice
normativeRefs: []
published: true
version: 1
---

## Enunciado
Una docente identifica que varios estudiantes cometen el mismo error al resolver una actividad. ¿Cuál de las siguientes acciones corresponde mejor a un uso formativo de la evaluación?

## Opciones
- A. Registrar la nota final y continuar con el siguiente tema
- B. Repetir exactamente la misma explicación sin analizar el error
- C. Analizar el error, retroalimentar y ajustar la enseñanza
- D. Solicitar una nueva tarea sin discutir resultados previos

## RespuestaCorrecta
C

## Explicacion
La evaluación formativa usa la información del desempeño para retroalimentar y ajustar la enseñanza, no solo para calificar.

## ErroresFrecuentes
- Confundir evaluación formativa con calificación final
- Pensar que retroalimentar es repetir la explicación sin diagnóstico
```

---

# Ejemplo 3 — Normatividad

```md
---
id: item-nor-0001
slug: normatividad-convivencia-escolar-001
title: Aplicación del marco de convivencia escolar
area: normatividad
subarea: convivencia_escolar
examType: docente
competency: interpretacion_normativa
difficulty: 0.48
targetLevel: intermedio
itemType: multiple_choice
normativeRefs:
  - ley_1098
  - decreto_1075
published: true
version: 1
---

## Enunciado
Ante una situación reiterada de agresión entre estudiantes, ¿cuál debe ser el criterio principal de actuación institucional según el enfoque de convivencia escolar y protección integral?

## Opciones
- A. Sancionar de inmediato sin escuchar a las partes
- B. Ocultar el caso para proteger la imagen institucional
- C. Activar la ruta correspondiente, proteger derechos y documentar el caso
- D. Esperar a que el conflicto desaparezca por sí solo

## RespuestaCorrecta
C

## Explicacion
El manejo institucional debe proteger derechos, activar rutas y asegurar debido proceso y registro del caso.

## ErroresFrecuentes
- Reducir la respuesta a castigo automático
- Ignorar la activación de rutas institucionales
- Priorizar la imagen institucional sobre los derechos del estudiante
```

---

# Ejemplo 4 — Gestión

```md
---
id: item-ges-0001
slug: gestion-planeacion-institucional-001
title: Priorización en planeación institucional
area: gestion
subarea: planeacion_institucional
examType: docente
competency: planeacion_estrategica
difficulty: 0.50
targetLevel: intermedio
itemType: multiple_choice
normativeRefs: []
published: true
version: 1
---

## Enunciado
Un equipo directivo revisa resultados académicos, convivencia y asistencia para definir el plan de mejoramiento. ¿Qué criterio fortalece más la toma de decisiones institucionales?

## Opciones
- A. Escoger acciones según intuición del rector
- B. Priorizar únicamente lo más visible para la comunidad
- C. Analizar evidencias, definir metas y hacer seguimiento con indicadores
- D. Repetir exactamente el plan del año anterior

## RespuestaCorrecta
C

## Explicacion
La gestión institucional sólida se apoya en evidencia, metas verificables y seguimiento estructurado.

## ErroresFrecuentes
- Confundir liderazgo con decisión unilateral
- Repetir planes sin análisis del contexto actual
```

---

# Ejemplo 5 — Lectura crítica

```md
---
id: item-lec-0001
slug: lectura_critica-inferencia-textual-001
title: Inferencia a partir de un texto argumentativo
area: lectura_critica
subarea: inferencia_textual
examType: docente
competency: inferencia
difficulty: 0.40
targetLevel: basico
itemType: multiple_choice
normativeRefs: []
published: true
version: 1
---

## Enunciado
Un texto sostiene que aumentar el tiempo de clase no garantiza mejores aprendizajes si no cambian las prácticas pedagógicas. ¿Qué se puede inferir correctamente?

## Opciones
- A. Todo aumento de tiempo escolar es inútil
- B. El aprendizaje depende únicamente del tiempo de clase
- C. El tiempo por sí solo no asegura mejora sin transformación pedagógica
- D. Las prácticas pedagógicas no tienen relación con el aprendizaje

## RespuestaCorrecta
C

## Explicacion
La inferencia correcta conserva el sentido del argumento: el tiempo puede influir, pero no basta sin cambios pedagógicos.

## ErroresFrecuentes
- Llevar el argumento a un extremo absoluto
- Ignorar la relación entre tiempo y prácticas pedagógicas
```

---

# Ejemplo 6 — Competencias ciudadanas

```md
---
id: item-ciu-0001
slug: competencias_ciudadanas-resolucion_de_conflictos-001
title: Manejo dialogado del conflicto escolar
area: competencias_ciudadanas
subarea: resolucion_de_conflictos
examType: docente
competency: resolucion_dialogica
difficulty: 0.44
targetLevel: intermedio
itemType: multiple_choice
normativeRefs: []
published: true
version: 1
---

## Enunciado
Dos estudiantes tienen un conflicto que está afectando al grupo. ¿Qué acción promueve mejor una competencia ciudadana en el aula?

## Opciones
- A. Exponer públicamente a uno de ellos para dar ejemplo
- B. Facilitar el diálogo, escuchar perspectivas y construir acuerdos
- C. Ignorar la situación para no interrumpir la clase
- D. Imponer una solución sin escuchar a ninguno

## RespuestaCorrecta
B

## Explicacion
La competencia ciudadana se fortalece al promover diálogo, escucha, reconocimiento de perspectivas y acuerdos.

## ErroresFrecuentes
- Confundir autoridad con imposición unilateral
- Considerar que evitar el conflicto es mejor que tramitarlo
```

---

# Ejemplo 7 — Pedagogía basada en caso

```md
---
id: item-ped-0002
slug: pedagogia-planeacion-de-aula-001
title: Ajuste de planeación según evidencias del grupo
area: pedagogia
subarea: planeacion_de_aula
examType: docente
competency: planeacion_pedagogica
difficulty: 0.53
targetLevel: intermedio
itemType: multiple_choice
normativeRefs: []
published: true
version: 1
---

## Enunciado
Durante la segunda semana de clase, un docente observa que su planeación inicial sobreestima el ritmo de aprendizaje del grupo. ¿Cuál es la mejor decisión pedagógica?

## Opciones
- A. Mantener intacta la planeación para no perder tiempo
- B. Ajustar la planeación con base en la evidencia recogida del grupo
- C. Reducir el nivel de exigencia sin revisar objetivos
- D. Culpar al grupo por no adaptarse a la planeación

## RespuestaCorrecta
B

## Explicacion
La planeación pedagógica debe ser flexible y basada en evidencia del grupo, manteniendo propósito y ajuste contextual.

## ErroresFrecuentes
- Entender la planeación como un guion rígido
- Reducir expectativas sin análisis pedagógico
```

---

# Ejemplo 8 — Normatividad basada en decisión

```md
---
id: item-nor-0002
slug: normatividad-funcion-docente-001
title: Responsabilidad profesional en la función docente
area: normatividad
subarea: funcion_docente
examType: docente
competency: aplicacion_del_marco_legal
difficulty: 0.55
targetLevel: intermedio
itemType: multiple_choice
normativeRefs:
  - decreto_1075
published: true
version: 1
---

## Enunciado
Un docente enfrenta una situación que requiere actuación institucional y registro formal. ¿Cuál es la respuesta más ajustada a la función docente y al marco regulatorio?

## Opciones
- A. Resolver el asunto de manera informal sin dejar evidencia
- B. Actuar según procedimiento institucional y dejar registro verificable
- C. Delegar toda responsabilidad a los estudiantes involucrados
- D. Esperar a que otro docente asuma el caso

## RespuestaCorrecta
B

## Explicacion
La función docente implica actuación responsable, articulada al procedimiento institucional y con trazabilidad.

## ErroresFrecuentes
- Informalidad frente a asuntos que exigen ruta institucional
- Desentenderse de obligaciones funcionales
```

---

# Ejemplo 9 — Gestión con indicadores

```md
---
id: item-ges-0002
slug: gestion-uso-de-indicadores-001
title: Lectura de indicadores para la mejora
area: gestion
subarea: uso_de_indicadores
examType: docente
competency: lectura_de_indicadores
difficulty: 0.58
targetLevel: avanzado
itemType: multiple_choice
normativeRefs: []
published: true
version: 1
---

## Enunciado
Una institución tiene buenos resultados académicos, pero alta inasistencia y reportes de convivencia en aumento. ¿Cuál es la lectura más adecuada?

## Opciones
- A. Los resultados académicos bastan para afirmar que no hay problema
- B. Solo debe atenderse la variable con peor indicador
- C. Es necesario leer el conjunto de indicadores para orientar decisiones integrales
- D. La convivencia no tiene relación con la gestión institucional

## RespuestaCorrecta
C

## Explicacion
La gestión institucional exige lectura integrada de indicadores; un buen resultado parcial no elimina riesgos en otras dimensiones.

## ErroresFrecuentes
- Interpretar un indicador de forma aislada
- Reducir la gestión a una sola variable de desempeño
```

---

# Ejemplo 10 — Lectura crítica aplicada a política educativa

```md
---
id: item-lec-0002
slug: lectura_critica-analisis_argumentativo-001
title: Evaluación de una postura sobre política educativa
area: lectura_critica
subarea: analisis_argumentativo
examType: docente
competency: analisis_argumentativo
difficulty: 0.52
targetLevel: intermedio
itemType: multiple_choice
normativeRefs: []
published: true
version: 1
---

## Enunciado
Un autor afirma que introducir tecnología en el aula mejora automáticamente el aprendizaje. ¿Cuál es la mejor evaluación crítica de esa postura?

## Opciones
- A. Es válida porque toda innovación tecnológica produce aprendizaje
- B. Es débil porque asume causalidad automática sin considerar mediación pedagógica
- C. Es correcta si los estudiantes usan cualquier dispositivo
- D. Es incuestionable porque la tecnología es moderna

## RespuestaCorrecta
B

## Explicacion
La postura es débil porque presupone un efecto automático e ignora variables como diseño didáctico, uso pedagógico y contexto.

## ErroresFrecuentes
- confundir innovación con efectividad
- aceptar la tesis por intuición tecnológica sin examinar su argumento
```

---

# Recomendación final de uso

Usa estos ejemplos como:
- patrón de redacción
- patrón de metadatos
- patrón de dificultad editorial
- patrón de explicación y distractores

No los copies mecánicamente; úsalos como guía para mantener coherencia en todo el banco.
