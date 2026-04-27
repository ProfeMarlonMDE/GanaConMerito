# Activación runtime del corpus actual (27 ítems)

## Objetivo
Activar en runtime el corpus curado actual sin re-arquitectura, evitando que `v_item_bank_active` siga dejando fuera los 27 ítems por tener `status = 'draft'` y `thematic_nucleus_id = null`.

## Decisión arquitectónica mínima y segura

### Qué se mantiene
- `thematic_nuclei` sigue siendo capa de **acceso/editorial**.
- `item_bank.area` y `item_bank.competency` siguen siendo la base de **adaptatividad/analítica**.
- No se introduce taxonomía nueva por `competency` ni por `subarea` en runtime.

### Qué se hace ahora
Crear **6 núcleos universales activos**, uno por cada área real del corpus actual:

| nucleus_code | name | area editorial | subarea editorial |
|---|---|---:|---:|
| `core-competencias-ciudadanas` | Competencias ciudadanas — corpus actual | `docente` | `competencias_ciudadanas` |
| `core-gestion` | Gestión educativa — corpus actual | `docente` | `gestion` |
| `core-lectura-critica` | Lectura crítica — corpus actual | `docente` | `lectura_critica` |
| `core-matematicas` | Matemáticas — corpus actual | `docente` | `matematicas` |
| `core-normatividad` | Normatividad educativa — corpus actual | `docente` | `normatividad` |
| `core-pedagogia` | Pedagogía — corpus actual | `docente` | `pedagogia` |

### Por qué este es el mínimo seguro
1. **Activa ya** el corpus en `v_item_bank_active`.
2. **No mezcla** `thematic_nucleus` con `competency` ni obliga a granularidad fina prematura.
3. **Evita depender de onboarding/perfiles** porque los 6 núcleos quedan `is_universal = true`.
4. **Preserva reclasificación futura**: más adelante cada área puede subdividirse en núcleos más finos sin rehacer el runtime actual.

---

## Mapeo propuesto de los 27 ítems

### 1) `core-competencias-ciudadanas`
| content_id | archivo | subarea | competency |
|---|---|---|---|
| `item-doc-026` | `content/items/competencias_ciudadanas/ciudadanas-participacion-001.md` | `participacion` | `convivencia_democratica` |
| `item-doc-027` | `content/items/competencias_ciudadanas/ciudadanas-participacion-002.md` | `participacion` | `toma_de_perspectiva` |
| `item-doc-030` | `content/items/competencias_ciudadanas/ciudadanas-pluralidad-diversidad-001.md` | `pluralidad_y_diversidad` | `toma_de_perspectiva` |
| `item-doc-028` | `content/items/competencias_ciudadanas/ciudadanas-responsabilidad-democratica-001.md` | `responsabilidad_democratica` | `juicio_etico` |
| `item-doc-029` | `content/items/competencias_ciudadanas/ciudadanas-responsabilidad-democratica-002.md` | `responsabilidad_democratica` | `resolucion_dialogica` |

### 2) `core-gestion`
| content_id | archivo | subarea | competency |
|---|---|---|---|
| `item-doc-018` | `content/items/gestion/gestion-gestion-academica-001.md` | `gestion_academica` | `analisis_de_gestion` |
| `item-doc-020` | `content/items/gestion/gestion-gestion-academica-002.md` | `gestion_academica` | `analisis_de_gestion` |
| `item-doc-019` | `content/items/gestion/gestion-planeacion-institucional-001.md` | `planeacion_institucional` | `planeacion_estrategica` |
| `item-doc-016` | `content/items/gestion/gestion-seguimiento-mejora-001.md` | `seguimiento_y_mejora` | `lectura_de_indicadores` |
| `item-doc-017` | `content/items/gestion/gestion-seguimiento-mejora-002.md` | `seguimiento_y_mejora` | `toma_de_decisiones_institucionales` |

### 3) `core-lectura-critica`
| content_id | archivo | subarea | competency |
|---|---|---|---|
| `item-doc-022` | `content/items/lectura_critica/lectura-critica-analisis-argumentativo-001.md` | `analisis_argumentativo` | `evaluacion_de_informacion` |
| `item-doc-025` | `content/items/lectura_critica/lectura-critica-analisis-argumentativo-002.md` | `analisis_argumentativo` | `evaluacion_de_informacion` |
| `item-doc-024` | `content/items/lectura_critica/lectura-critica-estructura-textual-001.md` | `estructura_textual` | `interpretacion_textual` |
| `item-doc-023` | `content/items/lectura_critica/lectura-critica-interpretacion-textual-001.md` | `interpretacion_textual` | `comprension_local` |

### 4) `core-matematicas`
| content_id | archivo | subarea | competency |
|---|---|---|---|
| `item-doc-004` | `content/items/matematicas/matematicas-analisis-datos-002.md` | `analisis_de_datos` | `toma_de_decisiones` |
| `item-doc-001` | `content/items/matematicas/matematicas-resolucion-problemas-001.md` | `resolucion_de_problemas` | `razonamiento_cuantitativo` |
| `item-doc-002` | `content/items/matematicas/matematicas-resolucion-problemas-002.md` | `resolucion_de_problemas` | `razonamiento_cuantitativo` |

### 5) `core-normatividad`
| content_id | archivo | subarea | competency |
|---|---|---|---|
| `item-doc-011` | `content/items/normatividad/normatividad-convivencia-escolar-001.md` | `convivencia_escolar` | `interpretacion_normativa` |
| `item-doc-013` | `content/items/normatividad/normatividad-convivencia-escolar-002.md` | `convivencia_escolar` | `interpretacion_normativa` |
| `item-doc-015` | `content/items/normatividad/normatividad-evaluacion-normativa-001.md` | `evaluacion_normativa` | `juicio_regulatorio` |
| `item-doc-012` | `content/items/normatividad/normatividad-funcion-docente-001.md` | `funcion_docente` | `aplicacion_del_marco_legal` |
| `item-doc-014` | `content/items/normatividad/normatividad-inclusion-001.md` | `inclusion_y_atencion_a_la_diversidad` | `aplicacion_del_marco_legal` |

### 6) `core-pedagogia`
| content_id | archivo | subarea | competency |
|---|---|---|---|
| `item-doc-006` | `content/items/pedagogia/pedagogia-evaluacion-aprendizaje-001.md` | `evaluacion_del_aprendizaje` | `evaluacion_formativa` |
| `item-doc-007` | `content/items/pedagogia/pedagogia-evaluacion-aprendizaje-002.md` | `evaluacion_del_aprendizaje` | `diseno_de_estrategias` |
| `item-doc-009` | `content/items/pedagogia/pedagogia-inclusion-001.md` | `inclusion` | `atencion_a_la_diversidad` |
| `item-doc-010` | `content/items/pedagogia/pedagogia-inclusion-002.md` | `inclusion` | `diseno_universal_de_aprendizaje` |
| `item-doc-008` | `content/items/pedagogia/pedagogia-planeacion-aula-001.md` | `planeacion_de_aula` | `planeacion_pedagogica` |

Total: **27 ítems**.

---


## Criterio claro de publicación / activación

Un ítem queda **activo en runtime** solo si cumple simultáneamente:
1. `content_id` pertenece al corpus curado actual de 27 ítems.
2. `status = 'published'`.
3. `is_active = true`.
4. `thematic_nucleus_id` apunta a un núcleo existente y activo.
5. El núcleo asignado tiene `is_active = true`.
6. `correct_option is not null`.
7. Tiene exactamente el set normal esperado de opciones persistidas para un ítem de selección múltiple.

### Regla operativa para este lote
- Los 27 ítems del corpus actual deben pasar a `status = 'published'`.
- Los 27 ítems del corpus actual deben quedar `is_active = true`.
- Los 27 ítems del corpus actual deben recibir uno de los 6 núcleos `core-*`.

### Regla de rollback seguro
Si el gate final no da `27` activos exactos en `v_item_bank_active`, no se debe encender el consumo del lote como “cerrado”; se corrige y se reejecuta el backfill.

---

## Notas de implementación
- No se recomienda granularidad por `subarea` en este paso; ya existe suficiente clasificación en `item_bank.area/subarea/competency`.
- Mantener los 6 núcleos como `is_universal = true` evita bloquear usuarios mientras onboarding/perfiles siguen madurando.

---

## Artefacto ejecutable
SQL listo para Dev/Data:
- `sql/current_corpus_runtime_activation_backfill.sql`
