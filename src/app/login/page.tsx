import { GoogleSignInButton } from "@/components/auth/google-sign-in-button";
import { getBuildInfo } from "@/lib/build-info";

export default function LoginPage() {
  const buildInfo = getBuildInfo();

  return (
    <main>
      <h1>Acceso</h1>
      <p>Inicia sesión con Google para continuar al MVP.</p>
      <GoogleSignInButton />
      <p style={{ marginTop: "16px", fontSize: "12px", opacity: 0.7 }}>
        Commit desplegado: <code>{buildInfo.commitHash ?? "not-set"}</code>
        {buildInfo.buildTime ? <> · Build time: <code>{buildInfo.buildTime}</code></> : null}
      </p>
    </main>
  );
}
