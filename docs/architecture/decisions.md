# Decisiones técnicas cerradas

## 1. Estados persistidos oficiales

Estos son los únicos valores válidos para `sessions.current_state`:

```ts
onboarding | diagnostic | practice | remediation | review | session_close | expired | error
```

## 2. Procesos transversales no persistidos

```ts
evaluating_response | updating_memory | selecting_next_item | generating_feedback
```

## 3. Escala de dificultad

La dificultad oficial del ítem va de `0.00` a `1.00`.

Convención recomendada:
- `0.00 - 0.29` baja
- `0.30 - 0.59` media
- `0.60 - 0.79` alta
- `0.80 - 1.00` muy alta

## 4. Semántica de respuestas

- `selected_option`: respuesta objetiva evaluable
- `user_rationale`: razonamiento libre del usuario

## 5. Evaluación actual

El motor actual se considera explícitamente:
- `baseline heuristic scoring v1`
- `evaluationSource = "deterministic"`

No se presenta todavía como motor definitivo ni como TRI/IRT formal.

## 6. Modelo de permisos MVP

- `is_admin boolean` es suficiente para esta versión
- lectura de ítems publicados: usuarios autenticados
- escritura de contenido: solo admin

## 7. Estrategia de producto actual

Se prioriza:
1. base de datos estable
2. contratos tipados
3. backend utilizable
4. parser y carga de contenido
5. persistencia real de sesiones
6. auth integrada

## 8. Semántica mínima actual del flujo de sesión

- sin onboarding completo -> `onboarding`
- onboarding completo y sin baseline ni ítem siguiente -> `diagnostic`
- onboarding completo con ítem disponible -> `practice`
- error de respuesta con bajo desempeño -> `remediation`
- práctica con continuidad y suficiente historial -> `review`
- sesión con 3 turnos o condición de cierre -> `session_close`

## 9. Decisión de trazabilidad operativa

El sistema no debe declarar éxito funcional por intención, inferencia o narrativa de UI si el efecto real no fue confirmado.

Reglas mínimas:
- una operación crítica solo se considera exitosa si su efecto observable quedó confirmado en DB, respuesta backend o estado visible verificable
- frontend no debe maquillar persistencia no confirmada como éxito definitivo
- los reportes técnicos deben diferenciar entre acción intentada, acción confirmada y acción pendiente de verificación
- los flujos sensibles deben dejar evidencia suficiente para distinguir auth, persistencia, autorización y error operativo

Motivo:
El proyecto ya detectó riesgo de trazabilidad engañosa y estados aparentes de éxito sin confirmación suficiente. Esta decisión busca volver estructural la honestidad funcional.

## 10. Deuda futura explícita

Queda fuera de esta fase:
- scoring formal dividido en deterministic + llm-assisted rubric
- percentiles cercanos a TRI/IRT
- permisos más ricos que `is_admin`
- otros tipos de ítem
- importación CSV/XLSX
- multimodalidad/voz
