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

test("empty summary defaults to no_signal and no strong conclusions", () => {
  assert.deepEqual(emptyDashboardSummaryMetrics(), {
    estimatedLevel: 0,
    totalAttempts: 0,
    totalCorrect: 0,
    avgReasoningScore: 0,
    strongestCompetencies: [],
    weakestCompetencies: [],
    recentTrend: "stable",
    signalLevel: "no_signal",
    signalLabel: "Sin señal",
    signalDescription: "Todavía no hay intentos suficientes para interpretar progreso o prioridades.",
    canShowStrongConclusion: false,
    canShowTrend: false,
    canShowPercentile: false,
    recommendedAction: "Empieza con algunas respuestas más antes de sacar conclusiones.",
  });
});

test("0 attempts keeps no_signal without strengths or weaknesses", () => {
  const summary = buildDashboardSummaryMetrics([]);

  assert.equal(summary.signalLevel, "no_signal");
  assert.deepEqual(summary.strongestCompetencies, []);
  assert.deepEqual(summary.weakestCompetencies, []);
  assert.equal(summary.canShowStrongConclusion, false);
});

test("1 correct attempt is low_signal and does not create a strong competency", () => {
  const summary = buildDashboardSummaryMetrics([
    row({ competency: "Lectura", attempts: 1, correct_count: 1, estimated_level: 0.8 }),
  ]);

  assert.equal(summary.signalLevel, "low_signal");
  assert.deepEqual(summary.strongestCompetencies, []);
  assert.deepEqual(summary.weakestCompetencies, []);
});

test("1 incorrect attempt is low_signal and does not create a weak competency", () => {
  const summary = buildDashboardSummaryMetrics([
    row({ competency: "Normatividad", attempts: 1, correct_count: 0, estimated_level: -0.2 }),
  ]);

  assert.equal(summary.signalLevel, "low_signal");
  assert.deepEqual(summary.strongestCompetencies, []);
  assert.deepEqual(summary.weakestCompetencies, []);
});

test("3 attempts raises the contract to emerging_signal", () => {
  const summary = buildDashboardSummaryMetrics([
    row({ competency: "Gestión", attempts: 3, correct_count: 2, estimated_level: 0.3 }),
  ]);

  assert.equal(summary.signalLevel, "emerging_signal");
  assert.equal(summary.canShowStrongConclusion, false);
});

test("5 attempts raises the contract to usable_signal", () => {
  const summary = buildDashboardSummaryMetrics([
    row({ competency: "Pedagogía", attempts: 5, correct_count: 4, estimated_level: 0.7 }),
  ]);

  assert.equal(summary.signalLevel, "usable_signal");
  assert.equal(summary.canShowStrongConclusion, true);
});

test("trend only appears when there are two comparable updated rows", () => {
  const trendFromWindow = buildDashboardSummaryMetrics([
    row({ competency: "A", attempts: 3, correct_count: 2, estimated_level: 0.2, updated_at: "2026-04-29T00:00:00Z" }),
    row({ competency: "B", attempts: 3, correct_count: 2, estimated_level: 0.6, updated_at: "2026-04-29T01:00:00Z" }),
  ]);
  const trendFromSingle = buildDashboardSummaryMetrics([
    row({ competency: "A", attempts: 3, correct_count: 2, estimated_level: 0.2 }),
  ]);

  assert.equal(trendFromWindow.canShowTrend, true);
  assert.equal(trendFromWindow.recentTrend, "up");
  assert.equal(trendFromSingle.canShowTrend, false);
  assert.equal(trendFromSingle.recentTrend, "stable");
});

test("percentile is only showable when signal is usable and percentile exists", () => {
  const lowSignalWithPercentile = buildDashboardSummaryMetrics([
    row({ competency: "A", attempts: 2, correct_count: 2, estimated_level: 0.4, percentile_segment: 80 }),
  ]);
  const usableWithoutPercentile = buildDashboardSummaryMetrics([
    row({ competency: "B", attempts: 5, correct_count: 4, estimated_level: 0.7 }),
  ]);
  const usableWithPercentile = buildDashboardSummaryMetrics([
    row({ competency: "C", attempts: 5, correct_count: 4, estimated_level: 0.7, percentile_segment: 90 }),
  ]);

  assert.equal(lowSignalWithPercentile.canShowPercentile, false);
  assert.equal(usableWithoutPercentile.canShowPercentile, false);
  assert.equal(usableWithPercentile.canShowPercentile, true);
});

test("strongest and weakest competencies respect minimum attempts and thresholds", () => {
  const summary = buildDashboardSummaryMetrics([
    row({ competency: "Fuerte con muestra", attempts: 3, correct_count: 3, estimated_level: 0.8 }),
    row({ competency: "Falso fuerte", attempts: 2, correct_count: 2, estimated_level: 0.9 }),
    row({ competency: "Débil con muestra", attempts: 3, correct_count: 1, estimated_level: -0.3 }),
    row({ competency: "Falso débil", attempts: 1, correct_count: 0, estimated_level: -0.5 }),
  ]);

  assert.deepEqual(summary.strongestCompetencies, ["Fuerte con muestra"]);
  assert.deepEqual(summary.weakestCompetencies, ["Débil con muestra"]);
});
