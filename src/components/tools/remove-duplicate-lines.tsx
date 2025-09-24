
'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Copy, Trash2, Rows } from 'lucide-react';

export default function RemoveDuplicateLines() {
  const [text, setText] = useState('');
  const { toast } = useToast();

  const handleRemoveDuplicates = () => {
    const lines = text.split('\n');
    const uniqueLines = Array.from(new Set(lines));
    setText(uniqueLines.join('\n'));
    toast({ title: 'Duplicate lines removed!' });
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
    <Card className="w-full shadow-lg rounded-lg bg-card/60 backdrop-blur-lg">
      <CardHeader>
        <CardTitle className="text-2xl">Remove Duplicate Lines</CardTitle>
        <CardDescription>Paste your text to quickly remove all duplicate lines.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Textarea
          placeholder="Paste your list or text here..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          rows={12}
        />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
          <Button onClick={handleRemoveDuplicates}>
            <Rows className="mr-2 h-4 w-4" /> Remove Duplicates
          </Button>
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
