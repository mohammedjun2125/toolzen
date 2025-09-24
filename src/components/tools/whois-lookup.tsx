
'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Search, Loader2 } from 'lucide-react';
import Link from 'next/link';

export default function WhoisLookup() {
    const [domain, setDomain] = useState('google.com');
    const [result, setResult] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const { toast } = useToast();

    const handleLookup = async () => {
        if (!domain.trim()) {
            toast({ variant: 'destructive', title: 'Please enter a domain name.' });
            return;
        }
        setIsLoading(true);
        setResult('');
        try {
            // Using a simple, free proxy for WHOIS lookups to avoid CORS issues.
            const response = await fetch(`https://api.toolzenweb.com/whois/${domain.trim()}`);
            if (!response.ok) {
                 const errorData = await response.text();
                 throw new Error(errorData || 'Failed to fetch WHOIS data.');
            }
            const data = await response.text();
            setResult(data);
        } catch (error: any) {
            toast({ variant: 'destructive', title: 'Lookup Failed', description: error.message });
            setResult(`Error: ${error.message}`);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
        <Card className="w-full shadow-lg rounded-lg bg-card/60 backdrop-blur-lg">
            <CardHeader>
                <CardTitle className="text-2xl">Free Online Whois Lookup Tool</CardTitle>
                <CardDescription>Use this **Whois lookup** tool to instantly **check domain owner information**, registration dates, and other public records. An essential **domain lookup** utility.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                <div className="flex gap-2">
                    <div className="flex-grow space-y-2">
                        <Label htmlFor="domain-input" className="sr-only">Domain</Label>
                        <Input
                            id="domain-input"
                            placeholder="e.g., google.com"
                            value={domain}
                            onChange={(e) => setDomain(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && handleLookup()}
                        />
                    </div>
                    <Button onClick={handleLookup} disabled={isLoading}>
                        {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Search className="mr-2 h-4 w-4" />}
                        Lookup
                    </Button>
                </div>

                {result && (
                    <div className="space-y-2">
                        <Label>WHOIS Raw Data</Label>
                        <pre className="p-4 bg-muted/50 rounded-lg text-xs overflow-x-auto h-96">{result}</pre>
                    </div>
                )}
            </CardContent>
        </Card>
        <article className="prose dark:prose-invert max-w-none mx-auto mt-12">
            <h2 className="text-2xl font-bold">What is a Whois Lookup?</h2>
            <p>A **Whois lookup** is a public query to a database that stores information about the owners of domain names. When a domain is registered, the owner's contact information is collected. This **free online Whois lookup tool** allows you to access this public record to see details like the domain registrar, registration date, expiration date, and name servers associated with a domain.</p>
            
            <h3>How to Use This Domain Lookup Tool</h3>
            <ol>
                <li><strong>Enter a Domain Name:</strong> Type the domain you want to investigate into the search box.</li>
                <li><strong>Initiate the Search:</strong> Click the "Lookup" button to perform the query.</li>
                <li><strong>Analyze the Results:</strong> The tool will display the raw WHOIS data provided by the domain's registrar.</li>
            </ol>
            
            <h3>Why Check Domain Owner Information?</h3>
            <ul>
                <li><strong>Business Intelligence:</strong> Research who is behind a competitor's website.</li>
                <li><strong>Security Research:</strong> Investigate the source of a suspicious domain or email.</li>
                <li><strong>Domain Purchasing:</strong> Find out when a domain is set to expire to potentially acquire it.</li>
            </ul>

            <div className="not-prose mt-8">
                <h3 className="text-xl font-semibold">Related Web Utilities</h3>
                <ul className="list-disc list-inside">
                    <li><Link href="/tools/dns-lookup" className="text-primary hover:underline">DNS Lookup</Link></li>
                    <li><Link href="/tools/ip-lookup" className="text-primary hover:underline">IP Lookup</Link></li>
                    <li><Link href="/tools/ssl-checker" className="text-primary hover:underline">SSL Checker</Link></li>
                </ul>
            </div>
        </article>
        </>
    );
}
