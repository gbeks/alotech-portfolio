import Link from "next/link";
import { ContactButton, Cursor, Request, Selection, Ticket } from "./brand/Canvas";

/**
 * Hero as a product canvas. Behind the headline: AloTech's own work in progress
 * (a new brief, discovery and design tickets), set at three depths. In front: product, design
 * and engineering converging on one deliberate choice, "purpose.", held in the brand's
 * selection box. One orchestrated load sequence, then everything is still.
 *
 * Desktop (lg+): the cards float around the headline and all three cursors sit on the selection.
 * Phones and tablets: the same cards sit in their own strips above the headline and below the
 * buttons, so nothing can overlap the text at any screen height. Each cursor gets its own job:
 * Product on "purpose.", Design on the ticket, Engineering on the brief.
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

  const tickets = {
    far: { id: "AL-139", kind: "DESIGN", title: <>One job<br />per screen</> },
    mid: { id: "AL-142", kind: "DISCOVERY", title: <>Talk to<br />users first</> },
  };
  const brief = { from: "NEW BRIEF", text: "Take our idea all the way to the App Store." };

  return (
    <section className="hero relative isolate flex min-h-[calc(100svh-4rem)] overflow-hidden">
      {/* Canvas dot grid, fading out from the headline. */}
      <div aria-hidden="true" className="hero-grid absolute inset-0 -z-10" />

      <div className="relative mx-auto flex w-full max-w-[1200px] flex-col justify-center px-6 py-10 md:px-10 md:py-20">
        {/* Desktop: backlog floats around the headline. Far → near: smaller, fainter, softer. */}
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 hidden lg:block">
          <Ticket {...tickets.far} ghost className="hero-far right-[24%] top-[7%] scale-[0.82] opacity-45 blur-[1.5px]" />
          <Ticket {...tickets.mid} ghost className="hero-mid right-[1%] top-[24%] opacity-90" />
          <Request {...brief} className="hero-near right-[13%] top-[60%]" />
        </div>

        {/* Phones and tablets: tickets in a strip above the headline, with the Design cursor on them. */}
        <div aria-hidden="true" className="pointer-events-none relative -mr-6 mb-8 h-[132px] sm:h-[150px] md:-mr-10 lg:hidden">
          <Ticket {...tickets.far} ghost className="hero-far right-[160px] top-0 origin-top-right scale-[0.62] opacity-45 blur-[1px] sm:right-[230px] sm:scale-[0.7]" />
          <Ticket {...tickets.mid} ghost className="hero-mid -right-3 top-[26px] origin-top-right scale-[0.72] opacity-90 sm:right-6 sm:scale-[0.8]" />
          <Cursor label="Design" tone="ink" className="hero-cursor-2 right-[150px] top-[84px] sm:right-[240px] sm:top-[96px]" />
        </div>

        <h1 className="relative max-w-[17ch] text-[34px] font-bold leading-[1.08] tracking-[-0.03em] sm:text-[48px] md:text-[62px]">
          {lead}
          <Selection>
            {last}
            {/* Anchored to the selection so they track the word at every width. On small screens
                Product points at the left handle, so its tag never runs off the edge. */}
            <Cursor label="Product" tone="accent" className="hero-cursor-1 -left-[8px] top-[calc(100%-6px)] lg:left-[calc(100%-6px)]" />
            <Cursor label="Design" tone="ink" className="hero-cursor-2 left-[calc(100%-4px)] -top-[8px] hidden lg:flex" />
            <Cursor label="Engineering" tone="paper" className="hero-cursor-3 -left-[8px] top-[calc(100%-6px)] hidden lg:flex" />
          </Selection>
        </h1>

        <p className="relative mt-16 max-w-[34rem] text-lg text-muted md:mt-24 md:text-xl">{subtitle}</p>
        <div className="relative mt-10 flex flex-wrap items-center gap-x-8 gap-y-4">
          <ContactButton />
          <Link href={cta.href} className="text-[17px] font-medium text-ink hover:text-accent-text">
            {cta.label} →
          </Link>
        </div>

        {/* Phones and tablets: the brief below the buttons, with the Engineering cursor on it. */}
        <div aria-hidden="true" className="pointer-events-none relative -mr-6 mt-10 h-[150px] sm:h-[170px] md:-mr-10 lg:hidden">
          <Request {...brief} className="hero-near -right-2 top-0 origin-top-right scale-[0.82] sm:right-6 sm:scale-90" />
          <Cursor label="Engineering" tone="paper" className="hero-cursor-3 left-[calc(100%-201px)] top-[104px] sm:left-[calc(100%-253px)] sm:top-[118px]" />
        </div>
      </div>
    </section>
  );
}
