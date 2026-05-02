import { NextResponse } from "next/server";
import { requireAuthenticatedProfile } from "../../../../lib/supabase/guards";
import { TutorOrchestrator } from "../../../../lib/tutor/tutor-orchestrator";
import { TutorInput } from "../../../../types/tutor-turn";

const tutor = new TutorOrchestrator();

export async function POST(request: Request) {
  const auth = await requireAuthenticatedProfile();
  if (!auth.ok) {
    return NextResponse.json({ error: auth.error }, { status: auth.status });
  }

  try {
    const body = await request.json();
    
    // Construct the governed input
    const tutorInput: TutorInput = {
      userId: auth.profile.id,
      sessionId: body.sessionId,
      userMessage: body.message,
      allowedContext: {
        currentTopic: body.currentTopic,
        recentErrors: body.recentErrors || []
      },
      progressSummary: {
        itemsCompleted: body.itemsCompleted || 0,
        currentScore: body.currentScore || 0
      }
    };

    const result = await tutor.processTurn(tutorInput);
    
    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    console.error("[Tutor API Error]:", error);
    return NextResponse.json(
      { error: "Error al procesar la solicitud del tutor" },
      { status: 500 }
    );
  }
}
