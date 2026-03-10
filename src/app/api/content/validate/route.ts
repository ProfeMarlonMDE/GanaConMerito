import { NextResponse } from "next/server";
import { parseMarkdownItem } from "../../../../domain/content/parse-md";
import { rawMarkdownSchema } from "../../../../lib/validation/content";

export async function POST(request: Request) {
  const json = await request.json();
  const parsedBody = rawMarkdownSchema.safeParse(json);

  if (!parsedBody.success) {
    return NextResponse.json(
      {
        ok: false,
        errors: parsedBody.error.issues.map((issue) => issue.message),
        warnings: [],
      },
      { status: 400 },
    );
  }

  const result = parseMarkdownItem(parsedBody.data.rawMarkdown);

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
