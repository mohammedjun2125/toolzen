import type { Metadata } from 'next';
import CaseConverter from '@/components/tools/case-converter';

export const metadata: Metadata = {
  title: 'Case Converter',
  description: 'Instantly convert text between different case formats, including sentence case, lowercase, UPPERCASE, and Title Case. Free and easy to use.',
};

export default function CaseConverterPage() {
  return <CaseConverter />;
}
