import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { Product } from '@/data/products';

interface CartState {
  cart: Product[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: string) => void;
  clearCart: () => void;
  syncWithServer: (cart: Product[]) => Promise<void>;
  fetchFromServer: () => Promise<void>;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      cart: [],
      addToCart: (product) => {
        const { cart } = get();
        const exists = cart.find((item) => item.id === product.id);
        if (!exists && product.status === 'available') {
          const newCart = [...cart, product];
          set({ cart: newCart });
          get().syncWithServer(newCart);
        }
      },
      removeFromCart: (productId) => {
        const newCart = get().cart.filter((item) => item.id !== productId);
        set({ cart: newCart });
        get().syncWithServer(newCart);
      },
      clearCart: () => {
        set({ cart: [] });
        get().syncWithServer([]);
      },
      syncWithServer: async (newCart) => {
        // Debounce or fire and forget? For now, fire and forget.
        // We map the product to just { id, quantity: 1 } for now since we don't have quantity in store yet.
        // Wait, the store is just Product[]. So quantity is always 1 per item?
        // "cart" in store is Product[].
        const items = newCart.map(p => ({ id: p.id, quantity: 1 }));
        
        try {
           await fetch('/api/cart', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ items }),
          });
        } catch (err) {
          console.error("Failed to sync cart", err);
        }
      },
      fetchFromServer: async () => {
        try {
          const res = await fetch('/api/cart');
          if (res.ok) {
            const data = await res.json();
            // data.items is array of { quantity, product: { ... } }
            // We need to map back to Product[] flat list.
            // If quantity > 1, we might need to duplicate items or update store to support quantity.
            // CURRENT STORE ONLY SUPPORTS Product[] (no quantity field on product interface explicitly used for logic, strictly array of objects).
            // I will just map the products back.
            // CAUTION: If user has 2 of the same, our current logic `find(id)` prevents duplicates in `addToCart`.
            // So we assume max 1 per item.
            const products = data.items?.map((item: any) => item.product).filter(Boolean) || [];
            set({ cart: products });
          }
        } catch (err) {
           console.error("Failed to fetch cart", err);
        }
      }
    }),
    {
      name: 'himalayan-cart-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
);
