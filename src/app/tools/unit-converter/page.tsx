import type { Metadata } from 'next';
import UnitConverter from '@/components/tools/unit-converter';

export const metadata: Metadata = {
  title: 'Unit Converter',
  description: 'A comprehensive and real-time unit converter for length, weight, and temperature. Convert between various metric and imperial units instantly.',
};

export default function UnitConverterPage() {
  return <UnitConverter />;
}
