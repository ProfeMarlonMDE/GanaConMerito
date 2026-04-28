import { execSync } from "node:child_process";

function safeReadGitCommit() {
  try {
    return execSync("git rev-parse --short HEAD", {
      encoding: "utf8",
      stdio: ["ignore", "pipe", "ignore"],
    }).trim();
  } catch {
    return null;
  }
}

function safeReadBuildTime() {
  const value = process.env.NEXT_PUBLIC_APP_BUILD_TIME?.trim();

  if (!value) {
    return null;
  }

  const parsed = new Date(value);
  return Number.isNaN(parsed.getTime()) ? null : parsed.toISOString();
}

export function getBuildInfo() {
  const commitHash = process.env.NEXT_PUBLIC_APP_COMMIT?.trim() || safeReadGitCommit() || null;
  const buildTime = safeReadBuildTime();

  return {
    commitHash,
    buildTime,
    isTraceable: Boolean(commitHash),
  };
}
