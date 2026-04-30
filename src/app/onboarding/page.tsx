import Link from "next/link";
import { redirect } from "next/navigation";
import { AppNav } from "@/components/navigation/app-nav";
import { OnboardingForm } from "@/components/onboarding/onboarding-form";
import { isLearningProfileOnboardingComplete } from "@/lib/onboarding/status";
import { requireAuthenticatedUser } from "@/lib/supabase/guards";

export default async function OnboardingPage() {
  const { supabase, user } = await requireAuthenticatedUser();

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
      "target_role, exam_type, professional_profile_id, active_goal, preferred_feedback_style, active_areas, onboarding_completed",
    )
    .eq("profile_id", profile.id)
    .single();

  const { data: professionalProfiles } = await supabase
    .from("professional_profiles")
    .select("id, code, name")
    .eq("is_active", true)
    .order("name", { ascending: true });

  if (isLearningProfileOnboardingComplete(learningProfile)) {
    redirect("/practice");
  }

  return (
    <main>
      <AppNav />
      <h1>Onboarding</h1>
      <p>Completa tu perfil inicial para personalizar la práctica.</p>
      <p><Link href="/home">← Volver a inicio</Link></p>
      <OnboardingForm
        initialTargetRole={learningProfile?.target_role ?? "docente"}
        initialExamType={learningProfile?.exam_type ?? "docente"}
        initialProfessionalProfileId={learningProfile?.professional_profile_id ?? professionalProfiles?.[0]?.id ?? ""}
        professionalProfiles={(professionalProfiles ?? []).map((profile) => ({
          id: profile.id,
          code: profile.code,
          name: profile.name,
        }))}
        initialActiveGoal={learningProfile?.active_goal ?? ""}
        initialPreferredFeedbackStyle={learningProfile?.preferred_feedback_style ?? "socratic"}
        initialActiveAreas={learningProfile?.active_areas ?? []}
      />
    </main>
  );
}
