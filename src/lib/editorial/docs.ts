import { access, readFile } from "node:fs/promises";
import path from "node:path";

export type EditorialCategory = "project" | "architecture" | "database" | "api" | "content" | "misc";
export type EditorialFormat = "markdown" | "text" | "binary";

export interface EditorialDocDefinition {
  slug: string;
  title: string;
  description: string;
  category: EditorialCategory;
  relativePath: string;
  format: EditorialFormat;
  source: "docs" | "inbox";
}

const PROJECT_ROOT = process.cwd();
const DOCS_ROOT = path.join(PROJECT_ROOT, "docs");

export const EDITORIAL_DOCS: EditorialDocDefinition[] = [
  {
    slug: "resumen-corpus",
    title: "Resumen ejecutivo del corpus",
    description: "Vista corta del propósito y alcance del banco de preguntas.",
    category: "project",
    relativePath: "project/reference/resumen-ejecutivo-del-corpus.md",
    format: "markdown",
    source: "docs",
  },
  {
    slug: "descripcion-corpus",
    title: "Descripción del corpus",
    description: "Descripción ampliada del corpus y su orientación editorial.",
    category: "project",
    relativePath: "project/reference/descripcion-del-corpus-de-preguntas.md",
    format: "markdown",
    source: "docs",
  },
  {
    slug: "plantillas-preguntas",
    title: "Plantillas y estructura de preguntas",
    description: "Guía base para redactar preguntas nuevas.",
    category: "content",
    relativePath: "project/reference/plantillas-y-estructura-de-preguntas.md",
    format: "markdown",
    source: "docs",
  },
  {
    slug: "taxonomia-banco",
    title: "Taxonomía y nomenclatura del banco",
    description: "Clasificación editorial del banco de preguntas.",
    category: "content",
    relativePath: "project/reference/taxonomia-y-nomenclatura-del-banco-de-preguntas.md",
    format: "markdown",
    source: "docs",
  },
  {
    slug: "ejemplos-preguntas",
    title: "Ejemplos modelo de preguntas",
    description: "Ejemplos de referencia para calidad y formato.",
    category: "content",
    relativePath: "project/reference/ejemplos-modelo-de-preguntas.md",
    format: "markdown",
    source: "docs",
  },
  {
    slug: "checklist-editorial",
    title: "Checklist de validación editorial",
    description: "Lista de verificación para aprobar preguntas antes de carga.",
    category: "content",
    relativePath: "project/reference/checklist-de-validacion-editorial.md",
    format: "markdown",
    source: "docs",
  },
  {
    slug: "source-of-truth",
    title: "Source of Truth",
    description: "Reglas sobre fuente de verdad del proyecto.",
    category: "project",
    relativePath: "project/source-of-truth.md",
    format: "markdown",
    source: "docs",
  },
  {
    slug: "document-archive-policy-2026-05-01",
    title: "Política de archivado y nombres documentales",
    description: "Regla vigente para archivar legado y nombrar snapshots/archivos históricos con fecha.",
    category: "project",
    relativePath: "05-ops/2026-05-01-document-archive-and-naming-policy.md",
    format: "markdown",
    source: "docs",
  },
  {
    slug: "current-workflow",
    title: "Current Workflow",
    description: "Flujo actual de idea a producción.",
    category: "project",
    relativePath: "project/current-workflow.md",
    format: "markdown",
    source: "docs",
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

export function isPreviewableDoc(doc: EditorialDocDefinition) {
  return doc.format === "markdown" || doc.format === "text";
}

export async function readEditorialDocBySlug(slug: string) {
  const doc = getEditorialDocBySlug(slug);
  if (!doc) {
    return null;
  }

  const absolutePath = getEditorialDocAbsolutePath(doc.relativePath);
  let available = true;
  let raw: string | null = null;

  try {
    await access(absolutePath);
    raw = isPreviewableDoc(doc) ? await readFile(absolutePath, "utf8") : null;
  } catch {
    available = false;
  }

  return {
    ...doc,
    absolutePath,
    available,
    raw,
  };
}
