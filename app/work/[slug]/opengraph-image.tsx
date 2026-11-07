import { ogImage, ogSize } from "@/lib/og";
import { getAllWork, getWork } from "@/lib/work";

export const size = ogSize;
export const contentType = "image/png";
export const alt = "AloTech Labs case study";

export function generateStaticParams() {
  return getAllWork().map((w) => ({ slug: w.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const work = getWork(slug);
  return ogImage(work ? work.meta.title : "Case study", "Case study");
}
