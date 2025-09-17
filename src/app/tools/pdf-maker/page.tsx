import type { Metadata } from 'next';
import PdfMaker from '@/components/tools/pdf-maker';

export const metadata: Metadata = {
  title: 'PDF Maker',
  description: 'Convert multiple JPG and PNG images into a single, downloadable PDF document. Client-side, free, and fast.',
};

export default function PdfMakerPage() {
  return <PdfMaker />;
}
