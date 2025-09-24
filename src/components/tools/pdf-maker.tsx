
'use client';

import { useState, useRef, useCallback, ChangeEvent } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/hooks/use-toast';
import { Upload, Download, X, Loader2, FileType, ShieldCheck, Zap } from 'lucide-react';
import { PDFDocument, rgb } from 'pdf-lib';
import { saveAs } from 'file-saver';
import Image from 'next/image';
import Link from 'next/link';

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

  const handleGeneratePdf = useCallback(async () => {
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

    const pdfDoc = await PDFDocument.create();
    
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const arrayBuffer = await file.arrayBuffer();
      
      let image;
      if(file.type === 'image/png') {
          image = await pdfDoc.embedPng(arrayBuffer);
      } else {
          image = await pdfDoc.embedJpg(arrayBuffer);
      }
      
      const page = pdfDoc.addPage();
      const { width, height } = page.getSize();
      const { width: imgWidth, height: imgHeight } = image.scaleToFit(width - 50, height - 50);

      page.drawImage(image, {
        x: width / 2 - imgWidth / 2,
        y: height / 2 - imgHeight / 2,
        width: imgWidth,
        height: imgHeight,
      });

      setProgress(Math.round(((i + 1) / files.length) * 100));
    }

    const pdfBytes = await pdfDoc.save();
    saveAs(new Blob([pdfBytes], { type: 'application/pdf' }), 'toolzen-document.pdf');
    setIsGenerating(false);
    toast({ title: 'PDF generated successfully!', variant: 'default' });
  }, [files, toast]);

  const removeFile = (indexToRemove: number) => {
    setFiles(prev => prev.filter((_, index) => index !== indexToRemove));
  };

  const reset = () => {
    setFiles([]);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <>
      <Card className="w-full shadow-lg rounded-lg bg-card/60 backdrop-blur-lg">
        <CardHeader>
          <CardTitle className="text-2xl">Free Image to PDF Converter Online</CardTitle>
          <CardDescription>Convert your JPG and PNG images into a single, high-quality PDF file. Fast, free, and completely private.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div
            className="border-2 border-dashed border-border rounded-lg p-12 flex flex-col items-center justify-center text-center cursor-pointer hover:border-primary transition-colors"
            onClick={() => fileInputRef.current?.click()}
          >
            <Upload className="h-12 w-12 text-muted-foreground" alt="Upload JPG or PNG files" />
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
                      alt={`preview of image to be converted to PDF ${index + 1}`}
                      fill
                      sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, 20vw"
                      className="rounded-md object-cover"
                    />
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <Button variant="destructive" size="icon" onClick={() => removeFile(index)}>
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
              <Button onClick={reset} variant="outline" className="w-full">Clear All</Button>
            </div>
          )}

          {isGenerating && <Progress value={progress} className="w-full" />}

          <Button onClick={handleGeneratePdf} disabled={files.length === 0 || isGenerating} className="w-full text-lg py-6">
            {isGenerating ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Generating PDF...</> : (
              <>
                <Download className="mr-2 h-4 w-4" />
                Convert to PDF Now
              </>
            )}
          </Button>
        </CardContent>
      </Card>

      <article className="prose dark:prose-invert max-w-none mx-auto mt-12">
        <h2 className="text-2xl font-bold">Your Ultimate JPG to PDF Converter</h2>
        <p>In a digital world, compiling images into a single, professional document is a common need. Whether you're a student submitting a project, a freelancer creating a portfolio, or an administrator archiving receipts, an efficient **image to PDF converter** is essential. Our tool is designed to be the simplest, fastest, and most secure way to convert your JPG and PNG images into a universally compatible PDF file, for free and without any software installation.</p>
        
        <h3>Features & Benefits of Our Free PDF Maker</h3>
        <ul>
            <li><strong>High-Quality Conversion:</strong> Retain the original quality of your JPG and PNG images in the final PDF document.</li>
            <li><strong>Batch Processing:</strong> Convert multiple images to PDF at once. Simply upload all your files and let our tool combine them.</li>
            <li><strong>100% Private and Secure:</strong> As a **client-side PDF tool**, your images are never uploaded to our servers. The entire conversion process happens in your browser, guaranteeing your data remains confidential.</li>
            <li><strong>Incredibly Fast:</strong> No waiting for uploads or server queues. Our **fast PDF converter** processes your images instantly.</li>
            <li><strong>No Signup Required:</strong> Use our **free PDF utility** without any registration or email requirements. It's hassle-free.</li>
        </ul>

        <h2 className="text-2xl font-bold">How to Convert Images to PDF Online</h2>
        <ol>
          <li><strong>Step 1: Upload Your Images:</strong> Click the upload area or drag and drop your JPG and PNG files. You can select multiple images to create a multi-page PDF.</li>
          <li><strong>Step 2: Arrange Your Files:</strong> If needed, you can reorder the images to ensure they appear correctly in the final PDF. (Note: Reordering feature coming soon!).</li>
          <li><strong>Step 3: Generate Your PDF:</strong> Click the "Convert to PDF Now" button. Our browser-based tool will instantly process the images.</li>
          <li><strong>Step 4: Download Your PDF Instantly:</strong> Your new PDF file will be automatically downloaded to your device, ready to be shared, printed, or archived.</li>
        </ol>

        <h3>Common Use Cases</h3>
        <ul>
            <li>**Academic:** Combine photos of your homework or project notes into a single file for submission.</li>
            <li>**Business:** Create a PDF portfolio of your design work or compile scanned receipts for an expense report.</li>
            <li>**Personal:** Archive old photos or create a shareable PDF album for family and friends.</li>
        </ul>

        <h2>Frequently Asked Questions (FAQs)</h2>
        <h3>How to convert PNG images to PDF in seconds?</h3>
        <p>Our tool makes it simple. Just upload your PNG files, and click "Convert to PDF Now". The conversion from PNG to PDF is instant and happens right in your browser, making it one of the fastest free online tools available.</p>
        <h3>Is it safe to convert JPG to PDF online?</h3>
        <p>Yes, with our tool it is 100% safe. We prioritize your privacy by processing all files on your device. Your images are never sent to a server, unlike many other online converters. This makes us one of the most secure **free PDF tools** online.</p>
        <h3>Can I create a PDF from images without software?</h3>
        <p>Absolutely. Our **image to PDF converter** works entirely online in your web browser. There's no need to download or install any software, making it a convenient and space-saving solution.</p>

        <div className="not-prose mt-8">
            <h3 className="text-xl font-semibold">Explore Other PDF Tools</h3>
            <p>Need more than just conversion? Toolzen offers a full suite of free PDF utilities:</p>
            <ul className="list-disc list-inside">
                <li><Link href="/tools/pdf-merger" className="text-primary hover:underline">Merge PDF Files</Link> - Combine multiple PDFs into one document.</li>
                <li><Link href="/tools/pdf-splitter" className="text-primary hover:underline">Split a PDF</Link> - Extract pages from any PDF.</li>
                <li><Link href="/tools/pdf-rotator" className="text-primary hover:underline">Rotate PDF Pages</Link> - Fix the orientation of your pages.</li>
            </ul>
        </div>

      </article>
    </>
  );
}

    