'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export function SiteFooter() {
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());

  useEffect(() => {
    setCurrentYear(new Date().getFullYear());
  }, []);

  return (
    <footer className="border-t bg-card/60 backdrop-blur-lg py-6 md:py-8">
      <div className="container mx-auto px-4 md:px-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-sm text-muted-foreground">&copy; {currentYear} Toolzen. All rights reserved.</p>
        <nav className="flex flex-wrap justify-center gap-4 sm:gap-6">
          <Link href="/about" className="text-sm hover:underline underline-offset-4 text-muted-foreground" prefetch={false}>
            About Us
          </Link>
          <Link href="/contact" className="text-sm hover:underline underline-offset-4 text-muted-foreground" prefetch={false}>
            Contact Us
          </Link>
          <Link href="/blog" className="text-sm hover:underline underline-offset-4 text-muted-foreground" prefetch={false}>
            Blog
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
    </footer>
  );
}
