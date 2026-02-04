import { SiteHeader } from '@/components/site-header';
import { SiteFooter } from '@/components/site-footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About Toolzen | Free & Private Online Tools',
  description: 'Learn about Toolzen\'s mission to provide fast, free, and privacy-focused online utilities that work on the client-side, ensuring your data is never uploaded or stored.',
  alternates: {
    canonical: '/about',
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
            <CardTitle className="text-3xl">About Toolzen</CardTitle>
          </CardHeader>
          <CardContent className="prose dark:prose-invert max-w-none">
            <p>
              Welcome to Toolzen, your go-to destination for a suite of powerful, free, and easy-to-use online utilities. Our mission is to boost your productivity by providing high-quality tools that are both fast and privacy-focused.
            </p>
            <p>
              In a world where data privacy is more important than ever, we've built Toolzen with a core principle: client-side processing. This means that for tools that handle your files—like our Image Compressor and PDF Maker—all the work happens directly in your browser. Your files are never uploaded to our servers, ensuring your data remains completely private and secure.
            </p>
            <h3>Our Philosophy</h3>
            <ul>
              <li><strong>Privacy First:</strong> Your data is yours. We don't want it, and we don't store it.</li>
              <li><strong>User-Friendly:</strong> Our tools are designed to be intuitive and straightforward. No complicated setups, no sign-ups required.</li>
              <li><strong>Performance:</strong> We believe tools should be fast. Built on modern web technologies, Toolzen delivers a snappy and responsive experience.</li>
              <li><strong>Free for Everyone:</strong> We are committed to keeping our core tools free and accessible to all users.</li>
            </ul>
            <p>
              Whether you're a developer, a designer, a student, or just someone looking to get things done more efficiently, Toolzen has something for you. We are constantly working on improving our existing tools and adding new ones to make your digital life easier.
            </p>
            <p>
              Thank you for choosing Toolzen. We hope you find our tools as useful as we do!
            </p>
          </CardContent>
        </Card>
      </main>
      <SiteFooter />
    </div>
  );
}
