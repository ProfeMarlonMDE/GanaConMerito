import Link from "next/link";
import { notFound } from "next/navigation";
import { EditorialNav } from "@/components/editorial/editorial-nav";
import { listEditorialDocs, readEditorialDocBySlug } from "@/lib/editorial/docs";
import { requireAuthenticatedUser } from "@/lib/supabase/guards";

export default async function EditorialDocPage(props: { params: Promise<{ slug: string }> }) {
  await requireAuthenticatedUser();
  const { slug } = await props.params;
  const docs = listEditorialDocs();
  const doc = await readEditorialDocBySlug(slug);

  if (!doc) {
    notFound();
  }

  return (
    <main>
      <p><Link href="/editorial">← Volver a biblioteca editorial</Link></p>
      <h1>{doc.title}</h1>
      <p>{doc.description}</p>
      <p>
        <strong>Categoría:</strong> {doc.category}
        <br />
        <strong>Archivo:</strong> <code>docs/{doc.relativePath}</code>
        <br />
        <Link href={`/editorial/download/${doc.slug}`}>Descargar .md</Link>
      </p>
      <hr />
      <div style={{ display: "grid", gap: 24, gridTemplateColumns: "280px 1fr" }}>
        <EditorialNav docs={docs} />
        <article>
          <pre style={{ whiteSpace: "pre-wrap", overflowX: "auto" }}>{doc.raw}</pre>
        </article>
      </div>
    </main>
  );
}
