import { PracticeSession } from "@/components/practice/practice-session";
import { requireAuthenticatedUser } from "@/lib/supabase/guards";

export default async function PracticePage() {
  await requireAuthenticatedUser();

  return (
    <main>
      <h1>Práctica</h1>
      <p>Sesión real conectada a backend, ítems y evaluación.</p>
      <PracticeSession />
    </main>
  );
}
