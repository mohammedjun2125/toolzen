import type { Metadata } from 'next';
import BmiCalculator from '@/components/tools/bmi-calculator';

export const metadata: Metadata = {
  title: 'BMI Calculator',
  description: 'Calculate your Body Mass Index (BMI) using metric or imperial units. Understand your BMI category and get a quick assessment of your weight status.',
};

export default function BmiCalculatorPage() {
  return <BmiCalculator />;
}
