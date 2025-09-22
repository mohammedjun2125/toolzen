
'use client';

import { useState, useRef, useCallback, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/hooks/use-toast';
import { Upload, Download, X, Loader2, FileType, ShieldCheck, Zap } from 'lucide-react';
import type jsPDF from 'jspdf';
import Image from 'next/image';

type PDFMakerProps = {
  jsPDF: typeof jsPDF;
};

function PDFMakerClient({ jsPDF }: PDFMakerProps) {
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
            const ratio = img.width / img.height;
            
            let imgWidth = pdfWidth - 20;
            let imgHeight = imgWidth / ratio;

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
  }, [files, toast, jsPDF]);

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
          <CardTitle className="text-2xl">PDF Maker from Images</CardTitle>
          <CardDescription>Convert your JPG and PNG images into a single PDF file, securely in your browser.</CardDescription>
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

      <div className="prose dark:prose-invert max-w-none mx-auto mt-12">
        <h2 className="text-2xl font-bold">Your Private, High-Speed PDF Converter</h2>
        <p>In a digital world, compiling images into a single, professional document is a common need. Whether you're a student submitting a project, a freelancer creating a portfolio, or an administrator archiving receipts, a reliable PDF Maker is essential. Our tool is designed to be the simplest, fastest, and most secure way to convert your images into a universally compatible PDF file.</p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-8">
            <div className="bg-card/60 backdrop-blur-lg p-6 rounded-lg">
                <ShieldCheck className="h-8 w-8 text-primary mb-2" />
                <h3 className="font-semibold text-lg">100% Private and Secure</h3>
                <p className="text-sm text-muted-foreground">Unlike other online tools, our PDF Maker works entirely on your device. Your images are never uploaded to our servers, meaning your data remains completely private. This is the most secure way to handle sensitive documents.</p>
            </div>
            <div className="bg-card/60 backdrop-blur-lg p-6 rounded-lg">
                <Zap className="h-8 w-8 text-primary mb-2" />
                <h3 className="font-semibold text-lg">Lightning-Fast Conversion</h3>
                <p className="text-sm text-muted-foreground">Because all processing happens in your browser, there's no waiting for uploads or downloads. The conversion is nearly instantaneous, limited only by your computer's speed. Convert dozens of high-resolution images in seconds.</p>
            </div>
            <div className="bg-card/60 backdrop-blur-lg p-6 rounded-lg">
                <FileType className="h-8 w-8 text-primary mb-2" />
                <h3 className="font-semibold text-lg">Simple and User-Friendly</h3>
                <p className="text-sm text-muted-foreground">We've designed our tool to be incredibly easy to use. Just drag and drop your JPG or PNG files, arrange them in the order you want, and click "Generate." No complicated settings or confusing options.</p>
            </div>
        </div>

        <h3>How It Works: Step-by-Step</h3>
        <ol>
          <li><strong>Select Your Images:</strong> Click the upload area or drag and drop your JPG and PNG files. You can select multiple images at once.</li>
          <li><strong>Arrange Your Files:</strong> If needed, you can reorder the images to ensure they appear correctly in the final PDF. (Note: Reordering feature coming soon!).</li>
          <li><strong>Generate Your PDF:</strong> Click the "Generate PDF" button. The tool will instantly process the images.</li>
          <li><strong>Download and Share:</strong> Your new PDF file will be automatically downloaded to your device, ready to be shared, printed, or archived.</li>
        </ol>
        <p>Our PDF Maker from Images is the perfect solution for anyone who values speed, simplicity, and privacy. Give it a try and see how easy it is to manage your documents without compromise.</p>
      </div>
    </>
  );
}

export default function PdfMaker() {
    const [jsPDF, setJsPDF] = useState<typeof jsPDF | null>(null);

    useEffect(() => {
        import('jspdf').then(module => {
            setJsPDF(() => module.default);
        });
    }, []);

    if (!jsPDF) {
        return (
            <Card className="w-full shadow-lg rounded-lg flex items-center justify-center h-96 bg-card/60 backdrop-blur-lg">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </Card>
        );
    }

    return <PDFMakerClient jsPDF={jsPDF} />;
}
