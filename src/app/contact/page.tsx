import { SiteHeader } from '@/components/site-header';
import { SiteFooter } from '@/components/site-footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function ContactPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <SiteHeader />
      <main className="flex-1 container mx-auto px-4 md:px-6 py-12">
        <Card className="max-w-3xl mx-auto bg-card/60 backdrop-blur-lg">
          <CardHeader>
            <CardTitle className="text-3xl">Contact Us</CardTitle>
          </CardHeader>
          <CardContent className="prose dark:prose-invert max-w-none">
            <p>
              We'd love to hear from you! Whether you have a question, a suggestion for a new tool, or just want to say hello, feel free to reach out.
            </p>
            <p>
              Your feedback is invaluable to us as we continue to improve and expand Toolzen.
            </p>
            
            <h3 className="mt-6">Email Us</h3>
            <p>
              For all inquiries, please email us at:
              <br />
              <a href="mailto:support@toolzen.com">support@toolzen.com</a>
            </p>
            <p>
              We do our best to respond to all emails within 2-3 business days.
            </p>
          </CardContent>
        </Card>
      </main>
      <SiteFooter />
    </div>
  );
}