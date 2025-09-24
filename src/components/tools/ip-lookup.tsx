
'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Search, Loader2 } from 'lucide-react';

export default function IpLookup() {
    const [ipAddress, setIpAddress] = useState('');
    const [result, setResult] = useState<any | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [userIp, setUserIp] = useState('');
    const { toast } = useToast();

    useEffect(() => {
        // Fetch user's own IP address on component mount
        const fetchUserIp = async () => {
            try {
                const response = await fetch('https://api.ipify.org?format=json');
                const data = await response.json();
                setUserIp(data.ip);
                setIpAddress(data.ip);
                handleLookup(data.ip);
            } catch (error) {
                toast({ variant: 'destructive', title: 'Could not fetch your IP address.' });
            }
        };
        fetchUserIp();
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
        <Card className="w-full shadow-lg rounded-lg bg-card/60 backdrop-blur-lg">
            <CardHeader>
                <CardTitle className="text-2xl">IP Address Lookup</CardTitle>
                <CardDescription>Find geolocation and other details for an IP address.</CardDescription>
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
                        Lookup
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
