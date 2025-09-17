import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google'
import Script from 'next/script';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import { cn } from '@/lib/utils';
import { ThemeProvider } from '@/components/theme-provider';
import { SiteHeader } from '@/components/site-header';
import { SiteFooter } from '@/components/site-footer';
import { CookieConsent } from '@/components/cookie-consent';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })

export const metadata: Metadata = {
  title: {
    default: 'Toolzen - Your Ultimate Digital Toolkit',
    template: '%s | Toolzen',
  },
  description: 'A suite of free, fast, and privacy-focused online tools to boost your productivity. Image compressor, PDF maker, password generator, and more.',
  keywords: ['online tools', 'free tools', 'image compressor', 'pdf maker', 'password generator', 'developer tools', 'productivity', 'seo', 'adsense'],
  authors: [{ name: 'Toolzen' }],
  creator: 'Toolzen',
  publisher: 'Toolzen',
  metadataBase: new URL('https://toolzen.com'), // Replace with your actual domain
  icons: {
    icon: '/favicon.svg',
  },
  openGraph: {
    title: 'Toolzen - Free Online Tools for Everyone',
    description: 'A collection of client-side, privacy-first tools to help you with your daily tasks.',
    siteName: 'Toolzen',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Toolzen - Free Online Tools for Everyone',
    description: 'A collection of client-side, privacy-first tools to help you with your daily tasks.',
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
