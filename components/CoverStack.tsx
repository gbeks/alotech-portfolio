import { resolveScreen } from "@/lib/screens";
import type { ScreenItem } from "./ScreenGroup";
import ScreenView from "./ScreenView";

/** 2 to 3 framed phones on the product's showcase panel. Used on cards and next-project links. */
export default function CoverStack({
  slug,
  showcase,
  items,
  eager = false,
}: {
  slug: string;
  showcase: string;
  items: ScreenItem[];
  eager?: boolean;
}) {
  return (
    <div data-showcase={showcase} className="themed flex items-end justify-center gap-3 overflow-hidden rounded-[24px] bg-showcase px-6 pt-10 sm:gap-4">
      {items.slice(0, 3).map((item, i) => (
        <ScreenView
          key={item.src}
          screen={resolveScreen(slug, item.src)}
          alt={item.alt}
          framed
          zoom={false}
          compact
          priority={eager}
          sizes="(max-width: 768px) 28vw, 160px"
          // Middle phone sits slightly higher; outer ones are cropped by the panel's bottom edge.
          className={`w-[28%] max-w-[170px] shrink-0 ${i === 1 ? "-mb-6" : "-mb-16"}`}
        />
      ))}
    </div>
  );
}
