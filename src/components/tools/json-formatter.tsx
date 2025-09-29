
'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Copy, Trash2, Check, X } from 'lucide-react';
import Link from 'next/link';
import { seoKeywords } from '@/lib/seo-keywords';

export default function JsonFormatter() {
  const [jsonInput, setJsonInput] = useState('');
  const [isValid, setIsValid] = useState<boolean | null>(null);
  const { toast } = useToast();
  const toolKeywords = (seoKeywords.tools as any)['json-formatter'];

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
    <>
    <Card className="w-full shadow-lg rounded-lg bg-card/60 backdrop-blur-lg">
      <CardHeader>
        <CardTitle className="text-2xl">{toolKeywords.title_keywords.join(' & ')}</CardTitle>
        <CardDescription>Paste your JSON data to {toolKeywords.meta_keywords.join(', ')}. This free online JSON viewer and linter works securely in your browser to make debugging easy.</CardDescription>
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
            <Button onClick={handleFormat} className="md:col-span-1">Format/Validate JSON</Button>
            <Button onClick={copyToClipboard} variant="outline">
                <Copy className="mr-2 h-4 w-4" /> Copy
            </Button>
            <Button onClick={clearText} variant="destructive">
                <Trash2 className="mr-2 h-4 w-4" /> Clear
            </Button>
        </div>
      </CardContent>
    </Card>
    <article className="prose dark:prose-invert max-w-none mx-auto mt-12">
        <h2 className="text-2xl font-bold">What is a JSON Formatter?</h2>
        <p>A **JSON Formatter** (also known as a **JSON Beautifier** or **JSON Prettifier**) is an essential developer tool that takes messy, unformatted JSON data and transforms it into a clean, indented, human-readable format. For developers working with APIs, configuration files, or any form of structured data, a good formatter is an indispensable utility. It makes debugging easier and understanding complex data structures much faster.</p>
        
        <h3>Why This Tool is Also a Powerful JSON Validator</h3>
        <p>When you click "Format JSON," our tool doesn't just add spaces and line breaks. It first tries to parse the JSON string according to the official JSON specification. This process acts as a **JSON Validator** (or **JSON Linter**). If the parsing fails, it means your JSON is invalid. The tool will immediately alert you to the error, helping you find and fix common issues such as:</p>
        <ul>
            <li>Missing commas between key-value pairs.</li>
            <li>Trailing commas after the last element in an array or object.</li>
            <li>Using single quotes instead of double quotes for keys and string values.</li>
            <li>Unescaped characters within strings.</li>
        </ul>

        <h2 className="text-2xl font-bold">How to Use the JSON Formatter and Validator</h2>
        <ol>
            <li><strong>Paste Your JSON:</strong> Copy your JSON data and paste it into the text area of our **online JSON viewer**.</li>
            <li><strong>Click Format:</strong> Press the "Format/Validate JSON" button.</li>
            <li><strong>Review the Output:</strong> If your JSON is valid, it will be instantly beautified. A green checkmark will appear. If it's invalid, you will receive an error message pointing you to the problem, and a red 'X' will appear.</li>
            <li><strong>Copy or Clear:</strong> Once formatted, you can easily copy the clean JSON to your clipboard or clear the editor to start over.</li>
        </ol>
        
        <h3>Secure and Private by Design</h3>
        <p>Many online JSON formatters require you to paste your data, which is then sent to a server for processing. This can be a security risk if your JSON contains sensitive information like API keys, personal data, or authentication tokens. Our tool is 100% client-side. All formatting and validation happen directly in your browser. Your data is never uploaded, guaranteeing its privacy and making it a truly secure **JSON online editor**.</p>
    </article>
    </>
  );
}
