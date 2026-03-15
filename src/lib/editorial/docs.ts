import { readFile } from "node:fs/promises";
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

const WORKSPACE_ROOT = "/home/node/.openclaw/workspace";
const DOCS_ROOT = path.join(WORKSPACE_ROOT, "docs");

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
    slug: "operating-model-ias",
    title: "Operating Model de IAs",
    description: "Distribución de roles entre las distintas IAs y entornos.",
    category: "project",
    relativePath: "project/operating-model-ias.md",
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
  {
    slug: "editorial-consolidated-plan",
    title: "Plan consolidado editorial/admin",
    description: "Plan consolidado de segmentación y módulo editorial/admin.",
    category: "architecture",
    relativePath: "architecture/editorial-admin-consolidated-plan.md",
    format: "markdown",
    source: "docs",
  },
  {
    slug: "editorial-module-plan",
    title: "Módulo editorial / biblioteca web",
    description: "Diseño del módulo editorial de solo lectura y su evolución.",
    category: "architecture",
    relativePath: "architecture/editorial-module-plan.md",
    format: "markdown",
    source: "docs",
  },
  {
    slug: "inbox-dominios",
    title: "Dominios del VPS",
    description: "Documento maestro con dominios y rutas del servidor.",
    category: "project",
    relativePath: "temp/inbox/project/dominios.md",
    format: "markdown",
    source: "inbox",
  },
  {
    slug: "inbox-env-deploy-example",
    title: ".env.deploy.example",
    description: "Plantilla de variables de entorno para despliegue.",
    category: "project",
    relativePath: "temp/inbox/project/.env.deploy.example",
    format: "text",
    source: "inbox",
  },
  {
    slug: "inbox-config-vps",
    title: "Config VPS",
    description: "Archivo de configuración operativa con usuario e IP del VPS.",
    category: "project",
    relativePath: "temp/inbox/project/config",
    format: "text",
    source: "inbox",
  },
  {
    slug: "inbox-deploy-vps-sh",
    title: "deploy-vps.sh",
    description: "Script de despliegue identificado en el inbox.",
    category: "project",
    relativePath: "temp/inbox/project/deploy-vps.sh",
    format: "text",
    source: "inbox",
  },
  {
    slug: "inbox-audit-brief-segmentation",
    title: "Audit brief de segmentación",
    description: "Brief de auditoría para segmentación editorial/perfiles.",
    category: "project",
    relativePath: "temp/inbox/project/audit-brief-editorial-segmentation.md",
    format: "markdown",
    source: "inbox",
  },
  {
    slug: "inbox-nginx-cnsc",
    title: "Nginx cnsc.profemarlon.com",
    description: "Configuración Nginx del dominio principal.",
    category: "architecture",
    relativePath: "temp/inbox/architecture/cnsc.profemarlon.com.nginx",
    format: "text",
    source: "inbox",
  },
  {
    slug: "inbox-nginx-bot",
    title: "Nginx bot.iagent.com.co",
    description: "Configuración Nginx del dominio secundario.",
    category: "architecture",
    relativePath: "temp/inbox/architecture/bot.iagent.com.co.nginx",
    format: "text",
    source: "inbox",
  },
  {
    slug: "inbox-cnsc-service",
    title: "cnsc.service",
    description: "Definición systemd de la aplicación.",
    category: "architecture",
    relativePath: "temp/inbox/architecture/cnsc.service",
    format: "text",
    source: "inbox",
  },
  {
    slug: "inbox-audit-definitiva-gemini",
    title: "Audit definitiva Gemini Pro",
    description: "Análisis profundo del corpus, taxonomía y calidad del contenido.",
    category: "content",
    relativePath: "temp/inbox/content/audit-definitiva-gemini-pro.md",
    format: "markdown",
    source: "inbox",
  },
  {
    slug: "inbox-antigravity-pc",
    title: "Antigravity PC",
    description: "Nota o referencia operativa ubicada en misc.",
    category: "misc",
    relativePath: "temp/inbox/misc/antigravity-pc.md",
    format: "markdown",
    source: "inbox",
  },
  {
    slug: "inbox-claude-sonet",
    title: "Claude Sonet",
    description: "Referencia comparativa de modelo Claude Sonet.",
    category: "misc",
    relativePath: "temp/inbox/misc/claude-sonet.md",
    format: "markdown",
    source: "inbox",
  },
  {
    slug: "inbox-claude",
    title: "Claude",
    description: "Referencia comparativa de Claude.",
    category: "misc",
    relativePath: "temp/inbox/misc/claude.md",
    format: "markdown",
    source: "inbox",
  },
  {
    slug: "inbox-codex-pc",
    title: "Codex PC",
    description: "Referencia comparativa de Codex.",
    category: "misc",
    relativePath: "temp/inbox/misc/codex-pc.md",
    format: "markdown",
    source: "inbox",
  },
  {
    slug: "inbox-gemini-pc",
    title: "Gemini PC",
    description: "Referencia comparativa de Gemini.",
    category: "misc",
    relativePath: "temp/inbox/misc/gemini-pc.md",
    format: "markdown",
    source: "inbox",
  },
  {
    slug: "inbox-audit-context-tar",
    title: "audit-context.tar.gz",
    description: "Paquete comprimido con historial acumulado de auditorías previas.",
    category: "misc",
    relativePath: "temp/inbox/misc/audit-context.tar.gz",
    format: "binary",
    source: "inbox",
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
  const raw = isPreviewableDoc(doc) ? await readFile(absolutePath, "utf8") : null;

  return {
    ...doc,
    absolutePath,
    raw,
  };
}
