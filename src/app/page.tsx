
'use client';

import Link from 'next/link';
import { SiteHeader } from '@/components/site-header';
import { SiteFooter } from '@/components/site-footer';
import { BlogPreview } from '@/components/blog-preview';
import { mockPosts } from '@/lib/blog';
import { Button } from '@/components/ui/button';
import { categories } from '@/lib/tools';
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
          
          <section id="tools" className="w-full pb-20 md:pb-32 lg:pb-40">
            <div className="container mx-auto px-4 md:px-6">
                <h2 className="text-3xl font-bold text-center mb-4">Tool Categories</h2>
                <p className="max-w-2xl mx-auto text-center text-muted-foreground mb-8">
                    Browse our collection of utilities organized by category for your convenience.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {categories.map((category) => {
                        const IconComponent = category.icon as LucideIcon;
                        return (
                            <Link href={`/category/${category.id}`} key={category.id} className="group">
                                <Card className="h-full transition-all duration-300 ease-in-out group-hover:scale-105 group-hover:shadow-2xl group-hover:shadow-primary/20 group-hover:-translate-y-2 bg-card/60 backdrop-blur-lg">
                                    <CardHeader className="p-6">
                                    <div className="flex items-start gap-4">
                                        <div className="bg-primary/10 p-3 rounded-lg">
                                            {IconComponent && <IconComponent className="h-6 w-6 text-primary" />}
                                        </div>
                                        <div className="flex-1">
                                        <CardTitle className="text-lg font-semibold">{category.name}</CardTitle>
                                        <CardDescription className="mt-2 text-sm text-muted-foreground line-clamp-2">{category.description_short}</CardDescription>
                                        </div>
                                    </div>
                                    </CardHeader>
                                </Card>
                            </Link>
                        );
                    })}
                </div>
            </div>
          </section>

          <BlogPreview posts={mockPosts} />

        </main>
        <SiteFooter />
      </div>
    
  );
}
