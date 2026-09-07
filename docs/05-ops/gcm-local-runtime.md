# Runtime Local Permanente GanaConMérito

Este documento describe la arquitectura y uso del runtime local permanente de GanaConMérito.

## Arquitectura Local

El objetivo es mantener una copia estable y comprobable de la aplicación ejecutándose localmente, separada del worktree editable (`gcm-practice-tutor-vnext`), y disponible siempre mediante `http://localhost:3100`.

### Diferencia entre Worktree de Desarrollo y Runtime

- **Worktree**: El repositorio donde se escribe y edita código. Contiene cambios no comprometidos y puede estar en estados inestables.
- **Runtime**: El directorio `/home/mdav/GIT-ANTIGRAVITY-WSL/OpenClaw-03042026/gcm-local-runtime/` donde reside la aplicación compilada. Se aísla por cada *release* y se ejecuta como un proceso daemonizado.

### URL Fija

El entorno se expone localmente (sin abrir puertos a la LAN) a través de la URL fija:
`http://localhost:3100`

### Supabase Local y Docker Desktop

El runtime utiliza exclusivamente Supabase Local ejecutado bajo Docker Desktop. No se requiere ni permite la instalación de Docker Engine nativo en la distribución WSL. El entorno de Supabase expone las APIs localmente, y la configuración de este entorno se carga de forma privada.

### Versionado de Node.js en systemd

El servicio de systemd no hereda la configuración interactiva de `.bashrc` ni de NVM. Actualmente está configurado para utilizar de forma nativa **Node v22.23.2**. Si Node.js se actualiza o la ruta cambia, el script `./scripts/gcm-local-install-service.sh` auto-detecta la ruta actual del instalador durante la ejecución de publicación y recrea la unidad systemd inyectándole la variable de entorno `PATH` correcta, logrando que el entorno sea totalmente reproducible y no dependa del shell.

## Guía Operativa

Las utilidades para manejar este entorno se encuentran en `./scripts/` (dentro del repositorio original):

- **Publicar rama o SHA:**
  `./scripts/gcm-local-publish.sh <rama-o-sha>`
  Realiza una compilación aislada, typecheck, y tests dirigidos. Se activa sólo en caso de éxito.
  
- **Consultar estado:**
  `./scripts/gcm-local-status.sh`
  Muestra la referencia, el origen y si está activo el servicio.
  
- **Ver logs:**
  `./scripts/gcm-local-logs.sh`
  
- **Rollback:**
  `./scripts/gcm-local-rollback.sh`
  Restaura de forma atómica la versión previamente publicada en caso de fallos.
  
- **Smoke test local:**
  `./scripts/gcm-local-smoke.sh`

### LOCAL_ONLY vs ORIGIN

Al publicar un SHA, el script registra en su estado el origen:
- `ORIGIN`: El commit existe en el remoto (`origin`).
- `LOCAL_ONLY`: El commit existe únicamente en la máquina local.

*Nota:* No uses este runtime local como un entorno Canary o de Producción. La base de datos es local.

## Inicio Automático de Windows

Se incluyó un script `start-gcm-local.ps1` en la raíz. Puedes configurar el Programador de Tareas (Task Scheduler) de Windows para que lo ejecute al inicio de sesión y levante todo el stack.

### Errores Habituales y Recuperación

- Si la aplicación devuelve `502 Bad Gateway` tras reiniciar: Revisa que `gcm-local.service` esté encendido (`./scripts/gcm-local-start.sh`).
- Si los contenedores de Supabase se apagan: Restablécelos abriendo Docker Desktop y reiniciándolos, o usa `npx supabase start`.
- No cambies variables en el código, el archivo oculto en `~/.config/gcm-local/runtime.env` inyectará la configuración de Playwright y Supabase.

## Gobernanza y Sincronización Automática (Perfil ASUS)

**Esta configuración pertenece a la computadora ASUS. No debe asumirse disponible en otros computadores del usuario. Cada computadora requiere su propio perfil local y una validación independiente.**

El entorno ASUS Windows 11 + Ubuntu-24.04 WSL2 cuenta con un mecanismo de detección:
- Nombre lógico: ASUS
- El perfil se define localmente en `/home/mdav/.config/gcm/workstation.env` con `GCM_WORKSTATION_ID=ASUS_WINDOWS11_WSL2`.
- Para otras computadoras, el script `./scripts/gcm-workstation-detect.sh` retornará que no es aplicable.



## Gobernanza de Túnel Canary SSH (Puerto 3100)

<!-- Agent: Google_Antigravity | Model: Gemini 3.6 Flash -->
- El origen local autorizado para OAuth es `http://localhost:3100`.
- Canary se revisa con el túnel SSH `localhost:3100` -> VPS `127.0.0.1:3007`.
- Durante la revisión de Canary debe pausarse temporalmente el runtime local (`gcm-local.service`).
- Al finalizar la revisión se debe cerrar el túnel y restaurar `gcm-local.service`.
- No deben cambiarse los puertos por los costos operativos asociados a Supabase y Google OAuth.


