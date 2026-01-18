import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import Image from "next/image";
import { sanityClient } from "@/lib/sanity";
import { products as staticProducts } from "@/data/products";
import ProductCard from "@/components/ProductCard";

export default async function ProfilePage() {
  const user = await currentUser();

  if (!user) {
    redirect("/sign-in");
  }

  // Fetch Wishlist
  const query = `*[_type == "wishlist" && userId == $userId][0]{
    products[]->{
      id,
      _id
    }
  }`;
  
  const wishlistData = await sanityClient.fetch(query, { userId: user.id });
  const wishlistItems = wishlistData?.products || [];
  const wishlistIds = wishlistItems.map((item: any) => item.id);
  
  // Map Sanity _id for the buttons
  const sanityIdMap = wishlistItems.reduce((acc: any, item: any) => {
    acc[item.id] = item._id;
    return acc;
  }, {});

  const myWishlistProducts = staticProducts.filter(p => wishlistIds.includes(p.id));

  return (
    <div className="min-h-screen bg-[var(--color-paper)] px-6 py-12 md:px-12 lg:px-24">
      <div className="mx-auto max-w-6xl">
        <h1 className="mb-8 font-serif text-4xl font-light text-[var(--color-pine)]">
          My Account
        </h1>

        <div className="grid gap-8 md:grid-cols-3">
          {/* Member Card */}
          <div className="col-span-1 h-fit rounded-[var(--radius-organic)] border border-[var(--color-stone)] bg-white p-6 shadow-sm sticky top-24">
            <div className="flex flex-col items-center text-center">
              <div className="relative mb-4 h-24 w-24 overflow-hidden rounded-full border-2 border-[var(--color-paper)] shadow-md">
                <Image
                  src={user.imageUrl}
                  alt={user.fullName || "User"}
                  fill
                  className="object-cover"
                />
              </div>
              <h2 className="font-serif text-xl font-medium text-[var(--color-pine)]">
                {user.fullName}
              </h2>
              <p className="text-sm text-[var(--color-pine)]/60">
                {user.primaryEmailAddress?.emailAddress}
              </p>
              <div className="mt-4 w-full border-t border-[var(--color-stone)] pt-4">
                <span className="block text-xs uppercase tracking-widest text-[var(--color-pine)]/40">
                  Member Since
                </span>
                <span className="text-sm font-medium">
                  {new Date(user.createdAt).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                  })}
                </span>
              </div>
            </div>
          </div>

          {/* Wishlist Section */}
          <div className="col-span-1 md:col-span-2">
            <div className="rounded-[var(--radius-organic)] border border-[var(--color-stone)] bg-[#FDFBF7] p-8 min-h-[50vh]">
              <h3 className="mb-6 border-b border-[var(--color-stone)] pb-2 font-serif text-2xl text-[var(--color-pine)] flex items-center justify-between">
                <span>My Wishlist</span>
                <span className="text-sm font-sans font-normal text-[var(--color-pine)]/60 bg-[var(--color-pine)]/5 px-3 py-1 rounded-full">
                  {myWishlistProducts.length} items
                </span>
              </h3>
              
              {myWishlistProducts.length > 0 ? (
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  {myWishlistProducts.map((product) => (
                    <ProductCard 
                      key={product.id} 
                      product={product} 
                      sanityId={sanityIdMap[product.id]}
                    />
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-12 text-center h-full">
                  <p className="mb-4 text-lg text-[var(--color-pine)]/60">
                    Your wishlist is waiting to be filled with Himalayan treasures.
                  </p>
                  <a href="/shop" className="rounded-full bg-[var(--color-pine)] px-6 py-3 text-sm font-bold uppercase tracking-wider text-[var(--color-paper)] transition-colors hover:bg-[var(--color-pine)]/90">
                    Explore Shop
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
