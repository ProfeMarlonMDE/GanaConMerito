import test from "node:test";
import assert from "node:assert/strict";
import { buildDashboardSummaryMetrics, emptyDashboardSummaryMetrics, type DashboardTopicBreakdownRow } from "./summary-metrics";

function row(partial: Partial<DashboardTopicBreakdownRow>): DashboardTopicBreakdownRow {
  return {
    area: partial.area ?? "Area",
    competency: partial.competency ?? "Competencia",
    attempts: partial.attempts ?? 0,
    correct_count: partial.correct_count ?? 0,
    avg_reasoning_score: partial.avg_reasoning_score ?? 0,
    avg_difficulty: partial.avg_difficulty ?? 0,
    estimated_level: partial.estimated_level ?? 0,
    percentile_segment: partial.percentile_segment,
    updated_at: partial.updated_at ?? null,
  };
}

test("empty summary is stable", () => {
  assert.deepEqual(emptyDashboardSummaryMetrics(), {
    estimatedLevel: 0,
    totalAttempts: 0,
    totalCorrect: 0,
    avgReasoningScore: 0,
    strongestCompetencies: [],
    weakestCompetencies: [],
    recentTrend: "stable",
  });
});

test("0 correct answers never qualifies as strong and stays in weak", () => {
  const summary = buildDashboardSummaryMetrics([
    row({ competency: "Lectura", attempts: 2, correct_count: 0, estimated_level: 0.9 }),
  ]);

  assert.deepEqual(summary.strongestCompetencies, []);
  assert.deepEqual(summary.weakestCompetencies, ["Lectura"]);
});

test("accuracy >= 50 percent with positive level qualifies as strong", () => {
  const summary = buildDashboardSummaryMetrics([
    row({ competency: "Matemáticas", attempts: 2, correct_count: 1, estimated_level: 0.4 }),
  ]);

  assert.deepEqual(summary.strongestCompetencies, ["Matemáticas"]);
  assert.deepEqual(summary.weakestCompetencies, []);
});

test("non-positive estimated level is excluded from strong even with accuracy >= 50 percent", () => {
  const summary = buildDashboardSummaryMetrics([
    row({ competency: "Gestión", attempts: 4, correct_count: 4, estimated_level: 0 }),
  ]);

  assert.deepEqual(summary.strongestCompetencies, []);
  assert.deepEqual(summary.weakestCompetencies, ["Gestión"]);
});

test("rows without attempts are excluded from both groups", () => {
  const summary = buildDashboardSummaryMetrics([
    row({ competency: "Normatividad", attempts: 0, correct_count: 0, estimated_level: 0.7 }),
  ]);

  assert.deepEqual(summary.strongestCompetencies, []);
  assert.deepEqual(summary.weakestCompetencies, []);
});

test("ties remain deterministic by level, accuracy and attempts", () => {
  const summary = buildDashboardSummaryMetrics([
    row({ competency: "C", attempts: 1, correct_count: 1, estimated_level: 0.8 }),
    row({ competency: "B", attempts: 3, correct_count: 2, estimated_level: 0.8 }),
    row({ competency: "A", attempts: 4, correct_count: 2, estimated_level: 0.8 }),
  ]);

  assert.deepEqual(summary.strongestCompetencies, ["C", "B", "A"]);
});

test("duplicate competencies are deduped and never appear in both groups", () => {
  const summary = buildDashboardSummaryMetrics([
    row({ area: "Uno", competency: "Lectura", attempts: 2, correct_count: 2, estimated_level: 0.9 }),
    row({ area: "Dos", competency: "Lectura", attempts: 5, correct_count: 0, estimated_level: -0.1 }),
    row({ competency: "Pedagogía", attempts: 2, correct_count: 0, estimated_level: -0.5 }),
  ]);

  assert.deepEqual(summary.strongestCompetencies, ["Lectura"]);
  assert.deepEqual(summary.weakestCompetencies, ["Pedagogía"]);
  assert.equal(summary.weakestCompetencies.includes("Lectura"), false);
});

test("recent trend uses latest updated rows and falls back to up when there is activity", () => {
  const trendFromWindow = buildDashboardSummaryMetrics([
    row({ competency: "A", attempts: 1, correct_count: 1, estimated_level: 0.2, updated_at: "2026-04-29T00:00:00Z" }),
    row({ competency: "B", attempts: 1, correct_count: 1, estimated_level: 0.6, updated_at: "2026-04-29T01:00:00Z" }),
  ]);
  const trendFromSingle = buildDashboardSummaryMetrics([
    row({ competency: "A", attempts: 1, correct_count: 1, estimated_level: 0.2 }),
  ]);

  assert.equal(trendFromWindow.recentTrend, "up");
  assert.equal(trendFromSingle.recentTrend, "up");
});
