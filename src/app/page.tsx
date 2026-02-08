
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
import { ShieldCheck, Zap, Rabbit } from 'lucide-react';


function ToolCategoryNav() {
  return (
    <section className="w-full pb-16 pt-8 container mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tighter">Tool Categories</h2>
            <p className="max-w-2xl mx-auto mt-4 text-muted-foreground">
                From PDF and image utilities to developer tools and calculators, we have a solution for you.
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
          <section className="text-center py-16 md:py-24 lg:py-32">
            <div className="container mx-auto px-4 md:px-6">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tighter font-serif mb-4">Free, Private, and Blazing-Fast Online Tools</h1>
               <h2 className="text-xl md:text-2xl text-muted-foreground mb-8">Your Secure Hub for Digital Productivity</h2>
              <div className="max-w-3xl mx-auto text-lg text-foreground/80 mb-10 text-left space-y-4">
                <p>
                  Welcome to Toolzen, a comprehensive suite of over 100 high-quality online utilities designed for performance, privacy, and simplicity. In a digital world where your data is a commodity, we take a different approach. Our tools run directly in your browser, which means your files and information are **never uploaded to our servers.** This client-side processing guarantees that your data remains 100% private and secure.
                </p>
                <p>
                  Whether you're a developer needing to format JSON, a student merging PDFs for an assignment, a marketer optimizing images for a campaign, or an e-commerce seller cropping shipping labels, our tools are built to make your work easier and faster. No sign-ups, no tracking, no nonsense—just powerful, free utilities at your fingertips.
                </p>
              </div>
              <div className="flex justify-center flex-wrap gap-4">
                  <Button asChild size="lg">
                    <Link href="#tools">Explore All Tools →</Link>
                  </Button>
                  <Button asChild size="lg" variant="outline">
                    <Link href="/about">Learn About Our Mission</Link>
                  </Button>
              </div>
            </div>
          </section>

           <section className="py-16 bg-muted/50">
            <div className="container mx-auto px-4 md:px-6">
              <div className="grid md:grid-cols-3 gap-8 text-center">
                <div className="flex flex-col items-center">
                  <ShieldCheck className="h-12 w-12 text-primary mb-4" />
                  <h3 className="text-xl font-semibold mb-2">100% Private & Secure</h3>
                  <p className="text-muted-foreground">Our tools process your files directly in your browser. Nothing is ever uploaded to a server, ensuring your data remains completely confidential.</p>
                </div>
                <div className="flex flex-col items-center">
                  <Rabbit className="h-12 w-12 text-primary mb-4" />
                  <h3 className="text-xl font-semibold mb-2">Blazing-Fast Performance</h3>
                  <p className="text-muted-foreground">By eliminating upload and download times, our client-side tools deliver instant results, making you more productive.</p>
                </div>
                <div className="flex flex-col items-center">
                  <Zap className="h-12 w-12 text-primary mb-4" />
                  <h3 className="text-xl font-semibold mb-2">Completely Free, No Signup</h3>
                  <p className="text-muted-foreground">All our tools are free to use with no hidden fees, watermarks, or registration requirements. Just powerful utilities, available to everyone.</p>
                </div>
              </div>
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
