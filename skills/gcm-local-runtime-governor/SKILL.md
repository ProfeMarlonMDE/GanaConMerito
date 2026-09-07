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

5. **Política de Puertos Canónicos y Rollback Inmutable**:
   <!-- Agent: Google_Antigravity | Model: Gemini 3.6 Flash -->
   - **ASUS Local**: Puerto canónico fijo `http://localhost:3100` (`gcm-local.service`). Usar `./scripts/gcm-deploy-local.sh <sha>`.
   - **VPS Oracle**: Puerto interno canónico `3008` (proxied a `https://ganaconmerito.com`). Usar `./scripts/gcm-deploy-vps.sh <sha>`.
   - **Rollback en VPS**: Usar `./scripts/gcm-rollback-vps.sh` (reinstala la imagen inmutable previa en puerto 3008 sin mutar nginx ni OAuth).
   - **OAuth Origin**: Permanece fijo en `http://localhost:3100` localmente y `https://ganaconmerito.com` en el VPS.
   - **No crear puertos efímeros/secundarios ni alterar Supabase/OAuth por despliegues.**

6. **Checkpoints**: Incluye el estado del runtime en los checkpoints relevantes cuando se trate de la ASUS.

