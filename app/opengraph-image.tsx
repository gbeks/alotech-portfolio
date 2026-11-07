import { ogImage, ogSize } from "@/lib/og";

export const alt = "AloTech Labs, Product Studio";
export const size = ogSize;
export const contentType = "image/png";

export default function Image() {
  return ogImage("Thoughtful software, built with purpose.", "AloTech Labs, Product Studio");
}
