
'use client';

import Script from 'next/script';

export function AdBanner() {
  return (
    <div className="hidden md:flex justify-center items-center my-4">
      <Script id="adsterra-banner" strategy="afterInteractive">
        {`
          atOptions = {
            'key' : 'ff45dae65dd9f151b94cefb295608159',
            'format' : 'iframe',
            'height' : 90,
            'width' : 728,
            'params' : {}
          };
        `}
      </Script>
      <Script 
        id="adsterra-invoke"
        strategy="afterInteractive"
        src="//www.highperformanceformat.com/ff45dae65dd9f151b94cefb295608159/invoke.js"
      />
    </div>
  );
}
