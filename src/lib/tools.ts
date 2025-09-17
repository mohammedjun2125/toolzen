import type { LucideIcon } from 'lucide-react';
import {
  Image,
  FileText,
  Mic,
  Palette,
  Ruler,
  QrCode,
  Sigma,
  CaseSensitive,
  Link,
  Calendar,
  Calculator,
  Lock,
  FileCode,
  Braces,
  Hash,
  Binary,
  BookType,
  Clock,
} from 'lucide-react';

export type Tool = {
  id: string;
  name: string;
  description: string;
  href: string;
  icon: LucideIcon;
};

export const tools: Tool[] = [
  {
    id: 'image-compressor',
    name: 'Image Compressor',
    description: 'Compress JPG, PNG, WEBP, and GIF images to a target size.',
    href: '/tools/image-compressor',
    icon: Image,
  },
  {
    id: 'pdf-maker',
    name: 'PDF Maker',
    description: 'Convert multiple images into a single PDF document.',
    href: '/tools/pdf-maker',
    icon: FileText,
  },
  {
    id: 'text-to-speech',
    name: 'Text to Speech',
    description: 'Convert text to speech with various voice controls.',
    href: '/tools/text-to-speech',
    icon: Mic,
  },
  {
    id: 'color-palette-extractor',
    name: 'Color Palette Extractor',
    description: 'Extract a color palette from an uploaded image.',
    href: '/tools/color-palette-extractor',
    icon: Palette,
  },
  {
    id: 'unit-converter',
    name: 'Unit Converter',
    description: 'Convert between various units of measurement.',
    href: '/tools/unit-converter',
    icon: Ruler,
  },
  {
    id: 'qr-code-generator',
    name: 'QR Code Generator',
    description: 'Generate QR codes from text or URLs in real-time.',
    href: '/tools/qr-code-generator',
    icon: QrCode,
  },
  {
    id: 'word-counter',
    name: 'Word Counter',
    description: 'Count words, characters, sentences, and paragraphs.',
    href: '/tools/word-counter',
    icon: Sigma,
  },
  {
    id: 'case-converter',
    name: 'Case Converter',
    description: 'Convert text to different case formats instantly.',
    href: '/tools/case-converter',
    icon: CaseSensitive,
  },
  {
    id: 'url-encoder-decoder',
    name: 'URL Encoder / Decoder',
    description: 'Encode or decode URLs and strings.',
    href: '/tools/url-encoder-decoder',
    icon: Link,
  },
  {
    id: 'age-calculator',
    name: 'Age Calculator',
    description: 'Calculate age from date of birth.',
    href: '/tools/age-calculator',
    icon: Calendar,
  },
  {
    id: 'bmi-calculator',
    name: 'BMI Calculator',
    description: 'Calculate your Body Mass Index (BMI).',
    href: '/tools/bmi-calculator',
    icon: Calculator,
  },
  {
    id: 'password-generator',
    name: 'Password Generator',
    description: 'Generate secure, random passwords with customizable options.',
    href: '/tools/password-generator',
    icon: Lock,
  },
  {
    id: 'markdown-preview',
    name: 'Markdown Preview',
    description: 'Write and preview Markdown in a live side-by-side editor.',
    href: '/tools/markdown-preview',
    icon: FileCode,
  },
  {
    id: 'json-formatter',
    name: 'JSON Formatter',
    description: 'Format, validate, and beautify your JSON data.',
    href: '/tools/json-formatter',
    icon: Braces,
  },
  {
    id: 'hash-generator',
    name: 'Hash Generator',
    description: 'Generate MD5, SHA-1, SHA-256, and SHA-512 hashes from text.',
    href: '/tools/hash-generator',
    icon: Hash,
  },
  {
    id: 'base64-encoder-decoder',
    name: 'Base64 Encoder/Decoder',
    description: 'Encode and decode data in Base64 format.',
    href: '/tools/base64-encoder-decoder',
    icon: Binary,
  },
  {
    id: 'lorem-ipsum-generator',
    name: 'Lorem Ipsum Generator',
    description: 'Generate placeholder text with customizable options.',
    href: '/tools/lorem-ipsum-generator',
    icon: BookType,
  },
  {
    id: 'timezone-converter',
    name: 'Time Zone Converter',
    description: 'Convert times between different global time zones.',
    href: '/tools/timezone-converter',
    icon: Clock,
  },
];

export const toolMap = new Map(tools.map(tool => [tool.id, tool]));
