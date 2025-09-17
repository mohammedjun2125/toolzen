'use client';

import { ToolGrid } from '@/components/tool-grid';
import { SiteHeader } from '@/components/site-header';
import { SiteFooter } from '@/components/site-footer';

export default function Home() {
  
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <SiteHeader />
      <main className="flex-1">
        <section className="w-full py-20 md:py-32 lg:py-40 bg-gradient-to-b from-background to-card/20">
          <div className="container mx-auto px-4 md:px-6 text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-primary-foreground via-accent to-primary-foreground mb-4">
              Your Ultimate Digital Toolkit
            </h1>
            <p className="max-w-3xl mx-auto text-lg md:text-xl text-foreground/80 mb-8">
              A suite of free, fast, and privacy-focused online tools to boost your productivity.
              No data is sent to our servers for most tools. Everything happens in your browser.
            </p>
            <div id="ad-header" className="min-h-[100px] min-w-[320px] max-w-full mx-auto flex items-center justify-center text-muted-foreground bg-muted/20 rounded-lg">
               Top Banner Ad
                <ins className="adsbygoogle"
                    style={{ display: 'block' }}
                    data-ad-client="ca-pub-XXXXXXXXXXXXXXXX"
                    data-ad-slot="1234567890"
                    data-ad-format="auto"
                    data-full-width-responsive="true"></ins>
            </div>
          </div>
        </section>
        
        <ToolGrid />

      </main>
      <SiteFooter />
    </div>
  );
}
