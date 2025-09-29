
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
                <div className="flex flex-col md:flex-row gap-2">
                    <Input
                        placeholder="e.g., google.com"
                        value={domain}
                        onChange={(e) => setDomain(e.target.value)}
                        className="flex-grow"
                    />
                    <Select value={type} onValueChange={setType}>
                        <SelectTrigger className="w-full md:w-[120px]">
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                            {recordTypes.map(t => <SelectItem key={t} value={t}>{t}</SelectItem>)}
                        </SelectContent>
                    </Select>
                    <Button onClick={handleLookup} disabled={isLoading} className="w-full md:w-auto">
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
            <h2 className="text-2xl font-bold">What is a DNS Lookup?</h2>
            <p>A DNS (Domain Name System) lookup is the process of querying the internet's "phonebook" to find the IP address associated with a domain name. When you type a website like "www.google.com" into your browser, your computer performs a **DNS lookup** to find its corresponding IP address (e.g., 172.217.14.228) so it knows where to send the request. Our **free DNS checker tool** lets you perform this lookup manually for any domain and check all its important records.</p>
            
            <h3>Understanding Different DNS Records</h3>
            <p>Our tool can check various types of DNS records, each serving a different purpose for domain health and configuration:</p>
            <ul>
                <li><strong>A Record:</strong> The most basic DNS record. It maps a domain name to an IPv4 address. This is essential for website accessibility.</li>
                <li><strong>AAAA Record:</strong> Similar to an A record, but it maps a domain to a more modern IPv6 address.</li>
                <li><strong>CNAME Record:</strong> A Canonical Name record forwards one domain to another. For example, `www.example.com` is often a CNAME pointing to `example.com`.</li>
                <li><strong>MX Record:</strong> A Mail Exchanger record directs a domain's email to the servers that host its email accounts. This record is crucial for email deliverability.</li>
                <li><strong>NS Record:</strong> A Name Server record indicates which DNS servers are authoritative for the domain, meaning they hold the actual DNS records.</li>
                <li><strong>TXT Record:</strong> Allows domain administrators to store text notes. Commonly used for email security verification (SPF, DKIM, DMARC) and domain ownership verification.</li>
                <li><strong>SOA Record:</strong> The Start of Authority record contains important administrative information about the domain, like the primary name server and an email address for the domain administrator.</li>
            </ul>

            <h2 className="text-2xl font-bold">Why Use a DNS Lookup Tool?</h2>
            <ul>
                <li>**Technical SEO:** SEO professionals use a **DNS checker** to diagnose technical issues, verify domain configurations, check for proper redirections, and analyze competitor setups.</li>
                <li>**Troubleshooting:** If a website or email service is down, a **DNS lookup** can help you quickly determine if the problem is with its DNS configuration.</li>
                <li>**Email Configuration:** When setting up a new email service (like Google Workspace or Microsoft 365), you must verify that your MX and TXT records are pointing correctly to ensure you can send and receive emails.</li>
            </ul>
        </article>
        </>
    );
}
