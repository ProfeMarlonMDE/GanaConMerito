"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export function AppNav() {
  const pathname = usePathname();
  const items = [
    { href: "/home", label: "Inicio" },
    { href: "/onboarding", label: "Onboarding" },
    { href: "/practice", label: "Práctica" },
    { href: "/dashboard", label: "Dashboard" },
  ];

  return (
    <nav aria-label="Navegación principal" style={{ margin: "0 0 16px" }}>
      <ul style={{ display: "flex", gap: "12px", listStyle: "none", padding: 0, margin: 0, flexWrap: "wrap" }}>
        {items.map((item) => {
          const active = pathname === item.href;

          return (
            <li key={item.href}>
              <Link
                href={item.href}
                aria-current={active ? "page" : undefined}
                style={{
                  fontWeight: active ? 700 : 500,
                  textDecoration: active ? "underline" : "none",
                }}
              >
                {item.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
