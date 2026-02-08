
import { SiteHeader } from '@/components/site-header';
import { SiteFooter } from '@/components/site-footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowLeft, Mail, MessageSquare, HelpCircle } from 'lucide-react';
import type { Metadata } from 'next';
import { ContactForm } from '@/components/contact-form';

export const metadata: Metadata = {
  title: 'Contact Toolzen | Feedback, Suggestions & Support',
  description: 'Get in touch with the Toolzen team. We value your feedback, suggestions for new tools, and questions about our free online utilities.',
  alternates: {
    canonical: '/contact',
  },
  openGraph: {
    title: 'Contact Toolzen | Feedback, Suggestions & Support',
    description: 'Get in touch with the Toolzen team. We value your feedback, suggestions for new tools, and questions about our free online utilities.',
    url: '/contact',
    siteName: 'Toolzen',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary',
    title: 'Contact Toolzen | Feedback, Suggestions & Support',
    description: 'Get in touch with the Toolzen team. We value your feedback, suggestions for new tools, and questions about our free online utilities.',
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
        <div className="max-w-4xl mx-auto">
            <Card className="bg-card/60 backdrop-blur-lg">
                <CardHeader className="text-center">
                    <CardTitle className="text-4xl font-serif">Get in Touch</CardTitle>
                    <p className="text-muted-foreground text-lg max-w-2xl mx-auto">We'd love to hear from you! Your feedback is invaluable in helping us build the best free online tools.</p>
                </CardHeader>
                <CardContent className="grid md:grid-cols-2 gap-12 p-8">
                    <div className="prose dark:prose-invert max-w-none">
                        <h3 className="flex items-center gap-2 font-serif"><MessageSquare className="text-primary"/> Why Contact Us?</h3>
                        <p>
                            We are passionate about creating a suite of tools that genuinely helps people. Whether you have a brilliant idea for a new utility, have encountered a bug, or just want to share your experience, we're here to listen.
                        </p>
                        
                        <h4 className="flex items-center gap-2 font-serif"><HelpCircle className="text-primary"/> We Welcome:</h4>
                        <ul>
                            <li><strong>Tool Suggestions:</strong> Is there a utility you wish existed but can't find? Let us know! Many of our best tools were inspired by user requests.</li>
                            <li><strong>Feedback & Improvements:</strong> Have an idea on how to make an existing tool better? We're all ears.</li>
                            <li><strong>Bug Reports:</strong> If something isn't working as expected, please tell us so we can fix it.</li>
                            <li><strong>General Inquiries:</strong> Questions about our privacy policy or how our tools work.</li>
                        </ul>

                        <h4 className="flex items-center gap-2 font-serif"><Mail className="text-primary"/> Or Email Us Directly</h4>
                        <p>
                          For all inquiries, you can also reach our support team directly at:
                          <br />
                          <a href="mailto:support@toolzenweb.com">support@toolzenweb.com</a>
                        </p>
                        <p>
                           Our team is based in the US (EST) and we aim to respond to all inquiries within 48 business hours. Please note that we are a small, dedicated team, so we appreciate your patience.
                        </p>
                         <div className="border-t pt-4 mt-4 text-sm text-muted-foreground">
                            <strong>Mailing Address:</strong><br/>
                            Toolzen Web Services<br/>
                            123 Digital Privacy Lane<br/>
                            Internet City, USA 10101
                        </div>
                    </div>
                    <div>
                        <h3 className="text-2xl font-serif mb-4 text-center">Send Us a Message</h3>
                        <ContactForm />
                    </div>
                </CardContent>
            </Card>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
