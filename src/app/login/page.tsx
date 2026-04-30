import { redirect } from "next/navigation";
import { GoogleSignInButton } from "@/components/auth/google-sign-in-button";
import { getBuildInfo } from "@/lib/build-info";
import { getAuthenticatedLandingPath } from "@/lib/onboarding/routing";
import { getSupabaseServerClient } from "@/lib/supabase/server";

export default async function LoginPage() {
  const { commit, buildTime } = getBuildInfo();
  const supabase = await getSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user) {
    redirect(await getAuthenticatedLandingPath(supabase, user.id));
  }

  return (
    <main>
      <h1>Acceso</h1>
      <p>Inicia sesión con Google para continuar al MVP.</p>
      <GoogleSignInButton />
      <p style={{ marginTop: "16px", fontSize: "12px", opacity: 0.7 }}>
        Commit desplegado: <code>{commit}</code> · Build time: <code>{buildTime}</code>
      </p>
    </main>
  );
}
