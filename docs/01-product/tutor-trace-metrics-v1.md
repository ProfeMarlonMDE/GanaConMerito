# Tutor Trace Metrics v1

## Endpoint

`GET /api/tutor/traces/summary`

## Autenticación y alcance

- Requiere usuario autenticado con perfil válido.
- Solo devuelve trazas del `profile_id` autenticado.
- No usa service role; usa el cliente server-side normal con RLS activa.

## Respuesta (200)

```json
{
  "totalTurns": 0,
  "degradedTurns": 0,
  "preAnswerGuardrailHits": 0,
  "postAnswerExplanations": 0,
  "topIntents": [{ "intent": "hint", "count": 10 }],
  "topGuardrails": [{ "guardrail": "no_direct_answer", "count": 8 }],
  "recentTurns": [
    {
      "createdAt": "2026-05-03T12:00:00.000Z",
      "mode": "practice",
      "intent": "hint",
      "degraded": false,
      "canRevealCorrectAnswer": false
    }
  ]
}
```

## Notas de implementación

- Si no existen trazas para el usuario, responde con métricas en cero y arreglos vacíos.
- `topIntents` y `topGuardrails` se limitan a 5 entradas.
- `recentTurns` se limita a las 5 trazas más recientes.
- Este sprint solo agrega lectura agregada; no modifica persistencia ni flujo de escritura existente.
