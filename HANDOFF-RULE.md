# HANDOFF-RULE.md

## Propósito

Evitar que un especialista invada otro dominio o escale de forma vaga.

Un handoff correcto reduce ruido.
Un handoff malo solo empuja el problema sin aclararlo.

---

## Regla corta

Si un especialista detecta que el caso sale de su dominio, no debe resolver fuera de su frente.

Debe hacer handoff explícito con 3 cosas:
- rol destino
- motivo exacto
- evidencia ya aislada

---

## Formato mínimo obligatorio

```markdown
## Handoff
- Rol destino: `...`
- Motivo: ...
- Evidencia ya aislada: ...
```

---

## Cuándo aplica

Hacer handoff cuando:
- el problema real está en otra capa
- el caso cruza dominios y ya no basta análisis local
- se detecta dependencia bloqueante fuera del rol
- seguir analizando desde el rol actual solo produciría ruido

---

## Cuándo no aplica

No hacer handoff cuando:
- el problema sigue siendo local al dominio
- falta análisis básico del propio frente
- se está usando handoff para evitar pensar o asumir responsabilidad

---

## Ejemplos cortos

### Frontend → Backend
- Rol destino: `backend-services`
- Motivo: la UI ya distingue estados, pero la respuesta del flujo sigue siendo ambigua porque el contrato de error no separa expirado, usado e inválido.
- Evidencia ya aislada: el problema no está en copy ni estados visibles, sino en la semántica de respuesta.

### Backend → Data
- Rol destino: `data-supabase`
- Motivo: la autenticación sí concluye, pero el acceso posterior falla por autorización o política de datos.
- Evidencia ya aislada: el contrato de login llega a éxito, el fallo ocurre después de sesión válida.

### Data → Tech Lead
- Rol destino: `techlead-architecture`
- Motivo: el modelo auth→autorización depende de bootstrap circular y ya no es un problema local de política.
- Evidencia ya aislada: usuario autenticado sin acceso efectivo por dependencia estructural no resuelta.

---

## Regla final

Un buen handoff no dice solo “esto es de otro”.
Dice exactamente:
- de quién es,
- por qué,
- y qué parte del problema ya quedó aislada.
