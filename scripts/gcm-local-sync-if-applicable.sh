#!/bin/bash
set -e

REPO_DIR=$(dirname "$0")/..
cd "$REPO_DIR"

# 1. Detect workstation
DETECT_OUTPUT=$(./scripts/gcm-workstation-detect.sh)
if ! echo "$DETECT_OUTPUT" | grep -q "GCM_WORKSTATION_ID=ASUS_WINDOWS11_WSL2"; then
  echo "SKIPPED_NOT_APPLICABLE: Not the ASUS workstation."
  exit 0
fi
if ! echo "$DETECT_OUTPUT" | grep -q "GCM_ASUS_RUNTIME_AVAILABLE=true"; then
  echo "SKIPPED_NOT_APPLICABLE: ASUS runtime prerequisites not met."
  exit 0
fi

# 2. Check reference
REF=${1:-HEAD}
SHA=$(git rev-parse "$REF") || { echo "FAIL: Referencia no encontrada ($REF)"; exit 1; }

# 3. Check for uncommitted changes
if ! git diff-index --quiet HEAD --; then
  echo "FAIL: Worktree has uncommitted changes. Cannot sync."
  exit 1
fi

# 4. Check if change is relevant
# Compare the new SHA with the currently deployed SHA
RUNTIME_DIR="/home/mdav/GIT-ANTIGRAVITY-WSL/OpenClaw-03042026/gcm-local-runtime"
STATE_FILE="${RUNTIME_DIR}/state/status.json"
ACTIVE_SHA=""
if [ -f "$STATE_FILE" ]; then
  ACTIVE_SHA=$(grep -o '"sha": "[^"]*' "$STATE_FILE" | cut -d'"' -f4)
fi

if [ "$ACTIVE_SHA" == "$SHA" ]; then
  echo "SKIPPED_NOT_RUNTIME_RELEVANT: Runtime is already at $SHA."
  exit 0
fi

# Filter paths that matter for runtime (src, package.json, next.config, etc.)
# If changes are only in docs/, scripts/ or others not part of the runtime, skip.
if [ -n "$ACTIVE_SHA" ] && ! git diff --name-only "$ACTIVE_SHA" "$SHA" | grep -qE "^(src/|package\.json|package-lock\.json|next\.config|playwright\.config|tsconfig\.json)"; then
  echo "SKIPPED_NOT_RUNTIME_RELEVANT: No runtime-affecting files changed."
  exit 0
fi

# 5. Lock and Publish
echo "Syncing ASUS runtime to $SHA..."
./scripts/gcm-local-publish.sh "$SHA"

# 6. Verify and Smoke
NEW_ACTIVE_SHA=$(grep -o '"sha": "[^"]*' "$STATE_FILE" | cut -d'"' -f4)
if [ "$NEW_ACTIVE_SHA" != "$SHA" ]; then
  echo "FAIL: Active SHA ($NEW_ACTIVE_SHA) does not match requested ($SHA) after publish."
  exit 1
fi

if ./scripts/gcm-local-smoke.sh; then
  echo "PASS: Sync and smoke completed successfully."
else
  echo "FAIL: Smoke test failed after sync."
  exit 1
fi
