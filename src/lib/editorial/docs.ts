import { readFile } from "node:fs/promises";
import path from "node:path";

export interface EditorialDocDefinition {
  slug: string;
  title: string;
  description: string;
  category: "project" | "architecture" | "database" | "api";
  relativePath: string;
}

const WORKSPACE_ROOT = "/home/node/.openclaw/workspace";
const DOCS_ROOT = path.join(WORKSPACE_ROOT, "docs");

export const EDITORIAL_DOCS: EditorialDocDefinition[] = [
  {
    slug: "resumen-corpus",
    title: "Resumen ejecutivo del corpus",
    description: "Vista corta del propósito y alcance del banco de preguntas.",
    category: "project",
    relativePath: "project/reference/resumen-ejecutivo-del-corpus.md",
  },
  {
    slug: "descripcion-corpus",
    title: "Descripción del corpus",
    description: "Descripción ampliada del corpus y su orientación editorial.",
    category: "project",
    relativePath: "project/reference/descripcion-del-corpus-de-preguntas.md",
  },
  {
    slug: "plantillas-preguntas",
    title: "Plantillas y estructura de preguntas",
    description: "Guía base para redactar preguntas nuevas.",
    category: "project",
    relativePath: "project/reference/plantillas-y-estructura-de-preguntas.md",
  },
  {
    slug: "taxonomia-banco",
    title: "Taxonomía y nomenclatura del banco",
    description: "Clasificación editorial del banco de preguntas.",
    category: "project",
    relativePath: "project/reference/taxonomia-y-nomenclatura-del-banco-de-preguntas.md",
  },
  {
    slug: "ejemplos-preguntas",
    title: "Ejemplos modelo de preguntas",
    description: "Ejemplos de referencia para calidad y formato.",
    category: "project",
    relativePath: "project/reference/ejemplos-modelo-de-preguntas.md",
  },
  {
    slug: "checklist-editorial",
    title: "Checklist de validación editorial",
    description: "Lista de verificación para aprobar preguntas antes de carga.",
    category: "project",
    relativePath: "project/reference/checklist-de-validacion-editorial.md",
  },
  {
    slug: "source-of-truth",
    title: "Source of Truth",
    description: "Reglas sobre fuente de verdad del proyecto.",
    category: "project",
    relativePath: "project/source-of-truth.md",
  },
  {
    slug: "operating-model-ias",
    title: "Operating Model de IAs",
    description: "Distribución de roles entre las distintas IAs y entornos.",
    category: "project",
    relativePath: "project/operating-model-ias.md",
  },
  {
    slug: "current-workflow",
    title: "Current Workflow",
    description: "Flujo actual de idea a producción.",
    category: "project",
    relativePath: "project/current-workflow.md",
  },
  {
    slug: "editorial-consolidated-plan",
    title: "Plan consolidado editorial/admin",
    description: "Plan consolidado de segmentación y módulo editorial/admin.",
    category: "architecture",
    relativePath: "architecture/editorial-admin-consolidated-plan.md",
  },
  {
    slug: "editorial-module-plan",
    title: "Módulo editorial / biblioteca web",
    description: "Diseño del módulo editorial de solo lectura y su evolución.",
    category: "architecture",
    relativePath: "architecture/editorial-module-plan.md",
  },
];

export function listEditorialDocs() {
  return EDITORIAL_DOCS;
}

export function getEditorialDocBySlug(slug: string) {
  return EDITORIAL_DOCS.find((doc) => doc.slug === slug) ?? null;
}

export function getEditorialDocAbsolutePath(relativePath: string) {
  const resolved = path.resolve(DOCS_ROOT, relativePath);
  if (!resolved.startsWith(DOCS_ROOT)) {
    throw new Error("Invalid editorial doc path.");
  }
  return resolved;
}

export async function readEditorialDocBySlug(slug: string) {
  const doc = getEditorialDocBySlug(slug);
  if (!doc) {
    return null;
  }

  const absolutePath = getEditorialDocAbsolutePath(doc.relativePath);
  const raw = await readFile(absolutePath, "utf8");

  return {
    ...doc,
    absolutePath,
    raw,
  };
}
