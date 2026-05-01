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

function getAccuracy(totalCorrect: number, totalAttempts: number) {
  return totalAttempts > 0 ? Number(((totalCorrect / totalAttempts) * 100).toFixed(1)) : 0;
}

export default async function DashboardPage({ searchParams }: DashboardPageProps) {
  await requireAuthenticatedUser();

  const resolvedSearchParams = await searchParams;
  const rawSessionId = resolvedSearchParams?.sessionId;
  const sessionId = Array.isArray(rawSessionId) ? rawSessionId[0] : rawSessionId;
  const isSessionView = Boolean(sessionId);

  const summary = await getDashboardSummaryForCurrentUser(sessionId);
  const breakdown = await getDashboardTopicBreakdownForCurrentUser(sessionId);

  const historicalAccuracy = getAccuracy(summary.historical.totalCorrect, summary.historical.totalAttempts);
  const currentAccuracy = summary.currentSession
    ? getAccuracy(summary.currentSession.totalCorrect, summary.currentSession.totalAttempts)
    : 0;

  const currentBlock = summary.currentSession;
  const topWeak = (isSessionView ? breakdown.currentSession : breakdown.historical).slice(-2).reverse();
  const topStrong = (isSessionView ? breakdown.currentSession : breakdown.historical).slice(0, 2);

  const activeRows = isSessionView ? breakdown.currentSession : breakdown.historical;

  return (
    <>
      <section className="page-header">
        <p className="eyebrow">Dashboard</p>
        <h1 className="display-title">Insights útiles antes que tablas.</h1>
        <p className="body-lg">
          Vista móvil pensada para entender tendencia, fortalezas y focos de refuerzo sin convertir el progreso en ruido.
        </p>
        <div className="inline-cluster">
          <span className={`segment-pill ${!isSessionView ? "active" : ""}`}>Histórico</span>
          <span className={`segment-pill ${isSessionView ? "active" : ""}`}>Sesión actual</span>
          {isSessionView ? <Link href="/dashboard" className="subtle">Ver acumulado →</Link> : null}
        </div>
      </section>

      <section className="metric-grid">
        <article className="metric-card">
          <span className="metric-label">Precisión {isSessionView ? "sesión" : "global"}</span>
          <strong className="metric-value">{isSessionView ? currentAccuracy : historicalAccuracy}%</strong>
          <span className={`metric-delta ${summary.historical.recentTrend === "up" ? "success" : summary.historical.recentTrend === "down" ? "warning" : ""}`}>
            Tendencia {summary.historical.recentTrend}
          </span>
        </article>
        <article className="metric-card">
          <span className="metric-label">Intentos</span>
          <strong className="metric-value">{isSessionView && currentBlock ? currentBlock.totalAttempts : summary.historical.totalAttempts}</strong>
          <span className="subtle">Señal efectiva sobre la que ya puedes decidir.</span>
        </article>
        <article className="metric-card">
          <span className="metric-label">Razonamiento promedio</span>
          <strong className="metric-value">{isSessionView && currentBlock ? currentBlock.avgReasoningScore : summary.historical.avgReasoningScore}</strong>
          <span className="subtle">Ayuda a leer calidad, no solo acierto bruto.</span>
        </article>
        <article className="metric-card">
          <span className="metric-label">Nivel estimado</span>
          <strong className="metric-value">{isSessionView && currentBlock ? currentBlock.estimatedLevel : summary.historical.estimatedLevel}</strong>
          <span className="subtle">Lectura resumida del momento actual.</span>
        </article>
      </section>

      <section className="two-column-grid">
        <article className="surface-card" style={{ padding: 22 }}>
          <div className="inline-cluster" style={{ justifyContent: "space-between" }}>
            <div>
              <p className="eyebrow">Tendencia</p>
              <h2 className="section-title">{isSessionView ? "Sesión en contexto" : "Progreso histórico acumulado"}</h2>
            </div>
            <span className="status-pill premium">High signal</span>
          </div>
          <p className="body-sm">
            {isSessionView
              ? `Session ID: ${sessionId}. Aquí conviven la lectura puntual de la corrida y el histórico acumulado para evitar conclusiones aisladas.`
              : "Esta vista resume tu avance general y funciona como mapa para decidir el siguiente frente de práctica."}
          </p>
          <div style={{ marginTop: 16 }}>
            <div className="inline-cluster" style={{ justifyContent: "space-between" }}>
              <span className="metric-label">Precisión</span>
              <span className="subtle">{isSessionView ? currentAccuracy : historicalAccuracy}%</span>
            </div>
            <div className="progress-rail" style={{ marginTop: 10 }}>
              <div className="progress-fill" style={{ width: `${Math.min(100, Math.max(8, isSessionView ? currentAccuracy : historicalAccuracy))}%` }} />
            </div>
          </div>
          <div className="tutor-chip" style={{ marginTop: 18 }}>
            <div>
              <p className="metric-label" style={{ margin: 0 }}>Tutor GCM</p>
              <p className="body-sm" style={{ margin: "8px 0 0" }}>
                {summary.historical.weakestCompetencies.length > 0
                  ? `Prioridad sugerida: reforzar ${summary.historical.weakestCompetencies[0]} antes de ampliar volumen.`
                  : "Cuando haya más señal, aquí vivirán recomendaciones estratégicas accionables."}
              </p>
            </div>
            <span className="status-pill premium">Contextual</span>
          </div>
        </article>

        <article className="surface-card" style={{ padding: 22 }}>
          <p className="eyebrow">Lectura ejecutiva</p>
          <div className="list-row">
            <span>Percentil</span>
            <strong>{isSessionView && currentBlock ? currentBlock.percentileSegment ?? "—" : summary.historical.percentileSegment ?? "—"}</strong>
          </div>
          <div className="list-row">
            <span>Fortaleza principal</span>
            <strong>{summary.historical.strongestCompetencies[0] ?? "Sin datos"}</strong>
          </div>
          <div className="list-row">
            <span>Refuerzo principal</span>
            <strong>{summary.historical.weakestCompetencies[0] ?? "Sin datos"}</strong>
          </div>
        </article>
      </section>

      <section className="two-column-grid">
        <article className="list-card">
          <div className="inline-cluster" style={{ justifyContent: "space-between" }}>
            <h2 className="section-title" style={{ fontSize: "1.2rem" }}>Áreas de dominio</h2>
            <span className="status-pill success">Fuerte</span>
          </div>
          {topStrong.length > 0 ? topStrong.map((row) => (
            <div key={`${row.area}-${row.competency}`} className="list-row">
              <span>{row.area} / {row.competency}</span>
              <strong>{getAccuracy(row.correct_count, row.attempts)}%</strong>
            </div>
          )) : <p className="subtle">Aún no hay datos suficientes para identificar fortalezas.</p>}
        </article>
        <article className="list-card">
          <div className="inline-cluster" style={{ justifyContent: "space-between" }}>
            <h2 className="section-title" style={{ fontSize: "1.2rem" }}>Focos de refuerzo</h2>
            <span className="status-pill warning">Atención</span>
          </div>
          {topWeak.length > 0 ? topWeak.map((row) => (
            <div key={`${row.area}-${row.competency}`} className="list-row">
              <span>{row.area} / {row.competency}</span>
              <strong>{getAccuracy(row.correct_count, row.attempts)}%</strong>
            </div>
          )) : <p className="subtle">Todavía no hay señal suficiente para priorizar un refuerzo claro.</p>}
        </article>
      </section>

      <section className="surface-card" style={{ padding: 22 }}>
        <div className="inline-cluster" style={{ justifyContent: "space-between" }}>
          <div>
            <p className="eyebrow">Desglose</p>
            <h2 className="section-title">Detalle por tema</h2>
          </div>
          <Link href="/practice" className="subtle">Ir a práctica →</Link>
        </div>
        {activeRows.length === 0 ? (
          <p className="subtle">Aún no hay datos suficientes.</p>
        ) : (
          <div style={{ marginTop: 10 }}>
            {activeRows.map((row) => (
              <div key={`${row.area}-${row.competency}`} className="list-row">
                <div>
                  <strong>{row.area}</strong>
                  <div className="subtle">{row.competency}</div>
                </div>
                <div style={{ textAlign: "right" }}>
                  <strong>{getAccuracy(row.correct_count, row.attempts)}%</strong>
                  <div className="subtle">{row.attempts} intentos</div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </>
  );
}
