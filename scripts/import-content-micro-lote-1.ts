import { importMarkdownFile } from "../src/domain/content/import-from-file";

const files = [
  "content/items/gestion/gestion-gestion-academica-001.md",
  "content/items/gestion/gestion-planeacion-institucional-001.md",
  "content/items/matematicas/matematicas-analisis-datos-002.md",
  "content/items/normatividad/normatividad-convivencia-escolar-001.md",
  "content/items/pedagogia/pedagogia-evaluacion-aprendizaje-001.md",
];

async function main() {
  const results = [];
  for (const file of files) {
    const result = await importMarkdownFile(file);
    results.push({ file, ...result });
  }
  console.log(JSON.stringify(results, null, 2));
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
