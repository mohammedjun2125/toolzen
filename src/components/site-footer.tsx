'use client';

import Link from 'next/link';
import { useEffect } from 'react';

export function SiteFooter() {
  useEffect(() => {
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (e) {
      console.error('Adsense error:', e);
    }
  }, []);

  return (
    <footer className="border-t bg-card/60 backdrop-blur-lg py-6 md:py-8">
      <div className="container mx-auto px-4 md:px-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-sm text-muted-foreground">&copy; {new Date().getFullYear()} Toolzen. All rights reserved.</p>
        <nav className="flex flex-wrap justify-center gap-4 sm:gap-6">
          <Link href="/about" className="text-sm hover:underline underline-offset-4 text-muted-foreground" prefetch={false}>
            About Us
          </Link>
          <Link href="/contact" className="text-sm hover:underline underline-offset-4 text-muted-foreground" prefetch={false}>
            Contact Us
          </Link>
          <Link href="/privacy" className="text-sm hover:underline underline-offset-4 text-muted-foreground" prefetch={false}>
            Privacy Policy
          </Link>
          <Link href="/terms" className="text-sm hover:underline underline-offset-4 text-muted-foreground" prefetch={false}>
            Terms of Use
          </Link>
           <Link href="/disclaimer" className="text-sm hover:underline underline-offset-4 text-muted-foreground" prefetch={false}>
            Disclaimer
          </Link>
        </nav>
      </div>
      <div id="ad-footer" className="min-h-[100px] min-w-[320px] max-w-full mx-auto flex items-center justify-center text-muted-foreground bg-muted/20 rounded-lg mt-8">
        Footer Banner Ad
        <ins className="adsbygoogle"
            style={{ display: 'block' }}
            data-ad-client="ca-pub-XXXXXXXXXXXXXXXX"
            data-ad-slot="1234567890"
            data-ad-format="auto"
            data-full-width-responsive="true"></ins>
      </div>
    </footer>
  );
}
