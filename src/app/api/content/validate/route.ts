import { NextResponse } from "next/server";
import { validateOptions } from "@/domain/content/validate-item";

export async function POST(request: Request) {
  const body = (await request.json()) as { rawMarkdown: string };

  const options = [
    { key: "A", text: "Opción A" },
    { key: "B", text: "Opción B" },
    { key: "C", text: "Opción C" },
    { key: "D", text: "Opción D" },
  ];

  const result = validateOptions(options);

  return NextResponse.json(
    {
      ok: result.errors.length === 0,
      errors: result.errors,
      warnings: result.warnings,
      parsed: body.rawMarkdown
        ? {
            id: "draft-item",
            slug: "draft-item",
            title: "Draft item",
            area: "normatividad",
            competency: "interpretacion_normativa",
            difficulty: 0.5,
            correctOption: "A",
            optionCount: options.length,
          }
        : undefined,
    },
    { status: 200 },
  );
}
