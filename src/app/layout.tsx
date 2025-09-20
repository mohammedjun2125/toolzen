
import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google'
import Script from 'next/script';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import { cn } from '@/lib/utils';
import { ThemeProvider } from '@/components/theme-provider';
import { CookieConsent } from '@/components/cookie-consent';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter', display: 'swap' })

export const metadata: Metadata = {
  metadataBase: new URL('https://www.toolzenweb.com'),
  title: {
    default: 'Toolzen - Free, Fast & Private Online Tools for Everyone',
    template: '%s | Toolzen',
  },
  description: 'Discover Toolzen, your ultimate suite of free, fast, and privacy-focused online tools. Compress images, create PDFs, generate passwords, convert units, and more—all within your browser. No uploads, no sign-ups.',
  keywords: ['free online tools', 'developer tools', 'image compressor', 'pdf maker', 'password generator', 'unit converter', 'json formatter', 'qr code generator', 'browser-based tools', 'privacy-first tools', 'fast web utilities', 'no-server tools', 'client-side tools'],
  authors: [{ name: 'Toolzen', url: 'https://www.toolzenweb.com' }],
  creator: 'Toolzen',
  publisher: 'Toolzen',
  openGraph: {
    title: 'Toolzen - The Ultimate Collection of Free Online Tools',
    description: 'A comprehensive collection of client-side, privacy-first tools for developers, designers, and students. Fast, free, and requires no downloads.',
    siteName: 'Toolzen',
    locale: 'en_US',
    type: 'website',
    url: 'https://www.toolzenweb.com',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Toolzen - Fast, Free, and Private Online Utilities',
    description: 'Boost your productivity with a suite of browser-based tools. From image compression to password generation, get it all done without ever leaving your browser.',
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
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
    apple: '/apple-touch-icon.png',
    other: {
      rel: 'icon',
      url: '/favicon.svg',
      type: 'image/svg+xml',
    },
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {/*
          AdSense script is currently disabled. 
          To enable, uncomment the Script component below and replace 
          ca-pub-XXXXXXXXXXXXXXXX with your own publisher ID.
        */}
        {/*
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-XXXXXXXXXXXXXXXX"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
        */}
      </head>
      <body className={cn("min-h-screen bg-background font-sans antialiased", inter.variable)}>
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
      </body>
    </html>
  );
}
