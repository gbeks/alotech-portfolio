import type { Metadata } from "next";
import localFont from "next/font/local";
import { ThemeProvider } from "next-themes";
import "./globals.css";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { siteUrl } from "@/lib/site";
import fs from "node:fs";
import path from "node:path";

// Cabinet Grotesk loads only once CabinetGrotesk-Variable.woff2 is in /public/fonts (free from fontshare.com).
// Until then headings fall back to Geist bold, with no 404s.
const hasCabinet = fs.existsSync(path.join(process.cwd(), "public/fonts/CabinetGrotesk-Variable.woff2"));

// Geist, self-hosted (variable weight). The file lives in app/fonts, so no extra install is needed.
const geist = localFont({
  src: "./fonts/Geist-Variable.woff2",
  variable: "--font-geist",
  weight: "100 900",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: "AloTech Labs, Product Studio", template: "%s · AloTech Labs" },
  description: "A Lagos-based studio that designs and builds software end to end. See our work.",
  openGraph: { siteName: "AloTech Labs", type: "website" },
  twitter: { card: "summary_large_image" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning className={geist.variable}>
      <head>
        {hasCabinet && (
          <>
            <link rel="preload" href="/fonts/CabinetGrotesk-Variable.woff2" as="font" type="font/woff2" crossOrigin="" />
            <style>{`@font-face{font-family:"Cabinet Grotesk";src:url("/fonts/CabinetGrotesk-Variable.woff2") format("woff2");font-weight:100 900;font-display:swap;}`}</style>
          </>
        )}
      </head>
      <body>
        {/* Defaults to the visitor's system setting, then remembers their choice. No flash on load. */}
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange={false}>
          <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded focus:bg-bg focus:px-3 focus:py-2">
            Skip to content
          </a>
          <Nav />
          <main id="main">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
