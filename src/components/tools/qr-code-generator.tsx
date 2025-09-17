'use client';

import { useState, useRef } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Download } from 'lucide-react';
import QRCode from 'qrcode.react';

export default function QrCodeGenerator() {
  const [text, setText] = useState('https://toolzen.com');
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
    <Card className="w-full shadow-lg rounded-lg bg-card/60 backdrop-blur-lg">
      <CardHeader>
        <CardTitle className="text-2xl">QR Code Generator</CardTitle>
        <CardDescription>Create your own QR code from any text or URL.</CardDescription>
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
        </div>

        <div className="flex flex-col items-center justify-center space-y-4">
            <div ref={qrRef} className="p-4 bg-white rounded-lg inline-block shadow-inner">
                {text ? (
                    <QRCode value={text} size={256} fgColor="#000000" bgColor="#FFFFFF" />
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
  );
}