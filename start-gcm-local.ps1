# PowerShell script to start GanaConMerito local runtime

$ErrorActionPreference = "Stop"

Write-Host "Verificando Docker Desktop..."
# Esperar que Docker esté disponible en Windows
$dockerReady = $false
for ($i = 0; $i -lt 15; $i++) {
    docker info 2>&1 | Out-Null
    if ($LASTEXITCODE -eq 0) {
        $dockerReady = $true
        break
    }
    Write-Host "Esperando Docker en Windows..."
    Start-Sleep -Seconds 3
}

if (-not $dockerReady) {
    Write-Error "Docker no está respondiendo en Windows. Verifica Docker Desktop."
    exit 1
}

Write-Host "Buscando distribución WSL de GanaConMerito..."
# Buscamos la distribución WSL correcta (ignorando docker-desktop y obteniendo solo texto limpio)
$targetDistro = "Ubuntu-24.04"
try {
    $rawDistros = wsl -l -q
    if ($rawDistros) {
        $cleanDistros = $rawDistros -replace "\x00", "" -split "\r?\n" | Where-Object { $_ -match "\S" -and $_ -notmatch "docker-desktop" }
        if ($cleanDistros -and $cleanDistros.Count -gt 0) {
            $targetDistro = $cleanDistros[0].Trim()
        }
    }
} catch {
    Write-Host "Fallo al consultar WSL distros, usando default $targetDistro"
}

Write-Host "Usando WSL Distro: $targetDistro"

Write-Host "Iniciando WSL y verificando integración de Docker..."
# Esperamos a que la integración de WSL con Docker Desktop levante dentro de la distro
$wslDockerReady = $false
for ($i = 0; $i -lt 15; $i++) {
    wsl -d $targetDistro -u mdav -- /usr/bin/docker ps 2>&1 | Out-Null
    if ($LASTEXITCODE -eq 0) {
        $wslDockerReady = $true
        break
    }
    Write-Host "Esperando que Docker Desktop se integre en WSL..."
    Start-Sleep -Seconds 3
}

if (-not $wslDockerReady) {
    Write-Error "No se pudo comunicar con Docker dentro de WSL ($targetDistro)."
    exit 1
}

Write-Host "Verificando Supabase local..."
wsl -d $targetDistro -u mdav -- curl -s -f -o /dev/null http://127.0.0.1:54321/rest/v1/

Write-Host "Iniciando gcm-local.service..."
wsl -d $targetDistro -u mdav -- systemctl --user start gcm-local.service

Write-Host "Esperando aplicación Next.js en el puerto 3100..."
$appReady = $false
for ($i = 0; $i -lt 10; $i++) {
    wsl -d $targetDistro -u mdav -- curl -s -f -o /dev/null http://localhost:3100
    if ($LASTEXITCODE -eq 0) {
        $appReady = $true
        break
    }
    Start-Sleep -Seconds 3
}

if ($appReady) {
    Write-Host "GanaConMerito está disponible en http://localhost:3100"
    exit 0
} else {
    Write-Error "La aplicación no respondió a tiempo."
    wsl -d $targetDistro -u mdav -- journalctl --user -u gcm-local.service -n 20
    exit 1
}
