import type { Metadata } from 'next';
import ImageCompressor from '@/components/tools/image-compressor';

export const metadata: Metadata = {
  title: 'Image Compressor',
  description: 'Compress JPG, PNG, WEBP, and GIF images client-side by specifying a target size. Fast, free, and privacy-focused.',
};

export default function ImageCompressorPage() {
  return <ImageCompressor />;
}
