import { NextResponse } from "next/server";
import { applyActiveItemBankFilters, runWithActiveItemBankFallback } from "../../../../lib/supabase/active-item-bank";
import { requireOwnedSession } from "../../../../lib/supabase/guards";
import { TutorOrchestrator } from "../../../../lib/tutor/tutor-orchestrator";
import { TutorInput } from "../../../../types/tutor-turn";

interface TutorContextItemRecord {
  area: string | null;
  competency: string | null;
}

const tutor = new TutorOrchestrator();

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const sessionId = typeof body.sessionId === "string" ? body.sessionId : "";
    const itemId = typeof body.itemId === "string" ? body.itemId : "";
    const userMessage = typeof body.message === "string" ? body.message.trim() : "";

    if (!sessionId || !userMessage) {
      return NextResponse.json(
        { error: "sessionId y message son obligatorios" },
        { status: 400 },
      );
    }

    const auth = await requireOwnedSession({ sessionId });
    if (!auth.ok) {
      return NextResponse.json({ error: auth.error }, { status: auth.status });
    }

    const { supabase, profile } = auth;

    const { data: sessionTurns, error: sessionTurnsError } = await supabase
      .from("session_turns")
      .select("id, is_correct, competency_score")
      .eq("session_id", sessionId);

    if (sessionTurnsError) {
      return NextResponse.json({ error: "No se pudo leer el progreso de la sesión" }, { status: 500 });
    }

    // Calculate real score from server data
    const itemsCompleted = sessionTurns?.length ?? 0;
    const currentScore = sessionTurns?.reduce((acc, turn) => acc + (turn.competency_score || 0), 0) ?? 0;

    let currentTopic: string | undefined;

    if (itemId) {
      const { data: item, error: itemError } = await runWithActiveItemBankFallback<TutorContextItemRecord>((source) =>
        applyActiveItemBankFilters(
          supabase.from(source).select("area, competency").eq("id", itemId),
          source,
        ).single(),
      );

      if (itemError) {
        return NextResponse.json({ error: "No se pudo validar el contexto del ítem" }, { status: 400 });
      }

      if (item) {
        currentTopic = [item.area, item.competency].filter(Boolean).join(" - ") || undefined;
      }
    }

    const tutorInput: TutorInput = {
      userId: profile.id,
      sessionId,
      userMessage,
      allowedContext: {
        currentTopic,
        recentErrors: [],
      },
      progressSummary: {
        itemsCompleted,
        currentScore,
      },
    };

    const result = await tutor.processTurn(tutorInput);
    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    console.error("[Tutor API Error]:", error);
    return NextResponse.json(
      { error: "Error al procesar la solicitud del tutor" },
      { status: 500 },
    );
  }
}
