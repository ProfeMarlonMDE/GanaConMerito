import Link from "next/link";
import type { EditorialDocDefinition } from "@/lib/editorial/docs";

function groupDocsByCategory(docs: EditorialDocDefinition[]) {
  return docs.reduce<Record<string, EditorialDocDefinition[]>>((acc, doc) => {
    acc[doc.category] ??= [];
    acc[doc.category].push(doc);
    return acc;
  }, {});
}

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

export function EditorialNav(props: { docs: EditorialDocDefinition[]; currentSlug?: string }) {
  const grouped = groupDocsByCategory(props.docs);

  return (
    <nav style={{ position: "sticky", top: 16, alignSelf: "start" }}>
      <h2 style={{ marginTop: 0 }}>Documentos</h2>
      {Object.entries(grouped).map(([category, docs]) => (
        <section key={category} style={{ marginBottom: 20 }}>
          <h3 style={{ marginBottom: 8, fontSize: 14, opacity: 0.8 }}>{getCategoryLabel(category)}</h3>
          <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "grid", gap: 8 }}>
            {docs.map((doc) => {
              const isActive = props.currentSlug === doc.slug;
              return (
                <li key={doc.slug}>
                  <Link
                    href={`/editorial/${doc.slug}`}
                    style={{
                      display: "block",
                      padding: "8px 10px",
                      borderRadius: 8,
                      textDecoration: "none",
                      background: isActive ? "rgba(0,0,0,0.08)" : "transparent",
                      fontWeight: isActive ? 600 : 400,
                    }}
                  >
                    {doc.title}
                  </Link>
                </li>
              );
            })}
          </ul>
        </section>
      ))}
    </nav>
  );
}
