import { NextResponse } from "next/server";
import { parseMarkdownItem } from "@/domain/content/parse-md";

export async function POST(request: Request) {
  const body = (await request.json()) as { rawMarkdown: string };
  const result = parseMarkdownItem(body.rawMarkdown);

  return NextResponse.json(
    {
      ok: result.ok,
      errors: result.errors,
      warnings: result.warnings,
      parsed: result.parsed,
    },
    { status: result.ok ? 200 : 400 },
  );
}
