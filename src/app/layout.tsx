import type { Metadata } from 'next';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import { cn } from '@/lib/utils';

export const metadata: Metadata = {
  title: {
    default: 'Toolzen - A collection of free online tools',
    template: '%s | Toolzen',
  },
  description: 'Toolzen offers a suite of free, fast, and easy-to-use online tools, including image compression, PDF creation, password generation, and more. Boost your productivity with our privacy-focused, client-side utilities.',
  keywords: ['online tools', 'free tools', 'image compressor', 'pdf maker', 'password generator', 'developer tools', 'productivity', 'seo', 'vercel', 'google adsense'],
  authors: [{ name: 'Toolzen' }],
  creator: 'Toolzen',
  publisher: 'Toolzen',
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
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body className={cn('font-body antialiased')}>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
