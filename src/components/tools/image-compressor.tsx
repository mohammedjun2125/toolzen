'use client';

import { useState, useRef, useCallback } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/hooks/use-toast';
import { Upload, Download, FileImage, X, Percent } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";


export default function ImageCompressor() {
  const [originalFile, setOriginalFile] = useState<File | null>(null);
  const [originalPreview, setOriginalPreview] = useState<string | null>(null);
  const [compressedBlob, setCompressedBlob] = useState<Blob | null>(null);
  const [compressedPreview, setCompressedPreview] = useState<string | null>(null);
  const [targetSize, setTargetSize] = useState(500); // in KB
  const [targetUnit, setTargetUnit] = useState<'KB' | 'MB'>('KB');
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
      setOriginalSize(file.size);
      setCompressedBlob(null);
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

    const targetSizeBytes = targetUnit === 'MB' ? targetSize * 1024 * 1024 : targetSize * 1024;
    
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

      let quality = 0.9;
      let iterations = 0;
      let currentBlob: Blob | null = null;
      
      while(iterations < 10) {
        iterations++;
        setCompressionProgress(iterations * 10);
        const dataUrl = canvas.toDataURL(originalFile.type, quality);
        currentBlob = await (await fetch(dataUrl)).blob();

        if (currentBlob.size <= targetSizeBytes) {
          break;
        }
        quality -= 0.1;
        if (quality < 0.1) {
            quality = 0.1;
            break;
        };
      }

      if(currentBlob){
        setCompressedBlob(currentBlob);
        setCompressedPreview(URL.createObjectURL(currentBlob));
        setCompressedSize(currentBlob.size);
      }
      
      setIsCompressing(false);
      setCompressionProgress(100);
      
      toast({
        title: 'Compression complete',
        description: `Image compressed to ${Math.round(currentBlob!.size / 1024)} KB.`,
      });
    };

    reader.readAsDataURL(originalFile);
  }, [originalFile, targetSize, targetUnit, toast]);

  const handleDownload = () => {
    if (compressedPreview && compressedBlob) {
      const link = document.createElement('a');
      link.href = compressedPreview;
      const fileExtension = originalFile?.type.split('/')[1] || 'jpg';
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
      setCompressedBlob(null);
      setOriginalSize(0);
      setCompressedSize(0);
      if(fileInputRef.current) {
          fileInputRef.current.value = "";
      }
  }

  const reductionPercentage = originalSize > 0 && compressedSize > 0 
    ? Math.round(((originalSize - compressedSize) / originalSize) * 100)
    : 0;

  return (
    <Card className="w-full shadow-lg rounded-lg bg-card/60 backdrop-blur-lg">
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
                    <p className="text-center font-semibold mb-2">Original ({Math.round(originalSize / 1024)} KB)</p>
                    <img src={originalPreview} alt="Original" className="rounded-lg w-full h-auto" />
                </div>
                <div className="relative">
                    <p className="text-center font-semibold mb-2">
                        {compressedPreview ? `Compressed (${Math.round(compressedSize / 1024)} KB)` : 'Compressed'}
                    </p>
                    {isCompressing ? (
                      <div className="rounded-lg bg-muted flex flex-col items-center justify-center h-full">
                        <Progress value={compressionProgress} className="w-3/4" />
                        <p className="text-sm mt-2">Compressing...</p>
                      </div>
                    ) : compressedPreview ? (
                        <img src={compressedPreview} alt="Compressed" className="rounded-lg w-full h-auto" />
                    ) : (
                        <div className="rounded-lg bg-muted flex items-center justify-center h-full">
                            <FileImage className="h-16 w-16 text-muted-foreground" />
                        </div>
                    )}
                </div>
            </div>
             {reductionPercentage > 0 && (
                <div className="flex items-center justify-center text-lg font-medium text-green-500">
                    <Percent className="h-5 w-5 mr-2"/> {reductionPercentage}% size reduction
                </div>
             )}
            <div className="flex justify-end">
                <Button variant="ghost" size="icon" onClick={reset}><X/></Button>
            </div>
          </div>
        )}
        
        <div className="space-y-4">
          <div className="grid grid-cols-3 gap-2">
            <div className="col-span-2 space-y-2">
              <Label htmlFor="target-size">Target Size</Label>
              <Input
                id="target-size"
                type="number"
                value={targetSize}
                onChange={(e) => setTargetSize(Number(e.target.value))}
                className="w-full"
                min="1"
                disabled={isCompressing}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="unit">Unit</Label>
              <Select value={targetUnit} onValueChange={(value) => setTargetUnit(value as 'KB' | 'MB')}>
                <SelectTrigger id="unit">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="KB">KB</SelectItem>
                  <SelectItem value="MB">MB</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="flex gap-4">
            <Button onClick={handleCompress} disabled={!originalFile || isCompressing} className="w-full">
              {isCompressing ? 'Compressing...' : 'Compress Image'}
            </Button>
            <Button onClick={handleDownload} disabled={!compressedPreview} className="w-full" variant="outline">
              <Download className="mr-2 h-4 w-4" />
              Download Compressed Image
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
