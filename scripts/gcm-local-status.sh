#!/bin/bash
set -e
RUNTIME_DIR="/home/mdav/GIT-ANTIGRAVITY-WSL/OpenClaw-03042026/gcm-local-runtime"
STATE_FILE="${RUNTIME_DIR}/state/status.json"
if [ -f "$STATE_FILE" ]; then
  cat "$STATE_FILE"
  echo ""
else
  echo "No active release found."
fi
systemctl --user status gcm-local.service --no-pager || true
