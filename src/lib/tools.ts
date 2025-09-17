import type { LucideIcon } from 'lucide-react';
import {
  Image,
  FileText,
  Mic,
  Palette,
  Scissors,
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
} from 'lucide-react';

export type Tool = {
  name: string;
  description: string;
  href: string;
  icon: LucideIcon;
};

export const tools: Tool[] = [
  {
    name: 'Image Compressor',
    description: 'Compress JPG, PNG, WEBP, and GIF images to a target size.',
    href: '/tools/image-compressor',
    icon: Image,
  },
  {
    name: 'PDF Maker',
    description: 'Convert multiple images into a single PDF document.',
    href: '/tools/pdf-maker',
    icon: FileText,
  },
  {
    name: 'Text to Speech',
    description: 'Convert text to speech with various voice controls.',
    href: '/tools/text-to-speech',
    icon: Mic,
  },
  {
    name: 'Color Palette Extractor',
    description: 'Extract a color palette from an uploaded image.',
    href: '/tools/color-palette-extractor',
    icon: Palette,
  },
  {
    name: 'E-commerce Label Cropper',
    description: 'Automatically crop e-commerce shipping labels.',
    href: '/tools/e-commerce-label-cropper',
    icon: Scissors,
  },
  {
    name: 'Unit Converter',
    description: 'Convert between various units of measurement.',
    href: '/tools/unit-converter',
    icon: Ruler,
  },
  {
    name: 'QR Code Generator',
    description: 'Generate QR codes from text or URLs in real-time.',
    href: '/tools/qr-code-generator',
    icon: QrCode,
  },
  {
    name: 'Word Counter',
    description: 'Count words, characters, sentences, and paragraphs.',
    href: '/tools/word-counter',
    icon: Sigma,
  },
  {
    name: 'Case Converter',
    description: 'Convert text to different case formats instantly.',
    href: '/tools/case-converter',
    icon: CaseSensitive,
  },
  {
    name: 'URL Encoder / Decoder',
    description: 'Encode or decode URLs and strings.',
    href: '/tools/url-encoder-decoder',
    icon: Link,
  },
  {
    name: 'Age Calculator',
    description: 'Calculate age from date of birth.',
    href: '/tools/age-calculator',
    icon: Calendar,
  },
  {
    name: 'BMI Calculator',
    description: 'Calculate your Body Mass Index (BMI).',
    href: '/tools/bmi-calculator',
    icon: Calculator,
  },
  {
    name: 'Password Generator',
    description: 'Generate secure, random passwords with customizable options.',
    href: '/tools/password-generator',
    icon: Lock,
  },
  {
    name: 'Markdown Preview',
    description: 'Write and preview Markdown in a live side-by-side editor.',
    href: '/tools/markdown-preview',
    icon: FileCode,
  },
  {
    name: 'JSON Formatter',
    description: 'Format, validate, and beautify your JSON data.',
    href: '/tools/json-formatter',
    icon: Braces,
  },
];
