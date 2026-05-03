import type { ReactNode } from "react";
import { getBuildInfo } from "@/lib/build-info";
import "./globals.css";


export const metadata = {
  title: "GanaConMerito",
  description: "Práctica guiada y evaluación adaptativa para avanzar con foco.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  const { commit, buildTime } = getBuildInfo();

  return (
    <html lang="es">
      <body>
        <div className="app-root">{children}</div>
        <footer className="build-footer">
          <strong>Build</strong>: <code>{commit}</code> · <strong>Built at</strong>: <code>{buildTime}</code>
        </footer>
      </body>
    </html>
  );
}
