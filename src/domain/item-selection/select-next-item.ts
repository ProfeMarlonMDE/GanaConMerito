import { getSupabaseAdminClient } from "@/lib/supabase/admin";

interface SelectNextItemParams {
  professionalProfileId?: string | null;
  activeArea?: string;
  activeCompetency?: string;
  excludeItemIds?: string[];
}

export async function selectNextItem(params: SelectNextItemParams) {
  const admin = getSupabaseAdminClient();

  let query = admin
    .from("item_bank")
    .select("id, area, competency, difficulty, correct_option, thematic_nucleus_id")
    .eq("status", "published")
    .eq("is_active", true)
    .order("difficulty", { ascending: true });

  if (params.activeArea) {
    query = query.eq("area", params.activeArea);
  }

  if (params.activeCompetency) {
    query = query.eq("competency", params.activeCompetency);
  }

  if (params.excludeItemIds && params.excludeItemIds.length > 0) {
    const quotedIds = params.excludeItemIds.map((id) => `"${id}"`).join(",");
    query = query.not("id", "in", `(${quotedIds})`);
  }

  if (params.professionalProfileId) {
    const { data: universalNuclei, error: universalNucleiError } = await admin
      .from("thematic_nuclei")
      .select("id")
      .eq("is_active", true)
      .eq("is_universal", true);

    if (universalNucleiError) {
      throw universalNucleiError;
    }

    const { data: assignedNuclei, error: assignedNucleiError } = await admin
      .from("profile_thematic_nuclei")
      .select("thematic_nucleus_id")
      .eq("professional_profile_id", params.professionalProfileId)
      .eq("is_enabled", true);

    if (assignedNucleiError) {
      throw assignedNucleiError;
    }

    const eligibleNucleusIds = Array.from(
      new Set([
        ...(universalNuclei ?? []).map((row) => row.id),
        ...(assignedNuclei ?? []).map((row) => row.thematic_nucleus_id),
      ].filter(Boolean)),
    );

    if (eligibleNucleusIds.length === 0) {
      return null;
    }

    query = query.in("thematic_nucleus_id", eligibleNucleusIds);
  }

  query = query.limit(1);

  const { data, error } = await query.maybeSingle();

  if (error) {
    throw error;
  }

  return data;
}
