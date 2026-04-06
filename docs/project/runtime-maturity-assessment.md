# Runtime Maturity Assessment — GanaConMerito

## Propósito

Mantener un reporte técnico incremental sobre la madurez real del proyecto frente a su etapa declarada.

Este documento no existe para repetir el changelog ni para describir la arquitectura base.
Existe para responder, en cada corte:
- en qué etapa real está el proyecto,
- qué evidencia sostiene esa lectura,
- qué contradice la etapa deseada,
- qué cambió desde la última evaluación,
- y cuál es el siguiente movimiento exacto.

---

## Uso correcto del documento

Este reporte debe actualizarse **de forma incremental**.

Regla obligatoria:
- **no sobrescribir evaluaciones anteriores**,
- **no reescribir el historial completo salvo que haya error factual**,
- **agregar una nueva entrada al final en la sección `Corridas de evaluación`**,
- **arrastrar solo el estado consolidado necesario en la sección `Estado consolidado actual`**.

Este documento sirve como bitácora de madurez operativa.

---

## Objetivo del análisis

Determinar la **etapa real del proyecto** usando evidencia técnica observable, no intención declarada.

La pregunta central es:

> ¿El sistema se comporta como el tipo de producto que dice ser hoy?

---

## Etapas de referencia

### 1. Idea / pre-MVP
Existe dirección conceptual, pero no hay flujo implementado confiable.

### 2. MVP técnico
Ya hay arquitectura, endpoints, DB o UI base, pero el sistema aún depende de supuestos, stubs o validación incompleta.

### 3. MVP funcional endurecido
Ya existe flujo real implementado en varias capas, con persistencia, reglas y validación técnica parcial. Aún no está listo para operación confiable.

### 4. Preproducción avanzada
El producto ya puede correrse de forma realista, tiene versionado consistente, despliegue encaminado y bloques críticos endurecidos, pero aún faltan cierres funcionales/operativos para declararlo producción temprana.

### 5. Producción temprana
Ya existe despliegue operativo verificable con validación end-to-end real, fuente de verdad estable, flujo principal utilizable y disciplina de cambios razonablemente confiable. Puede haber deuda, pero no ambigüedad fundamental sobre el comportamiento principal.

### 6. Producción estabilizada
El producto ya no depende de validaciones fundacionales. El trabajo dominante pasa a ser confiabilidad, métricas, observabilidad, mejora de experiencia y expansión controlada.

---

## Criterios de análisis mejorados

Cada corrida debe revisar como mínimo estos 10 ejes.

### C1. Flujo principal implementado
Preguntar:
- ¿el flujo principal existe de verdad?
- ¿está implementado en frontend, backend y DB?
- ¿o sigue repartido entre docs, intención y piezas aisladas?

### C2. Validación E2E real
Preguntar:
- ¿el flujo principal fue probado extremo a extremo?
- ¿la prueba fue autenticada si el sistema lo exige?
- ¿la validación fue local, remota o pública?

### C3. Contratos funcionales
Preguntar:
- ¿los estados principales del producto están explícitos?
- ¿los errores y transiciones están diferenciados?
- ¿QA y frontend podrían validar sin adivinar?

### C4. Integridad de datos y auth
Preguntar:
- ¿auth, perfiles, permisos, bootstrap y ownership están cerrados?
- ¿o todavía hay riesgo de sesión válida con estado inconsistente?

### C5. Disciplina de despliegue
Preguntar:
- ¿hay una ruta clara entre cambio → commit → push → deploy → validación?
- ¿el contenedor/runtime real corresponde al código versionado?

### C6. Fuente de verdad y drift
Preguntar:
- ¿GitHub es realmente canónico?
- ¿hay cambios locales sin consolidar?
- ¿hay divergencia entre repo, VPS, docs o entorno vivo?

### C7. Versionado y trazabilidad
Preguntar:
- ¿los tags y commits cuentan una historia técnica coherente?
- ¿se puede ubicar cuándo cambió qué y por qué?

### C8. Operación mínima real
Preguntar:
- ¿el producto solo compila o realmente opera?
- ¿hay usuarios reales, sesiones reales, registros reales o interacción viva?

### C9. Riesgo de ilusión de madurez
Preguntar:
- ¿el sistema parece más listo de lo que realmente está?
- ¿hay mucha documentación/remediación que enmascara validación incompleta?

### C10. Preparación para la siguiente etapa
Preguntar:
- ¿qué faltaría exactamente para subir una etapa?
- ¿cuál es el cuello actual: arquitectura, flujo, runtime, auth, datos, deploy o disciplina operativa?

---

## Entradas obligatorias para cada nueva corrida

Antes de actualizar este reporte, revisar como mínimo:

### Documentación del repo
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

### Señales git mínimas
Ejecutar y revisar:

```bash
git branch --show-current
git status --short --branch
git tag --sort=-creatordate | head -20
git log --oneline --decorate -n 20
git remote -v
```

### Señales operativas mínimas recomendadas
Si aplica en ese momento, revisar también:

```bash
docker compose ps
npm run build
```

Y si el corte es sobre entorno real o remoto:
- evidencia de login real
- evidencia de onboarding real
- evidencia de práctica real
- evidencia de dashboard real
- primera falla observable si existe

---

## Método de actualización

### Paso 1 — leer evidencia
No evaluar desde memoria ni intuición.

### Paso 2 — comparar etapa declarada vs etapa real
No asumir que “producción temprana” es verdad porque el proyecto lo desee.

### Paso 3 — identificar contradicciones
Nombrar con claridad qué evidencia impide aceptar la etapa deseada.

### Paso 4 — detectar avances reales
Distinguir:
- avance de implementación,
- avance de hardening,
- avance de validación,
- avance de operación.

### Paso 5 — actualizar este documento
Hacer dos movimientos:
1. actualizar `Estado consolidado actual`
2. agregar una nueva entrada en `Corridas de evaluación`

---

## Plantilla obligatoria para cada corrida

```markdown
## [YYYY-MM-DD HH:MM UTC] Corte de madurez

### Etapa declarada
...

### Etapa real estimada
...

### Diagnóstico ejecutivo
...

### Evidencia a favor de esta etapa
- ...

### Evidencia que impide subir de etapa
- ...

### Riesgos de lectura equivocada
- ...

### Cambios nuevos desde la corrida anterior
- ...

### Drift / inconsistencias detectadas
- ...

### Veredicto
...

### Siguiente movimiento exacto
1. ...
2. ...
3. ...
```

---

## Estado consolidado actual

### Etapa declarada por dirección
Producción temprana.

### Etapa real estimada vigente
**Preproducción avanzada con despliegue funcional parcial**.

### Lectura consolidada
El proyecto ya superó un MVP técnico simple.
Tiene base de datos real, auth integrada, onboarding/práctica/dashboard implementados, remediaciones estructurales ejecutadas, versionado consistente y señales claras de endurecimiento técnico.

Sin embargo, todavía no alcanza el umbral de producción temprana confiable porque persisten huecos en:
- validación E2E autenticada completa,
- cierre operativo del flujo real,
- contratos funcionales completamente explicitados,
- disciplina estricta de fuente de verdad,
- y limpieza del drift local del repo.

### Qué sí está sólido
- arquitectura y modelo base definidos
- Supabase remoto enlazado y migraciones aplicadas
- versión semántica sostenida hasta serie `v0.4.x`
- hardening relevante en auth, sesiones, DB y trazabilidad
- flujo pedagógico base ya materializado en producto real

### Qué sigue inestable
- validación operativa extremo a extremo
- cierre real del flujo auth → onboarding → practice → dashboard
- capacidad de declarar “producción temprana” sin contradicción documental/técnica
- alineación estricta entre repo local, docs y runtime vivo

### Condición para subir a producción temprana
Para subir de etapa sin autoengaño, el proyecto debe demostrar como mínimo:
1. E2E autenticada real cerrada
2. flujo principal validado sobre entorno real
3. contrato funcional visible y backend suficientemente claro
4. repo limpio o drift explicado y consolidado
5. deploy y validación reproducibles

---

## Corridas de evaluación

## [2026-04-06 00:42 UTC] Corte de madurez

### Etapa declarada
Producción temprana.

### Etapa real estimada
Preproducción avanzada con despliegue funcional parcial.

### Diagnóstico ejecutivo
El proyecto ya pasó la etapa de MVP de laboratorio y tiene suficiente implementación real para considerarse un sistema funcional endurecido. Aun así, no puede declararse producción temprana consolidada porque la validación extremo a extremo, la operación real y la disciplina de fuente de verdad todavía no están cerradas.

### Evidencia a favor de esta etapa
- `docs/project/status.md` reporta flujo real en onboarding, práctica, dashboard, auth y persistencia.
- existe remediación estructurada R1–R4 y RA1–RA3.
- hay tags coherentes hasta `v0.4.8`.
- `master` está alineada con `origin/master`.
- el proyecto muestra fixes de producción, RPC atómica, hardening auth y trazabilidad de versión.

### Evidencia que impide subir de etapa
- `docs/project/e2e-status.md` sigue marcando pendiente la E2E autenticada completa.
- `docs/project/status.md` todavía recomienda cerrar primer login real y validación pública.
- `docs/project/remediation/ra1-session-security.md` documenta que la validación funcional remota quedó bloqueada por ausencia de usuarios reales bootstrappeados.
- el repo local presenta drift: archivos borrados heredados del workspace OpenClaw y artefactos nuevos (`Dockerfile`, `.dockerignore`) sin consolidar.
- varias piezas siguen descritas como frontend mínimo o cierre técnico local pendiente de validación funcional real.

### Riesgos de lectura equivocada
- confundir hardening documental con cierre operativo real
- asumir que compilar, migrar y tener tags equivale a producción temprana
- dejar que el despliegue aparente más madurez de la que el flujo real soporta hoy

### Cambios nuevos desde la corrida anterior
- primera formalización de este corte incremental
- incorporación del criterio de drift local dentro del diagnóstico de etapa
- incorporación del versionado `v0.4.x` como señal de madurez, pero no como prueba suficiente de operación real

### Drift / inconsistencias detectadas
- archivos de OpenClaw/workspace aún aparecen como borrados dentro del repo local
- existen artefactos de despliegue no consolidados en git (`Dockerfile`, `.dockerignore`)
- `source-of-truth.md` menciona rutas operativas que no coinciden exactamente con la ruta actual usada para el repo (`/opt/gcm/app`), lo que exige revisión en el siguiente corte

### Veredicto
El proyecto está en una franja madura de preproducción, no en producción temprana limpia. Ya construyó suficiente producto real, pero todavía no cerró el circuito completo de operación confiable.

### Siguiente movimiento exacto
1. limpiar o explicar el drift local del repo
2. revisar Docker/compose como artefactos reales de despliegue y no como piezas sueltas
3. cerrar E2E autenticada real sobre flujo principal
4. actualizar la fuente de verdad documental de rutas y entorno
5. correr un nuevo corte de madurez después de esa validación
