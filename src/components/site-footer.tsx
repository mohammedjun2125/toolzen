import Link from 'next/link';
import Script from 'next/script';

export function SiteFooter() {
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
      <div id="ad-footer" className="min-h-[100px] min-w-[300px] mx-auto flex items-center justify-center text-muted-foreground mt-8">
        {/* <!-- Footer Banner Ad --> */}
        <ins className="adsbygoogle"
            style={{ display: 'block' }}
            data-ad-client="ca-pub-XXXXXXXXXXXXXXXX"
            data-ad-slot="1234567890"
            data-ad-format="auto"
            data-full-width-responsive="true"></ins>
        <Script id="init-footer-ad">
            {`(adsbygoogle = window.adsbygoogle || []).push({});`}
        </Script>
      </div>
    </footer>
  );
}
