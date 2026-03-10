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
    .select("competency, attempts, correct_count, avg_reasoning_score, estimated_level, percentile_segment")
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

  return {
    estimatedLevel,
    percentileSegment: stats[0]?.percentile_segment ?? undefined,
    totalAttempts,
    totalCorrect,
    avgReasoningScore,
    strongestCompetencies: sortedByLevel.slice(0, 3).map((row) => row.competency),
    weakestCompetencies: sortedByLevel.slice(-3).map((row) => row.competency),
    recentTrend: totalAttempts > 0 ? "up" : "stable",
  };
}
