import fs from "node:fs/promises";
import path from "node:path";
import { parseMarkdownItem } from "../src/domain/content/parse-md";
import { getSupabaseAdminClient } from "../src/lib/supabase/admin";
import { CURRENT_QUESTION_BANK_FILES, EXPECTED_ACTIVE_CORPUS_COUNT } from "./question-bank-current-corpus";

type CheckStatus = "passed" | "failed";

type Check = {
  name: string;
  status: CheckStatus;
  details: string;
};

type ExpectedItem = {
  contentId: string;
  slug: string;
  file: string;
};

type BankRow = {
  id: string;
  content_id: string;
  slug: string;
  read_state: string;
  status: string;
  is_active: boolean;
  thematic_nucleus_id: string | null;
  thematic_nucleus_code: string | null;
  thematic_nucleus_is_active: boolean;
  classification_bucket: string | null;
  classification_reason: string | null;
};

function pushCheck(checks: Check[], errors: string[], name: string, condition: boolean, details: string) {
  checks.push({ name, status: condition ? "passed" : "failed", details });
  if (!condition) {
    errors.push(`${name}: ${details}`);
  }
}

async function loadExpectedActiveItems(repoRoot: string) {
  const expectedItems: ExpectedItem[] = [];

  for (const relativeFile of CURRENT_QUESTION_BANK_FILES) {
    const absoluteFile = path.join(repoRoot, relativeFile);
    const rawMarkdown = await fs.readFile(absoluteFile, "utf8");
    const result = parseMarkdownItem(rawMarkdown);

    if (!result.ok || !result.item) {
      throw new Error(`No se pudo parsear ${relativeFile}: ${result.errors.join(" | ")}`);
    }

    expectedItems.push({
      contentId: result.item.id,
      slug: result.item.slug,
      file: relativeFile,
    });
  }

  return expectedItems;
}

function diff(expected: string[], actual: string[]) {
  const expectedSet = new Set(expected);
  const actualSet = new Set(actual);

  return {
    missing: expected.filter((value) => !actualSet.has(value)),
    unexpected: actual.filter((value) => !expectedSet.has(value)),
  };
}

async function main() {
  const repoRoot = process.cwd();
  const supabase = getSupabaseAdminClient();
  const checks: Check[] = [];
  const errors: string[] = [];

  const expectedActiveItems = await loadExpectedActiveItems(repoRoot);
  const expectedActiveIds = expectedActiveItems.map((item) => item.contentId).sort();
  const expectedActiveSlugs = expectedActiveItems.map((item) => item.slug).sort();
  const trackedIds = [...expectedActiveIds];
  const expectedTrackedInView = [...expectedActiveIds];

  const { data: trackedRowsRaw, error: trackedError } = await supabase
    .from("v_item_bank_active")
    .select(
      "id, content_id, slug, read_state, status, is_active, thematic_nucleus_id, thematic_nucleus_code, thematic_nucleus_is_active, classification_bucket, classification_reason",
    )
    .in("content_id", trackedIds)
    .order("content_id", { ascending: true });

  if (trackedError) {
    throw trackedError;
  }

  const { data: activeRowsRaw, error: activeError } = await supabase
    .from("v_item_bank_active")
    .select(
      "id, content_id, slug, read_state, status, is_active, thematic_nucleus_id, thematic_nucleus_code, thematic_nucleus_is_active, classification_bucket, classification_reason",
    )
    .eq("read_state", "active")
    .order("content_id", { ascending: true });

  if (activeError) {
    throw activeError;
  }

  const trackedRows = (trackedRowsRaw ?? []) as BankRow[];
  const activeRows = (activeRowsRaw ?? []) as BankRow[];
  const trackedByContentId = new Map(trackedRows.map((row) => [row.content_id, row]));
  const activeIds = activeRows.map((row) => row.content_id).sort();
  const activeSlugs = activeRows.map((row) => row.slug).sort();
  const activeItemIds = activeRows.map((row) => row.id);

  pushCheck(
    checks,
    errors,
    "db-active-count",
    activeRows.length === EXPECTED_ACTIVE_CORPUS_COUNT,
    `esperados ${EXPECTED_ACTIVE_CORPUS_COUNT}, encontrados ${activeRows.length}`,
  );

  const activeSetDiff = diff(expectedActiveIds, activeIds);
  pushCheck(
    checks,
    errors,
    "db-active-set-exact",
    activeSetDiff.missing.length === 0 && activeSetDiff.unexpected.length === 0,
    activeSetDiff.missing.length === 0 && activeSetDiff.unexpected.length === 0
      ? `set activo exacto validado (${activeRows.length} content_id)`
      : `faltan: ${activeSetDiff.missing.join(", ") || "ninguno"}; sobran: ${activeSetDiff.unexpected.join(", ") || "ninguno"}`,
  );

  const activeSlugDiff = diff(expectedActiveSlugs, activeSlugs);
  pushCheck(
    checks,
    errors,
    "db-active-slug-set-exact",
    activeSlugDiff.missing.length === 0 && activeSlugDiff.unexpected.length === 0,
    activeSlugDiff.missing.length === 0 && activeSlugDiff.unexpected.length === 0
      ? `set de slugs activos exacto validado (${activeSlugs.length} slugs)`
      : `faltan: ${activeSlugDiff.missing.join(", ") || "ninguno"}; sobran: ${activeSlugDiff.unexpected.join(", ") || "ninguno"}`,
  );

  const regressedExpectedActive = expectedActiveIds
    .map((contentId) => trackedByContentId.get(contentId))
    .filter((row): row is BankRow => Boolean(row))
    .filter((row) => row.read_state !== "active");

  pushCheck(
    checks,
    errors,
    "db-expected-items-now-active",
    regressedExpectedActive.length === 0,
    regressedExpectedActive.length === 0
      ? `los ${EXPECTED_ACTIVE_CORPUS_COUNT} ítems esperados quedaron en read_state=active`
      : regressedExpectedActive
          .map(
            (row) =>
              `${row.content_id}=${row.read_state} (status=${row.status}, is_active=${row.is_active}, nucleus=${row.thematic_nucleus_code ?? "null"}, nucleus_active=${row.thematic_nucleus_is_active}, bucket=${row.classification_bucket ?? "null"})`,
          )
          .join("; "),
  );

  const missingTrackedRows = expectedTrackedInView.filter((contentId) => !trackedByContentId.has(contentId));
  pushCheck(
    checks,
    errors,
    "db-tracked-rows-present",
    missingTrackedRows.length === 0,
    missingTrackedRows.length === 0
      ? `presentes los ${expectedTrackedInView.length} content_id esperados en la vista`
      : `faltan filas para: ${missingTrackedRows.join(", ")}`,
  );

  const activeGateFailures = activeRows.filter(
    (row) =>
      row.status !== "published" ||
      row.is_active !== true ||
      !row.thematic_nucleus_id ||
      row.thematic_nucleus_is_active !== true ||
      row.classification_bucket !== null,
  );
  pushCheck(
    checks,
    errors,
    "db-active-gates-clean",
    activeGateFailures.length === 0,
    activeGateFailures.length === 0
      ? `todos los activos cumplen gates de publicación, activación y núcleo`
      : activeGateFailures
          .map(
            (row) =>
              `${row.content_id}(status=${row.status}, is_active=${row.is_active}, nucleus_id=${row.thematic_nucleus_id ?? "null"}, nucleus_active=${row.thematic_nucleus_is_active}, bucket=${row.classification_bucket ?? "null"})`,
          )
          .join("; "),
  );

  const duplicatedActiveIds = activeIds.filter((contentId, index) => activeIds.indexOf(contentId) !== index);
  pushCheck(
    checks,
    errors,
    "db-unique-active-content-id",
    duplicatedActiveIds.length === 0,
    duplicatedActiveIds.length === 0
      ? `${new Set(activeIds).size} content_id activos únicos`
      : `duplicados activos: ${[...new Set(duplicatedActiveIds)].join(", ")}`,
  );

  const duplicatedActiveSlugs = activeSlugs.filter((slug, index) => activeSlugs.indexOf(slug) !== index);
  pushCheck(
    checks,
    errors,
    "db-unique-active-slug",
    duplicatedActiveSlugs.length === 0,
    duplicatedActiveSlugs.length === 0
      ? `${new Set(activeSlugs).size} slugs activos únicos`
      : `duplicados activos: ${[...new Set(duplicatedActiveSlugs)].join(", ")}`,
  );

  let optionCountsByItemId = new Map<string, number>();
  if (activeItemIds.length > 0) {
    const { data: optionsRaw, error: optionsError } = await supabase
      .from("item_options")
      .select("item_id, option_key")
      .in("item_id", activeItemIds);

    if (optionsError) {
      throw optionsError;
    }

    optionCountsByItemId = (optionsRaw ?? []).reduce((acc, option) => {
      const count = acc.get(option.item_id) ?? 0;
      acc.set(option.item_id, count + 1);
      return acc;
    }, new Map<string, number>());
  }

  const optionFailures = activeRows.filter((row) => (optionCountsByItemId.get(row.id) ?? 0) !== 4);
  pushCheck(
    checks,
    errors,
    "db-four-options-per-active",
    optionFailures.length === 0,
    optionFailures.length === 0
      ? `${activeRows.length} ítems activos con 4 opciones`
      : optionFailures
          .map((row) => `${row.content_id}=${optionCountsByItemId.get(row.id) ?? 0}`)
          .join(", "),
  );

  const result = {
    summary: {
      expectedActiveCorpusCount: EXPECTED_ACTIVE_CORPUS_COUNT,
      activeCount: activeRows.length,
      trackedCount: trackedRows.length,
      errorCount: errors.length,
    },
    checks,
    activeContentIds: activeIds,
    trackedRows,
    errors,
  };

  console.log(JSON.stringify(result, null, 2));

  if (errors.length > 0) {
    process.exit(1);
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
