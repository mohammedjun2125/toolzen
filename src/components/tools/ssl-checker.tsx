
'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Search, Loader2, ShieldCheck, ShieldX } from 'lucide-react';
import Link from 'next/link';

export default function SslChecker() {
    const [domain, setDomain] = useState('google.com');
    const [result, setResult] = useState<any | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const { toast } = useToast();

    const handleLookup = async () => {
        if (!domain.trim()) {
            toast({ variant: 'destructive', title: 'Please enter a domain name.' });
            return;
        }
        setIsLoading(true);
        setResult(null);
        try {
            // Using a free, public API for SSL checks
            const response = await fetch(`https://api.toolzenweb.com/ssl/${domain.trim()}`);
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Failed to fetch SSL certificate data.');
            }
            const data = await response.json();
            setResult(data);
        } catch (error: any) {
            toast({ variant: 'destructive', title: 'Lookup Failed', description: error.message });
            setResult({ error: error.message });
        } finally {
            setIsLoading(false);
        }
    };
    
    const daysLeft = result?.days_remaining;
    const isExpired = daysLeft !== undefined && daysLeft <= 0;
    const isSoonToExpire = daysLeft !== undefined && daysLeft > 0 && daysLeft <= 30;

    return (
        <>
        <Card className="w-full shadow-lg rounded-lg bg-card/60 backdrop-blur-lg">
            <CardHeader>
                <CardTitle className="text-2xl">Free Online SSL Checker Tool</CardTitle>
                <CardDescription>Use this **SSL checker** to instantly verify the SSL certificate of any website and get details like issuer and expiry date. An essential **SSL tool** for webmasters.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                <div className="flex gap-2">
                    <Input
                        placeholder="e.g., google.com"
                        value={domain}
                        onChange={(e) => setDomain(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleLookup()}
                        aria-label="Domain name for SSL check"
                    />
                    <Button onClick={handleLookup} disabled={isLoading}>
                        {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Search className="mr-2 h-4 w-4" />}
                        Check
                    </Button>
                </div>

                {isLoading && <Loader2 className="mx-auto h-8 w-8 animate-spin" />}

                {result && !result.error && (
                    <div className="space-y-4">
                        <div className={`p-4 rounded-lg flex items-center gap-4 ${isExpired ? 'bg-destructive/20 text-destructive' : isSoonToExpire ? 'bg-yellow-500/20 text-yellow-500' : 'bg-green-500/20 text-green-500'}`}>
                           {isExpired ? <ShieldX className="h-8 w-8"/> : <ShieldCheck className="h-8 w-8"/>}
                           <div>
                                <h3 className="font-bold text-lg">
                                    {isExpired ? 'Certificate is EXPIRED' : `Valid for ${daysLeft} more days`}
                                </h3>
                                <p className="text-sm">
                                    Expires on: {new Date(result.valid_to).toLocaleDateString()}
                                </p>
                           </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                            <InfoItem label="Common Name" value={result.issuer_cn} />
                            <InfoItem label="Issuer" value={result.issuer_o} />
                            <InfoItem label="Valid From" value={new Date(result.valid_from).toLocaleDateString()} />
                            <InfoItem label="Valid To" value={new Date(result.valid_to).toLocaleDateString()} />
                             <InfoItem label="Signature Algorithm" value={result.signature_algorithm} />
                        </div>
                    </div>
                )}
                
                 {result && result.error && (
                    <div className="p-4 rounded-lg bg-destructive/20 text-destructive text-center">
                        <h3 className="font-bold">Error</h3>
                        <p>{result.error}</p>
                    </div>
                 )}
            </CardContent>
        </Card>
        <article className="prose dark:prose-invert max-w-none mx-auto mt-12">
            <h2 className="text-2xl font-bold">What is an SSL Checker?</h2>
            <p>An **SSL checker** is a tool that allows you to verify the Secure Sockets Layer (SSL) certificate of any website. An SSL certificate is a digital certificate that authenticates a website's identity and enables an encrypted connection. This **free online SSL checker tool** provides vital information about a site's certificate, helping you ensure it is valid, up-to-date, and correctly configured.</p>
            
            <h3>How to Check SSL Certificate Validity</h3>
            <ol>
                <li><strong>Enter a Domain:</strong> Type the website domain you want to check (e.g., google.com) into the input field.</li>
                <li><strong>Click "Check":</strong> The **SSL tool** will connect to the domain and retrieve its SSL certificate details.</li>
                <li><strong>Review the Results:</strong> The tool will display the certificate's validity period, issuer, and the number of days until expiration.</li>
            </ol>
            
            <h3>Why Use an SSL Checker Tool?</h3>
            <ul>
                <li><strong>Security Audits:</strong> Quickly verify that your website's SSL certificate is properly installed and not expired.</li>
                <li><strong>Troubleshooting:</strong> Diagnose "Your connection is not private" errors by checking if a certificate has expired or is misconfigured.</li>
                <li>**Information Gathering:** Get details about a website's security setup and issuing authority.</li>
            </ul>

            <div className="not-prose mt-8">
                <h3 className="text-xl font-semibold">Other Developer Utilities</h3>
                <ul className="list-disc list-inside">
                    <li><Link href="/tools/dns-lookup" className="text-primary hover:underline">DNS Lookup</Link></li>
                    <li><Link href="/tools/whois-lookup" className="text-primary hover:underline">Whois Lookup</Link></li>
                    <li><Link href="/tools/ip-lookup" className="text-primary hover:underline">IP Lookup</Link></li>
                </ul>
            </div>
        </article>
        </>
    );
}

function InfoItem({ label, value }: { label: string, value: string | number }) {
    if (!value) return null;
    return (
        <div className="p-3 bg-muted/50 rounded-lg break-words">
            <p className="text-xs text-muted-foreground">{label}</p>
            <p className="font-semibold">{value}</p>
        </div>
    )
}
