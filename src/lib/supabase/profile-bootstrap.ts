import type { User } from "@supabase/supabase-js";
import { getSupabaseAdminClient } from "@/lib/supabase/server";

function inferDisplayName(user: User) {
  return (
    user.user_metadata?.full_name ||
    user.user_metadata?.name ||
    user.email ||
    "Usuario"
  );
}

function inferAvatar(user: User) {
  return user.user_metadata?.avatar_url || user.user_metadata?.picture || null;
}

export async function bootstrapUserProfile(user: User) {
  const admin = getSupabaseAdminClient();

  const { data: profile, error: profileError } = await admin
    .from("profiles")
    .upsert(
      {
        auth_user_id: user.id,
        full_name: inferDisplayName(user),
        email: user.email ?? null,
        avatar_url: inferAvatar(user),
      },
      {
        onConflict: "auth_user_id",
      },
    )
    .select("id")
    .single();

  if (profileError) {
    throw profileError;
  }

  const { error: learningProfileError } = await admin
    .from("learning_profiles")
    .upsert(
      {
        profile_id: profile.id,
        target_role: "docente",
        exam_type: "docente",
        country_context: "colombia",
        preferred_feedback_style: "socratic",
        active_goal: "Completar onboarding inicial",
        active_areas: [],
        onboarding_completed: false,
      },
      {
        onConflict: "profile_id",
      },
    );

  if (learningProfileError) {
    throw learningProfileError;
  }

  return profile;
}
