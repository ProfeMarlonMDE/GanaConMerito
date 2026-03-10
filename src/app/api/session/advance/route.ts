import { NextResponse } from "next/server";
import { scoreResponseBaselineHeuristicV1 } from "../../../../domain/evaluation/score-response";
import { selectNextItem } from "../../../../domain/item-selection/select-next-item";
import { getNextState } from "../../../../domain/orchestrator/session-machine";
import { updateUserTopicStats } from "../../../../domain/session/update-topic-stats";
import { getSupabaseServerClient } from "../../../../lib/supabase/server";
import { advanceSessionSchema } from "../../../../lib/validation/session";
import type { AdvanceSessionResponse } from "../../../../types/evaluation";
import type { SessionState } from "../../../../types/session";

export async function POST(request: Request) {
  const json = await request.json();
  const parsedBody = advanceSessionSchema.safeParse(json);

  if (!parsedBody.success) {
    return NextResponse.json(
      { error: parsedBody.error.issues.map((issue) => issue.message).join(" | ") },
      { status: 400 },
    );
  }

  const body = parsedBody.data;
  const supabase = await getSupabaseServerClient();

  const { data: session, error: sessionError } = await supabase
    .from("sessions")
    .select("id, profile_id, current_state")
    .eq("id", body.sessionId)
    .single();

  if (sessionError || !session) {
    return NextResponse.json({ error: "Session not found" }, { status: 404 });
  }

  const { data: learningProfile, error: learningProfileError } = await supabase
    .from("learning_profiles")
    .select("onboarding_completed")
    .eq("profile_id", session.profile_id)
    .single();

  if (learningProfileError || !learningProfile) {
    return NextResponse.json({ error: "Learning profile not found" }, { status: 404 });
  }

  const { data: item, error: itemError } = await supabase
    .from("item_bank")
    .select("id, correct_option, difficulty, area, competency")
    .eq("id", body.itemId)
    .single();

  if (itemError || !item) {
    return NextResponse.json({ error: "Item not found" }, { status: 404 });
  }

  const { data: existingTurns, error: existingTurnsError } = await supabase
    .from("session_turns")
    .select("id, item_id")
    .eq("session_id", body.sessionId)
    .order("turn_number", { ascending: true });

  if (existingTurnsError) {
    return NextResponse.json({ error: "Could not load session turns" }, { status: 500 });
  }

  const evaluation = scoreResponseBaselineHeuristicV1({
    selectedOption: body.selectedOption,
    correctOption: item.correct_option,
    difficulty: Number(item.difficulty),
    userRationale: body.userRationale,
  });

  const feedbackText =
    evaluation.qualitativeFeedback ??
    (evaluation.isCorrect
      ? "Respuesta correcta. Continuemos."
      : "Necesitas refuerzo en este punto. Revisemos la premisa clave.");

  const turnNumber = (existingTurns?.length ?? 0) + 1;

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
      model_feedback: feedbackText,
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

  await updateUserTopicStats({
    profileId: session.profile_id,
    area: item.area,
    competency: item.competency,
    isCorrect: evaluation.isCorrect,
    reasoningScore: evaluation.reasoningScore,
    difficulty: Number(item.difficulty),
    estimatedThetaDelta: evaluation.estimatedThetaDelta,
  });

  const previousState = session.current_state as SessionState;
  const currentState = getNextState({
    currentState: previousState,
    onboardingCompleted: learningProfile.onboarding_completed,
    hasBaseline: true,
    remediationNeeded: evaluation.remediationNeeded,
    shouldReview: false,
    isSessionEnding: false,
    isExpired: false,
    hasError: false,
  });

  await supabase.from("sessions").update({ current_state: currentState }).eq("id", body.sessionId);

  const seenItemIds = [
    ...new Set([...(existingTurns?.map((turn) => turn.item_id).filter(Boolean) ?? []), body.itemId]),
  ];

  const nextItem = await selectNextItem({
    activeArea: item.area,
    activeCompetency: item.competency,
    excludeItemIds: seenItemIds as string[],
  });

  const response: AdvanceSessionResponse = {
    sessionId: body.sessionId,
    previousState,
    currentState,
    evaluation,
    feedbackText,
    hintLevel: evaluation.remediationNeeded ? 1 : 0,
    nextItemId: nextItem?.id,
    shouldTransition: previousState !== currentState,
  };

  return NextResponse.json(response, { status: 200 });
}
