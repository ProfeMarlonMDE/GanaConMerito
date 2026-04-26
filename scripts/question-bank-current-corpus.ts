export const CURRENT_QUESTION_BANK_FILES = [
  "content/items/competencias_ciudadanas/ciudadanas-participacion-001.md",
  "content/items/competencias_ciudadanas/ciudadanas-participacion-002.md",
  "content/items/competencias_ciudadanas/ciudadanas-pluralidad-diversidad-001.md",
  "content/items/competencias_ciudadanas/ciudadanas-responsabilidad-democratica-001.md",
  "content/items/competencias_ciudadanas/ciudadanas-responsabilidad-democratica-002.md",
  "content/items/gestion/gestion-gestion-academica-001.md",
  "content/items/gestion/gestion-gestion-academica-002.md",
  "content/items/gestion/gestion-planeacion-institucional-001.md",
  "content/items/gestion/gestion-seguimiento-mejora-001.md",
  "content/items/gestion/gestion-seguimiento-mejora-002.md",
  "content/items/lectura_critica/lectura-critica-analisis-argumentativo-001.md",
  "content/items/lectura_critica/lectura-critica-analisis-argumentativo-002.md",
  "content/items/lectura_critica/lectura-critica-estructura-textual-001.md",
  "content/items/lectura_critica/lectura-critica-interpretacion-textual-001.md",
  "content/items/matematicas/matematicas-analisis-datos-002.md",
  "content/items/matematicas/matematicas-resolucion-problemas-001.md",
  "content/items/matematicas/matematicas-resolucion-problemas-002.md",
  "content/items/normatividad/normatividad-convivencia-escolar-001.md",
  "content/items/normatividad/normatividad-convivencia-escolar-002.md",
  "content/items/normatividad/normatividad-evaluacion-normativa-001.md",
  "content/items/normatividad/normatividad-funcion-docente-001.md",
  "content/items/normatividad/normatividad-inclusion-001.md",
  "content/items/pedagogia/pedagogia-evaluacion-aprendizaje-001.md",
  "content/items/pedagogia/pedagogia-evaluacion-aprendizaje-002.md",
  "content/items/pedagogia/pedagogia-inclusion-001.md",
  "content/items/pedagogia/pedagogia-inclusion-002.md",
  "content/items/pedagogia/pedagogia-planeacion-aula-001.md",
] as const;

export const EXPECTED_ACTIVE_CORPUS_COUNT = 27;

export const BLOCKED_CONTENT_IDS = ["item-doc-003", "item-doc-005", "item-doc-021"] as const;

export const LEGACY_CONTENT_IDS = ["item-doc-0001", "item-doc-0002", "item-doc-0003"] as const;

export const CURRENT_QUESTION_BANK_EXCLUDED_FILES = [
  {
    contentId: "item-doc-021",
    file: "content/items/lectura_critica/lectura-critica-proposito-comunicativo-001.md",
    reason: "bloqueado por dependencia visual/imagen (item-doc-021)",
  },
] as const;

export const BLOCKED_SOURCE_ITEMS = [
  {
    contentId: "item-doc-003",
    source: "docs/banco-preguntas/matematicas.md",
    reason: "bloqueado por dependencia visual/imagen",
  },
  {
    contentId: "item-doc-005",
    source: "docs/banco-preguntas/matematicas.md",
    reason: "bloqueado por dependencia visual/imagen",
  },
  {
    contentId: "item-doc-021",
    source: "content/items/lectura_critica/lectura-critica-proposito-comunicativo-001.md",
    reason: "bloqueado por dependencia visual/imagen",
  },
] as const;

export const LEGACY_SAMPLE_FILES = [
  {
    contentId: "item-doc-0001",
    file: "content/items/normatividad/caso-convivencia-001.md",
  },
  {
    contentId: "item-doc-0002",
    file: "content/items/pedagogia/planeacion-aula-001.md",
  },
  {
    contentId: "item-doc-0003",
    file: "content/items/matematicas/razonamiento-matematico-001.md",
  },
] as const;
