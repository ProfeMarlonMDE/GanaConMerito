import Link from "next/link";
import { redirect } from "next/navigation";
import { SignOutButton } from "@/components/auth/sign-out-button";
import { getSupabaseServerClient } from "@/lib/supabase/server";

export default async function HomePage() {
  const supabase = await getSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  return (
    <main>
      <h1>Inicio</h1>
      <p>Sesión autenticada.</p>
      <p>{user.email}</p>
      <nav>
        <ul>
          <li><Link href="/onboarding">Onboarding</Link></li>
          <li><Link href="/practice">Práctica</Link></li>
          <li><Link href="/dashboard">Dashboard</Link></li>
        </ul>
      </nav>
      <SignOutButton />
    </main>
  );
}
