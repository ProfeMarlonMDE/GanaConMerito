import { NextResponse } from "next/server";
import { z } from "zod";
import { getSupabaseServerClient } from "../../../../lib/supabase/server";

const onboardingSchema = z.object({
  targetRole: z.literal("docente"),
  examType: z.literal("docente"),
  professionalProfileId: z.string().uuid(),
  activeGoal: z.string().trim().min(1, "La meta activa es obligatoria.").max(240),
  activeAreas: z
    .array(z.string().trim().min(1))
    .max(20)
    .default([])
    .transform((areas) => Array.from(new Set(areas.map((area) => area.trim()).filter(Boolean)))),
  preferredFeedbackStyle: z.enum(["socratic"]).default("socratic"),
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

  // Regla Sprint 2 / P1:
  // `activeAreas` es un campo opcional de preferencia de usuario.
  // Puede persistirse vacío y no bloquea onboarding ni práctica mientras
  // la segmentación activa del runtime siga gobernada por perfil profesional
  // + banco universal activo.
  const parsed = onboardingSchema.safeParse(json);

  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.issues.map((issue) => issue.message).join(" | ") || "Datos de onboarding inválidos." },
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

  const { data: professionalProfile, error: professionalProfileError } = await supabase
    .from("professional_profiles")
    .select("id")
    .eq("id", parsed.data.professionalProfileId)
    .eq("is_active", true)
    .single();

  if (professionalProfileError || !professionalProfile) {
    return NextResponse.json({ error: "Professional profile not found" }, { status: 400 });
  }

  const { error: updateError } = await supabase
    .from("learning_profiles")
    .update({
      target_role: parsed.data.targetRole,
      exam_type: parsed.data.examType,
      professional_profile_id: parsed.data.professionalProfileId,
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
