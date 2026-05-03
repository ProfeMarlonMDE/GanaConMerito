import {
  getSupabaseBrowserClient,
  getSupabaseBrowserClientAsync,
} from "@/lib/supabase/client";

export async function signInWithGoogle(next = "/home") {
  const supabase = await getSupabaseBrowserClientAsync();
  const redirectTo = `${window.location.origin}/api/auth/callback?next=${encodeURIComponent(next)}`;

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo,
    },
  });

  return { data, error };
}

export async function signOut() {
  const supabase = getSupabaseBrowserClient();
  return supabase.auth.signOut();
}
