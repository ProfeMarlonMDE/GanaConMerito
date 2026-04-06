# QUESTION-BANK-PROCESS

## Propósito
Definir el orden operativo para procesar todos los archivos del banco de preguntas y dejar trazabilidad persistente del proceso de revisión/curación sin depender del historial del chat.

## Fuente de verdad
Cuando exista la carpeta del banco de preguntas, cada archivo debe tratarse como input persistido de un lote temático de 5 preguntas.

Ruta esperada informada por Marlon:
- `/home/ubuntu/.openclaw/workspace/docs/banco-preguntas`

## Objetivo del pipeline
Llevar cada ítem `multiple_choice` a un estado final controlado:
- `ready_for_insert`
- `needs_fix`
- `rejected`

Regla:
**ningún ítem pasa a BD sin validación por capas**.

## Orden operativo recomendado
Procesar por bloques de área y por criticidad de revisión:

### Ola 1 — áreas ya abiertas o con contexto previo
1. Matemáticas
2. Pedagogía
3. Normatividad

### Ola 2 — áreas pendientes de segunda pasada
4. Gestión
5. Lectura crítica
6. Competencias ciudadanas

## Regla de secuencia dentro de cada archivo
1. Editorial
2. QA
3. Data
4. Backend
5. Consolidación Gauss

No mezclar capas dentro del mismo micro-lote hasta cerrar la salida de la capa activa.

## Tamaño de unidad de trabajo
- Unidad recomendada: `2` ítems por ejecución
- Unidad normal: `2–3` ítems si el contexto está limpio
- Máximo: `5` solo si la sesión está fresca y el archivo está bien estructurado

## Metodología de trazabilidad

### 1. Registro maestro por archivo
Crear y mantener:
- `/home/ubuntu/.openclaw/workspace/docs/QUESTION-BANK-INDEX.md`

Debe contener por archivo:
- nombre de archivo
- área
- rango de ítems
- estado actual
- última capa completada
- siguiente acción
- fecha/hora UTC de última actualización

### 2. Historial por archivo/lote
Crear y mantener un historial operativo por archivo procesado en:
- `/home/ubuntu/.openclaw/workspace/docs/question-bank-history/`

Convención sugerida:
- `matematicas.md`
- `pedagogia.md`
- `normatividad.md`
- `gestion.md`
- `lectura-critica.md`
- `competencias-ciudadanas.md`

Cada archivo debe registrar por micro-lote:
- fecha UTC
- ítems procesados
- capa trabajada
- decisión por ítem
- bloqueos
- siguiente paso

### 3. Snapshot diario breve
Registrar hitos relevantes también en memoria diaria o archivo de sesión si el trabajo impacta la continuidad operativa.

## Estados de control recomendados
### Por archivo
- `pending`
- `in_editorial`
- `in_qa`
- `in_data`
- `in_backend`
- `partial_ready`
- `completed`
- `blocked`

### Por ítem
- `blocked_waiting_full_item`
- `editorial_done`
- `needs_fix`
- `rejected`
- `qa_pass`
- `qa_fix`
- `data_ready`
- `backend_ready`
- `ready_for_insert`

## Plantilla mínima de registro por micro-lote
```md
## 2026-04-06T21:50:00Z
- archivo: matematicas.md
- micro-lote: 001-002
- capa: editorial
- resultado:
  - 001 -> needs_fix
  - 002 -> needs_fix
- bloqueos:
  - opciones con ambigüedad estructural
- siguiente paso:
  - corregir versión editorial y revalidar
```

## Regla de control
Si la carpeta o los archivos no aparecen en la ruta esperada:
- no inventar inventario
- confirmar ubicación real antes de consolidar el orden definitivo archivo por archivo
- sí mantener esta metodología lista para activarse apenas exista la ruta correcta
