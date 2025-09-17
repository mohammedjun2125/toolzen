import type { Metadata } from 'next';
import ColorPaletteExtractor from '@/components/tools/color-palette-extractor';

export const metadata: Metadata = {
  title: 'Color Palette Extractor',
  description: 'Extract a color palette of 5-8 colors from any uploaded image. Get HEX codes and copy them with a single click. Free and client-side.',
};

export default function ColorPaletteExtractorPage() {
  return <ColorPaletteExtractor />;
}
