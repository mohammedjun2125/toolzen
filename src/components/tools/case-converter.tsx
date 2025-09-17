'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Copy, Trash2 } from 'lucide-react';

export default function CaseConverter() {
  const [text, setText] = useState('');
  const { toast } = useToast();
  
  const toSentenceCase = () => {
    setText(text.toLowerCase().replace(/(^\s*\w|[.!?]\s+\w)/g, (c) => c.toUpperCase()));
  };

  const toLowerCase = () => {
    setText(text.toLowerCase());
  };

  const toUpperCase = () => {
    setText(text.toUpperCase());
  };

  const toTitleCase = () => {
    setText(text.toLowerCase().split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' '));
  };
  
  const copyToClipboard = () => {
    if (text) {
        navigator.clipboard.writeText(text);
        toast({ title: 'Text copied to clipboard!' });
    } else {
        toast({ variant: 'destructive', title: 'Nothing to copy!' });
    }
  };

  const clearText = () => {
    setText('');
  };

  return (
    <Card className="w-full shadow-lg rounded-lg">
      <CardHeader>
        <CardTitle className="text-2xl">Case Converter</CardTitle>
        <CardDescription>Easily convert text between different case formats.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <Textarea
          placeholder="Type or paste your text here..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          rows={8}
        />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
          <Button onClick={toSentenceCase}>Sentence case</Button>
          <Button onClick={toLowerCase}>lowercase</Button>
          <Button onClick={toUpperCase}>UPPERCASE</Button>
          <Button onClick={toTitleCase}>Title Case</Button>
        </div>
        <div className="flex gap-2">
            <Button onClick={copyToClipboard} variant="outline" className="w-full">
                <Copy className="mr-2 h-4 w-4" /> Copy
            </Button>
            <Button onClick={clearText} variant="destructive" className="w-full">
                <Trash2 className="mr-2 h-4 w-4" /> Clear
            </Button>
        </div>
      </CardContent>
    </Card>
  );
}
