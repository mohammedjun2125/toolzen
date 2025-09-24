
'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Search, Loader2 } from 'lucide-react';

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
        <Card className="w-full shadow-lg rounded-lg bg-card/60 backdrop-blur-lg">
            <CardHeader>
                <CardTitle className="text-2xl">WHOIS Lookup</CardTitle>
                <CardDescription>Get registration information for any domain name.</CardDescription>
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
    );
}
