import { NextResponse } from "next/server";
import type { DashboardSummaryResponse } from "@/types/evaluation";

export async function GET() {
  const response: DashboardSummaryResponse = {
    estimatedLevel: 0,
    percentileSegment: undefined,
    totalAttempts: 0,
    totalCorrect: 0,
    avgReasoningScore: 0,
    strongestCompetencies: [],
    weakestCompetencies: [],
    recentTrend: "stable",
  };

  return NextResponse.json(response, { status: 200 });
}
