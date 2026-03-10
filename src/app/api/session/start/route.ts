import { NextResponse } from "next/server";
import { selectNextItem } from "@/domain/item-selection/select-next-item";
import { getSupabaseServerClient } from "@/lib/supabase/server";
import { startSessionSchema } from "@/lib/validation/session";
import type { StartSessionResponse, SessionState } from "@/types/session";

export async function POST(request: Request) {
  const json = await request.json();
  const parsedBody = startSessionSchema.safeParse(json);

  if (!parsedBody.success) {
    return NextResponse.json(
      { error: parsedBody.error.issues.map((issue) => issue.message).join(" | ") },
      { status: 400 },
    );
  }

  const body = parsedBody.data;
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

  const { data: learningProfile, error: learningProfileError } = await supabase
    .from("learning_profiles")
    .select("onboarding_completed")
    .eq("profile_id", profile.id)
    .single();

  if (learningProfileError || !learningProfile) {
    return NextResponse.json({ error: "Learning profile not found" }, { status: 404 });
  }

  const nextItem = await selectNextItem({
    activeArea: body.area,
    activeCompetency: body.competency,
  });

  let currentState: SessionState = "onboarding";
  if (learningProfile.onboarding_completed && nextItem) {
    currentState = "practice";
  } else if (learningProfile.onboarding_completed && !nextItem) {
    currentState = "diagnostic";
  }

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
    currentState,
    mode: body.mode,
    currentItemId: nextItem?.id,
    hintLevel: 0,
    activeArea: body.area,
    activeCompetency: body.competency,
  };

  return NextResponse.json(response, { status: 200 });
}
