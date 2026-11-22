import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const botDir = process.env.MAKEFUN_BOT_DIR ?? ".";
const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "out";

const raw = readFileSync(join(botDir, "VIDEO.json"), "utf8");
const entry = JSON.parse(raw) as { url?: unknown };
if (typeof entry.url !== "string" || !entry.url.startsWith("https://www.tiktok.com/")) {
  throw new Error("VIDEO.json must hold a TikTok video URL");
}
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "VIDEO.json"), raw);
console.log(`Wrote VIDEO.json for ${entry.url}`);
