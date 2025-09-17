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

export type ToolCategory = "Text & Data" | "Image & Media" | "Calculators" | "Generators";

export type Tool = {
  id: string;
  name: string;
  description: string;
  href: string;
  icon: LucideIcon;
  category: ToolCategory;
};

export const tools: Tool[] = [
  {
    id: 'image-compressor',
    name: 'Image Compressor',
    description: 'Compress JPG, PNG, WEBP, and GIF images to a target size.',
    href: '/tools/image-compressor',
    icon: Image,
    category: 'Image & Media',
  },
  {
    id: 'pdf-maker',
    name: 'PDF Maker',
    description: 'Convert multiple images into a single PDF document.',
    href: '/tools/pdf-maker',
    icon: FileText,
    category: 'Image & Media',
  },
  {
    id: 'text-to-speech',
    name: 'Text to Speech',
    description: 'Convert text to speech with various voice controls.',
    href: '/tools/text-to-speech',
    icon: Mic,
    category: 'Text & Data',
  },
  {
    id: 'color-palette-extractor',
    name: 'Color Palette Extractor',
    description: 'Extract a color palette from an uploaded image.',
    href: '/tools/color-palette-extractor',
    icon: Palette,
    category: 'Image & Media',
  },
  {
    id: 'unit-converter',
    name: 'Unit Converter',
    description: 'Convert between various units of measurement.',
    href: '/tools/unit-converter',
    icon: Ruler,
    category: 'Calculators',
  },
  {
    id: 'qr-code-generator',
    name: 'QR Code Generator',
    description: 'Generate QR codes from text or URLs in real-time.',
    href: '/tools/qr-code-generator',
    icon: QrCode,
    category: 'Generators',
  },
  {
    id: 'word-counter',
    name: 'Word Counter',
    description: 'Count words, characters, sentences, and paragraphs.',
    href: '/tools/word-counter',
    icon: Sigma,
    category: 'Text & Data',
  },
  {
    id: 'case-converter',
    name: 'Case Converter',
    description: 'Convert text to different case formats instantly.',
    href: '/tools/case-converter',
    icon: CaseSensitive,
    category: 'Text & Data',
  },
  {
    id: 'url-encoder-decoder',
    name: 'URL Encoder / Decoder',
    description: 'Encode or decode URLs and strings.',
    href: '/tools/url-encoder-decoder',
    icon: Link,
    category: 'Text & Data',
  },
  {
    id: 'age-calculator',
    name: 'Age Calculator',
    description: 'Calculate age from date of birth.',
    href: '/tools/age-calculator',
    icon: Calendar,
    category: 'Calculators',
  },
  {
    id: 'bmi-calculator',
    name: 'BMI Calculator',
    description: 'Calculate your Body Mass Index (BMI).',
    href: '/tools/bmi-calculator',
    icon: Calculator,
    category: 'Calculators',
  },
  {
    id: 'password-generator',
    name: 'Password Generator',
    description: 'Generate secure, random passwords with customizable options.',
    href: '/tools/password-generator',
    icon: Lock,
    category: 'Generators',
  },
  {
    id: 'markdown-preview',
    name: 'Markdown Preview',
    description: 'Write and preview Markdown in a live side-by-side editor.',
    href: '/tools/markdown-preview',
    icon: FileCode,
    category: 'Text & Data',
  },
  {
    id: 'json-formatter',
    name: 'JSON Formatter',
    description: 'Format, validate, and beautify your JSON data.',
    href: '/tools/json-formatter',
    icon: Braces,
    category: 'Text & Data',
  },
  {
    id: 'hash-generator',
    name: 'Hash Generator',
    description: 'Generate MD5, SHA-1, SHA-256, and SHA-512 hashes from text.',
    href: '/tools/hash-generator',
    icon: Hash,
    category: 'Generators',
  },
  {
    id: 'base64-encoder-decoder',
    name: 'Base64 Encoder/Decoder',
    description: 'Encode and decode data in Base64 format.',
    href: '/tools/base64-encoder-decoder',
    icon: Binary,
    category: 'Text & Data',
  },
  {
    id: 'lorem-ipsum-generator',
    name: 'Lorem Ipsum Generator',
    description: 'Generate placeholder text with customizable options.',
    href: '/tools/lorem-ipsum-generator',
    icon: BookType,
    category: 'Generators',
  },
  {
    id: 'timezone-converter',
    name: 'Time Zone Converter',
    description: 'Convert times between different global time zones.',
    href: '/tools/timezone-converter',
    icon: Clock,
    category: 'Calculators',
  },
];

export const toolMap = new Map(tools.map(tool => [tool.id, tool]));

export const categories: ToolCategory[] = Array.from(new Set(tools.map(tool => tool.category)));
