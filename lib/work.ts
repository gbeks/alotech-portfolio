import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import type { ScreenItem } from "@/components/ScreenGroup";

export type WorkMeta = {
  title: string;
  subtitle: string;
  teaser: string;
  slug: string;
  status: "live" | "coming-soon";
  role: string;
  team: string;
  timeline: string;
  platform: string;
  focus: string;
  liveUrl?: string;
  liveLabel?: string;
  showcase: "teal" | "gold" | "navy" | "lavender";
  order: number;
  /** Header image(s). Falls back to covers. */
  hero?: ScreenItem[];
  /** 2 to 3 screens for the homepage card and next-project link. */
  covers: ScreenItem[];
};

const dir = path.join(process.cwd(), "content", "work");

/**
 * Every .mdx file in /content/work is a case study.
 * To add Alo & Peace Realty: drop in content/work/alo-peace.mdx with the same frontmatter.
 */
export function getAllWork(): WorkMeta[] {
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith(".mdx"))
    .map((f) => matter(fs.readFileSync(path.join(dir, f), "utf8")).data as WorkMeta)
    .sort((a, b) => a.order - b.order);
}

export function getWork(slug: string): { meta: WorkMeta; body: string } | null {
  const file = path.join(dir, `${slug}.mdx`);
  if (!fs.existsSync(file)) return null;
  const { data, content } = matter(fs.readFileSync(file, "utf8"));
  return { meta: data as WorkMeta, body: content };
}
