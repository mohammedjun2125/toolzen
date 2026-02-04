

'use client';

import { useState, useMemo } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import Link from 'next/link';
import { seoKeywords } from '@/lib/seo-keywords';
import { Button } from '../ui/button';

function StatCard({ title, value }: { title: string, value: number }) {
    return (
        <div className="bg-muted/50 p-4 rounded-lg text-center">
            <p className="text-sm text-muted-foreground">{title}</p>
            <p className="text-2xl font-bold">{value}</p>
        </div>
    );
}

export default function WordCounter() {
  const [text, setText] = useState('');
  const toolKeywords = (seoKeywords.tools as any)['word-counter'];

  const stats = useMemo(() => {
    const trimmedText = text.trim();
    if (trimmedText === '') {
        return { words: 0, characters: 0, sentences: 0, paragraphs: 0 };
    }
    const words = trimmedText.split(/\s+/).filter(Boolean).length;
    const characters = text.length;
    const sentences = trimmedText.match(/[^.!?]+[.!?]+/g)?.length || 0;
    const paragraphs = trimmedText.split(/\n+/).filter(p => p.trim() !== '').length;

    return { words, characters, sentences, paragraphs };
  }, [text]);

  return (
    <>
    <Card className="w-full shadow-lg rounded-lg bg-card/60 backdrop-blur-lg">
      <CardHeader>
        <CardTitle className="text-2xl">{toolKeywords.title_keywords.join(' - ')}</CardTitle>
        <CardDescription>Get instant statistics for your text. This **{toolKeywords.meta_keywords.join(', ')}** calculates characters, sentences, and paragraphs in real-time, all securely in your browser.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <Textarea
          placeholder="Start typing or paste your text here to count words and characters..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          rows={10}
          className="resize-y"
        />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <StatCard title="Words" value={stats.words} />
          <StatCard title="Characters" value={stats.characters} />
          <StatCard title="Sentences" value={stats.sentences} />
          <StatCard title="Paragraphs" value={stats.paragraphs} />
        </div>
      </CardContent>
    </Card>
    <article className="prose dark:prose-invert max-w-none mx-auto mt-12">
        <h2 className="text-2xl font-bold">What is the Word Counter?</h2>
        <p>The Word Counter is an essential online tool for writers, students, marketers, and anyone who works with text. It provides a real-time analysis of your content, instantly calculating not just the number of words, but also characters, sentences, and paragraphs. Whether you're drafting an essay, composing a tweet, or writing a blog post, this tool helps you meet specific length requirements and improve your writing's structure, all securely within your browser.</p>

        <h3 className="text-xl font-bold">How to Use the Word Counter</h3>
        <ol>
            <li><strong>Start Typing or Paste Text:</strong> Simply begin typing directly into the text area, or paste your existing content from another source.</li>
            <li><strong>View Real-Time Stats:</strong> As you type, the counters for words, characters, sentences, and paragraphs will update instantly. There's no need to click a "submit" button.</li>
            <li><strong>Analyze Your Content:</strong> Use the statistics to refine your writing. Shorten long sentences, break up dense paragraphs, or trim your text to meet character limits.</li>
        </ol>

        <h3 className="text-xl font-bold">Key Features</h3>
        <ul>
            <li><strong>Comprehensive Analysis:</strong> Counts words, characters, sentences, and paragraphs.</li>
            <li><strong>Real-Time Updates:</strong> All statistics update instantly as you type.</li>
            <li><strong>Privacy-Focused:</strong> 100% client-side tool. Your text is never sent to our servers.</li>
            <li><strong>No Limits:</strong> Analyze documents of any size, from a short sentence to a full-length novel.</li>
            <li><strong>Simple & Fast:</strong> A clean, distraction-free interface that loads quickly and is easy to use.</li>
        </ul>

        <h3 className="text-xl font-bold">Common Use Cases</h3>
        <ul>
            <li><strong>Academic Writing:</strong> Ensure your essays, research papers, and dissertations meet the required word count.</li>
            <li><strong>SEO & Content Marketing:</strong> Write blog posts and articles that meet optimal length for search engine ranking. Craft meta titles and descriptions that fit within character limits.</li>
            <li><strong>Social Media Management:</strong> Compose posts for platforms like X (Twitter) and LinkedIn that adhere to their specific character constraints.</li>
            <li><strong>Professional Writing:</strong> Check the length and structure of reports, emails, and presentations to ensure they are concise and effective.</li>
        </ul>
        
        <div className="not-prose mt-8">
            <h3 className="text-xl font-semibold">Related Text & Data Tools</h3>
            <p>Enhance your writing and data processing with our other free utilities:</p>
            <div className="flex gap-2 flex-wrap">
                <Button asChild variant="outline"><Link href="/tools/case-converter">Case Converter</Link></Button>
                <Button asChild variant="outline"><Link href="/tools/remove-duplicate-lines">Remove Duplicate Lines</Link></Button>
                <Button asChild variant="outline"><Link href="/tools/text-to-speech">Text to Speech</Link></Button>
            </div>
        </div>
    </article>
    </>
  );
}
