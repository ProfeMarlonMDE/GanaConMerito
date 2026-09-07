#!/bin/bash
# Agent: Google_Antigravity | Model: Gemini 3.6 Flash
# Official Local Canonical Port (3100) Deployment Script
set -euo pipefail

if [ -z "${1:-}" ]; then
  echo "Uso: $0 <sha-o-referencia>"
  echo "Publica un SHA en el puerto local canónico 3100 (http://localhost:3100)"
  exit 1
fi

REF="$1"
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
REPO_DIR="$(dirname "$SCRIPT_DIR")"

echo "=== Despliegue Canónico Local ==="
echo "Sincronizando $REF en http://localhost:3100..."
exec "${SCRIPT_DIR}/gcm-local-publish.sh" "$REF"
