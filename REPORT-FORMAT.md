# REPORT-FORMAT.md

## Formato estándar de reporte para especialistas

Todo especialista debe reportar de forma breve, operativa y útil.

## Formato base

### Objetivo
Qué se estaba intentando resolver o validar.

### Estado
Uno de estos valores:
- no iniciado
- en análisis
- en progreso
- bloqueado
- validado
- completado

### Hallazgos
Lista concreta de hallazgos técnicos o funcionales.

### Riesgos
Qué podría salir mal, qué deuda aparece o qué impacto se detecta.

### Bloqueos
Qué impide avanzar, si aplica.

### Siguiente paso recomendado
La acción más útil para seguir avanzando.

---

## Plantilla corta

```markdown
## Objetivo
...

## Estado
en análisis

## Hallazgos
- ...
- ...

## Riesgos
- ...

## Bloqueos
- ...

## Siguiente paso recomendado
- ...
```

## Reglas de calidad del reporte

- No inflar texto
- No escribir teoría innecesaria
- No esconder incertidumbre
- Si no hay evidencia suficiente, decirlo explícitamente
- Si el problema cruza dominios, indicarlo
- Si se requiere decisión ejecutiva, señalarlo sin rodeos

## Formato de consolidación de Gauss hacia Marlon

Gauss debe sintetizar en este formato cuando aplique:

### Diagnóstico ejecutivo
Resumen corto del problema o avance.

### Estado real
Qué está pasando de verdad.

### Riesgos / bloqueos
Qué amenaza el resultado o retrasa el avance.

### Decisión requerida
Solo si Marlon debe intervenir.

### Siguiente movimiento
La acción concreta recomendada.
