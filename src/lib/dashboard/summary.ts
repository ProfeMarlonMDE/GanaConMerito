import { getSupabaseServerClient } from "@/lib/supabase/server";
import type { DashboardSummaryResponse } from "@/types/evaluation";

export async function getDashboardSummaryForCurrentUser(): Promise<DashboardSummaryResponse> {
  const supabase = await getSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return {
      estimatedLevel: 0,
      totalAttempts: 0,
      totalCorrect: 0,
      avgReasoningScore: 0,
      strongestCompetencies: [],
      weakestCompetencies: [],
      recentTrend: "stable",
    };
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("id")
    .eq("auth_user_id", user.id)
    .single();

  if (!profile) {
    return {
      estimatedLevel: 0,
      totalAttempts: 0,
      totalCorrect: 0,
      avgReasoningScore: 0,
      strongestCompetencies: [],
      weakestCompetencies: [],
      recentTrend: "stable",
    };
  }

  const { data: topicStats } = await supabase
    .from("user_topic_stats")
    .select(
      "area, competency, attempts, correct_count, avg_reasoning_score, avg_difficulty, estimated_level, percentile_segment, updated_at",
    )
    .eq("profile_id", profile.id);

  const stats = topicStats ?? [];
  const totalAttempts = stats.reduce((sum, row) => sum + row.attempts, 0);
  const totalCorrect = stats.reduce((sum, row) => sum + row.correct_count, 0);
  const avgReasoningScore =
    stats.length > 0
      ? Number((stats.reduce((sum, row) => sum + Number(row.avg_reasoning_score), 0) / stats.length).toFixed(2))
      : 0;
  const estimatedLevel =
    stats.length > 0
      ? Number((stats.reduce((sum, row) => sum + Number(row.estimated_level), 0) / stats.length).toFixed(3))
      : 0;

  const sortedByLevel = [...stats].sort((a, b) => Number(b.estimated_level) - Number(a.estimated_level));

  const recentWindow = [...stats]
    .filter((row) => row.updated_at)
    .sort((a, b) => String(b.updated_at).localeCompare(String(a.updated_at)));

  let recentTrend: DashboardSummaryResponse["recentTrend"] = "stable";
  if (recentWindow.length >= 2) {
    const latest = Number(recentWindow[0].estimated_level);
    const previous = Number(recentWindow[1].estimated_level);
    if (latest > previous) recentTrend = "up";
    else if (latest < previous) recentTrend = "down";
  } else if (totalAttempts > 0) {
    recentTrend = "up";
  }

  return {
    estimatedLevel,
    percentileSegment: stats[0]?.percentile_segment ?? undefined,
    totalAttempts,
    totalCorrect,
    avgReasoningScore,
    strongestCompetencies: sortedByLevel.slice(0, 3).map((row) => row.competency),
    weakestCompetencies: [...sortedByLevel].reverse().slice(0, 3).map((row) => row.competency),
    recentTrend,
  };
}

export async function getDashboardTopicBreakdownForCurrentUser() {
  const supabase = await getSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return [];

  const { data: profile } = await supabase
    .from("profiles")
    .select("id")
    .eq("auth_user_id", user.id)
    .single();

  if (!profile) return [];

  const { data } = await supabase
    .from("user_topic_stats")
    .select(
      "area, competency, attempts, correct_count, avg_reasoning_score, avg_difficulty, estimated_level",
    )
    .eq("profile_id", profile.id)
    .order("estimated_level", { ascending: false });

  return data ?? [];
}
