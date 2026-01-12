import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { Product } from '@/data/products';

interface CartState {
  cart: Product[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: string) => void;
  clearCart: () => void;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      cart: [],
      addToCart: (product) => {
        const { cart } = get();
        // Thrift logic: Item is unique, only add if not already in cart
        const exists = cart.find((item) => item.id === product.id);
        if (!exists && product.status === 'available') {
          set({ cart: [...cart, product] });
        }
      },
      removeFromCart: (productId) => {
        set({ cart: get().cart.filter((item) => item.id !== productId) });
      },
      clearCart: () => set({ cart: [] }),
    }),
    {
      name: 'himalayan-cart-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
);
