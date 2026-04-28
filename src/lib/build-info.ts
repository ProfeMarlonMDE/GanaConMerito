import { execSync } from "node:child_process";
import { readFileSync } from "node:fs";
import { join } from "node:path";

type BuildInfo = {
  commit: string;
  buildTime: string;
};

function safeExec(command: string) {
  try {
    return execSync(command, {
      encoding: "utf8",
      stdio: ["ignore", "pipe", "ignore"],
    }).trim();
  } catch {
    return null;
  }
}

function safeReadGeneratedBuildInfo(): Partial<BuildInfo> | null {
  try {
    const raw = readFileSync(join(process.cwd(), ".build-meta.json"), "utf8");
    return JSON.parse(raw) as Partial<BuildInfo>;
  } catch {
    return null;
  }
}

export function getBuildInfo(): BuildInfo {
  const generated = safeReadGeneratedBuildInfo();

  return {
    commit:
      process.env.NEXT_PUBLIC_APP_COMMIT?.trim() ||
      generated?.commit?.trim() ||
      safeExec("git rev-parse --short HEAD") ||
      "unknown",
    buildTime:
      process.env.NEXT_PUBLIC_APP_BUILD_TIME?.trim() ||
      generated?.buildTime?.trim() ||
      "unknown",
  };
}

export function getBuildCommitHash() {
  return getBuildInfo().commit;
}
