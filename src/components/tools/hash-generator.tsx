
'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { Copy } from 'lucide-react';
import { Button } from '../ui/button';

async function digestMessage(message: string, algorithm: 'SHA-1' | 'SHA-256' | 'SHA-512') {
  if (!message) return '';
  try {
    const msgUint8 = new TextEncoder().encode(message);
    const hashBuffer = await crypto.subtle.digest(algorithm, msgUint8);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    return hashHex;
  } catch (error) {
    console.error(`Error generating ${algorithm} hash:`, error);
    return `Error generating hash.`;
  }
}

const HASH_ALGORITHMS: ('SHA-1' | 'SHA-256' | 'SHA-512')[] = ['SHA-1', 'SHA-256', 'SHA-512'];

export default function HashGenerator() {
  const [input, setInput] = useState('hello world');
  const [hashes, setHashes] = useState<Record<string, string>>({
    'SHA-1': '',
    'SHA-256': '',
    'SHA-512': '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const generateHashes = async () => {
      setIsLoading(true);
      const newHashes: Record<string, string> = {};
      for (const algorithm of HASH_ALGORITHMS) {
        newHashes[algorithm] = await digestMessage(input, algorithm);
      }
      setHashes(newHashes);
      setIsLoading(false);
    };
    
    // Generate hashes on initial load and when input changes
    const debounceTimer = setTimeout(() => {
        generateHashes();
    }, 300); // Debounce to avoid excessive re-hashing while typing

    return () => clearTimeout(debounceTimer);

  }, [input]);

  const copyToClipboard = (text: string, label: string) => {
    if (text) {
        navigator.clipboard.writeText(text);
        toast({ title: `${label} copied to clipboard!` });
    }
  };

  return (
    <Card className="w-full shadow-lg rounded-lg bg-card/60 backdrop-blur-lg">
      <CardHeader>
        <CardTitle className="text-2xl">Hash Generator</CardTitle>
        <CardDescription>Generate various cryptographic hashes from your text. The calculation is done securely in your browser.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="input-text">Input Text</Label>
          <Textarea
            id="input-text"
            placeholder="Type or paste text here..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            rows={5}
          />
        </div>

        <div className="space-y-4">
          {HASH_ALGORITHMS.map((name) => (
            <div key={name} className="space-y-1">
              <Label htmlFor={`hash-${name}`}>{name}</Label>
              <div className="flex items-center gap-2">
                <Input 
                  id={`hash-${name}`} 
                  readOnly 
                  value={isLoading ? 'Generating...' : hashes[name]} 
                  className="font-mono" 
                  placeholder="..."
                />
                <Button variant="ghost" size="icon" onClick={() => copyToClipboard(hashes[name], name)} disabled={!hashes[name] || isLoading}>
                  <Copy className="h-5 w-5"/>
                  <span className="sr-only">Copy {name} hash</span>
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
