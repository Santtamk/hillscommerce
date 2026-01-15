import { auth, currentUser } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { writeClient } from "@/lib/sanity";

export async function GET(req: Request) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const query = `*[_type == "cart" && userId == $userId][0]{
      items[]{
        quantity,
        product->{
          id,
          name,
          price,
          image,
          slug
        }
      }
    }`;
    const cart = await writeClient.fetch(query, { userId });

    return NextResponse.json(cart || { items: [] });
  } catch (error) {
    console.error("Cart GET Error:", error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { items } = await req.json(); // Expecting array of { productId, quantity }

    // Transform items to Sanity format references
    // Note: This expects we have the Sanity Document ID of the product.
    // Since our product import script uses 'id' from data as 'id' field, but Sanity generates its own _id...
    // Wait, in my import script I didn't specify _id. So Sanity generated random ones.
    // The data/products.ts 'id' is just a string field.
    // So the frontend knows 'id' (e.g., '1'), but Sanity needs '_id' for reference.
    // PROBLEM: Frontend Cart has '1', '2'. Sanity schema refs need '_id'.
    // SOLUTION: We need to lookup the product _id by the text 'id' before saving.
    
    // For this simple task, I will do a quick lookup here or assume the frontend sends the mapped object if it has it.
    // Better: Fetch all products and map them? No, too heavy.
    // Let's assume the frontend sends the *frontend* cart items, and we look them up.
    
    // Actually, to make this robust:
    // 1. Fetch all products whose `id` (custom field) is in the list.
    // 2. Map custom `id` to `_id`.
    // 3. Save references.

    const productIds = items.map((i: any) => i.id);
    // Sanity query to get _id for these custom ids
    // Assuming product schema has 'id' field.
    const products = await writeClient.fetch(
      `*[_type == "product" && id in $ids]{_id, id}`,
      { ids: productIds }
    );

    const sanityItems = items.map((item: any) => {
      const sanityProduct = products.find((p: any) => p.id === item.id);
      if (!sanityProduct) return null; // Skip if not found
      return {
        _key: item.id, // Use stable key
        product: { _type: "reference", _ref: sanityProduct._id },
        quantity: item.quantity,
      };
    }).filter(Boolean);

    // Create or Replace the cart
    // Using transaction to ensure consistency? Or just a simple patch/create.
    // We want to overwrite the server cart with the local cart upon sync (or merge).
    // For simplicity: Overwrite server cart with latest state from client.
    
    // Check if cart exists
    const existingCart = await writeClient.fetch(
      `*[_type == "cart" && userId == $userId][0]._id`,
      { userId }
    );

    if (existingCart) {
      await writeClient
        .patch(existingCart)
        .set({ items: sanityItems, updatedAt: new Date().toISOString() })
        .commit();
    } else {
      await writeClient.create({
        _type: "cart",
        userId,
        items: sanityItems,
        updatedAt: new Date().toISOString(),
      });
    }

    return NextResponse.json({ message: "Cart synced" });
  } catch (error) {
    console.error("Cart POST Error:", error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}
