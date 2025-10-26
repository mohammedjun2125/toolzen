'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Script from 'next/script';

export function RouteChangeHandler() {
  const pathname = usePathname();

  useEffect(() => {
    // This will run on the initial load and on every route change.
    // We can ping sitemaps or trigger analytics here.
    const sitemapUrl = 'https://www.toolzenweb.com/sitemap.xml';
    const pingUrls = [
      'https://www.google.com/ping?sitemap=' + sitemapUrl,
      'https://www.bing.com/ping?sitemap=' + sitemapUrl,
    ];
    pingUrls.forEach(url => {
      // Use "no-cors" to avoid CORS issues, as we don't need the response.
      fetch(url, { method: 'GET', mode: 'no-cors' }).catch(console.error);
    });
  }, [pathname]); // Re-run the effect when the pathname changes.

  return (
    <>
      <Script
        id="google-analytics"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','G-Q1MVVGE6DC');
          `,
        }}
      />
       <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=G-Q1MVVGE6DC"
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          ></iframe>
        </noscript>
    </>
  );
}
