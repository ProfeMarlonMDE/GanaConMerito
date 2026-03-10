import { redirect } from "next/navigation";
import { StartPracticeForm } from "@/components/practice/start-practice-form";
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
      <p>Inicia una sesión real de práctica contra el backend.</p>
      <StartPracticeForm />
    </main>
  );
}
