'use client';

import { useState, useRef, useCallback } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/hooks/use-toast';
import { Upload, Download, FileImage, X } from 'lucide-react';

export default function ImageCompressor() {
  const [originalFile, setOriginalFile] = useState<File | null>(null);
  const [originalPreview, setOriginalPreview] = useState<string | null>(null);
  const [compressedPreview, setCompressedPreview] = useState<string | null>(null);
  const [targetSize, setTargetSize] = useState(500); // in KB
  const [isCompressing, setIsCompressing] = useState(false);
  const [compressionProgress, setCompressionProgress] = useState(0);
  const [originalSize, setOriginalSize] = useState(0);
  const [compressedSize, setCompressedSize] = useState(0);
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (!['image/jpeg', 'image/png', 'image/webp', 'image/gif'].includes(file.type)) {
        toast({
          variant: 'destructive',
          title: 'Unsupported file type',
          description: 'Please upload a JPG, PNG, WEBP, or GIF image.',
        });
        return;
      }
      setOriginalFile(file);
      setOriginalSize(file.size / 1024);
      setCompressedPreview(null);
      setCompressedSize(0);
      const reader = new FileReader();
      reader.onloadend = () => {
        setOriginalPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCompress = useCallback(async () => {
    if (!originalFile) {
      toast({
        variant: 'destructive',
        title: 'No file selected',
        description: 'Please select an image file to compress.',
      });
      return;
    }

    setIsCompressing(true);
    setCompressionProgress(0);

    const targetSizeBytes = targetSize * 1024;
    const image = new Image();
    const reader = new FileReader();

    reader.onload = (e) => {
      image.src = e.target?.result as string;
    };

    image.onload = async () => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      if (!ctx) return;
      
      canvas.width = image.width;
      canvas.height = image.height;
      ctx.drawImage(image, 0, 0);

      let lowerBound = 0;
      let upperBound = 1;
      let bestUrl = '';
      let bestSize = Infinity;
      const isWebp = originalFile.type === 'image/webp';

      for (let i = 0; i < 10; i++) {
        setCompressionProgress((i + 1) * 10);
        const quality = (lowerBound + upperBound) / 2;
        const dataUrl = canvas.toDataURL(isWebp ? 'image/webp' : 'image/jpeg', quality);
        const blob = await (await fetch(dataUrl)).blob();
        
        if (Math.abs(blob.size - targetSizeBytes) < Math.abs(bestSize - targetSizeBytes)) {
          bestUrl = dataUrl;
          bestSize = blob.size;
        }
        
        if (blob.size > targetSizeBytes) {
          upperBound = quality;
        } else {
          lowerBound = quality;
        }

        if (Math.abs(blob.size - targetSizeBytes) < 1024 * 5) { // within 5KB
          break;
        }
      }

      setCompressedPreview(bestUrl);
      setCompressedSize(bestSize / 1024);
      setIsCompressing(false);
      setCompressionProgress(100);
      
      toast({
        title: 'Compression complete',
        description: `Image compressed to ${Math.round(bestSize / 1024)} KB.`,
      });
    };

    reader.readAsDataURL(originalFile);
  }, [originalFile, targetSize, toast]);

  const handleDownload = () => {
    if (compressedPreview) {
      const link = document.createElement('a');
      link.href = compressedPreview;
      const fileExtension = originalFile?.type.split('/')[1] === 'webp' ? 'webp' : 'jpg';
      link.download = `compressed_${originalFile?.name.split('.')[0]}.${fileExtension}`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };
  
  const reset = () => {
      setOriginalFile(null);
      setOriginalPreview(null);
      setCompressedPreview(null);
      setOriginalSize(0);
      setCompressedSize(0);
      if(fileInputRef.current) {
          fileInputRef.current.value = "";
      }
  }

  return (
    <Card className="w-full shadow-lg rounded-lg">
      <CardHeader>
        <CardTitle className="text-2xl">Image Compressor</CardTitle>
        <CardDescription>Reduce the file size of your images without losing quality.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {!originalPreview ? (
          <div
            className="border-2 border-dashed border-border rounded-lg p-12 flex flex-col items-center justify-center text-center cursor-pointer hover:border-primary transition-colors"
            onClick={() => fileInputRef.current?.click()}
          >
            <Upload className="h-12 w-12 text-muted-foreground" />
            <p className="mt-4 text-muted-foreground">Click to upload or drag and drop</p>
            <p className="text-sm text-muted-foreground">JPG, PNG, WEBP, GIF</p>
            <Input
              ref={fileInputRef}
              type="file"
              className="hidden"
              accept="image/jpeg,image/png,image/webp,image/gif"
              onChange={handleFileChange}
            />
          </div>
        ) : (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="relative">
                    <p className="text-center font-semibold mb-2">Original ({Math.round(originalSize)} KB)</p>
                    <img src={originalPreview} alt="Original" className="rounded-lg w-full h-auto" />
                </div>
                <div className="relative">
                    <p className="text-center font-semibold mb-2">
                        {compressedPreview ? `Compressed (${Math.round(compressedSize)} KB)` : 'Compressed'}
                    </p>
                    {compressedPreview ? (
                        <img src={compressedPreview} alt="Compressed" className="rounded-lg w-full h-auto" />
                    ) : (
                        <div className="rounded-lg bg-muted flex items-center justify-center h-full">
                            <FileImage className="h-16 w-16 text-muted-foreground" />
                        </div>
                    )}
                </div>
            </div>
            {isCompressing && <Progress value={compressionProgress} className="w-full" />}
            <div className="flex justify-end">
                <Button variant="ghost" size="icon" onClick={reset}><X/></Button>
            </div>
          </div>
        )}
        
        <div className="space-y-4">
          <div>
            <Label htmlFor="target-size">Target Size (KB): {targetSize} KB</Label>
            <Input
              id="target-size"
              type="number"
              value={targetSize}
              onChange={(e) => setTargetSize(Number(e.target.value))}
              className="w-full"
              min="10"
            />
          </div>
          <div className="flex gap-4">
            <Button onClick={handleCompress} disabled={!originalFile || isCompressing} className="w-full">
              {isCompressing ? 'Compressing...' : 'Compress'}
            </Button>
            <Button onClick={handleDownload} disabled={!compressedPreview} className="w-full" variant="outline">
              <Download className="mr-2 h-4 w-4" />
              Download
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
