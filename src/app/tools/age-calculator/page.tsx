import type { Metadata } from 'next';
import AgeCalculator from '@/components/tools/age-calculator';

export const metadata: Metadata = {
  title: 'Age Calculator',
  description: 'Calculate your exact age in years, months, and days from your date of birth. A simple, fast, and free online tool.',
};

export default function AgeCalculatorPage() {
  return <AgeCalculator />;
}
