import type { Metadata } from 'next';
import UrlEncoderDecoder from '@/components/tools/url-encoder-decoder';

export const metadata: Metadata = {
  title: 'URL Encoder / Decoder',
  description: 'Easily encode and decode URLs and strings. This tool helps in converting strings to a URL-safe format and back.',
};

export default function UrlEncoderDecoderPage() {
  return <UrlEncoderDecoder />;
}
