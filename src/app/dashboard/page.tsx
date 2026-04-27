import Link from "next/link";
import {
  getDashboardSummaryForCurrentUser,
  getDashboardTopicBreakdownForCurrentUser,
} from "@/lib/dashboard/summary";
import { requireAuthenticatedUser } from "@/lib/supabase/guards";

interface DashboardPageProps {
  searchParams?: Promise<{
    sessionId?: string | string[];
  }>;
}

export default async function DashboardPage({ searchParams }: DashboardPageProps) {
  await requireAuthenticatedUser();

  const resolvedSearchParams = await searchParams;
  const rawSessionId = resolvedSearchParams?.sessionId;
  const sessionId = Array.isArray(rawSessionId) ? rawSessionId[0] : rawSessionId;
  const isSessionView = Boolean(sessionId);

  const summary = await getDashboardSummaryForCurrentUser(sessionId);
  const breakdown = await getDashboardTopicBreakdownForCurrentUser(sessionId);
  const accuracy = summary.totalAttempts > 0
    ? Number(((summary.totalCorrect / summary.totalAttempts) * 100).toFixed(1))
    : 0;

  return (
    <main>
      <h1>Dashboard</h1>

      {isSessionView ? (
        <section>
          <p>Viendo resultados de la sesión reciente.</p>
          <p>Session ID: {sessionId}</p>
          <Link href="/dashboard">Ver dashboard histórico acumulado</Link>
        </section>
      ) : (
        <section>
          <p>Vista acumulada de tu progreso histórico.</p>
        </section>
      )}

      <section>
        <h2>{isSessionView ? "Resumen de la sesión" : "Resumen general"}</h2>
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
        <p>Fuertes: {summary.strongestCompetencies.length > 0 ? summary.strongestCompetencies.join(", ") : "Sin datos suficientes"}</p>
        <p>Por reforzar: {summary.weakestCompetencies.length > 0 ? summary.weakestCompetencies.join(", ") : "Sin datos"}</p>
      </section>

      <section>
        <h2>{isSessionView ? "Desglose de la sesión" : "Desglose por tema"}</h2>
        {breakdown.length === 0 ? (
          <p>{isSessionView ? "Esta sesión todavía no tiene respuestas evaluadas." : "Aún no hay datos suficientes."}</p>
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
