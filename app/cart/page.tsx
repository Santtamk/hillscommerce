"use client";

import { siteContent } from "@/data/content";
import { useCartStore } from "@/store/cartStore";
import Image from "next/image";
import Link from "next/link";
import { X } from "lucide-react";
import { useEffect, useState } from "react";
import FadeIn from "@/components/FadeIn";

export default function CartPage() {
  const { cart, removeFromCart, clearCart } = useCartStore();
  const { hero, labels } = siteContent;

  // Hydration fix
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  // Calculate total
  const total = cart.reduce((sum, item) => sum + item.price, 0);

  return (
    <>
      {/* Hero Section */}
      <section className="relative flex h-[40vh] w-full items-center justify-center overflow-hidden border-b border-[var(--color-stone)]">
        {/* Hero Image */}
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1483985988355-763728e1935b?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80"
            alt="Shopping basket"
            fill
            className="object-cover opacity-20"
            priority
          />
        </div>
        <div className="absolute inset-0 bg-[var(--color-pine)]/5" />

        <div className="z-10 text-center space-y-4 max-w-2xl px-4">
          <FadeIn delay={0.2} direction="down">
            <p className="font-mono text-xs uppercase tracking-[0.3em] text-[var(--color-rust)]">
              {hero.cart.subtitle}
            </p>
          </FadeIn>
          <FadeIn delay={0.4}>
            <h1 className="font-serif text-4xl md:text-6xl font-medium text-[var(--color-pine)] italic">
              {hero.cart.title}
            </h1>
          </FadeIn>
          <FadeIn delay={0.6} direction="up">
            <p className="text-[var(--color-pine)]/70 leading-relaxed">
              {hero.cart.description}
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Cart Content */}
      <section className="mx-auto max-w-5xl px-6 py-24">
        {!mounted ? (
          <div className="text-center text-[var(--color-pine)]/50">
            Loading...
          </div>
        ) : cart.length === 0 ? (
          // Empty Cart
          <FadeIn className="text-center space-y-8 py-16">
            <div className="space-y-4">
              <p className="font-serif text-2xl text-[var(--color-pine)] italic">
                {labels.emptyCart}
              </p>
              <p className="text-sm text-[var(--color-pine)]/60">
                Discover handcrafted treasures from our collection
              </p>
            </div>
            <Link
              href="/"
              className="inline-block border-2 border-[var(--color-pine)] px-8 py-3 font-mono text-sm uppercase tracking-wider hover:bg-[var(--color-pine)] hover:text-[var(--color-paper)] transition-colors"
            >
              {labels.continueShop}
            </Link>
          </FadeIn>
        ) : (
          // Cart with items
          <div className="grid gap-12 lg:grid-cols-3">
            {/* Cart Items */}
            <div className="space-y-6 lg:col-span-2">
              <FadeIn className="flex items-center justify-between border-b border-[var(--color-stone)] pb-4">
                <h2 className="font-serif text-2xl text-[var(--color-pine)]">
                  Your Items ({cart.length})
                </h2>
                {cart.length > 0 && (
                  <button
                    onClick={clearCart}
                    className="text-xs text-[var(--color-rust)] hover:underline uppercase tracking-wider"
                  >
                    Clear All
                  </button>
                )}
              </FadeIn>

              <div className="space-y-4">
                {cart.map((item, index) => (
                  <FadeIn key={item.id} delay={index * 0.1} direction="up">
                    <div
                      className="flex gap-4 border border-[var(--color-stone)] bg-white p-4"
                      style={{ borderRadius: "var(--radius-organic)" }}
                    >
                      {/* Image */}
                      <div className="relative h-24 w-24 flex-shrink-0 overflow-hidden bg-gray-100">
                        <Image
                          src={item.image}
                          alt={item.title}
                          fill
                          className="object-cover"
                        />
                      </div>

                      {/* Details */}
                      <div className="flex flex-1 flex-col justify-between">
                        <div>
                          <h3 className="font-serif text-lg text-[var(--color-pine)]">
                            {item.title}
                          </h3>
                          <p className="text-xs text-[var(--color-pine)]/60 uppercase tracking-wider">
                            {item.category}
                          </p>
                        </div>
                        <p className="font-mono text-lg font-bold text-[var(--color-pine)]">
                          {labels.currency}
                          {item.price.toLocaleString("en-IN")}
                        </p>
                      </div>

                      {/* Remove button */}
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="flex-shrink-0 text-[var(--color-pine)]/40 hover:text-[var(--color-rust)] transition-colors"
                        aria-label="Remove item"
                      >
                        <X className="h-5 w-5" />
                      </button>
                    </div>
                  </FadeIn>
                ))}
              </div>
            </div>

            {/* Order Summary */}
            <FadeIn delay={0.3} className="lg:col-span-1">
              <div className="sticky top-24 space-y-6 border border-[var(--color-stone)] bg-white p-6">
                <h3 className="font-serif text-xl text-[var(--color-pine)]">
                  Order Summary
                </h3>

                <div className="space-y-3 border-y border-[var(--color-stone)] py-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-[var(--color-pine)]/70">
                      {labels.subtotal}
                    </span>
                    <span className="font-mono text-[var(--color-pine)]">
                      {labels.currency}
                      {total.toLocaleString("en-IN")}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-[var(--color-pine)]/70">
                      Shipping
                    </span>
                    <span className="font-mono text-xs text-[var(--color-pine)]/60">
                      Calculated at checkout
                    </span>
                  </div>
                </div>

                <div className="flex justify-between font-serif text-lg">
                  <span className="text-[var(--color-pine)]">
                    {labels.total}
                  </span>
                  <span className="font-mono font-bold text-[var(--color-pine)]">
                    {labels.currency}
                    {total.toLocaleString("en-IN")}
                  </span>
                </div>

                <button className="w-full bg-[var(--color-pine)] py-4 font-mono text-sm uppercase tracking-wider text-[var(--color-paper)] hover:bg-[var(--color-pine)]/90 transition-colors">
                  {labels.checkout}
                </button>

                <Link
                  href="/"
                  className="block text-center text-xs text-[var(--color-pine)]/60 hover:text-[var(--color-rust)] uppercase tracking-wider"
                >
                  {labels.continueShop}
                </Link>
              </div>
            </FadeIn>
          </div>
        )}
      </section>
    </>
  );
}
