
'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Search, Loader2 } from 'lucide-react';
import Link from 'next/link';
import { seoKeywords } from '@/lib/seo-keywords';

export default function IpLookup() {
    const [ipAddress, setIpAddress] = useState('');
    const [result, setResult] = useState<any | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const { toast } = useToast();
    const toolKeywords = (seoKeywords.tools as any)['ip-lookup'];

    useEffect(() => {
        const fetchUserIp = async () => {
            try {
                const response = await fetch('https://api.ipify.org?format=json');
                const data = await response.json();
                setIpAddress(data.ip);
                handleLookup(data.ip);
            } catch (error) {
                toast({ variant: 'destructive', title: 'Could not fetch your IP address.' });
            }
        };
        fetchUserIp();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [toast]);

    const handleLookup = async (ipToLookup?: string) => {
        const targetIp = ipToLookup || ipAddress;
        if (!targetIp.trim()) {
            toast({ variant: 'destructive', title: 'Please enter an IP address.' });
            return;
        }
        setIsLoading(true);
        setResult(null);
        try {
            const response = await fetch(`https://ipapi.co/${targetIp.trim()}/json/`);
            const data = await response.json();
            if (data.error) {
                throw new Error(data.reason);
            }
            setResult(data);
        } catch (error: any) {
            toast({ variant: 'destructive', title: 'Lookup Failed', description: error.message });
            setResult({ error: error.message });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            <Card className="w-full shadow-lg rounded-lg bg-card/60 backdrop-blur-lg">
                <CardHeader>
                    <CardTitle className="text-2xl">{toolKeywords.title_keywords.join(' - ')} – What Is My IP?</CardTitle>
                    <CardDescription>Use this free **{toolKeywords.meta_keywords.join(', ')}** to find the geolocation of any IP address. Find the city, region, country, and ISP for any IPv4 or IPv6 address with our instant **IP finder**.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="flex gap-2">
                        <Input
                            placeholder="Enter IP Address (e.g., 8.8.8.8)"
                            value={ipAddress}
                            onChange={(e) => setIpAddress(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && handleLookup()}
                        />
                        <Button onClick={() => handleLookup()} disabled={isLoading}>
                            {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Search className="mr-2 h-4 w-4" />}
                            Lookup IP
                        </Button>
                    </div>
                    
                    {isLoading && <div className="flex justify-center py-4"><Loader2 className="h-8 w-8 animate-spin text-muted-foreground" /></div>}

                    {result && !result.error && (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                            <InfoItem label="IP Address" value={result.ip} />
                            <InfoItem label="City" value={result.city} />
                            <InfoItem label="Region" value={result.region} />
                            <InfoItem label="Country" value={`${result.country_name} (${result.country_code})`} />
                            <InfoItem label="ISP / Organization" value={result.org} />
                            <InfoItem label="Timezone" value={result.timezone} />
                            <InfoItem label="Latitude / Longitude" value={`${result.latitude}, ${result.longitude}`} />
                        </div>
                    )}
                </CardContent>
            </Card>
            <article className="prose dark:prose-invert max-w-none mx-auto mt-12">
                <h2 className="text-2xl font-bold">What is an IP Address?</h2>
                <p>An IP (Internet Protocol) address is a unique numerical label assigned to every device connected to a computer network that uses the Internet Protocol for communication. It serves two main functions: identifying the host or network interface and providing the location of the host in the network. Our **IP address finder** tool lets you instantly get **IP geolocation** details for any public IP address.</p>
                
                <h3>Why Use an IP Lookup Tool?</h3>
                <ul>
                    <li><strong>Content Personalization:</strong> Websites use **IP geolocation** to serve content in the local language or currency, providing a better user experience.</li>
                    <li><strong>Digital Rights Management:</strong> Streaming services use IP lookups to ensure content is only shown in licensed regions, a common practice in media distribution.</li>
                    <li><strong>Security Analysis:</strong> Network administrators use an **IP locator** to trace the origin of suspicious traffic, analyze firewall logs, and identify potential cyber threats.</li>
                    <li><strong>Marketing and Analytics:</strong> Marketers analyze the geographic distribution of their website visitors to better understand their audience and tailor campaigns.</li>
                </ul>

                <h2 className="text-2xl font-bold">How Accurate is IP Geolocation?</h2>
                <p>IP-based geolocation is a science of approximation. It is generally very accurate at the country level but becomes less precise at the city level. The accuracy depends on the quality of the geolocation database being used. An **IP address lookup tool** can usually identify the country correctly over 99% of the time, but city-level accuracy may vary. It should not be used for precise location tracking.</p>
            </article>
        </>
    );
}

function InfoItem({ label, value }: { label: string, value: string | number }) {
    if (!value) return null;
    return (
        <div className="p-3 bg-muted/50 rounded-lg">
            <p className="text-xs text-muted-foreground">{label}</p>
            <p className="font-semibold break-words">{value}</p>
        </div>
    )
}
