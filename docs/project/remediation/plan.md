# Plan de remediación ejecutable

## Estado
En ejecución.

## Orden exacto

### Fase R1 — Seguridad/Auth crítica
1. Proteger `/api/content/upload` con auth + verificación de admin.
2. Corregir callback auth para evitar sesión válida + perfil inconsistente.
3. Corregir `bootstrapUserProfile` para recuperación real de estados parciales.
4. Revisar y ajustar middleware SSR/cookies según patrón oficial de Supabase.

### Fase R2 — Núcleo de sesiones
5. Refactorizar `session/start` para calcular estado inicial real desde DB.
6. Refactorizar `session/advance` para usar estado real e historial real.
7. Evitar loops del selector de ítems excluyendo historial completo de la sesión.
8. Actualizar `user_topic_stats` y snapshots básicos.

### Fase R3 — DB y contenido
9. Añadir `updated_at` + triggers a tablas operativas.
10. Endurecer dominio de `target_role` y `exam_type`.
11. Diseñar/implementar atomicidad para persistencia de contenido.
12. Definir identidad canónica del contenido.

### Fase R4 — Robustez de API y producto
13. Añadir validación runtime a endpoints críticos.
14. Ejecutar pruebas E2E reales de login y ciclo base.
15. Construir frontend mínimo real de onboarding/práctica/dashboard.

## Método de ejecución
- Paralelización dentro de cada fase cuando no haya dependencia directa.
- No se cierra una fase sin revisión del supervisor.
- Cada bloque debe actualizar documentación, commit, tag y push.
