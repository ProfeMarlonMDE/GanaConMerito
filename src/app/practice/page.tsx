import { redirect } from "next/navigation";
import { PracticeSession } from "@/components/practice/practice-session";
import { getSupabaseServerClient } from "@/lib/supabase/server";

export default async function PracticePage() {
  const supabase = await getSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  return (
    <main>
      <h1>Práctica</h1>
      <p>Sesión real conectada a backend, ítems y evaluación.</p>
      <PracticeSession />
    </main>
  );
}
