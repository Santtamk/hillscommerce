import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { Product, products as staticProducts } from "@/data/products";

interface WishlistItem {
  id: string; // Static ID
  sanityId: string; // Sanity _id
}

interface WishlistState {
  wishlist: WishlistItem[];
  addToWishlist: (product: Product, sanityId: string) => Promise<void>;
  removeFromWishlist: (productId: string) => Promise<void>;
  isInWishlist: (productId: string) => boolean;
  fetchWishlist: () => Promise<void>;
  syncWithServer: () => Promise<void>;
}

export const useWishlistStore = create<WishlistState>()(
  persist(
    (set, get) => ({
      wishlist: [],
      
      isInWishlist: (productId) => {
        return get().wishlist.some(item => item.id === productId);
      },

      addToWishlist: async (product, sanityId) => {
        const { wishlist } = get();
        if (get().isInWishlist(product.id)) return;

        // Optimistic update
        const newItem = { id: product.id, sanityId };
        set({ wishlist: [...wishlist, newItem] });

        try {
          await fetch("/api/wishlist", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ productId: sanityId }),
          });
        } catch (error) {
          console.error("Failed to add to wishlist", error);
          // Revert on error
          set({ wishlist }); 
        }
      },

      removeFromWishlist: async (productId) => {
        const { wishlist } = get();
        const itemToRemove = wishlist.find(item => item.id === productId);
        if (!itemToRemove) return;

        // Optimistic update
        set({ wishlist: wishlist.filter(item => item.id !== productId) });

        try {
          await fetch("/api/wishlist", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ productId: itemToRemove.sanityId }),
          });
        } catch (error) {
          console.error("Failed to remove from wishlist", error);
          // Revert
          set({ wishlist });
        }
      },

      fetchWishlist: async () => {
        try {
          const res = await fetch("/api/wishlist");
          if (!res.ok) return;
          
          const data = await res.json();
          // data is array of { id, _id }
          if (Array.isArray(data)) {
            const mapped = data.map((item: any) => ({
              id: item.id,
              sanityId: item._id
            })).filter(i => i.id && i.sanityId);
            
            set({ wishlist: mapped });
          }
        } catch (error) {
          console.error("Failed to fetch wishlist", error);
        }
      },

      syncWithServer: async () => {
         await get().fetchWishlist();
      }
    }),
    {
      name: "himalayan-wishlist-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
