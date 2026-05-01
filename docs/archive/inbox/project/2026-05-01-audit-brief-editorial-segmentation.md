# Audit Brief — Segmentación por perfil profesional + módulo editorial/admin

## Proyecto
**GanaConMerito**

---

## 1. Objetivo de la auditoría

Validar si la propuesta reciente de evolución arquitectónica es coherente con:

- la arquitectura actual de `GanaConMerito`
- la lógica de negocio de la aplicación
- la inteligencia de negocio del banco de preguntas
- el flujo adaptativo de práctica
- el stack tecnológico actual
- la evolución prevista hacia un módulo administrativo/editorial

---

## 2. Componentes específicos a auditar

La auditoría debe centrarse en dos piezas nuevas:

### A. Plan de arquitectura e implementación
- `docs/architecture/editorial-admin-implementation-plan.md`

### B. Migración base propuesta
- `supabase/migrations/0006_profiles_nuclei_editorial_base.sql`

---

## 3. Contexto del producto

### Nombre del sistema
- `GanaConMerito`

### Propósito funcional
Aplicación de práctica y evaluación adaptativa para profesionales que se preparan para procesos o exámenes.

### Tipos de usuarios
- profesionales de distintas áreas
- docentes de distintas disciplinas
- perfiles profesionales diferentes que pueden compartir conjuntos de preguntas
- conjuntos de preguntas universales para todos los perfiles

---

## 4. Nueva necesidad de negocio

La disponibilidad de preguntas no debe depender únicamente de la publicación global.

También debe depender de:

- perfil profesional del usuario
- acceso a determinados núcleos temáticos
- existencia de núcleos universales

---

## 5. Hipótesis arquitectónica que se quiere validar

La propuesta plantea que la arquitectura correcta para segmentar el banco de preguntas es:

- muchos perfiles profesionales ↔ muchos núcleos temáticos

Y además:

- cada pregunta pertenece a un núcleo temático principal
- las preguntas universales se modelan mediante núcleos marcados como universales
- la segmentación se hace en `perfil profesional ↔ núcleo temático`
- la segmentación **no** se hace directamente en `perfil ↔ pregunta`, salvo excepciones futuras

---

## 6. Regla de negocio propuesta

Una pregunta debe estar disponible para un usuario si:

1. está publicada y activa
2. pertenece a un núcleo activo
3. el núcleo es universal
4. o el núcleo está habilitado para el perfil profesional del usuario

---

## 7. Modelo de datos propuesto

### Nuevas tablas
- `professional_profiles`
- `thematic_nuclei`
- `profile_thematic_nuclei`

### Relación propuesta
- `professional_profiles`
- `profile_thematic_nuclei`
- `thematic_nuclei`

### Extensiones propuestas

#### Tabla `profiles`
- `profiles.professional_profile_id`

#### Tabla `item_bank`
- `item_bank.thematic_nucleus_id`
- `item_bank.status`
- `item_bank.is_active`
- `item_bank.source_type`
- `item_bank.source_path`

---

## 8. Estados editoriales propuestos

- `draft`
- `review`
- `published`
- `archived`

---

## 9. Arquitectura actual del sistema

### Banco de preguntas
Tabla principal:
- `item_bank`

### Selección actual de preguntas
Función principal:
- `selectNextItem(...)`

Filtros actuales:
- `is_published = true`
- `area`
- `competency`
- exclusión de preguntas ya vistas

---

## 10. Modelo actual de usuario

Existen dos tablas relevantes:
- `profiles`
- `learning_profiles`

`learning_profiles` contiene actualmente:
- `target_role`
- `exam_type`
- `active_areas`
- `active_goal`

---

## 11. Estado operativo actual

### Producción
- desplegada en `https://cnsc.profemarlon.com`

### Estado operativo relevante
- producción validada end-to-end
- flujo base funcionando
- deploy automatizado ya recuperado y operativo

### Stack tecnológico actual

#### Frontend
- Next.js (App Router)
- TypeScript

Rutas principales:
- `/login`
- `/home`
- `/practice`
- `/dashboard`

#### Backend
- Supabase
- PostgreSQL
- migraciones SQL en `supabase/migrations/*.sql`

#### Autenticación
- Supabase Auth
- Google login

#### Infraestructura
- Nginx
- systemd
- VPS
- Cloudflare

---

## 12. Módulo futuro que debe quedar alineado

### Ruta prevista
- `/admin/editorial/*`

### Finalidad
Administrar:
- contenidos
- preguntas
- carga
- visualización
- validación
- publicación
- activación/desactivación
- matriz perfil ↔ núcleo

### Submódulos previstos
- dashboard editorial
- listado de preguntas
- detalle de pregunta
- carga de markdown
- validación editorial
- gestión de núcleos
- gestión de perfiles
- matriz perfil ↔ núcleo

---

## 13. Riesgos que la auditoría debe revisar

### Riesgo 1 — duplicación semántica
Si `professional_profiles` duplica de forma mala o ambigua lo que hoy ya existe en:
- `learning_profiles.target_role`
- `learning_profiles.exam_type`

### Riesgo 2 — complejidad prematura
Si meter simultáneamente:
- perfiles
- núcleos
- estados editoriales
- admin modular

es demasiado para el estado actual del producto.

### Riesgo 3 — ruptura de selección adaptativa
Si la nueva capa puede romper o ensuciar:
- `selectNextItem`
- práctica
- remediación
- dashboard

### Riesgo 4 — unidad incorrecta de segmentación
Confirmar si la unidad correcta de negocio es realmente:
- núcleo temático

y no:
- área
- competencia
- pregunta individual
- `exam_type`
- `target_role`

### Riesgo 5 — modelo editorial inconsistente
Ver si:
- una pregunta debe pertenecer a un solo núcleo principal
- o si habría que permitir varios núcleos
- y si eso complica demasiado el sistema

### Riesgo 6 — transición de datos existentes
Cómo hacer backfill desde `item_bank` actual sin romper producción.

### Riesgo 7 — permisos/admin
Si el futuro `/admin/editorial/*` debería depender de:
- `profiles.is_admin`
- roles adicionales tipo `editor`
- otra estrategia

---

## 14. Lo que la auditoría debe verificar

1. si el modelo `perfil profesional ↔ núcleo temático` es correcto para este negocio
2. si la unidad correcta de segmentación es el núcleo temático
3. si la propuesta duplica mal información ya existente en `learning_profiles`
4. si esta propuesta rompe o ensucia la lógica adaptativa actual
5. si conviene que cada pregunta tenga un solo núcleo principal
6. si el estado editorial propuesto es suficiente y coherente
7. si el futuro módulo `/admin/editorial/*` está bien planteado
8. si el orden de implementación propuesto es correcto
9. si la migración base propuesta debería ajustarse antes de aplicarse

---

## 15. Archivos que deben auditarse para contexto

### Arquitectura
- `docs/architecture/editorial-admin-implementation-plan.md`
- `docs/architecture/editorial-module-plan.md`
- `docs/architecture/overview.md`

### Base de datos
- `docs/database/schema.md`
- `supabase/migrations/0001_init_mvp.sql`
- `supabase/migrations/0006_profiles_nuclei_editorial_base.sql`

### Lógica adaptativa
- `src/domain/item-selection/select-next-item.ts`

### API
- `docs/api/contracts.md`

---

## 16. Entregables esperados de la auditoría

La auditoría debe producir:

### A. Veredicto general
- aprobado
- aprobado con ajustes
- no recomendado

### B. Coherencia de negocio
Evaluar si el modelo `perfil ↔ núcleo` representa correctamente el negocio.

### C. Coherencia técnica
Evaluar si el modelo encaja con:
- el esquema actual
- el stack
- la lógica adaptativa

### D. Riesgos concretos
Lista priorizada de riesgos técnicos o de negocio.

### E. Ajustes recomendados
Cambios específicos sugeridos.

### F. Orden de implementación recomendado
Definir:
- qué implementar primero
- qué aplazar

### G. Veredicto sobre la migración 0006
Indicar:
- qué está correcto
- qué debe corregirse antes de aplicarse

### H. Alternativas
Si existe una arquitectura mejor, describirla con precisión.

---

## 17. Pregunta crítica que debe guiar la auditoría

La auditoría debe responder principalmente a esta pregunta:

> ¿Estamos introduciendo la mínima complejidad necesaria para soportar segmentación real por perfil profesional sin romper el modelo adaptativo actual?

---

## 18. Prompt listo para otra IA

```text
Quiero que hagas una auditoría técnica y de negocio de una propuesta de evolución arquitectónica para mi aplicación GanaConMerito, antes de implementarla.

## Objetivo de la auditoría
Validar si la propuesta es coherente con:
- la arquitectura actual
- la lógica de negocio
- la inteligencia de negocio del banco de preguntas
- el flujo adaptativo de práctica
- el stack tecnológico real
- la futura evolución hacia un módulo administrativo/editorial

## Contexto del producto
GanaConMerito es una aplicación de práctica y evaluación adaptativa para profesionales de distintas áreas. Entre ellos hay docentes de distintas áreas, que en varios casos pueden asemejarse a otros perfiles profesionales en cuanto a conjuntos de preguntas compartidos.

La nueva necesidad es esta:
- distintos perfiles profesionales deben acceder a distintos conjuntos de preguntas
- varios perfiles pueden compartir un mismo conjunto de preguntas
- además existen conjuntos de preguntas que deben ser universales para todos los perfiles

## Hipótesis arquitectónica a auditar
La propuesta actual plantea:
- muchos perfiles profesionales ↔ muchos núcleos temáticos
- cada pregunta pertenece a un núcleo temático principal
- las preguntas universales no se modelan por duplicación sino por núcleos marcados como universales
- la segmentación debe hacerse en el nivel perfil ↔ núcleo, no perfil ↔ pregunta

## Modelo propuesto
Nuevas tablas:
- professional_profiles
- thematic_nuclei
- profile_thematic_nuclei

Extensiones propuestas:
- profiles.professional_profile_id
- item_bank.thematic_nucleus_id
- item_bank.status
- item_bank.is_active
- item_bank.source_type
- item_bank.source_path

Estados editoriales propuestos:
- draft
- review
- published
- archived

## Regla de negocio propuesta
Una pregunta debe estar disponible para un usuario si:
1. está publicada y activa
2. pertenece a un núcleo activo
3. el núcleo es universal, o
4. el núcleo está habilitado para el perfil profesional del usuario

## Arquitectura actual real
Stack:
- Next.js App Router
- TypeScript
- Supabase
- PostgreSQL
- Supabase Auth
- Nginx
- systemd
- Cloudflare
- producción en https://cnsc.profemarlon.com

Estado actual del modelo:
- el banco vive principalmente en item_bank
- la selección actual de preguntas filtra por is_published, area, competency y exclusión de ids vistos
- existen profiles y learning_profiles
- learning_profiles ya contiene target_role, exam_type, active_goal y active_areas

## Lo que necesito que audites
1. si el modelo perfil profesional ↔ núcleo temático es correcto para este negocio
2. si la unidad correcta de segmentación es el núcleo temático
3. si la propuesta duplica mal información ya existente en learning_profiles
4. si esta propuesta rompe o ensucia la lógica adaptativa actual
5. si conviene que cada pregunta tenga un solo núcleo principal
6. si el estado editorial propuesto es suficiente y coherente
7. si el futuro módulo /admin/editorial/* está bien planteado
8. si el orden de implementación propuesto es correcto
9. si la migración base propuesta debería ajustarse antes de aplicarse

## Módulo futuro previsto
/admin/editorial/*
para:
- visualización de preguntas
- administración de contenidos
- carga de markdown
- validación editorial
- administración de núcleos
- administración de perfiles
- matriz perfil ↔ núcleo

## Documentos a auditar
Debes analizar críticamente estas dos piezas:

1. Plan:
docs/architecture/editorial-admin-implementation-plan.md

2. Migración:
supabase/migrations/0006_profiles_nuclei_editorial_base.sql

## Instrucciones de auditoría
No quiero una aprobación superficial.
Quiero que:
- señales inconsistencias reales
- identifiques duplicaciones semánticas
- detectes riesgos de arquitectura o negocio
- propongas ajustes concretos
- me digas si esto está bien para evolucionar la app sin rehacerla después

## Formato de respuesta requerido
Responde en esta estructura:

A. Veredicto general
B. Coherencia de negocio
C. Coherencia técnica
D. Riesgos concretos
E. Ajustes recomendados
F. Orden de implementación recomendado
G. Veredicto puntual sobre la migración 0006
H. Si ves una mejor alternativa, descríbela con precisión
```

---

## 19. Recomendación adicional para la auditoría

Pídele explícitamente que evalúe esto con la pregunta central:

> ¿Estamos introduciendo la mínima complejidad necesaria para soportar segmentación real por perfil profesional sin romper el modelo adaptativo actual?

Esa es la pregunta crítica.
