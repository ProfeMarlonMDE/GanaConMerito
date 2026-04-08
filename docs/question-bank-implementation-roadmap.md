# Roadmap de implementación, administrador del banco de preguntas

## Objetivo
Bajar la arquitectura recomendada a una secuencia ejecutable por fases, con entregables claros, decisiones técnicas y criterios de salida.

## Fase 0, contención y alineación
### Objetivo
Detener el crecimiento de deuda técnica mientras se define el contrato base.

### Acciones
- congelar rutas manuales no trazables de inserción
- definir formato oficial de importación, mínimo CSV y JSON; XLSX opcional con parser controlado
- cerrar catálogo inicial de `subject`, `topic`, `subtopic`, `difficulty`, `question_type`
- decidir política de publicación: automática para válidas o manual con aprobación
- definir ownership entre Editorial, QA, Data y Backend

### Entregables
- contrato de importación v1
- diccionario de catálogos
- decisión formal de estados del pipeline

### Criterio de salida
No existe ninguna ruta ambigua de carga a producción fuera del pipeline aprobado.

## Fase 1, staging y trazabilidad mínima viable
### Objetivo
Tener un pipeline funcional con staging y reporte de errores.

### Acciones
- crear tablas `import_batches`, `import_rows`, `import_row_issues`
- implementar upload a Supabase Storage
- crear endpoint Next.js para crear lote y registrar archivo
- implementar parser inicial para CSV y JSON
- persistir `raw_payload` y `normalized_payload`
- exponer panel básico de lotes

### Entregables
- migración SQL inicial
- vista de lotes en admin
- parser v1
- reporte de errores por fila

### Criterio de salida
Un operador puede subir un archivo, ver cuántas filas fallaron y descargar el detalle.

## Fase 2, validación por etapas e idempotencia
### Objetivo
Evitar duplicados y separar claramente tipos de fallo.

### Acciones
- crear librería compartida de dominio
- implementar schemas Zod versionados
- calcular `natural_key` y `content_hash`
- agregar validación de esquema, negocio, referencial y duplicados
- definir política de no-op, nueva versión y rechazo por duplicado

### Entregables
- paquete compartido `question-import-domain`
- matriz de códigos de error
- idempotencia operacional documentada

### Criterio de salida
Reimportar el mismo archivo o la misma fila no produce duplicados silenciosos.

## Fase 3, banco canónico versionado
### Objetivo
Separar staging del modelo definitivo y soportar evolución del contenido.

### Acciones
- crear tablas `questions`, `question_versions`, `question_options`, `question_events`
- implementar publicación controlada hacia el banco canónico
- soportar versionado de contenido
- enlazar `current_version_id`
- persistir auditoría del evento de publicación

### Entregables
- migración SQL canónica
- servicio de publicación transaccional
- estrategia de rollback por errores de publicación

### Criterio de salida
Toda pregunta publicada tiene versión, linaje y auditoría completa.

## Fase 4, worker y cola asíncrona
### Objetivo
Sacar el procesamiento pesado del ciclo HTTP y soportar volumen.

### Acciones
- crear servicio worker Dockerizado
- incorporar `pg-boss`
- separar jobs `parse`, `validate`, `publish`
- definir retries y backoff
- agregar concurrencia controlada por lotes o chunks

### Entregables
- contenedor worker
- configuración de jobs
- política de retries
- dashboard básico de backlog

### Criterio de salida
Archivos grandes se procesan sin timeouts web y con reintentos seguros.

## Fase 5, operación avanzada y observabilidad
### Objetivo
Volver operable el sistema para uso cotidiano y escalamiento.

### Acciones
- logs estructurados por batch y por fila
- métricas por etapa
- alertas de fallos y backlog
- panel de detalle de lote
- acciones de revalidación, reproceso y publicación parcial

### Entregables
- dashboard operativo
- reporte ejecutivo de métricas
- catálogo de alertas y runbooks básicos

### Criterio de salida
Operaciones detecta y corrige incidentes sin depender del desarrollador que construyó el pipeline.

## Fase 6, calidad editorial y gobierno
### Objetivo
Mejorar calidad del banco y gobierno del contenido.

### Acciones
- reglas de calidad editorial avanzadas
- warnings semánticos
- revisión humana asistida para duplicados dudosos
- plantillas por proveedor o fuente
- reporting de calidad del banco

### Entregables
- políticas editoriales integradas al pipeline
- panel de revisión de duplicados
- scorecard de calidad

### Criterio de salida
La plataforma no solo ingesta, también protege la calidad del banco.

## Secuencia sugerida por sprint
### Sprint 1
- Fase 0 completa
- diseño SQL base
- upload y creación de batch

### Sprint 2
- parser inicial
- staging operativo
- panel de lotes mínimo

### Sprint 3
- validaciones por etapas
- idempotencia inicial
- issues por fila

### Sprint 4
- banco canónico y publicación versionada

### Sprint 5
- worker + pg-boss
- retries y métricas iniciales

### Sprint 6
- observabilidad avanzada
- acciones operativas y hardening

## Riesgos principales
- querer publicar directo sin staging por presión de velocidad
- meter demasiada lógica de negocio en SQL y volverla inmantenible
- no definir bien la clave natural y romper idempotencia
- mezclar validación editorial con validación técnica sin separar responsabilidades
- intentar soportar demasiados formatos desde el día uno

## Recomendación táctica
Si hay que priorizar, ejecutar en este orden:
1. staging
2. validación e idempotencia
3. banco canónico versionado
4. worker y cola
5. observabilidad

Eso reduce el riesgo estructural más rápido.