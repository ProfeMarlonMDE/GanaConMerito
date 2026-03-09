import { randomUUID } from "node:crypto";
import { NextResponse } from "next/server";
import type { StartSessionRequest, StartSessionResponse } from "@/types/session";

export async function POST(request: Request) {
  const body = (await request.json()) as StartSessionRequest;

  const response: StartSessionResponse = {
    sessionId: randomUUID(),
    currentState: "onboarding",
    mode: body.mode,
    currentItemId: undefined,
    hintLevel: 0,
    activeArea: body.area,
    activeCompetency: body.competency,
  };

  return NextResponse.json(response, { status: 200 });
}
