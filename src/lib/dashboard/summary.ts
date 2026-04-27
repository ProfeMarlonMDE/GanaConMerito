import { getSupabaseServerClient } from "@/lib/supabase/server";
import type { DashboardSummaryResponse } from "@/types/evaluation";

interface TopicStatRow {
  area: string;
  competency: string;
  attempts: number;
  correct_count: number;
  avg_reasoning_score: number;
  avg_difficulty: number;
  estimated_level: number;
  percentile_segment?: number | null;
  updated_at?: string | null;
}

function emptySummary(): DashboardSummaryResponse {
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

function getAccuracy(row: TopicStatRow) {
  return row.attempts > 0 ? row.correct_count / row.attempts : 0;
}

function buildSummary(stats: TopicStatRow[]): DashboardSummaryResponse {
  const totalAttempts = stats.reduce((sum, row) => sum + row.attempts, 0);
  const totalCorrect = stats.reduce((sum, row) => sum + row.correct_count, 0);
  const avgReasoningScore =
    totalAttempts > 0
      ? Number(
          (
            stats.reduce((sum, row) => sum + Number(row.avg_reasoning_score) * row.attempts, 0) /
            totalAttempts
          ).toFixed(2),
        )
      : 0;
  const estimatedLevel =
    stats.length > 0
      ? Number((stats.reduce((sum, row) => sum + Number(row.estimated_level), 0) / stats.length).toFixed(3))
      : 0;

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

  const strongestCompetencies = [...stats]
    .filter((row) => row.attempts >= 1 && row.correct_count > 0 && Number(row.estimated_level) > 0 && getAccuracy(row) >= 0.5)
    .sort((a, b) => {
      const levelDiff = Number(b.estimated_level) - Number(a.estimated_level);
      if (levelDiff !== 0) return levelDiff;
      const accuracyDiff = getAccuracy(b) - getAccuracy(a);
      if (accuracyDiff !== 0) return accuracyDiff;
      return b.attempts - a.attempts;
    })
    .slice(0, 3)
    .map((row) => row.competency);

  const strongestSet = new Set(strongestCompetencies);
  const weakestCompetencies = [...stats]
    .filter((row) => row.attempts >= 1 && !strongestSet.has(row.competency))
    .sort((a, b) => {
      const levelDiff = Number(a.estimated_level) - Number(b.estimated_level);
      if (levelDiff !== 0) return levelDiff;
      const accuracyDiff = getAccuracy(a) - getAccuracy(b);
      if (accuracyDiff !== 0) return accuracyDiff;
      return b.attempts - a.attempts;
    })
    .slice(0, 3)
    .map((row) => row.competency);

  return {
    estimatedLevel,
    percentileSegment: stats[0]?.percentile_segment ?? undefined,
    totalAttempts,
    totalCorrect,
    avgReasoningScore,
    strongestCompetencies,
    weakestCompetencies,
    recentTrend,
  };
}

async function getCurrentUserTopicStats(): Promise<TopicStatRow[]> {
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
      "area, competency, attempts, correct_count, avg_reasoning_score, avg_difficulty, estimated_level, percentile_segment, updated_at",
    )
    .eq("profile_id", profile.id)
    .order("estimated_level", { ascending: false });

  return (data ?? []) as TopicStatRow[];
}

export async function getDashboardSummaryForCurrentUser(): Promise<DashboardSummaryResponse> {
  const stats = await getCurrentUserTopicStats();
  return stats.length > 0 ? buildSummary(stats) : emptySummary();
}

export async function getDashboardTopicBreakdownForCurrentUser() {
  return await getCurrentUserTopicStats();
}
