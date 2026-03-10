import { NextResponse } from "next/server";
import { getSupabaseServerClient } from "@/lib/supabase/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const itemId = searchParams.get("itemId");

  if (!itemId) {
    return NextResponse.json({ error: "itemId is required" }, { status: 400 });
  }

  const supabase = await getSupabaseServerClient();
  const { data: item, error: itemError } = await supabase
    .from("item_bank")
    .select("id, title, area, competency, stem, correct_option")
    .eq("id", itemId)
    .single();

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
