import { isValidElement, Children } from "react";
import { resolveScreen } from "@/lib/screens";
import ScreenView from "./ScreenView";
import SwipeRow from "./SwipeRow";

export type ScreenItem = {
  src: string;
  alt: string;
  /** Brand boards, web screens and App Store composites: no phone frame. */
  unframed?: boolean;
  /** Not in the export yet. Shows a labelled placeholder. */
  pending?: string;
  /** A real-world photo (not a 2x export): shown up to its full pixel width, unframed. */
  photo?: boolean;
  /** Desktop web screen: sized as a standard 1440x1024 frame wide, so every web screen in a case study is the same width; longer pages run taller. */
  web?: boolean;
  /** Short line shown under the group. */
  caption?: string;
};

/** Phone height relative to width, frame included. Used to keep heights consistent. */
const PHONE_RATIO = 2.17;

/** Screen group on the case study's soft showcase panel. Breaks out wider than the text column. */
export function ScreenGroup({
  slug,
  items,
  priority = false,
  className = "",
}: {
  slug: string;
  items: ScreenItem[];
  priority?: boolean;
  className?: string;
}) {
  const n = items.length;
  const swipe = n > 2;
  // Phone width per item. Desktop shrinks as groups grow; mobile fits 2 across or swipes.
  const wDesktop = n <= 2 ? 260 : n <= 4 ? 220 : 190;
  const wMobile = swipe ? "min(62vw, 260px)" : n === 2 ? "min(40vw, 220px)" : "min(62vw, 260px)";

  return (
    <div className={`screens mx-auto my-14 max-w-[1100px] md:my-20 ${className}`}>
      <div
        className="themed rounded-[24px] bg-showcase px-6 py-10 md:px-12 md:py-14 [--w:var(--w-m)] md:[--w:var(--w-d)]"
        style={{ ["--w-m" as string]: wMobile, ["--w-d" as string]: `${wDesktop}px` }}
      >
        <SwipeRow count={n} swipe={swipe}>
          {items.map((item, i) => {
            const screen = resolveScreen(slug, item.src);
            const framed = !item.unframed && !item.photo;
            const maxW = screen.exists ? Math.round(item.photo ? screen.width : screen.width / 2) : 9999;
            // Unframed images get the same height as the phones, so a row reads at one height.
            const ratio = item.web ? 1440 / 1024 : screen.exists ? screen.width / screen.height : 16 / 10;
            return (
              <ScreenView
                key={item.src + i}
                screen={screen}
                alt={item.alt}
                framed={framed}
                pending={item.pending}
                priority={priority && i < 3}
                sizes={framed ? "(max-width: 768px) 62vw, 260px" : "(max-width: 768px) 90vw, 1000px"}
                className={
                  framed
                    ? "w-[var(--w)] shrink-0 snap-center"
                    : `max-w-full shrink-0 snap-center ${swipe ? "" : "max-md:!w-full"}`
                }
                style={framed ? undefined : { width: `min(calc(var(--w) * ${PHONE_RATIO} * ${ratio.toFixed(4)}), ${maxW}px)` }}
              />
            );
          })}
        </SwipeRow>
        {items.some((it) => it.caption) && (
          <p className="mt-6 text-center text-[15px] text-muted md:mt-8">
            {items.map((it) => it.caption).filter(Boolean).join(" ")}
          </p>
        )}
      </div>
    </div>
  );
}

/**
 * MDX usage:
 *   <Screens>
 *     <Screen src="home.png" alt="Clearfine dashboard showing fine status" />
 *     <Screen src="clearfine-cover.png" alt="..." unframed />
 *   </Screens>
 * <Screen> only carries data; <Screens> renders the group.
 */
export function Screen(_props: ScreenItem) {
  return null;
}

export function makeScreens(slug: string) {
  return function Screens({ children }: { children: React.ReactNode }) {
    const items = Children.toArray(children)
      .filter(isValidElement)
      .map((el) => el.props as ScreenItem);
    return <ScreenGroup slug={slug} items={items} />;
  };
}
