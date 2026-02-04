
'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Search, Loader2 } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Link from 'next/link';
import { seoKeywords } from '@/lib/seo-keywords';

const recordTypes = ['A', 'AAAA', 'MX', 'TXT', 'CNAME', 'NS', 'SOA'];

export default function DnsLookup() {
    const [domain, setDomain] = useState('google.com');
    const [type, setType] = useState('A');
    const [result, setResult] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const { toast } = useToast();

    const toolKeywords = (seoKeywords.tools as any)['dns-lookup'];

    const handleLookup = async () => {
        if (!domain.trim()) {
            toast({ variant: 'destructive', title: 'Please enter a domain name.' });
            return;
        }
        setIsLoading(true);
        setResult([]);
        try {
            // Using Google's Public DNS-over-HTTPS API
            const response = await fetch(`https://dns.google/resolve?name=${domain.trim()}&type=${type}`);
            if (!response.ok) {
                throw new Error('Failed to fetch DNS data.');
            }
            const data = await response.json();
            if (data.Answer) {
                setResult(data.Answer);
            } else {
                 setResult([]);
                 toast({title: 'No records found', description: `No ${type} records found for ${domain}.`})
            }
        } catch (error: any) {
            toast({ variant: 'destructive', title: 'Lookup Failed', description: error.message });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
        <Card className="w-full shadow-lg rounded-lg bg-card/60 backdrop-blur-lg">
            <CardHeader>
                <CardTitle className="text-2xl">{toolKeywords.title_keywords.join(' - ')}</CardTitle>
                <CardDescription>Perform a **{toolKeywords.meta_keywords[0]}** for any domain. Check **{toolKeywords.meta_keywords.slice(1).join(', ')}** and more with our **free DNS checker tool**.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                <div className="flex flex-col sm:flex-row gap-2">
                    <Input
                        placeholder="e.g., google.com"
                        value={domain}
                        onChange={(e) => setDomain(e.target.value)}
                        className="flex-grow text-base"
                    />
                    <Select value={type} onValueChange={setType}>
                        <SelectTrigger className="w-full sm:w-[120px]">
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                            {recordTypes.map(t => <SelectItem key={t} value={t}>{t}</SelectItem>)}
                        </SelectContent>
                    </Select>
                    <Button onClick={handleLookup} disabled={isLoading} className="w-full sm:w-auto">
                        {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Search className="mr-2 h-4 w-4" />}
                        Lookup
                    </Button>
                </div>

                {result.length > 0 && (
                    <div className="space-y-2">
                        <Label>DNS Records</Label>
                        <div className="p-4 bg-muted/50 rounded-lg text-xs space-y-2 overflow-x-auto">
                            {result.map((record, index) => (
                                <div key={index} className="font-mono flex flex-wrap gap-x-4">
                                    <span className="w-24 font-bold">{record.name}</span>
                                    <span className="w-12 text-muted-foreground">TTL {record.TTL}</span>
                                    <span className="w-12">{record.type}</span>
                                    <span className="flex-1 break-all">{record.data}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </CardContent>
        </Card>
        <article className="prose dark:prose-invert max-w-none mx-auto mt-12">
            <h2 className="text-2xl font-bold">What is the DNS Lookup Tool?</h2>
            <p>The DNS Lookup Tool is a simple utility that allows you to query the Domain Name System (DNS) to retrieve records for a specific domain. The DNS acts as the internet's phonebook; it translates human-readable domain names (like `www.google.com`) into machine-readable IP addresses (like `172.217.14.228`). This tool lets you manually perform that lookup for any domain and inspect various types of records that are crucial for a website's operation.</p>

            <h3 className="text-xl font-bold">How to Use the DNS Lookup Tool</h3>
            <ol>
                <li><strong>Enter a Domain:</strong> Type the domain name you want to investigate into the input field (e.g., `toolzenweb.com`).</li>
                <li><strong>Select a Record Type:</strong> Choose the type of DNS record you want to check from the dropdown menu (e.g., `A`, `MX`, `TXT`).</li>
                <li><strong>Click Lookup:</strong> Press the "Lookup" button to send the query. The results will appear below, showing the requested DNS information.</li>
            </ol>

            <h3 className="text-xl font-bold">Key Features</h3>
            <ul>
                <li><strong>Comprehensive Record Types:</strong> Check for A, AAAA, CNAME, MX, NS, TXT, and SOA records.</li>
                <li><strong>Instant Results:</strong> Utilizes Google's fast and reliable public DNS service for quick lookups.</li>
                <li><strong>Easy to Read:</strong> Presents the raw DNS data in a clean, organized format.</li>
                <li><strong>100% Private:</strong> Your lookup queries are proxied and not stored, ensuring your activity remains private.</li>
            </ul>

            <h3 className="text-xl font-bold">Common Use Cases</h3>
            <ul>
                <li><strong>Technical SEO:</strong> SEO professionals use a DNS checker to diagnose technical issues, verify domain configurations, check for proper redirections, and analyze competitor setups.</li>
                <li><strong>Troubleshooting Website Issues:</strong> If a website is down, a DNS lookup can help determine if the problem is with its IP address configuration (A/AAAA records).</li>
                <li><strong>Email Deliverability:</strong> When setting up a new email service (like Google Workspace), you must verify that your MX and TXT records are pointing correctly to ensure you can send and receive emails.</li>
                <li><strong>Security Analysis:</strong> Checking TXT records can reveal security policies like SPF (Sender Policy Framework) and DMARC, which help prevent email spoofing.</li>
            </ul>

            <div className="not-prose mt-8">
                <h3 className="text-xl font-semibold">Related Tools</h3>
                <p>Explore our other web utilities for a complete analysis:</p>
                <div className="flex gap-2 flex-wrap">
                    <Button asChild variant="outline"><Link href="/tools/ip-lookup">IP Address Lookup</Link></Button>
                </div>
            </div>
        </article>
        </>
    );
}
