
'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Search, Loader2 } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const recordTypes = ['A', 'AAAA', 'MX', 'TXT', 'CNAME', 'NS'];

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
        <Card className="w-full shadow-lg rounded-lg bg-card/60 backdrop-blur-lg">
            <CardHeader>
                <CardTitle className="text-2xl">DNS Lookup</CardTitle>
                <CardDescription>Look up DNS records for any domain name.</CardDescription>
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
    );
}
