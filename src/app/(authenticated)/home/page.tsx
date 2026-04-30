import Link from "next/link";
import { isLearningProfileOnboardingComplete } from "@/lib/onboarding/status";
import { requireAuthenticatedUser } from "@/lib/supabase/guards";

export default async function HomePage() {
  const { supabase, user } = await requireAuthenticatedUser();
  const { data: profile } = await supabase
    .from("profiles")
    .select("id")
    .eq("auth_user_id", user.id)
    .single();

  const { data: learningProfile } = profile
    ? await supabase
        .from("learning_profiles")
        .select("onboarding_completed, active_areas")
        .eq("profile_id", profile.id)
        .single()
    : { data: null };

  const onboardingComplete = isLearningProfileOnboardingComplete(learningProfile);
  const primaryHref = onboardingComplete ? "/practice" : "/onboarding";
  const primaryLabel = onboardingComplete ? "Continuar práctica" : "Completar onboarding";

  return (
    <>
      <h1>Inicio</h1>
      <p>Sesión autenticada.</p>
      <p>{user.email}</p>
      <p>
        <Link href={primaryHref}>{primaryLabel}</Link>
      </p>
      <ul>
        <li><Link href="/dashboard">Ver progreso y resultados</Link></li>
        <li><Link href="/editorial">Biblioteca editorial</Link></li>
      </ul>
    </>
  );
}
