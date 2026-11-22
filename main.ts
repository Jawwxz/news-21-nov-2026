// news-21-nov-2026: copies the 21 November 2026 news image to the output directory.
// The image is a newspaper-style infographic of the day's six stories; this script
// only copies it, byte for byte, so the output is identical on every run.
// Deterministic: the same image bytes on every run. No network, no randomness.
import { copyFileSync, mkdirSync, statSync } from "node:fs";
import { join } from "node:path";

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
const src = new URL("./entry.png", import.meta.url);
const dest = join(outDir, "entry.png");
mkdirSync(outDir, { recursive: true });
copyFileSync(src, dest);
const srcSize = statSync(src).size;
const destSize = statSync(dest).size;
if (srcSize !== destSize) {
  throw new Error(`entry.png size mismatch: expected ${srcSize} bytes, wrote ${destSize}`);
}
console.log(`wrote entry.png (${destSize} bytes)`);
