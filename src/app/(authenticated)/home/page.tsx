import Link from "next/link";
import { getDashboardSummaryForCurrentUser } from "@/lib/dashboard/summary";
import { isLearningProfileOnboardingComplete } from "@/lib/onboarding/status";
import { requireAuthenticatedUser } from "@/lib/supabase/guards";

export default async function HomePage() {
  const { supabase, user } = await requireAuthenticatedUser();
  const { data: profile } = await supabase
    .from("profiles")
    .select("id")
    .eq("auth_user_id", user.id)
    .single();

  const { data: learningProfile } = profile
    ? await supabase
        .from("learning_profiles")
        .select("onboarding_completed, active_areas, active_goal")
        .eq("profile_id", profile.id)
        .single()
    : { data: null };

  const onboardingComplete = isLearningProfileOnboardingComplete(learningProfile);
  const primaryHref = onboardingComplete ? "/practice" : "/onboarding";
  const primaryLabel = onboardingComplete ? "Continuar práctica" : "Completar onboarding";
  const summary = await getDashboardSummaryForCurrentUser();
  const historical = summary.historical;
  const accuracy = historical.totalAttempts > 0
    ? Number(((historical.totalCorrect / historical.totalAttempts) * 100).toFixed(0))
    : 0;
  const progress = historical.totalAttempts > 0 ? Math.min(100, Math.max(8, accuracy)) : 18;
  const activeGoal = learningProfile?.active_goal?.trim() || "Configura tu meta activa para priorizar la práctica correcta.";
  const activeAreas = learningProfile?.active_areas?.length ? learningProfile.active_areas : [];

  return (
    <>
      <section className="page-header">
        <p className="eyebrow">Home / Hub</p>
        <h1 className="display-title">Control claro para volver a estudiar en segundos.</h1>
        <p className="body-lg">
          GanaConMerito prioriza continuidad, foco y lectura útil del progreso. Entra, continúa y revisa
          dónde conviene reforzar sin perderte en dashboards pesados.
        </p>
      </section>

      <section className="hero-card">
        <div className="inline-cluster" style={{ justifyContent: "space-between", alignItems: "flex-start" }}>
          <div style={{ maxWidth: 560 }}>
            <p className="eyebrow">Tu meta activa</p>
            <h2 className="section-title">{activeGoal}</h2>
            <p className="body-sm">
              {onboardingComplete
                ? `Áreas activas: ${activeAreas.length > 0 ? activeAreas.join(", ") : "pendientes de definición"}.`
                : "Todavía falta terminar tu configuración inicial para desbloquear una práctica bien orientada."}
            </p>
          </div>
          <div className="status-pill premium">Tutor GCM listo como capa contextual</div>
        </div>
        <div style={{ marginTop: 18 }}>
          <div className="inline-cluster" style={{ justifyContent: "space-between" }}>
            <span className="metric-label">Señal de avance</span>
            <span className="subtle">{progress}%</span>
          </div>
          <div className="progress-rail" style={{ marginTop: 10 }}>
            <div className="progress-fill" style={{ width: `${progress}%` }} />
          </div>
        </div>
        <div className="page-actions" style={{ marginTop: 22 }}>
          <Link href={primaryHref} className="primary-button" style={{ flex: 1 }}>
            {primaryLabel}
          </Link>
          <Link href="/dashboard" className="secondary-button" style={{ flex: 1 }}>
            Ver métricas
          </Link>
        </div>
      </section>

      <section className="metric-grid">
        <article className="metric-card">
          <span className="metric-label">Precisión histórica</span>
          <strong className="metric-value">{accuracy}%</strong>
          <span className={`metric-delta ${historical.recentTrend === "up" ? "success" : historical.recentTrend === "down" ? "warning" : ""}`}>
            Tendencia: {historical.recentTrend}
          </span>
        </article>
        <article className="metric-card">
          <span className="metric-label">Intentos acumulados</span>
          <strong className="metric-value">{historical.totalAttempts}</strong>
          <span className="subtle">Base real para medir progreso.</span>
        </article>
        <article className="metric-card">
          <span className="metric-label">Nivel estimado</span>
          <strong className="metric-value">{historical.estimatedLevel}</strong>
          <span className="subtle">Lectura global del rendimiento actual.</span>
        </article>
        <article className="metric-card">
          <span className="metric-label">Percentil</span>
          <strong className="metric-value">{historical.percentileSegment ?? "—"}</strong>
          <span className="subtle">Visible cuando ya existe señal suficiente.</span>
        </article>
      </section>

      <section className="two-column-grid">
        <article className="surface-card" style={{ padding: 22 }}>
          <p className="eyebrow">Siguiente mejor acción</p>
          <h2 className="section-title">{onboardingComplete ? "Retoma una sesión de práctica con foco" : "Cierra la configuración inicial"}</h2>
          <p className="body-sm">
            {onboardingComplete
              ? "La práctica sigue siendo la superficie principal: responde, justifica y revisa feedback sin cambiar de contexto."
              : "Completa perfil, meta y áreas activas para que la selección de preguntas y el dashboard partan de una base coherente."}
          </p>
          <div className="page-actions" style={{ marginTop: 18 }}>
            <Link href={primaryHref} className="primary-button" style={{ flex: 1 }}>
              {primaryLabel}
            </Link>
          </div>
        </article>

        <article className="tutor-chip">
          <div>
            <p className="metric-label" style={{ margin: 0 }}>Tutor GCM</p>
            <h3 style={{ margin: "6px 0 8px", fontSize: "1.05rem" }}>Presencia secundaria, no dominante</h3>
            <p className="subtle" style={{ margin: 0 }}>
              Queda preparado para recomendaciones, recap y ayuda contextual sin convertir el producto en chat-first.
            </p>
          </div>
          <span className="status-pill premium">Asistente-ready</span>
        </article>
      </section>

      <section className="two-column-grid">
        <article className="list-card">
          <div className="inline-cluster" style={{ justifyContent: "space-between" }}>
            <h2 className="section-title" style={{ fontSize: "1.25rem" }}>Fortalezas</h2>
            <span className="status-pill success">Señal alta</span>
          </div>
          {historical.strongestCompetencies.length > 0 ? historical.strongestCompetencies.map((entry) => (
            <div key={entry} className="list-row">
              <span>{entry}</span>
              <strong>{accuracy}%</strong>
            </div>
          )) : <p className="subtle">Aún faltan suficientes respuestas para mostrar áreas fuertes con confianza.</p>}
        </article>

        <article className="list-card">
          <div className="inline-cluster" style={{ justifyContent: "space-between" }}>
            <h2 className="section-title" style={{ fontSize: "1.25rem" }}>Áreas por reforzar</h2>
            <span className="status-pill warning">Prioridad</span>
          </div>
          {historical.weakestCompetencies.length > 0 ? historical.weakestCompetencies.map((entry) => (
            <div key={entry} className="list-row">
              <span>{entry}</span>
              <strong>{historical.avgReasoningScore}</strong>
            </div>
          )) : <p className="subtle">Todavía no hay suficiente señal para recomendar un frente concreto.</p>}
        </article>
      </section>

      <section className="surface-card" style={{ padding: 22 }}>
        <div className="inline-cluster" style={{ justifyContent: "space-between" }}>
          <div>
            <p className="eyebrow">Biblioteca curada</p>
            <h2 className="section-title">Documentación y material editorial sin ruido operativo</h2>
          </div>
          <Link href="/editorial" className="subtle">Abrir biblioteca →</Link>
        </div>
      </section>
    </>
  );
}
