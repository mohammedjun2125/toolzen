'use client';

import { useState, useRef } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Download } from 'lucide-react';
import QRCode from 'qrcode.react';

export default function QrCodeGenerator() {
  const [text, setText] = useState('https://toolzenweb.com');
  const qrRef = useRef<HTMLDivElement>(null);

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
        <CardTitle className="text-2xl">QR Code Generator</CardTitle>
        <CardDescription>Create your own QR code from any text or URL. It's free, fast, and your data is never stored.</CardDescription>
      </CardHeader>
      <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="text">Text or URL</Label>
            <Input
              id="text"
              placeholder="Enter text or URL here"
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
          </div>
           <div className="text-sm text-muted-foreground">
              Enter any text or website URL in the box, and the QR code will update in real-time. You can use it for sharing links, contact information, Wi-Fi passwords, or plain text.
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
            Download PNG
          </Button>
        </div>
      </CardContent>
    </Card>

    <div className="prose dark:prose-invert max-w-none mx-auto mt-12">
        <h2 className="text-2xl font-bold">Instantly Bridge the Physical and Digital Worlds</h2>
        <p>QR (Quick Response) codes have become an indispensable tool in modern marketing, logistics, and personal communication. They provide a seamless bridge between the physical world and the digital realm, allowing users to access information with a simple scan from their smartphone. Our QR Code Generator empowers you to create high-quality, custom QR codes for any purpose—instantly and for free.</p>
        
        <h3>Why Use Our QR Code Generator?</h3>
        <ul>
            <li><strong>Completely Free:</strong> Generate as many QR codes as you need without any cost or hidden fees.</li>
            <li><strong>100% Private:</strong> The QR code is generated directly in your browser. The data you enter is never sent to our servers, ensuring your information remains completely secure.</li>
            <li><strong>Instant Generation:</strong> See your QR code update in real-time as you type. There's no waiting or processing time.</li>
            <li><strong>High-Quality Downloads:</strong> Download your QR code as a high-resolution PNG file, perfect for both digital use and print materials like business cards, posters, or product packaging.</li>
            <li><strong>High Error Correction:</strong> We generate codes with a high error correction level ('H'), meaning your QR code will remain scannable even if a portion of it is damaged or obscured.</li>
        </ul>

        <h3>Common Use Cases for QR Codes</h3>
        <p>The possibilities are endless. Here are just a few ideas:</p>
        <ul>
            <li><strong>Marketing & Business:</strong> Link customers to your website, a special landing page, or a video from a physical ad.</li>
            <li><strong>Events:</strong> Share event details, a map, or a schedule on posters and flyers.</li>
            <li><strong>Networking:</strong> Put a QR code on your business card that links to your LinkedIn profile or digital contact card (vCard).</li>
            <li><strong>Restaurants:</strong> Provide a touch-free menu by placing a QR code on each table.</li>
            <li><strong>Personal Use:</strong> Share your Wi-Fi network details with guests without them having to type a complicated password.</li>
        </ul>

        <h3>How to Get the Best Results</h3>
        <p>To ensure your QR code is easily scannable, make sure there is sufficient contrast between the code and its background. A black code on a white background is the most reliable combination. When printing, ensure the code is large enough for a phone camera to easily capture it—a minimum size of 1x1 inch (2.5x2.5 cm) is a good rule of thumb.</p>
    </div>

    </>
  );
}
