# AGENCY-STATUS.md

## Estado operativo actual
- Estado general: activo
- Nivel: diseñado y parcialmente operativo
- Dueño ejecutivo: Marlon Arcila
- Dueña operativa: Gauss🏗️

## Núcleo de agencia habilitado
- techlead-architecture
- frontend-product
- backend-services
- data-supabase
- qa-validation
- infra-devops

## Sesión opcional
- editorial-content
- estado: no activar salvo demanda real de contenido o copy

## Owners operativos
- Marlon: prioridad, alcance, tradeoffs y decisiones ejecutivas
- Gauss: intake, priorización, delegación, consolidación y escalamiento
- techlead-architecture: coherencia técnica transversal y deuda estructural
- data-supabase: esquema, migraciones, RLS, permisos e integridad
- infra-devops: entorno, despliegue, secretos, estabilidad y observabilidad
- backend-services: lógica de negocio, APIs, contratos e integraciones
- frontend-product: UX, UI, flujos, estados y PWA
- qa-validation: validación, evidencia, regresión y aceptación

## Sprint operativo vigente
- Nombre: Sprint 1 - Validación operativa mínima de la agencia
- Estado: activo
- Inicio: 2026-04-24
- Cierre objetivo: 2026-04-29

## Objetivo
Demostrar que la agencia funciona como sistema operativo real y no solo como estructura documental.

## Entregables verificables
1. Validación del runtime actual de los 6 agentes núcleo.
2. Confirmación de bootstrap operativo por agente contra su rol.
3. Ejecución de 3 delegaciones reales de punta a punta.
4. Matriz explícita de cuándo Gauss resuelve sola y cuándo delega.
5. Criterio de handoff mínimo entre especialistas.
6. Limpieza de sesiones que no aporten valor inmediato.

## Backlog P0
- validar runtime de agentes núcleo
- confirmar separación workspace vs product
- probar delegación por incidente técnico
- probar delegación por cambio funcional
- probar delegación por validación QA
- fijar criterio de escalamiento a Marlon
- aplicar regla: un especialista primero, múltiples solo si el problema ya está acotado

## Backlog P1
- checklist post-bootstrap por agente
- plantilla única de mandato operativo
- auditoría quincenal de sesiones activas e inactivas
- KPIs mínimos de agencia
- protocolo de hibernación y reactivación

## Riesgos inmediatos
- solapamiento Gauss vs Tech Lead
- delegación excesiva antes de aislar el problema
- sesiones vivas sin valor real
- handoffs vagos
- contaminación entre workspace y product
- QA entrando demasiado temprano

## Regla ejecutiva
No crear más estructura por ahora. Primero probar operación real, luego ajustar.
