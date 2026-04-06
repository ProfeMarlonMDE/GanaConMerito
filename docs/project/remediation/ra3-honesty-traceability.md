# RA3 — Honestidad funcional y cierre de trazabilidad

## Objetivo
Cerrar el bloque visible/operativo del MVP dejando la práctica más honesta ante estados borde y reconciliando trazabilidad mínima de versión.

## Cambios aplicados
- `PracticeSession` ahora expresa estados borde explícitos:
  - onboarding requerido
  - sesión creada sin ítem inicial
  - sesión terminada
  - ausencia de siguiente ítem
  - reinicio manual de nueva sesión
- `package.json` alineado con la versión publicada `v0.4.8`
- `supabase/.gitignore` añadido para ignorar `.temp/`

## Validación prevista
- `npm run build`
- revisión de `git status`

## Pendiente después de RA3
- E2E autenticada real
- validación funcional remota tras primer login real
- decidir política final para archivos `memory/` dentro del repo de trabajo
