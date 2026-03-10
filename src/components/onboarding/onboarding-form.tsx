"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export function OnboardingForm(props: {
  initialTargetRole: string;
  initialExamType: string;
  initialActiveGoal: string;
  initialPreferredFeedbackStyle: string;
  initialActiveAreas: string[];
}) {
  const router = useRouter();
  const [targetRole, setTargetRole] = useState(props.initialTargetRole || "docente");
  const [examType, setExamType] = useState(props.initialExamType || "docente");
  const [activeGoal, setActiveGoal] = useState(props.initialActiveGoal || "");
  const [preferredFeedbackStyle, setPreferredFeedbackStyle] = useState(
    props.initialPreferredFeedbackStyle || "socratic",
  );
  const [activeAreas, setActiveAreas] = useState((props.initialActiveAreas || []).join(", "));
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError(null);

    const response = await fetch("/api/profile/onboarding", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        targetRole,
        examType,
        activeGoal,
        preferredFeedbackStyle,
        activeAreas: activeAreas
          .split(",")
          .map((value) => value.trim())
          .filter(Boolean),
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      setError(data.error ?? "No se pudo guardar el onboarding.");
      setLoading(false);
      return;
    }

    router.push("/practice");
    router.refresh();
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Rol objetivo
        <input value={targetRole} onChange={(e) => setTargetRole(e.target.value)} />
      </label>
      <label>
        Tipo de prueba
        <input value={examType} onChange={(e) => setExamType(e.target.value)} />
      </label>
      <label>
        Meta activa
        <input value={activeGoal} onChange={(e) => setActiveGoal(e.target.value)} />
      </label>
      <label>
        Estilo de feedback
        <input
          value={preferredFeedbackStyle}
          onChange={(e) => setPreferredFeedbackStyle(e.target.value)}
        />
      </label>
      <label>
        Áreas activas (separadas por coma)
        <input value={activeAreas} onChange={(e) => setActiveAreas(e.target.value)} />
      </label>
      <button type="submit" disabled={loading}>
        {loading ? "Guardando..." : "Guardar onboarding"}
      </button>
      {error ? <p>{error}</p> : null}
    </form>
  );
}
