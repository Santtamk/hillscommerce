"use client";

import Link from "next/link";
import { useCartStore } from "@/store/cartStore";
import { siteContent } from "@/data/content";
import { ShoppingBag, MountainSnow } from "lucide-react";
import { useEffect, useState } from "react";

export default function Navbar() {
  const { cart } = useCartStore();
  const { site } = siteContent;
  // Hydration fix for persisted store
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return (
    <nav className="sticky top-0 z-40 w-full border-b border-[var(--color-stone)] bg-[var(--color-paper)]/85 backdrop-blur-md transition-all">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        {/* Logo */}
        <Link 
          href="/" 
          className="flex items-center gap-2 font-serif text-2xl font-bold tracking-tight text-[var(--color-pine)] hover:opacity-80 transition-opacity"
        >
          <MountainSnow className="h-6 w-6 text-[var(--color-rust)]" />
          <span>{site.name}</span>
        </Link>

        {/* Actions */}
        <div className="flex items-center gap-6">
          <Link href="/shop" className="hidden text-sm font-medium uppercase tracking-widest text-[var(--color-pine)/80] hover:text-[var(--color-rust)] sm:block">
            Shop
          </Link>
          <Link href="/about" className="hidden text-sm font-medium uppercase tracking-widest text-[var(--color-pine)/80] hover:text-[var(--color-rust)] sm:block">
            About
          </Link>

          <Link href="/cart" className="group relative flex items-center gap-2 rounded-full border border-[var(--color-pine)]/20 px-4 py-2 hover:bg-[var(--color-pine)] hover:text-[var(--color-paper)] transition-all">
            <ShoppingBag className="h-4 w-4" />
            <span className="text-xs font-bold uppercase tracking-wider">Cart</span>
            {mounted && cart.length > 0 && (
              <span className="ml-1 flex h-5 w-5 items-center justify-center rounded-full bg-[var(--color-rust)] text-[10px] text-white font-mono">
                {cart.length}
              </span>
            )}
          </Link>
        </div>
      </div>
    </nav>
  );
}
