import { NextResponse } from "next/server";
import { bootstrapUserProfile } from "@/lib/supabase/profile-bootstrap";
import { getSupabaseServerClient } from "@/lib/supabase/server";

function sanitizeNext(rawNext: string | null) {
  if (!rawNext || !rawNext.startsWith("/")) return "/home";
  if (rawNext.startsWith("//")) return "/home";
  return rawNext;
}

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  const next = sanitizeNext(searchParams.get("next"));

  if (!code) {
    return NextResponse.redirect(`${origin}/login?error=missing_code`);
  }

  try {
    const supabase = await getSupabaseServerClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);

    if (error) {
      return NextResponse.redirect(`${origin}/login?error=auth_callback_failed`);
    }

    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) {
      return NextResponse.redirect(`${origin}/login?error=user_not_available`);
    }

    await bootstrapUserProfile(user);

    return NextResponse.redirect(`${origin}${next}`);
  } catch (error) {
    console.error("Auth callback bootstrap error", error);
    return NextResponse.redirect(`${origin}/login?error=profile_bootstrap_failed`);
  }
}
