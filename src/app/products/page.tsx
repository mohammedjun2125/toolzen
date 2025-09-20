
import type { Metadata } from 'next';
import Link from 'next/link';
import { SiteHeader } from '@/components/site-header';
import { SiteFooter } from '@/components/site-footer';
import { productsData } from '@/lib/products';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { ProductCard } from '@/components/product-card';
import { ChevronRight } from 'lucide-react';
import { Breadcrumbs } from '@/components/breadcrumbs';

export const metadata: Metadata = {
  title: 'Buy Trending Products Online | Toolzen Affiliate Store',
  description: 'Shop trending products online with Toolzen – find the best deals on electronics, home essentials, books, and lifestyle accessories from our curated affiliate collection.',
  keywords: ["buy gadgets online", "best amazon deals 2025", "top trending products India", "affiliate store Toolzen", "electronics deals", "home kitchen essentials"],
  alternates: {
    canonical: '/products',
  },
};

function CategoryPreviewCard({ category }: { category: (typeof productsData.categories)[0] }) {
  return (
    <Card className="flex flex-col h-full bg-card/60 backdrop-blur-lg">
      <CardHeader>
        <CardTitle className="text-2xl">{category.name}</CardTitle>
        <CardDescription>{category.description}</CardDescription>
      </CardHeader>
      <CardContent className="flex-grow flex flex-col justify-between">
        <div className="grid grid-cols-2 gap-4 mb-6">
          {category.products.slice(0, 2).map(product => (
            <div key={product.id} className="border rounded-lg p-2">
              <div className="relative aspect-square w-full">
                <Image 
                  src={product.images[0] || 'https://picsum.photos/seed/placeholder/400/400'} 
                  alt={product.title} 
                  fill
                  className="rounded-md object-cover"
                  data-ai-hint={product.imageHint}
                />
              </div>
              <h4 className="text-xs font-semibold mt-2 truncate">{product.title}</h4>
              <p className="text-xs text-muted-foreground">{product.currency}{product.price}</p>
            </div>
          ))}
        </div>
        <Button asChild className="w-full">
          <Link href={`/products/${category.slug}`}>
            View More <ChevronRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </CardContent>
    </Card>
  )
}


export default function ProductsPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <SiteHeader />
      <main className="flex-1 container mx-auto px-4 md:px-6 py-12">
        
        <Breadcrumbs items={[{ label: 'Products', href: '/products' }]} />

        <header className="text-center my-8">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tighter">Trending Products Store</h1>
          <p className="max-w-2xl mx-auto mt-4 text-muted-foreground">
            A curated collection of top-rated gadgets, essentials, and accessories from our trusted affiliate partners.
          </p>
        </header>

        <div className="bg-primary/10 text-primary-foreground p-4 rounded-lg text-center mb-12">
          <p className="font-bold">✨ Top Deals of the Week! Get up to 40% off on select electronics.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {productsData.categories.map(category => (
            <CategoryPreviewCard key={category.slug} category={category} />
          ))}
        </div>
        
      </main>
      <SiteFooter />
    </div>
  );
}

