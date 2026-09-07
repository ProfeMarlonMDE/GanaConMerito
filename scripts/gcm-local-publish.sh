#!/bin/bash
set -e
REF=$1
if [ -z "$REF" ]; then
  echo "Uso: $0 <rama-o-sha>"
  exit 1
fi

REPO="/home/mdav/GIT-ANTIGRAVITY-WSL/OpenClaw-03042026/gcm-practice-tutor-vnext"
RUNTIME_DIR="/home/mdav/GIT-ANTIGRAVITY-WSL/OpenClaw-03042026/gcm-local-runtime"
ENV_FILE="/home/mdav/.config/gcm-local/runtime.env"
LOCK_FILE="${RUNTIME_DIR}/tmp/publish.lock"

exec 200>"$LOCK_FILE"
flock -n 200 || { echo "Ya hay una publicación en curso."; exit 1; }

cd "$REPO"
SHA=$(git rev-parse "$REF") || { echo "Referencia no encontrada: $REF"; exit 1; }

# Comprobar si hay código sin commit (worktree de desarrollo)
if ! git diff-index --quiet HEAD --; then
  echo "Rechazado: El código actual tiene cambios sin commit."
  exit 1
fi

ORIGIN_EXISTS=$(git ls-remote origin "$SHA" | wc -l || echo 0)
if [ "$ORIGIN_EXISTS" -gt 0 ] || git branch -r --contains "$SHA" 2>/dev/null | grep -q "origin/"; then
  SOURCE_STATE="ORIGIN"
else
  SOURCE_STATE="LOCAL_ONLY"
fi

echo "Publicando $SHA ($SOURCE_STATE)..."

WORKTREE="${RUNTIME_DIR}/tmp/build-${SHA}-$$"
git worktree add --detach "$WORKTREE" "$SHA"
cd "$WORKTREE"

# Cargar runtime.env en build
set -a
source "$ENV_FILE"
set +a

npm ci --no-audit --no-fund

npm run typecheck

# Build
npm run build

if [ ! -f ".next/BUILD_ID" ]; then
  echo "Build falló, BUILD_ID no encontrado"
  cd "$REPO"
  git worktree remove --force "$WORKTREE"
  exit 1
fi

RELEASE_DIR="${RUNTIME_DIR}/releases/${SHA}"
rm -rf "$RELEASE_DIR"
mv "$WORKTREE" "$RELEASE_DIR"
cd "$REPO"
git worktree prune

if [ -L "${RUNTIME_DIR}/current" ]; then
  ln -sfn "$(readlink "${RUNTIME_DIR}/current")" "${RUNTIME_DIR}/previous"
fi
ln -sfn "$RELEASE_DIR" "${RUNTIME_DIR}/current"

# Asegurar que el servicio systemd usa el binario correcto de node
"${REPO}/scripts/gcm-local-install-service.sh"

systemctl --user restart gcm-local.service
echo "Esperando 10 segundos..."
sleep 10

if curl -s -f -o /dev/null http://localhost:3100; then
  echo "Smoke test PASS"
  echo "{\"ref\": \"$REF\", \"sha\": \"$SHA\", \"time\": \"$(date -u)\", \"result\": \"PASS\", \"source_state\": \"$SOURCE_STATE\"}" > "${RUNTIME_DIR}/state/status.json"
else
  echo "Smoke test FAIL. Rolling back..."
  "${REPO}/scripts/gcm-local-rollback.sh"
  exit 1
fi
