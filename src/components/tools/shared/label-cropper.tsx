
'use client';

import { useState, useRef, ChangeEvent } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { Upload, X, Loader2, Download, File as FileIcon } from 'lucide-react';
import { PDFDocument } from 'pdf-lib';
import { saveAs } from 'file-saver';
import { Progress } from '@/components/ui/progress';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';

type CropPreset = {
  name: string;
  dimensions: {
    x: number;
    y: number;
    width: number;
    height: number;
  };
  // A4 size is 595 x 842 pts
};

type LabelCropperProps = {
  platformName: string;
  croppingInstructions: string;
  cropPresets: CropPreset[];
  defaultPresetIndex?: number;
};

export default function LabelCropper({ platformName, croppingInstructions, cropPresets, defaultPresetIndex = 0 }: LabelCropperProps) {
  const [file, setFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [selectedPreset, setSelectedPreset] = useState(cropPresets[defaultPresetIndex].name);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      if (selectedFile.type !== 'application/pdf') {
        toast({ variant: 'destructive', title: 'Invalid File Type', description: 'Only PDF files are accepted.' });
        return;
      }
      setFile(selectedFile);
    }
  };

  const handleCropAndDownload = async () => {
    if (!file) {
      toast({ variant: 'destructive', title: 'No File Selected', description: 'Please upload a PDF file to crop.' });
      return;
    }

    setIsProcessing(true);
    setProgress(0);
    toast({ title: `Processing ${platformName} Label...`, description: 'This may take a moment for large files.' });

    try {
      const arrayBuffer = await file.arrayBuffer();
      const pdfDoc = await PDFDocument.load(arrayBuffer, { ignoreEncryption: true });
      const croppedPdf = await PDFDocument.create();
      const preset = cropPresets.find(p => p.name === selectedPreset);

      if (!preset) {
        throw new Error("Selected crop preset not found.");
      }
      
      const { x, y, width, height } = preset.dimensions;

      for (let i = 0; i < pdfDoc.getPageCount(); i++) {
        const page = pdfDoc.getPage(i);
        const [copiedPage] = await croppedPdf.copyPages(pdfDoc, [i]);
        
        // Set the crop box. The origin (0,0) is the bottom-left corner.
        copiedPage.setCropBox(x, page.getHeight() - y - height, width, height);

        croppedPdf.addPage(copiedPage);
        setProgress(Math.round(((i + 1) / pdfDoc.getPageCount()) * 100));
      }

      const pdfBytes = await croppedPdf.save();
      saveAs(new Blob([pdfBytes], { type: 'application/pdf' }), `cropped-${platformName.toLowerCase().replace(/ /g, '-')}-${file.name}`);
      toast({ title: 'Success!', description: `Your ${platformName} labels have been cropped and downloaded.` });
    } catch (error: any) {
      console.error(error);
      toast({ variant: 'destructive', title: 'Failed to Crop PDF', description: error.message || 'An error occurred. The PDF might be encrypted or corrupted.' });
    } finally {
      setIsProcessing(false);
    }
  };

  const resetState = () => {
    setFile(null);
    setIsProcessing(false);
    setProgress(0);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  return (
    <Card className="w-full shadow-lg rounded-lg bg-card/60 backdrop-blur-lg">
      <CardHeader>
        <CardTitle className="text-2xl">{platformName} Label Cropper</CardTitle>
        <CardDescription>{croppingInstructions}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {!file ? (
          <div
            className="border-2 border-dashed border-border rounded-lg p-12 flex flex-col items-center justify-center text-center cursor-pointer hover:border-primary transition-colors"
            onClick={() => fileInputRef.current?.click()}
          >
            <Upload className="h-12 w-12 text-muted-foreground" />
            <p className="mt-4 text-muted-foreground">Click to upload or drag & drop the PDF label sheet</p>
            <Input
              ref={fileInputRef}
              type="file"
              className="hidden"
              accept="application/pdf"
              onChange={handleFileChange}
            />
          </div>
        ) : (
          <div className="space-y-4">
            <div className="border rounded-lg p-4 flex items-center justify-between gap-4 bg-muted/20">
              <div className="flex items-center gap-4 truncate">
                <FileIcon className="h-6 w-6 text-primary" />
                <p className="text-sm truncate font-medium">{file.name}</p>
              </div>
              <Button onClick={resetState} variant="ghost" size="icon">
                <X className="h-4 w-4" />
              </Button>
            </div>

            <div className="space-y-2">
              <Label htmlFor="crop-preset">Label Format</Label>
              <Select value={selectedPreset} onValueChange={setSelectedPreset}>
                <SelectTrigger id="crop-preset">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {cropPresets.map(preset => (
                    <SelectItem key={preset.name} value={preset.name}>{preset.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {isProcessing && <Progress value={progress} className="w-full" />}

            <Button onClick={handleCropAndDownload} disabled={isProcessing} className="w-full text-lg py-6">
              {isProcessing ? (
                <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Cropping...</>
              ) : (
                <><Download className="mr-2 h-4 w-4" /> Crop & Download</>
              )}
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
