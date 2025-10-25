

import { SiteHeader } from '@/components/site-header';
import { SiteFooter } from '@/components/site-footer';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { BlogPreview } from '@/components/blog-preview';
import { mockPosts } from '@/lib/blog';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { categories, tools } from '@/lib/tools';
import { ToolSearch } from '@/components/tool-search';
import { iconMap } from '@/components/icon-map';


function ToolCategoryNav() {
  return (
    <section className="w-full pb-16 pt-8 container mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tighter">Tool Categories</h2>
            <p className="max-w-2xl mx-auto mt-4 text-muted-foreground">
                Click a category to jump to the tools you need.
            </p>
        </div>
        <div className="flex justify-center flex-wrap gap-4">
            {categories.map(category => {
                const CategoryIcon = iconMap[category.icon as keyof typeof iconMap];
                return (
                    <Button asChild key={category.id} variant="outline" size="lg">
                        <Link href={`#${category.id}`}>
                           {CategoryIcon && <CategoryIcon className="mr-2 h-5 w-5" />} 
                           {category.name}
                        </Link>
                    </Button>
                );
            })}
        </div>
    </section>
  )
}

export default function Home() {
  return (
    
      <div className="flex flex-col min-h-screen bg-background">
        <SiteHeader />
        <main className="flex-1">
          <section className="text-center py-12 md:py-20 lg:py-24">
            <div className="container mx-auto px-4 md:px-6">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-2">Free, Fast & Private Online Tools</h1>
              <h2 className="text-xl md:text-2xl text-muted-foreground mb-4">PDF, image, text and developer utilities — client-side, no uploads</h2>
              <p className="max-w-3xl mx-auto text-foreground/80 mb-6">
                Toolzen offers a curated collection of free online tools: compress and merge PDFs, resize and convert images,
                format JSON, generate QR codes, run calculators and more — all processed securely in your browser for maximum privacy and speed.
              </p>
              <Button asChild size="lg">
                <Link href="#tools">Explore Tools →</Link>
              </Button>
            </div>
          </section>
          
          <div id="tools" className="scroll-mt-20">
            <ToolCategoryNav />
            <ToolSearch />
            <section className="w-full pb-20 md:pb-32 lg:pb-40 container mx-auto px-4 md:px-6">
                {categories.map((category) => {
                  const categoryTools = tools.filter(tool => tool.category.id === category.id);
                  if (categoryTools.length === 0) return null;
                  
                  const CategoryIcon = iconMap[category.icon as keyof typeof iconMap];

                  return (
                    <div key={category.id} id={category.id} className="mb-16 scroll-mt-24">
                      <header className="text-center mb-12">
                          {CategoryIcon && <CategoryIcon className="h-12 w-12 text-primary mx-auto mb-4" />}
                          <h2 className="text-3xl md:text-4xl font-bold tracking-tighter">
                              {category.name}
                          </h2>
                          <p className="max-w-2xl mx-auto mt-4 text-muted-foreground">
                              {category.description_short}
                          </p>
                      </header>

                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {categoryTools.map((tool) => {
                          const ToolIcon = iconMap[tool.icon as keyof typeof iconMap];
                          return (
                              <Link href={tool.href} key={tool.id} className="group">
                                  <Card className="h-full transition-all duration-300 ease-in-out group-hover:scale-105 group-hover:shadow-2xl group-hover:shadow-primary/20 group-hover:-translate-y-2 bg-card/60 backdrop-blur-lg">
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
                    </div>
                  );
                })}
              </section>
          </div>

          <BlogPreview posts={mockPosts} />

        </main>
        <SiteFooter />
      </div>
    
  );
}
