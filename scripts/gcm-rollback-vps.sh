#!/bin/bash
# Agent: Google_Antigravity | Model: Gemini 3.6 Flash
# Official VPS Rollback Script for GanaConMérito Canonical Internal Port (3008)
set -euo pipefail

PRODUCT_DIR="${PRODUCT_DIR:-/home/ubuntu/.openclaw/product}"
CANONICAL_PORT=3008
ENV_FILE="${ENV_FILE:-/opt/gcm/env/production.env}"
STATE_FILE="/opt/gcm/state/rollback.json"

if [ ! -f "$STATE_FILE" ]; then
  echo "Error: Archivo de metadata de rollback no encontrado ($STATE_FILE)."
  exit 1
fi

PREVIOUS_IMAGE=$(jq -r '.previous_image // empty' "$STATE_FILE" 2>/dev/null || grep -oP '"previous_image": "\K[^"]+' "$STATE_FILE" || true)
PREVIOUS_SHA=$(jq -r '.previous_sha // empty' "$STATE_FILE" 2>/dev/null || grep -oP '"previous_sha": "\K[^"]+' "$STATE_FILE" || true)

if [ -z "$PREVIOUS_IMAGE" ]; then
  echo "Error: No existe imagen previa registrada para rollback."
  exit 1
fi

echo "=== Ejecutando Rollback Canónico VPS ==="
echo "Restaurando imagen previa: $PREVIOUS_IMAGE (SHA: ${PREVIOUS_SHA:-desconocido})"

# Detener cualquier contenedor activo en el puerto 3008
ACTIVE_CONTAINERS=$(sudo docker ps --filter "publish=${CANONICAL_PORT}" --format "{{.Names}}")
if [ -n "$ACTIVE_CONTAINERS" ]; then
  echo "Deteniendo contenedor fallido en puerto $CANONICAL_PORT..."
  sudo docker stop $ACTIVE_CONTAINERS || true
  sudo docker rm $ACTIVE_CONTAINERS || true
fi

SHORT_SHA="${PREVIOUS_SHA:0:7}"
ROLLBACK_CONTAINER_NAME="gcm-production-rollback-${SHORT_SHA:-prev}"

echo "Re-creando contenedor de producción $ROLLBACK_CONTAINER_NAME en puerto $CANONICAL_PORT..."
sudo docker run -d \
  --name "$ROLLBACK_CONTAINER_NAME" \
  --restart unless-stopped \
  --env-file "$ENV_FILE" \
  -p 127.0.0.1:${CANONICAL_PORT}:3000 \
  --label com.ganaconmerito.runtime=production \
  --label com.ganaconmerito.commit="${PREVIOUS_SHA}" \
  "$PREVIOUS_IMAGE"

sleep 3
if curl -s -f "http://127.0.0.1:${CANONICAL_PORT}/login" > /dev/null; then
  echo "SUCCESS: Rollback completado y verificado en puerto $CANONICAL_PORT"
else
  echo "CRITICAL: Falló la verificación de rollback en puerto $CANONICAL_PORT"
  exit 1
fi
