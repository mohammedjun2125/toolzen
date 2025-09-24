

import { categories, categoryMap, tools, Tool } from '@/lib/tools';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { SiteHeader } from '@/components/site-header';
import { SiteFooter } from '@/components/site-footer';
import Link from 'next/link';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';


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
    const CategoryIcon = category.icon;

    return (
        <div className="flex flex-col min-h-screen">
          <SiteHeader />
          <main className="flex-1 container mx-auto px-4 md:px-6 py-12">
            <Button asChild variant="ghost" className="mb-8">
              <Link href="/">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to Home
              </Link>
            </Button>
            <header className="text-center mb-12">
              <CategoryIcon className="h-16 w-16 text-primary mx-auto mb-4" />
              <h1 className="text-4xl md:text-5xl font-bold tracking-tighter">
                {category.name}
              </h1>
              <p className="max-w-2xl mx-auto mt-4 text-muted-foreground">
                {category.description_short}
              </p>
            </header>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {categoryTools.map((tool) => {
                    const ToolIcon = tool.icon as LucideIcon;
                    return (
                        <Link href={tool.href} key={tool.id} className="group">
                            <Card className="h-full transition-all duration-300 ease-in-out group-hover:scale-105 group-hover:shadow-2xl group-hover:shadow-primary/20 bg-card/60 backdrop-blur-lg">
                                <CardHeader className="p-6">
                                    <div className="flex items-start gap-4">
                                        <div className="bg-primary/10 p-3 rounded-lg">
                                            <ToolIcon className="h-6 w-6 text-primary" />
                                        </div>
                                        <div className="flex-1">
                                            <CardTitle className="text-lg font-semibold">{tool.name}</CardTitle>
                                            <CardDescription className="mt-2 text-sm text-muted-foreground line-clamp-2">{tool.description}</CardDescription>
                                        </div>
                                    </div>
                                </CardHeader>
                            </Card>
                        </Link>
                    );
                })}
            </div>
            {/* Ad Placeholder */}
             <div className="my-12 h-24 flex items-center justify-center rounded-lg">
                {/* Future ad content goes here */}
            </div>
          </main>
          <SiteFooter />
        </div>
    );
}
