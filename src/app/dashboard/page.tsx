import { redirect } from "next/navigation";
import {
  getDashboardSummaryForCurrentUser,
  getDashboardTopicBreakdownForCurrentUser,
} from "@/lib/dashboard/summary";
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
  const breakdown = await getDashboardTopicBreakdownForCurrentUser();
  const accuracy = summary.totalAttempts > 0
    ? Number(((summary.totalCorrect / summary.totalAttempts) * 100).toFixed(1))
    : 0;

  return (
    <main>
      <h1>Dashboard</h1>

      <section>
        <h2>Resumen general</h2>
        <ul>
          <li>Nivel estimado: {summary.estimatedLevel}</li>
          <li>Intentos totales: {summary.totalAttempts}</li>
          <li>Aciertos totales: {summary.totalCorrect}</li>
          <li>Precisión: {accuracy}%</li>
          <li>Promedio razonamiento: {summary.avgReasoningScore}</li>
          <li>Tendencia: {summary.recentTrend}</li>
          <li>Percentil: {summary.percentileSegment ?? "Sin datos"}</li>
        </ul>
      </section>

      <section>
        <h2>Competencias</h2>
        <p>Fuertes: {summary.strongestCompetencies.join(", ") || "Sin datos"}</p>
        <p>Por reforzar: {summary.weakestCompetencies.join(", ") || "Sin datos"}</p>
      </section>

      <section>
        <h2>Desglose por tema</h2>
        {breakdown.length === 0 ? (
          <p>Aún no hay datos suficientes.</p>
        ) : (
          <ul>
            {breakdown.map((row) => (
              <li key={`${row.area}-${row.competency}`}>
                <strong>{row.area}</strong> / {row.competency} — intentos: {row.attempts}, aciertos: {row.correct_count}, nivel: {row.estimated_level}, razonamiento: {row.avg_reasoning_score}, dificultad media: {row.avg_difficulty}
              </li>
            ))}
          </ul>
        )}
      </section>
    </main>
  );
}
