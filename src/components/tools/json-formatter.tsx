'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Copy, Trash2, Check, X } from 'lucide-react';

export default function JsonFormatter() {
  const [jsonInput, setJsonInput] = useState('');
  const [isValid, setIsValid] = useState<boolean | null>(null);
  const { toast } = useToast();

  const handleFormat = () => {
    if (!jsonInput.trim()) {
      setIsValid(null);
      return;
    }
    try {
      const parsed = JSON.parse(jsonInput);
      setJsonInput(JSON.stringify(parsed, null, 2));
      setIsValid(true);
      toast({ title: 'JSON formatted successfully!' });
    } catch (error) {
      setIsValid(false);
      toast({ variant: 'destructive', title: 'Invalid JSON', description: (error as Error).message });
    }
  };
  
  const copyToClipboard = () => {
    if (jsonInput) {
        navigator.clipboard.writeText(jsonInput);
        toast({ title: 'JSON copied to clipboard!' });
    } else {
        toast({ variant: 'destructive', title: 'Nothing to copy!' });
    }
  };

  const clearText = () => {
    setJsonInput('');
    setIsValid(null);
  };
  
  const getBorderColor = () => {
      if (isValid === true) return 'border-green-500';
      if (isValid === false) return 'border-red-500';
      return '';
  }

  return (
    <Card className="w-full shadow-lg rounded-lg">
      <CardHeader>
        <CardTitle className="text-2xl">JSON Formatter & Validator</CardTitle>
        <CardDescription>Paste your JSON data to format and validate it.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="relative">
            <Textarea
            placeholder='Paste your JSON here...'
            value={jsonInput}
            onChange={(e) => {
                setJsonInput(e.target.value);
                setIsValid(null);
            }}
            rows={15}
            className={`resize-y ${getBorderColor()}`}
            />
            {isValid === true && <Check className="absolute top-3 right-3 text-green-500" />}
            {isValid === false && <X className="absolute top-3 right-3 text-red-500" />}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
            <Button onClick={handleFormat} className="md:col-span-1">Format JSON</Button>
            <Button onClick={copyToClipboard} variant="outline">
                <Copy className="mr-2 h-4 w-4" /> Copy
            </Button>
            <Button onClick={clearText} variant="destructive">
                <Trash2 className="mr-2 h-4 w-4" /> Clear
            </Button>
        </div>
      </CardContent>
    </Card>
  );
}
