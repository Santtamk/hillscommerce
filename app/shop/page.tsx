"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import { products } from "@/data/products";
import ProductCard from "@/components/ProductCard";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Search } from "lucide-react";

const ITEMS_PER_PAGE = 12;
const CATEGORIES = ["All", "Tea", "Pantry", "Textiles", "Crafts", "Wellness", "Art"];

export default function ShopPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  // Scroll to top when page changes
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const filteredProducts = useMemo(() => {
    let filtered = products;

    // Filter by category
    if (activeCategory !== "All") {
      filtered = filtered.filter((product) => product.category === activeCategory);
    }

    // Filter by search query
    if (searchQuery) {
      const queryTerms = searchQuery.toLowerCase().split(/\s+/).filter(Boolean);
      
      filtered = filtered.filter((product) => {
        const productText = `${product.title} ${product.description}`.toLowerCase();
        // Split product text into words for boundary-aware matching
        const productWords = productText.split(/[\s\-,.()]+/);
        
        // Every term in the query must match the start of at least one word in the product
        return queryTerms.every((term) => 
          productWords.some((word) => word.startsWith(term))
        );
      });
    }

    return filtered;
  }, [activeCategory, searchQuery]);

  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);

  const currentProducts = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredProducts.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [currentPage, filteredProducts]);

  const handleCategoryChange = (category: string) => {
    setActiveCategory(category);
    setCurrentPage(1); // Reset to first page
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1); // Reset to first page
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    scrollToTop();
  };

  // Safe color classes using Tailwind v4 theme variables
  // Defined in globals.css: --color-pine, --color-stone, --color-rust, --color-paper

  return (
    <div className="flex min-h-screen flex-col font-sans">
      <Navbar />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative flex h-[40vh] w-full items-center justify-center overflow-hidden border-b border-stone">
          <div className="absolute inset-0">
            <Image
              src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=2000&q=80"
              alt="Himalayan Hills"
              fill
              className="object-cover opacity-20"
              priority
            />
          </div>
          <div className="absolute inset-0 bg-pine/5" />
          
          <div className="z-10 text-center space-y-4 max-w-2xl px-4 animate-[fade-in_1s_ease-out]">
            <p className="font-mono text-xs uppercase tracking-[0.3em] text-rust">
              Curated Collection
            </p>
            <h1 className="font-serif text-4xl md:text-6xl font-medium text-pine italic">
              Shop the Mountains
            </h1>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-6 py-12">
          {/* Filters & Search */}
          <div className="mb-12 flex flex-col items-center space-y-8">
            {/* Search Bar */}
            <div className="relative w-full max-w-md">
              <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none text-pine/40">
                <Search size={18} />
              </div>
              <input 
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={handleSearchChange}
                className="w-full rounded-full border border-stone bg-transparent py-2.5 pl-10 pr-4 text-sm text-pine placeholder:text-pine/40 focus:border-pine focus:outline-none focus:ring-1 focus:ring-pine transition-colors"
              />
            </div>

            {/* Category Buttons */}
            <div className="flex flex-wrap justify-center gap-3 md:gap-4">
              {CATEGORIES.map((category) => (
                <button
                  key={category}
                  onClick={() => handleCategoryChange(category)}
                  className={`rounded-full border px-5 py-2 text-xs md:text-sm font-medium uppercase tracking-wider transition-all
                    ${
                      activeCategory === category
                        ? "border-pine bg-pine text-white"
                        : "border-pine/20 text-pine/70 hover:border-pine hover:text-pine"
                    }`}
                >
                  {category}
                </button>
              ))}
            </div>

            <p className="font-mono text-xs text-pine/50">
              Showing {filteredProducts.length} items
            </p>
          </div>

          {/* Product Grid */}
          <div className="grid grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {currentProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="mt-20 flex justify-center gap-2">
              <button
                onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                className="rounded-md border border-stone px-4 py-2 text-sm font-medium uppercase text-pine disabled:opacity-30 hover:bg-stone/20 disabled:hover:bg-transparent transition-colors"
              >
                Prev
              </button>
              
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  onClick={() => handlePageChange(page)}
                  className={`min-w-[40px] rounded-md border px-4 py-2 text-sm font-medium transition-colors ${
                    currentPage === page
                      ? "border-pine bg-pine text-white"
                      : "border-stone text-pine hover:bg-stone/20"
                  }`}
                >
                  {page}
                </button>
              ))}

              <button
                onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
                disabled={currentPage === totalPages}
                className="rounded-md border border-stone px-4 py-2 text-sm font-medium uppercase text-pine disabled:opacity-30 hover:bg-stone/20 disabled:hover:bg-transparent transition-colors"
              >
                Next
              </button>
            </div>
          )}

          {/* Empty State */}
          {filteredProducts.length === 0 && (
            <div className="flex h-64 w-full flex-col items-center justify-center space-y-4 text-pine/50">
              <p className="font-serif text-xl italic">No products found.</p>
              <button 
                onClick={() => {
                  setSearchQuery("");
                  setActiveCategory("All");
                }}
                className="text-sm underline underline-offset-4 hover:text-pine"
              >
                Clear filters
              </button>
            </div>
          )}
        </section>
      </main>

      <Footer />
    </div>
  );
}
