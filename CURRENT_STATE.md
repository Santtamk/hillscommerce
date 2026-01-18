# Current Project State

## 1. Tech Stack & Dependencies

- **Core Framework**: Next.js 16.1.1 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4, Framer Motion, Lucide React
- **Authentication**: Clerk (`@clerk/nextjs`)
- **CMS / Database**:
  - **Sanity.io**: Product Content (`next-sanity`)
  - **Supabase**: User Data (Cart, Wishlist) (`@supabase/supabase-js`)
- **State Management**: Zustand (`zustand`) with LocalStorage persistence

## 2. Project Structure

- **`app/`**: Next.js App Router
  - **`api/`**:
    - `cart/`, `wishlist/` (Supabase backend)
    - `webhooks/stripe/` (Skeleton)
  - **`layout.tsx`**: Root layout wrapping app in `<ClerkProvider>`
  - **`(routes)`**: `/shop`, `/cart`, `/profile`, `/about`
- **`components/`**: UI Building blocks (`Navbar`, `ProductCard`, `HeartButton`)
- **`store/`**: Global State logic
  - `cartStore.ts`: Shopping cart logic
  - `wishlistStore.ts`: Wishlist logic
- **`schema/`**: Sanity Content Definitions
  - `product.ts` (Inventory managed here)
- **`lib/`**: configuration (`sanity.ts`, `supabase.ts`)
- **`data/`**: Static fallback data (`products.ts`)

## 3. Logic Analysis

### Authentication

- **Integration**: `ClerkProvider` wraps the entire application in `app/layout.tsx`.
- **Protection**: `middleware.ts` uses `clerkMiddleware` to protect `/profile(.*)` and `/api/wishlist(.*)` routes.

### Cart State

- **Management**: Zustand store (`useCartStore`) handles client-side state.
- **Persistence**:
  - **Local**: `persist` middleware saves to `localStorage`.
  - **Server**: `syncWithServer` action calls `POST /api/cart` to save state to **Supabase** (`carts` table).
  - **Hydration**: Navbar calls `fetchFromServer()` on mount to retrieve the latest persistent cart.

### Wishlist State

- **Management**: `useWishlistStore` handles global wishlist state.
- **Sync**: Optimistic updates with background API calls (`POST /api/wishlist`) to **Supabase** (`wishlists` table).

### Sanity Schema (`product`)

- **Fields**:
  - `id` (string, read-only)
  - `title` (string)
  - `slug` (slug)
  - `price` (number)
  - `description` (text)
  - `category` (string: Tea, Pantry, Textiles, etc.)
  - `status` (string: Available, Sold)
  - `image` (image with hotspot)
  - **[NEW]** `stock` (number, min 0)
  - **[NEW]** `isOutOfStock` (boolean, read-only)

## 4. Integration Points

- **API Routes**:
  - `GET/POST /api/cart`: Syncs cart state (Supabase).
  - `GET/POST /api/wishlist`: Toggles and fetches wishlist items (Supabase).
- **Stripe**: Webhook skeleton created `app/api/webhooks/stripe`.
