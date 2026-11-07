// Copies screens from your export folders into /public/work/<slug>/, renamed to the
// kebab-case names the MDX case studies use. Only screens a case study references are
// copied, so stray files (like the leftover Clearfine screens in "Credited screens/") are skipped.
// Images wider than 2400px are resized and compressed.
//
// Usage (Windows paths need quotes):
//   npm run import-screens -- "C:\Users\LENOVO\Downloads\portfolio screens"
//       folder that contains "clearfine screens", "Credited screens", "aligned screens", "CarePath screens"
//   npm run import-screens -- clearfine "C:\Users\LENOVO\Downloads\clearfine screens"
//       one project at a time
import fs from "node:fs";
import path from "node:path";
import { kebab, referencedScreens, slugs, walk, root } from "./screens-lib.mjs";

let sharp = null;
try {
  sharp = (await import("sharp")).default;
} catch {
  /* plain copy if sharp isn't installed */
}

const args = process.argv.slice(2);
const jobs = [];

if (args.length === 2) {
  jobs.push({ slug: args[0].toLowerCase(), dir: args[1] });
} else if (args.length === 1) {
  const parent = args[0];
  const folders = fs.readdirSync(parent, { withFileTypes: true }).filter((d) => d.isDirectory());
  for (const slug of slugs()) {
    const match = folders.find((d) => d.name.toLowerCase().replace(/\s*screens?\s*$/, "").trim() === slug);
    if (match) jobs.push({ slug, dir: path.join(parent, match.name) });
    else console.log(`(no "${slug} screens" folder found in ${parent})`);
  }
} else {
  console.log('Usage: npm run import-screens -- "<folder with all screen folders>"\n   or: npm run import-screens -- <slug> "<screens folder>"');
  process.exit(1);
}

for (const { slug, dir } of jobs) {
  if (!fs.existsSync(dir)) {
    console.log(`\n${slug}: folder not found: ${dir}`);
    continue;
  }
  const { names, pending } = referencedScreens(slug);
  const wanted = new Set(names);
  const outDir = path.join(root, "public", "work", slug);
  fs.mkdirSync(outDir, { recursive: true });

  const found = new Set();
  for (const rel of walk(dir)) {
    const name = kebab(rel);
    if (!wanted.has(name) || found.has(name)) continue;
    found.add(name);
    const from = path.join(dir, rel);
    const to = path.join(outDir, name);
    if (sharp && /\.png$/i.test(name)) {
      await sharp(from).resize({ width: 2400, withoutEnlargement: true }).png({ compressionLevel: 9, palette: false }).toFile(to);
    } else {
      fs.copyFileSync(from, to);
    }
  }

  const missing = names.filter((n) => !found.has(n) && !fs.existsSync(path.join(outDir, n)));
  console.log(`\n${slug}: imported ${found.size} of ${names.length}`);
  for (const n of missing) console.log(`  ✗ ${n}${pending.has(n) ? "   (pending, pull from Figma)" : ""}`);
}
