import { siteContent } from "@/data/content";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Image from "next/image";

export const metadata = {
  title: `About | ${siteContent.site.name}`,
  description: siteContent.about.mission.description,
};

export default function AboutPage() {
  const { hero, about } = siteContent;

  return (
    <div className="flex min-h-screen flex-col font-sans">
      <Navbar />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative flex h-[50vh] w-full items-center justify-center overflow-hidden border-b border-[var(--color-stone)]">
          {/* Hero Image */}
          <div className="absolute inset-0">
            <Image
              src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80"
              alt="Mountain landscape"
              fill
              className="object-cover opacity-20"
              priority
            />
          </div>
          <div className="absolute inset-0 bg-[var(--color-pine)]/5" />

          <div className="z-10 text-center space-y-6 max-w-2xl px-4 animate-[fade-in_1s_ease-out]">
            <p className="font-mono text-xs uppercase tracking-[0.3em] text-[var(--color-rust)]">
              {hero.about.subtitle}
            </p>
            <h1 className="font-serif text-5xl md:text-7xl font-medium text-[var(--color-pine)] italic">
              {hero.about.title}
            </h1>
            <p className="text-[var(--color-pine)]/70 max-w-lg mx-auto leading-relaxed">
              {hero.about.description}
            </p>
          </div>
        </section>

        {/* Story Section */}
        <section className="relative w-full border-b border-[var(--color-stone)] bg-white py-24">
          <div className="mx-auto max-w-4xl px-6">
            <div className="space-y-6">
              <p className="font-mono text-xs uppercase tracking-[0.3em] text-[var(--color-rust)]">
                {about.story.label}
              </p>
              <h2 className="font-serif text-4xl font-medium text-[var(--color-pine)] italic">
                {about.story.title}
              </h2>
              <div className="space-y-4 text-[var(--color-pine)]/70 leading-relaxed">
                {about.story.paragraphs.map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="relative w-full border-b border-[var(--color-stone)] bg-[var(--color-paper)] py-24">
          <div className="mx-auto max-w-5xl px-6">
            <div className="grid gap-12 md:grid-cols-3">
              {about.values.map((value, index) => (
                <div
                  key={index}
                  className="space-y-4 border-l-2 border-[var(--color-rust)] pl-6"
                >
                  <h3 className="font-serif text-2xl font-medium text-[var(--color-pine)]">
                    {value.title}
                  </h3>
                  <p className="text-sm text-[var(--color-pine)]/70 leading-relaxed">
                    {value.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Mission Section */}
        <section className="relative w-full bg-white py-24">
          <div className="mx-auto max-w-3xl px-6 text-center space-y-6">
            <h2 className="font-serif text-3xl md:text-4xl font-medium text-[var(--color-pine)] italic">
              {about.mission.title}
            </h2>
            <p className="text-lg text-[var(--color-pine)]/70 leading-relaxed">
              {about.mission.description}
            </p>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
