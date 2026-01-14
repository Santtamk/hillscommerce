import { Github, Instagram, Twitter } from "lucide-react";
import Link from "next/link";
import FadeIn from "@/components/FadeIn";

export default function Footer() {
  return (
    <footer className="w-full border-t border-[var(--color-stone)] bg-[#FDFBF7] px-6 py-12">
      <FadeIn direction="up" fullWidth>
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 md:flex-row px-4">
          {/* Brand */}
          <div className="flex flex-col items-center md:items-start">
            <Link href="/" className="font-serif text-2xl font-bold tracking-tight text-[var(--color-pine)]">
              Himalayan Nostalgia
            </Link>
            <p className="mt-2 text-xs text-[var(--color-pine)]/60">
              © {new Date().getFullYear()} All rights reserved.
            </p>
            <p className="mt-1 text-[10px] text-[var(--color-stone)]/50 font-mono tracking-widest uppercase">
              Developed by Santamk
            </p>
          </div>

          {/* Links */}
          <div className="flex gap-8 text-sm text-[var(--color-pine)]/80">
            <Link href="/shop" className="hover:text-[var(--color-rust)] transition-colors">
              Shop
            </Link>
            <Link href="/about" className="hover:text-[var(--color-rust)] transition-colors">
              About
            </Link>
            <Link href="/cart" className="hover:text-[var(--color-rust)] transition-colors">
              Cart
            </Link>
          </div>

          {/* Socials */}
          <div className="flex gap-4 text-[var(--color-pine)]/70">
            <a href="#" className="hover:text-[var(--color-rust)] transition-colors" aria-label="Instagram">
              <Instagram size={20} />
            </a>
            <a href="#" className="hover:text-[var(--color-rust)] transition-colors" aria-label="Twitter">
              <Twitter size={20} />
            </a>
            <a href="https://github.com/Santtamk" target="_blank" rel="noopener noreferrer" className="hover:text-[var(--color-rust)] transition-colors" aria-label="GitHub">
              <Github size={20} />
            </a>
          </div>
        </div>
      </FadeIn>
    </footer>
  );
}
