import { NextResponse } from "next/server";
import { getDashboardSummaryForCurrentUser } from "@/lib/dashboard/summary";

export async function GET() {
  const response = await getDashboardSummaryForCurrentUser();
  return NextResponse.json(response, { status: 200 });
}
