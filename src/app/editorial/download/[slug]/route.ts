import { readFile } from "node:fs/promises";
import path from "node:path";
import { NextResponse } from "next/server";
import { readEditorialDocBySlug } from "@/lib/editorial/docs";
import { getSupabaseServerClient } from "@/lib/supabase/server";

export async function GET(_: Request, props: { params: Promise<{ slug: string }> }) {
  const supabase = await getSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  const { slug } = await props.params;
  const doc = await readEditorialDocBySlug(slug);

  if (!doc || !doc.available) {
    return new NextResponse("Not found", { status: 404 });
  }

  const filename = path.basename(doc.relativePath);
  const fileBuffer = await readFile(doc.absolutePath);
  const contentType = filename.endsWith('.md') || filename.endsWith('.txt') || filename.endsWith('.nginx') || filename === 'config' || filename.endsWith('.sh')
    ? 'text/plain; charset=utf-8'
    : 'application/octet-stream';

  return new NextResponse(fileBuffer, {
    status: 200,
    headers: {
      "Content-Type": contentType,
      "Content-Disposition": `attachment; filename="${filename}"`,
    },
  });
}
