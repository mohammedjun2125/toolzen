'use client';

import { useState, useMemo } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { useToast } from '@/hooks/use-toast';
import { Copy, Sparkles } from 'lucide-react';

const adjectives = ['Cool', 'Super', 'Mega', 'Hyper', 'Power', 'Cyber', 'Future', 'Retro', 'Giga', 'Nano', 'Epic', 'Awesome', 'Cosmic', 'Digital', 'Quantum'];
const nouns = ['Coder', 'Hacker', 'Dev', 'Ninja', 'Guru', 'Master', 'Wizard', 'Byte', 'Bot', 'Pioneer', 'Jedi', 'Rider', 'Surfer', 'Pilot', 'Explorer'];

export default function UsernameGenerator() {
    const [keyword, setKeyword] = useState('');
    const [addNumbers, setAddNumbers] = useState(true);
    const [usernames, setUsernames] = useState<string[]>([]);
    const { toast } = useToast();

    const generateUsernames = () => {
        const generated: string[] = [];
        const base = keyword.trim().replace(/\s/g, '');

        if (!base) {
            toast({ variant: 'destructive', title: 'Please enter a keyword.' });
            return;
        }

        // Combination 1: Adj + Keyword
        generated.push(`${adjectives[Math.floor(Math.random() * adjectives.length)]}${base}`);
        
        // Combination 2: Keyword + Noun
        generated.push(`${base}${nouns[Math.floor(Math.random() * nouns.length)]}`);
        
        // Combination 3: Keyword + Number
        if (addNumbers) {
            generated.push(`${base}${Math.floor(Math.random() * 90) + 10}`);
        }
        
        // Combination 4: Adj + Keyword + Number
        if (addNumbers) {
            generated.push(`${adjectives[Math.floor(Math.random() * adjectives.length)]}${base}${Math.floor(Math.random() * 99)}`);
        }
        
        // Combination 5: Keyword + Noun + Number
        if (addNumbers) {
            generated.push(`${base}${nouns[Math.floor(Math.random() * nouns.length)]}${Math.floor(Math.random() * 10)}`);
        }

        // Generate more variations
        for (let i = 0; i < 5; i++) {
             const adj = adjectives[Math.floor(Math.random() * adjectives.length)];
             const noun = nouns[Math.floor(Math.random() * nouns.length)];
             let finalName = Math.random() > 0.5 ? `${adj}${base}` : `${base}${noun}`;
             if(addNumbers) {
                 finalName += Math.floor(Math.random() * 999);
             }
             generated.push(finalName);
        }
        
        setUsernames(Array.from(new Set(generated))); // Remove duplicates
    };

    const copyUsername = (username: string) => {
        navigator.clipboard.writeText(username);
        toast({ title: `Copied "${username}" to clipboard!` });
    };

    return (
        <Card className="w-full shadow-lg rounded-lg bg-card/60 backdrop-blur-lg">
            <CardHeader>
                <CardTitle className="text-2xl">Username Generator</CardTitle>
                <CardDescription>Create unique and cool usernames for your social media, gaming, or online accounts.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                <div className="space-y-2">
                    <Label htmlFor="keyword">Enter a Keyword</Label>
                    <Input id="keyword" placeholder="e.g., Nova" value={keyword} onChange={(e) => setKeyword(e.target.value)} />
                </div>

                <div className="flex items-center space-x-2">
                    <Switch id="add-numbers" checked={addNumbers} onCheckedChange={setAddNumbers} />
                    <Label htmlFor="add-numbers">Include Numbers</Label>
                </div>

                <Button onClick={generateUsernames} className="w-full">
                    <Sparkles className="mr-2 h-4 w-4" /> Generate Usernames
                </Button>

                {usernames.length > 0 && (
                    <div className="space-y-2">
                        <h3 className="font-semibold">Suggestions:</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
                            {usernames.map((name, index) => (
                                <div key={index} className="flex items-center justify-between p-2 bg-muted/50 rounded-md">
                                    <span className="font-mono text-sm">{name}</span>
                                    <Button variant="ghost" size="icon" onClick={() => copyUsername(name)}>
                                        <Copy className="h-4 w-4" />
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
