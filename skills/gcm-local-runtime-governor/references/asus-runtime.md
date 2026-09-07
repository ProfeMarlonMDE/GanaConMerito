# Operaciones ASUS Runtime

Si `GCM_WORKSTATION_ID=ASUS_WINDOWS11_WSL2`, el entorno local tiene las siguientes capacidades y reglas operativas:

- **Infraestructura:** Windows 11, WSL2 Ubuntu-24.04, Docker Desktop, Supabase Local, systemd (`gcm-local.service`).
- **URL Activa:** `http://localhost:3100`

## Comandos Operativos

- Publicar rama/SHA: `./scripts/gcm-local-publish.sh <rama-o-sha>`
- Rollback: `./scripts/gcm-local-rollback.sh`
- Estado: `./scripts/gcm-local-status.sh`
- Logs: `./scripts/gcm-local-logs.sh`

Recuerda que `gcm-local-sync-if-applicable.sh` encapsula el flujo de sincronización automática. Si un commit es creado y es relevante, ese es el script que debe utilizarse en lugar del publicador directo, para garantizar que la gobernanza se cumpla.
