import Link from "next/link";
import { redirect } from "next/navigation";
import { PracticeSession } from "@/components/practice/practice-session";
import { isLearningProfileOnboardingComplete } from "@/lib/onboarding/status";
import { requireAuthenticatedUser } from "@/lib/supabase/guards";

export default async function PracticePage() {
  const { supabase, user } = await requireAuthenticatedUser();
  const { data: profile } = await supabase
    .from("profiles")
    .select("id")
    .eq("auth_user_id", user.id)
    .single();

  if (!profile) {
    redirect("/onboarding");
  }

  const { data: learningProfile } = await supabase
    .from("learning_profiles")
    .select("onboarding_completed, active_areas")
    .eq("profile_id", profile.id)
    .single();

  if (!isLearningProfileOnboardingComplete(learningProfile)) {
    redirect("/onboarding");
  }

  return (
    <>
      <section className="page-header">
        <p className="eyebrow">Práctica</p>
        <h1 className="display-title">La superficie más fuerte: pregunta, decisión y feedback.</h1>
        <p className="body-lg">
          Sin chat dominante, sin desorden visual. Aquí vive el núcleo del producto y la señal que luego alimenta el dashboard.
        </p>
        <div className="page-actions">
          <Link href="/home" className="subtle">← Volver a inicio</Link>
        </div>
      </section>
      <PracticeSession />
    </>
  );
}
