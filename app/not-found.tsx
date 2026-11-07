import Link from "next/link";

export const metadata = { title: "Page not found" };

export default function NotFound() {
  return (
    <section className="mx-auto max-w-[1200px] px-6 py-32 md:px-10 md:py-48">
      <p className="text-[13px] font-medium uppercase tracking-[0.08em] text-muted">404</p>
      <h1 className="mt-4 text-[34px] font-bold tracking-[-0.03em] md:text-[56px]">This page doesn't exist.</h1>
      <Link href="/" className="mt-8 inline-block font-medium hover:text-accent-text">
        ← Back home
      </Link>
    </section>
  );
}
