
import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google'
import Script from 'next/script';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import { cn } from '@/lib/utils';
import { ThemeProvider } from '@/components/theme-provider';
import { CookieConsent } from '@/components/cookie-consent';
import { Analytics } from '@vercel/analytics/react';
import { seoKeywords } from '@/lib/seo-keywords';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter', display: 'swap' })

const homeKeywords = seoKeywords.tools.home;

export const metadata: Metadata = {
  metadataBase: new URL('https://www.toolzenweb.com'),
  title: {
    default: homeKeywords.title_keywords.join(' - ') + ' | Toolzen',
    template: '%s | Toolzen',
  },
  description: `Toolzen offers a suite of ${homeKeywords.meta_keywords.join(', ')}. All our tools are fast, free, secure, and work on the client-side.`,
  keywords: homeKeywords.meta_keywords.concat(homeKeywords.high_cpc),
  authors: [{ name: 'Toolzen', url: 'https://www.toolzenweb.com' }],
  creator: 'Toolzen',
  publisher: 'Toolzen',
  openGraph: {
    title: homeKeywords.title_keywords.join(' - ') + ' | Toolzen',
    description: `A comprehensive collection of client-side, privacy-first tools for developers, designers, and students. Fast, free, and requires no downloads. Includes ${homeKeywords.meta_keywords.join(', ')}.`,
    siteName: 'Toolzen',
    locale: 'en_US',
    type: 'website',
    url: 'https://www.toolzenweb.com',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Toolzen - ' + homeKeywords.title_keywords.join(', '),
    description: `Boost your productivity with a suite of browser-based tools. From image compression to password generation, get it all done without ever leaving your browser. Explore tools for ${homeKeywords.meta_keywords.join(', ')}.`,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: '/favicon.svg',
    apple: '/apple-touch-icon.png',
  },
  manifest: '/site.webmanifest',
  verification: {
    google: 'TZ4ILWL6OcwJ1vjR2BrFEnCXjM1bWVMrl8lersFqt4g',
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: 'white' },
    { media: '(prefers-color-scheme: dark)', color: 'black' },
  ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Toolzen',
    url: 'https://www.toolzenweb.com',
    description: 'A comprehensive suite of free, fast, and privacy-focused online tools to boost your productivity.',
    potentialAction: {
      '@type': 'SearchAction',
      target: 'https://www.toolzenweb.com/tools/{search_term_string}',
      'query-input': 'required name=search_term_string',
    },
  };

  return (
    <html lang="en" suppressHydrationWarning>
       <head>
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8015189558686269"
     crossOrigin="anonymous"></script>
      </head>
      <body className={cn("min-h-screen bg-background font-sans antialiased", inter.variable)}>
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=G-Q1MVVGE6DC"
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          ></iframe>
        </noscript>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Toaster />
          <CookieConsent />
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}
