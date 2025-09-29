
'use client';

import Link from 'next/link';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { iconMap } from '@/components/home-client';
import type { Tool, ToolCategoryInfo } from '@/lib/tools';
import { seoKeywords } from '@/lib/seo-keywords';
import { AdBanner } from './ad-banner';

type CategoryPageClientProps = {
    category: ToolCategoryInfo;
    tools: Tool[];
}

export function CategoryPageClient({ category, tools }: CategoryPageClientProps) {
    const CategoryIcon = iconMap[category.icon as keyof typeof iconMap] as React.ElementType;
    const keywords = (seoKeywords.categories as any)[category.id];

    return (
        <>
            <Button asChild variant="ghost" className="mb-8">
              <Link href="/">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to Home
              </Link>
            </Button>
            <header className="text-center mb-12">
              {CategoryIcon && <CategoryIcon className="h-16 w-16 text-primary mx-auto mb-4" />}
              <h1 className="text-4xl md:text-5xl font-bold tracking-tighter">
                {category.name} - {keywords.title_keywords.join(', ')}
              </h1>
              <p className="max-w-2xl mx-auto mt-4 text-muted-foreground">
                {`Explore our suite of ${category.name}: ${keywords.meta_keywords.join(', ')}. All tools are fast, private, and work in your browser.`}
              </p>
            </header>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {tools.map((tool) => {
                    const ToolIcon = iconMap[tool.icon as keyof typeof iconMap] as React.ElementType;
                    return (
                        <Link href={tool.href} key={tool.id} className="group">
                            <Card className="h-full transition-all duration-300 ease-in-out group-hover:scale-105 group-hover:shadow-2xl group-hover:shadow-primary/20 bg-card/60 backdrop-blur-lg">
                                <CardHeader className="p-6">
                                    <div className="flex items-start gap-4">
                                        <div className="bg-primary/10 p-3 rounded-lg">
                                            {ToolIcon && <ToolIcon className="h-6 w-6 text-primary" />}
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
                <AdBanner />
            </div>
        </>
    );
}
