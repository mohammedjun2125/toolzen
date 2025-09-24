
'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Copy, Trash2, Mail } from 'lucide-react';
import { Label } from '../ui/label';

export default function EmailExtractor() {
  const [inputText, setInputText] = useState('');
  const [extractedEmails, setExtractedEmails] = useState<string[]>([]);
  const { toast } = useToast();

  const handleExtractEmails = () => {
    const emailRegex = /([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+)/gi;
    const matches = inputText.match(emailRegex);
    const uniqueEmails = matches ? Array.from(new Set(matches)) : [];
    setExtractedEmails(uniqueEmails);
    toast({ title: `Extracted ${uniqueEmails.length} unique emails.` });
  };

  const copyToClipboard = () => {
    if (extractedEmails.length > 0) {
      navigator.clipboard.writeText(extractedEmails.join('\n'));
      toast({ title: 'Emails copied to clipboard!' });
    }
  };

  const clearAll = () => {
    setInputText('');
    setExtractedEmails([]);
  };

  return (
    <Card className="w-full shadow-lg rounded-lg bg-card/60 backdrop-blur-lg">
      <CardHeader>
        <CardTitle className="text-2xl">Email Extractor</CardTitle>
        <CardDescription>Extract all email addresses from a block of text.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
            <Label htmlFor="input-text">Input Text</Label>
            <Textarea
                id="input-text"
                placeholder="Paste your text containing email addresses here..."
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                rows={8}
            />
        </div>

        <Button onClick={handleExtractEmails} className="w-full">
            <Mail className="mr-2 h-4 w-4" /> Extract Emails
        </Button>
        
        <div className="space-y-2">
            <div className="flex justify-between items-center">
                <Label htmlFor="output-text">Extracted Emails ({extractedEmails.length})</Label>
                <Button onClick={copyToClipboard} variant="ghost" size="sm" disabled={!extractedEmails.length}>
                    <Copy className="mr-2 h-4 w-4" /> Copy
                </Button>
            </div>
            <Textarea
                id="output-text"
                readOnly
                value={extractedEmails.join('\n')}
                placeholder="Extracted emails will appear here..."
                rows={8}
            />
        </div>
        <Button onClick={clearAll} variant="destructive" className="w-full">
            <Trash2 className="mr-2 h-4 w-4" /> Clear All
        </Button>
      </CardContent>
    </Card>
  );
}
