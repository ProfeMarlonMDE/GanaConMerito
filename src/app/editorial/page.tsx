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
    default:
      return category;
  }
}

export default async function EditorialIndexPage() {
  await requireAuthenticatedUser();
  const docs = listEditorialDocs();

  return (
    <main>
      <h1>Biblioteca editorial</h1>
      <p style={{ maxWidth: 760 }}>
        Acceso web temporal y de solo lectura a documentos Markdown seleccionados del proyecto.
        Úsalo para consultar estructura editorial, decisiones de arquitectura y referencias de trabajo.
      </p>

      <div style={{ display: "grid", gap: 24, gridTemplateColumns: "280px 1fr" }}>
        <EditorialNav docs={docs} />

        <section>
          <h2 style={{ marginTop: 0 }}>Índice</h2>
          <div style={{ display: "grid", gap: 16 }}>
            {docs.map((doc) => (
              <article
                key={doc.slug}
                style={{ border: "1px solid rgba(0,0,0,0.12)", borderRadius: 12, padding: 16 }}
              >
                <p style={{ margin: 0, fontSize: 12, opacity: 0.7 }}>{getCategoryLabel(doc.category)}</p>
                <h3 style={{ marginTop: 6, marginBottom: 8 }}>{doc.title}</h3>
                <p style={{ marginTop: 0 }}>{doc.description}</p>
                <p style={{ marginBottom: 0 }}>
                  <Link href={`/editorial/${doc.slug}`}>Ver documento</Link>
                  {" · "}
                  <Link href={`/editorial/download/${doc.slug}`}>Descargar .md</Link>
                </p>
              </article>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
