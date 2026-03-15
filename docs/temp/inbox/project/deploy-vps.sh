#!/usr/bin/env bash
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
REPO_ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"
ENV_FILE="${ENV_FILE:-$REPO_ROOT/.env.deploy}"

if [[ ! -f "$ENV_FILE" ]]; then
    echo "❌ Error: Missing env file: $ENV_FILE"
    exit 1
fi

# Load variables
set -a
source "$ENV_FILE"
set +a

# Defaults and requirements
: "${VPS_IP:=149.130.185.37}"
: "${VPS_USER:=ubuntu}"
: "${VPS_KEY:=$REPO_ROOT/id_vps_re}"
: "${VPS_APP_DIR:=/var/www/cnsc}"
: "${VPS_SYSTEMD_SERVICE:=cnsc}"
: "${APP_PUBLIC_URL:=https://cnsc.profemarlon.com}"

echo "🚀 Starting deploy to $VPS_USER@$VPS_IP..."

ssh -i "$VPS_KEY" -o StrictHostKeyChecking=no "$VPS_USER@$VPS_IP" bash <<EOF
set -euo pipefail
cd "$VPS_APP_DIR"

echo ">>> 📦 Syncing with git master"
git stash
git pull origin master

echo ">>> 🛠️ Installing dependencies"
npm install --no-audit --no-fund

echo ">>> 🏗️ Building application"
npm run build

echo ">>> 🔄 Restarting service"
sudo systemctl restart "$VPS_SYSTEMD_SERVICE"

echo ">>> ✅ Service status"
sudo systemctl status "$VPS_SYSTEMD_SERVICE" --no-pager | grep -E "Active:|Main PID:"

echo ">>> 🩺 Local health check"
curl -I -s http://127.0.0.1:3000 | head -n 1
EOF

echo ">>> 🌐 Public health check ($APP_PUBLIC_URL)"
curl -Ik -s "$APP_PUBLIC_URL" | head -n 1

echo "✨ Deploy finished successfully."

