
import type { Metadata, Viewport } from 'next';
import { Roboto, Playfair_Display } from 'next/font/google'
import Script from 'next/script';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import { cn } from '@/lib/utils';
import { ThemeProvider } from '@/components/theme-provider';
import { CookieConsent } from '@/components/cookie-consent';
import { Analytics } from '@vercel/analytics/react';
import { RouteChangeHandler } from '@/components/route-change-handler';
import { AdBanner } from '@/components/ad-banner';

const roboto = Roboto({
  subsets: ['latin'],
  display: 'swap',
  weight: ['400', '500', '700'],
  variable: '--font-roboto',
});

const playfairDisplay = Playfair_Display({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-playfair',
});


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
        <Script id="adsterra-popunder" strategy="beforeInteractive">
          {`
            var script = document.createElement('script');
            script.type = 'text/javascript';
            script.src = '//pl27932946.effectivegatecpm.com/38/63/b8/3863b8282ab28a49606fb8918faaa1ce.js';
            document.head.appendChild(script);
          `}
        </Script>
      </head>
      <body className={cn("min-h-screen bg-background font-sans antialiased", roboto.variable, playfairDisplay.variable)}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Toaster />
          <CookieConsent />
        </ThemeProvider>
        <Analytics />
        <RouteChangeHandler />
        <Script id="adsterra-native-banner" src="//pl27932954.effectivegatecpm.com/32/ac/4f/32ac4f2b10f0f4b676dc4fad57835799.js" strategy="lazyOnload" />
      </body>
    </html>
  );
}
