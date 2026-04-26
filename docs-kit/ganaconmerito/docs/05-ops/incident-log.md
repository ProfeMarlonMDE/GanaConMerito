---
id: DOC-OPS-004
name: incident-log
project: ganaconmerito
owner: ops-owner
status: draft
artifact_type: ops
modules: [core]
tags: [incidentes, ops]
related: [DOC-OPS-001]
last_reviewed: 2026-04-26
---

# Incident Log

## Formato

- fecha
- incidente
- impacto
- causa aparente
- mitigación
- owner
- seguimiento

## Entradas

- 2026-04-26 — Exposición operativa previa de `SUPABASE_SERVICE_ROLE_KEY` durante trabajo local de importación.
  - impacto: credencial administrativa tratada como comprometida; riesgo de acceso privilegiado y de invalidar el cierre seguro de fase.
  - causa aparente: uso de variable sensible en shell/herramientas locales con rastros en historial o sesiones.
  - mitigación: rotación de la key, saneamiento de trazas, prohibición de pegado interactivo y corrida siguiente solo con secreto reinyectado desde archivo seguro.
  - owner: compliance-owner
  - seguimiento: confirmar rotación, limpieza local y preflight firmado antes de próxima importación.
