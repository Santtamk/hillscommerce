"use client";

import { siteContent } from "@/data/content";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import { products } from "@/data/products";
import Image from "next/image";

export default function Home() {
  const { hero, about, labels } = siteContent;

  return (
    <div className="flex min-h-screen flex-col font-sans">
      <Navbar />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative flex h-[60vh] w-full items-center justify-center overflow-hidden border-b border-[var(--color-stone)]">
          {/* Hero Image */}
          <div className="absolute inset-0">
            <Image
              src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80"
              alt="Himalayan mountains"
              fill
              className="object-cover opacity-20"
              priority
            />
          </div>
          <div className="absolute inset-0 bg-[var(--color-pine)]/5" />
          
          <div className="z-10 text-center space-y-6 max-w-2xl px-4 animate-[fade-in_1s_ease-out]">
            <p className="font-mono text-xs uppercase tracking-[0.3em] text-[var(--color-rust)]">
              {hero.home.subtitle}
            </p>
            <h1 className="font-serif text-5xl md:text-7xl font-medium text-[var(--color-pine)] italic">
              {hero.home.title}
            </h1>
            <p className="text-[var(--color-pine)]/70 max-w-lg mx-auto leading-relaxed">
              {hero.home.description}
            </p>
          </div>
        </section>

        {/* About Section */}
        <section className="relative w-full border-b border-[var(--color-stone)] bg-white py-24">
          <div className="mx-auto max-w-4xl px-6">
            <div className="grid gap-16 md:grid-cols-2 md:gap-12">
              {/* Left Column - Story */}
              <div className="space-y-6">
                <p className="font-mono text-xs uppercase tracking-[0.3em] text-[var(--color-rust)]">
                  {about.story.label}
                </p>
                <h2 className="font-serif text-4xl font-medium text-[var(--color-pine)] italic">
                  {about.story.title}
                </h2>
                <div className="space-y-4 text-[var(--color-pine)]/70 leading-relaxed">
                  {about.story.paragraphs.slice(0, 2).map((paragraph, index) => (
                    <p key={index}>{paragraph}</p>
                  ))}
                </div>
              </div>

              {/* Right Column - Values */}
              <div className="space-y-8">
                {about.values.map((value, index) => (
                  <div key={index} className="space-y-3 border-l-2 border-[var(--color-rust)] pl-6">
                    <h3 className="font-serif text-xl font-medium text-[var(--color-pine)]">
                      {value.title}
                    </h3>
                    <p className="text-sm text-[var(--color-pine)]/70">
                      {value.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Product Grid */}
        <section className="mx-auto max-w-6xl px-6 py-24">
          <div className="mb-12 flex items-baseline justify-between border-b border-[var(--color-stone)] pb-4">
            <h2 className="font-serif text-3xl text-[var(--color-pine)]">{labels.latestArrivals}</h2>
            <span className="font-mono text-xs text-[var(--color-pine)]/50">
              {products.length} {labels.items}
            </span>
          </div>

          <div className="grid grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
