import Link from "next/link";

export function AppNav() {
  return (
    <nav aria-label="Navegación principal" style={{ margin: "0 0 16px" }}>
      <ul style={{ display: "flex", gap: "12px", listStyle: "none", padding: 0, margin: 0, flexWrap: "wrap" }}>
        <li><Link href="/home">Inicio</Link></li>
        <li><Link href="/onboarding">Onboarding</Link></li>
        <li><Link href="/practice">Práctica</Link></li>
        <li><Link href="/dashboard">Dashboard</Link></li>
      </ul>
    </nav>
  );
}
