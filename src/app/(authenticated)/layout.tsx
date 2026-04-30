import type { ReactNode } from "react";
import { AppNav } from "@/components/navigation/app-nav";
import { SignOutButton } from "@/components/auth/sign-out-button";

export default function AuthenticatedLayout({ children }: { children: ReactNode }) {
  return (
    <main style={{ maxWidth: "960px", margin: "0 auto", padding: "24px 16px 48px" }}>
      <header style={{ marginBottom: "24px" }}>
        <AppNav />
        <div style={{ marginTop: "12px" }}>
          <SignOutButton />
        </div>
      </header>
      {children}
    </main>
  );
}
