#!/bin/bash
set -e

PROFILE="/home/mdav/.config/gcm/workstation.env"

if [ -f "$PROFILE" ]; then
  # Source securely
  set -a
  source "$PROFILE"
  set +a
  
  if [ "$GCM_WORKSTATION_ID" == "ASUS_WINDOWS11_WSL2" ]; then
    # Verify prerequisites
    if [ -d "$GCM_LOCAL_RUNTIME_ROOT" ] && systemctl --user status "$GCM_LOCAL_RUNTIME_SERVICE" >/dev/null 2>&1; then
      echo "GCM_WORKSTATION_ID=ASUS_WINDOWS11_WSL2"
      echo "GCM_ASUS_RUNTIME_AVAILABLE=true"
      echo "GCM_LOCAL_RUNTIME_URL=${GCM_LOCAL_RUNTIME_URL}"
      echo "GCM_LOCAL_RUNTIME_STATUS=PASS"
      exit 0
    else
      echo "GCM_WORKSTATION_ID=ASUS_WINDOWS11_WSL2"
      echo "GCM_ASUS_RUNTIME_AVAILABLE=false"
      echo "GCM_LOCAL_RUNTIME_URL=${GCM_LOCAL_RUNTIME_URL:-NOT_CONFIGURED}"
      echo "GCM_LOCAL_RUNTIME_STATUS=FAIL"
      exit 0
    fi
  fi
fi

# Not ASUS or profile missing
echo "GCM_WORKSTATION_ID=UNKNOWN"
echo "GCM_ASUS_RUNTIME_AVAILABLE=false"
echo "GCM_LOCAL_RUNTIME_URL=NOT_CONFIGURED"
echo "GCM_LOCAL_RUNTIME_STATUS=NOT_APPLICABLE"
exit 0
