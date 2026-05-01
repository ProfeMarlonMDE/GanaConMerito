"use client";

import { useState } from "react";
import { signInWithGoogle } from "@/lib/supabase/auth";

export function GoogleSignInButton() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSignIn() {
    setLoading(true);
    setError(null);

    const { error } = await signInWithGoogle("/");

    if (error) {
      setError(error.message);
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
