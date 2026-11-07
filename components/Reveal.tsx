"use client";

import { useEffect, useRef } from "react";

/**
 * Fades its direct children in as they scroll into view, once only (PRD §2 Motion).
 * The hidden state is only added by this script (so content is never hidden without JS)
 * and is ignored under prefers-reduced-motion (globals.css).
 */
export default function Reveal({
  children,
  className = "",
  as: Tag = "div",
}: {
  children: React.ReactNode;
  className?: string;
  as?: "div" | "article";
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    // Anything already on screen at load stays put; only content below the fold fades in.
    const items = (Array.from(root.children) as HTMLElement[]).filter(
      (el) => el.getBoundingClientRect().top > window.innerHeight,
    );
    items.forEach((el) => el.classList.add("reveal"));
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            e.target.classList.add("is-visible");
            io.unobserve(e.target);
          }
        }
      },
      { rootMargin: "0px 0px -8% 0px" },
    );
    items.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <Tag ref={ref} className={className}>
      {children}
    </Tag>
  );
}
