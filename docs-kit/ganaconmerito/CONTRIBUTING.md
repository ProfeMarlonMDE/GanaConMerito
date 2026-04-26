# Contributing

## Reglas de contribución

- No editar documentación crítica sin mantener frontmatter válido.
- No introducir secretos en archivos versionados.
- No aprobar tus propios cambios estructurales si eres agente.
- No cerrar deuda crítica sin aprobación humana.
- No hacer push de cambios estructurales sin ADR aprobado.

## Antes de contribuir

Lee como mínimo:

1. `README.md`
2. `docs/06-governance/working-agreement.md`
3. `docs/03-architecture/system-overview.md`
4. `docs/01-product/backlog.md`
5. requirement o spec relacionada
6. ADRs relacionados
7. deuda técnica del módulo

## Validación local

```bash
python3 scripts/validate_docs.py
python3 scripts/build_context_index.py
```

## Hooks

```bash
git config core.hooksPath .githooks
chmod +x .githooks/*
```
