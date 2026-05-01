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
    case "content":
      return "Contenido";
    default:
      return category;
  }
}

export function EditorialNav(props: { docs: EditorialDocDefinition[]; currentSlug?: string }) {
  const grouped = groupDocsByCategory(props.docs);

  return (
    <aside className="doc-nav">
      <div className="surface-card" style={{ padding: 18 }}>
        <p className="eyebrow">Mapa documental</p>
        <h2 className="section-title" style={{ fontSize: "1.15rem" }}>Colección canónica</h2>
        <p className="subtle">Solo lectura, organizada por categoría y lista para consulta rápida.</p>
      </div>

      {Object.entries(grouped).map(([category, docs]) => (
        <section key={category} className="surface-card" style={{ padding: 18 }}>
          <p className="metric-label" style={{ margin: 0 }}>{getCategoryLabel(category)}</p>
          <ul style={{ listStyle: "none", padding: 0, margin: "14px 0 0", display: "grid", gap: 8 }}>
            {docs.map((doc) => {
              const isActive = props.currentSlug === doc.slug;
              return (
                <li key={doc.slug}>
                  <Link
                    href={`/editorial/${doc.slug}`}
                    style={{
                      display: "block",
                      padding: "10px 12px",
                      borderRadius: 14,
                      textDecoration: "none",
                      background: isActive ? "var(--accent-premium-soft)" : "var(--surface-secondary)",
                      color: isActive ? "var(--accent-premium)" : "var(--text-secondary)",
                      fontWeight: isActive ? 700 : 600,
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
    </aside>
  );
}
