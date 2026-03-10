"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signOut } from "@/lib/supabase/auth";

export function SignOutButton() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  async function handleSignOut() {
    setLoading(true);
    setError(null);

    const { error } = await signOut();

    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }

    router.push("/login");
    router.refresh();
  }

  return (
    <div>
      <button onClick={handleSignOut} disabled={loading}>
        {loading ? "Saliendo..." : "Cerrar sesión"}
      </button>
      {error ? <p>{error}</p> : null}
    </div>
  );
}
