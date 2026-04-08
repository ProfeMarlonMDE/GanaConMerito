# Checklist práctico, rotación y saneamiento de secretos Supabase

## Objetivo
Ejecutar la remediación de la `SUPABASE_SERVICE_ROLE_KEY` expuesta sin dejar huecos operativos.

## Fase 1. Rotación
- [ ] Entrar al proyecto Supabase correcto.
- [ ] Generar nueva `SUPABASE_SERVICE_ROLE_KEY`.
- [ ] Confirmar que la key anterior queda invalidada.
- [ ] No pegar la nueva key en chat ni shell interactivo sin control.

## Fase 2. Reconfiguración del entorno
- [ ] Crear o actualizar `.env.local` con:
  - [ ] `NEXT_PUBLIC_SUPABASE_URL`
  - [ ] `NEXT_PUBLIC_SUPABASE_ANON_KEY`
  - [ ] `SUPABASE_SERVICE_ROLE_KEY`
- [ ] Verificar que `.env.local` no entra a git.
- [ ] Reiniciar procesos que consumen esas variables.

## Fase 3. Saneamiento local
- [ ] Respaldar `.bash_history`.
- [ ] Eliminar entradas con secretos.
- [ ] Respaldar sesiones OpenClaw afectadas.
- [ ] Sanitizar o retirar sesiones que contienen la key.

## Fase 4. Validación posterior
- [ ] Confirmar que el runtime lee la nueva key.
- [ ] Ejecutar build.
- [ ] Probar endpoints admin.
- [ ] Probar import batch.
- [ ] Probar publish batch.

## Fase 5. Prevención
- [ ] Usar `.env.local.example` solo con placeholders.
- [ ] No volver a pegar secretos en prompts o historial.
- [ ] Mantener runbook de secretos como referencia operativa.
