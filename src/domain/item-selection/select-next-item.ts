import { getSupabaseAdminClient } from "@/lib/supabase/server";

interface SelectNextItemParams {
  activeArea?: string;
  activeCompetency?: string;
  excludeItemIds?: string[];
}

export async function selectNextItem(params: SelectNextItemParams) {
  const admin = getSupabaseAdminClient();

  let query = admin
    .from("item_bank")
    .select("id, area, competency, difficulty, correct_option")
    .eq("is_published", true)
    .order("difficulty", { ascending: true })
    .limit(1);

  if (params.activeArea) {
    query = query.eq("area", params.activeArea);
  }

  if (params.activeCompetency) {
    query = query.eq("competency", params.activeCompetency);
  }

  if (params.excludeItemIds && params.excludeItemIds.length > 0) {
    query = query.not("id", "in", `(${params.excludeItemIds.join(",")})`);
  }

  const { data, error } = await query.maybeSingle();

  if (error) {
    throw error;
  }

  return data;
}
