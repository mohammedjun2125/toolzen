import type { Metadata } from 'next';
import QrCodeGenerator from '@/components/tools/qr-code-generator';

export const metadata: Metadata = {
  title: 'QR Code Generator',
  description: 'Generate QR codes from text or URLs in real-time. Customize and download your QR code for free. Fast, simple, and client-side.',
};

export default function QrCodeGeneratorPage() {
  return <QrCodeGenerator />;
}
