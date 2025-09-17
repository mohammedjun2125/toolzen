import type { Metadata } from 'next';
import LabelCropper from '@/components/tools/e-commerce-label-cropper';

export const metadata: Metadata = {
  title: 'E-commerce Label Cropper',
  description: 'Automatically crop e-commerce shipping labels from images or PDFs. Our AI tool removes unnecessary parts for a clean, ready-to-use label.',
};

export default function LabelCropperPage() {
  return <LabelCropper />;
}
