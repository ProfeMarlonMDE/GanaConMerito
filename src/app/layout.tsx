import type { ReactNode } from "react";
import { getBuildInfo } from "@/lib/build-info";

export const metadata = {
  title: "GanaConMerito",
  description: "MVP de práctica y evaluación adaptativa",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  const { commit, buildTime } = getBuildInfo();

  return (
    <html lang="es">
      <body>
        {children}
        <footer style={{ padding: "12px 16px", fontSize: "12px", opacity: 0.7 }}>
          <strong>Build</strong>: <code>{commit}</code> · <strong>Built at</strong>: <code>{buildTime}</code>
        </footer>
      </body>
    </html>
  );
}
