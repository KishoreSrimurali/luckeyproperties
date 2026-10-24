import "server-only";
import fs from "node:fs";
import path from "node:path";

/**
 * Verified company and project media live in /public/media. Components ask for
 * a path and receive it only if the file actually exists, so the site never
 * shows a broken image or a stand-in photo that misrepresents a development.
 * Drop a correctly named file in and it appears on the next build.
 */
const publicDir = path.join(process.cwd(), "public");
const exts = [".avif", ".webp", ".jpg", ".jpeg", ".png", ".svg"];

export function media(base: string): string | null {
  for (const ext of exts) {
    const rel = `/media/${base}${ext}`;
    if (fs.existsSync(path.join(publicDir, rel))) return rel;
  }
  return null;
}

export function mediaSet(baseDir: string, count: number): string[] {
  const out: string[] = [];
  for (let i = 1; i <= count; i++) {
    const found = media(`${baseDir}/${String(i).padStart(2, "0")}`);
    if (found) out.push(found);
  }
  return out;
}

export function mediaFile(rel: string): string | null {
  return fs.existsSync(path.join(publicDir, rel)) ? rel : null;
}
