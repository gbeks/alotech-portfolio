"use client";

import { useEffect, useState } from "react";

/** Click copies the email (no mailto). Tooltip "Click to copy", toast "Email copied!" for ~3s, announced to screen readers. */
export default function CopyEmail({ email }: { email: string }) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) return;
    const t = setTimeout(() => setCopied(false), 3000);
    return () => clearTimeout(t);
  }, [copied]);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(email);
    } catch {
      // Fallback for browsers that block the async clipboard API.
      const ta = document.createElement("textarea");
      ta.value = email;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      ta.remove();
    }
    setCopied(true);
  };

  return (
    <div className="relative inline-block">
      <button
        type="button"
        onClick={copy}
        aria-describedby="copy-hint"
        className="peer break-all text-left font-display text-[clamp(1.75rem,6vw,3.5rem)] font-bold leading-tight hover:text-accent-text"
      >
        {email}
      </button>
      <span
        id="copy-hint"
        role="tooltip"
        className="pointer-events-none absolute -top-9 left-0 rounded-md bg-ink px-2 py-1 text-xs text-bg opacity-0 peer-hover:opacity-100 peer-focus-visible:opacity-100"
      >
        Click to copy
      </span>
      <div aria-live="polite" role="status" className="fixed bottom-6 left-1/2 z-50 -translate-x-1/2">
        {copied && (
          <span className="block rounded-full bg-ink px-4 py-2 text-sm font-medium text-bg shadow-sm">Email copied!</span>
        )}
      </div>
    </div>
  );
}
