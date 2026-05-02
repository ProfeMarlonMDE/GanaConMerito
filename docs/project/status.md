---
id: PROJ-STATUS
name: status
project: ganaconmerito
owner: marlon-arcila
status: active
artifact_type: project
last_reviewed: 2026-05-02
---

# Project Status — GanaConMerito

Última actualización: 2026-05-02 (cierre documental post Sprint 4)

## Estado General: Productización madura (v0.5.0)
El core del producto fue endurecido para una experiencia móvil más clara, más consistente y con menor fricción en navegación, práctica y continuidad del flujo principal.

## Verdad operativa actual
- **Versión declarada de app**: 0.5.0
- **Commit funcional del Sprint 4**: `304f950`
- **Commit documental más reciente**: `ef13a4f`
- **Interpretación correcta**: `304f950` corresponde al cambio funcional del Sprint 4; `ef13a4f` corresponde al cierre documental posterior y no introduce una nueva feature funcional.
- **Triple verificación reportada en VPS**: `product` = `/opt/gcm/app` = runtime visible, con runtime funcional desplegado desde `304f950`.
- **BuildTime reportado para runtime funcional**: `2026-05-02T15:49:38Z`

## Sprint 4 — Productización del core (cerrado)
- **Foco**: UX/UI, hardening de estados y consistencia móvil.
- **Cambios reales**:
  - Navegación simplificada a `Inicio`, `Práctica` y `Métricas`.
  - Biblioteca/editorial fuera del flujo principal del usuario.
  - Implementación de `LoadingState`, `EmptyState` y `ErrorState`.
  - Reducción de fricción en `Home` y `Practice`.
- **Validación reportada**: smoke test verde y Playwright UI verde (`5` turnos) sobre el runtime funcional del sprint.

## Módulos y features
- **Auth**: estable.
- **Onboarding**: endurecido y obligatorio.
- **Practice**: núcleo principal optimizado.
- **Dashboard**: operativo y estable.
- **Tutor GCM**: gobernanza aprobada (ADR-002), funcionalidad **no** implementada.
- **Editorial**: superficie interna diferida; no forma parte de la navegación principal del usuario final.
