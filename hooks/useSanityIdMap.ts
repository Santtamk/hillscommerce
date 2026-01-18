import { useState, useEffect } from "react";
import { createClient } from "next-sanity";

// We use a separate client for the frontend reading (or reuse lib/sanity if public)
// Assuming lib/sanity exports `sanityClient` which is public.
import { sanityClient } from "@/lib/sanity";

export function useSanityIdMap() {
  const [idMap, setIdMap] = useState<Record<string, string>>({});

  useEffect(() => {
    async function fetchIds() {
      try {
        // Fetch only _id and custom id field
        const products = await sanityClient.fetch(`*[_type == "product"]{_id, id}`);
        const map: Record<string, string> = {};
        products.forEach((p: any) => {
          if (p.id) map[p.id] = p._id;
        });
        setIdMap(map);
      } catch (error) {
        console.error("Failed to fetch Sanity IDs", error);
      }
    }
    fetchIds();
  }, []);

  return idMap;
}
