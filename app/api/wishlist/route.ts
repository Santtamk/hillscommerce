import { auth, currentUser } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { writeClient } from "@/lib/sanity";

export async function POST(req: Request) {
  try {
    const { userId } = await auth();
    const user = await currentUser();

    if (!userId || !user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { productId } = await req.json();

    if (!productId) {
      return NextResponse.json({ message: "Product ID is required" }, { status: 400 });
    }

    // Check if a wishlist already exists for this user
    const query = `*[_type == "wishlist" && userId == $userId][0]`;
    const params = { userId };
    const existingWishlist = await writeClient.fetch(query, params);

    if (existingWishlist) {
      // Check if product is already in wishlist
      const isAlreadyInWishlist = existingWishlist.products?.some(
        (ref: { _ref: string }) => ref._ref === productId
      );

      if (isAlreadyInWishlist) {
        // Remove from wishlist
        await writeClient
          .patch(existingWishlist._id)
          .unset([`products[_ref=="${productId}"]`])
          .commit();
        return NextResponse.json({ message: "Removed from wishlist", action: "removed" });
      } else {
        // Add to wishlist
        await writeClient
          .patch(existingWishlist._id)
          .setIfMissing({ products: [] })
          .append("products", [{ _type: "reference", _ref: productId, _key: productId }])
          .commit();
        return NextResponse.json({ message: "Added to wishlist", action: "added" });
      }
    } else {
      // Create new wishlist
      await writeClient.create({
        _type: "wishlist",
        userId,
        products: [{ _type: "reference", _ref: productId, _key: productId }],
      });
      return NextResponse.json({ message: "Wishlist created and product added", action: "created" });
    }
  } catch (error) {
    console.error("Wishlist API Error:", error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}
