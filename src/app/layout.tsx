import type { ReactNode } from "react";
import { getBuildInfo } from "@/lib/build-info";

export const metadata = {
  title: "GanaConMerito",
  description: "MVP de práctica y evaluación adaptativa",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  const buildInfo = getBuildInfo();

  return (
    <html lang="es">
      <body>
        {children}
        <footer style={{ padding: "12px 16px", fontSize: "12px", opacity: 0.7 }}>
          <strong>Commit</strong>: {buildInfo.commitHash ?? "not-set"}
          {buildInfo.buildTime ? <> · <strong>Built at</strong>: {buildInfo.buildTime}</> : null}
        </footer>
      </body>
    </html>
  );
}
