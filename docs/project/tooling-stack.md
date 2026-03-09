# Arquitectura operativa de herramientas para el MVP

## Objetivo

Definir el stack operativo mínimo y pertinente para construir, probar, asegurar y evolucionar el MVP sin sobrecargarlo de herramientas prematuras.

---

## Principio rector

Configurar pocas herramientas, pero de alto impacto.

Criterios de selección:
- impacto directo sobre el MVP
- bajo costo de integración
- alta utilidad para desarrollo y validación
- compatibilidad con Next.js + Supabase + contenido Markdown
- capacidad de escalar sin rediseño temprano

---

## Resumen ejecutivo

### Núcleo recomendado ahora
1. GitHub
2. Supabase
3. Un proveedor LLM principal
4. Un proveedor LLM secundario de respaldo
5. GitHub Actions básica

### Muy pertinente después del núcleo
6. MCP GitHub
7. MCP Postgres/Supabase
8. MCP navegador
9. Docker para despliegue reproducible

### No priorizar todavía
- multimodalidad/voz
- observabilidad enterprise
- varios motores LLM activos al mismo tiempo
- paneles administrativos complejos
- pipelines avanzados de analítica

---

# 1. Herramientas núcleo

## 1.1 GitHub

### Propósito
Repositorio fuente, versionado, ramas, tags, historial técnico y base futura para CI/CD.

### Pertinencia para este proyecto
Muy alta.

### Uso previsto
- repositorio principal del MVP
- commits semánticos
- versionado por tags
- control del progreso técnico
- futuras PRs, issues y releases

### Configuración mínima
- repositorio activo
- acceso SSH estable
- convención de commits
- tags semánticos

### Riesgo si no se configura bien
- pérdida de trazabilidad
- malas prácticas de versionado
- dificultad para auditar cambios

---

## 1.2 Supabase

### Propósito
Base transaccional y de autenticación del MVP.

### Pertinencia para este proyecto
Crítica.

### Uso previsto
- Auth con Google
- PostgreSQL
- RLS
- persistencia de perfiles, sesiones, evaluaciones y snapshots
- storage opcional para assets

### Configuración mínima
- proyecto Supabase
- variables de entorno
- Google Auth habilitado
- ejecución de migraciones
- seed inicial

### Riesgo si no se configura bien
- auth rota
- acceso inseguro a datos
- incoherencia entre backend y modelo real

---

## 1.3 Proveedor LLM principal

### Propósito
Soportar:
- Tutor Guía
- evaluación cualitativa
- feedback
- remediación
- compresión de memoria

### Pertinencia para este proyecto
Crítica.

### Recomendación
Elegir uno solo como principal al inicio.

### Criterios de elección
- calidad en español
- costo razonable
- latencia aceptable
- buen soporte de output estructurado
- estabilidad de API

### Riesgo si se configuran varios desde el día 1
- complejidad innecesaria
- resultados inconsistentes
- mayor costo de integración
- más superficie de error

---

## 1.4 Proveedor LLM secundario

### Propósito
Respaldo operativo y comparación de calidad.

### Pertinencia para este proyecto
Alta, pero secundaria.

### Uso previsto
- fallback ante caída del proveedor principal
- pruebas comparativas de calidad
- validación de prompts críticos

### Recomendación
Mantenerlo desacoplado y no usarlo como motor principal del flujo mientras no sea necesario.

---

## 1.5 GitHub Actions básica

### Propósito
Automatizar validaciones mínimas del repositorio.

### Pertinencia para este proyecto
Alta.

### Pipeline inicial recomendado
- install
- lint
- typecheck
- build

### Fase sugerida
Temprana, después de estabilizar estructura base del repo.

### Riesgo de postergarla demasiado
- se acumulan errores simples
- baja confianza en cada avance
- integración más costosa después

---

# 2. MCP / integraciones muy pertinentes

## 2.1 MCP GitHub

### Propósito
Interacción estructurada con el repositorio y el flujo de trabajo.

### Aporta valor en
- issues
- PRs
- revisión de cambios
- consulta de historial
- release notes

### Pertinencia para este proyecto
Alta.

### Momento recomendado
Después de estabilizar la base documental y los primeros bloques de implementación.

---

## 2.2 MCP Postgres/Supabase

### Propósito
Inspección y validación directa del estado real de datos.

### Aporta valor en
- revisar tablas
- comprobar inserts
- depurar RLS
- validar sesiones
- revisar estadísticas y snapshots

### Pertinencia para este proyecto
Muy alta.

### Motivo
La aplicación depende fuertemente de reglas, estados y persistencia. Este MCP reduce fricción de diagnóstico.

### Momento recomendado
Cuando se conecte backend real con Supabase.

---

## 2.3 MCP navegador

### Propósito
Probar flujos reales de UI y PWA.

### Aporta valor en
- onboarding
- login
- práctica
- dashboard
- validación de PWA
- revisión de errores visibles

### Pertinencia para este proyecto
Alta.

### Momento recomendado
Cuando ya exista frontend funcional con auth y rutas reales.

---

# 3. Infraestructura y despliegue

## 3.1 Docker

### Propósito
Empaquetado reproducible del proyecto.

### Pertinencia para este proyecto
Alta.

### Uso previsto
- contenedor de Next.js
- reverse proxy si aplica
- despliegue en OCI ARM64

### Momento recomendado
Temprano, pero después de estabilizar la base backend mínima.

---

## 3.2 Reverse proxy (Caddy o Nginx)

### Propósito
HTTPS, enrutamiento y capa pública del servicio.

### Pertinencia para este proyecto
Media-alta.

### Uso previsto
- exponer la app
- servir PWA correctamente
- facilitar despliegue seguro

### Momento recomendado
Antes de exponer entorno real de prueba.

---

## 3.3 Skill `healthcheck`

### Propósito
Endurecimiento del host y revisión de postura de seguridad.

### Pertinencia para este proyecto
Alta si el MVP se desplegará en una VM pública.

### Aporta valor en
- firewall
- SSH
- actualizaciones
- exposición del host
- riesgo operacional

### Momento recomendado
Antes o durante la preparación del entorno de despliegue.

---

# 4. Herramientas y capacidades útiles, pero no primeras

## 4.1 MCP filesystem / gestión avanzada de archivos

### Pertinencia
Alta por el uso intensivo de Markdown.

### Motivo
El banco de preguntas será canónico en archivos, así que herramientas de manejo, validación y organización de lotes serán muy útiles.

### Momento recomendado
Cuando empiece carga real de contenido a escala.

---

## 4.2 Skill `skill-creator`

### Pertinencia
Media-alta.

### Motivo
Puede servir para encapsular tareas repetitivas en skills, por ejemplo:
- auditar contenido Markdown
- validar migraciones Supabase
- revisar contratos API
- generar estructuras de ítems

### Momento recomendado
Cuando ya existan flujos repetibles que valga la pena formalizar.

---

# 5. Lo que no conviene priorizar todavía

## 5.1 Voz / multimodalidad

### Motivo
No afecta el núcleo del MVP.

### Riesgo
Distrae del flujo pedagógico y del backend real.

---

## 5.2 Observabilidad enterprise

### Motivo
Prematura para esta etapa.

### Riesgo
Sobrecarga operacional sin valor temprano suficiente.

---

## 5.3 Multiproveedor LLM activo en producción desde el inicio

### Motivo
Aumenta complejidad antes de tener métricas claras.

### Riesgo
Inconsistencia funcional y aumento de costos.

---

## 5.4 Admin visual complejo

### Motivo
El MVP solo necesita carga, validación y listado básico.

### Riesgo
Inversión en interfaz antes de validar el flujo central.

---

# 6. Orden recomendado de configuración

## Fase 1 — obligatoria
1. GitHub
2. Supabase
3. Auth Google en Supabase
4. proveedor LLM principal
5. proveedor LLM secundario de respaldo

## Fase 2 — desarrollo controlado
6. GitHub Actions básica
7. Docker
8. MCP GitHub

## Fase 3 — validación e integración
9. MCP Postgres/Supabase
10. MCP navegador
11. hardening del host con `healthcheck`

## Fase 4 — optimización posterior
12. skills específicas del proyecto
13. herramientas de observabilidad más ricas
14. automatizaciones editoriales avanzadas

---

# 7. Recomendación operativa final

Si se busca máximo impacto con mínima complejidad, el stack operativo prioritario para este MVP debe ser:

- GitHub
- Supabase
- Google Auth
- 1 LLM principal
- 1 LLM de respaldo
- GitHub Actions básica
- Docker
- MCP GitHub
- MCP Postgres/Supabase
- MCP navegador

Todo lo demás debe entrar solo cuando el núcleo del producto ya esté validado.
