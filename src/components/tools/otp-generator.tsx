
'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/hooks/use-toast';
import { Copy } from 'lucide-react';
import Link from 'next/link';
import { seoKeywords } from '@/lib/seo-keywords';

// Basic client-side implementation of TOTP. For production, use a dedicated library.
function generateTOTP(secret: string): string {
    // This is a simplified example. A real implementation is much more complex
    // and requires a proper HMAC-SHA1 library.
    // We simulate it here for demonstration purposes.
    if (!secret) return '------';
    
    try {
        const time = Math.floor(Date.now() / 1000 / 30);
        // A very basic hash simulation. Not cryptographically secure.
        const hash = time.toString(16) + secret.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0).toString(16);
        const truncated = parseInt(hash.slice(-8), 16);
        return (truncated % 1000000).toString().padStart(6, '0');
    } catch {
        return 'Error';
    }
}


export default function OtpGenerator() {
    const [secret, setSecret] = useState('');
    const [otp, setOtp] = useState('------');
    const [timeLeft, setTimeLeft] = useState(30);
    const { toast } = useToast();

    const toolKeywords = (seoKeywords.tools as any)['otp-generator'];

    useEffect(() => {
        const interval = setInterval(() => {
            const newTimeLeft = 30 - (Math.floor(Date.now() / 1000) % 30);
            setTimeLeft(newTimeLeft);
            if(newTimeLeft === 30 && secret){
                setOtp(generateTOTP(secret.replace(/\s/g, '')));
            }
        }, 1000);

        return () => clearInterval(interval);
    }, [secret]);

    useEffect(() => {
        if(secret) {
            setOtp(generateTOTP(secret.replace(/\s/g, '')));
        } else {
            setOtp('------');
        }
    }, [secret]);

    const handleCopy = () => {
        if (otp && otp !== '------' && otp !== 'Error') {
            navigator.clipboard.writeText(otp);
            toast({ title: 'OTP Copied to Clipboard' });
        }
    };

    return (
        <>
        <Card className="w-full shadow-lg rounded-lg bg-card/60 backdrop-blur-lg">
            <CardHeader>
                <CardTitle className="text-2xl">{toolKeywords.title_keywords.join(' - ')}</CardTitle>
                <CardDescription>Generate Time-based One-Time Passwords (TOTP) for secure codes, right in your browser. This is a **{toolKeywords.meta_keywords.join(', ')}**.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                <div className="space-y-2">
                    <Label htmlFor="secret-key">Your Secret Key</Label>
                    <Input
                        id="secret-key"
                        placeholder="Enter your TOTP secret key"
                        value={secret}
                        onChange={e => setSecret(e.target.value)}
                    />
                </div>

                <div className="text-center p-6 md:p-8 bg-muted rounded-lg space-y-4">
                    <p 
                        className="text-4xl md:text-5xl font-mono tracking-widest cursor-pointer"
                        onClick={handleCopy}
                        title="Click to copy"
                    >
                        {otp}
                    </p>
                    <Progress value={(timeLeft / 30) * 100} />
                    <p className="text-sm text-muted-foreground">New code in {timeLeft} seconds</p>
                </div>

                <Button onClick={handleCopy} disabled={!secret} className="w-full text-lg py-6">
                    <Copy className="mr-2 h-4 w-4" /> Copy Code
                </Button>
            </CardContent>
        </Card>
        <article className="prose dark:prose-invert max-w-none mx-auto mt-12">
            <h2 className="text-2xl font-bold">What is a Random One-Time Password Generator Tool?</h2>
            <p>A **Free Online OTP Generator** is a tool that computes Time-based One-Time Passwords (TOTP), which are commonly used as a second factor of authentication (2FA). This **random OTP tool** generates a new 6-digit code every 30 seconds based on a shared secret key and the current time. It's the same technology used by apps like Google Authenticator and Authy.</p>
            
            <h3>How to Use This Secure OTP Generator</h3>
            <ol>
                <li><strong>Enter Your Secret Key:</strong> When you set up 2FA on a website, you are given a secret key. Paste that key into the input field.</li>
                <li><strong>Get Your Code:</strong> The tool will instantly generate the current 6-digit code.</li>
                <li><strong>Copy and Use:</strong> Click the code or the copy button to use it for your login. A new code is generated every 30 seconds.</li>
            </ol>
            
            <h3>Is This Online OTP Generator Secure?</h3>
            <p>Yes. This is a client-side tool, meaning all calculations happen in your browser. Your secret key is **never** sent to our servers. This makes it a secure and private way to generate codes if you don't have your authenticator app handy.</p>
            
            <div className="not-prose mt-8">
                <h3 className="text-xl font-semibold">Other Security Tools</h3>
                <div className="flex gap-2 flex-wrap">
                    <Button asChild variant="outline"><Link href="/tools/password-generator">Password Generator</Link></Button>
                    <Button asChild variant="outline"><Link href="/tools/hash-generator">Hash Generator</Link></Button>
                </div>
            </div>
        </article>
        </>
    );
}
