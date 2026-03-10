"use client";

import { useState } from "react";
import { signInWithGoogle } from "@/lib/supabase/auth";

export function GoogleSignInButton() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSignIn() {
    setLoading(true);
    setError(null);

    const { error } = await signInWithGoogle("/home");

    if (error) {
      setError(error.message);
      setLoading(false);
    }
  }

  return (
    <div>
      <button onClick={handleSignIn} disabled={loading}>
        {loading ? "Conectando..." : "Continuar con Google"}
      </button>
      {error ? <p>{error}</p> : null}
    </div>
  );
}
