import { NextResponse } from "next/server";
import { scoreResponseBaselineHeuristicV1 } from "@/domain/evaluation/score-response";
import { selectNextItem } from "@/domain/item-selection/select-next-item";
import { getNextState } from "@/domain/orchestrator/session-machine";
import { getSupabaseServerClient } from "@/lib/supabase/server";
import type { AdvanceSessionResponse } from "@/types/evaluation";
import type { AdvanceSessionRequest } from "@/types/session";

export async function POST(request: Request) {
  const body = (await request.json()) as AdvanceSessionRequest;
  const supabase = await getSupabaseServerClient();

  const { data: turnCountData } = await supabase
    .from("session_turns")
    .select("id", { count: "exact", head: true })
    .eq("session_id", body.sessionId);

  const { data: item, error: itemError } = await supabase
    .from("item_bank")
    .select("id, correct_option, difficulty, area, competency")
    .eq("id", body.itemId)
    .single();

  if (itemError || !item) {
    return NextResponse.json({ error: "Item not found" }, { status: 404 });
  }

  const evaluation = scoreResponseBaselineHeuristicV1({
    selectedOption: body.selectedOption,
    correctOption: item.correct_option,
    difficulty: Number(item.difficulty),
  });

  const turnNumber = (turnCountData?.length ?? 0) + 1;

  const { data: savedTurn, error: turnError } = await supabase
    .from("session_turns")
    .insert({
      session_id: body.sessionId,
      item_id: body.itemId,
      turn_number: turnNumber,
      selected_option: body.selectedOption ?? null,
      user_rationale: body.userRationale ?? null,
      response_time_ms: body.responseTimeMs ?? null,
      confidence_self_report: body.confidenceSelfReport ?? null,
      model_feedback: evaluation.isCorrect
        ? "Respuesta correcta. Continuemos."
        : "Necesitas refuerzo en este punto. Revisemos la premisa clave.",
    })
    .select("id")
    .single();

  if (turnError || !savedTurn) {
    return NextResponse.json({ error: "Could not create session turn" }, { status: 500 });
  }

  const { error: evaluationError } = await supabase.from("evaluation_events").insert({
    session_turn_id: savedTurn.id,
    item_id: body.itemId,
    is_correct: evaluation.isCorrect,
    reasoning_score: evaluation.reasoningScore,
    normative_consistency_score: evaluation.normativeConsistencyScore,
    competency_score: evaluation.competencyScore,
    estimated_theta_delta: evaluation.estimatedThetaDelta,
    remediation_needed: evaluation.remediationNeeded,
    evaluation_source: evaluation.evaluationSource,
    evaluation_version: evaluation.evaluationVersion,
  });

  if (evaluationError) {
    return NextResponse.json({ error: "Could not create evaluation event" }, { status: 500 });
  }

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

  await supabase
    .from("sessions")
    .update({ current_state: currentState })
    .eq("id", body.sessionId);

  const nextItem = await selectNextItem({
    activeArea: item.area,
    activeCompetency: item.competency,
    excludeItemIds: [body.itemId],
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
    nextItemId: nextItem?.id,
    shouldTransition: previousState !== currentState,
  };

  return NextResponse.json(response, { status: 200 });
}
