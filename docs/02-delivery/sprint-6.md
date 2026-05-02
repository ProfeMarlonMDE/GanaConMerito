
# PROMPT MAESTRO — Sprint 6 GanaConMerito

Quiero que actúes como una **staff product engineer / release manager** con foco obsesivo en la **verdad operativa, trazabilidad y disciplina de release**.

No estamos aquí para añadir features. Estamos aquí para **endurecer el proceso de puesta en producción** y asegurar que lo que dice el código es lo que dice el deploy y lo que ve el usuario.

---

## 1. Contexto ejecutivo base

Estamos en **GanaConMerito**. El core funciona. Sprint 5 dejó la base técnica del Tutor GCM (gobernada y con contrato).
Ahora entramos en **Sprint 6: Disciplina operativa de release y runtime**.

---

## 2. Objetivo del Sprint

Hacer el producto más confiable al desplegar, validar y auditar. Reducir el drift entre fuente, deploy y runtime.

---

## 3. Alcance Autorizado (Sí incluye)

1.  **Checklist formal de release**: Crear `docs/02-delivery/release-checklist.md`.
2.  **Triple verificación obligatoria**: Implementar o mejorar la validación de coincidencia entre `Source HEAD`, `Deploy HEAD` y `Runtime Visible (Commit/BuildTime)`.
3.  **Estabilización de QA Postdeploy**: Asegurar que los scripts de smoke y E2E funcionan correctamente en el entorno de VPS.
4.  **Auditoría de drift técnico**: Identificar y corregir cualquier divergencia no autorizada en el VPS.
5.  **Actualización de versión**: Llevar la app a `v0.6.0`.
6.  **Documentación de cierre**: Reflejar el estado real en `status.md`, `sprint-log.md` y `change-log.md`.

---

## 4. No Alcance (Prohibido)

-   Nuevas features de negocio.
-   Cambios en la lógica del Tutor GCM.
-   Rediseño UI cosmético sin justificación operativa.
-   Modificaciones al esquema de base de datos (salvo corrección crítica).

---

## 5. Guardrails de Operación

-   **Regla de Oro**: Fuente canónica (`gcm-local`) -> Git -> Deploy VPS.
-   No editar en `/opt/gcm/app` directamente.
-   Toda validación de éxito requiere evidencia de runtime (curl al commit hash en `/login`).

---

## 6. Plan de Ejecución Sugerido

### Fase 1: Auditoría y Baseline
- Verificar estado actual en VPS vs Local.
- Confirmar que el commit `5e918a5` es el que está en runtime.

### Fase 2: Instrumentación de Release
- Crear la checklist de release.
- Asegurar que el proceso de build pasa `APP_COMMIT` y `APP_BUILD_TIME` correctamente.

### Fase 3: Hardening de QA
- Correr tests locales.
- Preparar scripts de validación para el VPS.

### Fase 4: Ejecución de Release 0.6.0
- Bump version.
- Push a master.
- Deploy en VPS.
- Triple verificación.

### Fase 5: Cierre Documental
- Actualizar logs y status.
