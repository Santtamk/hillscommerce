import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { projectId, dataset, apiVersion } from "./lib/sanity";
import { wishlist } from "./schema/wishlist";
import { product } from "./schema/product";
import { cart } from "./schema/cart";

export default defineConfig({
  name: "ecommerce",
  title: "Himalayan Nostalgia",
  projectId: projectId || "",
  dataset: dataset || "",
  apiVersion,
  basePath: "/studio",
  plugins: [structureTool()],
  schema: {
    types: [wishlist, product, cart],
  },
});
