"use client";

import { Heart } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@clerk/nextjs";

interface HeartButtonProps {
  productId: string;
}

export default function HeartButton({ productId }: HeartButtonProps) {
  const [isLiked, setIsLiked] = useState(false); // Ideally this should be initialized with real data
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { isSignedIn } = useAuth();

  const handleToggle = async () => {
    if (!isSignedIn) {
      router.push("/sign-in"); // Or open modal
      return;
    }

    setIsLoading(true);
    // Optimistic update
    setIsLiked((prev) => !prev);

    try {
      const res = await fetch("/api/wishlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId }),
      });

      if (!res.ok) {
        throw new Error("Failed to update wishlist");
      }
      
      router.refresh();
    } catch (error) {
      console.error(error);
      setIsLiked((prev) => !prev); // Revert on error
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button
      onClick={handleToggle}
      disabled={isLoading}
      className="group relative flex items-center justify-center p-3 transition-transform active:scale-95"
    >
      <Heart
        className={`h-6 w-6 transition-colors ${
          isLiked
            ? "fill-[var(--color-rust)] text-[var(--color-rust)]"
            : "text-[var(--color-pine)] group-hover:text-[var(--color-rust)]"
        }`}
      />
    </button>
  );
}
