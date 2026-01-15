import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import Image from "next/image";

export default async function ProfilePage() {
  const user = await currentUser();

  if (!user) {
    redirect("/sign-in");
  }

  return (
    <div className="min-h-screen bg-[var(--color-paper)] px-6 py-12 md:px-12 lg:px-24">
      <div className="mx-auto max-w-4xl">
        <h1 className="mb-8 font-serif text-4xl font-light text-[var(--color-pine)]">
          My Account
        </h1>

        <div className="grid gap-8 md:grid-cols-3">
          {/* Member Card */}
          <div className="col-span-1 h-fit rounded-[var(--radius-organic)] border border-[var(--color-stone)] bg-white p-6 shadow-sm">
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

          {/* Wishlist Placeholder */}
          <div className="col-span-1 md:col-span-2">
            <div className="rounded-[var(--radius-organic)] border border-[var(--color-stone)] bg-[#FDFBF7] p-8">
              <h3 className="mb-6 border-b border-[var(--color-stone)] pb-2 font-serif text-2xl text-[var(--color-pine)]">
                My Wishlist
              </h3>
              
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <p className="mb-4 text-lg text-[var(--color-pine)]/60">
                  Your wishlist is waiting to be filled with Himalayan treasures.
                </p>
                <button className="rounded-full bg-[var(--color-pine)] px-6 py-3 text-sm font-bold uppercase tracking-wider text-[var(--color-paper)] transition-colors hover:bg-[var(--color-pine)]/90">
                  Explore Shop
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
