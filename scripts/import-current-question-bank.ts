import path from "node:path";
import { importMarkdownFile } from "../src/domain/content/import-from-file";
import { CURRENT_QUESTION_BANK_FILES } from "./question-bank-current-corpus";

async function main() {
  const repoRoot = process.cwd();
  const results = [];

  for (const relativeFile of CURRENT_QUESTION_BANK_FILES) {
    const filePath = path.join(repoRoot, relativeFile);
    const result = await importMarkdownFile(filePath);
    results.push({ file: relativeFile, ...result });
  }

  const failed = results.filter((result) => !result.ok);

  console.log(
    JSON.stringify(
      {
        summary: {
          attempted: results.length,
          ok: results.length - failed.length,
          failed: failed.length,
        },
        results,
      },
      null,
      2,
    ),
  );

  if (failed.length > 0) {
    process.exit(1);
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
