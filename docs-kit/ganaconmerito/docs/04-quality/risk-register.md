---
id: DOC-QUAL-004
name: risk-register
project: ganaconmerito
owner: delivery-lead
status: draft
artifact_type: quality
modules: [core]
tags: [riesgos, calidad]
related: [DOC-QUAL-001, DOC-ARCH-001]
last_reviewed: 2026-04-26
---

# Risk Register

| ID | Riesgo | Impacto | Probabilidad | Mitigación | Owner | Estado |
|---|---|---|---|---|---|---|
| RISK-001 | Cambio estructural sin ADR | alto | media | bloquear en governance y hooks | tech-lead | abierto |
| RISK-002 | Contexto heredado incompleto | alto | alta | levantar arquitectura y deuda | architecture-owner | abierto |
| RISK-003 | Uso de `service_role` en shell/prompt/log local durante importaciones | crítico | media | rotar credencial comprometida, usar `EnvironmentFile` o `.env` no versionado, prohibir pegado interactivo de secretos, limpiar trazas locales | compliance-owner | abierto |
| RISK-004 | Carga masiva sin manifiesto cerrado ni reconciliación post-import | alto | media | fijar lista de archivos/ids aprobados, correr prueba mínima, registrar conteos esperados vs reales y diff de resultados | data-owner | abierto |
| RISK-005 | Desalineación entre árbol del importador y set canónico del banco | alto | media | sincronizar contenido antes de correr batch, verificar hash/conteo/paths, bloquear corrida si hay muestras viejas o faltantes | ops-owner | abierto |
| RISK-006 | Validación con privilegios altos sin separación entre preflight y ejecución real | alto | media | exigir preflight sin escritura, aprobación humana para corrida con `service_role`, y rollback documentado antes de batch completo | ops-owner | abierto |
