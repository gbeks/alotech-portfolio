/**
 * Brand components from the AloTech content system (alotech-content-components.svg),
 * rebuilt as HTML so they theme with light/dark mode. Decorative only: every piece is aria-hidden
 * at the point of use.
 */

/** Figma-style selection: thin outline with square handles at the corners. */
export function Selection({
  children,
  tone = "accent",
  className = "",
}: {
  children: React.ReactNode;
  tone?: "accent" | "ink";
  className?: string;
}) {
  const line = tone === "accent" ? "border-accent" : "border-ink";
  return (
    <span className={`relative inline-block whitespace-nowrap ${className}`}>
      <span aria-hidden="true" className={`sel-box pointer-events-none absolute -inset-x-[0.12em] -inset-y-[0.02em] border-[1.5px] ${line}`}>
        {(["-left-[5px] -top-[5px]", "-right-[5px] -top-[5px]", "-left-[5px] -bottom-[5px]", "-right-[5px] -bottom-[5px]"] as const).map((pos) => (
          <span key={pos} className={`sel-handle absolute h-[9px] w-[9px] border-[1.5px] bg-bg ${line} ${pos}`} />
        ))}
      </span>
      <span className="relative">{children}</span>
    </span>
  );
}

/** Multiplayer cursor with a name tag. */
export function Cursor({
  label,
  tone,
  className = "",
  style,
}: {
  label: string;
  tone: "accent" | "ink" | "paper";
  className?: string;
  style?: React.CSSProperties;
}) {
  const arrow = { accent: "fill-accent stroke-bg", ink: "fill-ink stroke-bg", paper: "fill-bg stroke-ink" }[tone];
  const tag = {
    accent: "bg-accent text-black",
    ink: "bg-ink text-bg",
    paper: "bg-bg text-ink ring-1 ring-line",
  }[tone];
  return (
    <span aria-hidden="true" className={`cursor pointer-events-none absolute flex items-start ${className}`} style={style}>
      <svg viewBox="0 0 24 24" className={`h-[22px] w-[22px] ${arrow}`} strokeWidth="1.75" strokeLinejoin="round">
        <path d="M4 3 L20 11 L12.5 13 L9.5 20.5 Z" />
      </svg>
      <span className={`mt-4 -ml-1 whitespace-nowrap rounded-full px-2.5 py-[3px] font-sans text-[13px] font-medium leading-tight tracking-normal ${tag}`}>
        {label}
      </span>
    </span>
  );
}

/** Ticket card: "AL-142 · REQUEST / Build feature X". `ghost` is the dashed, faded backlog state. */
export function Ticket({
  id,
  kind,
  title,
  ghost = false,
  className = "",
  style,
}: {
  id: string;
  kind: string;
  title: React.ReactNode;
  ghost?: boolean;
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <div
      aria-hidden="true"
      className={`absolute w-[236px] rounded-[10px] px-5 pb-5 pt-4 ${
        ghost ? "border-[1.5px] border-dashed border-line text-muted" : "border border-line bg-surface text-ink"
      } ${className}`}
      style={style}
    >
      <div className="flex justify-between text-[11px] font-medium tracking-[0.12em] text-muted">
        <span>{id}</span>
        <span>{kind}</span>
      </div>
      <p className="mt-3 font-display text-[28px] font-bold leading-[1.02] tracking-[-0.02em]">{title}</p>
    </div>
  );
}

/** Request card: "● SALES / We need this to close the deal." */
export function Request({
  from,
  text,
  className = "",
  style,
}: {
  from: string;
  text: string;
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <div aria-hidden="true" className={`absolute w-[248px] rounded-[10px] border border-line bg-bg px-5 pb-5 pt-4 ${className}`} style={style}>
      <div className="flex items-center gap-2 text-[11px] font-medium tracking-[0.12em] text-accent-text">
        <span className="h-1.5 w-1.5 rounded-full bg-accent" />
        {from}
      </div>
      <p className="mt-3 font-display text-[21px] font-semibold leading-[1.15] tracking-[-0.01em] text-ink">{text}</p>
    </div>
  );
}

/** The corner arrow: down, across, then down again. */
export function CornerArrow({ className = "" }: { className?: string }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 160 64" fill="none" className={className} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2 2 V20 a12 12 0 0 0 12 12 H128 a12 12 0 0 1 12 12 V60" />
      <path d="M131 51 l9 9 l9 -9" />
    </svg>
  );
}

/** Primary button: ink fill (white in dark mode), pink only on hover and focus. Scrolls to the contact section. */
export function ContactButton({ className = "" }: { className?: string }) {
  return (
    <a
      href="/#contact"
      className={`inline-flex items-center rounded-full bg-ink px-6 py-3 text-[16px] font-medium text-bg hover:bg-accent hover:text-black ${className}`}
    >
      Contact us
    </a>
  );
}
