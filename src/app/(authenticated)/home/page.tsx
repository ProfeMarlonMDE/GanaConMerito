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
      <section className="page-header" style={{ paddingBottom: 0 }}>
        <p className="eyebrow">Panel de control</p>
        <h1 className="display-title">Bienvenido, {user.email?.split("@")[0]}</h1>
      </section>

      <section className="hero-card">
        <div className="inline-cluster" style={{ justifyContent: "space-between", alignItems: "flex-start" }}>
          <div style={{ maxWidth: 560 }}>
            <p className="eyebrow">{onboardingComplete ? "Tu enfoque actual" : "Acción inmediata"}</p>
            <h2 className="section-title">
              {onboardingComplete 
                ? activeGoal 
                : "Completa tu configuración para empezar."}
            </h2>
            <p className="body-sm" style={{ marginTop: 8 }}>
              {onboardingComplete
                ? `Practicando en: ${activeAreas.length > 0 ? activeAreas.join(", ") : "áreas por definir"}.`
                : "El sistema necesita saber tu perfil y metas para seleccionar las mejores preguntas para ti."}
            </p>
          </div>
          {!onboardingComplete && <span className="status-pill warning">Pendiente</span>}
        </div>
        
        <div className="page-actions" style={{ marginTop: 28 }}>
          <Link href={primaryHref} className="primary-button" style={{ flex: 1 }}>
            {primaryLabel} →
          </Link>
          {onboardingComplete && (
            <Link href="/dashboard" className="secondary-button" style={{ flex: 1 }}>
              Revisar progreso
            </Link>
          )}
        </div>
      </section>

      <section className="metric-grid">
        <article className="metric-card">
          <span className="metric-label">Precisión</span>
          <strong className="metric-value">{accuracy}%</strong>
          <div className="progress-rail" style={{ height: 4, marginTop: 4 }}>
            <div className="progress-fill" style={{ width: `${progress}%` }} />
          </div>
        </article>
        <article className="metric-card">
          <span className="metric-label">Intentos</span>
          <strong className="metric-value">{historical.totalAttempts}</strong>
        </article>
      </section>

      <section className="two-column-grid">
        <article className="surface-card" style={{ padding: 22 }}>
          <p className="eyebrow">Tu rendimiento</p>
          <h2 className="section-title" style={{ fontSize: "1.1rem" }}>{historical.estimatedLevel}</h2>
          <p className="subtle" style={{ marginTop: 4 }}>Nivel estimado actual</p>
          
          <div className="tutor-chip" style={{ marginTop: 20 }}>
            <p className="body-sm" style={{ margin: 0 }}>
              {onboardingComplete 
                ? "Listo para una nueva sesión de práctica." 
                : "Configura tu perfil para activar el Tutor GCM."}
            </p>
          </div>
        </article>

        <article className="surface-card" style={{ padding: 22 }}>
          <p className="eyebrow">Próximo paso</p>
          <h2 className="section-title" style={{ fontSize: "1.1rem" }}>{onboardingComplete ? "Sesión de práctica" : "Formulario inicial"}</h2>
          <Link href={primaryHref} className="subtle" style={{ marginTop: 12, display: "inline-block" }}>
            {primaryLabel} →
          </Link>
        </article>
      </section>
    </>
  );
}

