# Reporte de Despliegue - Commit 7bcb6e8

- **Fecha:** 2026-05-05T02:35:00Z
- **Agente:** Antigravity
- **Estado general:** WARN (App operativa, commit coincide, migración pendiente de verificación)

## Detalles del Hash
- **FINAL_COMMIT de master:** 7bcb6e883e59809ec43226e6aee5f777d3a952fa
- **FINAL_SHORT:** 7bcb6e8
- **SOURCE_HEAD (~/.openclaw/product):** 7bcb6e883e59809ec43226e6aee5f777d3a952fa
- **DEPLOY_HEAD (/opt/gcm/app):** 7bcb6e883e59809ec43226e6aee5f777d3a952fa
- **SOURCE_DEPLOY_MATCH:** OK

## Estado de Docker
- **Docker container status:** Up 6 seconds (Container ID: 0aece3eca3fd)
- **Logs:** Next.js listo en puerto 3000. Sin errores críticos.

## Verificación de Runtime
- **URL verificada:** https://cnsc.profemarlon.com/login
- **Commit visible:** 7bcb6e8
- **Build time visible:** 2026-05-05T02:25:32Z

## Migraciones y Base de Datos
- **Migración `0007_tutor_turn_traces.sql`:** Presente en `/opt/gcm/app/supabase/migrations`.
- **Tabla `tutor_turn_traces`:** Pendiente (No verificada en base de datos remota por falta de CLI vinculado en VPS).
- **Conflicto detectado:** Existe una colisión de prefijos en las migraciones:
  - `0007_backfill_profiles_nuclei.sql` (Fecha anterior)
  - `0007_tutor_turn_traces.sql` (Fecha actual)

## Errores y Riesgos
- **Errores:** Ninguno durante el despliegue de archivos y reconstrucción de Docker.
- **Riesgos:** La persistencia de trazas del Tutor GCM podría no estar funcionando si la migración no se aplicó debido al conflicto de numeración o falta de ejecución automática.

---
*Reporte generado automáticamente por Antigravity siguiendo las instrucciones de `pr-12-1.md`.*
