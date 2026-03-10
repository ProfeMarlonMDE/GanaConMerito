import fs from "node:fs/promises";
import { parseMarkdownItem } from "./parse-md";
import { getSupabaseAdminClient } from "../../lib/supabase/admin";

export async function importMarkdownFile(filePath: string) {
  const rawMarkdown = await fs.readFile(filePath, "utf8");
  const result = parseMarkdownItem(rawMarkdown);

  if (!result.ok || !result.item) {
    return {
      ok: false,
      filePath,
      errors: result.errors,
      warnings: result.warnings,
    };
  }

  const admin = getSupabaseAdminClient();
  const item = result.item;

  const { data: savedItem, error: itemError } = await admin
    .from("item_bank")
    .upsert(
      {
        slug: item.slug,
        title: item.title,
        area: item.area,
        subarea: item.subarea ?? null,
        exam_type: item.examType,
        competency: item.competency,
        difficulty: item.difficulty,
        target_level: item.targetLevel ?? null,
        item_type: item.itemType,
        stem: item.stem,
        correct_option: item.correctOption,
        explanation: item.explanation,
        normative_refs: item.normativeRefs,
        is_published: item.published,
        version: item.version,
      },
      { onConflict: "slug" },
    )
    .select("id")
    .single();

  if (itemError || !savedItem) {
    return {
      ok: false,
      filePath,
      errors: [itemError?.message ?? "No se pudo persistir item_bank."],
      warnings: result.warnings,
    };
  }

  const { error: optionsError } = await admin.from("item_options").upsert(
    item.options.map((option) => ({
      item_id: savedItem.id,
      option_key: option.key,
      option_text: option.text,
    })),
    { onConflict: "item_id,option_key" },
  );

  if (optionsError) {
    return {
      ok: false,
      filePath,
      errors: [optionsError.message],
      warnings: result.warnings,
    };
  }

  return {
    ok: true,
    filePath,
    errors: [],
    warnings: result.warnings,
  };
}
