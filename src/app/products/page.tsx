import type { Metadata } from 'next';
import { SiteHeader } from '@/components/site-header';
import { SiteFooter } from '@/components/site-footer';
import TrendingProducts from '@/components/trending-products';

// SEO Keyword Suggestions:
// "Best Deals 2025", "Amazon Trending Products", "Top Online Gadgets",
// "Must-Have Tech 2025", "Popular Amazon Finds", "Cool Gadgets to Buy"

export const metadata: Metadata = {
  title: 'Trending Products & Gadgets - Best Deals of 2025',
  description: 'Discover the top trending products, must-have gadgets, and best deals on Amazon for 2025. Curated picks for your home, office, and lifestyle.',
  keywords: ['trending products', 'best deals 2025', 'amazon finds', 'top gadgets', 'cool tech', 'must-have products', 'online shopping deals'],
  alternates: {
    canonical: '/products',
  },
  openGraph: {
    title: 'Trending Products & Gadgets on Toolzen',
    description: 'A curated list of the most popular and useful products available online.',
    url: '/products',
    type: 'website',
  },
};

export default function ProductsPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <SiteHeader />
      <main className="flex-1 container mx-auto px-4 md:px-6 py-12">
        <header className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tighter">Trending Products</h1>
          <p className="max-w-2xl mx-auto mt-4 text-muted-foreground">
            A curated list of our favorite gadgets, tools, and accessories.
          </p>
        </header>

        <TrendingProducts />

      </main>
      <SiteFooter />
    </div>
  );
}
