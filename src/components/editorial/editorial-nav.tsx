import Link from "next/link";
import type { EditorialDocDefinition } from "@/lib/editorial/docs";

export function EditorialNav(props: { docs: EditorialDocDefinition[] }) {
  return (
    <nav>
      <h2>Documentos</h2>
      <ul>
        {props.docs.map((doc) => (
          <li key={doc.slug}>
            <Link href={`/editorial/${doc.slug}`}>{doc.title}</Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
