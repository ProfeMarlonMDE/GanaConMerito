# OPERACION-30-PREGUNTAS

## Objetivo
Procesar 30 preguntas hasta dejarlas exclusivamente en uno de estos estados finales:
- `ready_for_insert`
- `needs_fix`
- `rejected`

Regla obligatoria:
**ningún ítem entra a BD sin pasar Editorial -> QA -> Data -> Backend.**

---

## Lotes
- **Lote A:** Matemáticas (001–005)
- **Lote B:** Pedagogía (006–010)
- **Lote C:** Normatividad (011–015)
- **Lote D:** Gestión (016–020)
- **Lote E:** Lectura crítica (021–025)
- **Lote F:** Competencias ciudadanas (026–030)

---

## Estados permitidos por lote o ítem
- `blocked`
- `in_review`
- `editorial_done`
- `qa_pass`
- `qa_fix`
- `data_ready`
- `backend_ready`
- `ready_for_insert`
- `needs_fix`
- `rejected`

---

## Regla de operación
No trabajar por cierre masivo de 30.
Trabajar por banda transportadora:
1. Editorial toma el siguiente lote crudo
2. QA toma el siguiente lote editorialmente curado
3. Data toma el siguiente lote QA-preaprobado
4. Backend toma el siguiente lote estructuralmente limpio
5. Gauss consolida por hito operativo

---

# 1) DESPACHO A EDITORIAL — RELANZAMIENTO DE LOTES BLOQUEADOS

## Destinatario
Editorial / Gauss editorial

## Instrucción
Relanzar de inmediato los lotes bloqueados:
- Matemáticas (001–005)
- Pedagogía (006–010)
- Normatividad (011–015)

### Causa del relanzamiento
El intento previo quedó bloqueado por falta de insumo textual explícito.
No repetir respuesta basada en contexto implícito o inferido.

### Regla obligatoria
Cada ítem debe trabajarse con el bloque completo visible dentro del prompt o input:
- `item_id`
- `area`
- `enunciado`
- `opciones`
- `metadata disponible`
- `notas o fallos previos` si existen

### Objetivo editorial
Dejar cada ítem en uno de estos estados:
- `editorial_done`
- `needs_fix`
- `rejected`

### Qué debe revisar Editorial
- claridad del enunciado
- coherencia entre pregunta y opciones
- unicidad de respuesta correcta si aplica
- ausencia de ambigüedad innecesaria
- calidad lingüística
- pertinencia al área declarada
- consistencia del nivel de dificultad si viene informado

### Salida obligatoria por ítem
Usar este formato exacto:

```yaml
item_id: "001"
area: "Matemáticas"
status: "editorial_done"
editorial_decision: "approve|needs_fix|reject"
findings:
  - "hallazgo 1"
  - "hallazgo 2"
required_fixes:
  - "ajuste 1"
corrected_version:
  stem: "..."
  options:
    A: "..."
    B: "..."
    C: "..."
    D: "..."
notes: "observaciones breves"
```

### Regla de tránsito
Apenas un lote quede con mayoría de ítems en `editorial_done`, se libera a QA.
No esperar que cierren los otros lotes.

---

# 2) DESPACHO A EDITORIAL — SEGUNDA PASADA DE LOTES ÚTILES

## Destinatario
Editorial / Gauss editorial

## Instrucción
Tomar de inmediato segunda pasada sobre:
- Gestión (016–020)
- Lectura crítica (021–025)
- Competencias ciudadanas (026–030)

### Objetivo
Consolidar curación editorial antes de QA.
No rehacer desde cero si ya existe trabajo previo; solo cerrar vacíos y corregir debilidades.

### Qué debe revisar en segunda pasada
- consistencia final de redacción
- distractores débiles o demasiado obvios
- ambigüedades residuales
- alineación con el área
- normalización de estilo
- calidad del ítem como candidato serio de banco

### Salida obligatoria por ítem
Usar el mismo formato:

```yaml
item_id: "016"
area: "Gestión"
status: "editorial_done"
editorial_decision: "approve|needs_fix|reject"
findings:
  - "hallazgo 1"
required_fixes:
  - "ajuste 1"
corrected_version:
  stem: "..."
  options:
    A: "..."
    B: "..."
    C: "..."
    D: "..."
notes: "segunda pasada completada"
```

### Regla de tránsito
QA toma el primer lote útil terminado, sin esperar el resto.

---

# 3) DESPACHO A QA

## Destinatario
qa-validation

## Instrucción
Trabajar en cola continua sobre los lotes que vayan saliendo de Editorial.
Prioridad de cola:
1. Gestión
2. Lectura crítica
3. Competencias ciudadanas
4. Matemáticas
5. Pedagogía
6. Normatividad

Si alguno de los relanzados sale antes, puede adelantarse según disponibilidad real.

### Objetivo QA
Validar calidad y consistencia del ítem ya curado editorialmente.
QA no debe reescribir desde cero salvo corrección mínima inevitable.

### Qué valida QA
- coherencia lógica
- integridad de opciones
- ausencia de contradicción interna
- respuesta esperada verificable
- formato suficiente para pasar a Data
- ausencia de defectos críticos

### Estados de salida permitidos
- `qa_pass`
- `qa_fix`
- `rejected`

### Salida obligatoria por ítem
```yaml
item_id: "016"
area: "Gestión"
status: "qa_pass"
qa_decision: "pass|fix|reject"
severity: "low|medium|high|critical"
blocking_issues:
  - "issue 1"
non_blocking_issues:
  - "issue 2"
required_fixes:
  - "fix 1"
ready_for_data: true
notes: "apto para pasar a Data"
```

### Regla de tránsito
Solo pasan a Data los ítems con:
- `status: qa_pass`
- o `qa_fix` resuelto y reconfirmado

---

# 4) DESPACHO A DATA

## Destinatario
data-supabase

## Instrucción
Tomar únicamente ítems QA-preaprobados.
No invertir tiempo en ítems todavía inestables.

### Objetivo Data
Completar estructura semántica y de metadatos para preparar ingestión.

### Qué resuelve Data
- taxonomía
- metadata
- enums
- slugs
- `normativeRefs`
- versión/publicación si aplica
- integridad semántica para payload

### Estados de salida permitidos
- `data_ready`
- `needs_fix`
- `rejected`

### Salida obligatoria por ítem
```yaml
item_id: "016"
area: "Gestión"
status: "data_ready"
slug: "gestion-item-016"
taxonomy:
  subject: "gestion"
  topic: "..."
  subtopic: "..."
metadata:
  difficulty: "..."
  source_type: "internal_curated"
  language: "es"
enums_valid: true
normativeRefs:
  - "..."
published: false
version: 1
semantic_integrity: "ok"
notes: "listo para validación backend"
```

### Regla de tránsito
Backend solo recibe ítems con `status: data_ready`.

---

# 5) DESPACHO A BACKEND

## Destinatario
backend-services

## Instrucción
Tomar únicamente ítems con salida `data_ready`.
Backend no corrige calidad editorial profunda ni taxonomía mal resuelta.
Si eso llega roto, devolverlo.

### Objetivo Backend
Validar shape, reglas de bloqueo y aptitud final para ingestión.

### Qué valida Backend
- shape del payload
- campos requeridos
- enums válidos
- consistencia estructural
- criterio final de ingestión
- decisión `ready_for_insert`

### Estados de salida permitidos
- `backend_ready`
- `ready_for_insert`
- `needs_fix`
- `rejected`

### Salida obligatoria por ítem
```yaml
item_id: "016"
area: "Gestión"
status: "ready_for_insert"
backend_decision: "approve|fix|reject"
payload_valid: true
blocking_rules:
  - "none"
shape_validation: "ok"
insert_candidate: true
notes: "cumple criterio final de ingestión"
```

---

# 6) CONSOLIDACIÓN GAUSS

## Regla de consolidación
Reportar por hitos operativos, no esperar cierre final de las 30.

### Formato de reporte corto
```text
- en proceso — relanzados 3 lotes bloqueados
- en proceso — QA tomó Gestión
- en proceso — Ciudadanas pasó a Data
- en proceso — 8 ítems están en ready_for_insert_candidate
- bloqueo — Pedagogía 008 devolvió ambigüedad crítica en opciones
```

### Criterios de salida por lote
- `lote_ready_partial`
- `lote_ready_complete`
- `lote_needs_fix`
- `lote_blocked`
- `lote_rejected_partial`

---

# 7) PLANTILLA DE INPUT POR ÍTEM PARA RELANZAMIENTO

Usar esta estructura exacta al reenviar ítems bloqueados:

```yaml
item_id: "001"
area: "Matemáticas"
batch: "Lote A"
stem: "Texto completo del enunciado"
options:
  A: "..."
  B: "..."
  C: "..."
  D: "..."
metadata:
  difficulty: "si existe"
  source: "si existe"
  tags:
    - "..."
previous_failure:
  - "No recibió el texto fuente explícito"
expected_output:
  - "editorial_decision"
  - "findings"
  - "required_fixes"
  - "corrected_version"
```

---

# 8) PRIORIDAD EJECUTIVA

## Ya
1. Relanzar A/B/C con bloque completo
2. Cerrar segunda pasada D/E/F
3. QA toma primer lote maduro
4. Data toma primer lote QA-pass
5. Backend toma primer lote data_ready

## Regla final
**Si un lote falla otra vez por falta de contexto o formato ambiguo, se clasifica como fallo de handoff y se corrige el paquete de entrada antes de insistir.**
