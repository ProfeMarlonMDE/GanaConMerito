# AGENCY-TEST-CASE.md

## Propósito

Plantilla mínima para correr pruebas controladas de la agencia sin rehacer contexto ni abrir frentes ambiguos.

Se usa para validar:
- si Gauss delimita bien el caso
- si cada especialista se mantiene en su dominio
- si el handoff entre roles es claro
- si la consolidación final reduce ruido en vez de aumentarlo

---

## Plantilla

### Objetivo
Qué se quiere validar o destrabar.

### Síntoma reportado
Qué está fallando o qué se percibe como roto.

### Evidencia disponible
Solo hechos observados.

### Evidencia faltante
Qué no está confirmado todavía.

### Dominios sospechosos
Qué frentes podrían estar involucrados.

### Pregunta exacta por rol
- `frontend-product`: ...
- `backend-services`: ...
- `data-supabase`: ...
- `qa-validation`: ...
- `infra-devops`: ...
- `techlead-architecture`: ...
- `editorial-content`: ...

Usar solo los roles que de verdad apliquen.

### Criterio de cierre
La prueba se considera útil solo si deja claro:
- qué capa parece ser el problema principal
- qué riesgo existe
- qué sigue
- qué no está resuelto aún

---

## Reglas

- No usar esta plantilla para “auditar todo”.
- No abrir más roles de los necesarios.
- No repetir la misma pregunta a varios especialistas.
- Si el caso no está acotado, Gauss primero delimita y luego usa esta plantilla.
- La salida final siempre la consolida Gauss.

---

## Caso corto de ejemplo

### Objetivo
Validar por qué un login con magic link funciona a medias.

### Síntoma reportado
La UI no deja claro el estado, los errores son ambiguos y hay sospecha de permisos mal definidos.

### Evidencia disponible
- El login se percibe inconsistente.
- No está claro si falla auth, UI o acceso posterior.

### Evidencia faltante
- Primera operación que falla tras login.
- Estado visible exacto por etapa.
- Contrato funcional esperado.

### Dominios sospechosos
- `frontend-product`
- `backend-services`
- `data-supabase`
- `qa-validation`

### Pregunta exacta por rol
- `frontend-product`: ¿qué estados visibles faltan o son ambiguos en el flujo?
- `backend-services`: ¿qué parte del contrato de auth/login está mal definida o no diferenciada?
- `data-supabase`: ¿hay patrón de auth exitosa pero acceso bloqueado por RLS/permisos?
- `qa-validation`: ¿qué evidencia mínima distingue UI, backend o acceso?

### Criterio de cierre
- separar auth, UX y autorización
- identificar riesgo principal
- definir siguiente movimiento concreto
