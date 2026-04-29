import type { DashboardSummaryMetrics } from "@/types/evaluation";

export interface DashboardTopicBreakdownRow {
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

export function emptyDashboardSummaryMetrics(): DashboardSummaryMetrics {
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

export function getDashboardAccuracy(row: Pick<DashboardTopicBreakdownRow, "attempts" | "correct_count">) {
  return row.attempts > 0 ? row.correct_count / row.attempts : 0;
}

function dedupeCompetencies(rows: DashboardTopicBreakdownRow[]) {
  const seen = new Set<string>();
  return rows.filter((row) => {
    if (!row.competency || seen.has(row.competency)) return false;
    seen.add(row.competency);
    return true;
  });
}

export function buildDashboardSummaryMetrics(stats: DashboardTopicBreakdownRow[]): DashboardSummaryMetrics {
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

  let recentTrend: DashboardSummaryMetrics["recentTrend"] = "stable";
  if (recentWindow.length >= 2) {
    const latest = Number(recentWindow[0].estimated_level);
    const previous = Number(recentWindow[1].estimated_level);
    if (latest > previous) recentTrend = "up";
    else if (latest < previous) recentTrend = "down";
  } else if (totalAttempts > 0) {
    recentTrend = "up";
  }

  const strongestCompetencies = dedupeCompetencies(
    [...stats]
      .filter(
        (row) =>
          row.attempts >= 1 &&
          row.correct_count > 0 &&
          Number(row.estimated_level) > 0 &&
          getDashboardAccuracy(row) >= 0.5,
      )
      .sort((a, b) => {
        const levelDiff = Number(b.estimated_level) - Number(a.estimated_level);
        if (levelDiff !== 0) return levelDiff;
        const accuracyDiff = getDashboardAccuracy(b) - getDashboardAccuracy(a);
        if (accuracyDiff !== 0) return accuracyDiff;
        return b.attempts - a.attempts;
      }),
  )
    .map((row) => row.competency)
    .slice(0, 3);

  const strongestSet = new Set(strongestCompetencies);
  const weakestCompetencies = dedupeCompetencies(
    [...stats]
      .filter((row) => row.attempts >= 1 && !strongestSet.has(row.competency))
      .sort((a, b) => {
        const levelDiff = Number(a.estimated_level) - Number(b.estimated_level);
        if (levelDiff !== 0) return levelDiff;
        const accuracyDiff = getDashboardAccuracy(a) - getDashboardAccuracy(b);
        if (accuracyDiff !== 0) return accuracyDiff;
        return b.attempts - a.attempts;
      }),
  )
    .map((row) => row.competency)
    .slice(0, 3);

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
