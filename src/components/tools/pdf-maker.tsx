'use client';

import { useState, useRef } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/hooks/use-toast';
import { Upload, Download, FileImage, X, Loader2 } from 'lucide-react';
import jsPDF from 'jspdf';
import Image from 'next/image';

export default function PdfMaker() {
  const [files, setFiles] = useState<File[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [progress, setProgress] = useState(0);
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const newFiles = Array.from(event.target.files).filter(file =>
        ['image/jpeg', 'image/png'].includes(file.type)
      );
      if (newFiles.length !== event.target.files.length) {
        toast({
            variant: 'destructive',
            title: 'Unsupported file type',
            description: 'Only JPG and PNG images are supported.',
        });
      }
      setFiles(prev => [...prev, ...newFiles]);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  const handleGeneratePdf = async () => {
    if (files.length === 0) {
      toast({
        variant: 'destructive',
        title: 'No files selected',
        description: 'Please select at least one image file.',
      });
      return;
    }

    setIsGenerating(true);
    setProgress(0);
    toast({ title: 'Generating PDF...', description: 'This may take a moment.' });
    
    const pdf = new jsPDF();
    
    for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const reader = new FileReader();
        
        await new Promise<void>(resolve => {
            reader.onload = (e) => {
                const img = document.createElement('img');
                img.src = e.target?.result as string;
                img.onload = () => {
                    const pdfWidth = pdf.internal.pageSize.getWidth();
                    const pdfHeight = pdf.internal.pageSize.getHeight();
                    let ratio = img.width / img.height;
                    let imgWidth = img.width;
                    let imgHeight = img.height;
                    
                    if (imgWidth > pdfWidth - 20) {
                        imgWidth = pdfWidth - 20;
                        imgHeight = imgWidth / ratio;
                    }
                    if (imgHeight > pdfHeight - 20) {
                        imgHeight = pdfHeight - 20;
                        imgWidth = imgHeight * ratio;
                    }
                    
                    if (i > 0) {
                        pdf.addPage();
                    }
                    const x = (pdfWidth - imgWidth) / 2;
                    const y = (pdfHeight - imgHeight) / 2;
                    pdf.addImage(img.src, file.type.split('/')[1].toUpperCase(), x, y, imgWidth, imgHeight);
                    setProgress(Math.round(((i + 1) / files.length) * 100));
                    resolve();
                };
            };
            reader.readAsDataURL(file);
        });
    }

    pdf.save('toolzen-document.pdf');
    setIsGenerating(false);
    toast({ title: 'PDF generated successfully!', variant: 'default' });
  };
  
  const removeFile = (indexToRemove: number) => {
    setFiles(prev => prev.filter((_, index) => index !== indexToRemove));
  }
  
  const reset = () => {
    setFiles([]);
    if (fileInputRef.current) {
        fileInputRef.current.value = "";
    }
  }

  return (
    <Card className="w-full shadow-lg rounded-lg bg-card/60 backdrop-blur-lg">
      <CardHeader>
        <CardTitle className="text-2xl">PDF Maker</CardTitle>
        <CardDescription>Convert your JPG and PNG images into a single PDF file.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div
          className="border-2 border-dashed border-border rounded-lg p-12 flex flex-col items-center justify-center text-center cursor-pointer hover:border-primary transition-colors"
          onClick={() => fileInputRef.current?.click()}
        >
          <Upload className="h-12 w-12 text-muted-foreground" />
          <p className="mt-4 text-muted-foreground">Click to upload or drag and drop images</p>
          <p className="text-sm text-muted-foreground">JPG, PNG supported</p>
          <Input
            ref={fileInputRef}
            type="file"
            multiple
            className="hidden"
            accept="image/jpeg,image/png"
            onChange={handleFileChange}
          />
        </div>

        {files.length > 0 && (
          <div className="space-y-4">
            <h3 className="font-semibold">Selected Images ({files.length})</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {files.map((file, index) => (
                <div key={index} className="relative group aspect-square">
                  <Image
                    src={URL.createObjectURL(file)}
                    alt={`preview ${index}`}
                    fill
                    style={{ objectFit: "cover" }}
                    className="rounded-md"
                  />
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <Button variant="destructive" size="icon" onClick={() => removeFile(index)}>
                          <X className="w-4 h-4"/>
                      </Button>
                  </div>
                </div>
              ))}
            </div>
            <Button onClick={reset} variant="outline" className="w-full">Clear All</Button>
          </div>
        )}

        {isGenerating && <Progress value={progress} className="w-full"/>}

        <Button onClick={handleGeneratePdf} disabled={files.length === 0 || isGenerating} className="w-full">
          {isGenerating ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Generating...</> : (
            <>
              <Download className="mr-2 h-4 w-4" />
              Generate PDF
            </>
          )}
        </Button>
      </CardContent>
    </Card>
  );
}