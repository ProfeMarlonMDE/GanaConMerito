import { NextResponse } from "next/server";
import { applyActiveItemBankFilters, runWithActiveItemBankFallback } from "../../../../lib/supabase/active-item-bank";
import { requireOwnedSession } from "../../../../lib/supabase/guards";

interface SessionItemRecord {
  id: string;
  title: string | null;
  area: string | null;
  competency: string | null;
  stem: string | null;
  correct_option: string | null;
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const itemId = searchParams.get("itemId");
  const sessionId = searchParams.get("sessionId");

  if (!itemId) {
    return NextResponse.json({ error: "itemId is required" }, { status: 400 });
  }

  if (!sessionId) {
    return NextResponse.json({ error: "sessionId is required" }, { status: 400 });
  }

  const auth = await requireOwnedSession({ sessionId });
  if (!auth.ok) {
    return NextResponse.json({ error: auth.error }, { status: auth.status });
  }

  const { supabase } = auth;
  const { data: item, error: itemError } = await runWithActiveItemBankFallback<SessionItemRecord>((source) =>
    applyActiveItemBankFilters(
      supabase.from(source).select("id, title, area, competency, stem, correct_option").eq("id", itemId),
      source,
    ).single(),
  );

  if (itemError || !item) {
    return NextResponse.json({ error: "Item not found" }, { status: 404 });
  }

  const { data: options, error: optionsError } = await supabase
    .from("item_options")
    .select("option_key, option_text")
    .eq("item_id", itemId)
    .order("option_key", { ascending: true });

  if (optionsError) {
    return NextResponse.json({ error: "Options not found" }, { status: 404 });
  }

  return NextResponse.json(
    {
      id: item.id,
      title: item.title,
      area: item.area,
      competency: item.competency,
      stem: item.stem,
      options: options.map((option) => ({ key: option.option_key, text: option.option_text })),
    },
    { status: 200 },
  );
}
