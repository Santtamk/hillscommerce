"use client";

import Link from "next/link";
import { useCartStore } from "@/store/cartStore";
import { siteContent } from "@/data/content";
import { ShoppingBag, MountainSnow, Heart, X } from "lucide-react";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import { useWishlistStore } from "@/store/wishlistStore";
import { products } from "@/data/products";
import Image from "next/image";

export default function Navbar() {
  const { cart } = useCartStore();
  const { wishlist } = useWishlistStore();
  const { site } = siteContent;
  // Hydration fix for persisted store
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
    useCartStore.getState().fetchFromServer();
    useWishlistStore.getState().fetchWishlist();
  }, []);

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

          
          {/* Wishlist Dropdown */}
          <div className="group relative flex items-center">
            <Link href="/profile" className="relative flex items-center gap-2 rounded-full border border-transparent px-2 py-2 text-[var(--color-pine)]/80 hover:text-[var(--color-rust)] transition-all">
              <Heart className="h-5 w-5" />
              {mounted && wishlist.length > 0 && (
                <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-[var(--color-rust)] text-[9px] text-white font-mono">
                  {wishlist.length}
                </span>
              )}
            </Link>

            {/* Dropdown Content */}
            <div className="absolute top-full right-0 mt-2 w-80 translate-y-2 opacity-0 invisible group-hover:translate-y-0 group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
               <div className="rounded-[var(--radius-organic)] border border-[var(--color-stone)] bg-white p-4 shadow-xl">
                 <h4 className="font-serif text-lg text-[var(--color-pine)] mb-3 border-b border-[var(--color-stone)] pb-2 flex justify-between items-center">
                   <span>Wishlist</span>
                   <span className="text-xs font-mono text-[var(--color-pine)]/50">{wishlist.length} items</span>
                 </h4>
                 
                 {wishlist.length === 0 ? (
                   <div className="text-center py-6 text-sm text-[var(--color-pine)]/60">
                     Your wishlist is empty.
                   </div>
                 ) : (
                   <div className="max-h-64 overflow-y-auto space-y-3 pr-1 scrollbar-thin scrollbar-thumb-[var(--color-pine)]/20">
                     {wishlist.map((item) => {
                       const product = products.find(p => p.id === item.id);
                       if (!product) return null;
                       return (
                         <div key={item.id} className="flex items-start gap-3 group/item">
                           <div className="relative h-12 w-12 flex-shrink-0 overflow-hidden rounded-md bg-gray-100">
                             <Image src={product.image} alt={product.title} fill className="object-cover" />
                           </div>
                           <div className="flex-1 min-w-0">
                             <Link href={`/shop?product=${product.slug}`} className="block truncate text-sm font-medium text-[var(--color-pine)] hover:text-[var(--color-rust)]">
                               {product.title}
                             </Link>
                             <p className="text-xs text-[var(--color-pine)]/60">₹{product.price}</p>
                           </div>
                           <button 
                             onClick={(e) => {
                               e.preventDefault();
                               useWishlistStore.getState().removeFromWishlist(item.id);
                             }}
                             className="text-[var(--color-pine)]/40 hover:text-red-500 transition-colors p-1"
                             title="Remove"
                           >
                             <X className="h-4 w-4" />
                           </button>
                         </div>
                       );
                     })}
                   </div>
                 )}
                 
                 <div className="mt-4 pt-3 border-t border-[var(--color-stone)] text-center">
                   <Link href="/profile" className="block w-full rounded-full bg-[var(--color-pine)] py-2 text-xs font-bold uppercase tracking-wider text-[var(--color-paper)] hover:opacity-90 transition-opacity">
                     View Full Wishlist
                   </Link>
                 </div>
               </div>
            </div>
          </div>
          
          <Link href="/cart" className="group relative flex items-center gap-2 rounded-full border border-[var(--color-pine)]/20 px-4 py-2 hover:bg-[var(--color-pine)] hover:text-[var(--color-paper)] transition-all">
            <ShoppingBag className="h-4 w-4" />
            <span className="text-xs font-bold uppercase tracking-wider">Cart</span>
            {mounted && cart.length > 0 && (
              <span className="ml-1 flex h-5 w-5 items-center justify-center rounded-full bg-[var(--color-rust)] text-[10px] text-white font-mono">
                {cart.length}
              </span>
            )}
          </Link>

          <SignedIn>
            <UserButton />
          </SignedIn>
          <SignedOut>
            <SignInButton mode="modal">
              <button className="text-sm font-medium uppercase tracking-widest text-[var(--color-pine)/80] hover:text-[var(--color-rust)]">
                Sign In
              </button>
            </SignInButton>
          </SignedOut>
        </div>
      </div>
    </nav>
  );
}
