"use client";

import Image from "next/image";
import { Product } from "@/data/products";
import { useCartStore } from "@/store/cartStore";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import HeartButton from "@/components/HeartButton";


interface ProductCardProps {
  product: Product;
  sanityId?: string;
}

export default function ProductCard({ product, sanityId }: ProductCardProps) {
  const { addToCart, cart } = useCartStore();
  const isInCart = cart.some((item) => item.id === product.id);
  const isSold = product.status === "sold";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="group relative flex flex-col h-full bg-white p-4 shadow-sm transition-transform hover:-translate-y-1 hover:shadow-md"
      style={{
        borderRadius: "var(--radius-organic)", // Use CSS variable or fallback
      }}
    >
      {/* Heart Button */}
      {sanityId && (
        <div className="absolute top-2 right-2 z-20">
          <HeartButton product={product} sanityId={sanityId} />
        </div>
      )}

      {/* Tape effect (purely decorative CSS potential) */}
      <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-24 h-6 bg-white/40 rotate-[-1deg] backdrop-blur-sm border border-white/20 z-10 opacity-70" />

      {/* Image Container */}
      <div className="relative aspect-[4/5] w-full overflow-hidden bg-gray-100 grayscale-[10%] group-hover:grayscale-0 transition-all duration-500">
        <Image
          src={product.image}
          alt={product.title}
          fill
          className="object-cover"
        />
        
        {/* Sold Out Stamp */}
        {isSold && (
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rotate-[-15deg] border-4 border-red-800/80 px-4 py-2 text-2xl font-bold uppercase tracking-widest text-red-800/80 mix-blend-multiply opacity-90">
            Sold Out
          </div>
        )}
      </div>

      {/* Info */}
      <div className="mt-4 flex flex-col flex-1 justify-between font-serif min-h-[5rem]">
        <div className="space-y-1">
          <h3 className="text-lg font-medium leading-tight text-[var(--color-pine)] line-clamp-2 min-h-[3rem]">
            {product.title}
          </h3>
          <p className="font-mono text-xs text-[var(--color-rust)]">
            {product.category}
          </p>
        </div>
        <div className="mt-2 font-mono text-lg font-bold tracking-tighter">
          ₹{product.price.toLocaleString("en-IN")}
        </div>
      </div>

      {/* Action Button */}
      {!isSold && (
        <button
          onClick={() => addToCart(product)}
          disabled={isInCart}
          className={cn(
            "mt-4 w-full border border-[var(--color-pine)] py-2 text-sm uppercase tracking-wider transition-colors hover:bg-[var(--color-pine)] hover:text-[var(--color-paper)] disabled:cursor-not-allowed disabled:opacity-50",
            isInCart && "bg-[var(--color-stone)] border-[var(--color-stone)]"
          )}
        >
          {isInCart ? "In Cart" : "Add to Cart"}
        </button>
      )}
    </motion.div>
  );
}
