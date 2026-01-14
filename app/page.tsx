"use client";

import { siteContent } from "@/data/content";
import ProductCard from "@/components/ProductCard";
import { products } from "@/data/products";
import Image from "next/image";
import Link from "next/link";
import FadeIn from "@/components/FadeIn";

const CATEGORIES = [
  { name: "Tea", image: products.find(p => p.category === "Tea")?.image || "" },
  { name: "Pantry", image: products.find(p => p.category === "Pantry")?.image || "" },
  { name: "Textiles", image: products.find(p => p.category === "Textiles")?.image || "" },
  { name: "Crafts", image: products.find(p => p.category === "Crafts")?.image || "" },
  { name: "Wellness", image: products.find(p => p.category === "Wellness")?.image || "" },
  { name: "Art", image: products.find(p => p.category === "Art")?.image || "" },
];

export default function Home() {
  const { hero, about } = siteContent;
  
  // Get first 6 products for Latest Arrivals
  const latestArrivals = products.slice(0, 6);

  return (
    <>
      {/* Hero Section */}
      <section className="relative flex h-screen w-full items-center justify-center overflow-hidden border-b border-stone">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0">
          <Image
            src="/images/home-hero-artisan.png"
            alt="Artisan hands weaving traditional Himalayan textiles"
            fill
            className="object-cover opacity-90"
            priority
            quality={100}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-[var(--color-pine)]/20" />
        </div>

        {/* Content */}
        <div className="z-10 text-center space-y-6 max-w-4xl px-4 mt-20">
          <FadeIn delay={0.2} direction="down">
            <p className="font-mono text-sm uppercase tracking-[0.4em] text-paper/90 drop-shadow-md">
              {hero.home.subtitle}
            </p>
          </FadeIn>
          
          <FadeIn delay={0.4}>
            <h1 className="font-serif text-5xl md:text-8xl font-medium text-paper italic drop-shadow-lg">
              {hero.home.title}
            </h1>
          </FadeIn>
          
          <FadeIn delay={0.6} direction="up">
            <p className="max-w-2xl mx-auto text-lg text-paper/90 leading-relaxed drop-shadow-md">
              {hero.home.description}
            </p>
          </FadeIn>
          
          <FadeIn delay={0.8} direction="up">
            <Link
              href="/shop"
              className="inline-block mt-8 border-2 border-paper px-10 py-4 font-mono text-sm uppercase tracking-widest text-paper hover:bg-paper hover:text-pine transition-all duration-300 backdrop-blur-sm"
            >
              Explore Collection
            </Link>
          </FadeIn>
        </div>
        
        {/* Scroll Indicator */}
        <div className="absolute bottom-10 animate-bounce text-paper/80">
          <span className="font-mono text-xs uppercase tracking-widest">Scroll</span>
        </div>
      </section>

      {/* About Section - Editorial Design */}
      <section className="relative w-full border-b border-[var(--color-stone)] bg-[#FDFBF7] py-32 overflow-hidden">
        {/* Decorative Background Element */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-24 bg-gradient-to-b from-[var(--color-rust)] to-transparent opacity-40" />
        
        <div className="mx-auto max-w-6xl px-6">
          <div className="text-center mb-20 space-y-6">
             <FadeIn>
              <span className="font-mono text-xs uppercase tracking-[0.4em] text-[var(--color-rust)]">
                {about.story.label}
              </span>
            </FadeIn>
            <FadeIn delay={0.2}>
              <h2 className="font-serif text-5xl md:text-6xl text-[var(--color-pine)] italic relative inline-block">
                {about.story.title}
                {/* Underline decoration */}
                <span className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-24 h-1 bg-[var(--color-rust)]/20 rounded-full" />
              </h2>
            </FadeIn>
          </div>

          <div className="grid gap-16 lg:grid-cols-12 items-start">
            {/* Story Column - Wide */}
            <div className="lg:col-span-7 space-y-8 bg-white p-8 md:p-12 shadow-[0_2px_40px_-12px_rgba(0,0,0,0.05)] rounded-[var(--radius-organic)] border border-[var(--color-pine)]/5">
              <FadeIn delay={0.3} direction="up">
                 <div className="prose prose-lg text-[var(--color-pine)]/80 font-serif leading-relaxed first-letter:text-5xl first-letter:font-serif first-letter:text-[var(--color-rust)] first-letter:mr-3 first-letter:float-left">
                  {about.story.paragraphs.slice(0, 1).map((paragraph, index) => (
                    <p key={index} className="mb-6">{paragraph}</p>
                  ))}
                  {about.story.paragraphs.slice(1, 2).map((paragraph, index) => (
                    <p key={index}>{paragraph}</p>
                  ))}
                </div>
              </FadeIn>
            </div>

            {/* Values Column - Vertical Stack but styled differently */}
            <div className="lg:col-span-5 space-y-6 lg:mt-12">
              <FadeIn delay={0.4} direction="left">
                <h3 className="font-mono text-sm uppercase tracking-widest text-[var(--color-pine)]/50 mb-8 border-b border-[var(--color-pine)]/10 pb-2">
                  Our Core Values
                </h3>
              </FadeIn>
              
              <div className="grid gap-6">
                {about.values.map((value, index) => (
                  <FadeIn key={index} delay={0.5 + (index * 0.1)} direction="left">
                    <div className="group flex gap-5 items-start p-4 hover:bg-white hover:shadow-sm transition-all rounded-lg border border-transparent hover:border-[var(--color-pine)]/5">
                      <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[var(--color-pine)]/5 flex items-center justify-center text-[var(--color-rust)] group-hover:bg-[var(--color-rust)] group-hover:text-white transition-colors duration-500 font-serif italic text-lg">
                        {index + 1}
                      </div>
                      <div className="space-y-1">
                        <h3 className="font-serif text-xl font-medium text-[var(--color-pine)] group-hover:text-[var(--color-rust)] transition-colors">
                          {value.title}
                        </h3>
                        <p className="text-sm text-[var(--color-pine)]/60 leading-relaxed">
                          {value.description}
                        </p>
                      </div>
                    </div>
                  </FadeIn>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Latest Arrivals Section */}
      <section className="py-24 px-6 md:px-12 max-w-7xl mx-auto">
        <FadeIn className="text-center space-y-4 mb-16" direction="up">
          <span className="font-mono text-xs uppercase tracking-widest text-rust">New In Store</span>
          <h2 className="font-serif text-3xl md:text-5xl text-pine">Latest Arrivals</h2>
          <div className="w-24 h-1 bg-rust/30 mx-auto" />
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
          {latestArrivals.map((product, index) => (
            <FadeIn key={product.id} delay={index * 0.1}>
              <ProductCard product={product} />
            </FadeIn>
          ))}
        </div>

        <FadeIn delay={0.2} direction="up" className="mt-16 text-center">
          <Link
            href="/shop"
            className="inline-block border-2 border-[var(--color-pine)] px-8 py-3 font-mono text-sm uppercase tracking-wider text-[var(--color-pine)] hover:bg-[var(--color-pine)] hover:text-[var(--color-paper)] transition-colors"
          >
            View All Products
          </Link>
        </FadeIn>
      </section>

      {/* Categories Section */}
      <section className="border-t border-[var(--color-stone)] bg-[var(--color-pine)]/5 py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-12 text-center">
            <h2 className="font-serif text-3xl text-[var(--color-pine)] italic">Shop by Category</h2>
            <p className="mt-4 font-mono text-xs uppercase tracking-widest text-[var(--color-rust)]">
              Find exactly what you need
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {CATEGORIES.map((category, index) => (
              <FadeIn key={category.name} delay={index * 0.1}>
                <Link
                  href={`/shop?category=${category.name}`}
                  className="group relative block aspect-[4/3] overflow-hidden bg-white shadow-sm transition-all hover:shadow-md"
                  style={{ borderRadius: "var(--radius-organic)" }}
                >
                  <Image
                    src={category.image}
                    alt={category.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/20 transition-opacity group-hover:bg-black/30" />
                  
                  <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
                    <h3 className="font-serif text-3xl text-white italic drop-shadow-md">
                      {category.name}
                    </h3>
                    <span className="mt-2 inline-block rounded-full border border-white/40 bg-white/10 px-4 py-1.5 font-mono text-xs uppercase tracking-wider text-white backdrop-blur-sm transition-colors group-hover:bg-white group-hover:text-[var(--color-pine)]">
                      View Collection
                    </span>
                  </div>
                </Link>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
