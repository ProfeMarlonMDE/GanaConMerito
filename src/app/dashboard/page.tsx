import Link from "next/link";
import { AppNav } from "@/components/navigation/app-nav";
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

  const renderSummary = (title: string, block: typeof summary.historical) => {
    const accuracy = block.totalAttempts > 0
      ? Number(((block.totalCorrect / block.totalAttempts) * 100).toFixed(1))
      : 0;

    return (
      <section>
        <h2>{title}</h2>
        <ul>
          <li>Nivel estimado: {block.estimatedLevel}</li>
          <li>Intentos totales: {block.totalAttempts}</li>
          <li>Aciertos totales: {block.totalCorrect}</li>
          <li>Precisión: {accuracy}%</li>
          <li>Promedio razonamiento: {block.avgReasoningScore}</li>
          <li>Tendencia: {block.recentTrend}</li>
          <li>Percentil: {block.percentileSegment ?? "Sin datos"}</li>
        </ul>
        <p>Fuertes: {block.strongestCompetencies.length > 0 ? block.strongestCompetencies.join(", ") : "Sin datos suficientes"}</p>
        <p>Por reforzar: {block.weakestCompetencies.length > 0 ? block.weakestCompetencies.join(", ") : "Sin datos"}</p>
      </section>
    );
  };

  const renderBreakdown = (title: string, rows: typeof breakdown.historical, emptyLabel: string) => (
    <section>
      <h2>{title}</h2>
      {rows.length === 0 ? (
        <p>{emptyLabel}</p>
      ) : (
        <ul>
          {rows.map((row) => (
            <li key={`${title}-${row.area}-${row.competency}`}>
              <strong>{row.area}</strong> / {row.competency} — intentos: {row.attempts}, aciertos: {row.correct_count}, nivel: {row.estimated_level}, razonamiento: {row.avg_reasoning_score}, dificultad media: {row.avg_difficulty}
            </li>
          ))}
        </ul>
      )}
    </section>
  );

  return (
    <main>
      <AppNav />
      <h1>Dashboard</h1>
      <p><Link href="/home">← Volver a inicio</Link></p>

      {isSessionView ? (
        <section>
          <p>Viendo resultados separados entre la corrida actual y tu histórico acumulado.</p>
          <p>Session ID: {sessionId}</p>
          <Link href="/dashboard">Ver dashboard histórico acumulado</Link>
        </section>
      ) : (
        <section>
          <p>Vista acumulada de tu progreso histórico.</p>
        </section>
      )}

      {isSessionView && summary.currentSession ? renderSummary("Resumen de la sesión actual", summary.currentSession) : null}
      {renderSummary(isSessionView ? "Resumen histórico acumulado" : "Resumen general", summary.historical)}

      {isSessionView
        ? renderBreakdown("Desglose de la sesión actual", breakdown.currentSession, "Esta sesión todavía no tiene respuestas evaluadas.")
        : null}
      {renderBreakdown(
        isSessionView ? "Desglose histórico acumulado" : "Desglose por tema",
        breakdown.historical,
        "Aún no hay datos suficientes.",
      )}
    </main>
  );
}
