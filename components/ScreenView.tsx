"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import type { ResolvedScreen } from "@/lib/screens";

/**
 * One screen: phone frame (or plain, for brand boards and web screens),
 * click to open full size in a lightbox. Uses native <dialog>, which traps
 * focus, closes on Esc and returns focus to the trigger on close.
 */
export default function ScreenView({
  screen,
  alt,
  framed,
  pending,
  priority = false,
  className = "",
  sizes,
  zoom = true,
  style,
  compact = false,
}: {
  style?: React.CSSProperties;
  /** Smaller frame and corner radius, for the small phones on cover panels. */
  compact?: boolean;
  screen: ResolvedScreen;
  alt: string;
  framed: boolean;
  pending?: string;
  priority?: boolean;
  className?: string;
  sizes: string;
  /** false inside clickable cards, where a nested button isn't allowed. */
  zoom?: boolean;
}) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [open, setOpen] = useState(false);

  if (!screen.exists) {
    return (
      <div
        className={`flex flex-col items-center justify-center gap-1.5 border border-dashed border-line bg-bg/60 p-3 text-center ${
          framed ? (compact ? "rounded-[14px]" : "rounded-[30px]") : "rounded-2xl"
        } ${className}`}
        style={{ aspectRatio: framed ? `${screen.width} / ${screen.height}` : "16 / 10", ...style }}
        role="img"
        aria-label={`Placeholder: ${alt}`}
      >
        <span className="text-[11px] font-medium uppercase tracking-[0.08em] text-muted">{pending ? "Pending" : "Missing"}</span>
        <span className="break-all text-xs text-ink">{screen.file}</span>
        {pending && <span className="text-[11px] text-muted">{pending}</span>}
      </div>
    );
  }

  const img = (extra: string) => (
    <Image src={screen.url} alt={alt} width={screen.width} height={screen.height} sizes={sizes} loading={priority ? "eager" : "lazy"} fetchPriority={priority ? "high" : "auto"} className={`block h-auto w-full ${extra}`} />
  );
  // Screens show at full length; rows top-align them (SwipeRow uses items-start).
  const picture = framed ? (
    <span className={`block bg-[var(--bezel)] ring-1 ring-line ${compact ? "rounded-[14px] p-[3px]" : "rounded-[30px] p-[5px]"}`}>
      {img(compact ? "rounded-[11px]" : "rounded-[25px]")}
    </span>
  ) : (
    img("rounded-2xl")
  );

  if (!zoom) return <div className={className} style={style}>{picture}</div>;

  const openBox = () => {
    setOpen(true);
    dialogRef.current?.showModal();
    document.documentElement.style.overflow = "hidden";
  };
  const closeBox = () => dialogRef.current?.close();

  return (
    <>
      <button type="button" onClick={openBox} aria-label={`View larger: ${alt}`} className={`block cursor-zoom-in ${className}`} style={style}>
        {picture}
      </button>

      <dialog
        ref={dialogRef}
        onClose={() => {
          setOpen(false);
          document.documentElement.style.overflow = "";
        }}
        onClick={(e) => e.target === dialogRef.current && closeBox()}
        aria-label={alt}
        className="m-auto overflow-visible bg-transparent p-0 backdrop:bg-black/85"
      >
        {open && (
          <div className="relative">
            <Image
              src={screen.url}
              alt={alt}
              width={screen.width}
              height={screen.height}
              sizes="92vw"
              quality={90}
              className="h-auto max-h-[88vh] w-auto max-w-[92vw] rounded-2xl"
            />
            <button
              type="button"
              onClick={closeBox}
              autoFocus
              aria-label="Close"
              className="absolute -right-3 -top-3 grid h-10 w-10 place-items-center rounded-full bg-white text-black"
            >
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
                <path d="M6 6l12 12M18 6L6 18" />
              </svg>
            </button>
          </div>
        )}
      </dialog>
    </>
  );
}
