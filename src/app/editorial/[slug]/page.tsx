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
      <div style={{ display: "grid", gap: 24, gridTemplateColumns: "280px 1fr" }}>
        <EditorialNav docs={docs} currentSlug={slug} />

        <section>
          <header style={{ marginBottom: 16 }}>
            <h1 style={{ marginBottom: 8 }}>{doc.title}</h1>
            <p style={{ marginTop: 0 }}>{doc.description}</p>
            <p style={{ fontSize: 13, opacity: 0.75 }}>
              <strong>Categoría:</strong> {doc.category}
              <br />
              <strong>Archivo:</strong> <code>docs/{doc.relativePath}</code>
              <br />
              <Link href={`/editorial/download/${doc.slug}`}>Descargar .md</Link>
            </p>
          </header>

          <article
            style={{
              border: "1px solid rgba(0,0,0,0.12)",
              borderRadius: 12,
              padding: 18,
              background: "rgba(255,255,255,0.02)",
            }}
          >
            <pre
              style={{
                whiteSpace: "pre-wrap",
                overflowX: "auto",
                fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace",
                lineHeight: 1.55,
                margin: 0,
              }}
            >
              {doc.raw}
            </pre>
          </article>
        </section>
      </div>
    </main>
  );
}
