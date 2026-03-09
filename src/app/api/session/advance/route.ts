import { NextResponse } from "next/server";
import { scoreResponseBaselineHeuristicV1 } from "@/domain/evaluation/score-response";
import { getNextState } from "@/domain/orchestrator/session-machine";
import type { AdvanceSessionResponse } from "@/types/evaluation";
import type { AdvanceSessionRequest } from "@/types/session";

export async function POST(request: Request) {
  const body = (await request.json()) as AdvanceSessionRequest;

  const evaluation = scoreResponseBaselineHeuristicV1({
    selectedOption: body.selectedOption,
    correctOption: "A",
    difficulty: 0.5,
  });

  const previousState = "practice" as const;
  const currentState = getNextState({
    currentState: previousState,
    onboardingCompleted: true,
    hasBaseline: true,
    remediationNeeded: evaluation.remediationNeeded,
    shouldReview: false,
    isSessionEnding: false,
    isExpired: false,
    hasError: false,
  });

  const response: AdvanceSessionResponse = {
    sessionId: body.sessionId,
    previousState,
    currentState,
    evaluation,
    feedbackText: evaluation.isCorrect
      ? "Respuesta correcta. Continuemos."
      : "Necesitas refuerzo en este punto. Revisemos la premisa clave.",
    hintLevel: evaluation.remediationNeeded ? 1 : 0,
    nextItemId: undefined,
    shouldTransition: previousState !== currentState,
  };

  return NextResponse.json(response, { status: 200 });
}
