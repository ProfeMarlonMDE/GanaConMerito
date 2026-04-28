import { execSync } from "node:child_process";
import { writeFileSync } from "node:fs";
import { join } from "node:path";

function safeExec(command) {
  try {
    return execSync(command, {
      encoding: "utf8",
      stdio: ["ignore", "pipe", "ignore"],
    }).trim();
  } catch {
    return null;
  }
}

const commit = process.env.NEXT_PUBLIC_APP_COMMIT?.trim() || safeExec("git rev-parse --short HEAD") || "unknown";
const buildTime = process.env.NEXT_PUBLIC_APP_BUILD_TIME?.trim() || new Date().toISOString();

const payload = {
  commit,
  buildTime,
};

writeFileSync(join(process.cwd(), ".build-meta.json"), `${JSON.stringify(payload, null, 2)}\n`);
console.log(`build metadata prepared: commit=${commit} buildTime=${buildTime}`);
