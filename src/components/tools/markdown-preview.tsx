
'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { marked } from 'marked';

export default function MarkdownPreview() {
  const [markdown, setMarkdown] = useState(`# Hello, Markdown!

This is a **live** preview of your markdown content.

- Lists are easy
- Just like this

1. Ordered lists too
2. Very simple

> Blockquotes are great for quoting people.

You can also have \`inline code\` and code blocks:

\`\`\`javascript
function greet() {
  console.log("Hello, World!");
}
\`\`\`
`);

  const parsedMarkdown = marked(markdown);

  return (
    <Card className="w-full shadow-lg rounded-lg bg-card/60 backdrop-blur-lg">
      <CardHeader>
        <CardTitle className="text-2xl">Markdown Preview</CardTitle>
        <CardDescription>Write Markdown on the left and see the rendered HTML on the right.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 h-[60vh]">
          <Textarea
            placeholder="Type your markdown here..."
            value={markdown}
            onChange={(e) => setMarkdown(e.target.value)}
            className="h-full resize-none text-base"
          />
          <div
            className="prose dark:prose-invert bg-muted/50 rounded-lg p-4 overflow-auto h-full"
            dangerouslySetInnerHTML={{ __html: parsedMarkdown as string}}
          >
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
