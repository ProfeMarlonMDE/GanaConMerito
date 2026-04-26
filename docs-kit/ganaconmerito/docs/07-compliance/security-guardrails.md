---
id: DOC-COMP-001
name: security-guardrails
project: ganaconmerito
owner: compliance-owner
status: active
artifact_type: governance
modules: [security]
tags: [security, guardrails]
related: [DOC-GOV-005]
last_reviewed: 2026-04-26
---

# Security Guardrails

- No exponer secretos en markdown, logs o prompts.
- No cambiar auth o permisos sin aprobación humana.
- No publicar artefactos sensibles.
- Escalar cualquier hallazgo de credenciales o exposición.
- Para importaciones a Supabase con `service_role`, usar solo secreto inyectado desde archivo seguro o runtime aprobado; nunca pegarlo en shell interactivo.
- Separar preflight y ejecución real: la validación del lote debe poder correrse sin escribir en producción.
- No ejecutar batch completo sin manifiesto cerrado de archivos/ids aprobados y sin reconciliación posterior.
