'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { useToast } from '@/hooks/use-toast';
import { Copy, RefreshCw } from 'lucide-react';

export default function PasswordGenerator() {
  const [password, setPassword] = useState('');
  const [length, setLength] = useState(16);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeSymbols, setIncludeSymbols] = useState(true);
  const [includeUppercase, setIncludeUppercase] = useState(true);
  const [includeLowercase, setIncludeLowercase] = useState(true);
  const { toast } = useToast();

  const generatePassword = () => {
    const numbers = '0123456789';
    const symbols = '!@#$%^&*()_+~`|}{[]:;?><,./-=';
    const upperCase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const lowerCase = 'abcdefghijklmnopqrstuvwxyz';

    let charSet = '';
    if (includeLowercase) charSet += lowerCase;
    if (includeUppercase) charSet += upperCase;
    if (includeNumbers) charSet += numbers;
    if (includeSymbols) charSet += symbols;
    
    if (charSet === '') {
        toast({ variant: 'destructive', title: 'Please select at least one character type.' });
        setPassword('');
        return;
    }

    let newPassword = '';
    for (let i = 0; i < length; i++) {
      newPassword += charSet.charAt(Math.floor(Math.random() * charSet.length));
    }
    setPassword(newPassword);
  };

  const copyToClipboard = () => {
    if (password) {
      navigator.clipboard.writeText(password);
      toast({ title: 'Password copied to clipboard!' });
    }
  };

  return (
    <Card className="w-full shadow-lg rounded-lg">
      <CardHeader>
        <CardTitle className="text-2xl">Password Generator</CardTitle>
        <CardDescription>Create strong and secure passwords.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="relative">
          <Input type="text" value={password} readOnly placeholder="Your password will appear here" className="pr-20 text-lg" />
          <Button variant="ghost" size="icon" className="absolute right-10 top-1/2 -translate-y-1/2" onClick={generatePassword}><RefreshCw className="h-5 w-5" /></Button>
          <Button variant="ghost" size="icon" className="absolute right-1 top-1/2 -translate-y-1/2" onClick={copyToClipboard}><Copy className="h-5 w-5" /></Button>
        </div>
        
        <div className="space-y-4">
          <div>
            <Label>Length: {length}</Label>
            <Slider value={[length]} onValueChange={(v) => setLength(v[0])} min={4} max={64} step={1} />
          </div>
          <div className="flex items-center justify-between">
            <Label htmlFor="include-uppercase">Include Uppercase (A-Z)</Label>
            <Switch id="include-uppercase" checked={includeUppercase} onCheckedChange={setIncludeUppercase} />
          </div>
          <div className="flex items-center justify-between">
            <Label htmlFor="include-lowercase">Include Lowercase (a-z)</Label>
            <Switch id="include-lowercase" checked={includeLowercase} onCheckedChange={setIncludeLowercase} />
          </div>
          <div className="flex items-center justify-between">
            <Label htmlFor="include-numbers">Include Numbers (0-9)</Label>
            <Switch id="include-numbers" checked={includeNumbers} onCheckedChange={setIncludeNumbers} />
          </div>
          <div className="flex items-center justify-between">
            <Label htmlFor="include-symbols">Include Symbols (!@#...)</Label>
            <Switch id="include-symbols" checked={includeSymbols} onCheckedChange={setIncludeSymbols} />
          </div>
        </div>

        <Button onClick={generatePassword} className="w-full">
          <RefreshCw className="mr-2 h-4 w-4" />
          Generate Password
        </Button>
      </CardContent>
    </Card>
  );
}
