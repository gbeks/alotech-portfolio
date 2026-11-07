import fs from "node:fs";
import path from "node:path";
import { imageSize } from "image-size";

export type ResolvedScreen = {
  url: string;
  file: string;
  exists: boolean;
  width: number;
  height: number;
};

/** Phone-screen proportions used for placeholders until the real file is added. */
const PLACEHOLDER = { width: 1179, height: 2556 };

/** Screens live in /public/work/<slug>/<file>. Size is read at build time for next/image. */
export function resolveScreen(slug: string, file: string): ResolvedScreen {
  const rel = `/work/${slug}/${file}`;
  const abs = path.join(process.cwd(), "public", "work", slug, file);
  if (!fs.existsSync(abs)) return { url: rel, file, exists: false, ...PLACEHOLDER };
  try {
    const { width, height } = imageSize(fs.readFileSync(abs));
    return { url: rel, file, exists: true, width: width ?? PLACEHOLDER.width, height: height ?? PLACEHOLDER.height };
  } catch {
    return { url: rel, file, exists: false, ...PLACEHOLDER };
  }
}
