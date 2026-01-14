import Image from "next/image";
import { siteContent } from "@/data/content";
import FadeIn from "@/components/FadeIn";

export const metadata = {
  title: `About | ${siteContent.site.name}`,
  description: siteContent.about.mission.description,
};

export default function AboutPage() {
  const { hero, about } = siteContent;

  return (
    <>
      <section className="relative flex h-[60vh] w-full items-center justify-center overflow-hidden border-b border-[var(--color-stone)]">
     {/* Hero Image */}
        <div className="absolute inset-0">
          <Image
            src="/images/about-hero-workbench.png"
            alt="Rustic workbench with vintage tools in the Himalayas"
            fill
            className="object-cover opacity-80"
            priority
            quality={100}
          />
        </div>
        <div className="absolute inset-0 bg-black/10" />

        <div className="z-10 text-center space-y-4 max-w-2xl px-4 text-white">
          <FadeIn delay={0.2} direction="down">
            <p className="font-mono text-xs uppercase tracking-[0.3em]">
              {hero.about.subtitle}
            </p>
          </FadeIn>
          <FadeIn delay={0.4}>
            <h1 className="font-serif text-5xl md:text-7xl font-medium italic drop-shadow-lg">
              {hero.about.title}
            </h1>
          </FadeIn>
          <FadeIn delay={0.6} direction="up">
            <p className="text-white/90 leading-relaxed text-lg drop-shadow-md">
              {hero.about.description}
            </p>
          </FadeIn>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-6 py-24 space-y-24">
        {/* Story Section */}
        <div className="space-y-8 text-center">
          <FadeIn>
            <h2 className="font-serif text-3xl md:text-4xl text-[var(--color-pine)]">Our Story</h2>
            <div className="w-24 h-1 bg-[var(--color-rust)]/30 mx-auto mt-6" />
          </FadeIn>
          
          <FadeIn delay={0.2} direction="up" className="space-y-4 text-lg leading-relaxed text-[var(--color-pine)]/80 font-serif">
            {about.story.paragraphs.map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </FadeIn>
        </div>

        {/* Mission Section */}
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <FadeIn direction="right">
            <div className="relative aspect-[3/4] rounded-lg overflow-hidden">
               <Image
                src="/images/about-mission-artisan.png"
                alt="Artisan weaving traditional textiles"
                fill
                className="object-cover"
              />
            </div>
          </FadeIn>
          
          <div className="space-y-6">
            <FadeIn delay={0.2}>
              <h3 className="font-serif text-2xl text-[var(--color-pine)]">{about.mission.title}</h3>
            </FadeIn>
            <FadeIn delay={0.3} direction="up">
              <p className="leading-relaxed text-[var(--color-pine)]/70">
                {about.mission.description}
              </p>
            </FadeIn>
          </div>
        </div>
      </section>
    </>
  );
}
