"use client";

import { useState } from "react";
import { signInWithGoogle } from "@/lib/supabase/auth";

function getErrorMessage(error: unknown) {
  if (error instanceof Error) return error.message;
  if (typeof error === "string") return error;
  return "No se pudo iniciar sesión. Revisa la configuración de autenticación del entorno.";
}

export function GoogleSignInButton() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSignIn() {
    setLoading(true);
    setError(null);

    try {
      const { error } = await signInWithGoogle("/home");
      if (error) {
        setError(error.message);
      }
    } catch (e) {
      setError(e instanceof Error ? e.message : "Error inesperado al conectar");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <button className="secondary-button google-button" onClick={handleSignIn} disabled={loading}>
        <span className="google-glyph" aria-hidden="true" />
        <span>{loading ? "Conectando..." : "Continuar con Google"}</span>
      </button>
      {error ? <p className="subtle" style={{ color: "var(--error)", marginTop: 10 }}>{error}</p> : null}
    </div>
  );
}
