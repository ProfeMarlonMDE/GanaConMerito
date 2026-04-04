# REPORT-FORMAT.md

## Formato estándar de reporte para especialistas

Todo especialista debe reportar de forma breve, operativa, verificable y útil.

El reporte no existe para sonar técnico. Existe para dejar claro:
- qué se revisó,
- qué se encontró,
- qué riesgo existe,
- qué impide avanzar,
- y cuál es la siguiente acción correcta.

Regla central:
No responder con teoría suelta ni con opiniones vagas. Reportar con evidencia, criterio e implicación operativa.

---

## Formato base obligatorio

### Objetivo
Qué se estaba intentando resolver, validar o decidir.

### Estado
Usar solo uno de estos valores:
- no iniciado
- en análisis
- en progreso
- bloqueado
- validado
- completado

### Hallazgos
Lista concreta de hallazgos técnicos, funcionales u operativos.

Reglas para Hallazgos:
- Separar hechos observados de hipótesis cuando aplique.
- No mezclar hallazgo con recomendación.
- Ser específico: componente, flujo, contrato, migración, entorno o síntoma.

### Riesgos
Qué podría salir mal, qué deuda aparece o qué impacto se detecta.

Reglas para Riesgos:
- Indicar impacto real, no genérico.
- Si no hay riesgo relevante, decir `sin riesgo material identificado por ahora`.
- Si el riesgo depende de una hipótesis, decirlo.

### Bloqueos
Qué impide avanzar ahora mismo, si aplica.

Reglas para Bloqueos:
- Si no existe bloqueo, escribir `sin bloqueo actual`.
- Si el bloqueo depende de otro frente, nombrarlo.
- Si falta una decisión, indicar exactamente cuál.

### Siguiente paso recomendado
La acción más útil para seguir avanzando.

Reglas para Siguiente paso recomendado:
- Debe ser una acción concreta.
- Debe priorizar destrabar o reducir riesgo.
- Si requiere delegación o escalamiento, decir a quién.

### Escalamiento
Indicar una de estas opciones:
- no requiere escalamiento
- escalar a otro especialista
- escalar a Gauss
- escalar a Marlon

Si aplica escalamiento, indicar motivo en una línea.

---

## Plantilla corta obligatoria

```markdown
## Objetivo
...

## Estado
en análisis

## Hallazgos
- Hecho observado: ...
- Hipótesis: ...

## Riesgos
- ...

## Bloqueos
- ...

## Siguiente paso recomendado
- ...

## Escalamiento
- no requiere escalamiento
```

---

## Reglas de calidad del reporte

### 1. Claridad brutal
- No inflar texto.
- No escribir teoría innecesaria.
- No usar frases vacías como “se recomienda evaluar”.
- Si hay una recomendación, decir qué se debe hacer.

### 2. Diferenciar certeza de sospecha
- Si algo está confirmado, decirlo.
- Si es hipótesis, marcarlo como hipótesis.
- Si falta evidencia, decirlo explícitamente.

### 3. Hablar en impacto
- No limitarse a describir el fallo.
- Explicar por qué importa: seguridad, UX, consistencia, datos, operación, roadmap o mantenimiento.

### 4. No esconder bordes del dominio
- Si el problema cruza dominios, indicarlo.
- Si el caso pertenece más a otro especialista, decirlo sin rodeos.
- Si se requiere decisión ejecutiva, señalarlo explícitamente.

### 5. Evitar pseudoavance
No presentar como avance alguno de estos casos:
- solo se leyó contexto pero no hay conclusión útil,
- se intuye el problema pero no hay evidencia,
- se propone trabajo sin aislar primero el bloqueo real.

---

## Qué se considera un buen reporte

Un buen reporte permite que Gauss o Marlon entiendan rápido:
- la situación real,
- el nivel de riesgo,
- el bloqueo principal,
- y el siguiente movimiento correcto.

Si después de leer el reporte todavía no está claro qué hacer, el reporte está incompleto.

---

## Formato de consolidación de Gauss hacia Marlon

Cuando Gauss consolide respuestas de especialistas, debe sintetizar en este formato:

### Diagnóstico ejecutivo
Resumen corto del problema, avance o decisión.

### Estado real
Qué está pasando de verdad, sin maquillaje.

### Riesgos / bloqueos
Qué amenaza el resultado o retrasa el avance.

### Decisión requerida
Solo si Marlon debe intervenir. Si no aplica, decir `sin decisión requerida por ahora`.

### Siguiente movimiento
La acción concreta recomendada.

---

## Regla final

Si el especialista no puede decir con honestidad qué está pasando, qué riesgo existe y qué hacer después, todavía no terminó de pensar el caso.
