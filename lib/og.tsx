import fs from "node:fs";
import path from "node:path";
import { ImageResponse } from "next/og";

export const ogSize = { width: 1200, height: 630 };

/** Cabinet Grotesk if present (woff or otf in /public/fonts), otherwise Geist Bold. */
function headingFont() {
  for (const f of ["CabinetGrotesk-Bold.woff", "CabinetGrotesk-Bold.otf", "CabinetGrotesk-Bold.ttf"]) {
    const p = path.join(process.cwd(), "public", "fonts", f);
    if (fs.existsSync(p)) return { name: "Heading", data: fs.readFileSync(p) };
  }
  return {
    name: "Heading",
    data: fs.readFileSync(path.join(process.cwd(), "app/fonts/Geist-Bold.woff")),
  };
}

/** White background, the AloTech mark, title in the heading font. Pink only on the mark's dot and "labs". */
export function ogImage(title: string, eyebrow?: string) {
  const font = headingFont();
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", background: "#ffffff", padding: 80, fontFamily: "Heading" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <svg width="64" height="62" viewBox="48 44 92 88" fill="none">
            <path d="M54.4211 125.579L94.2105 50.4211L134 125.579" stroke="#0b0b0c" strokeWidth="8.84211" strokeLinecap="round" strokeLinejoin="round" />
            <circle cx="94.2105" cy="105.684" r="9.39" fill="#E91E63" />
          </svg>
          <div style={{ display: "flex", fontSize: 40, color: "#0b0b0c" }}>
            alotech<span style={{ color: "#E91E63", marginLeft: 10 }}>labs</span>
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          {eyebrow && <div style={{ fontSize: 28, color: "#6b6b70" }}>{eyebrow}</div>}
          <div style={{ fontSize: 76, lineHeight: 1.05, letterSpacing: -2, color: "#0b0b0c", maxWidth: 1000 }}>{title}</div>
        </div>
      </div>
    ),
    { ...ogSize, fonts: [{ name: font.name, data: font.data, weight: 700, style: "normal" }] },
  );
}
