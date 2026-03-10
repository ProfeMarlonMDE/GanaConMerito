# Fase R2 — Núcleo de sesiones

## Objetivo
Hacer que las sesiones usen estado real, historial real y acumulación básica de progreso en lugar de supuestos hardcodeados.

## Remediaciones aplicadas

### 1. Estado inicial real en `session/start`
El estado inicial ya no depende solo de si hay un ítem disponible.

Ahora considera:
- existencia de `learning_profiles`
- bandera `onboarding_completed`
- disponibilidad de ítems

### 2. Estado real en `session/advance`
El avance ya no asume `practice` manualmente.

Ahora consulta:
- sesión real en DB
- `current_state` real
- `learning_profiles.onboarding_completed`
- historial real de turnos de la sesión

### 3. Selector sin loops triviales
El siguiente ítem ahora excluye el conjunto completo de ítems ya vistos en la sesión.

### 4. Actualización básica de estadísticas
Se añadió actualización inicial de `user_topic_stats` por:
- intentos
- correct_count
- avg_reasoning_score
- avg_difficulty
- estimated_level

## Riesgos aún abiertos
- `hasBaseline` sigue simplificado
- aún faltan snapshots/memoria real
- aún falta cierre de sesión más rico (`review`, `session_close`, expiración real)

## Estado de la fase
En implementación / pendiente de cierre formal con commit y push.
