import { redirect } from "next/navigation";
import { OnboardingForm } from "@/components/onboarding/onboarding-form";
import { getSupabaseServerClient } from "@/lib/supabase/server";

export default async function OnboardingPage() {
  const supabase = await getSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("id")
    .eq("auth_user_id", user.id)
    .single();

  if (!profile) {
    redirect("/login");
  }

  const { data: learningProfile } = await supabase
    .from("learning_profiles")
    .select(
      "target_role, exam_type, active_goal, preferred_feedback_style, active_areas, onboarding_completed",
    )
    .eq("profile_id", profile.id)
    .single();

  if (learningProfile?.onboarding_completed) {
    redirect("/practice");
  }

  return (
    <main>
      <h1>Onboarding</h1>
      <p>Completa tu perfil inicial para personalizar la práctica.</p>
      <OnboardingForm
        initialTargetRole={learningProfile?.target_role ?? "docente"}
        initialExamType={learningProfile?.exam_type ?? "docente"}
        initialActiveGoal={learningProfile?.active_goal ?? ""}
        initialPreferredFeedbackStyle={learningProfile?.preferred_feedback_style ?? "socratic"}
        initialActiveAreas={learningProfile?.active_areas ?? []}
      />
    </main>
  );
}
