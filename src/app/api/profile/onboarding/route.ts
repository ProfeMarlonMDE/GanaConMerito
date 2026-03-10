import { NextResponse } from "next/server";
import { z } from "zod";
import { getSupabaseServerClient } from "@/lib/supabase/server";

const onboardingSchema = z.object({
  targetRole: z.string().min(1),
  examType: z.string().min(1),
  activeGoal: z.string().min(1),
  activeAreas: z.array(z.string()).default([]),
  preferredFeedbackStyle: z.string().min(1).default("socratic"),
});

export async function POST(request: Request) {
  const supabase = await getSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const json = await request.json();
  const parsed = onboardingSchema.safeParse(json);

  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.issues.map((issue) => issue.message).join(" | ") },
      { status: 400 },
    );
  }

  const { data: profile, error: profileError } = await supabase
    .from("profiles")
    .select("id")
    .eq("auth_user_id", user.id)
    .single();

  if (profileError || !profile) {
    return NextResponse.json({ error: "Profile not found" }, { status: 404 });
  }

  const { error: updateError } = await supabase
    .from("learning_profiles")
    .update({
      target_role: parsed.data.targetRole,
      exam_type: parsed.data.examType,
      active_goal: parsed.data.activeGoal,
      active_areas: parsed.data.activeAreas,
      preferred_feedback_style: parsed.data.preferredFeedbackStyle,
      onboarding_completed: true,
    })
    .eq("profile_id", profile.id);

  if (updateError) {
    return NextResponse.json({ error: updateError.message }, { status: 500 });
  }

  return NextResponse.json({ ok: true }, { status: 200 });
}
