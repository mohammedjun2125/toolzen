
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
      <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <div className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="text" className="text-lg">Enter Text or URL</Label>
            <Input
              id="text"
              placeholder="e.g., https://www.toolzenweb.com"
              value={text}
              onChange={(e) => setText(e.target.value)}
              className="py-6 text-base"
            />
          </div>
           <div className="text-muted-foreground">
              Enter any text or website URL in the box, and the QR code will update in real-time. You can use it for sharing links, contact information, Wi-Fi passwords, or event details.
            </div>
        </div>

        <div className="flex flex-col items-center justify-center space-y-4">
            <div ref={qrRef} className="p-4 bg-white rounded-lg inline-block shadow-inner">
                {text ? (
                    <QRCode value={text} size={256} fgColor="#000000" bgColor="#FFFFFF" level="H" includeMargin={true} />
                ) : (
                    <div className="w-[256px] h-[256px] bg-muted rounded-md flex items-center justify-center text-muted-foreground text-center p-4">
                        Enter text to generate a QR code
                    </div>
                )}
            </div>
          <Button onClick={handleDownload} disabled={!text} size="lg">
            <Download className="mr-2 h-4 w-4" />
            Download as PNG
          </Button>
        </div>
      </CardContent>
    </Card>

    <article className="prose dark:prose-invert max-w-none mx-auto mt-16 text-lg">
        <h2 className="text-3xl font-serif">What is a QR Code and Why Do You Need One?</h2>
        <p>A QR (Quick Response) code is a two-dimensional barcode that acts as a powerful bridge between the physical and digital worlds. It allows anyone with a smartphone to instantly access information—a website, a video, a contact card, a menu—simply by pointing their camera at it. For businesses, marketers, and individuals, QR codes are an incredibly efficient way to share information and engage with an audience without them needing to type a single character. Our **free online QR Code Generator** empowers you to create high-quality, custom QR codes for any purpose, instantly and privately.</p>

        <h3 className="font-serif">How Our QR Code Generator Works</h3>
        <p>Our tool is built on the principles of simplicity, speed, and security. It leverages a robust JavaScript library to generate the QR code entirely within your web browser. This **client-side processing** is crucial for privacy. The data you enter—whether it's a private link, contact information, or a secret message—is never sent to our servers. It remains on your device, ensuring complete confidentiality. The code is rendered in real-time on a canvas element, which is then converted into a high-quality PNG image for you to download.</p>

        <h3 className="font-serif">Step-by-Step Guide to Creating Your QR Code</h3>
        <ol>
          <li><strong>Enter Your Data:</strong> Type or paste the information you want to encode into the input field. This can be a website URL, a piece of text, an email address, or a phone number.</li>
          <li><strong>Preview in Real-Time:</strong> The QR code image on the right will update instantly as you type, giving you an immediate preview of the final result.</li>
          <li><strong>Test the Code (Optional but Recommended):</strong> Use your smartphone's camera to scan the preview on your screen to ensure it directs to the correct destination or shows the right information.</li>
          <li><strong>Download Your QR Code:</strong> Click the "Download as PNG" button to save your high-resolution QR code. The file is now ready to be used in your designs.</li>
        </ol>

        <h3 className="font-serif">Practical Use Cases for QR Codes</h3>
        <ul>
            <li><strong>Marketing & Advertising:</strong> Place QR codes on flyers, posters, and business cards to link potential customers to your website, a special landing page, or a promotional video.</li>
            <li><strong>Business Operations:</strong> Use QR codes on restaurant tables for contactless menus, in retail stores to provide more product information, or on packaging to link to user manuals.</li>
            <li><strong>Event Management:</strong> Add a QR code to event tickets or invitations that links to a map of the venue, the event schedule, or an RSVP form.</li>
            <li><strong>Personal Networking:</strong> Generate a QR code for a vCard containing your contact details. When someone scans it, they can instantly save you as a contact on their phone.</li>
            <li><strong>Wi-Fi Sharing:</strong> Create a QR code for your home or office Wi-Fi network. Guests can scan it to connect automatically without needing to manually enter a complex password. (Format: `WIFI:T:WPA;S:YOUR_SSID;P:YOUR_PASSWORD;;`)</li>
        </ul>

        <h3 className="font-serif">Advantages and Limitations</h3>
        <p><strong>Advantages:</strong> Our tool is free, unlimited, and respects your privacy. It generates high-quality, high-error-correction codes that are reliable and scannable. <strong>Limitations:</strong> This version of the tool generates standard black-and-white QR codes. Advanced customization options like adding a logo or changing colors are planned for a future update. For most use cases, a standard code is more reliable and universally scannable.</p>

        <h3 className="font-serif">Frequently Asked Questions (FAQs)</h3>
        <dl>
            <dt>1. Is it free to generate QR codes for commercial use?</dt>
            <dd>Yes, absolutely. The QR codes you create with our tool are completely free for both personal and commercial purposes. There are no limits, subscriptions, or hidden fees.</dd>
            <dt>2. Do the QR codes expire?</dt>
            <dd>No, the QR codes generated are static and do not expire. They will work forever, as long as the destination link or data they point to remains valid.</dd>
            <dt>3. What does "high error correction" mean?</dt>
            <dd>Error correction is a feature of QR codes that allows them to be successfully scanned even if they are partially damaged, dirty, or obscured. Our generator uses the highest level ('H'), which means up to 30% of the code can be damaged and it will still function correctly.</dd>
            <dt>4. Can I track how many times my QR code is scanned?</dt>
            <dd>Our tool generates static QR codes, which do not have tracking capabilities built-in. To track scans, you would need to link the QR code to a URL that you can monitor with an analytics service (like a Bitly link or a URL with UTM parameters).</dd>
            <dt>5. What is the best size to print a QR code?</dt>
            <dd>For reliable scanning, a printed QR code should be at least 1 inch x 1 inch (2.5 cm x 2.5 cm). However, the ideal size depends on the scanning distance. For a poster that will be scanned from several feet away, the code should be significantly larger.</dd>
            <dt>6. Can I create a QR code with a logo in the middle?</dt>
            <dd>This version of our generator does not support adding a logo. While it's a popular feature, it can sometimes interfere with scannability if not done correctly. We prioritize reliability and may add this as an advanced option in the future.</dd>
        </dl>

        <h3 className="font-serif">Best Practices for Using QR Codes</h3>
        <ul>
            <li><strong>Provide Context:</strong> Always include a short call to action near your QR code, such as "Scan for Menu" or "Visit Our Website," so users know what to expect.</li>
            <li><strong>Test Before Printing:</strong> Always test your QR code with multiple devices and scanning apps before a large print run.</li>
            <li><strong>Ensure a Good Landing Experience:</strong> Make sure the destination URL is mobile-friendly, as the vast majority of scans will come from smartphones.</li>
            <li><strong>Mind the Placement:</strong> Place your QR code in a location where users can easily and safely scan it. Avoid placing it on moving objects or in areas with poor lighting or no internet connectivity.</li>
        </ul>
    </article>
    </>
  );
}
