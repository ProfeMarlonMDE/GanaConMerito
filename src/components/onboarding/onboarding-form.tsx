"use client";

import { useMemo, useState } from "react";

interface TargetProfileOption {
  code: string;
  name: string;
}

interface OpecOption {
  id: string;
  profile_code: string;
  position_name: string;
  external_opec_id: string;
}

export function OnboardingForm(props: {
  initialTargetProfileCode: string;
  initialTargetOpecId: string;
  targetProfiles: TargetProfileOption[];
  opecs: OpecOption[];
  initialActiveGoal: string;
  initialPreferredFeedbackStyle: string;
  initialActiveAreas: string[];
  existing?: boolean;
}) {
  const [targetProfileCode, setTargetProfileCode] = useState(
    props.initialTargetProfileCode || props.targetProfiles[0]?.code || "",
  );
  const [targetOpecId, setTargetOpecId] = useState(props.initialTargetOpecId || "");
  const [activeGoal, setActiveGoal] = useState(props.initialActiveGoal || "Prepararme para concurso");
  const [preferredFeedbackStyle, setPreferredFeedbackStyle] = useState<"socratic" | "direct" | "brief">(
    (props.initialPreferredFeedbackStyle as "socratic" | "direct" | "brief") || "socratic",
  );
  const [activeAreas] = useState((props.initialActiveAreas || []).join(", "));
  const [showOpec, setShowOpec] = useState(Boolean(props.initialTargetOpecId));
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const activeGoalValue = activeGoal.trim();
  const parsedActiveAreas = useMemo(
    () =>
      Array.from(
        new Set(
          activeAreas
            .split(",")
            .map((value) => value.trim())
            .filter(Boolean),
        ),
      ),
    [activeAreas],
  );
  const compatibleOpecs = useMemo(
    () => props.opecs.filter((opec) => opec.profile_code === targetProfileCode),
    [props.opecs, targetProfileCode],
  );
  const compactProfiles = useMemo(() => {
    const currentDocente = props.targetProfiles.find((profile) => profile.code === targetProfileCode && profile.code.includes("docente_aula"));
    const docente = currentDocente ?? props.targetProfiles.find((profile) => profile.code.includes("docente_aula")) ?? props.targetProfiles[0];
    const general = props.targetProfiles.find((profile) => profile.code !== docente?.code) ?? props.targetProfiles[1];
    return [
      docente ? { label: "Docente de aula", code: docente.code } : null,
      general ? { label: "General", code: general.code } : null,
    ].filter((profile): profile is { label: string; code: string } => Boolean(profile));
  }, [props.targetProfiles, targetProfileCode]);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError(null);

    const response = await fetch("/api/profile/onboarding", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        targetProfileCode,
        targetOpecId: targetOpecId || null,
        activeGoal: activeGoalValue,
        preferredFeedbackStyle,
        activeAreas: parsedActiveAreas,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      setError(data.error ?? "No se pudo guardar el onboarding.");
      setLoading(false);
      return;
    }

    window.location.assign("/practice");
  }

  return (
    <form className="gcm-profile-form" onSubmit={handleSubmit}>
      <fieldset className="gcm-profile-fieldset">
        <legend className="gcm-profile-legend">
          <span>1. Tu objetivo principal</span>
        </legend>
        <div className="gcm-profile-choice-group">
          {["Prepararme para concurso", "Diagnosticarme", "Reforzar un tema"].map((goal) => (
            <button
              key={goal}
              type="button"
              className={`gcm-profile-pill ${activeGoalValue === goal ? "active" : ""}`}
              onClick={() => setActiveGoal(goal)}
              disabled={loading}
            >
              {goal}
            </button>
          ))}
        </div>
      </fieldset>

      <hr className="gcm-profile-divider" />

      <fieldset className="gcm-profile-fieldset">
        <legend className="gcm-profile-legend">
          <span>2. Nivel de aplicación</span>
        </legend>
        <div className="gcm-profile-choice-group">
          {compactProfiles.map((profile) => (
            <button
              key={profile.code}
              type="button"
              className={`gcm-profile-pill ${
                targetProfileCode === profile.code ||
                (profile.label === "Docente de aula" && targetProfileCode.includes("docente_aula"))
                  ? "active"
                  : ""
              }`}
              onClick={() => { setTargetProfileCode(profile.code); setTargetOpecId(""); }}
              disabled={loading}
            >
              {profile.label}
            </button>
          ))}
          {props.targetProfiles.length === 0 ? <button type="button" className="gcm-profile-pill" disabled>No disponible</button> : null}
        </div>
      </fieldset>

      <hr className="gcm-profile-divider" />

      {compatibleOpecs.length > 0 ? (
        <>
          <fieldset className="gcm-profile-fieldset">
            <div className="gcm-profile-legend-group">
              <legend className="gcm-profile-legend">
                <span>3. Me estoy preparando para</span>
                <span className="gcm-profile-legend-hint">(Selecciona tu especialidad o cargo directivo/docente)</span>
              </legend>
            </div>
            <div className="gcm-profile-select-wrapper">
              <select
                className="gcm-profile-select"
                value={targetOpecId}
                onChange={(event) => setTargetOpecId(event.target.value)}
                disabled={loading}
              >
                <option value="">Usar solo el perfil reusable</option>
                {compatibleOpecs.map((opec) => (
                  <option key={opec.id} value={opec.id}>{opec.position_name}</option>
                ))}
              </select>
            </div>
          </fieldset>
          <hr className="gcm-profile-divider" />
        </>
      ) : null}

      <fieldset className="gcm-profile-fieldset">
        <div className="gcm-profile-legend-group tutor-legend-group">
          <div>
            <legend className="gcm-profile-legend">
              <span>{compatibleOpecs.length > 0 ? "4" : "3"}. Estilo de acompañamiento</span>
              <span className="gcm-profile-badge">AGÉNTICO ACTIVO</span>
            </legend>
            <p className="gcm-profile-subtext">Elige cómo interactuará contigo el Tutor IA de juicio situacional durante la prueba.</p>
          </div>
        </div>

        <div className="gcm-profile-styles">
          <div className="gcm-profile-choice-group tutor-styles-group">
            {[
              {
                key: "socratic",
                initial: "S",
                name: "Socrático",
              },
              {
                key: "direct",
                initial: "D",
                name: "Directo",
              },
              {
                key: "brief",
                initial: "B",
                name: "Breve",
              },
            ].map((style) => (
              <button
                key={style.key}
                type="button"
                className={`gcm-profile-style-pill ${preferredFeedbackStyle === style.key ? "active" : ""}`}
                onClick={() => setPreferredFeedbackStyle(style.key as "socratic" | "direct" | "brief")}
                disabled={loading}
              >
                <span className="style-initial">{style.initial}</span>
                <span className="style-name">{style.name}</span>
                {preferredFeedbackStyle === style.key && <span className="style-active-dot"></span>}
              </button>
            ))}
          </div>

          <div className="gcm-profile-style-info">
            <div className="style-info-header">
              <div className="style-info-title-group">
                <span className="style-info-icon">
                  {preferredFeedbackStyle === "socratic" ? "S" : preferredFeedbackStyle === "direct" ? "D" : "B"}
                </span>
                <h4 className="style-info-title">
                  Modo {preferredFeedbackStyle === "socratic" ? "Socrático" : preferredFeedbackStyle === "direct" ? "Directo" : "Breve"}
                </h4>
              </div>
              <span className="style-info-badge">Activo</span>
            </div>
            <p className="style-info-desc">
              {preferredFeedbackStyle === "socratic"
                ? "Preguntas guiadas y pistas pedagógicas antes de revelar la clave. Diseñado para reflexionar sobre el caso y descartar distractores según la norma."
                : preferredFeedbackStyle === "direct"
                ? "Criterios claros y explicación estructurada del error o acierto."
                : "Orientación en viñetas sintéticas directas a la regla."}
            </p>
          </div>
        </div>
      </fieldset>

      <div className="gcm-profile-footer">
        <button type="submit" className="gcm-profile-submit" disabled={loading || !targetProfileCode || !activeGoalValue}>
          <span>{loading ? "Guardando..." : props.existing ? "Actualizar mi ruta" : "Crear mi ruta"}</span>
          <span className="submit-arrow">→</span>
        </button>
        <div className="gcm-profile-status">
          <span className="status-icon">✓</span>
          <span>Configuración modificable en cualquier momento desde el examen</span>
        </div>
      </div>

      {error ? <p className="gcm-profile-error">{error}</p> : null}
    </form>
  );
}
