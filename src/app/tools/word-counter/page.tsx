import type { Metadata } from 'next';
import WordCounter from '@/components/tools/word-counter';

export const metadata: Metadata = {
  title: 'Word Counter',
  description: 'Count words, characters, sentences, and paragraphs in your text in real-time. A simple and free tool for writers, students, and professionals.',
};

export default function WordCounterPage() {
  return <WordCounter />;
}
