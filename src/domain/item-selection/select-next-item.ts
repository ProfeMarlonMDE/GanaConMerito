import { getSupabaseAdminClient } from "@/lib/supabase/admin";
import { applyActiveItemBankFilters, runWithActiveItemBankFallback } from "@/lib/supabase/active-item-bank";

interface SelectNextItemParams {
  professionalProfileId?: string | null;
  activeArea?: string;
  activeCompetency?: string;
  excludeItemIds?: string[];
}

interface SelectionScope {
  activeArea?: string;
  activeCompetency?: string;
}

interface SelectedItem {
  id: string;
  area: string | null;
  competency: string | null;
  difficulty: number | string | null;
  correct_option: string | null;
  thematic_nucleus_id: string | null;
}

async function resolveEligibleNucleusIds(professionalProfileId?: string | null) {
  const admin = getSupabaseAdminClient();

  const { data: universalNuclei, error: universalNucleiError } = await admin
    .from("thematic_nuclei")
    .select("id")
    .eq("is_active", true)
    .eq("is_universal", true);

  if (universalNucleiError) {
    throw universalNucleiError;
  }

  const universalIds = (universalNuclei ?? []).map((row) => row.id).filter(Boolean);

  // Contrato transitorio: sin perfil profesional solo se consume el banco universal activo.
  // Esto mantiene el runtime seguro mientras la clasificación fina del banco sigue creciendo.
  if (!professionalProfileId) {
    return Array.from(new Set(universalIds));
  }

  const { data: assignedNuclei, error: assignedNucleiError } = await admin
    .from("profile_thematic_nuclei")
    .select("thematic_nucleus_id")
    .eq("professional_profile_id", professionalProfileId)
    .eq("is_enabled", true);

  if (assignedNucleiError) {
    throw assignedNucleiError;
  }

  return Array.from(
    new Set([
      ...universalIds,
      ...(assignedNuclei ?? []).map((row) => row.thematic_nucleus_id),
    ].filter(Boolean)),
  );
}

async function runSelectionAttempt(params: SelectNextItemParams, scope: SelectionScope, eligibleNucleusIds: string[]) {
  const admin = getSupabaseAdminClient();

  const { data, error } = await runWithActiveItemBankFallback<SelectedItem>((source) => {
    let query = applyActiveItemBankFilters(
      admin
        .from(source)
        .select("id, area, competency, difficulty, correct_option, thematic_nucleus_id")
        .in("thematic_nucleus_id", eligibleNucleusIds)
        .order("difficulty", { ascending: true }),
      source,
    );

    if (scope.activeArea) {
      query = query.eq("area", scope.activeArea);
    }

    if (scope.activeCompetency) {
      query = query.eq("competency", scope.activeCompetency);
    }

    if (params.excludeItemIds && params.excludeItemIds.length > 0) {
      const quotedIds = params.excludeItemIds.map((id) => `"${id}"`).join(",");
      query = query.not("id", "in", `(${quotedIds})`);
    }

    return query.limit(1).maybeSingle();
  });

  if (error) {
    throw error;
  }

  return data;
}

function buildSelectionScopes(params: SelectNextItemParams): SelectionScope[] {
  const scopes: SelectionScope[] = [];

  if (params.activeArea && params.activeCompetency) {
    scopes.push({ activeArea: params.activeArea, activeCompetency: params.activeCompetency });
  }

  if (params.activeArea) {
    scopes.push({ activeArea: params.activeArea });
  }

  scopes.push({});

  return scopes.filter(
    (scope, index, allScopes) =>
      allScopes.findIndex(
        (candidate) =>
          candidate.activeArea === scope.activeArea && candidate.activeCompetency === scope.activeCompetency,
      ) === index,
  );
}

export async function selectNextItem(params: SelectNextItemParams) {
  const eligibleNucleusIds = await resolveEligibleNucleusIds(params.professionalProfileId);

  if (eligibleNucleusIds.length === 0) {
    return null;
  }

  for (const scope of buildSelectionScopes(params)) {
    const nextItem = await runSelectionAttempt(params, scope, eligibleNucleusIds);

    if (nextItem) {
      return nextItem;
    }
  }

  return null;
}
