---
name: gcm-local-runtime-governor
description: Gobierna el runtime local y la actualización de GanaConMérito en workstations identificadas, especialmente la ASUS Windows 11 con WSL2. Usar al completar cambios de código, validar el runtime local, publicar un commit local o decidir si localhost:3100 aplica. No asumir esta configuración en otros computadores.
---

# Gobernanza del Runtime Local (GanaConMérito)

Este skill controla el flujo de actualización del runtime local permanente de GanaConMérito.

## Instrucciones Principales

1. **Lee el perfil local** antes de tomar decisiones ejecutando `./scripts/gcm-workstation-detect.sh`.
2. **Distingue la computadora**:
   - Si es `ASUS_WINDOWS11_WSL2`, lee obligatoriamente `references/asus-runtime.md`.
   - Si es `OTHER` o `UNKNOWN`, el runtime `localhost:3100` NO ESTÁ DISPONIBLE; no intentes sincronizar ni publicar.
3. **Reglas de Sincronización**:
   - Ejecuta `./scripts/gcm-local-sync-if-applicable.sh HEAD` **únicamente** después de que un commit esté validado.
   - **No** publiques worktrees sucios.
   - **No** ejecutes la sincronización en cambios exclusivamente documentales.
4. **Restricciones Generales**:
   - No confundir publicación local con push, merge o deploy a Canary/Producción. (Solicita autorización separada para esto).
   - Preserva la funcionalidad de rollback (`./scripts/gcm-local-rollback.sh`).
5. **Checkpoints**: Incluye el estado del runtime en los checkpoints relevantes cuando se trate de la ASUS.
