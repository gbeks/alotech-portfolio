import Link from "next/link";
import { ContactButton, Cursor, Request, Selection, Ticket } from "./brand/Canvas";

/**
 * Hero as a product canvas. Behind the headline: AloTech's own work in progress
 * (a new brief, discovery and design tickets), set at three depths. In front: product, design
 * and engineering converging on one deliberate choice, "purpose.", held in the brand's
 * selection box. One orchestrated load sequence, then everything is still.
 */
export default function Hero({
  title,
  subtitle,
  cta,
}: {
  title: string;
  subtitle: string;
  cta: { label: string; href: string };
}) {
  const i = title.trimEnd().lastIndexOf(" ");
  const lead = title.slice(0, i + 1);
  const last = title.slice(i + 1);

  return (
    <section className="hero relative isolate flex min-h-[calc(100svh-4rem)] overflow-hidden">
      {/* Canvas dot grid, fading out from the headline. */}
      <div aria-hidden="true" className="hero-grid absolute inset-0 -z-10" />

      <div className="relative mx-auto flex w-full max-w-[1200px] flex-col justify-center px-6 py-16 md:px-10 md:py-20">
        {/* Backlog noise, desktop only. Far → near: smaller, fainter, softer. */}
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 hidden lg:block">
          <Ticket id="AL-139" kind="DESIGN" title={<>One job<br />per screen</>} ghost className="hero-far right-[24%] top-[7%] scale-[0.82] opacity-45 blur-[1.5px]" />
          <Ticket id="AL-142" kind="DISCOVERY" title={<>Talk to<br />users first</>} ghost className="hero-mid right-[1%] top-[24%] opacity-90" />
          <Request from="NEW BRIEF" text="Take our idea all the way to the App Store." className="hero-near right-[13%] top-[60%]" />
        </div>

        <h1 className="relative max-w-[17ch] text-[34px] font-bold leading-[1.08] tracking-[-0.03em] sm:text-[48px] md:text-[62px]">
          {lead}
          <Selection>
            {last}
            {/* Cursors are anchored to the selection so they track the word at every width. */}
            <Cursor label="Product" tone="accent" className="hero-cursor-1 left-[calc(100%-6px)] top-[calc(100%-6px)]" />
            <Cursor label="Design" tone="ink" className="hero-cursor-2 left-[calc(100%-4px)] -top-[8px] hidden md:flex" />
            <Cursor label="Engineering" tone="paper" className="hero-cursor-3 -left-[8px] top-[calc(100%-6px)] hidden md:flex" />
          </Selection>
        </h1>

        <p className="relative mt-14 max-w-[34rem] text-lg text-muted md:mt-24 md:text-xl">{subtitle}</p>
        <div className="relative mt-10 flex flex-wrap items-center gap-x-8 gap-y-4">
          <ContactButton />
          <Link href={cta.href} className="text-[17px] font-medium text-ink hover:text-accent-text">
            {cta.label} →
          </Link>
        </div>
      </div>
    </section>
  );
}
