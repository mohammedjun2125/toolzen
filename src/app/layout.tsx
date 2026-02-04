
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
  metadataBase: new URL('https://toolzenweb.com'),
  title: 'Toolzen — Free Online Tools: PDF, Image, Text & Dev Utilities',
  description: 'Toolzen provides free, fast and private online tools — PDF, image, text, calculators and developer utilities. All client-side: no uploads, no accounts.',
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Toolzen — Free Online Tools',
    description: 'Compress PDFs, resize images, generate QR codes and more — fast, private, and free. Try our suite of client-side web utilities.',
    siteName: 'Toolzen',
    locale: 'en_US',
    type: 'website',
    url: 'https://toolzenweb.com/',
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: [
        { url: '/favicon.ico', sizes: 'any' },
        { url: '/favicon-32x32.png', type: 'image/png', sizes: '32x32' },
        { url: '/favicon-16x16.png', type: 'image/png', sizes: '16x16' }
    ],
    apple: '/apple-touch-icon.png',
  },
  manifest: '/site.webmanifest',
};

export const viewport: Viewport = {
  themeColor: '#0f172a',
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
    "url": "https://toolzenweb.com",
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://toolzenweb.com/?s={search_term_string}",
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
        <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9367491431332157"
     crossOrigin="anonymous"></script>
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
      <body className={cn("min-h-screen bg-background font-sans antialiased", roboto.variable, playfairDisplay.variable)}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem={false}
          disableTransitionOnChange
        >
          {children}
          <Toaster />
          <CookieConsent />
        </ThemeProvider>
        <Analytics />
        <RouteChangeHandler />
      </body>
    </html>
  );
}
