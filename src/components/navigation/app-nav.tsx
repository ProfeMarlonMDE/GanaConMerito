"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const items = [
  { href: "/home", label: "Inicio", icon: "H" },
  { href: "/practice", label: "Práctica", icon: "P" },
  { href: "/editorial", label: "Biblioteca", icon: "B" },
  { href: "/dashboard", label: "Métricas", icon: "M" },
];

export function AppNav() {
  const pathname = usePathname();

  return (
    <nav className="bottom-nav" aria-label="Navegación principal">
      <ul className="bottom-nav-list">
        {items.map((item) => {
          const active = pathname === item.href || pathname.startsWith(`${item.href}/`);

          return (
            <li key={item.href}>
              <Link
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={`bottom-nav-link${active ? " active" : ""}`}
              >
                <span className="nav-icon" aria-hidden="true">
                  {item.icon}
                </span>
                <span>{item.label}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
