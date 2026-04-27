import { NextResponse } from "next/server";
import { getDashboardSummaryForCurrentUser } from "../../../../lib/dashboard/summary";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const sessionId = searchParams.get("sessionId") ?? undefined;

  const response = await getDashboardSummaryForCurrentUser(sessionId);
  return NextResponse.json(response, { status: 200 });
}
