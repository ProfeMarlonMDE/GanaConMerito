#!/bin/bash
set -e

# Configura o actualiza el servicio systemd de usuario para gcm-local.
# Identifica la ruta actual de Node o usa la configurada.

NODE_PATH=$(which node || echo "")
if [ -z "$NODE_PATH" ] || [ ! -x "$NODE_PATH" ]; then
    NODE_PATH="/home/mdav/.nvm/versions/node/v22.23.2/bin/node"
fi
NODE_DIR=$(dirname "$NODE_PATH")

echo "Configurando gcm-local.service con PATH para Node en: $NODE_DIR"

mkdir -p /home/mdav/.config/systemd/user

cat << EOF > /home/mdav/.config/systemd/user/gcm-local.service
[Unit]
Description=GanaConMerito Local Runtime
After=network.target
StartLimitBurst=5
StartLimitIntervalSec=30s

[Service]
Type=simple
WorkingDirectory=/home/mdav/GIT-ANTIGRAVITY-WSL/OpenClaw-03042026/gcm-local-runtime/current
EnvironmentFile=/home/mdav/.config/gcm-local/runtime.env
Environment=NODE_ENV=production
Environment=PORT=3100
Environment=HOSTNAME=127.0.0.1
Environment="PATH=$NODE_DIR:/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin"
ExecStart=/home/mdav/GIT-ANTIGRAVITY-WSL/OpenClaw-03042026/gcm-local-runtime/current/node_modules/.bin/next start
Restart=on-failure
RestartSec=5s

[Install]
WantedBy=default.target
EOF

systemctl --user daemon-reload
systemctl --user enable gcm-local.service
echo "Servicio gcm-local actualizado exitosamente."
