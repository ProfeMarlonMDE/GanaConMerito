#!/bin/bash
curl -s -f -o /dev/null http://localhost:3100 || exit 1
echo "HTTP 200 OK en http://localhost:3100"
