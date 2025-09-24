'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Globe, Search, Sparkles } from 'lucide-react';

const prefixes = ['My', 'The', 'Get', 'Go', 'Pro', 'App', 'Site', 'Web', 'Online'];
const suffixes = ['Co', 'ify', 'ly', 'io', 'ai', 'App', 'Site', 'Hub', 'Lab', 'Base', 'Box'];
const tlds = ['.com', '.io', '.co', '.ai', '.dev', '.app', '.net', '.org'];

export default function DomainGenerator() {
    const [keyword, setKeyword] = useState('Nova');
    const [domains, setDomains] = useState<string[]>([]);

    const generateDomains = () => {
        if (!keyword.trim()) {
            setDomains([]);
            return;
        }

        const base = keyword.trim().toLowerCase().replace(/\s/g, '');
        const generated: Set<string> = new Set();

        // Keyword + TLD
        tlds.forEach(tld => generated.add(`${base}${tld}`));

        // Prefix + Keyword + TLD
        for (let i = 0; i < 4; i++) {
            const prefix = prefixes[Math.floor(Math.random() * prefixes.length)];
            const tld = tlds[Math.floor(Math.random() * tlds.length)];
            generated.add(`${prefix.toLowerCase()}${base}${tld}`);
        }
        
        // Keyword + Suffix + TLD
        for (let i = 0; i < 4; i++) {
            const suffix = suffixes[Math.floor(Math.random() * suffixes.length)];
            const tld = tlds[Math.floor(Math.random() * tlds.length)];
            generated.add(`${base}${suffix.toLowerCase()}${tld}`);
        }

        // Short domains
        const shortTlds = ['.io', '.ai', '.co'];
        generated.add(`${base}${shortTlds[Math.floor(Math.random() * shortTlds.length)]}`);
        
        setDomains(Array.from(generated));
    };
    
    const checkAvailability = (domain: string) => {
        window.open(`https://www.godaddy.com/domainsearch/find?checkAvail=1&domainToCheck=${domain}`, '_blank');
    };

    return (
        <Card className="w-full shadow-lg rounded-lg bg-card/60 backdrop-blur-lg">
            <CardHeader>
                <CardTitle className="text-2xl">Domain Name Generator</CardTitle>
                <CardDescription>Find the perfect available domain name for your next big idea.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                <div className="space-y-2">
                    <Label htmlFor="keyword">Enter a keyword</Label>
                    <div className="flex gap-2">
                        <Input id="keyword" placeholder="e.g., Rocket" value={keyword} onChange={(e) => setKeyword(e.target.value)} />
                        <Button onClick={generateDomains}>
                            <Sparkles className="mr-2 h-4 w-4" /> Generate
                        </Button>
                    </div>
                </div>

                {domains.length > 0 && (
                    <div className="space-y-2">
                        <h3 className="font-semibold">Generated Domain Ideas:</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                            {domains.map((domain, index) => (
                                <div key={index} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                                    <span className="font-semibold text-sm flex items-center gap-2">
                                        <Globe className="w-4 h-4 text-muted-foreground" />
                                        {domain}
                                    </span>
                                    <Button variant="outline" size="sm" onClick={() => checkAvailability(domain)}>
                                        <Search className="mr-2 h-4 w-4" /> Check
                                    </Button>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </CardContent>
        </Card>
    );
}
