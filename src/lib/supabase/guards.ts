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
