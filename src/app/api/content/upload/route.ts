import { NextResponse } from "next/server";
import { parseMarkdownItem } from "@/domain/content/parse-md";
import { getSupabaseAdminClient } from "@/lib/supabase/admin";

export async function POST(request: Request) {
  const body = (await request.json()) as { rawMarkdown: string };
  const result = parseMarkdownItem(body.rawMarkdown);

  if (!result.ok || !result.item) {
    return NextResponse.json(
      {
        ok: false,
        itemId: undefined,
        version: undefined,
        errors: result.errors,
      },
      { status: 400 },
    );
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
      {
        onConflict: "slug",
      },
    )
    .select("id, version")
    .single();

  if (itemError || !savedItem) {
    return NextResponse.json(
      {
        ok: false,
        errors: [itemError?.message ?? "No se pudo persistir item_bank."],
      },
      { status: 500 },
    );
  }

  const optionRows = item.options.map((option) => ({
    item_id: savedItem.id,
    option_key: option.key,
    option_text: option.text,
  }));

  const { error: optionsError } = await admin.from("item_options").upsert(optionRows, {
    onConflict: "item_id,option_key",
  });

  if (optionsError) {
    return NextResponse.json(
      {
        ok: false,
        itemId: savedItem.id,
        version: savedItem.version,
        errors: [optionsError.message],
      },
      { status: 500 },
    );
  }

  return NextResponse.json(
    {
      ok: true,
      itemId: savedItem.id,
      version: savedItem.version,
      errors: [],
    },
    { status: 200 },
  );
}
