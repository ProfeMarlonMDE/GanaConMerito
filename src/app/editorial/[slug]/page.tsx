import Link from "next/link";
import { notFound } from "next/navigation";
import { EditorialNav } from "@/components/editorial/editorial-nav";
import { isPreviewableDoc, listEditorialDocs, readEditorialDocBySlug } from "@/lib/editorial/docs";
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
              <strong>Origen:</strong> {doc.source === "inbox" ? "Inbox temporal" : "Docs canónicos"}
              <br />
              <strong>Archivo:</strong> <code>docs/{doc.relativePath}</code>
              <br />
              <Link href={`/editorial/download/${doc.slug}`}>Descargar archivo</Link>
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
            {!doc.available ? (
              <div>
                <p>Este archivo aún no está disponible en este entorno de despliegue.</p>
                <p>
                  La referencia existe en el catálogo, pero el archivo físico no se encuentra todavía en el servidor actual.
                </p>
              </div>
            ) : isPreviewableDoc(doc) && doc.raw ? (
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
            ) : (
              <div>
                <p>Este archivo no tiene previsualización web en esta versión del módulo.</p>
                <p>
                  Usa la descarga directa para inspeccionarlo localmente:
                  {" "}
                  <Link href={`/editorial/download/${doc.slug}`}>descargar archivo</Link>
                </p>
              </div>
            )}
          </article>
        </section>
      </div>
    </main>
  );
}
