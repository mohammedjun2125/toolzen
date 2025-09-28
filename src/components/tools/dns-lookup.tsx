
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

const recordTypes = ['A', 'AAAA', 'MX', 'TXT', 'CNAME', 'NS', 'SOA'];

export default function DnsLookup() {
    const [domain, setDomain] = useState('google.com');
    const [type, setType] = useState('A');
    const [result, setResult] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const { toast } = useToast();

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
                <CardTitle className="text-2xl">Free Online DNS Lookup Tool</CardTitle>
                <CardDescription>Perform a **DNS lookup** for any domain. Check **DNS records** like A, AAAA, CNAME, MX, and NS records with our **free DNS checker tool**.</CardDescription>
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
            <p>A DNS (Domain Name System) lookup is the process of querying the DNS to find the IP address associated with a domain name. Think of it as the internet's phonebook. When you type a website like "www.google.com" into your browser, your computer performs a **DNS lookup** to find its corresponding IP address (e.g., 172.217.14.228) so it knows where to send the request. Our **free DNS checker tool** lets you perform this lookup manually for any domain.</p>
            
            <h3>Understanding Different DNS Records</h3>
            <p>Our tool can check various types of DNS records, each serving a different purpose:</p>
            <ul>
                <li><strong>A Record:</strong> The most basic record. It maps a domain name to an IPv4 address.</li>
                <li><strong>AAAA Record:</strong> Maps a domain name to an IPv6 address.</li>
                <li><strong>CNAME Record:</strong> (Canonical Name) Forwards one domain to another. For example, `www.example.com` might be a CNAME for `example.com`.</li>
                <li><strong>MX Record:</strong> (Mail Exchanger) Directs email to a mail server. This record is crucial for email deliverability.</li>
                <li><strong>NS Record:</strong> (Name Server) Specifies which DNS servers are authoritative for the domain.</li>
                <li><strong>TXT Record:</strong> Allows administrators to insert arbitrary text. Often used for email security (SPF, DKIM) and domain ownership verification.</li>
            </ul>

            <h2 className="text-2xl font-bold">Why Use a DNS Lookup Tool?</h2>
            <ul>
                <li>**Troubleshooting:** If a website is down, a **DNS lookup** can help you determine if the problem is with its DNS configuration.</li>
                <li>**SEO & Webmaster Tasks:** SEO professionals use DNS checkers to verify domain configurations, check for proper redirections, and analyze competitor setups.</li>
                <li>**Email Configuration:** When setting up a new email service, you need to verify that your MX and TXT records are pointing correctly.</li>
            </ul>
        </article>
        </>
    );
}
