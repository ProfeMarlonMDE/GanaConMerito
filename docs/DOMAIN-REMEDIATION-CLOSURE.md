# DOMAIN REMEDIATION CLOSURE

## Resultado final
Quedó consolidada la separación operativa vigente:
- `master` y `/home/ubuntu/.openclaw/product` = dominio canónico de producto
- `openclaw-workspace` y `/home/ubuntu/.openclaw/workspace` = dominio de agencia, memoria, prompts y operación

## Qué se cerró
- alineación de documentación normativa y de workflow
- saneo de residuo prunable de git
- eliminación de `BOOTSTRAP.md`
- archivo histórico de `archive/lotes-input/micro-lote-001-005.md`
- normalización de prompts y docs del question pipeline para leer producto como fuente canónica
- reetiquetado de `docs/BRANCH-REMEDIATION-MATRIX.md` como documento histórico

## Qué no se tocó
- `/home/ubuntu/.openclaw/workspace-product-048-fix`

No se modificó en esta fase porque requiere validación explícita de propósito antes de retirarlo o renombrarlo.

## Regla vigente
- el workspace no es source of truth de producto
- los artefactos operativos del workspace deben referenciar el estado canónico de producto cuando corresponda
- todo cambio canónico de app debe consolidarse en `master`

## Referencia operativa para seguir en modo dev
- App declarada: `0.4.8`
- App operativa: `v0.4.8-31-ga9522e6`
- Workspace operativo: `openclaw-workspace@77d1c87`

Mientras no se haga un cierre formal de release, reportar usando ese formato y seguir desarrollo normal en `/home/ubuntu/.openclaw/product`.
