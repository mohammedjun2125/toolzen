'use client';

import { useState, useRef } from 'react';
import { useFlow } from '@genkit-ai/next/client';
import { autoCropEcommerceLabel } from '@/ai/flows/auto-crop-ecommerce-label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { Upload, Scissors, Download, Loader2, FileImage } from 'lucide-react';

export default function LabelCropper() {
  const [originalFile, setOriginalFile] = useState<File | null>(null);
  const [originalPreview, setOriginalPreview] = useState<string | null>(null);
  const [croppedPreview, setCroppedPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const [cropLabel, isCropping] = useFlow(autoCropEcommerceLabel, {
    onSuccess: (result) => {
      setCroppedPreview(result.croppedLabelDataUri);
      toast({ title: 'Label cropped successfully!' });
    },
    onError: (err) => {
      toast({
        variant: 'destructive',
        title: 'Cropping failed',
        description: err?.message || 'An unknown error occurred.',
      });
    },
  });

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setOriginalFile(file);
      setCroppedPreview(null);
      const reader = new FileReader();
      reader.onloadend = () => {
        setOriginalPreview(reader.result as string);
        cropLabel({ labelDataUri: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDownload = () => {
    if (croppedPreview) {
      const link = document.createElement('a');
      link.href = croppedPreview;
      const extension = croppedPreview.split(';')[0].split('/')[1];
      link.download = `cropped-label.${extension}`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  return (
    <Card className="w-full shadow-lg rounded-lg">
      <CardHeader>
        <CardTitle className="text-2xl">E-commerce Label Cropper</CardTitle>
        <CardDescription>Our AI will automatically crop your shipping label.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div
          className="border-2 border-dashed border-border rounded-lg p-12 flex flex-col items-center justify-center text-center cursor-pointer hover:border-primary transition-colors"
          onClick={() => fileInputRef.current?.click()}
        >
          <Upload className="h-12 w-12 text-muted-foreground" />
          <p className="mt-4 text-muted-foreground">Click to upload a label</p>
          <p className="text-sm text-muted-foreground">Image or PDF</p>
          <Input
            ref={fileInputRef}
            type="file"
            className="hidden"
            accept="image/*,application/pdf"
            onChange={handleFileChange}
          />
        </div>

        {originalFile && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
            <div>
              <h3 className="font-semibold mb-2 text-center">Original</h3>
              {originalFile.type.startsWith('image/') ? (
                <img src={originalPreview!} alt="Original label" className="rounded-lg" />
              ) : (
                <div className="rounded-lg bg-muted p-4 text-center">PDF Preview not available</div>
              )}
            </div>
            <div>
              <h3 className="font-semibold mb-2 text-center">Cropped</h3>
              <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
                {isCropping ? (
                  <Loader2 className="h-12 w-12 text-primary animate-spin" />
                ) : croppedPreview ? (
                  <img src={croppedPreview} alt="Cropped label" className="rounded-lg" />
                ) : (
                  <FileImage className="h-12 w-12 text-muted-foreground" />
                )}
              </div>
            </div>
          </div>
        )}
        
        <div className="flex gap-4">
            <Button onClick={() => fileInputRef.current?.click()} variant="outline" className="w-full">
              <Upload className="mr-2 h-4 w-4" />
              Upload New
            </Button>
            <Button onClick={handleDownload} disabled={!croppedPreview || isCropping} className="w-full">
              <Download className="mr-2 h-4 w-4" />
              Download Cropped
            </Button>
        </div>
      </CardContent>
    </Card>
  );
}
