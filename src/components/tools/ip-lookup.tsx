
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
                <h2 className="text-2xl font-bold">What is the IP Lookup Tool?</h2>
                <p>An IP (Internet Protocol) address is a unique numerical label assigned to every device connected to the internet. The IP Lookup tool is a utility that allows you to find the geographical location and other details associated with any public IP address. Upon visiting this page, the tool automatically detects and looks up your own IP address. You can then use the search bar to find information about any other IP address you're curious about.</p>

                <h3 className="text-xl font-bold">How to Use This Tool</h3>
                <ol>
                    <li><strong>Automatic Lookup:</strong> Your own IP address is automatically detected and looked up when you load the page.</li>
                    <li><strong>Manual Lookup:</strong> Enter any valid IPv4 or IPv6 address into the search box.</li>
                    <li><strong>Get Results:</strong> Click the "Lookup IP" button to see detailed information, including the ISP, location, and timezone.</li>
                </ol>

                <h3 className="text-xl font-bold">Key Features</h3>
                <ul>
                    <li><strong>Automatic IP Detection:</strong> Instantly see the details for your own IP address.</li>
                    <li><strong>Comprehensive Details:</strong> Get information on the country, city, region, ISP (Internet Service Provider), and timezone.</li>
                    <li><strong>IPv4 and IPv6 Support:</strong> Look up both older IPv4 addresses and modern IPv6 addresses.</li>
                    <li><strong>Fast and Private:</strong> Queries are quick and your search history is not stored.</li>
                </ul>

                <h3 className="text-xl font-bold">Common Use Cases</h3>
                <ul>
                    <li><strong>Content Personalization:</strong> Websites use IP geolocation to serve content in the local language or currency.</li>
                    <li><strong>Security Analysis:</strong> Network administrators use an IP locator to trace the origin of suspicious traffic, analyze firewall logs, and identify potential cyber threats.</li>
                    <li><strong>Marketing and Analytics:</strong> Marketers analyze the geographic distribution of their website visitors to better understand their audience and tailor campaigns.</li>
                    <li><strong>Verify VPN Connection:</strong> Check if your VPN is working correctly by seeing if your IP address location has changed.</li>
                </ul>
                
                <h3 className="text-xl font-bold">How Accurate is IP Geolocation?</h3>
                <p>IP-based geolocation is a science of approximation. It is generally very accurate at the country level but becomes less precise at the city level. The accuracy depends on the quality of the geolocation database being used. An IP address lookup tool can usually identify the country correctly over 99% of the time, but city-level accuracy may vary. It should not be used for precise location tracking.</p>

                <div className="not-prose mt-8">
                    <h3 className="text-xl font-semibold">Related Tools</h3>
                    <p>Explore other useful developer utilities:</p>
                    <div className="flex gap-2 flex-wrap">
                        <Button asChild variant="outline"><Link href="/tools/dns-lookup">DNS Lookup</Link></Button>
                    </div>
                </div>
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
