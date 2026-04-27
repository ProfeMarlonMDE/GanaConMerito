import fs from "node:fs/promises";
import path from "node:path";
import { parseMarkdownItem } from "../src/domain/content/parse-md";
import { CURRENT_QUESTION_BANK_FILES } from "./question-bank-current-corpus";

async function listAllItemFiles(itemsDir: string) {
  const areaDirs = await fs.readdir(itemsDir, { withFileTypes: true });
  const files: string[] = [];

  for (const entry of areaDirs) {
    if (!entry.isDirectory()) {
      continue;
    }

    const subdir = path.join(itemsDir, entry.name);
    const subfiles = await fs.readdir(subdir, { withFileTypes: true });

    for (const subfile of subfiles) {
      if (subfile.isFile() && subfile.name.endsWith(".md")) {
        files.push(path.join(subdir, subfile.name));
      }
    }
  }

  return files.sort();
}

async function main() {
  const includeAll = process.argv.includes("--all");
  const repoRoot = process.cwd();
  const itemsDir = path.join(repoRoot, "content/items");

  const selectedFiles = includeAll
    ? await listAllItemFiles(itemsDir)
    : CURRENT_QUESTION_BANK_FILES.map((file) => path.join(repoRoot, file));

  const idToFiles = new Map<string, string[]>();
  const slugToFiles = new Map<string, string[]>();
  const warnings: Array<{ file: string; warnings: string[] }> = [];
  const errors: Array<{ file: string; errors: string[] }> = [];

  for (const filePath of selectedFiles) {
    const rawMarkdown = await fs.readFile(filePath, "utf8");
    const result = parseMarkdownItem(rawMarkdown);
    const relativePath = path.relative(repoRoot, filePath);

    if (result.warnings.length > 0) {
      warnings.push({ file: relativePath, warnings: result.warnings });
    }

    if (!result.ok || !result.item) {
      errors.push({ file: relativePath, errors: result.errors });
      continue;
    }

    idToFiles.set(result.item.id, [...(idToFiles.get(result.item.id) ?? []), relativePath]);
    slugToFiles.set(result.item.slug, [...(slugToFiles.get(result.item.slug) ?? []), relativePath]);
  }

  for (const [id, files] of idToFiles.entries()) {
    if (files.length > 1) {
      errors.push({ file: files.join(", "), errors: [`id duplicado detectado: ${id}`] });
    }
  }

  for (const [slug, files] of slugToFiles.entries()) {
    if (files.length > 1) {
      errors.push({ file: files.join(", "), errors: [`slug duplicado detectado: ${slug}`] });
    }
  }

  const summary = {
    scope: includeAll ? "all" : "current-corpus",
    validatedFiles: selectedFiles.length,
    warningCount: warnings.length,
    errorCount: errors.length,
  };

  console.log(JSON.stringify({ summary, warnings, errors }, null, 2));

  if (errors.length > 0) {
    process.exit(1);
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
