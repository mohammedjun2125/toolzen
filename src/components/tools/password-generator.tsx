'use client';

import { useState, useEffect } from 'react';
import { useFlow } from '@genkit-ai/next/client';
import { generateSecurePassword } from '@/ai/flows/generate-secure-password';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { Input } from '@/components/ui/input';
import { Copy, RefreshCw } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export function PasswordGenerator() {
  const [length, setLength] = useState(16);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeSymbols, setIncludeSymbols] = useState(true);
  const [includeUppercase, setIncludeUppercase] = useState(true);
  const [password, setPassword] = useState('');
  const { toast } = useToast();

  const [generate, generating] = useFlow(generateSecurePassword, {
    onSuccess: (result) => {
      setPassword(result.password || '');
    },
    onError: (err) => {
      toast({
        variant: 'destructive',
        title: 'Error generating password',
        description: err?.message || 'An unknown error occurred.',
      });
    },
  });

  const handleGenerate = () => {
    generate({ length, includeNumbers, includeSymbols, includeUppercase });
  };
  
  useEffect(() => {
    handleGenerate();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const copyToClipboard = () => {
    if (password) {
      navigator.clipboard.writeText(password);
      toast({
        title: 'Copied to clipboard!',
        description: 'The password has been copied to your clipboard.',
      });
    }
  };
  
  return (
    <Card className="w-full shadow-lg rounded-lg">
      <CardHeader>
        <CardTitle className="text-2xl">Secure Password Generator</CardTitle>
        <CardDescription>Create strong and secure passwords to protect your accounts.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="relative">
          <Input
            readOnly
            value={password}
            placeholder="Your generated password will appear here"
            className="pr-20 text-lg h-12 font-mono"
          />
          <div className="absolute inset-y-0 right-0 flex items-center gap-1 pr-2">
            <Button variant="ghost" size="icon" onClick={copyToClipboard} disabled={!password}>
              <Copy className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" onClick={handleGenerate} disabled={generating}>
              <RefreshCw className={`h-5 w-5 ${generating ? 'animate-spin' : ''}`} />
            </Button>
          </div>
        </div>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="length">Password Length: {length}</Label>
            <Slider
              id="length"
              min={8}
              max={64}
              step={1}
              value={[length]}
              onValueChange={(value) => setLength(value[0])}
            />
          </div>
          <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
            <Label htmlFor="include-uppercase" className="cursor-pointer">Include Uppercase</Label>
            <Switch
              id="include-uppercase"
              checked={includeUppercase}
              onCheckedChange={setIncludeUppercase}
            />
          </div>
          <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
            <Label htmlFor="include-numbers" className="cursor-pointer">Include Numbers</Label>
            <Switch
              id="include-numbers"
              checked={includeNumbers}
              onCheckedChange={setIncludeNumbers}
            />
          </div>
          <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
            <Label htmlFor="include-symbols" className="cursor-pointer">Include Symbols</Label>
            <Switch
              id="include-symbols"
              checked={includeSymbols}
              onCheckedChange={setIncludeSymbols}
            />
          </div>
        </div>
        <Button onClick={handleGenerate} disabled={generating} className="w-full">
          <RefreshCw className={`mr-2 h-4 w-4 ${generating ? 'animate-spin' : ''}`} />
          {generating ? 'Generating...' : 'Generate New Password'}
        </Button>
      </CardContent>
    </Card>
  );
}
