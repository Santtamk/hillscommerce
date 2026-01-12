// Central content management file for easy text editing

export const siteContent = {
  // Site metadata
  site: {
    name: "Himalayan Nostalgia",
    tagline: "Handcrafted Products",
    description: "Authentic handcrafted products from Darjeeling, Kalimpong & West Bengal hills.",
  },

  // Hero sections
  hero: {
    home: {
      subtitle: "From the Hills of West Bengal",
      title: "Handcrafted with Tradition",
      description:
        "Authentic handcrafted products from the artisans of Darjeeling, Kalimpong, and the surrounding hills of West Bengal. Each piece tells a story of heritage and craftsmanship.",
    },
    about: {
      subtitle: "Our Journey",
      title: "Stories from the Hills",
      description:
        "Connecting artisans with the world, preserving heritage, one craft at a time.",
    },
    cart: {
      subtitle: "Your Selection",
      title: "Shopping Cart",
      description: "Review your handpicked treasures from the hills.",
    },
  },

  // About page content
  about: {
    story: {
      label: "Our Story",
      title: "Preserving Heritage, One Craft at a Time",
      paragraphs: [
        "Nestled in the misty hills of Darjeeling and Kalimpong, artisans have been crafting extraordinary pieces for generations. Each product in our collection carries the warmth of handcrafted tradition and the soul of the mountains.",
        "From hand-woven textiles to carved wooden artifacts, every item tells a story of patience, skill, and cultural heritage passed down through families.",
        "We believe in more than just commerce. We believe in relationships — connecting the skilled hands of hill artisans directly with patrons who appreciate quality, authenticity, and the stories behind each creation.",
      ],
    },
    values: [
      {
        title: "Direct from Artisans",
        description:
          "We work directly with local craftspeople, ensuring fair compensation and authentic products.",
      },
      {
        title: "Sustainable Practices",
        description:
          "Traditional methods that honor nature, using locally sourced materials and time-tested techniques.",
      },
      {
        title: "Cultural Preservation",
        description:
          "Every purchase helps preserve centuries-old crafts and supports the artisan communities of West Bengal.",
      },
    ],
    mission: {
      title: "Our Mission",
      description:
        "To create a sustainable marketplace that empowers artisans, preserves traditional crafts, and brings authentic handcrafted products to conscious consumers worldwide.",
    },
  },

  // Footer content
  footer: {
    address: {
      street: "Hill Cart Road",
      city: "Darjeeling, West Bengal 734101",
      email: "hello@himalayan.nostalgia",
    },
    tagline: "* MIST & PINE *",
    copyright: "EST. 2024 — COPYRIGHT RESERVED",
  },

  // UI Labels
  labels: {
    currency: "₹",
    addToCart: "Add to Cart",
    inCart: "In Cart",
    soldOut: "Sold Out",
    latestArrivals: "Latest Arrivals",
    items: "ITEMS",
    shopNow: "Shop Now",
    learnMore: "Learn More",
    checkout: "Proceed to Checkout",
    continueShop: "Continue Shopping",
    emptyCart: "Your cart is empty",
    removeItem: "Remove",
    subtotal: "Subtotal",
    total: "Total",
  },
};

export type SiteContent = typeof siteContent;
