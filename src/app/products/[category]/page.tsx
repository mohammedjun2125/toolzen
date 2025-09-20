

import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { SiteHeader } from '@/components/site-header';
import { SiteFooter } from '@/components/site-footer';
import { categoryMap, productsData } from '@/lib/products';
import { ProductCard } from '@/components/product-card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Breadcrumbs } from '@/components/breadcrumbs';
import { BlogPreview } from '@/components/blog-preview';
import { mockPosts } from '@/lib/blog';


type Props = {
  params: { category: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const category = categoryMap.get(params.category);

  if (!category) {
    return { title: 'Category Not Found' };
  }
  
  return {
    title: category.seo.title,
    description: category.seo.metaDescription,
    keywords: category.seo.keywords,
    alternates: {
      canonical: `/products/${category.slug}`,
    },
  };
}

export function generateStaticParams() {
  return productsData.categories.map((category) => ({
    category: category.slug,
  }));
}

export default function CategoryPage({ params }: Props) {
  const category = categoryMap.get(params.category);

  if (!category) {
    notFound();
  }

  return (
    <div className="flex flex-col min-h-screen">
      <SiteHeader />
      <main className="flex-1 container mx-auto px-4 md:px-6 py-12">
        {category.products.map(product => (
          <script
            key={product.id}
            type="application/ld+json"
            dangerouslySetInnerHTML={{
                __html: JSON.stringify({
                    "@context": "https://schema.org/",
                    "@type": "Product",
                    "name": product.title,
                    "image": product.images,
                    "description": product.description,
                    "brand": {
                        "@type": "Brand",
                        "name": product.brand
                    },
                    "offers": {
                        "@type": "Offer",
                        "url": product.affiliateLink,
                        "priceCurrency": product.currency,
                        "price": product.price,
                        "availability": "https://schema.org/InStock"
                    }
                })
            }}
          />
        ))}

        <Breadcrumbs items={[
          { label: 'Products', href: '/products' },
          { label: category.name, href: `/products/${category.slug}` }
        ]} />

        <header className="text-center my-8">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tighter">{category.name}</h1>
          <p className="max-w-2xl mx-auto mt-4 text-muted-foreground">
            {category.description}
          </p>
        </header>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {category.products.map((product, index) => (
            <ProductCard product={product} key={product.id} priority={index < 4} />
          ))}
        </div>

        {category.faq.length > 0 && (
          <section className="max-w-3xl mx-auto my-16">
            <h2 className="text-3xl font-bold text-center mb-8">Frequently Asked Questions</h2>
            <Accordion type="single" collapsible className="w-full">
              {category.faq.map((item, index) => (
                <AccordionItem value={`item-${index}`} key={index}>
                  <AccordionTrigger>{item.question}</AccordionTrigger>
                  <AccordionContent>{item.answer}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </section>
        )}
        
        <div className="my-16">
            <BlogPreview posts={mockPosts} />
        </div>

      </main>
      <SiteFooter />
    </div>
  );
}
