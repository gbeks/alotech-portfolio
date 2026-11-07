import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { evaluate } from "@mdx-js/mdx";
import * as runtime from "react/jsx-runtime";
import { getAllWork, getWork } from "@/lib/work";
import { ScreenGroup, Screen, makeScreens } from "@/components/ScreenGroup";
import StatusPill from "@/components/StatusPill";
import CoverStack from "@/components/CoverStack";
import Reveal from "@/components/Reveal";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return getAllWork().map((w) => ({ slug: w.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const work = getWork((await params).slug);
  if (!work) return {};
  const title = `${work.meta.title} case study`;
  return {
    title,
    description: work.meta.subtitle,
    openGraph: { title: `${title} · AloTech Labs`, description: work.meta.subtitle },
  };
}

export default async function CaseStudyPage({ params }: Props) {
  const { slug } = await params;
  const work = getWork(slug);
  if (!work) notFound();
  const { meta, body } = work;

  const { default: Content } = await evaluate(body, { ...runtime, baseUrl: import.meta.url });

  const all = getAllWork();
  const next = all[(all.findIndex((w) => w.slug === slug) + 1) % all.length];

  const glance = [
    ["Role", meta.role],
    ["Team", meta.team],
    ["Timeline", meta.timeline],
    ["Platform", meta.platform],
    ["Focus", meta.focus],
  ];

  return (
    <article data-showcase={meta.showcase}>
      <div className="mx-auto max-w-[1200px] px-6 md:px-10">
        {/* 1. Back link */}
        <Link href="/#work" className="mt-10 inline-block text-[15px] text-muted hover:text-ink md:mt-14">
          ← All work
        </Link>

        {/* 2. Header */}
        <header className="mx-auto mt-12 max-w-[680px] md:mt-20">
          <StatusPill status={meta.status} />
          <h1 className="mt-5 text-[36px] font-bold tracking-[-0.03em] md:text-[62px]">{meta.title}</h1>
          <p className="mt-5 text-lg text-muted md:text-xl">{meta.subtitle}</p>

          {/* 3. Live link (only for shipped products) */}
          {meta.liveUrl && (
            <a href={meta.liveUrl} target="_blank" rel="noopener noreferrer" className="mt-6 inline-block font-medium text-accent-text hover:underline">
              {meta.liveLabel ?? "View live"} ↗<span className="sr-only"> (opens in a new tab)</span>
            </a>
          )}
        </header>

        {meta.hero ? (
          <ScreenGroup slug={slug} items={meta.hero} priority className="!mt-12 md:!mt-16" />
        ) : (
          <div className="mx-auto mt-12 max-w-[1100px] md:mt-16">
            <CoverStack slug={slug} showcase={meta.showcase} items={meta.covers} eager />
          </div>
        )}

        {/* 4. At a glance */}
        <dl className="mx-auto mt-14 grid max-w-[680px] grid-cols-2 gap-x-6 gap-y-6 md:mt-20 md:grid-cols-5 md:max-w-[1100px]">
          {glance.map(([label, value]) => (
            <div key={label}>
              <dt className="text-[12px] font-medium uppercase tracking-[0.08em] text-muted">{label}</dt>
              <dd className="mt-1.5 text-[15px] leading-snug">{value}</dd>
            </div>
          ))}
        </dl>

        {/* 5 + 6. Numbered sections and screen groups, from MDX */}
        <Reveal className="case">
          <Content components={{ Screens: makeScreens(slug), Screen }} />
        </Reveal>
      </div>

      {/* 7. Next project */}
      <section className="mx-auto mt-28 max-w-[1200px] px-6 pb-10 md:mt-40 md:px-10">
        <Link href={`/work/${next.slug}`} className="group block">
          <span className="text-[13px] font-medium uppercase tracking-[0.08em] text-muted">Next project</span>
          <p className="mt-3 font-display text-[32px] font-bold tracking-[-0.02em] group-hover:text-accent-text md:text-[48px]">
            {next.title} →
          </p>
          <div className="mt-8">
            <CoverStack slug={next.slug} showcase={next.showcase} items={next.covers} />
          </div>
        </Link>
      </section>
    </article>
  );
}
