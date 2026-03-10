import type { ReactNode } from "react";

export const metadata = {
  title: "GanaConMerito",
  description: "MVP de práctica y evaluación adaptativa",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
