import { defineField, defineType } from "sanity";

export const product = defineType({
  name: "product",
  title: "Product",
  type: "document",
  fields: [
    defineField({
      name: "id",
      title: "ID",
      type: "string",
      readOnly: true,
    }),
    defineField({
      name: "name", // Mapping 'title' to 'name' or keeping 'title'? standard is usually title in Sanity but user code uses title. Let's stick to name for display but maybe I should rename to title to match? 
      // The previous schema had 'name'. The data has 'title'.
      // Let's use 'title' to match data/products.ts to minimize frontend refactoring.
      title: "Title",
      type: "string",
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "title",
        maxLength: 96,
      },
    }),
    defineField({
      name: "price",
      title: "Price",
      type: "number",
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
    }),
    defineField({
      name: "category",
      title: "Category",
      type: "string",
      options: {
        list: [
          { title: 'Tea', value: 'Tea' },
          { title: 'Pantry', value: 'Pantry' },
          { title: 'Textiles', value: 'Textiles' },
          { title: 'Crafts', value: 'Crafts' },
          { title: 'Wellness', value: 'Wellness' },
          { title: 'Art', value: 'Art' },
        ],
      },
    }),
    defineField({
      name: "status",
      title: "Status",
      type: "string",
      options: {
        list: [
          { title: 'Available', value: 'available' },
          { title: 'Sold', value: 'sold' },
        ],
      },
    }),
    defineField({
      name: "stock",
      title: "Stock",
      type: "number",
      validation: (Rule) => Rule.min(0),
    }),
    defineField({
      name: "isOutOfStock",
      title: "Is Out of Stock",
      type: "boolean",
      readOnly: true,
    }),
    defineField({
      name: "image",
      title: "Image",
      type: "image",
      options: {
        hotspot: true,
      },
    }),
  ],
});
