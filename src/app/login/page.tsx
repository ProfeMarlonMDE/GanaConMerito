import { GoogleSignInButton } from "@/components/auth/google-sign-in-button";
import { getBuildCommitHash } from "@/lib/build-info";

export default function LoginPage() {
  const commitHash = getBuildCommitHash();

  return (
    <main>
      <h1>Acceso</h1>
      <p>Inicia sesión con Google para continuar al MVP.</p>
      <GoogleSignInButton />
      <p style={{ marginTop: "16px", fontSize: "12px", opacity: 0.7 }}>
        Commit desplegado: <code>{commitHash}</code>
      </p>
    </main>
  );
}
