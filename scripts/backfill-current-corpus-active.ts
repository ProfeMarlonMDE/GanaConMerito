import fs from "node:fs/promises";
import path from "node:path";
import { createClient } from "@supabase/supabase-js";
import { parseMarkdownItem } from "../src/domain/content/parse-md";
import { CURRENT_QUESTION_BANK_FILES, EXPECTED_ACTIVE_CORPUS_COUNT } from "./question-bank-current-corpus";

const LEGACY_NUCLEUS_CODE = "legacy-general";
const APPLY_FLAG = "--apply";

async function loadCurrentCorpusContentIds(repoRoot: string) {
  const ids: string[] = [];

  for (const relativeFile of CURRENT_QUESTION_BANK_FILES) {
    const filePath = path.join(repoRoot, relativeFile);
    const rawMarkdown = await fs.readFile(filePath, "utf8");
    const parsed = parseMarkdownItem(rawMarkdown);

    if (!parsed.ok || !parsed.item) {
      throw new Error(`No se pudo parsear ${relativeFile}: ${parsed.errors.join(" | ")}`);
    }

    ids.push(parsed.item.id);
  }

  const uniqueIds = [...new Set(ids)].sort();

  if (uniqueIds.length !== EXPECTED_ACTIVE_CORPUS_COUNT) {
    throw new Error(
      `Se esperaban ${EXPECTED_ACTIVE_CORPUS_COUNT} content_id únicos para el corpus actual y se obtuvieron ${uniqueIds.length}.`,
    );
  }

  return uniqueIds;
}

async function main() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !serviceRoleKey) {
    throw new Error("Faltan variables de entorno de Supabase.");
  }

  const apply = process.argv.includes(APPLY_FLAG);
  const repoRoot = process.cwd();
  const contentIds = await loadCurrentCorpusContentIds(repoRoot);
  const supabase = createClient(url, serviceRoleKey, {
    auth: { autoRefreshToken: false, persistSession: false },
  });

  const { data: nucleus, error: nucleusError } = await supabase
    .from("thematic_nuclei")
    .select("id, code, name, is_active, is_universal")
    .eq("code", LEGACY_NUCLEUS_CODE)
    .maybeSingle();

  if (nucleusError) {
    throw nucleusError;
  }

  if (!nucleus) {
    throw new Error(`No existe thematic_nuclei.code='${LEGACY_NUCLEUS_CODE}'.`);
  }

  const { data: beforeRows, error: beforeError } = await supabase
    .from("item_bank")
    .select("id, content_id, status, thematic_nucleus_id, is_published, is_active")
    .in("content_id", contentIds)
    .order("content_id");

  if (beforeError) {
    throw beforeError;
  }

  if (!beforeRows || beforeRows.length !== EXPECTED_ACTIVE_CORPUS_COUNT) {
    throw new Error(
      `Se esperaban ${EXPECTED_ACTIVE_CORPUS_COUNT} filas de item_bank para el corpus actual y se obtuvieron ${beforeRows?.length ?? 0}.`,
    );
  }

  const alreadyReady = beforeRows.filter(
    (row) => row.status === "published" && row.thematic_nucleus_id === nucleus.id,
  ).length;
  const needsBackfill = beforeRows.filter(
    (row) => row.status !== "published" || row.thematic_nucleus_id !== nucleus.id,
  ).length;

  console.log(
    JSON.stringify(
      {
        mode: apply ? "apply" : "dry-run",
        nucleus,
        summaryBefore: {
          total: beforeRows.length,
          alreadyReady,
          needsBackfill,
          draftWithoutNucleus: beforeRows.filter(
            (row) => row.status === "draft" && row.thematic_nucleus_id === null,
          ).length,
        },
      },
      null,
      2,
    ),
  );

  if (!apply) {
    return;
  }

  const { data: updatedRows, error: updateError } = await supabase
    .from("item_bank")
    .update({
      status: "published",
      thematic_nucleus_id: nucleus.id,
    })
    .in("content_id", contentIds)
    .select("id, content_id, status, thematic_nucleus_id");

  if (updateError) {
    throw updateError;
  }

  const { data: afterRows, error: afterError } = await supabase
    .from("item_bank")
    .select("id, content_id, status, thematic_nucleus_id, is_active")
    .in("content_id", contentIds)
    .order("content_id");

  if (afterError) {
    throw afterError;
  }

  const missingAfter = (afterRows ?? []).filter(
    (row) => row.status !== "published" || row.thematic_nucleus_id !== nucleus.id,
  );

  if (missingAfter.length > 0) {
    throw new Error(
      `Backfill incompleto para el corpus actual. Faltan ${missingAfter.length} filas por normalizar.`,
    );
  }

  console.log(
    JSON.stringify(
      {
        updatedCount: updatedRows?.length ?? 0,
        verification: {
          total: afterRows?.length ?? 0,
          publishedWithLegacyGeneral: afterRows?.length ?? 0,
        },
      },
      null,
      2,
    ),
  );
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : error);
  process.exit(1);
});
