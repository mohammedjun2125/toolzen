
'use client';

import { ToolGrid } from '@/components/tool-grid';
import { SiteHeader } from '@/components/site-header';
import { SiteFooter } from '@/components/site-footer';
import { BlogPreview } from '@/components/blog-preview';
import { mockPosts } from '@/lib/blog';

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
                  No data is sent to our servers. Everything happens in your browser for maximum security and speed.
              </p>
              
            </div>
          </section>
          
          <ToolGrid />

          <BlogPreview posts={mockPosts} />

        </main>
        <SiteFooter />
      </div>
    
  );
}
