"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";

interface ProfessionalProfileOption {
  id: string;
  code: string;
  name: string;
}

export function OnboardingForm(props: {
  initialTargetRole: string;
  initialExamType: string;
  initialProfessionalProfileId: string;
  professionalProfiles: ProfessionalProfileOption[];
  initialActiveGoal: string;
  initialPreferredFeedbackStyle: string;
  initialActiveAreas: string[];
}) {
  const router = useRouter();
  const [targetRole] = useState(props.initialTargetRole || "docente");
  const [examType] = useState(props.initialExamType || "docente");
  const [professionalProfileId, setProfessionalProfileId] = useState(
    props.initialProfessionalProfileId || props.professionalProfiles[0]?.id || "",
  );
  const [activeGoal, setActiveGoal] = useState(props.initialActiveGoal || "");
  const [preferredFeedbackStyle] = useState(props.initialPreferredFeedbackStyle || "socratic");
  const [activeAreas, setActiveAreas] = useState((props.initialActiveAreas || []).join(", "));
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
  const hasActiveAreas = parsedActiveAreas.length > 0;

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!hasActiveAreas) {
      setError("Debes indicar al menos un área activa.");
      return;
    }

    setLoading(true);
    setError(null);

    const response = await fetch("/api/profile/onboarding", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        targetRole,
        examType,
        professionalProfileId,
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

    router.push("/practice");
    router.refresh();
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Rol objetivo
        <input value={targetRole} disabled readOnly />
      </label>
      <label>
        Tipo de prueba
        <input value={examType} disabled readOnly />
      </label>
      <label>
        Perfil profesional
        <select
          value={professionalProfileId}
          onChange={(event) => setProfessionalProfileId(event.target.value)}
          disabled={loading || props.professionalProfiles.length === 0}
        >
          {props.professionalProfiles.length === 0 ? (
            <option value="">No hay perfiles disponibles</option>
          ) : null}
          {props.professionalProfiles.map((profile) => (
            <option key={profile.id} value={profile.id}>
              {profile.name}
            </option>
          ))}
        </select>
      </label>
      <label>
        Meta activa
        <input value={activeGoal} onChange={(e) => setActiveGoal(e.target.value)} required />
      </label>
      <label>
        Estilo de feedback
        <input value={preferredFeedbackStyle} disabled readOnly />
      </label>
      <label>
        Áreas activas (separadas por coma)
        <input
          value={activeAreas}
          onChange={(e) => setActiveAreas(e.target.value)}
          aria-invalid={!hasActiveAreas}
          placeholder="Ej.: matemáticas, lectura crítica"
        />
      </label>
      <button type="submit" disabled={loading || !professionalProfileId || !activeGoalValue || !hasActiveAreas}>
        {loading ? "Guardando..." : "Guardar onboarding"}
      </button>
      {error ? <p>{error}</p> : null}
    </form>
  );
}
