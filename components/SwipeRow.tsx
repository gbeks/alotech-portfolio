"use client";

import { useRef, useState } from "react";

/**
 * Screen row. On mobile, groups of 3+ become a swipeable row with a "02 / 06" counter.
 * On desktop, screens sit side by side and wrap if needed.
 */
export default function SwipeRow({
  count,
  swipe,
  children,
}: {
  count: number;
  swipe: boolean;
  children: React.ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);

  const onScroll = () => {
    const el = ref.current;
    if (!el) return;
    const items = Array.from(el.children) as HTMLElement[];
    const mid = el.scrollLeft + el.clientWidth / 2;
    let best = 0;
    items.forEach((it, i) => {
      const c = it.offsetLeft + it.offsetWidth / 2;
      if (Math.abs(c - mid) < Math.abs(items[best].offsetLeft + items[best].offsetWidth / 2 - mid)) best = i;
    });
    setIndex(best);
  };

  const pad = (n: number) => String(n).padStart(2, "0");

  return (
    <>
      <div
        ref={ref}
        onScroll={swipe ? onScroll : undefined}
        className={
          swipe
            ? "no-scrollbar -mx-6 flex snap-x snap-mandatory items-start gap-4 overflow-x-auto px-6 md:mx-0 md:flex-wrap md:justify-center md:gap-6 md:overflow-visible md:px-0"
            : "flex flex-wrap items-start justify-center gap-4 md:gap-6"
        }
      >
        {children}
      </div>
      {swipe && (
        <p className="mt-6 flex items-center justify-center gap-3 text-[13px] font-medium tracking-[0.08em] text-muted md:hidden" aria-live="polite">
          <span>
            {pad(index + 1)} / {pad(count)}
          </span>
          <span aria-hidden="true">→</span>
          <span className="sr-only">Swipe to see more screens</span>
        </p>
      )}
    </>
  );
}
