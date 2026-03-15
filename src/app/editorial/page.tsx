import Link from "next/link";
import { EditorialNav } from "@/components/editorial/editorial-nav";
import { listEditorialDocs } from "@/lib/editorial/docs";
import { requireAuthenticatedUser } from "@/lib/supabase/guards";

export default async function EditorialIndexPage() {
  await requireAuthenticatedUser();
  const docs = listEditorialDocs();

  return (
    <main>
      <h1>Biblioteca editorial</h1>
      <p>Acceso web temporal y de solo lectura a documentos Markdown del proyecto.</p>
      <EditorialNav docs={docs} />
      <section>
        <h2>Índice</h2>
        <ul>
          {docs.map((doc) => (
            <li key={doc.slug}>
              <strong>{doc.title}</strong>
              <p>{doc.description}</p>
              <p>
                <Link href={`/editorial/${doc.slug}`}>Ver</Link>
                {" · "}
                <Link href={`/editorial/download/${doc.slug}`}>Descargar</Link>
              </p>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
