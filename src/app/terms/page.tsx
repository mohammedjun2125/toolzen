'use client';

import { SiteHeader } from '@/components/site-header';
import { SiteFooter } from '@/components/site-footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function TermsPage() {
  const [currentDate, setCurrentDate] = useState('');

  useEffect(() => {
    setCurrentDate(new Date().toLocaleDateString());
  }, []);

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
            <CardTitle className="text-3xl">Terms of Use</CardTitle>
          </CardHeader>
          <CardContent className="prose dark:prose-invert max-w-none">
            <p>Last updated: {currentDate}</p>
            <p>
              Please read these terms and conditions carefully before using Our Service.
            </p>
            
            <h3>Acknowledgment</h3>
            <p>
              These are the Terms of Use governing the use of this Service and the agreement that operates between You and Toolzen. These Terms of Use set out the rights and obligations of all users regarding the use of the Service.
            </p>
            <p>
              Your access to and use of the Service is conditioned on Your acceptance of and compliance with these Terms of Use. These Terms of Use apply to all visitors, users and others who access or use the Service.
            </p>
            <p>
              By accessing or using the Service You agree to be bound by these Terms of Use. If You disagree with any part of these Terms of Use then You may not access the Service.
            </p>

            <h3>Use of Tools</h3>
            <p>
              Our tools are provided for your personal and commercial use. You agree not to use the Service for any unlawful purpose or in any way that could harm, disable, overburden, or impair the Service. Specifically, you agree not to:
            </p>
            <ul>
                <li>Automate access to the service through scripts, bots, or other means that could degrade the performance for other users.</li>
                <li>Attempt to decompile, reverse engineer, or otherwise discover the source code of our client-side tools.</li>
                <li>Use the service to process any illegal or infringing content.</li>
            </ul>

            <h3>Intellectual Property</h3>
            <p>
              The Service and its original content, features, and functionality are and will remain the exclusive property of Toolzen and its licensors.
            </p>

            <h3>Termination</h3>
            <p>
              We may terminate or suspend Your access immediately, without prior notice or liability, for any reason whatsoever, including without limitation if You breach these Terms of Use. Upon termination, Your right to use the Service will cease immediately.
            </p>

            <h3>"AS IS" and "AS AVAILABLE" Disclaimer</h3>
            <p>
              The Service is provided to You "AS IS" and "AS AVAILABLE" and with all faults and defects without warranty of any kind. To the maximum extent permitted under applicable law, Toolzen, on its own behalf and on behalf of its Affiliates and its and their respective licensors and service providers, expressly disclaims all warranties, whether express, implied, statutory or otherwise, with respect to the Service.
            </p>

            <h3>Governing Law</h3>
            <p>
              The laws of the Country, excluding its conflicts of law rules, shall govern this Terms and Your use of the Service.
            </p>

            <h3>Changes to These Terms of Use</h3>
            <p>
              We reserve the right, at Our sole discretion, to modify or replace these Terms at any time. If a revision is material We will make reasonable efforts to provide at least 30 days' notice prior to any new terms taking effect.
            </p>
            
            <h3>Contact Us</h3>
            <p>If you have any questions about these Terms of Use, You can contact us:</p>
            <ul>
              <li>By email: support@toolzen.com</li>
            </ul>
          </CardContent>
        </Card>
      </main>
      <SiteFooter />
    </div>
  );
}
