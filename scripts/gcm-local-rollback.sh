#!/bin/bash
set -e
RUNTIME_DIR="/home/mdav/GIT-ANTIGRAVITY-WSL/OpenClaw-03042026/gcm-local-runtime"
if [ -L "${RUNTIME_DIR}/previous" ]; then
  echo "Rolling back to previous release..."
  ln -sfn "$(readlink "${RUNTIME_DIR}/previous")" "${RUNTIME_DIR}/current"
  systemctl --user restart gcm-local.service
  echo "Rollback complete."
else
  echo "No previous release to rollback to."
  exit 1
fi
