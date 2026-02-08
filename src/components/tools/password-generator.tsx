
'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { useToast } from '@/hooks/use-toast';
import { Copy, RefreshCw, ShieldCheck } from 'lucide-react';
import Link from 'next/link';

export default function PasswordGenerator() {
  const [password, setPassword] = useState('');
  const [length, setLength] = useState(16);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeSymbols, setIncludeSymbols] = useState(true);
  const [includeUppercase, setIncludeUppercase] = useState(true);
  const [includeLowercase, setIncludeLowercase] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
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

      // Use a more secure method for random number generation
      const array = new Uint32Array(length);
      window.crypto.getRandomValues(array);

      let newPassword = '';
      for (let i = 0; i < length; i++) {
        newPassword += charSet[array[i] % charSet.length];
      }
      setPassword(newPassword);
    };
    generatePassword();
  }, [length, includeLowercase, includeUppercase, includeNumbers, includeSymbols, toast]);

  const handleGenerate = () => {
     // This function is just to trigger the useEffect hook again by creating a new reference.
     // A more explicit way to do this if we didn't want useEffect dependency trigger.
     // For now, the button just serves as a clear user action. The useEffect handles the logic.
     const event = new Event('generatePassword');
     window.dispatchEvent(event);
     toast({title: 'New password generated!'});
  };

  useEffect(() => {
      const regenerate = () => {
          const numbers = '0123456789';
          const symbols = '!@#$%^&*()_+~`|}{[]:;?><,./-=';
          const upperCase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
          const lowerCase = 'abcdefghijklmnopqrstuvwxyz';

          let charSet = '';
          if (includeLowercase) charSet += lowerCase;
          if (includeUppercase) charSet += upperCase;
          if (includeNumbers) charSet += numbers;
          if (includeSymbols) charSet += symbols;
          if (charSet === '') return;
          const array = new Uint32Array(length);
          window.crypto.getRandomValues(array);
          let newPassword = '';
          for (let i = 0; i < length; i++) newPassword += charSet[array[i] % charSet.length];
          setPassword(newPassword);
      }
      window.addEventListener('generatePassword', regenerate);
      return () => window.removeEventListener('generatePassword', regenerate);
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
        <CardTitle className="text-2xl">Secure Password Generator</CardTitle>
        <CardDescription>Create strong, random, and unique passwords to protect your digital identity. This tool is 100% private and works entirely in your browser.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="relative">
          <Input type="text" value={password} readOnly placeholder="Your password will appear here" className="pr-20 text-base md:text-lg h-12 font-mono" />
          <Button variant="ghost" size="icon" className="absolute right-10 top-1/2 -translate-y-1/2" onClick={handleGenerate}><RefreshCw className="h-5 w-5" /></Button>
          <Button variant="ghost" size="icon" className="absolute right-1 top-1/2 -translate-y-1/2" onClick={copyToClipboard}><Copy className="h-5 w-5" /></Button>
        </div>
        
        <div className="space-y-4 pt-4">
          <div>
            <Label className="text-base">Password Length: {length}</Label>
            <Slider value={[length]} onValueChange={(v) => setLength(v[0])} min={8} max={64} step={1} className="mt-2" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
            <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
              <Label htmlFor="include-uppercase" className="text-base">Include Uppercase (A-Z)</Label>
              <Switch id="include-uppercase" checked={includeUppercase} onCheckedChange={setIncludeUppercase} />
            </div>
            <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
              <Label htmlFor="include-lowercase" className="text-base">Include Lowercase (a-z)</Label>
              <Switch id="include-lowercase" checked={includeLowercase} onCheckedChange={setIncludeLowercase} />
            </div>
            <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
              <Label htmlFor="include-numbers" className="text-base">Include Numbers (0-9)</Label>
              <Switch id="include-numbers" checked={includeNumbers} onCheckedChange={setIncludeNumbers} />
            </div>
            <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
              <Label htmlFor="include-symbols" className="text-base">Include Symbols (!@#...)</Label>
              <Switch id="include-symbols" checked={includeSymbols} onCheckedChange={setIncludeSymbols} />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
    <article className="prose dark:prose-invert max-w-none mx-auto mt-16 text-lg">
        <h2 className="text-3xl font-serif">The Ultimate Guide to Creating Unbreakable Passwords</h2>
        <p>In today's digital landscape, a strong password is the first and most critical line of defense for your online accounts. From email and social media to banking and cloud storage, your personal and financial information is protected by these strings of characters. Weak, reused, or easily guessable passwords are the primary reason for account takeovers and data breaches. Our Secure Password Generator is designed to eliminate this vulnerability by creating exceptionally strong, random passwords for you.</p>

        <h3 className="font-serif">How This Tool Keeps You Safe</h3>
        <p>Many online tools pose a privacy risk by generating passwords on their server, where they could potentially be logged or stored. Our tool operates on a fundamentally more secure principle: **100% client-side generation**. This means:</p>
        <ul>
            <li><strong>No Data Transmission:</strong> The password is created directly on your computer, within your web browser. It is never sent over the internet.</li>
            <li><strong>Cryptographically Secure:</strong> We use your browser's built-in `window.crypto.getRandomValues()` function, a cryptographically secure pseudo-random number generator (CSPRNG), to ensure the randomness is of the highest quality and not predictable.</li>
            <li><strong>Zero Knowledge:</strong> We have absolutely no knowledge of the passwords you generate. Your privacy is mathematically guaranteed.</li>
        </ul>

        <h3 className="font-serif">Step-by-Step Guide to Using the Password Generator</h3>
        <ol>
            <li><strong>Adjust the Length:</strong> Use the slider to set your desired password length. For critical accounts, security experts recommend a minimum of 16 characters, but longer is always better. Our tool supports up to 64 characters for maximum security.</li>
            <li><strong>Select Character Types:</strong> By default, all character types (uppercase, lowercase, numbers, and symbols) are enabled for maximum complexity. You can toggle these switches to meet the specific requirements of any website.</li>
            <li><strong>Generate & Copy:</strong> A secure password is automatically generated when the page loads and updated every time you change a setting. Click the refresh icon to create a new one on demand, or click the copy icon to instantly copy it to your clipboard.</li>
        </ol>

        <h3 className="font-serif">Practical Use Cases for Strong Passwords</h3>
        <ul>
            <li><strong>Master Passwords:</strong> Create an exceptionally long and complex master password for your password manager (e.g., Bitwarden, 1Password).</li>
            <li><strong>Email Accounts:</strong> Your primary email is the key to resetting all your other accounts. It must be protected with a unique, strong password.</li>
            <li><strong>Financial and Banking Apps:</strong> Secure your financial information with passwords that are impossible to guess.</li>
            <li><strong>Social Media Profiles:</strong> Prevent unauthorized access and impersonation by using a unique password for each platform.</li>
            <li><strong>Wi-Fi Network Keys:</strong> Generate a long, random WPA2/WPA3 key for your home or office Wi-Fi to prevent unauthorized network access.</li>
            <li><strong>Developer API Keys:</strong> Create random strings to use as secure secret keys or tokens in your applications.</li>
        </ul>

        <h3 className="font-serif">Advantages and Limitations</h3>
        <p><strong>Advantages:</strong> Our tool provides military-grade random passwords that are virtually impossible to crack with modern brute-force attacks. It's fast, free, and completely private. <strong>Limitations:</strong> The primary limitation is human memory. These passwords are not designed to be memorized. It is essential to use this tool in conjunction with a trusted password manager to securely store and auto-fill your credentials.</p>

        <h3 className="font-serif">Frequently Asked Questions (FAQs)</h3>
        <dl>
            <dt>1. What is the ideal password length?</dt>
            <dd>For sensitive accounts, a minimum of 16-20 characters is recommended. For less critical sites, 12 characters is a good baseline. The longer the password, the more exponentially secure it becomes.</dd>
            <dt>2. Why is including symbols and numbers so important?</dt>
            <dd>Each character type you add dramatically increases the "character set" from which the password is chosen. This makes it exponentially harder for an attacker to guess, as the number of possible combinations grows enormously.</dd>
            <dt>3. Is it safe to use an online password generator?</dt>
            <dd>It is only safe if the tool is client-side, like ours. If a generator runs on a server, you have no guarantee that your password isn't being stored. Our tool's client-side nature makes it as secure as a desktop application.</dd>
            <dt>4. How can I possibly remember these passwords?</dt>
            <dd>You don't! The best practice is to use a reputable password manager. You only need to remember one strong master password for the manager, and it will securely store and fill all your other complex passwords for you.</dd>
            <dt>5. Should I change my passwords regularly?</dt>
            <dd>Modern security advice has shifted. Instead of changing passwords regularly (which often leads to weaker, more predictable changes), the focus is on using a long, unique, and random password for every single site. You should only change a password if you suspect the service has been breached.</dd>
            <dt>6. What is a brute-force attack?</dt>
            <dd>A brute-force attack is a method used by hackers that involves systematically trying every possible combination of characters until the correct password is found. Long, complex passwords with a mix of character types make this attack method practically impossible with current technology.</dd>
        </dl>

        <h3 className="font-serif">Best Practices for Password Security</h3>
        <ul>
            <li><strong>Use a Password Manager:</strong> This is the most important step. It's the only practical way to manage unique, strong passwords for all your accounts.</li>
            <li><strong>Enable Two-Factor Authentication (2FA):</strong> Always enable 2FA (preferably with an app like our <Link href="/tools/otp-generator">OTP Generator</Link>, not SMS) wherever it is offered. This provides a crucial second layer of security.</li>
            <li><strong>Never Reuse Passwords:</strong> If one site is breached, attackers will use your email and password to try to log into other popular services. A unique password for each site contains this threat.</li>
            <li><strong>Be Wary of Phishing:</strong> Never enter your password on a site you've reached via an unsolicited email link. Always type the website address directly or use a trusted bookmark.</li>
        </ul>
        
    </article>
    </>
  );
}
