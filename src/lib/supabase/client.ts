import { createBrowserClient } from "@supabase/ssr";

type SupabasePublicConfig = {
  url: string;
  anonKey: string;
};

type SupabaseBrowserClient = ReturnType<typeof createBrowserClient>;

let browserClient: SupabaseBrowserClient | null = null;
let runtimeConfigPromise: Promise<SupabasePublicConfig> | null = null;

function createCachedBrowserClient(config: SupabasePublicConfig) {
  if (!browserClient) {
    browserClient = createBrowserClient(config.url, config.anonKey);
  }

  return browserClient;
}

function getBuildTimePublicConfig(): SupabasePublicConfig | null {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !anonKey) {
    return null;
  }

  return { url, anonKey };
}

async function getRuntimePublicConfig(): Promise<SupabasePublicConfig> {
  if (!runtimeConfigPromise) {
    runtimeConfigPromise = fetch("/api/auth/public-config", {
      cache: "no-store",
    })
      .then(async (response) => {
        if (!response.ok) {
          const payload = await response.json().catch(() => null);
          throw new Error(payload?.error ?? "Missing Supabase public runtime configuration.");
        }

        return response.json();
      })
      .then((payload) => {
        const url = payload?.supabaseUrl;
        const anonKey = payload?.supabaseAnonKey;

        if (!url || !anonKey) {
          throw new Error("Invalid Supabase public runtime configuration.");
        }

        return { url, anonKey };
      });
  }

  return runtimeConfigPromise;
}

export function getSupabaseBrowserClient() {
  const buildTimeConfig = getBuildTimePublicConfig();

  if (!buildTimeConfig) {
    throw new Error("Missing Supabase browser environment variables.");
  }

  return createCachedBrowserClient(buildTimeConfig);
}

export async function getSupabaseBrowserClientAsync() {
  const buildTimeConfig = getBuildTimePublicConfig();

  if (buildTimeConfig) {
    return createCachedBrowserClient(buildTimeConfig);
  }

  const runtimeConfig = await getRuntimePublicConfig();
  return createCachedBrowserClient(runtimeConfig);
}
