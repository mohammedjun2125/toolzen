
'use client';

import { SiteHeader } from '@/components/site-header';
import { SiteFooter } from '@/components/site-footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy | Toolzen',
  description: 'Read the privacy policy for Toolzen. We are committed to protecting your data with client-side tools that never upload your files.',
  alternates: {
    canonical: '/privacy',
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
            <CardTitle className="text-3xl">Privacy Policy</CardTitle>
          </CardHeader>
          <CardContent className="prose dark:prose-invert max-w-none">
            <p>
              This Privacy Policy describes Our policies and procedures on the collection, use and disclosure of Your information when You use the Service and tells You about Your privacy rights and how the law protects You.
            </p>

            <h3>Interpretation and Definitions</h3>
            <p>
              The words of which the initial letter is capitalized have meanings defined under the following conditions. The following definitions shall have the same meaning regardless of whether they appear in singular or in plural.
            </p>

            <h3>Client-Side Processing and Data Privacy</h3>
            <p>
              A core principle of Toolzen is user privacy. For tools that handle user-submitted files (such as the Image Compressor, PDF Maker, Color Palette Extractor, and E-commerce Label Cropper), all processing is done entirely on the client-side, within your web browser. <strong>Your files are never uploaded, sent to, or stored on our servers.</strong> The data you provide remains on your device.
            </p>
            
            <h3>Advertising and Cookies</h3>
            <p>
              We use third-party advertising companies, including Google AdSense, to serve ads when you visit our website. These companies may use information (not including your name, address, email address, or telephone number) about your visits to this and other websites in order to provide advertisements about goods and services of interest to you.
            </p>
            <ul>
              <li>Google, as a third-party vendor, uses cookies to serve ads on our site.</li>
              <li>Google's use of the DART cookie enables it to serve ads to our users based on their visit to our sites and other sites on the Internet.</li>
              <li>Users may opt out of the use of the DART cookie by visiting the Google ad and content network privacy policy.</li>
            </ul>
            <p>
              We use cookies to get your consent for advertising and to analyze our traffic. By using our website and consenting via our cookie banner, you agree to this use.
            </p>
            
            <h3>Information We Collect</h3>
            <p>
              We may collect non-personally identifiable information for analytics purposes, such as browser type, language preference, referring site, and the date and time of each visitor request. Our purpose in collecting this information is to better understand how our visitors use the website.
            </p>
            
            <h3>Changes to This Privacy Policy</h3>
            <p>
              We may update Our Privacy Policy from time to time. We will notify You of any changes by posting the new Privacy Policy on this page. We will let You know via email and/or a prominent notice on Our Service, prior to the change becoming effective and update the "Last updated" date at the top of this Privacy Policy.
            </p>

            <h3>Contact Us</h3>
            <p>If you have any questions about this Privacy Policy, You can contact us:</p>
            <ul>
              <li>By email: support@toolzenweb.com</li>
            </ul>
          </CardContent>
        </Card>
      </main>
      <SiteFooter />
    </div>
  );
}
