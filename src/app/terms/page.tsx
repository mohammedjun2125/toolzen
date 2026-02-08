
import { SiteHeader } from '@/components/site-header';
import { SiteFooter } from '@/components/site-footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms of Use | Toolzen',
  description: 'Read the official Terms of Use for Toolzen. By using our free online tools, you agree to be bound by these terms and conditions.',
  alternates: {
    canonical: '/terms',
  },
  openGraph: {
    title: 'Terms of Use | Toolzen',
    description: 'Read the official Terms of Use for Toolzen. By using our free online tools, you agree to be bound by these terms and conditions.',
    url: '/terms',
    siteName: 'Toolzen',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary',
    title: 'Terms of Use | Toolzen',
    description: 'Read the official Terms of Use for Toolzen. By using our free online tools, you agree to be bound by these terms and conditions.',
  },
};

export default function TermsPage() {
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
            <CardTitle className="text-3xl font-serif">Terms of Use</CardTitle>
            <p className="text-muted-foreground pt-2">Last updated: August 18, 2024</p>
          </CardHeader>
          <CardContent className="prose dark:prose-invert max-w-none text-lg">
            <p>
              Please read these Terms of Use ("Terms", "Terms of Use") carefully before using the https://www.toolzenweb.com website (the "Service") operated by Toolzen ("us", "we", or "our").
            </p>
            
            <h3 className="font-serif">1. Acknowledgment and Acceptance</h3>
            <p>
              These are the Terms of Use governing the use of this Service and the agreement that operates between you and Toolzen. These Terms set out the rights and obligations of all users regarding the use of the Service.
            </p>
            <p>
              Your access to and use of the Service is conditioned on your acceptance of and compliance with these Terms. These Terms apply to all visitors, users, and others who access or use the Service. By accessing or using the Service, you agree to be bound by these Terms of Use. If you disagree with any part of these Terms, then you may not access the Service.
            </p>
            <p>Your access to and use of the Service is also conditioned on your acceptance of and compliance with our <Link href="/privacy">Privacy Policy</Link>.</p>

            <h3 className="font-serif">2. Use of Tools and Services</h3>
            <p>
              Our tools are provided for your personal and commercial use, free of charge. You agree not to use the Service for any unlawful purpose or in any way that could harm, disable, overburden, or impair the Service or interfere with any other party's use of the Service. Specifically, you agree not to:
            </p>
            <ul>
                <li>Automate access to the service through scripts, bots, or other means that could degrade the performance for other users. Our tools are designed for manual, interactive use.</li>
                <li>Attempt to decompile, reverse engineer, or otherwise discover the source code of our client-side tools, except to the extent that such activities are expressly permitted by applicable law.</li>
                <li>Use the service to process any content that is illegal, infringing on intellectual property rights, hateful, or malicious. You are solely responsible for the content you process with our tools.</li>
                <li>Misrepresent your identity or affiliation with any person or entity.</li>
            </ul>

            <h3 className="font-serif">3. Intellectual Property</h3>
            <p>
              The Service and its original content (excluding data processed by you), features, and functionality are and will remain the exclusive property of Toolzen and its licensors. The Service is protected by copyright, trademark, and other laws of both the United States and foreign countries. Our trademarks and trade dress may not be used in connection with any product or service without the prior written consent of Toolzen.
            </p>

            <h3 className="font-serif">4. "AS IS" and "AS AVAILABLE" Disclaimer</h3>
            <p>
              The Service is provided to you "AS IS" and "AS AVAILABLE" and with all faults and defects without warranty of any kind. To the maximum extent permitted under applicable law, Toolzen, on its own behalf and on behalf of its affiliates and its and their respective licensors and service providers, expressly disclaims all warranties, whether express, implied, statutory or otherwise, with respect to the Service. This includes all implied warranties of merchantability, fitness for a particular purpose, title, and non-infringement.
            </p>
            <p>
                Without limitation to the foregoing, we provide no warranty or undertaking, and make no representation of any kind that the Service will meet your requirements, achieve any intended results, be compatible or work with any other software, applications, systems or services, operate without interruption, meet any performance or reliability standards or be error free or that any errors or defects can or will be corrected. For more details, please see our full <Link href="/disclaimer">Disclaimer</Link>.
            </p>
            
            <h3 className="font-serif">5. Limitation of Liability</h3>
            <p>
                To the maximum extent permitted by applicable law, in no event shall Toolzen or its suppliers be liable for any special, incidental, indirect, or consequential damages whatsoever (including, but not limited to, damages for loss of profits, loss of data or other information, for business interruption, for personal injury, loss of privacy arising out of or in any way related to the use of or inability to use the Service) even if Toolzen or any supplier has been advised of the possibility of such damages.
            </p>

            <h3 className="font-serif">6. Termination</h3>
            <p>
              We may terminate or suspend your access immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach these Terms of Use. Upon termination, your right to use the Service will cease immediately.
            </p>

            <h3 className="font-serif">7. Governing Law</h3>
            <p>
              The laws of the United States, excluding its conflicts of law rules, shall govern these Terms and your use of the Service. Your use of the Application may also be subject to other local, state, national, or international laws.
            </p>

            <h3 className="font-serif">8. Changes to These Terms of Use</h3>
            <p>
              We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is material, we will make reasonable efforts to provide at least 30 days' notice prior to any new terms taking effect by updating the "Last updated" date on this page. What constitutes a material change will be determined at our sole discretion.
            </p>
            
            <h3 className="font-serif">9. Contact Us</h3>
            <p>If you have any questions about these Terms of Use, you can contact us:</p>
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
