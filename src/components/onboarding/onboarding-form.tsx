"use client";

import { useMemo, useState } from "react";
import { PositionSelector } from "./position-selector";


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
          <span>2. Me estoy preparando para</span>
        </legend>
        <PositionSelector
          value={targetProfileCode}
          onChange={(code) => {
            setTargetProfileCode(code);
            setTargetOpecId("");
          }}
          disabled={loading}
        />
      </fieldset>

      <hr className="gcm-profile-divider" />

      

      <fieldset className="gcm-profile-fieldset">
        <div className="gcm-profile-legend-group tutor-legend-group">
          <div>
            <legend className="gcm-profile-legend">
              <span>3. Estilo de acompañamiento</span>
              <span className="gcm-profile-badge">
                <span className="eyebrow-dot" style={{ width: 6, height: 6, marginRight: 4, backgroundColor: "var(--gcm-forest)" }}></span> AGÉNTICO ACTIVO
              </span>
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
              <label key={style.key} style={{ margin: 0 }}>
                <button
                  type="button"
                  className={`gcm-profile-style-pill ${preferredFeedbackStyle === style.key ? "active" : ""}`}
                  onClick={() => setPreferredFeedbackStyle(style.key as "socratic" | "direct" | "brief")}
                  disabled={loading}
                >
                  <span className="style-initial">{style.initial}</span>
                  <span className="style-name">{style.name}</span>
                  {preferredFeedbackStyle === style.key && <span className="style-active-dot"></span>}
                </button>
              </label>
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
              <span className="style-info-badge">
                <span className="eyebrow-dot" style={{ width: 6, height: 6, marginRight: 4, backgroundColor: "var(--gcm-forest)" }}></span> Activo
              </span>
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

        <div className="tutor-note">
          <span className="tutor-note-icon">🤖</span>
          <p className="tutor-note-text">
            <strong>Modo tutor protegido:</strong> Nuestro modelo agéntico cuenta con protección anticopia y entrenamiento específico en competencias funcionales y comportamentales CNSC.
          </p>
        </div>
      </fieldset>

      <div className="gcm-profile-footer">
        <button type="submit" className="gcm-profile-submit" disabled={loading || !targetProfileCode || !activeGoalValue}>
          <span>{loading ? "Guardando..." : props.existing ? "Actualizar mi ruta" : "Actualizar mi ruta"}</span>
          <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5" className="submit-arrow">
            <path d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" strokeLinecap="round" strokeLinejoin="round"></path>
          </svg>
        </button>
        <div className="gcm-profile-status">
          <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2" className="status-icon" style={{ color: "var(--gcm-emerald)" }}>
            <path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" strokeLinecap="round" strokeLinejoin="round"></path>
          </svg>
          <span>Configuración modificable en cualquier momento desde el examen</span>
        </div>
      </div>

      {error ? <p className="gcm-profile-error">{error}</p> : null}
    </form>
  );
}
