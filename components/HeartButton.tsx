"use client";

import { Heart } from "lucide-react";
import { useRouter } from "next/navigation";
import { useAuth } from "@clerk/nextjs";
import { useWishlistStore } from "@/store/wishlistStore";
import { Product } from "@/data/products";

interface HeartButtonProps {
  product: Product;
  sanityId: string;
}

export default function HeartButton({ product, sanityId }: HeartButtonProps) {
  const router = useRouter();
  const { isSignedIn } = useAuth();
  const { isInWishlist, addToWishlist, removeFromWishlist } = useWishlistStore();

  const isLiked = isInWishlist(product.id);

  const handleToggle = async (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent navigating if inside a Link
    
    if (!isSignedIn) {
      router.push("/sign-in");
      return;
    }

    if (isLiked) {
      await removeFromWishlist(product.id);
    } else {
      await addToWishlist(product, sanityId);
    }
    
    router.refresh();
  };

  return (
    <button
      onClick={handleToggle}
      className="group relative flex items-center justify-center p-3 transition-transform active:scale-95 z-30"
    >
      <Heart
        className={`h-6 w-6 transition-colors drop-shadow-sm ${
          isLiked
            ? "fill-[var(--color-rust)] text-[var(--color-rust)]"
            : "text-[var(--color-pine)] group-hover:text-[var(--color-rust)]"
        }`}
      />
    </button>
  );
}
