# PowerShell script to start GanaConMerito local runtime

$ErrorActionPreference = "Stop"

Write-Host "Verificando Docker Desktop..."
# Esperar que Docker esté disponible
$dockerReady = $false
for ($i = 0; $i -lt 10; $i++) {
    $dockerInfo = docker info 2>&1
    if ($LASTEXITCODE -eq 0) {
        $dockerReady = $true
        break
    }
    Write-Host "Esperando Docker..."
    Start-Sleep -Seconds 3
}

if (-not $dockerReady) {
    Write-Error "Docker no está respondiendo. Verifica Docker Desktop."
    exit 1
}

Write-Host "Iniciando WSL y verificando Supabase local..."
# Usar wsl para chequear los contenedores
wsl -d Ubuntu -u mdav -- docker ps | Out-Null
if ($LASTEXITCODE -ne 0) {
    Write-Error "No se pudo comunicar con Docker dentro de WSL."
    exit 1
}

Write-Host "Verificando Supabase local..."
wsl -d Ubuntu -u mdav -- curl -s -f -o /dev/null http://127.0.0.1:54321/rest/v1/
# No falla si Supabase está iniciando, pero verificamos que el comando pase
Write-Host "Iniciando gcm-local.service..."
wsl -d Ubuntu -u mdav -- systemctl --user start gcm-local.service

Write-Host "Esperando aplicación Next.js en el puerto 3100..."
$appReady = $false
for ($i = 0; $i -lt 10; $i++) {
    wsl -d Ubuntu -u mdav -- curl -s -f -o /dev/null http://localhost:3100
    if ($LASTEXITCODE -eq 0) {
        $appReady = $true
        break
    }
    Start-Sleep -Seconds 3
}

if ($appReady) {
    Write-Host "GanaConMerito está disponible en http://localhost:3100"
} else {
    Write-Error "La aplicación no respondió a tiempo."
    wsl -d Ubuntu -u mdav -- journalctl --user -u gcm-local.service -n 20
    exit 1
}
