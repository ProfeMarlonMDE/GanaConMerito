import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = (await request.json()) as { rawMarkdown: string };

  return NextResponse.json(
    {
      ok: Boolean(body.rawMarkdown?.trim()),
      itemId: body.rawMarkdown?.trim() ? "draft-item-id" : undefined,
      version: body.rawMarkdown?.trim() ? 1 : undefined,
      errors: body.rawMarkdown?.trim() ? [] : ["rawMarkdown es obligatorio."],
    },
    { status: 200 },
  );
}
