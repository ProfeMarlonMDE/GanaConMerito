import type { ReactNode } from "react";
import { Manrope } from "next/font/google";
import { getBuildInfo } from "@/lib/build-info";
import "./globals.css";

const manrope = Manrope({
  subsets: ["latin"],
  display: "swap",
});

export const metadata = {
  title: "GanaConMerito",
  description: "Práctica guiada y evaluación adaptativa para avanzar con foco.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  const { commit, buildTime } = getBuildInfo();

  return (
    <html lang="es">
      <body className={manrope.className}>
        <div className="app-root">{children}</div>
        <footer className="build-footer">
          <strong>Build</strong>: <code>{commit}</code> · <strong>Built at</strong>: <code>{buildTime}</code>
        </footer>
      </body>
    </html>
  );
}
