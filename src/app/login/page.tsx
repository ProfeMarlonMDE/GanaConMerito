import { GoogleSignInButton } from "@/components/auth/google-sign-in-button";

export default function LoginPage() {
  return (
    <main>
      <h1>Acceso</h1>
      <p>Inicia sesión con Google para continuar al MVP.</p>
      <GoogleSignInButton />
    </main>
  );
}
