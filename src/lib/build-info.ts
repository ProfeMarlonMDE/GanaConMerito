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

export function getBuildCommitHash() {
  return process.env.NEXT_PUBLIC_APP_COMMIT?.trim() || safeReadGitCommit() || "unknown";
}
