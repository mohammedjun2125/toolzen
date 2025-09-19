
'use client';

import { ToolGrid } from '@/components/tool-grid';
import { SiteHeader } from '@/components/site-header';
import { SiteFooter } from '@/components/site-footer';
import { BlogPreview } from '@/components/blog-preview';
import { mockPosts } from '@/lib/blog';
import TrendingProducts from '@/components/trending-products';

export default function Home() {
  
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <SiteHeader />
      <main className="flex-1">
        <section className="w-full py-20 md:py-32 lg:py-40 bg-gradient-to-b from-background to-card/20">
          <div className="container mx-auto px-4 md:px-6 text-center">
            <div id="ad-pre-header" className="hidden mb-8 min-h-[100px] min-w-[320px] max-w-full mx-auto flex items-center justify-center text-muted-foreground bg-muted/20 rounded-lg">
                <div className="text-center">
                  <p>Top Banner Ad</p>
                  <p className="text-xs">(e.g., 970x90 or 728x90)</p>
                </div>
                <ins className="adsbygoogle"
                     style={{ display: 'none' }}
                     data-ad-client="ca-pub-XXXXXXXXXXXXXXXX"
                     data-ad-slot="1234567890"
                     data-ad-format="auto"
                     data-full-width-responsive="true"></ins>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-primary-foreground via-accent to-primary-foreground mb-4">
              Your Ultimate Digital Toolkit
            </h1>
            <p className="max-w-3xl mx-auto text-lg md:text-xl text-foreground/80 mb-8">
              A suite of free, fast, and privacy-focused online tools to boost your productivity.
              No data is sent to our servers. Everything happens in your browser for maximum security and speed.
            </p>
            <div id="ad-header" className="hidden min-h-[100px] min-w-[320px] max-w-full mx-auto flex items-center justify-center text-muted-foreground bg-muted/20 rounded-lg">
               <div className="text-center">
                 <p>Header Ad</p>
                 <p className="text-xs">(e.g., 728x90)</p>
               </div>
                <ins className="adsbygoogle"
                     style={{ display: 'none' }}
                     data-ad-client="ca-pub-XXXXXXXXXXXXXXXX"
                     data-ad-slot="1234567890"
                     data-ad-format="auto"
                     data-full-width-responsive="true"></ins>
            </div>
          </div>
        </section>
        
        <ToolGrid />

        <div className="container mx-auto px-4 md:px-6 my-12">
          <TrendingProducts />
        </div>

        <div className="container mx-auto px-4 md:px-6 my-12">
            <div id="ad-mid-page-1" className="hidden min-h-[250px] min-w-[300px] max-w-full mx-auto flex items-center justify-center text-muted-foreground bg-muted/20 rounded-lg">
               <div className="text-center">
                 <p>Mid-Page Ad</p>
                 <p className="text-xs">(e.g., 300x250 or 336x280)</p>
               </div>
                <ins className="adsbygoogle"
                     style={{ display: 'none' }}
                     data-ad-client="ca-pub-XXXXXXXXXXXXXXXX"
                     data-ad-slot="1234567891"
                     data-ad-format="auto"
                     data-full-width-responsive="true"></ins>
            </div>
        </div>

        <BlogPreview posts={mockPosts} />

        <div className="container mx-auto px-4 md:px-6 my-12">
            <div id="ad-mid-page-2" className="hidden min-h-[100px] min-w-[320px] max-w-full mx-auto flex items-center justify-center text-muted-foreground bg-muted/20 rounded-lg">
               <div className="text-center">
                 <p>Bottom Banner Ad</p>
                 <p className="text-xs">(e.g., 728x90)</p>
               </div>
                <ins className="adsbygoogle"
                     style={{ display: 'none' }}
                     data-ad-client="ca-pub-XXXXXXXXXXXXXXXX"
                     data-ad-slot="1234567892"
                     data-ad-format="auto"
                     data-full-width-responsive="true"></ins>
            </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
