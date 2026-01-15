import { defineField, defineType } from "sanity";

export const wishlist = defineType({
  name: "wishlist",
  title: "Wishlist",
  type: "document",
  fields: [
    defineField({
      name: "userId",
      title: "User ID",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "products",
      title: "Products",
      type: "array",
      of: [
        {
          type: "reference",
          to: [{ type: "product" }], 
        },
      ],
    }),
  ],
});
