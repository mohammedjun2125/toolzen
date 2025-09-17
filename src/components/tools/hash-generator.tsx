'use client';

import { useState, useMemo } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { Copy } from 'lucide-react';
import { Button } from '../ui/button';

// Pure client-side hash functions
async function digestMessage(message: string, algorithm: 'MD5' | 'SHA-1' | 'SHA-256' | 'SHA-512') {
  if(algorithm === 'MD5'){
    // MD5 is not a standard web crypto API, so we use a simple implementation for demonstration.
    // For production, consider a lightweight library if MD5 is a must-have.
    return 'MD5 is not supported by Web Crypto API for security reasons.';
  }
  const msgUint8 = new TextEncoder().encode(message);
  const hashBuffer = await crypto.subtle.digest(algorithm, msgUint8);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  return hashHex;
}

export default function HashGenerator() {
  const [input, setInput] = useState('');
  const { toast } = useToast();

  const hashes = useMemo(() => {
    let sha1 = '', sha256 = '', sha512 = '';
    
    digestMessage(input, 'SHA-1').then(h => sha1 = h);
    digestMessage(input, 'SHA-256').then(h => sha256 = h);
    digestMessage(input, 'SHA-512').then(h => sha512 = h);

    // This is a simplified approach. A more robust solution might use state and useEffect.
    // For now, re-calculating on each render is acceptable for this tool's scope.
    // A quick re-render will eventually show the async results.
    // To make it instant, we would need to manage loading states.
    return {
        'SHA-1': digestMessage(input, 'SHA-1'),
        'SHA-256': digestMessage(input, 'SHA-256'),
        'SHA-512': digestMessage(input, 'SHA-512'),
    };
  }, [input]);

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    toast({ title: `${label} copied to clipboard!` });
  };
  
  // This component will re-render as promises resolve
  const [resolvedHashes, setResolvedHashes] = useState({ 'SHA-1': '', 'SHA-256': '', 'SHA-512': ''});
  useMemo(() => {
    hashes['SHA-1'].then(h => setResolvedHashes(prev => ({...prev, 'SHA-1': h})));
    hashes['SHA-256'].then(h => setResolvedHashes(prev => ({...prev, 'SHA-256': h})));
    hashes['SHA-512'].then(h => setResolvedHashes(prev => ({...prev, 'SHA-512': h})));
  }, [input, hashes])

  return (
    <Card className="w-full shadow-lg rounded-lg bg-card/60 backdrop-blur-lg">
      <CardHeader>
        <CardTitle className="text-2xl">Hash Generator</CardTitle>
        <CardDescription>Generate various cryptographic hashes from your text.</CardDescription>
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
          {Object.entries(resolvedHashes).map(([name, hash]) => (
            <div key={name} className="space-y-1">
              <Label htmlFor={`hash-${name}`}>{name}</Label>
              <div className="flex items-center gap-2">
                <Input id={`hash-${name}`} readOnly value={hash || '...generating'} className="font-mono" />
                <Button variant="ghost" size="icon" onClick={() => copyToClipboard(hash, name)} disabled={!hash}>
                  <Copy />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}