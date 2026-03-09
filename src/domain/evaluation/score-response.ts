import type { EvaluationResult } from "@/types/evaluation";

interface ScoreParams {
  selectedOption?: string;
  correctOption: string;
  responseTimeMs?: number;
  difficulty: number;
  reasoningScore?: number;
  normativeConsistencyScore?: number;
  priorEstimatedLevel?: number;
}

export function scoreResponseBaselineHeuristicV1(
  params: ScoreParams,
): EvaluationResult {
  const isCorrect = params.selectedOption === params.correctOption;

  const reasoningScore = params.reasoningScore ?? (isCorrect ? 75 : 40);
  const normativeConsistencyScore =
    params.normativeConsistencyScore ?? (isCorrect ? 70 : 35);

  const competencyScore =
    reasoningScore * 0.5 + normativeConsistencyScore * 0.2 + (isCorrect ? 30 : 0);

  const estimatedThetaDelta = isCorrect
    ? 0.08 + params.difficulty * 0.05
    : -0.06 - params.difficulty * 0.03;

  return {
    isCorrect,
    reasoningScore,
    normativeConsistencyScore,
    competencyScore,
    estimatedThetaDelta,
    remediationNeeded: !isCorrect && competencyScore < 60,
    evaluationSource: "hybrid",
    evaluationVersion: "baseline-heuristic-v1",
  };
}
