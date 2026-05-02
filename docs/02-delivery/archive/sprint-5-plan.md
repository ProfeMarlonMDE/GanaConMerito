# Plan de Ejecución Sprint 5 — Base técnica gobernada de Tutor GCM

## 1. Lectura ejecutiva del estado actual
El proyecto GanaConMerito se encuentra en una etapa de maduración técnica tras el cierre del Sprint 4 (productización del core funcional). La fuente canónica de desarrollo reside en `/home/ubuntu/.openclaw/product` en el VPS, y el entorno de despliegue en `/opt/gcm/app`. El objetivo actual es sentar las bases para la funcionalidad del "Tutor GCM", estableciendo una infraestructura técnica sólida y gobernada, limitando su autoridad sobre la lógica de negocio (scoring, progresión de sesión, etc.) según lo dictado en el ADR-002, antes de exponerlo funcionalmente al usuario.

## 2. Alcance propuesto del Sprint 5
- Definición e implementación del contrato v1 para el turno del Tutor GCM (types claros para inputs/outputs).
- Implementación de guardrails de autoridad explícitos (restricciones de acciones permitidas).
- Creación de una capa o servicio de orquestación mínimo para el tutor.
- Implementación de un mecanismo de fallback (degradación honesta) ante falta de evidencia o certidumbre.
- Establecimiento de trazabilidad mínima por cada turno del asistente.
- Ejecución de pruebas QA (unitarias, negativas, de integración o smoke test del core).
- Actualización de la documentación arquitectónica y de status en el repositorio.

## 3. No alcance
- Modificaciones a la lógica central de negocio (avance, scoring, cierre de sesión).
- Exposición pública de interfaz del Tutor GCM con control total o multiagentes.
- Rediseño de la UX o reactivación del módulo editorial.
- Migraciones de base de datos en Supabase.
- Uso del directorio `/opt/gcm/app` como área de trabajo (se trabajará exclusivamente en `/home/ubuntu/.openclaw/product`).

## 4. Archivos probables a tocar
**Código:**
- `/home/ubuntu/.openclaw/product/src/types/tutor-turn.ts` (Nuevo)
- `/home/ubuntu/.openclaw/product/src/lib/tutor/tutor-orchestrator.ts` (Nuevo)
- `/home/ubuntu/.openclaw/product/src/domain/tutor/contract.ts` (Nuevo)
- `/home/ubuntu/.openclaw/product/src/app/api/tutor/route.ts` (Opcional, si se implementa endpoint mock/test)
- Pruebas en `/home/ubuntu/.openclaw/product/src/lib/tutor/tutor.test.ts` (Nuevo)

**Documentación:**
- `/home/ubuntu/.openclaw/product/docs/project/status.md`
- `/home/ubuntu/.openclaw/product/docs/02-delivery/sprint-log.md`
- `/home/ubuntu/.openclaw/product/docs/02-delivery/change-log.md`
- `/home/ubuntu/.openclaw/product/docs/01-product/backlog.md`

## 5. Riesgos técnicos
- Romper el core existente al integrar la capa de orquestación.
- Permitir, por diseño deficiente, que la entidad del LLM asuma responsabilidades de negocio (ej. avanzar sesión).
- Implementar una trazabilidad o contrato demasiado complejo o mágico que dificulte el debugging.
- Divergencia entre el código en el VPS (`/home/ubuntu/.openclaw/product`) y el despliegue (`/opt/gcm/app`) si se requiere deploy.

## 6. Plan corto de ejecución
1. **Andamiaje Inicial**: Crear las carpetas y archivos base en `src/types`, `src/lib/tutor`, `src/domain/tutor`.
2. **Implementación de Tipos y Contrato**: Definir interfaces `TutorInput`, `TutorOutput`, `TutorContext` y `TutorTrace` asegurando las reglas de autoridad.
3. **Capa de Orquestación**: Escribir la lógica en `tutor-orchestrator.ts` que valide entradas, invoque un "mock" del LLM (fallback honesto), registre trazabilidad y emita salidas estructuralmente correctas.
4. **Pruebas (QA)**: Ejecutar `npm run build` o `npm test` en el proyecto para validar unitarias, humo y pruebas negativas (rechazos de acciones no autorizadas).
5. **Actualización Documental**: Reflejar los cambios y la arquitectura implementada en los archivos de docs.
6. **Commit y Sincronización**: Registrar cambios en git y, si se requiere para validación del equipo, realizar despliegue rebuild en `/opt/gcm/app` siguiendo el flujo correcto.

## 7. Accesos faltantes si existen
- De momento, cuento con acceso SSH al VPS (`ganaconmerito`) y permisos de ejecución en la fuente canónica `/home/ubuntu/.openclaw/product`. No se detectan accesos faltantes para la implementación inicial del código.
