# Checklist de validación editorial antes de subir preguntas al banco

## Objetivo

Definir una lista de control práctica para revisar cada pregunta antes de:
- validarla
- importarla
- publicarla
- usarla en producción

Este checklist busca evitar:
- inconsistencias de metadatos
- errores de redacción
- mala calidad de distractores
- ítems ambiguos
- problemas de clasificación
- contenido que falle al importarse

---

# 1. Checklist mínimo obligatorio

## 1.1 Identidad y metadatos
- [ ] El `id` existe y es único
- [ ] El `slug` existe y es único
- [ ] El `title` describe bien el ítem
- [ ] El `area` es válida dentro del dominio del proyecto
- [ ] La `subarea` es coherente con el área
- [ ] La `competency` está claramente definida
- [ ] `examType` está definido
- [ ] `difficulty` está entre `0.00` y `1.00`
- [ ] `targetLevel` está definido cuando aporta valor
- [ ] `itemType` es válido
- [ ] `published` está definido
- [ ] `version` está definida

---

## 1.2 Estructura del cuerpo
- [ ] Existe sección `Enunciado`
- [ ] Existe sección `Opciones`
- [ ] Existe sección `RespuestaCorrecta`
- [ ] Existe sección `Explicacion`
- [ ] La sección `ErroresFrecuentes` está incluida o se justificó su ausencia

---

## 1.3 Opciones
- [ ] Hay exactamente 4 opciones
- [ ] Las opciones están identificadas como `A`, `B`, `C`, `D`
- [ ] No hay opciones vacías
- [ ] No hay opciones duplicadas
- [ ] La respuesta correcta sí corresponde a una opción existente
- [ ] Solo hay una respuesta correcta

---

# 2. Checklist de calidad del enunciado

## 2.1 Claridad
- [ ] El enunciado se entiende en una sola lectura
- [ ] No tiene ambigüedad innecesaria
- [ ] No mezcla dos problemas distintos en la misma pregunta
- [ ] Tiene suficiente contexto para responder
- [ ] No tiene ruido irrelevante

## 2.2 Pertinencia
- [ ] El enunciado realmente evalúa la competencia declarada
- [ ] La subárea y la competencia coinciden con el problema planteado
- [ ] El nivel de dificultad parece coherente con el tipo de razonamiento exigido

## 2.3 Redacción
- [ ] No tiene errores ortográficos graves
- [ ] No tiene tildes o signos omitidos que cambien sentido
- [ ] No tiene frases enredadas o demasiado largas
- [ ] No tiene pistas accidentales hacia la respuesta correcta

---

# 3. Checklist de calidad de las opciones

## 3.1 Distractores
- [ ] Los distractores son plausibles
- [ ] Los distractores representan errores razonables
- [ ] Ningún distractor es absurdamente débil
- [ ] Ninguna opción destaca demasiado por longitud, tono o estructura

## 3.2 Equilibrio
- [ ] Las cuatro opciones tienen formato homogéneo
- [ ] La opción correcta no se delata por estar mejor escrita que las demás
- [ ] La correcta no es sistemáticamente la más larga o más precisa por estilo

## 3.3 Honestidad cognitiva
- [ ] La pregunta no puede resolverse por descarte superficial solamente
- [ ] La pregunta obliga a comprender, inferir, aplicar o decidir

---

# 4. Checklist de explicación

- [ ] La explicación dice por qué la correcta es correcta
- [ ] No se limita a repetir la letra correcta
- [ ] Ayuda al aprendizaje del usuario
- [ ] Si aplica, muestra el criterio conceptual, procedimental o normativo
- [ ] Si aplica, deja claro por qué los distractores son errores comunes

---

# 5. Checklist de errores frecuentes

- [ ] Los errores frecuentes están redactados como fallos plausibles del aspirante
- [ ] Son coherentes con los distractores planteados
- [ ] Sirven para mejorar retroalimentación futura
- [ ] No son obviedades vacías

---

# 6. Checklist normativo (solo si aplica)

- [ ] `normativeRefs` está definido
- [ ] Las referencias normativas son pertinentes al caso
- [ ] La explicación no contradice la norma citada
- [ ] La pregunta evalúa interpretación o aplicación, no solo memoria superficial de nombre de ley

---

# 7. Checklist de clasificación editorial

- [ ] El ítem está ubicado en el área correcta
- [ ] La subárea es suficientemente específica, pero no artificial
- [ ] La competencia está nombrada como capacidad evaluada, no solo como tema
- [ ] El slug sigue la convención recomendada
- [ ] El ítem no quedó clasificado por cargo o aspirante como eje principal

---

# 8. Checklist técnico antes de importación

- [ ] El Markdown tiene frontmatter válido
- [ ] No hay campos obligatorios faltantes
- [ ] Las opciones no son multilínea si el sistema actual no las soporta
- [ ] `difficulty` está en formato numérico válido
- [ ] `RespuestaCorrecta` es una letra válida (`A`, `B`, `C`, `D`)
- [ ] El archivo pasa validación del parser sin errores

---

# 9. Checklist antes de publicación

- [ ] La pregunta fue revisada editorialmente
- [ ] La dificultad parece razonable frente a otros ítems similares
- [ ] La competencia está bien asignada
- [ ] La explicación es suficientemente útil para feedback
- [ ] El ítem no contiene sesgos o formulaciones problemáticas evitables
- [ ] El contenido ya está listo para marcarse como `published: true`

---

# 10. Semáforo de decisión editorial

## Publicar
Publicar si:
- cumple checklist obligatorio
- cumple calidad mínima de enunciado, opciones y explicación
- pasa validación técnica

## Corregir
Corregir si:
- hay ambigüedad
- distractores débiles
- metadatos dudosos
- clasificación discutible
- explicación pobre

## Rechazar
Rechazar si:
- no evalúa claramente una competencia
- tiene más de una respuesta plausible sin justificación suficiente
- contradice norma o criterio técnico
- no puede importarse correctamente
- depende de información confusa o insuficiente

---

# 11. Recomendación operativa

## Flujo sugerido por pregunta

1. redacción inicial
2. revisión editorial
3. revisión técnica de estructura
4. validación del parser
5. corrección final
6. publicación/importación

## Regla simple

**No publicar una pregunta solo porque “parece buena”.**

Debe cumplir:
- calidad editorial
- coherencia taxonómica
- validez técnica
- utilidad formativa
