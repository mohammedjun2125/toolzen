
import { SiteHeader } from '@/components/site-header';
import { SiteFooter } from '@/components/site-footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact Toolzen | Suggestions & Support',
  description: 'Get in touch with the Toolzen team. We welcome your questions, feedback, and suggestions for new free online tools.',
  alternates: {
    canonical: '/contact',
  },
  openGraph: {
    title: 'Contact Toolzen | Suggestions & Support',
    description: 'Get in touch with the Toolzen team. We welcome your questions, feedback, and suggestions for new free online tools.',
    url: '/contact',
    siteName: 'Toolzen',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary',
    title: 'Contact Toolzen | Suggestions & Support',
    description: 'Get in touch with the Toolzen team. We welcome your questions, feedback, and suggestions for new free online tools.',
  },
};

export default function ContactPage() {
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
            <CardTitle className="text-3xl">Contact Us</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="prose dark:prose-invert max-w-none mb-6">
              We'd love to hear from you! Whether you have a question, a suggestion for a new tool, or just want to say hello, feel free to reach out.
            </p>
            <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input id="name" placeholder="Your Name" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="your.email@example.com" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="message">Message</Label>
                <Textarea id="message" placeholder="Your message..." rows={5} />
              </div>
              <Button type="submit" className="w-full">Send Message</Button>
            </form>
            <div className="prose dark:prose-invert max-w-none mt-6">
                <h3 className="mt-6">Or Email Us Directly</h3>
                <p>
                  For all inquiries, you can also email us at:
                  <br />
                  <a href="mailto:support@toolzenweb.com">support@toolzenweb.com</a>
                </p>
            </div>
          </CardContent>
        </Card>
      </main>
      <SiteFooter />
    </div>
  );
}
