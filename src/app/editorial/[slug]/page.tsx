import Link from "next/link";
import { notFound } from "next/navigation";
import { CopyDocButton } from "@/components/editorial/copy-doc-button";
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
    <div className="content-stack" style={{ paddingTop: 0 }}>
      <section className="page-header">
        <p className="eyebrow">Biblioteca / Documento</p>
        <h1 className="display-title">{doc.title}</h1>
        <p className="body-lg">{doc.description}</p>
        <div className="page-actions">
          <Link href="/editorial" className="subtle">← Volver a biblioteca</Link>
          <Link href={`/editorial/download/${doc.slug}`} className="subtle">Descargar archivo</Link>
          {doc.raw ? <CopyDocButton content={doc.raw} /> : null}
        </div>
      </section>

      <section className="editorial-layout">
        <EditorialNav docs={docs} currentSlug={slug} />

        <article className="surface-card" style={{ padding: 22 }}>
          <div className="inline-cluster" style={{ marginBottom: 18 }}>
            <span className="pill">Categoría: {doc.category}</span>
            <span className="pill">Origen: {doc.source === "inbox" ? "Inbox temporal" : "Docs canónicos"}</span>
            <span className="pill">Archivo: docs/{doc.relativePath}</span>
          </div>

          {!doc.available ? (
            <div className="empty-state">
              <p className="body-sm" style={{ marginTop: 0 }}>Este archivo aún no está disponible en este entorno.</p>
              <p className="subtle" style={{ marginBottom: 0 }}>
                La referencia existe en el catálogo, pero el archivo físico no se encuentra todavía en el servidor actual.
              </p>
            </div>
          ) : isPreviewableDoc(doc) && doc.raw ? (
            <pre className="doc-preview">{doc.raw}</pre>
          ) : (
            <div className="empty-state">
              <p className="body-sm" style={{ marginTop: 0 }}>Este archivo no tiene previsualización web en esta versión.</p>
              <p className="subtle" style={{ marginBottom: 0 }}>
                Usa la descarga directa para inspeccionarlo localmente.
              </p>
            </div>
          )}
        </article>
      </section>
    </div>
  );
}
