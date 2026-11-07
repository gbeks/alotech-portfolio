import Link from "next/link";
import type { WorkMeta } from "@/lib/work";
import CoverStack from "./CoverStack";
import StatusPill from "./StatusPill";

/** Whole card is clickable (stretched link); the App Store link sits above it. */
export default function WorkCard({ work, eager = false }: { work: WorkMeta; eager?: boolean }) {
  return (
    <article className="group relative">
      <CoverStack slug={work.slug} showcase={work.showcase} items={work.covers} eager={eager} />
      <div className="mt-6 flex flex-wrap items-center gap-3">
        <h3 className="text-[22px] font-semibold">
          <Link href={`/work/${work.slug}`} className="after:absolute after:inset-0 after:content-['']">
            {work.title}
          </Link>
        </h3>
        <StatusPill status={work.status} />
      </div>
      <p className="mt-2 text-muted">{work.teaser}</p>
      <div className="mt-4 flex flex-wrap gap-x-6 gap-y-2 text-[15px] font-medium">
        <span className="text-ink group-hover:text-accent-text">Read case study →</span>
        {work.liveUrl && (
          <a
            href={work.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="relative z-10 text-muted hover:text-ink"
          >
            {work.liveLabel ?? "View live"} ↗<span className="sr-only"> (opens in a new tab)</span>
          </a>
        )}
      </div>
    </article>
  );
}
