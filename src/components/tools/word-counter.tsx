
'use client';

import { useState, useMemo } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import Link from 'next/link';

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
        <CardTitle className="text-2xl">Free Online Word Counter & Text Analysis Tool</CardTitle>
        <CardDescription>Get instant statistics for your text. This **free word counter tool** also calculates characters, sentences, and paragraphs in real-time, all securely in your browser.</CardDescription>
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
        <h2 className="text-2xl font-bold">The Essential Writing & SEO Companion Tool</h2>
        <p>Whether you're an author drafting a novel, a student writing an essay against a strict word limit, or an SEO professional crafting meta descriptions, word count matters. A reliable **online word count tool** is indispensable for ensuring your content meets specific requirements and is optimized for its intended platform. Our free word counter gives you more than just a word count—it provides a comprehensive **text analysis tool** in real-time.</p>
        
        <h3>Why Use an Online Word Counter?</h3>
        <ul>
            <li><strong>Meet Requirements:</strong> Many platforms have strict limits, from Twitter's character count to academic essay length requirements. A **character counter** and **word counter** helps you stay within these boundaries.</li>
            <li><strong>Improve Readability:</strong> By analyzing sentence and paragraph counts, you can identify overly long sentences or dense blocks of text that might be difficult for readers to digest, thereby improving user engagement.</li>
            <li><strong>SEO Optimization:</strong> While there's no magic number, content length is a known ranking factor. This tool helps you ensure your articles and blog posts have sufficient depth to be considered authoritative.</li>
            <li>**Speed and Convenience:** It's faster than opening a heavy word processor. Simply paste your text and get instant stats without any friction.</li>
        </ul>

        <h2 className="text-2xl font-bold">What Our Word Count Tool Measures</h2>
        <ul>
            <li><strong>Words:</strong> The total number of words in your text, perfect for essays and articles.</li>
            <li><strong>Characters:</strong> The total number of characters, including spaces, crucial for social media posts, meta titles, and descriptions.</li>
            <li><strong>Sentences:</strong> The number of sentences, helping you gauge the complexity and pacing of your writing.</li>
            <li><strong>Paragraphs:</strong> The number of paragraphs, which is useful for structuring scannable web content.</li>
        </ul>
        
        <h3>Secure and Private by Design</h3>
        <p>Your writing is your intellectual property. Many online tools might store or analyze what you paste. Our word counter is a 100% client-side tool. Your text is processed in your browser and is never sent to our servers, guaranteeing your privacy. This makes it a safe tool for professional writers, students, and businesses.</p>
    </article>
    </>
  );
}

    