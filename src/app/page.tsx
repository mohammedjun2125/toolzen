
'use client';

import { SiteHeader } from '@/components/site-header';
import { SiteFooter } from '@/components/site-footer';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { HomeClient } from '@/components/home-client';
import { BlogPreview } from '@/components/blog-preview';
import { mockPosts } from '@/lib/blog';

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
            <HomeClient />
          </div>

          <BlogPreview posts={mockPosts} />

        </main>
        <SiteFooter />
      </div>
    
  );
}
