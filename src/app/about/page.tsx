
import { SiteHeader } from '@/components/site-header';
import { SiteFooter } from '@/components/site-footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About Toolzen | Our Mission for Private & Free Online Tools',
  description: 'Learn about Toolzen\'s mission. We are dedicated to creating fast, free, and genuinely private online utilities that respect your data by processing everything on the client-side.',
  alternates: {
    canonical: '/about',
  },
  openGraph: {
    title: 'About Toolzen | Our Mission for Private & Free Online Tools',
    description: 'Learn about Toolzen\'s mission. We are dedicated to creating fast, free, and genuinely private online utilities that respect your data by processing everything on the client-side.',
    url: '/about',
    siteName: 'Toolzen',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary',
    title: 'About Toolzen | Our Mission for Private & Free Online Tools',
    description: 'Learn about Toolzen\'s mission. We are dedicated to creating fast, free, and genuinely private online utilities that respect your data by processing everything on the client-side.',
  },
};

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <SiteHeader />
      <main className="flex-1 container mx-auto px-4 md:px-6 py-12">
        <Button asChild variant="ghost" className="mb-4">
          <Link href="/">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Home
          </Link>
        </Button>
        <Card className="max-w-3xl mx-auto bg-card/60 backdrop-blur-lg">
          <CardHeader>
            <CardTitle className="text-3xl font-serif">About Toolzen: Your Privacy-First Productivity Hub</CardTitle>
          </CardHeader>
          <CardContent className="prose dark:prose-invert max-w-none text-lg">
            <p>
              In a digital world that increasingly demands your data, Toolzen was born from a simple yet powerful idea: what if essential online tools could be powerful, free, and genuinely private? We believe that you shouldn't have to trade your privacy for convenience. That's why we created a suite of high-quality utilities that work entirely on your device, ensuring your files, data, and sensitive information are never uploaded, stored, or seen by anyone else.
            </p>
            
            <h3 className="font-serif">Our Core Philosophy: The Client-Side Promise</h3>
            <p>
              The magic behind Toolzen lies in **client-side processing**. Unlike most online services that require you to upload your files to their servers, our tools run directly in your web browser. When you compress an image, merge a PDF, or generate a password, the entire process happens locally on your computer. Your data never leaves your control.
            </p>
            <p>This approach is central to our mission and delivers three key benefits:</p>
            <ul>
              <li><strong>Absolute Privacy:</strong> We cannot see, store, or access your data even if we wanted to. This makes Toolzen safe to use for confidential business documents, personal photos, and everything in between.</li>
              <li><strong>Unmatched Speed:</strong> By eliminating the need for uploads and downloads to a server, our tools are incredibly fast. You get instant results without waiting for network traffic.</li>
              <li><strong>Total Security:</strong> With no central servers holding user files, there is nothing for hackers to target. Your data stays where it belongs—with you.</li>
            </ul>

            <h3 className="font-serif">The Toolzen Story</h3>
            <p>
              Toolzen was founded by a small team of developers and privacy advocates who were frustrated with the state of online utilities. We saw too many "free" services that were slow, cluttered with ads, and, most worryingly, built on business models that involved collecting and monetizing user data. We knew there had to be a better way.
            </p>
            <p>
              We set out to build a comprehensive suite of tools that we would want to use ourselves: clean, intuitive, and respectful of user privacy. From powerful PDF and image editors to essential developer utilities and everyday calculators, every tool on our platform is crafted with the same commitment to quality and security. We are passionate about demonstrating that it's possible to provide immense value to users for free, without compromising their privacy.
            </p>
            
            <h3 className="font-serif">Who We Build For</h3>
            <p>
              Our tools are designed for everyone.
            </p>
            <ul>
              <li><strong>Students</strong> who need to compile research, count words for essays, and convert files for assignments.</li>
              <li><strong>Developers</strong> who require quick, reliable tools for formatting JSON, generating hashes, or encoding URLs.</li>
              <li><strong>Digital Marketers and Content Creators</strong> who need to optimize images, create QR codes, and analyze text.</li>
              <li><strong>E-commerce Sellers</strong> who need to streamline their shipping process by cropping labels for thermal printers.</li>
              <li><strong>Everyday Users</strong> who simply want to calculate a discount, convert a unit, or generate a secure password without giving their data away.</li>
            </ul>

            <h3 className="font-serif">Our Commitment to the Future</h3>
            <p>
              We are continuously working to improve our existing tools and build new ones based on user feedback. Our goal is to become the web's most trusted and comprehensive resource for free, private online utilities. We believe in a more transparent and respectful internet, and we're proud to be building a small part of it.
            </p>
            <p>
              Thank you for trusting Toolzen. We hope you find our tools as useful and empowering as we do.
            </p>
          </CardContent>
        </Card>
      </main>
      <SiteFooter />
    </div>
  );
}
