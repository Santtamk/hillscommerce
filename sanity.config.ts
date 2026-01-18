import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { projectId, dataset, apiVersion } from "./lib/sanity";
import { product } from "./schema/product";

export default defineConfig({
  name: "ecommerce",
  title: "Himalayan Nostalgia",
  projectId: projectId || "",
  dataset: dataset || "",
  apiVersion,
  basePath: "/studio",
  plugins: [structureTool()],
  schema: {
    types: [product],
  },
});
