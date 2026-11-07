import { home } from "@/content/home";
import { getAllWork } from "@/lib/work";
import WorkCard from "@/components/WorkCard";
import CopyEmail from "@/components/CopyEmail";
import Reveal from "@/components/Reveal";
import Hero from "@/components/Hero";
import Beliefs from "@/components/Beliefs";

const wrap = "mx-auto max-w-[1200px] px-6 md:px-10";
const section = "py-20 md:py-36";
const h2 = "text-2xl font-bold md:text-[34px]";

export default function HomePage() {
  const work = getAllWork();

  return (
    <Reveal>
      {/* 1. Hero */}
      <Hero title={home.hero.title} subtitle={home.hero.subtitle} cta={{ label: home.hero.cta.label, href: "/#work" }} />

      {/* 2. Who we are */}
      <section id="about" className={`${wrap} ${section} scroll-mt-16`}>
        <div className="grid gap-6 md:grid-cols-[280px_1fr] md:gap-10">
          <h2 className={h2}>{home.whoWeAre.title}</h2>
          <div className="max-w-[680px] space-y-5 text-lg md:text-xl">
            {home.whoWeAre.paragraphs.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
        </div>
      </section>

      {/* 3. How we work */}
      <section className={`${wrap} ${section}`}>
        <h2 className={h2}>{home.howWeWork.title}</h2>
        <ol className="mt-12 grid gap-12 md:grid-cols-3 md:gap-10">
          {home.howWeWork.steps.map((s, i) => (
            <li key={s.title}>
              <span className="text-[13px] font-medium tracking-[0.08em] text-muted">0{i + 1}</span>
              <h3 className="mt-3 text-[21px] font-semibold">{s.title}</h3>
              <p className="mt-3 text-muted">{s.text}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* 4. Our work */}
      <section id="work" className={`${wrap} ${section} scroll-mt-16`}>
        <h2 className={h2}>{home.ourWork.title}</h2>
        <div className="mt-12 grid gap-x-10 gap-y-20 md:grid-cols-2">
          {work.map((w, i) => (
            <WorkCard key={w.slug} work={w} eager={i < 2} />
          ))}
        </div>
      </section>

      {/* 5. What we believe */}
      <Beliefs title={home.beliefs.title} lead={home.beliefs.lead} text={home.beliefs.text} />

      {/* 6. Let's talk */}
      <section id="contact" className={`${wrap} ${section} scroll-mt-16`}>
        <h2 className={h2}>{home.contact.title}</h2>
        <p className="mt-4 max-w-[34rem] text-lg text-muted">{home.contact.text}</p>
        <div className="mt-12">
          <CopyEmail email={home.contact.email} />
        </div>
      </section>
    </Reveal>
  );
}
