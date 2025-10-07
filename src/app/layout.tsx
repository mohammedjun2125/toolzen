
import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google'
import Script from 'next/script';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import { cn } from '@/lib/utils';
import { ThemeProvider } from '@/components/theme-provider';
import { CookieConsent } from '@/components/cookie-consent';
import { Analytics } from '@vercel/analytics/react';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter', display: 'swap' })

export const metadata: Metadata = {
  metadataBase: new URL('https://www.toolzenweb.com'),
  title: 'Toolzen — Free Online Tools: PDF, Image, Text & Dev Utilities',
  description: 'Toolzen provides free, fast and private online tools — PDF, image, text, calculators and developer utilities. All client-side: no uploads, no accounts.',
  alternates: {
    canonical: 'https://www.toolzenweb.com/',
  },
  openGraph: {
    title: 'Toolzen — Free Online Tools',
    description: 'Compress PDFs, resize images, generate QR codes and more — fast, private, and free. Try our suite of client-side web utilities.',
    siteName: 'Toolzen',
    locale: 'en_US',
    type: 'website',
    url: 'https://www.toolzenweb.com/',
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: '/favicon.svg',
    apple: '/apple-touch-icon.png',
  },
  manifest: '/site.webmanifest',
  verification: {
    google: 'ca-pub-8015189558686269',
  },
  other: {
    'google-adsense-account': 'ca-pub-8015189558686269',
  }
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
  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Toolzen",
    "url": "https://www.toolzenweb.com",
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://www.toolzenweb.com/?s={search_term_string}",
      "query-input": "required name=search_term_string"
    }
  };

  const faqSchema = {
    "@context":"https://schema.org",
    "@type":"FAQPage",
    "mainEntity": [
      {
        "@type":"Question",
        "name":"Are Toolzen tools private?",
        "acceptedAnswer":{
          "@type":"Answer",
          "text":"Yes. Most Toolzen utilities run client-side in your browser — files and data are never uploaded to our servers."
        }
      },
      {
        "@type":"Question",
        "name":"Do I need an account to use Toolzen?",
        "acceptedAnswer":{
          "@type":"Answer",
          "text":"No account or signup required — simply open any tool and start using it instantly."
        }
      },
      {
        "@type":"Question",
        "name":"How do I compress a PDF without losing quality?",
        "acceptedAnswer":{
          "@type":"Answer",
          "text":"Use Toolzen’s PDF Compressor and choose 'Recommended' or 'High Quality' compression. Processing happens entirely in your browser for best results."
        }
      }
    ]
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
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8015189558686269"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
          suppressHydrationWarning
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
          suppressHydrationWarning
        />
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
