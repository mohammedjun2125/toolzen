

'use client';

import { SiteHeader } from '@/components/site-header';
import { SiteFooter } from '@/components/site-footer';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { HomeClient } from '@/components/home-client';
import dynamic from 'next/dynamic';
import { Skeleton } from '@/components/ui/skeleton';
import type { Post } from '@/lib/blog';
import { seoKeywords } from '@/lib/seo-keywords';

const BlogPreview = dynamic<{ posts: Post[] }>(
  () => import('@/components/blog-preview').then(mod => mod.BlogPreview),
  { 
    ssr: false,
    loading: () => (
      <section className="container mx-auto px-4 md:px-6 py-12">
        <h2 className="text-3xl font-bold text-center mb-8">Helpful Guides & Articles</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Skeleton className="h-72 w-full" />
          <Skeleton className="h-72 w-full" />
          <Skeleton className="h-72 w-full" />
        </div>
      </section>
    )
  }
);

// We need to get the posts here to pass to the dynamically imported component
import { mockPosts } from '@/lib/blog';

export default function Home() {
  const homeKeywords = seoKeywords.tools.home;
  const exploreKeywords = (seoKeywords.tools as any)['explore-all-tools'];

  return (
    
      <div className="flex flex-col min-h-screen bg-background">
        <SiteHeader />
        <main className="flex-1">
          <section className="w-full py-20 md:py-32 lg:py-40 bg-gradient-to-b from-background to-card/20">
            <div className="container mx-auto px-4 md:px-6 text-center">
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter mb-4">
                  {homeKeywords.title_keywords.join(' - ')}
              </h1>
              <p className="max-w-3xl mx-auto text-lg md:text-xl text-foreground/80 mb-8">
                  {`A comprehensive suite of ${homeKeywords.meta_keywords.slice(0, 4).join(', ')} and more. All tools are fast, free, secure, and work on the client-side.`}
              </p>
              <Button asChild size="lg">
                <Link href="#tools">{exploreKeywords.title_keywords[0]}</Link>
              </Button>
              
            </div>
          </section>
          
          <div id="tools" className="scroll-mt-20">
            <HomeClient />
          </div>

          <BlogPreview posts={mockPosts} />

        </main>
        <SiteFooter />
      </div>
    
  );
}
