import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google'
import Script from 'next/script';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import { cn } from '@/lib/utils';
import { ThemeProvider } from '@/components/theme-provider';
import { CookieConsent } from '@/components/cookie-consent';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })

export const metadata: Metadata = {
  title: {
    default: 'Toolzen - Free, Fast & Private Online Tools for Everyone',
    template: '%s | Toolzen',
  },
  description: 'Discover Toolzen, your ultimate suite of free, fast, and privacy-focused online tools. Compress images, create PDFs, generate passwords, convert units, and more—all within your browser. No uploads, no sign-ups.',
  keywords: ['free online tools', 'developer tools', 'image compressor', 'pdf maker', 'password generator', 'unit converter', 'json formatter', 'qr code generator', 'browser-based tools', 'privacy-first tools', 'fast web utilities', 'no-server tools', 'client-side tools'],
  authors: [{ name: 'Toolzen' }],
  creator: 'Toolzen',
  publisher: 'Toolzen',
  metadataBase: new URL('https://toolzen.com'), // Replace with your actual domain
  icons: {
    icon: '/favicon.svg',
  },
  openGraph: {
    title: 'Toolzen - The Ultimate Collection of Free Online Tools',
    description: 'A comprehensive collection of client-side, privacy-first tools for developers, designers, and students. Fast, free, and requires no downloads.',
    siteName: 'Toolzen',
    locale: 'en_US',
    type: 'website',
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
  return (
    <html lang="en" suppressHydrationWarning>
       <head>
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
