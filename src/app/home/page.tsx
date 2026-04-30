import Link from "next/link";
import { SignOutButton } from "@/components/auth/sign-out-button";
import { AppNav } from "@/components/navigation/app-nav";
import { requireAuthenticatedUser } from "@/lib/supabase/guards";

export default async function HomePage() {
  const { user } = await requireAuthenticatedUser();

  return (
    <main>
      <AppNav />
      <h1>Inicio</h1>
      <p>Sesión autenticada.</p>
      <p>{user.email}</p>
      <nav>
        <ul>
          <li><Link href="/onboarding">Onboarding</Link></li>
          <li><Link href="/practice">Práctica</Link></li>
          <li><Link href="/dashboard">Dashboard</Link></li>
          <li><Link href="/editorial">Biblioteca editorial</Link></li>
        </ul>
      </nav>
      <SignOutButton />
    </main>
  );
}
