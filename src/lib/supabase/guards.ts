import { redirect } from "next/navigation";
import { getSupabaseServerClient } from "./server";

export async function requireAuthenticatedUser(redirectTo = "/login") {
  const supabase = await getSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect(redirectTo);
  }

  return { supabase, user };
}

export async function requireAuthenticatedProfile() {
  const supabase = await getSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { ok: false as const, error: "Unauthorized" as const, status: 401 };
  }

  const { data: profile, error: profileError } = await supabase
    .from("profiles")
    .select("id, auth_user_id")
    .eq("auth_user_id", user.id)
    .single();

  if (profileError || !profile) {
    return { ok: false as const, error: "Profile not found" as const, status: 404 };
  }

  return { ok: true as const, supabase, user, profile };
}

export async function requireOwnedSession(params: { sessionId: string }) {
  const auth = await requireAuthenticatedProfile();

  if (!auth.ok) {
    return auth;
  }

  const { supabase, profile } = auth;
  const { data: session, error: sessionError } = await supabase
    .from("sessions")
    .select("id, profile_id, current_state, status, ended_at")
    .eq("id", params.sessionId)
    .eq("profile_id", profile.id)
    .single();

  if (sessionError || !session) {
    return { ok: false as const, error: "Session not found" as const, status: 404 };
  }

  return { ok: true as const, supabase, user: auth.user, profile, session };
}
