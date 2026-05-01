import Link from "next/link";
import { EditorialNav } from "@/components/editorial/editorial-nav";
import { listEditorialDocs } from "@/lib/editorial/docs";
import { requireAuthenticatedUser } from "@/lib/supabase/guards";

function getCategoryLabel(category: string) {
  switch (category) {
    case "project":
      return "Proyecto";
    case "architecture":
      return "Arquitectura";
    case "database":
      return "Base de datos";
    case "api":
      return "API";
    case "content":
      return "Contenido";
    case "misc":
      return "Miscelánea";
    default:
      return category;
  }
}

function getSourceLabel(source: string) {
  return source === "inbox" ? "Inbox temporal" : "Docs canónicos";
}

export default async function EditorialIndexPage() {
  await requireAuthenticatedUser();
  const docs = listEditorialDocs();
  const [featured, ...rest] = docs;

  return (
    <div className="content-stack" style={{ paddingTop: 0 }}>
      <section className="page-header">
        <p className="eyebrow">Biblioteca</p>
        <h1 className="display-title">Colección documental sobria, curada y legible.</h1>
        <p className="body-lg">
          Superficie de solo lectura para consultar documentación canónica del producto sin mezclar legado operativo ni CMS editorial.
        </p>
        <div className="page-actions">
          <Link href="/home" className="subtle">← Volver a inicio</Link>
        </div>
      </section>

      <section className="editorial-layout">
        <EditorialNav docs={docs} />

        <div className="editorial-grid">
          {featured ? (
            <Link href={`/editorial/${featured.slug}`} className="editorial-card featured">
              <div className="editorial-feature-cover" />
              <div className="editorial-feature-body">
                <div className="inline-cluster">
                  <span className="status-pill premium">Esencial</span>
                  <span className="subtle">{getCategoryLabel(featured.category)}</span>
                </div>
                <h2 className="section-title">{featured.title}</h2>
                <p className="body-sm">{featured.description}</p>
                <span className="subtle">Abrir documento →</span>
              </div>
            </Link>
          ) : null}

          {rest.map((doc) => (
            <article key={doc.slug} className="editorial-card">
              <div className="inline-cluster" style={{ justifyContent: "space-between" }}>
                <span className="metric-label">{getCategoryLabel(doc.category)}</span>
                <span className="subtle">{getSourceLabel(doc.source)}</span>
              </div>
              <div>
                <h3 style={{ margin: "0 0 8px", fontSize: "1.1rem" }}>{doc.title}</h3>
                <p className="body-sm" style={{ margin: 0 }}>{doc.description}</p>
              </div>
              <div className="page-actions" style={{ marginTop: "auto" }}>
                <Link href={`/editorial/${doc.slug}`} className="subtle">Ver documento</Link>
                <Link href={`/editorial/download/${doc.slug}`} className="subtle">Descargar</Link>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
