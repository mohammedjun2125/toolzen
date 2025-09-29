
import { categories, categoryMap, tools, ToolCategoryInfo } from '@/lib/tools';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { SiteHeader } from '@/components/site-header';
import { SiteFooter } from '@/components/site-footer';
import { CategoryPageClient } from '@/components/category-page-client';
import { seoKeywords } from '@/lib/seo-keywords';

type Props = {
  params: { categoryId: string }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const category = categoryMap.get(params.categoryId as ToolCategoryInfo['id']);
  
    if (!category) {
      return { title: 'Category Not Found' };
    }
    
    const keywords = (seoKeywords.categories as any)[category.id];
    const relatedTools = tools.filter(tool => tool.category.id === category.id).slice(0, 3).map(t => t.name).join(', ');

    const title = `${category.name} - ${keywords.title_keywords.join(', ')} | Toolzen`;
    const description = `Explore our suite of ${category.name}: ${keywords.meta_keywords.join(', ')}. Includes ${relatedTools}, and more. All tools are fast, private, and work in your browser.`;
  
    return {
      title,
      description,
      keywords: keywords.meta_keywords.concat(keywords.high_cpc),
      alternates: {
          canonical: `https://www.toolzenweb.com/category/${category.id}`,
      },
      openGraph: {
        title,
        description,
        type: 'website',
        url: `https://www.toolzenweb.com/category/${category.id}`,
      },
    };
}
  
export function generateStaticParams() {
    return categories.map((category) => ({
        categoryId: category.id,
    }));
}

export default function CategoryPage({ params }: Props) {
    const category = categoryMap.get(params.categoryId as ToolCategoryInfo['id']);
    
    if (!category) {
        notFound();
    }

    const categoryTools = tools.filter(tool => tool.category.id === category.id);
    const keywords = (seoKeywords.categories as any)[category.id];
    
    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'CollectionPage',
        name: `${category.name} - ${keywords.title_keywords.join(' ')} | Toolzen`,
        description: `Explore our suite of ${category.name}: ${keywords.meta_keywords.join(', ')}. All tools are fast, private, and work in your browser.`,
        url: `https://www.toolzenweb.com/category/${category.id}`,
        mainEntity: {
            '@type': 'ItemList',
            itemListElement: categoryTools.map((tool, index) => ({
                '@type': 'ListItem',
                position: index + 1,
                item: {
                    '@type': 'SoftwareApplication',
                    name: tool.name,
                    url: `https://www.toolzenweb.com${tool.href}`,
                    applicationCategory: category.name,
                    operatingSystem: 'Web',
                    description: tool.description,
                    offers: {
                      '@type': 'Offer',
                      price: '0',
                      priceCurrency: 'USD'
                    }
                },
            })),
        },
    };
    
    return (
      <>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
          suppressHydrationWarning
        />
        <div className="flex flex-col min-h-screen">
            <SiteHeader />
            <main className="flex-1 container mx-auto px-4 md:px-6 py-12">
                <CategoryPageClient category={category} tools={categoryTools} />
            </main>
            <SiteFooter />
        </div>
      </>
    );
}
