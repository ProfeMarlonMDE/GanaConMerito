import { NextResponse } from "next/server";
import { selectNextItem } from "@/domain/item-selection/select-next-item";
import { getSupabaseServerClient } from "@/lib/supabase/server";
import type { StartSessionRequest, StartSessionResponse } from "@/types/session";

export async function POST(request: Request) {
  const body = (await request.json()) as StartSessionRequest;
  const supabase = await getSupabaseServerClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { data: profile, error: profileError } = await supabase
    .from("profiles")
    .select("id")
    .eq("auth_user_id", user.id)
    .single();

  if (profileError || !profile) {
    return NextResponse.json({ error: "Profile not found" }, { status: 404 });
  }

  const nextItem = await selectNextItem({
    activeArea: body.area,
    activeCompetency: body.competency,
  });

  const currentState = nextItem ? "practice" : "onboarding";

  const { data: session, error: sessionError } = await supabase
    .from("sessions")
    .insert({
      profile_id: profile.id,
      mode: body.mode,
      current_state: currentState,
      status: "active",
    })
    .select("id")
    .single();

  if (sessionError || !session) {
    return NextResponse.json({ error: "Could not create session" }, { status: 500 });
  }

  const response: StartSessionResponse = {
    sessionId: session.id,
    currentState: currentState as StartSessionResponse["currentState"],
    mode: body.mode,
    currentItemId: nextItem?.id,
    hintLevel: 0,
    activeArea: body.area,
    activeCompetency: body.competency,
  };

  return NextResponse.json(response, { status: 200 });
}
