
'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Search, Loader2 } from 'lucide-react';
import Link from 'next/link';

export default function IpLookup() {
    const [ipAddress, setIpAddress] = useState('');
    const [result, setResult] = useState<any | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const { toast } = useToast();

    useEffect(() => {
        // Fetch user's own IP address on component mount
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
                    <CardTitle className="text-2xl">Free IP Address Lookup Tool</CardTitle>
                    <CardDescription>Use this **IP address finder** to get geolocation details for any IP. Find the city, region, country, and ISP for any IPv4 or IPv6 address with our **IP locator**.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="flex gap-2">
                        <Input
                            placeholder="Enter IP Address"
                            value={ipAddress}
                            onChange={(e) => setIpAddress(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && handleLookup()}
                        />
                        <Button onClick={() => handleLookup()} disabled={isLoading}>
                            {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Search className="mr-2 h-4 w-4" />}
                            Lookup IP
                        </Button>
                    </div>
                    
                    {isLoading && <Loader2 className="mx-auto h-8 w-8 animate-spin" />}

                    {result && !result.error && (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                            <InfoItem label="IP Address" value={result.ip} />
                            <InfoItem label="City" value={result.city} />
                            <InfoItem label="Region" value={result.region} />
                            <InfoItem label="Country" value={`${result.country_name} (${result.country_code})`} />
                            <InfoItem label="ISP" value={result.org} />
                            <InfoItem label="Timezone" value={result.timezone} />
                            <InfoItem label="Latitude" value={result.latitude} />
                            <InfoItem label="Longitude" value={result.longitude} />
                        </div>
                    )}
                </CardContent>
            </Card>
            <article className="prose dark:prose-invert max-w-none mx-auto mt-12">
                <h2 className="text-2xl font-bold">What is an IP Address?</h2>
                <p>An IP (Internet Protocol) address is a unique numerical label assigned to every device connected to a computer network that uses the Internet Protocol for communication. It serves two main functions: identifying the host or network interface and providing the location of the host in the network. Our **IP address finder** tool lets you instantly get location details for any IP.</p>
                
                <h3>Why Use an IP Lookup Tool?</h3>
                <ul>
                    <li><strong>Content Personalization:</strong> Websites can use **IP geolocation** to serve content in the local language or currency.</li>
                    <li><strong>Digital Rights Management:</strong> Streaming services use IP lookups to ensure content is only shown in licensed regions.</li>
                    <li>**Security Analysis:</strong> Network administrators use an **IP locator** to trace the origin of suspicious traffic or potential cyber threats.</li>
                    <li>**Marketing and Analytics:</strong> Marketers analyze the geographic distribution of their website visitors to better understand their audience.</li>
                </ul>

                <h2 className="text-2xl font-bold">How Accurate is IP Geolocation?</h2>
                <p>IP-based geolocation is a science of approximation. It is generally accurate at the country level but becomes less precise at the city level. The accuracy depends on the quality of the geolocation database being used. An **IP address lookup tool** can usually identify the country correctly over 99% of the time, but city-level accuracy may vary.</p>
            </article>
        </>
    );
}

function InfoItem({ label, value }: { label: string, value: string | number }) {
    if (!value) return null;
    return (
        <div className="p-3 bg-muted/50 rounded-lg">
            <p className="text-xs text-muted-foreground">{label}</p>
            <p className="font-semibold">{value}</p>
        </div>
    )
}
