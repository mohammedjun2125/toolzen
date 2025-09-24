
'use client';

import Link from 'next/link';
import { SiteHeader } from '@/components/site-header';
import { SiteFooter } from '@/components/site-footer';
import { BlogPreview } from '@/components/blog-preview';
import { mockPosts } from '@/lib/blog';
import { Button } from '@/components/ui/button';
import { categories, tools } from '@/lib/tools';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import type { LucideIcon } from 'lucide-react';

export default function Home() {
  
  return (
    
      <div className="flex flex-col min-h-screen bg-background">
        <SiteHeader />
        <main className="flex-1">
          <section className="w-full py-20 md:py-32 lg:py-40 bg-gradient-to-b from-background to-card/20">
            <div className="container mx-auto px-4 md:px-6 text-center">
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter mb-4">
                  Your Ultimate Digital Toolkit
              </h1>
              <p className="max-w-3xl mx-auto text-lg md:text-xl text-foreground/80 mb-8">
                  A suite of free, fast, and privacy-focused online tools to boost your productivity.
                  No data is ever sent to our servers.
              </p>
              <Button asChild size="lg">
                <Link href="#tools">Explore All Tools</Link>
              </Button>
              
            </div>
          </section>
          
          <section id="tools" className="w-full pb-20 md:pb-32 lg:pb-40 container mx-auto px-4 md:px-6">
            {categories.map((category) => {
              const categoryTools = tools.filter(tool => tool.category.id === category.id);
              if (categoryTools.length === 0) return null;
              
              const CategoryIcon = category.icon;

              return (
                <div key={category.id} id={category.id} className="mb-16 scroll-mt-24">
                  <header className="text-center mb-12">
                      <CategoryIcon className="h-12 w-12 text-primary mx-auto mb-4" />
                      <h2 className="text-3xl md:text-4xl font-bold tracking-tighter">
                          {category.name}
                      </h2>
                      <p className="max-w-2xl mx-auto mt-4 text-muted-foreground">
                          {category.description_short}
                      </p>
                  </header>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {categoryTools.map((tool) => {
                      const ToolIcon = tool.icon as LucideIcon;
                      return (
                          <Link href={tool.href} key={tool.id} className="group">
                              <Card className="h-full transition-all duration-300 ease-in-out group-hover:scale-105 group-hover:shadow-2xl group-hover:shadow-primary/20 group-hover:-translate-y-2 bg-card/60 backdrop-blur-lg">
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

                </div>
              );
            })}
          </section>

          <BlogPreview posts={mockPosts} />

        </main>
        <SiteFooter />
      </div>
    
  );
}
