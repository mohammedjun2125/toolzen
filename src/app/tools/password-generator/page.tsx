import type { Metadata } from 'next';
import { PasswordGenerator } from '@/components/tools/password-generator';

export const metadata: Metadata = {
  title: 'Secure Password Generator',
  description: 'Generate strong, secure, and random passwords with customizable length and character types. Includes numbers, symbols, and uppercase letters.',
};

export default function PasswordGeneratorPage() {
  return <PasswordGenerator />;
}
