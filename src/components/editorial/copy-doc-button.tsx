"use client";

import { useState } from "react";

export function CopyDocButton(props: { content: string }) {
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleCopy() {
    try {
      setError(null);
      await navigator.clipboard.writeText(props.content);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setError("No se pudo copiar el archivo.");
    }
  }

  return (
    <div style={{ display: "inline-flex", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
      <button type="button" className="secondary-button" onClick={handleCopy}>
        {copied ? "Copiado" : "Copiar documento"}
      </button>
      {error ? <span className="subtle" style={{ color: "var(--error)" }}>{error}</span> : null}
    </div>
  );
}
