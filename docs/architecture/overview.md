# Arquitectura MVP — visión general

## Objetivo

Construir una PWA individual de práctica y evaluación adaptativa con:
- login con Google
- perfil persistente
- práctica guiada conversacional
- evaluación en tiempo real
- banco de preguntas en Markdown
- memoria por usuario
- dashboard individual

## Stack objetivo

- **Frontend / backend liviano:** Next.js App Router
- **Auth + DB:** Supabase Auth + PostgreSQL
- **Contenido canónico:** Markdown
- **Infraestructura:** Docker sobre Ubuntu 24.04 ARM64
- **Cliente final:** PWA instalable

## Principio rector

La aplicación se gobierna por:
- estado
- reglas
- evaluación
- persistencia

El LLM ayuda a conversar y explicar, pero no controla la lógica crítica del sistema.

## Capas principales

```text
PWA Next.js
 -> Orquestador de sesión
 -> Servicios de evaluación y tutoría
 -> Repositorio de contenidos Markdown
 -> Supabase Auth + Postgres
 -> Analítica y observabilidad
```

## Servicios internos definidos

### Visible al usuario
- **Tutor Guía**

### Internos
- **Orquestador de sesión**
- **Motor de evaluación**
- **Selector de ítems**
- **Compresor de contexto / memoria**
- **Validador y parser de contenido**

## Estado actual de implementación

Ya están creadas las bases de:
- migración SQL inicial
- seed mínimo
- contratos TypeScript
- stubs de rutas backend
- máquina de estados v1
- scoring heurístico base v1
