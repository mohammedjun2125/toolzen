
import { categories, categoryMap, tools } from '@/lib/tools';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { SiteHeader } from '@/components/site-header';
import { SiteFooter } from '@/components/site-footer';
import { CategoryPageClient } from '@/components/category-page-client';

type Props = {
  params: { categoryId: string }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const category = categoryMap.get(params.categoryId);
  
    if (!category) {
      return { title: 'Category Not Found' };
    }
    
    const title = `${category.name} | Toolzen`;
    const description = category.description_short;
  
    return {
      title,
      description,
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
    const category = categoryMap.get(params.categoryId);
    
    if (!category) {
        notFound();
    }

    const categoryTools = tools.filter(tool => tool.category.id === category.id);
    
    return (
      <div className="flex flex-col min-h-screen">
        <SiteHeader />
        <main className="flex-1 container mx-auto px-4 md:px-6 py-12">
            <CategoryPageClient category={category} tools={categoryTools} />
        </main>
        <SiteFooter />
      </div>
    );
}
