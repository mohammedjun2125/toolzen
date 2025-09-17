import type { Metadata } from 'next';
import JsonFormatter from '@/components/tools/json-formatter';

export const metadata: Metadata = {
  title: 'JSON Formatter',
  description: 'Format, validate, and beautify your JSON data. Makes reading and debugging JSON easier.',
};

export default function JsonFormatterPage() {
  return <JsonFormatter />;
}
