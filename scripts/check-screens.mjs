// Lists which screens each case study references and whether they're in /public/work/<slug>/ yet.
// Usage: npm run check-screens
import fs from "node:fs";
import path from "node:path";
import { referencedScreens, slugs, root } from "./screens-lib.mjs";

let missing = 0;
for (const slug of slugs()) {
  const { names, pending } = referencedScreens(slug);
  console.log(`\n${slug}  →  public/work/${slug}/`);
  for (const n of names) {
    const ok = fs.existsSync(path.join(root, "public", "work", slug, n));
    if (!ok) missing++;
    console.log(`  ${ok ? "✓" : "✗"} ${n}${!ok && pending.has(n) ? "   (pending, pull from Figma)" : ""}`);
  }
}
console.log(missing ? `\n${missing} screen(s) still missing.` : "\nAll screens in place.");
