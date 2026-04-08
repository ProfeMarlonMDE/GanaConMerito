# Arquitectura técnica recomendada, administrador del banco de preguntas

## Objetivo
Diseñar una solución robusta para cargar, validar, versionar y publicar preguntas hacia la base de datos sin duplicados, con trazabilidad total y operación sostenible sobre Next.js, Supabase y Docker.

## Diagnóstico ejecutivo
El mayor riesgo no es solo editorial. El mayor riesgo es arquitectónico: si las preguntas entran por flujos directos o semimanuales, el sistema queda expuesto a duplicados, falta de auditoría, errores de integridad, reprocesamientos inseguros y baja operabilidad.

Síntomas esperables de deuda técnica:
- inserciones directas desde UI o scripts ad hoc
- ausencia de staging antes de publicar
- falta de claves idempotentes
- tablas demasiado planas para soportar versiones
- carga síncrona en requests web
- validación insuficiente por capas
- trazabilidad deficiente entre archivo, fila y registro final
- operación sin panel de lotes, reintentos ni métricas

## Principios de diseño
1. Ninguna pregunta se publica directo desde frontend.
2. Toda carga entra primero a staging.
3. Toda importación vive dentro de un batch trazable.
4. Toda publicación al banco canónico debe ser idempotente.
5. Toda validación debe ejecutarse por etapas.
6. El procesamiento pesado debe vivir en workers, no en requests HTTP.
7. Cada cambio relevante debe quedar auditado.

## Arquitectura objetivo

### Capa 1. Captura
Responsable: Next.js

Funciones:
- permitir upload de CSV, XLSX o JSON
- persistir el archivo en Supabase Storage
- crear el registro `import_batches`
- disparar job de parseo
- mostrar estado operativo del lote

No debe hacer:
- parseo pesado de archivos
- validación profunda
- publicación final al banco

### Capa 2. Ingesta y staging
Responsable: Worker dockerizado

Funciones:
- descargar archivo desde Storage
- parsear filas
- normalizar payload
- registrar `import_rows`
- generar hashes, claves naturales y primeros diagnósticos

Salida:
- staging poblado y batch en estado `parsed` o `parse_failed`

### Capa 3. Validación por etapas
Responsable: Worker + librería de dominio compartida

Etapas:
1. esquema
2. negocio
3. referencial
4. duplicados
5. preparación de publicación

Cada hallazgo debe persistirse en `import_row_issues`.

### Capa 4. Publicación canónica
Responsable: Worker

Funciones:
- upsert de entidad pregunta
- creación de nueva versión si cambió contenido
- inserción de opciones
- actualización de referencias actuales
- auditoría del evento

Salida:
- filas válidas publicadas
- resumen del lote

### Capa 5. Operación y observabilidad
Responsable: Next.js + logs + métricas

Funciones:
- listar lotes
- ver errores por fila
- descargar reporte
- reprocesar lote
- revalidar
- publicar válidas
- observar throughput, errores y retries

## Modelo operativo recomendado

### Flujo general
1. Usuario sube archivo.
2. Se crea batch.
3. Job `import.parse` procesa el archivo.
4. Job `import.validate` aplica validaciones.
5. Job `import.publish` publica filas válidas.
6. Se cierra el batch con resumen.

### Estados del batch
- uploaded
- parsing
- parsed
- validating
- validated
- publishing
- published
- partially_failed
- failed
- cancelled

### Estados por fila
- pending
- parsed
- valid
- invalid
- duplicate
- publish_ready
- published
- rejected

## Reglas de idempotencia
Usar tres niveles:

### 1. Checksum de archivo
Evita reprocesamiento ciego del mismo archivo exacto.

### 2. Natural key por fila
Preferencia:
- `external_id` si existe
- de lo contrario una clave natural derivada del origen y del contenido estable

### 3. Content hash
Hash del contenido normalizado:
- enunciado limpio
- opciones ordenadas
- respuesta correcta
- explicación
- metadatos relevantes

### Política recomendada
- mismo natural key + mismo content hash: no-op
- mismo natural key + distinto content hash: nueva versión
- distinta natural key + mismo content hash: potencial duplicado, no publicar automáticamente sin regla explícita

## Modelo de datos recomendado
Separar claramente staging, canónico, taxonomía y auditoría.

### Staging
- `import_batches`
- `import_rows`
- `import_row_issues`

### Banco canónico
- `questions`
- `question_versions`
- `question_options`

### Taxonomía
- `subjects`
- `topics`
- `subtopics`
- `question_tags`
- `question_tag_map`

### Auditoría
- `question_events`

## Diseño de workers y cola

### Recomendación
Usar un worker Dockerizado y una cola basada en Postgres.

### Mejor ajuste al stack actual
`pg-boss`

Razones:
- aprovecha Postgres ya presente en Supabase
- evita introducir Redis si no es estrictamente necesario
- soporta retries, backoff y concurrencia
- reduce complejidad operativa inicial

### Jobs sugeridos
- `import.parse`
- `import.validate`
- `import.publish`
- `import.reconcile_duplicates`
- `import.rebuild_report`

## Validación por etapas

### Etapa 1. Esquema
Validar:
- columnas requeridas
- tipos
- enums
- estructura de opciones

Herramienta sugerida:
- Zod versionado en TypeScript

### Etapa 2. Negocio
Validar:
- cantidad de opciones
- unicidad de opción correcta
- consistencia entre tipo de pregunta y respuesta
- obligatoriedad de explicación si aplica
- límites de longitud

### Etapa 3. Referencial
Validar:
- existencia de subject, topic, subtopic
- integridad de catálogos

### Etapa 4. Duplicados
Validar:
- repetidos dentro del mismo batch
- repetidos contra banco canónico
- cambios reales versus no-op

### Etapa 5. Publicación
Validar:
- shape final del payload
- integridad de entidades hijas
- atomicidad transaccional por publicación

## Experiencia operativa recomendada

### Vista de lotes
Mostrar:
- batch id
- creador
- archivo fuente
- estado
- total de filas
- válidas
- inválidas
- publicadas
- duplicadas
- duración

### Detalle de lote
Mostrar:
- parser version
- schema version
- resumen por tipo de error
- filas con issues
- warning versus error
- acciones de reproceso o publicación

### Acciones operativas
- reprocesar batch
- revalidar batch
- publicar válidas
- cancelar batch
- descargar errores
- inspeccionar fila cruda y normalizada

## Observabilidad mínima

### Logs estructurados
Incluir siempre:
- import_batch_id
- import_row_id si aplica
- job_name
- stage
- duration_ms
- error_code

### Métricas
- lotes por día
- filas procesadas por minuto
- tasa de error
- tasa de duplicado
- tiempo promedio por etapa
- retries por job
- backlog de cola

### Alertas operativas
- lote fallido
- cola estancada
- tiempo de validación anormal
- incremento súbito de errores de esquema

## Recomendación de implementación

### Monorepo o paquete compartido
Crear un módulo reutilizable, por ejemplo:
- `packages/question-import-domain`

Debe contener:
- schemas Zod
- normalizadores
- reglas de negocio
- cálculo de hashes
- códigos de error
- tipos compartidos

### Distribución sugerida
- `apps/web`: Next.js admin
- `apps/worker`: jobs de ingestión
- `packages/question-import-domain`: lógica compartida

## Trade-offs

### Insert directo desde UI
Pros:
- más rápido de construir

Contras:
- no escala
- no es auditable
- alto riesgo de duplicados
- mala recuperación ante fallos

No recomendado.

### Staging con procesamiento corto sin cola
Pros:
- menor complejidad inicial
- mejor que insert directo

Contras:
- limitado para archivos grandes
- timeouts y reintentos incómodos

Solo aceptable como transición.

### Staging + worker + cola
Pros:
- escalable
- mantenible
- idempotente
- trazable
- operable

Contras:
- más diseño inicial
- más estados operativos

Esta es la opción óptima.

## Roadmap por fases

### Fase 0. Contención
- prohibir nuevas rutas manuales no trazables
- definir formato oficial de importación
- congelar el contrato de catálogos

### Fase 1. Base del pipeline
- tablas de staging
- upload a Storage
- parser inicial
- validación de esquema y negocio básica
- panel de lotes

### Fase 2. Banco canónico serio
- preguntas versionadas
- opciones normalizadas
- eventos de auditoría
- deduplicación consistente

### Fase 3. Asincronía robusta
- worker Dockerizado
- pg-boss
- retries y backoff
- métricas y logs estructurados

### Fase 4. Calidad editorial avanzada
- reglas de calidad más finas
- revisión asistida
- gestión de duplicados semánticos

### Fase 5. Gobierno operativo
- SLAs
- dashboard
- reporting ejecutivo
- integraciones de proveedores externos

## Criterios de éxito

### Técnicos
- reimportar el mismo archivo no duplica preguntas
- los jobs toleran reintentos seguros
- cada pregunta publicada se rastrea hasta batch y fila origen
- cambios de contenido generan versión, no sobreescritura silenciosa

### Operativos
- el operador identifica en minutos qué falló y por qué
- existe reporte descargable por lote
- existe visibilidad del throughput y errores

### De negocio
- menor tiempo entre recepción y publicación
- menor tasa de duplicados
- mayor confianza en el banco

## Recomendación final
Implementar un pipeline asíncrono de ingestión por lotes con staging, validación por etapas, publicación canónica versionada e idempotencia basada en natural key y content hash, operado por workers Dockerizados y cola sobre Postgres.

Eso convierte el administrador del banco de preguntas en un sistema serio, no en una pantalla de carga frágil.