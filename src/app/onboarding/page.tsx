import { redirect } from "next/navigation";
import { getSupabaseServerClient } from "@/lib/supabase/server";

export default async function OnboardingPage() {
  const supabase = await getSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  return (
    <main>
      <h1>Onboarding</h1>
      <p>Esta pantalla servirá para capturar meta, áreas activas y preferencias de ayuda.</p>
    </main>
  );
}
