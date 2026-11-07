import fs from "node:fs";
import path from "node:path";

export const root = process.cwd();
export const workDir = path.join(root, "content", "work");

/** "aligned screens/date logging/div-7.png" (relative) -> "date-logging-div-7.png" */
export function kebab(relPath) {
  const ext = path.extname(relPath).toLowerCase();
  const stem = relPath.slice(0, -ext.length || undefined);
  return (
    stem
      .toLowerCase()
      .replace(/[\\/]+/g, "-")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "") + ext
  );
}

/** Every screen filename an MDX case study references (body <Screen src> and frontmatter src:). */
export function referencedScreens(slug) {
  const src = fs.readFileSync(path.join(workDir, `${slug}.mdx`), "utf8");
  const names = new Set();
  for (const m of src.matchAll(/src[=:]\s*"?([a-z0-9.\-]+\.(?:png|jpe?g|webp))"?/gi)) names.add(m[1]);
  const pending = new Set();
  for (const m of src.matchAll(/src="([^"]+)"[^>]*pending="([^"]+)"/g)) pending.add(m[1]);
  return { names: [...names], pending };
}

export function slugs() {
  return fs.readdirSync(workDir).filter((f) => f.endsWith(".mdx")).map((f) => f.replace(/\.mdx$/, ""));
}

export function walk(dir, base = dir, out = []) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) walk(p, base, out);
    else if (/\.(png|jpe?g|webp)$/i.test(e.name)) out.push(path.relative(base, p));
  }
  return out;
}
