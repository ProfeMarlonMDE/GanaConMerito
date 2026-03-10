import { redirect } from "next/navigation";
import { getDashboardSummaryForCurrentUser } from "@/lib/dashboard/summary";
import { getSupabaseServerClient } from "@/lib/supabase/server";

export default async function DashboardPage() {
  const supabase = await getSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const summary = await getDashboardSummaryForCurrentUser();

  return (
    <main>
      <h1>Dashboard</h1>
      <ul>
        <li>Nivel estimado: {summary.estimatedLevel}</li>
        <li>Intentos totales: {summary.totalAttempts}</li>
        <li>Aciertos totales: {summary.totalCorrect}</li>
        <li>Promedio razonamiento: {summary.avgReasoningScore}</li>
        <li>Tendencia: {summary.recentTrend}</li>
      </ul>
      <p>Competencias fuertes: {summary.strongestCompetencies.join(", ") || "Sin datos"}</p>
      <p>Competencias por reforzar: {summary.weakestCompetencies.join(", ") || "Sin datos"}</p>
    </main>
  );
}
