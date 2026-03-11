"use client";

import { useMemo, useState } from "react";

interface PracticeItem {
  id: string;
  title: string;
  area: string;
  competency: string;
  stem: string;
  options: { key: "A" | "B" | "C" | "D"; text: string }[];
}

interface SessionStartResult {
  sessionId: string;
  currentState: string;
  currentItemId?: string;
}

interface AdvanceResult {
  currentState: string;
  feedbackText: string;
  hintLevel: number;
  nextItemId?: string;
  evaluation: {
    isCorrect: boolean;
    reasoningScore: number;
    competencyScore: number;
    qualitativeFeedback?: string;
  };
}

export function PracticeSession() {
  const [session, setSession] = useState<SessionStartResult | null>(null);
  const [item, setItem] = useState<PracticeItem | null>(null);
  const [selectedOption, setSelectedOption] = useState<"A" | "B" | "C" | "D" | null>(null);
  const [userRationale, setUserRationale] = useState("");
  const [feedback, setFeedback] = useState<AdvanceResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [sessionMessage, setSessionMessage] = useState<string | null>(null);

  const sessionEnded = useMemo(() => {
    const currentState = feedback?.currentState ?? session?.currentState;
    return currentState === "session_close";
  }, [feedback?.currentState, session?.currentState]);

  async function loadItem(sessionId: string, itemId: string) {
    const response = await fetch(
      `/api/session/item?sessionId=${encodeURIComponent(sessionId)}&itemId=${encodeURIComponent(itemId)}`,
    );
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error ?? "No se pudo cargar el ítem.");
    }

    setItem(data);
    setSelectedOption(null);
    setUserRationale("");
  }

  async function handleStart() {
    setLoading(true);
    setError(null);
    setFeedback(null);
    setSessionMessage(null);
    setItem(null);

    const response = await fetch("/api/session/start", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ mode: "practice" }),
    });

    const data = await response.json();

    if (!response.ok) {
      setError(data.error ?? "No se pudo iniciar la sesión.");
      setLoading(false);
      return;
    }

    setSession(data);

    if (data.currentState === "onboarding") {
      setSessionMessage("Debes completar el onboarding antes de iniciar una práctica real.");
      setLoading(false);
      return;
    }

    if (!data.currentItemId) {
      setSessionMessage("La sesión fue creada, pero no hay un ítem disponible todavía para continuar.");
      setLoading(false);
      return;
    }

    try {
      await loadItem(data.sessionId, data.currentItemId);
    } catch (loadError) {
      setError(loadError instanceof Error ? loadError.message : "No se pudo cargar el ítem inicial.");
    }

    setLoading(false);
  }

  async function handleSubmitAnswer() {
    if (!session || !item || !selectedOption) return;

    setLoading(true);
    setError(null);
    setSessionMessage(null);

    const response = await fetch("/api/session/advance", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        sessionId: session.sessionId,
        itemId: item.id,
        selectedOption,
        userRationale: userRationale.trim() || undefined,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      setError(data.error ?? "No se pudo avanzar la sesión.");
      setLoading(false);
      return;
    }

    setFeedback(data);

    if (data.currentState === "session_close") {
      setItem(null);
      setSessionMessage("La sesión terminó correctamente. Ya puedes revisar tu progreso en el dashboard.");
      setLoading(false);
      return;
    }

    if (data.nextItemId) {
      try {
        await loadItem(session.sessionId, data.nextItemId);
      } catch (loadError) {
        setError(loadError instanceof Error ? loadError.message : "No se pudo cargar el siguiente ítem.");
      }
    } else {
      setItem(null);
      setSessionMessage("No hay un siguiente ítem disponible en este momento.");
    }

    setLoading(false);
  }

  function resetPractice() {
    setSession(null);
    setItem(null);
    setSelectedOption(null);
    setUserRationale("");
    setFeedback(null);
    setError(null);
    setSessionMessage(null);
    setLoading(false);
  }

  return (
    <section>
      {!session ? (
        <button onClick={handleStart} disabled={loading}>
          {loading ? "Iniciando..." : "Iniciar práctica"}
        </button>
      ) : null}

      {error ? <p>{error}</p> : null}
      {sessionMessage ? <p>{sessionMessage}</p> : null}

      {session ? (
        <div>
          <p>Sesión: {session.sessionId}</p>
          <p>Estado actual: {feedback?.currentState ?? session.currentState}</p>
        </div>
      ) : null}

      {item ? (
        <article>
          <h2>{item.title}</h2>
          <p>{item.stem}</p>
          <ul>
            {item.options.map((option) => (
              <li key={option.key}>
                <label>
                  <input
                    type="radio"
                    name="selectedOption"
                    value={option.key}
                    checked={selectedOption === option.key}
                    onChange={() => setSelectedOption(option.key)}
                    disabled={loading}
                  />
                  {option.key}. {option.text}
                </label>
              </li>
            ))}
          </ul>
          <label>
            Justificación / razonamiento
            <textarea
              value={userRationale}
              onChange={(event) => setUserRationale(event.target.value)}
              placeholder="Explica brevemente por qué elegiste esa respuesta"
              rows={5}
              disabled={loading}
            />
          </label>
          <button onClick={handleSubmitAnswer} disabled={loading || !selectedOption}>
            {loading ? "Enviando..." : "Responder"}
          </button>
        </article>
      ) : null}

      {feedback ? (
        <div>
          <p>{feedback.feedbackText}</p>
          <p>Correcta: {feedback.evaluation.isCorrect ? "Sí" : "No"}</p>
          <p>Reasoning score: {feedback.evaluation.reasoningScore}</p>
          <p>Competency score: {feedback.evaluation.competencyScore}</p>
          <p>Hint level: {feedback.hintLevel}</p>
          {feedback.evaluation.qualitativeFeedback ? (
            <p>Nota cualitativa: {feedback.evaluation.qualitativeFeedback}</p>
          ) : null}
        </div>
      ) : null}

      {session && !item ? (
        <button onClick={resetPractice} disabled={loading || !sessionEnded && !sessionMessage}>
          Iniciar una nueva sesión
        </button>
      ) : null}
    </section>
  );
}
