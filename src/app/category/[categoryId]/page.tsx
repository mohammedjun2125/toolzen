
import { categories, tools, Tool, ToolCategoryInfo } from '@/lib/tools';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Link from 'next/link';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { SiteHeader } from '@/components/site-header';
import { SiteFooter } from '@/components/site-footer';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

const categoryMap = new Map(categories.map(c => [c.id, c]));

type Props = {
  params: { categoryId: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const category = categoryMap.get(params.categoryId as ToolCategoryInfo['id']);

  if (!category) {
    return { title: 'Category Not Found' };
  }
  
  const title = `${category.name} | Toolzen`;
  const description = `A collection of free, fast, and private online ${category.name.toLowerCase()} from Toolzen. All tools work in your browser without needing to upload your data.`;

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
    twitter: {
      card: 'summary_large_image',
      title,
      description,
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

  return (
    <div className="flex flex-col min-h-screen">
      <SiteHeader />
      <main className="flex-1 container mx-auto px-4 md:px-6 py-12">
        <Button asChild variant="ghost" className="mb-4">
            <Link href="/">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Home
            </Link>
        </Button>
        <header className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tighter">{category.name}</h1>
            <p className="max-w-2xl mx-auto mt-4 text-muted-foreground">{category.description_short}</p>
        </header>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {categoryTools.map((tool) => (
            <Link href={tool.href} key={tool.href} className="group">
              <Card className="h-full transition-all duration-300 ease-in-out group-hover:scale-105 group-hover:shadow-2xl group-hover:shadow-primary/20 group-hover:-translate-y-2 bg-card/60 backdrop-blur-lg">
                <CardHeader className="p-6">
                  <div className="flex items-center gap-4">
                    <div className="bg-primary/10 p-3 rounded-lg">
                      <tool.icon className="h-6 w-6 text-primary" />
                    </div>
                    <CardTitle className="text-lg font-semibold">{tool.name}</CardTitle>
                  </div>
                  <CardDescription className="mt-4 text-sm text-muted-foreground">{tool.description}</CardDescription>
                </CardHeader>
              </Card>
            </Link>
          ))}
        </div>
        {categoryTools.length === 0 && (
          <p className="text-center text-muted-foreground mt-8">No tools found in this category.</p>
        )}
      </main>
      <SiteFooter />
    </div>
  );
}
