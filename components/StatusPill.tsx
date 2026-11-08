/** Outline pill, uppercase, small dot. Live = green dot, Coming soon = grey dot. No fills. */
export default function StatusPill({ status }: { status: "live" | "coming-soon" }) {
  const live = status === "live";
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-line px-2.5 py-1 text-[12px] font-medium uppercase leading-none tracking-[0.08em] text-muted">
      <span className={`h-1.5 w-1.5 rounded-full ${live ? "bg-live" : "bg-muted"}`} aria-hidden="true" />
      {live ? "Live" : "Coming soon"}
    </span>
  );
}
