import type { Metadata } from 'next';
import MarkdownPreview from '@/components/tools/markdown-preview';

export const metadata: Metadata = {
  title: 'Markdown Preview',
  description: 'Write and preview Markdown in a live side-by-side editor. See your rendered HTML output instantly.',
};

export default function MarkdownPreviewPage() {
  return <MarkdownPreview />;
}
