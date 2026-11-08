import { ContactButton, CornerArrow } from "./brand/Canvas";

/**
 * "What we believe": the habits AloTech refuses (the opposite of how we work: users first,
 * test as we go, stay past launch), struck through in the brand's strikethrough style and
 * receding into the background, then the arrow down to what we build from instead.
 */
const struck = ["“Design first, ask users later.”", "“We'll test it at the end.”", "“Launch it and move on.”"];

export default function Beliefs({ title, lead, text }: { title: string; lead: string; text: string }) {
  const words = lead.split(" ");
  return (
    <section className="mx-auto max-w-[1200px] px-6 py-28 md:px-10 md:py-48">
      <h2 className="sr-only">{title}</h2>

      <ul aria-label="What we don't build from" className="space-y-2 md:space-y-3">
        {struck.map((q, i) => (
          <li
            key={q}
            className="strike relative w-fit font-display text-[22px] font-bold tracking-[-0.02em] text-muted md:text-[32px]"
            // Older noise sits further back: fainter and smaller.
            style={{ opacity: 0.55 + i * 0.15, transform: `scale(${0.9 + i * 0.05})`, transformOrigin: "left center" }}
          >
            <span className="sr-only">Not: </span>
            {q}
          </li>
        ))}
      </ul>

      <CornerArrow className="ml-2 mt-6 h-12 w-[120px] text-muted md:mt-8 md:h-16 md:w-[160px]" />

      <p className="mt-4 font-display text-[40px] font-bold leading-[1.02] tracking-[-0.03em] md:mt-6 md:text-[88px]">
        {words.map((w, i) => (
          <span key={w} className="inline-block">
            {w}
            {i < words.length - 1 && <>&nbsp;</>}
          </span>
        ))}
      </p>
      <p className="mt-8 max-w-[36rem] text-lg text-muted">{text}</p>
      <ContactButton className="mt-10" />
    </section>
  );
}
