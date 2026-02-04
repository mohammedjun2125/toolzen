

'use client';

import { useState, useRef } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Download } from 'lucide-react';
import QRCode from 'qrcode.react';
import { seoKeywords } from '@/lib/seo-keywords';
import Link from 'next/link';

export default function QrCodeGenerator() {
  const [text, setText] = useState('https://www.toolzenweb.com');
  const qrRef = useRef<HTMLDivElement>(null);

  const toolKeywords = (seoKeywords.tools as any)['qr-code-generator'];

  const handleDownload = () => {
    if (qrRef.current) {
      const canvas = qrRef.current.querySelector('canvas');
      if (canvas) {
        const link = document.createElement('a');
        link.href = canvas.toDataURL('image/png');
        link.download = 'qrcode.png';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }
    }
  };

  return (
    <>
    <Card className="w-full shadow-lg rounded-lg bg-card/60 backdrop-blur-lg">
      <CardHeader>
        <CardTitle className="text-2xl">{toolKeywords.title_keywords.join(' - ')}</CardTitle>
        <CardDescription>Create a custom QR code from any text or URL. Our free QR code maker is fast, private, and generates high-quality PNGs for {toolKeywords.meta_keywords.join(', ')}, or personal use.</CardDescription>
      </CardHeader>
      <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="text">Enter Text or URL</Label>
            <Input
              id="text"
              placeholder="e.g., https://www.toolzenweb.com"
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
          </div>
           <div className="text-sm text-muted-foreground">
              Enter any text or website URL in the box, and the QR code will update in real-time. You can use it for sharing links, contact information, Wi-Fi passwords, or event details.
            </div>
        </div>

        <div className="flex flex-col items-center justify-center space-y-4">
            <div ref={qrRef} className="p-4 bg-white rounded-lg inline-block shadow-inner">
                {text ? (
                    <QRCode value={text} size={256} fgColor="#000000" bgColor="#FFFFFF" level="H" />
                ) : (
                    <div className="w-[256px] h-[256px] bg-muted rounded-md flex items-center justify-center text-muted-foreground">
                        Enter text to generate QR code
                    </div>
                )}
            </div>
          <Button onClick={handleDownload} disabled={!text}>
            <Download className="mr-2 h-4 w-4" />
            Download as PNG
          </Button>
        </div>
      </CardContent>
    </Card>

    <article className="prose dark:prose-invert max-w-none mx-auto mt-12">
        <h2 className="text-2xl font-bold">What is a QR Code Generator?</h2>
        <p>A QR (Quick Response) code is a two-dimensional barcode that provides a seamless bridge between the physical and digital worlds. It allows users to access information with a simple scan from their smartphone camera. Our free online QR Code Generator empowers you to create high-quality, custom QR codes for any purpose—instantly, privately, and for free.</p>
        
        <h3 className="text-xl font-bold">How to Use the QR Code Generator</h3>
        <ol>
          <li><strong>Enter Your Data:</strong> Type or paste the URL, text, or information you want to encode into the input field.</li>
          <li><strong>Preview in Real-Time:</strong> The QR code image on the right will update instantly as you type.</li>
          <li><strong>Download:</strong> Click the "Download as PNG" button to save your high-quality QR code.</li>
        </ol>

        <h3 className="text-xl font-bold">Key Features</h3>
        <ul>
            <li><strong>Completely Free:</strong> Generate as many QR codes as you need without any cost or hidden fees.</li>
            <li><strong>100% Private:</strong> The QR code is generated directly in your browser. The data you enter is never sent to our servers.</li>
            <li><strong>Instant Generation:</strong> See your QR code update in real-time as you type.</li>
            <li><strong>High-Quality Downloads:</strong> Download your QR code as a high-resolution PNG file, perfect for both digital use and print materials.</li>
            <li><strong>High Error Correction:</strong> We generate codes with a high error correction level ('H'), meaning your QR code will remain scannable even if a portion of it is damaged or obscured.</li>
        </ul>

        <h3 className="text-xl font-bold">Common Use Cases for QR Codes</h3>
        <ul>
            <li><strong>Business Cards & Flyers:</strong> Link potential clients directly to your website, portfolio, or a special landing page.</li>
            <li>**Event Management:** Share event details, a map, or a schedule on posters and flyers.</li>
            <li>**Restaurant Menus:** Provide a touch-free menu by placing a QR code on each table that links to your online menu.</li>
            <li>**Product Packaging:** Link to instructions, tutorials, or a page to re-order the product.</li>
            <li>**Personal Use:** Share your Wi-Fi network details with guests without them having to type a complicated password. Simply generate a code for `WIFI:T:WPA;S:YOUR_SSID;P:YOUR_PASSWORD;;`.</li>
        </ul>

        <div className="not-prose mt-8">
            <h3 className="text-xl font-semibold">Related Generator Tools</h3>
            <p>Explore our other free generator tools:</p>
            <div className="flex gap-2 flex-wrap">
                <Button asChild variant="outline"><Link href="/tools/barcode-generator">Barcode Generator</Link></Button>
                <Button asChild variant="outline"><Link href="/tools/password-generator">Password Generator</Link></Button>
            </div>
        </div>
    </article>
    </>
  );
}
