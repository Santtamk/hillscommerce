import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function POST(req: Request) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { productId } = await req.json(); // Note: This will be the STATIC product ID now, or sanity ID?
    // User request: "Switch backend... keeping Sanity for Product Data".
    // "On GET: Select all product_ids...".
    // If we use Supabase for user data, we should probably store the STATIC ID or consistent ID to link back.
    // However, the `HeartButton` currently passes... let's check.
    // `wishlistStore` passes `sanityId` to the API. 
    // Ideally we should verify if we want to store Sanity ID or local ID in Supabase.
    // If the frontend product cards use Sanity IDs for the heart button actions, we should probably store Sanity IDs or whatever ID is unique.
    // But the `CURRENT_STATE` says `HeartButton` uses Sanity ID.
    // AND the GET endpoint needs to return `product_id`.
    // Let's assume we store the `productId` passed from the frontend, which is currently receiving `sanityId` in `HeartButton`.
    // Wait, the new `wishlistStore` refactor in step 294 passes `sanityId` as `productId` payload?
    // `addToWishlist`: `body: JSON.stringify({ productId: sanityId })`.
    // `removeFromWishlist`: `body: JSON.stringify({ productId: itemToRemove.sanityId })`.
    // So we are storing Sanity IDs in Supabase. This is fine.

    if (!productId) {
      return NextResponse.json({ message: "Product ID is required" }, { status: 400 });
    }

    // Check availability (optional? Supabase constraints?)
    // Basic logic: Toggle. Check if exists.
    
    // User goal says "Insert/Delete rows".
    // Let's check first.
    const { data: existing } = await supabase
        .from('wishlists')
        .select('*')
        .eq('user_id', userId)
        .eq('product_id', productId)
        .single();

    if (existing) {
        // Remove
        const { error } = await supabase
            .from('wishlists')
            .delete()
            .eq('user_id', userId)
            .eq('product_id', productId);
        
        if (error) throw error;
        return NextResponse.json({ message: "Removed from wishlist", action: "removed" });
    } else {
        // Add
        const { error } = await supabase
            .from('wishlists')
            .insert({ user_id: userId, product_id: productId });
        
        if (error) throw error;
        return NextResponse.json({ message: "Added to wishlist", action: "added" });
    }

  } catch (error) {
    console.error("Wishlist API Error:", error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}

export async function GET(req: Request) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { data, error } = await supabase
        .from('wishlists')
        .select('product_id')
        .eq('user_id', userId);

    if (error) throw error;

    // The frontend expects array of { id, _id }.
    // If we only store `product_id` (which is the Sanity ID), we can only return `_id`.
    // The frontend `wishlistStore.ts` does: `mapped = data.map(item => ({ id: item.id, sanityId: item._id }))`.
    // Wait, current logic in store assumes the API returns populated products or at least pairs of ID/SanityID?
    // Old API returned: `products[]->{ id, _id }`.
    // New API returns rows from Supabase: `[{ product_id: "..." }, ...]`.
    // PROBLEM: Supabase doesn't know the mapping between Sanity ID and Static ID "p1".
    // The Frontend `wishlistStore` uses `id` (static) for `isInWishlist`.
    // We need to return `{ _id: ..., id: ... }`.
    // But we don't have the static ID in Supabase if we only store Sanity ID.
    // Solution: 
    // 1. Store BOTH in Supabase? No, schema is just `product_id`.
    // 2. Fetch all products in `GET` to map? Expensive.
    // 3. Just return the list of Sanity IDs. The Frontend has `products` (static data). It can find the static ID where `_id` matches?
    // BUT the frontend static data doesn't have `_id` on it by default. We have `useSanityIdMap`.
    
    // Let's look at `wishlistStore.ts` fetch logic again.
    // `if (Array.isArray(data)) { const mapped = data.map((item: any) => ({ id: item.id, sanityId: item._id })) ... }`
    // It expects `id` and `_id`.
    
    // If I only return Sanity IDs, I break the store.
    // Ideally, I should store the STATIC ID in Supabase if that's the primary key for the frontend logic.
    // `wishlistStore` uses `id` (static) for keys.
    // If I store Static ID in Supabase, I can return it easily.
    // BUT `HeartButton` passes `sanityId` to the API.
    
    // Pivot: Let's modify `HeartButton` / `wishlistStore` to pass the STATIC ID to the API.
    // `wishlistStore` has `addToWishlist(product, sanityId)`. It has `product.id`.
    // Let's change the API payload to be the STATIC ID?
    // If we do that, we store "product-1" in Supabase.
    // GET returns "product-1".
    // Frontend maps `id: "product-1"`. 
    // We still need `sanityId` for... `HeartButton`? `HeartButton` takes `sanityId`.
    // Actually, does `HeartButton` need `sanityId` if the API just takes static ID?
    // Maybe not.
    
    // However, I must follow constraints: "DO NOT modify store/cartStore.ts logic unless...". Store `wishlistStore.ts` is fair game?
    // "Refactor API ... On GET: Select all product_ids".
    
    // Let's TRY to return what the store expects by inferring or just fixing the store to work with what we have.
    // If I return `[{ _id: "sanity_id" }]` from API.
    // I need to map it to `{ id: "static_id", sanityId: "sanity_id" }`.
    // I can do this mapping on the SERVER (fetch Sanity map) or CLIENT.
    // Doing it on SERVER in GET route seems cleaner for the frontend store.
    
    // SERVER SIDE MAPPING:
    // 1. Fetch Supabase wishlist items (Sanity IDs).
    // 2. Fetch Sanity product map (Static ID <-> Sanity ID).
    // 3. Join and return `{ id, _id }`.
    
    // Let's do that. It keeps the frontend happy.
    
    const wishlistItems = data || [];
    const sanityIds = wishlistItems.map(row => row.product_id);
    
    if (sanityIds.length === 0) return NextResponse.json([]);
    
    // Fetch mapping from Sanity
    // We want the 'id' (static) for these _ids.
    // Query: `*[_type == "product" && _id in $ids]{ "id": id, "_id": _id }`
    
    const { writeClient } = await import("@/lib/sanity"); // Import lazily
    const query = `*[_type == "product" && _id in $ids]{ "id": id, "_id": _id }`;
    const mappedProducts = await writeClient.fetch(query, { ids: sanityIds });
    
    return NextResponse.json(mappedProducts);

  } catch (error) {
    console.error("Wishlist GET Error:", error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}
