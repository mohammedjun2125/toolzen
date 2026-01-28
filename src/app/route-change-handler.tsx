
'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

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

  return null;
}
