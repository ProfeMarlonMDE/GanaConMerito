"use client";

import { useState } from "react";
import { TutorOutput } from "@/types/tutor-turn";

interface TutorInterfaceProps {
  sessionId: string;
  currentItemId: string;
}

export function TutorInterface({ sessionId, currentItemId }: TutorInterfaceProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [lastResponse, setLastResponse] = useState<TutorOutput | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSendMessage(e: React.FormEvent) {
    e.preventDefault();
    if (!message.trim() || loading) return;

    setLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/tutor/turn", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          sessionId,
          itemId: currentItemId,
          message: message.trim(),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Error al consultar al tutor");
      }

      setLastResponse(data.output);
      setMessage("");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error desconocido");
    } finally {
      setLoading(false);
    }
  }

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="tutor-chip"
        style={{ width: "100%", cursor: "pointer", textAlign: "left" }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <div className="avatar-chip" style={{ width: "32px", height: "32px", fontSize: "14px" }}>T</div>
          <div>
            <p className="eyebrow" style={{ margin: 0 }}>Tutor GCM</p>
            <p className="body-sm" style={{ margin: 0 }}>¿Tienes dudas sobre esta pregunta?</p>
          </div>
        </div>
        <span className="status-pill premium">Preguntar</span>
      </button>
    );
  }

  return (
    <div className="surface-card" style={{ padding: "20px", display: "grid", gap: "16px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <div className="avatar-chip" style={{ width: "32px", height: "32px", fontSize: "14px" }}>T</div>
          <h3 className="section-title" style={{ fontSize: "1rem" }}>Tutor GCM</h3>
        </div>
        <button
          onClick={() => setIsOpen(false)}
          className="subtle"
          style={{ background: "none", border: "none", cursor: "pointer", padding: "4px" }}
        >
          Cerrar
        </button>
      </div>

      {lastResponse ? (
        <div className="feedback-card" style={{ margin: 0, background: "var(--surface-secondary)" }}>
          <p className="body-sm" style={{ whiteSpace: "pre-wrap" }}>{lastResponse.visibleMessage}</p>
          <div style={{ display: "flex", justifyContent: "flex-end", marginTop: "8px" }}>
            <span className="subtle" style={{ fontSize: "10px" }}>
              {lastResponse.degraded ? "Modo limitado" : "Tutoría orientativa"}
            </span>
          </div>
        </div>
      ) : null}

      {error ? (
        <p className="body-sm" style={{ color: "var(--error)", margin: 0 }}>{error}</p>
      ) : null}

      <form onSubmit={handleSendMessage} style={{ display: "grid", gap: "10px" }}>
        <div className="form-field">
          <textarea
            className="text-area"
            style={{ minHeight: "80px", fontSize: "14px" }}
            placeholder="Escribe tu duda aquí..."
            value={message}
            onChange={(event) => setMessage(event.target.value)}
            disabled={loading}
          />
        </div>
        <button
          type="submit"
          className="primary-button"
          style={{ minHeight: "44px" }}
          disabled={loading || !message.trim()}
        >
          {loading ? "Pensando..." : "Consultar Tutor"}
        </button>
      </form>

      <p className="subtle" style={{ fontSize: "11px", textAlign: "center" }}>
        El tutor no tiene autoridad sobre tu puntaje ni avance de sesión.
      </p>
    </div>
  );
}
