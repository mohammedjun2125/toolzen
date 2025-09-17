import type { Metadata } from 'next';
import PasswordGenerator from '@/components/tools/password-generator';

export const metadata: Metadata = {
  title: 'Password Generator',
  description: 'Generate secure, random passwords with customizable options including length, numbers, symbols, and case.',
};

export default function PasswordGeneratorPage() {
  return <PasswordGenerator />;
}
