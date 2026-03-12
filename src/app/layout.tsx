import type { ReactNode } from "react";
import { getBuildCommitHash } from "@/lib/build-info";

export const metadata = {
  title: "GanaConMerito",
  description: "MVP de práctica y evaluación adaptativa",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  const commitHash = getBuildCommitHash();

  return (
    <html lang="es">
      <body>
        {children}
        <footer style={{ padding: "12px 16px", fontSize: "12px", opacity: 0.7 }}>
          <strong>Build</strong>: {commitHash}
        </footer>
      </body>
    </html>
  );
}
