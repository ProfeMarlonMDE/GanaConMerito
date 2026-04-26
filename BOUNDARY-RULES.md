# BOUNDARY-RULES.md

## Regla canónica por carril
- `product` manda para producto.
- `workspace` manda para agencia.

## Qué vive en product
- código
- arquitectura del sistema
- ADRs
- backlog y sprint de producto
- runbooks del producto
- deuda, issues y documentación canónica de la app

## Qué vive en workspace
- memoria operativa
- prompts y protocolos
- delegación y handoffs
- estado de agencia
- runbooks de Gauss
- coordinación multiagente

## Reglas duras
- Si un documento responde qué es, cómo funciona o qué se aprueba en el producto, debe vivir en `product`.
- Si un documento responde cómo operamos la agencia, debe vivir en `workspace`.
- `workspace/docs-kit/ganaconmerito/` es template histórico, no fuente viva.
- `product/site-docs/` es exportado, no editable manualmente.
- `product/docs/temp/inbox/` es staging temporal, no documentación estable.
- Ningún documento en `workspace` debe contradecir documentación canónica de `product`.
- Si `workspace` resume producto, debe enlazar o referenciar el archivo canónico.

## Secuencia de limpieza de menor riesgo
1. fijar frontera semántica
2. congelar templates y staging como no canónicos
3. revisar resúmenes operativos del workspace
4. consolidar o archivar temp/inbox del product
5. solo después mover o eliminar archivos físicos
