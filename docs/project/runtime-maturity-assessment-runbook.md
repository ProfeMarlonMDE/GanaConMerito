# Runtime Maturity Assessment Runbook — GanaConMerito

## Propósito

Ejecutar futuras corridas del assessment de madurez del proyecto de forma corta, repetible y sin perder criterio técnico.

Este runbook acompaña a:
- `docs/project/runtime-maturity-assessment.md`

No reemplaza el assessment.
Lo operacionaliza.

---

## Cuándo correrlo

Correr una nueva evaluación cuando ocurra cualquiera de estos eventos:
- cierre de una remediación relevante
- nuevo deploy importante
- cambio de etapa declarada del producto
- cierre de una E2E real
- incorporación de auth, onboarding, practice o dashboard a entorno real
- aparición de drift entre repo, docs y runtime
- antes de afirmar que el sistema ya está en producción temprana

---

## Salida esperada

Cada corrida debe producir:
1. actualización de `docs/project/runtime-maturity-assessment.md`
2. nueva entrada incremental en `Corridas de evaluación`
3. ajuste de `Estado consolidado actual` si cambió la lectura
4. commit limpio en git
5. push al remoto si corresponde

---

## Procedimiento corto obligatorio

### Paso 1 — leer documentación mínima
Revisar:
- `docs/project/status.md`
- `docs/project/current-workflow.md`
- `docs/project/e2e-status.md`
- `docs/project/source-of-truth.md`
- `docs/architecture/overview.md`
- `docs/architecture/state-machine.md`
- `docs/architecture/decisions.md`
- `docs/api/contracts.md`
- `docs/database/schema.md`
- `docs/database/security.md`
- `docs/project/remediation/plan.md`
- `docs/project/remediation/r1-security-auth.md`
- `docs/project/remediation/r2-sessions.md`
- `docs/project/remediation/r3-db-content.md`
- `docs/project/remediation/r4-runtime-product.md`
- `docs/project/remediation/ra1-session-security.md`
- `docs/project/remediation/ra2-flow-contracts.md`
- `docs/project/remediation/ra3-honesty-traceability.md`

### Paso 2 — levantar señales git mínimas
Ejecutar:

```bash
git branch --show-current
git status --short --branch
git tag --sort=-creatordate | head -20
git log --oneline --decorate -n 20
git remote -v
```

### Paso 3 — levantar señales operativas mínimas si aplican
Ejecutar según contexto:

```bash
docker compose -f /opt/gcm/docker-compose.yml ps
git -C /opt/gcm/app rev-parse --short HEAD
npm run build
```

Si hubo validación real del flujo, adjuntar evidencia de:
- login
- onboarding
- practice
- dashboard
- primera falla observable si existe

### Paso 4 — evaluar con los 10 criterios del assessment
No saltarse ningún eje.

### Paso 5 — actualizar el documento incremental
Hacer solo esto:
- actualizar `Estado consolidado actual` si cambió la lectura
- agregar una nueva corrida al final

### Paso 6 — versionar
Ejecutar:

```bash
git add docs/project/runtime-maturity-assessment.md docs/project/source-of-truth.md docs/project/runtime-maturity-assessment-runbook.md
git commit -m "docs(project): update runtime maturity assessment"
git push origin master
```

---

## Checklist de análisis rápido

- [ ] flujo principal implementado realmente
- [ ] E2E real confirmada o explícitamente pendiente
- [ ] contratos funcionales suficientemente claros
- [ ] auth / bootstrap / ownership suficientemente cerrados
- [ ] deploy y runtime alineados con el repo
- [ ] sin drift crítico no explicado
- [ ] versionado coherente
- [ ] operación real distinguida de solo build/doc
- [ ] sin ilusión de madurez
- [ ] siguiente salto de etapa claramente definido

---

## Regla de honestidad

Si la evidencia no alcanza para subir de etapa, el reporte debe decirlo sin maquillaje.

No usar como prueba suficiente:
- que compila
- que hay tags
- que hay docs buenas
- que el deploy “parece” vivo

Sí usar como prueba fuerte:
- flujo principal ejecutado de verdad
- evidencia de validación real
- contratos observables por estado
- repo y runtime suficientemente alineados

---

## Regla incremental

Nunca borrar corridas anteriores solo para que el documento se vea limpio.

Solo se corrige una corrida pasada si:
- tenía un error factual,
- una ruta era incorrecta,
- o la evidencia se interpretó mal.

Si cambia la realidad del proyecto, se agrega una corrida nueva.

---

## Regla final

El assessment no debe convertirse en ritual vacío.

Si una corrida no cambia decisión, riesgo, etapa o siguiente movimiento, entonces probablemente no hacía falta correrla todavía.
