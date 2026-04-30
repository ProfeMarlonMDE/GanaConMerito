import Link from "next/link";
import { PracticeSession } from "@/components/practice/practice-session";
import { AppNav } from "@/components/navigation/app-nav";
import { requireAuthenticatedUser } from "@/lib/supabase/guards";

export default async function PracticePage() {
  await requireAuthenticatedUser();

  return (
    <main>
      <AppNav />
      <h1>Práctica</h1>
      <p>Sesión real conectada a backend, ítems y evaluación.</p>
      <p><Link href="/home">← Volver a inicio</Link></p>
      <PracticeSession />
    </main>
  );
}
