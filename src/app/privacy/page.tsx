
import { SiteHeader } from '@/components/site-header';
import { SiteFooter } from '@/components/site-footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy | Toolzen',
  description: 'Read the comprehensive privacy policy for Toolzen. Learn how we protect your data with our commitment to client-side processing and data minimization.',
  alternates: {
    canonical: '/privacy',
  },
  openGraph: {
    title: 'Privacy Policy | Toolzen',
    description: 'Read the comprehensive privacy policy for Toolzen. Learn how we protect your data with our commitment to client-side processing and data minimization.',
    url: '/privacy',
    siteName: 'Toolzen',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary',
    title: 'Privacy Policy | Toolzen',
    description: 'Read the comprehensive privacy policy for Toolzen. Learn how we protect your data with our commitment to client-side processing and data minimization.',
  },
};

export default function PrivacyPage() {
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
            <CardTitle className="text-3xl font-serif">Privacy Policy</CardTitle>
            <p className="text-muted-foreground pt-2">Last updated: August 18, 2024</p>
          </CardHeader>
          <CardContent className="prose dark:prose-invert max-w-none text-lg">
            <p>
              Welcome to Toolzen. Your privacy is not just a policy for us; it is the foundation upon which our tools are built. This Privacy Policy outlines our unwavering commitment to protecting your data and explains the types of information we collect and how we use it.
            </p>

            <h3 className="font-serif">The Core Principle: Client-Side Processing</h3>
            <p>
              The most important aspect of our service is **client-side processing**. For every tool on our platform that handles user-submitted files or data (such as our PDF Merger, Image Compressor, Password Generator, etc.), all operations are performed directly in your web browser on your own device.
            </p>
            <ul>
                <li><strong>Your files are never uploaded to our servers.</strong></li>
                <li><strong>Your data is never stored, logged, or analyzed by us.</strong></li>
                <li><strong>Your information never leaves your computer.</strong></li>
            </ul>
            <p>
              This means we have no access to the documents you edit, the images you compress, or the passwords you generate. This model provides the highest level of privacy and security possible for an online service.
            </p>
            
            <h3 className="font-serif">Information We Do Collect (Non-Personally Identifiable)</h3>
            <p>
              To improve our website and provide a better user experience, we collect a minimal amount of non-personally identifiable information. This data is aggregated and cannot be used to identify you individually.
            </p>
            <ul>
              <li><strong>Analytics Data:</strong> We use Vercel Analytics, a privacy-focused analytics service, to collect anonymous usage data. This includes information like the pages you visit, the country you are visiting from, your device type (desktop/mobile), and browser type. This helps us understand which tools are most popular and how we can improve our service. This data is anonymous and does not track you across different websites.</li>
              <li><strong>Performance Data:</strong> We may collect anonymous performance metrics to ensure our website is fast and reliable.</li>
            </ul>

            <h3 className="font-serif">Cookies and Web Storage</h3>
            <p>
              We use cookies and browser storage for essential website functionality and to understand user preferences.
            </p>
            <ul>
              <li><strong>Cookie Consent:</strong> We use `localStorage` to remember your consent to our cookie policy, so we don't have to ask you on every visit.</li>
              <li><strong>Tool-Specific Storage:</strong> Some tools, like our Simple Notes utility, use `localStorage` to save your data on your device so it's available when you return. This data is stored only in your browser and is not accessible to us.</li>
              <li><strong>Third-Party Cookies (Advertising):</strong> We may use Google AdSense to serve ads on our site. Google uses cookies (including the DART cookie) to serve ads based on a user's prior visits to our website and other websites on the internet. You can opt out of personalized advertising by visiting <a href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer">Google's Ads Settings</a>. For more information, please review Google's Privacy Policy.</li>
            </ul>

            <h3 className="font-serif">Data Security</h3>
            <p>
                We are committed to ensuring that our website is secure. We use HTTPS to encrypt all communication between your browser and our server (for loading the website itself). As your files and sensitive data are not transmitted to us, the primary security responsibility rests on keeping your own device secure.
            </p>

            <h3 className="font-serif">Your Rights (GDPR & CCPA)</h3>
            <p>
                Even though we collect minimal personal data, we respect your rights under privacy regulations like GDPR and CCPA. As we do not store personally identifiable information, requests for data access or deletion are generally not applicable. However, if you have any questions about the anonymous data we collect, you can contact us. You have the right to clear cookies and site data from your browser settings at any time.
            </p>
            
            <h3 className="font-serif">Changes to This Privacy Policy</h3>
            <p>
              We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last updated" date. We encourage you to review this Privacy Policy periodically for any changes.
            </p>

            <h3 className="font-serif">Contact Us</h3>
            <p>If you have any questions about this Privacy Policy or our commitment to your privacy, please do not hesitate to contact us:</p>
            <ul>
              <li>By email: <a href="mailto:support@toolzenweb.com">support@toolzenweb.com</a></li>
              <li>Via our <Link href="/contact">Contact Page</Link></li>
            </ul>
          </CardContent>
        </Card>
      </main>
      <SiteFooter />
    </div>
  );
}
