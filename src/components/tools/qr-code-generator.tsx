'use client';

import { useState, useRef } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Download } from 'lucide-react';
import QRCode from 'qrcode.react';

export default function QrCodeGenerator() {
  const [text, setText] = useState('https://toolzen.com');
  const [fgColor, setFgColor] = useState('#1D2637');
  const [bgColor, setBgColor] = useState('#A2C7EB');
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
    <Card className="w-full shadow-lg rounded-lg">
      <CardHeader>
        <CardTitle className="text-2xl">QR Code Generator</CardTitle>
        <CardDescription>Create your own QR code from any text or URL.</CardDescription>
      </CardHeader>
      <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="text">Text or URL</Label>
            <Textarea
              id="text"
              placeholder="Enter text or URL here"
              value={text}
              onChange={(e) => setText(e.target.value)}
              rows={4}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
                <Label htmlFor="fgColor">Foreground Color</Label>
                <Input
                id="fgColor"
                type="color"
                value={fgColor}
                onChange={(e) => setFgColor(e.target.value)}
                className="p-1 h-10"
                />
            </div>
            <div className="space-y-2">
                <Label htmlFor="bgColor">Background Color</Label>
                <Input
                id="bgColor"
                type="color"
                value={bgColor}
                onChange={(e) => setBgColor(e.target.value)}
                className="p-1 h-10"
                />
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center justify-center space-y-4">
            <div ref={qrRef} className="p-4 bg-white rounded-lg inline-block shadow-inner">
                {text ? (
                    <QRCode value={text} size={256} fgColor={fgColor} bgColor={bgColor} />
                ) : (
                    <div className="w-[256px] h-[256px] bg-muted rounded-md flex items-center justify-center text-muted-foreground">
                        Enter text to generate QR code
                    </div>
                )}
            </div>
          <Button onClick={handleDownload} disabled={!text}>
            <Download className="mr-2 h-4 w-4" />
            Download QR Code
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
