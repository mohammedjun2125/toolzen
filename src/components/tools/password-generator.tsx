
'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { useToast } from '@/hooks/use-toast';
import { Copy, RefreshCw } from 'lucide-react';
import Link from 'next/link';

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
  
  useEffect(() => {
    generatePassword();
     // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [length, includeLowercase, includeUppercase, includeNumbers, includeSymbols]);

  const copyToClipboard = () => {
    if (password) {
      navigator.clipboard.writeText(password);
      toast({ title: 'Password copied to clipboard!' });
    }
  };

  return (
    <>
    <Card className="w-full shadow-lg rounded-lg bg-card/60 backdrop-blur-lg">
      <CardHeader>
        <CardTitle className="text-2xl">Password Generator</CardTitle>
        <CardDescription>Create strong, secure, and random passwords to protect your online accounts. This tool works entirely in your browser, ensuring your passwords are never stored or transmitted.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="relative">
          <Input type="text" value={password} readOnly placeholder="Your password will appear here" className="pr-20 text-base md:text-lg h-12" />
          <Button variant="ghost" size="icon" className="absolute right-10 top-1/2 -translate-y-1/2" onClick={generatePassword}><RefreshCw className="h-5 w-5" /></Button>
          <Button variant="ghost" size="icon" className="absolute right-1 top-1/2 -translate-y-1/2" onClick={copyToClipboard}><Copy className="h-5 w-5" /></Button>
        </div>
        
        <div className="space-y-4">
          <div>
            <Label>Length: {length}</Label>
            <Slider value={[length]} onValueChange={(v) => setLength(v[0])} min={6} max={64} step={1} />
          </div>
          <div className="flex items-center justify-between py-2">
            <Label htmlFor="include-uppercase" className="text-base">Include Uppercase (A-Z)</Label>
            <Switch id="include-uppercase" checked={includeUppercase} onCheckedChange={setIncludeUppercase} />
          </div>
          <div className="flex items-center justify-between py-2">
            <Label htmlFor="include-lowercase" className="text-base">Include Lowercase (a-z)</Label>
            <Switch id="include-lowercase" checked={includeLowercase} onCheckedChange={setIncludeLowercase} />
          </div>
          <div className="flex items-center justify-between py-2">
            <Label htmlFor="include-numbers" className="text-base">Include Numbers (0-9)</Label>
            <Switch id="include-numbers" checked={includeNumbers} onCheckedChange={setIncludeNumbers} />
          </div>
          <div className="flex items-center justify-between py-2">
            <Label htmlFor="include-symbols" className="text-base">Include Symbols (!@#...)</Label>
            <Switch id="include-symbols" checked={includeSymbols} onCheckedChange={setIncludeSymbols} />
          </div>
        </div>

        <Button onClick={generatePassword} className="w-full text-lg py-6">
          <RefreshCw className="mr-2 h-4 w-4" />
          Generate New Password
        </Button>
      </CardContent>
    </Card>
    <article className="prose dark:prose-invert max-w-none mx-auto mt-12">
        <h2 className="text-2xl font-bold">What is a Password Generator?</h2>
        <p>A Password Generator is a tool that automatically creates strong, random, and unique passwords. In an era where data breaches are common, using simple or reused passwords is a significant security risk. This tool helps you create passwords that are extremely difficult for attackers to guess or crack through brute-force methods, forming the first line of defense for your digital identity.</p>

        <h3 className="text-xl font-bold">How to Use the Password Generator</h3>
        <ol>
            <li><strong>Set the Length:</strong> Use the slider to choose your desired password length. For best security, we recommend at least 16 characters.</li>
            <li><strong>Customize Character Types:</strong> Use the switches to include or exclude uppercase letters, lowercase letters, numbers, and symbols. The more types you include, the stronger the password.</li>
            <li><strong>Generate and Copy:</strong> The tool automatically generates a new password whenever you change the settings. Click the refresh icon to generate a new one, or click the copy icon to copy the current password to your clipboard.</li>
        </ol>

        <h3 className="text-xl font-bold">Key Features</h3>
        <ul>
            <li><strong>Strong & Secure:</strong> Uses the browser's cryptographically secure random number generator to create truly random passwords.</li>
            <li><strong>Fully Customizable:</strong> Control the length and character sets to meet any website or application's password requirements.</li>
            <li><strong>100% Private & Client-Side:</strong> Your passwords are generated entirely in your browser. They are never sent to our servers, stored, or logged.</li>
            <li><strong>Instant Generation:</strong> Get a new, strong password immediately with no waiting.</li>
        </ul>

        <h3 className="text-xl font-bold">Common Use Cases</h3>
        <ul>
            <li><strong>New Account Sign-ups:</strong> Create a unique, strong password for every new website or service you sign up for.</li>
            <li><strong>Password Updates:</strong> Regularly update your passwords for critical accounts like email, banking, and social media.</li>
            <li><strong>Securing Wi-Fi Networks:</strong> Generate a long, random password for your home or office Wi-Fi network to prevent unauthorized access.</li>
            <li><strong>Application Keys:</strong> Create random strings for use as API keys or secret tokens in software development.</li>
        </ul>

        <div className="not-prose mt-8">
            <h3 className="text-xl font-semibold">Related Security Tools</h3>
            <p>Enhance your online security with our other free, private tools:</p>
            <div className="flex gap-2 flex-wrap">
                <Button asChild variant="outline"><Link href="/tools/hash-generator">Hash Generator</Link></Button>
                <Button asChild variant="outline"><Link href="/tools/otp-generator">OTP Generator</Link></Button>
            </div>
        </div>
    </article>
    </>
  );
}
