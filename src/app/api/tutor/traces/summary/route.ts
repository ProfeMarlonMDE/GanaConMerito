import { NextResponse } from "next/server";
import { requireAuthenticatedProfile } from "@/lib/supabase/guards";
import { buildTutorTraceSummary } from "@/lib/tutor/tutor-trace-summary";

export async function GET() {
  const auth = await requireAuthenticatedProfile();

  if (!auth.ok) {
    return NextResponse.json({ error: auth.error }, { status: auth.status });
  }

  const { supabase, profile } = auth;
  const { data, error } = await supabase
    .from("tutor_turn_traces")
    .select("created_at, mode, intent, degraded, can_reveal_correct_answer, guardrails_applied")
    .eq("profile_id", profile.id)
    .order("created_at", { ascending: false })
    .limit(500);

  if (error) {
    console.error("[Tutor Trace Summary Error]:", error);
    return NextResponse.json({ error: "No fue posible obtener el resumen de trazas" }, { status: 500 });
  }

  return NextResponse.json(buildTutorTraceSummary(data ?? []), { status: 200 });
}
