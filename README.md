# AloTech Labs Portfolio

Company portfolio site, built to `portfolio-site-prd.md` with copy from `website-build-spec.md`.

**Stack:** Next.js 16 (App Router) + TypeScript, Tailwind CSS v4, MDX case studies, `next/image`, `next-themes`. Deploys to Vercel.

## Run it (Windows, VS Code terminal)

```bash
npm install
npm run dev            # http://localhost:3000
```

## 1. Add the screens

Put your four export folders together in one folder, e.g. `C:\Users\LENOVO\Downloads\portfolio screens\`:

```
portfolio screens\
  clearfine screens\
  Credited screens\
  aligned screens\      (keep its subfolders)
  CarePath screens\
```

Then run:

```bash
npm run import-screens -- "C:\Users\LENOVO\Downloads\portfolio screens"
```

The script:
- copies only the screens the case studies use into `public/work/<project>/`. That skips the leftover Clearfine files in `Credited screens/`.
- renames them to clean names: `Add vehicle - Fetched.png` becomes `add-vehicle-fetched.png`, and `aligned screens/date logging/div-7.png` becomes `date-logging-div-7.png`
- resizes anything over 2400px wide
- lists what's still missing

Re-run it any time you update an export. `npm run check-screens` shows what's in place.

Five screens aren't in the export yet and show a "Pending" placeholder until added. Export them from Figma and save them straight into the folder under the name shown:

| Project | File to add in `public/work/…` | What it is |
|---|---|---|
| clearfine | `car-details-mot.png` | Car Details / MOT screen |
| clearfine | `cars-upgrade-modal.png` | Cars screen with the upgrade modal |
| clearfine | `app-store-listing.png` | App Store listing screenshot |
| aligned | `alignment-check.png` | Alignment Check screen |
| aligned | `connections-profile.png` | Clearest person-profile detail screen from `connections/` |

## 2. Add Cabinet Grotesk

Download Cabinet Grotesk (free) from fontshare.com and copy two files from the zip into `public/fonts/`:

- `CabinetGrotesk-Variable.woff2` (site headings)
- `CabinetGrotesk-Bold.woff` (share images)

Until they're there, headings use Geist Bold and nothing breaks. Body text is Geist, bundled in `app/fonts/`.

## 3. Deploy to Vercel

Push to GitHub, import the repo in Vercel, deploy. No settings needed. Once the final domain is set, add the environment variable `NEXT_PUBLIC_SITE_URL` (e.g. `https://work.alotechlabs.com`) so the sitemap and share images use it.

## Where things live

```
content/work/*.mdx     ← case studies: frontmatter (at a glance, links, covers) + copy + screen groups
content/home.ts        ← homepage copy
public/work/<slug>/    ← screens (filled by import-screens)
public/fonts/          ← Cabinet Grotesk
app/globals.css        ← colour tokens (light + dark) and showcase tints
components/            ← layout; no copy in here
```

**Editing copy:** edit the `.mdx` file. Each `## Heading` becomes a numbered section (01, 02, …) automatically.

**Placing screens:** inside an MDX file:

```mdx
<Screens>
  <Screen src="home.png" alt="Clearfine dashboard showing each fine's status" />
  <Screen src="clearfine-cover.png" alt="Clearfine cover" unframed />
</Screens>
```

`unframed` is for brand boards, web screens and App Store composites (no phone frame). Keep groups to 6 or fewer.

**Adding Alo & Peace Realty:** copy any `.mdx` in `content/work/`, rename it `alo-peace.mdx`, update the frontmatter (`order: 5`) and copy. It appears on the homepage and gets its own page automatically.

## Decisions made in the build (check these)

- **Logo:** the outlined triangular "A" + "alotech labs" wordmark from `alotech-logo-variants.svg`. That answers PRD open item 1.
- **Pink:** `#E91E63`, taken from the logo file. It's used as-is for the wordmark, dots and focus rings. On white it's 4.35:1, which fails WCAG AA for small text. So text links use a slightly deeper `#D81B60` (4.95:1) in light mode and `#FF4FA3` in dark mode.
- **"Our role" sections are kept.** The spec's "Page section order" lines leave them out, but its copy includes them (Credited's research detail lives there). Delete them from the MDX if you want the shorter order.
- **Contact** is click-to-copy per the PRD, so the spec's "Send message →" button isn't used.
- **Gbeke's codebase wasn't reused.** This was built fresh, pending your OK on reusing it.

## Still to confirm (from the PRD)

- Cabinet Grotesk for headings (body is Geist)
- At-a-glance values, especially Credited's team credit and CarePath's platform (currently "Mobile")
- App Store URLs for Clearfine and Credited
- Spec open items: launch dates, naming Adeola or the clinical advisor, CarePath roadmap
- Social links for the contact section, if any
