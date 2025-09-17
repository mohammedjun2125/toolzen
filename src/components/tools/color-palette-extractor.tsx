'use client';

import { useState, useRef, useCallback } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { Upload, Palette, Copy } from 'lucide-react';

type Color = {
  hex: string;
  count: number;
};

export default function ColorPaletteExtractor() {
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [palette, setPalette] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        toast({
          variant: 'destructive',
          title: 'Unsupported file type',
          description: 'Please upload an image file.',
        });
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
        extractPalette(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };
  
  const rgbToHex = (r: number, g: number, b: number) => '#' + [r, g, b].map(x => {
    const hex = x.toString(16);
    return hex.length === 1 ? '0' + hex : hex;
  }).join('');

  const extractPalette = useCallback((imageUrl: string) => {
    setIsLoading(true);
    setPalette([]);
    const img = new Image();
    img.crossOrigin = 'Anonymous';
    img.src = imageUrl;
    img.onload = () => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d', { willReadFrequently: true });
      if (!ctx) {
        setIsLoading(false);
        toast({variant: 'destructive', title: 'Canvas not supported'});
        return;
      }
      
      const MAX_WIDTH = 100;
      const scale = MAX_WIDTH / img.width;
      canvas.width = MAX_WIDTH;
      canvas.height = img.height * scale;
      
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
      const colorCounts: { [key: string]: number } = {};
      
      for (let i = 0; i < imageData.length; i += 4) {
        const [r, g, b] = [imageData[i], imageData[i+1], imageData[i+2]];
        const hex = rgbToHex(r,g,b);
        colorCounts[hex] = (colorCounts[hex] || 0) + 1;
      }
      
      const sortedColors = Object.entries(colorCounts).sort(([, a], [, b]) => b - a);
      
      // Simple clustering to avoid very similar colors
      const dominantColors: string[] = [];
      const colorThreshold = 30;

      for (const [hex] of sortedColors) {
        if (dominantColors.length >= 8) break;
        
        const [r1, g1, b1] = [parseInt(hex.slice(1, 3), 16), parseInt(hex.slice(3, 5), 16), parseInt(hex.slice(5, 7), 16)];

        const isSimilar = dominantColors.some(dHex => {
            const [r2, g2, b2] = [parseInt(dHex.slice(1, 3), 16), parseInt(dHex.slice(3, 5), 16), parseInt(dHex.slice(5, 7), 16)];
            const distance = Math.sqrt(Math.pow(r1 - r2, 2) + Math.pow(g1 - g2, 2) + Math.pow(b1 - b2, 2));
            return distance < colorThreshold;
        });

        if (!isSimilar) {
            dominantColors.push(hex);
        }
      }

      setPalette(dominantColors);
      setIsLoading(false);
    };
    img.onerror = () => {
        setIsLoading(false);
        toast({variant: 'destructive', title: 'Error loading image'});
    }
  }, [toast]);
  
  const copyToClipboard = (hex: string) => {
    navigator.clipboard.writeText(hex);
    toast({
      title: `Copied ${hex} to clipboard!`,
    });
  }

  return (
    <Card className="w-full shadow-lg rounded-lg">
      <CardHeader>
        <CardTitle className="text-2xl">Color Palette Extractor</CardTitle>
        <CardDescription>Upload an image to extract its dominant colors.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div
          className="border-2 border-dashed border-border rounded-lg p-8 flex flex-col items-center justify-center text-center cursor-pointer hover:border-primary transition-colors"
          onClick={() => fileInputRef.current?.click()}
        >
          {imagePreview ? (
            <img src={imagePreview} alt="Uploaded preview" className="max-h-64 rounded-md" />
          ) : (
            <>
              <Upload className="h-12 w-12 text-muted-foreground" />
              <p className="mt-4 text-muted-foreground">Click to upload or drag and drop</p>
              <p className="text-sm text-muted-foreground">PNG, JPG, WEBP, etc.</p>
            </>
          )}
          <Input
            ref={fileInputRef}
            type="file"
            className="hidden"
            accept="image/*"
            onChange={handleFileChange}
          />
        </div>

        {isLoading && <p className="text-center">Extracting colors...</p>}

        {palette.length > 0 && (
          <div className="space-y-4">
            <h3 className="font-semibold text-lg flex items-center gap-2"><Palette/> Extracted Palette</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-2">
              {palette.map((color, index) => (
                <div key={index} className="space-y-1 group cursor-pointer" onClick={() => copyToClipboard(color)}>
                    <div
                        className="h-20 rounded-lg transition-transform group-hover:scale-105"
                        style={{ backgroundColor: color }}
                    ></div>
                    <div className="flex items-center gap-1 text-sm text-muted-foreground group-hover:text-primary-foreground">
                        <span>{color}</span>
                        <Copy className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
