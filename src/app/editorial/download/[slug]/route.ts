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

  if (!doc) {
    return new NextResponse("Not found", { status: 404 });
  }

  const filename = path.basename(doc.relativePath);

  return new NextResponse(doc.raw, {
    status: 200,
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
      "Content-Disposition": `attachment; filename="${filename}"`,
    },
  });
}
