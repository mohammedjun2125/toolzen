
import type { LucideIcon } from 'lucide-react';
import {
  Image as ImageIcon, FileText, Mic, Palette, Ruler, QrCode, Sigma, CaseSensitive, Link as LinkIcon,
  Calendar, Calculator, Lock, FileCode, Braces, Hash, Binary, BookType, Clock, Crop, Percent, Landmark,
  Barcode, Sparkles, Merge, RotateCw, Trash2, Split, Shield, SquarePen, FileScan, FileKey2, Beaker,
  FileCog, Paintbrush, Bot, Sun, Wand, Rows, Columns, Animation, MousePointer, UtilityPole, Webhook,
  NotepadText, CheckCheck, KeyRound, Globe, Component, FileType as GifIcon, Palette as ColorPaletteIcon
} from 'lucide-react';

export type ToolCategoryInfo = {
  id: 'image-media' | 'pdf' | 'text-data' | 'calculators' | 'generators' | 'css' | 'utilities';
  name: string;
  description_short: string;
  icon: LucideIcon;
};

export type Tool = {
  id: string;
  name: string;
  description: string;
  href: string;
  icon: LucideIcon;
  category: ToolCategoryInfo;
};

const categoryInfo: { [key: string]: Omit<ToolCategoryInfo, 'id'> } = {
  'image-media': { name: 'Image & Media Tools', description_short: 'Compress, resize, convert, and edit images and other media formats.', icon: ImageIcon },
  'pdf': { name: 'PDF Tools', description_short: 'Create, merge, split, and edit PDF documents securely in your browser.', icon: FileText },
  'text-data': { name: 'Text & Data Tools', description_short: 'Format, convert, and analyze text and data for any project.', icon: NotepadText },
  'calculators': { name: 'Calculators', description_short: 'A suite of calculators for finance, health, and everyday math.', icon: Calculator },
  'generators': { name: 'Generators', description_short: 'Generate passwords, QR codes, dummy data, and more.', icon: Sparkles },
  'css': { name: 'CSS Tools', description_short: 'Create gradients, shadows, and other CSS effects with visual tools.', icon: Paintbrush },
  'utilities': { name: 'Web Utilities', description_short: 'Handy developer utilities for DNS, IP, and SSL lookups.', icon: UtilityPole },
};

export const categories: ToolCategoryInfo[] = Object.entries(categoryInfo).map(([id, info]) => ({
  id: id as ToolCategoryInfo['id'],
  ...info
}));

const categoryMap = new Map(categories.map(c => [c.id, c]));

export const tools: Tool[] = [
  // Image & Media (Ordered by popularity)
  { id: 'image-compressor', name: 'Image Compressor', description: 'Reduce JPG, PNG & WEBP file sizes without losing quality.', href: '/tools/image-compressor', icon: ImageIcon, category: categoryMap.get('image-media')! },
  { id: 'image-resizer', name: 'Image Resizer', description: 'Resize images to specific dimensions online.', href: '/tools/image-resizer', icon: Crop, category: categoryMap.get('image-media')! },
  { id: 'image-converter', name: 'Image Converter', description: 'Convert images between formats like JPG, PNG, and WEBP.', href: '/tools/image-converter', icon: Component, category: categoryMap.get('image-media')! },
  { id: 'background-remover', name: 'AI Background Remover', description: 'Remove the background from any image with a single click.', href: '/tools/background-remover', icon: Bot, category: categoryMap.get('image-media')! },
  { id: 'color-palette-extractor', name: 'Color Palette Extractor', description: 'Extract a color palette from an uploaded image.', href: '/tools/color-palette-extractor', icon: ColorPaletteIcon, category: categoryMap.get('image-media')! },
  { id: 'image-to-pdf', name: 'Image to PDF', description: 'Convert JPG and PNG images into a single PDF file.', href: '/tools/pdf-maker', icon: FileScan, category: categoryMap.get('image-media')! },
  { id: 'gif-maker', name: 'GIF Maker', description: 'Create animated GIFs from a sequence of images.', href: '/tools/gif-maker', icon: GifIcon, category: categoryMap.get('image-media')! },

  // PDF Tools (Ordered by popularity)
  { id: 'pdf-maker', name: 'PDF Maker', description: 'Convert images (JPG, PNG) into a single PDF document.', href: '/tools/pdf-maker', icon: FileText, category: categoryMap.get('pdf')! },
  { id: 'pdf-merger', name: 'Merge PDF', description: 'Combine multiple PDF documents into one single file.', href: '/tools/pdf-merger', icon: Merge, category: categoryMap.get('pdf')! },
  { id: 'pdf-splitter', name: 'Split PDF', description: 'Extract specific pages from a PDF into a new document.', href: '/tools/pdf-splitter', icon: Split, category: categoryMap.get('pdf')! },
  { id: 'pdf-deleter', name: 'Delete PDF Pages', description: 'Remove one or more pages from a PDF document.', href: '/tools/pdf-deleter', icon: Trash2, category: categoryMap.get('pdf')! },
  { id: 'add-watermark', name: 'Watermark PDF', description: 'Add a text watermark to your PDF files.', href: '/tools/add-watermark', icon: SquarePen, category: categoryMap.get('pdf')! },
  { id: 'pdf-rotator', name: 'Rotate PDF', description: 'Rotate pages in a PDF document individually.', href: '/tools/pdf-rotator', icon: RotateCw, category: categoryMap.get('pdf')! },
  { id: 'pdf-compressor', name: 'PDF Compressor', description: 'Reduce the file size of your PDF documents.', href: '/tools/pdf-compressor', icon: ImageIcon, category: categoryMap.get('pdf')! },
  { id: 'pdf-to-word', name: 'PDF to Word', description: 'Convert PDF files to editable Word documents.', href: '/tools/pdf-to-word-converter', icon: FileKey2, category: categoryMap.get('pdf')! },
  { id: 'pdf-to-text', name: 'PDF to Text Extractor', description: 'Extract all text content from a PDF file.', href: '/tools/pdf-to-text', icon: FileCog, category: categoryMap.get('pdf')! },
  
  // Text & Data Tools (Ordered by popularity)
  { id: 'word-counter', name: 'Word Counter', description: 'Count words, characters, sentences, and paragraphs.', href: '/tools/word-counter', icon: Sigma, category: categoryMap.get('text-data')! },
  { id: 'json-formatter', name: 'JSON Formatter', description: 'Format and validate your JSON data for readability.', href: '/tools/json-formatter', icon: Braces, category: categoryMap.get('text-data')! },
  { id: 'case-converter', name: 'Case Converter', description: 'Convert text to various case formats.', href: '/tools/case-converter', icon: CaseSensitive, category: categoryMap.get('text-data')! },
  { id: 'text-to-speech', name: 'Text to Speech', description: 'Convert text into natural-sounding speech.', href: '/tools/text-to-speech', icon: Mic, category: categoryMap.get('text-data')! },
  { id: 'remove-duplicate-lines', name: 'Remove Duplicate Lines', description: 'Delete duplicate lines from a list or text block.', href: '/tools/remove-duplicate-lines', icon: Rows, category: categoryMap.get('text-data')! },
  { id: 'url-encoder-decoder', name: 'URL Encoder/Decoder', description: 'Encode or decode strings for URL-safe usage.', href: '/tools/url-encoder-decoder', icon: LinkIcon, category: categoryMap.get('text-data')! },
  { id: 'base64-encoder-decoder', name: 'Base64 Encoder/Decoder', description: 'Encode or decode data in Base64 format.', href: '/tools/base64-encoder-decoder', icon: Binary, category: categoryMap.get('text-data')! },
  { id: 'markdown-preview', name: 'Markdown Preview', description: 'Write and preview Markdown in a live editor.', href: '/tools/markdown-preview', icon: FileCode, category: categoryMap.get('text-data')! },
  { id: 'email-extractor', name: 'Email Extractor', description: 'Extract all email addresses from a block of text.', href: '/tools/email-extractor', icon: Webhook, category: categoryMap.get('text-data')! },
  { id: 'text-reverser', name: 'Text Reverser', description: 'Reverse any text string instantly.', href: '/tools/text-reverser', icon: RotateCw, category: categoryMap.get('text-data')! },

  // Calculators (Ordered by popularity)
  { id: 'percentage-calculator', name: 'Percentage Calculator', description: 'Calculate percentages, increases, and ratios.', href: '/tools/percentage-calculator', icon: Percent, category: categoryMap.get('calculators')! },
  { id: 'loan-emi-calculator', name: 'Loan/EMI Calculator', description: 'Calculate your Equated Monthly Installment for loans.', href: '/tools/loan-emi-calculator', icon: Landmark, category: categoryMap.get('calculators')! },
  { id: 'age-calculator', name: 'Age Calculator', description: 'Calculate age in years, months, and days.', href: '/tools/age-calculator', icon: Calendar, category: categoryMap.get('calculators')! },
  { id: 'unit-converter', name: 'Unit Converter', description: 'Convert units of length, weight, temperature, etc.', href: '/tools/unit-converter', icon: Ruler, category: categoryMap.get('calculators')! },
  { id: 'bmi-calculator', name: 'BMI Calculator', description: 'Calculate your Body Mass Index (BMI).', href: '/tools/bmi-calculator', icon: Calculator, category: categoryMap.get('calculators')! },
  { id: 'date-difference-calculator', name: 'Date Difference Calculator', description: 'Calculate the duration between two dates.', href: '/tools/date-difference-calculator', icon: Calendar, category: categoryMap.get('calculators')! },
  { id: 'discount-calculator', name: 'Discount Calculator', description: 'Calculate the final price after a discount.', href: '/tools/discount-calculator', icon: Percent, category: categoryMap.get('calculators')! },
  { id: 'currency-converter', name: 'Currency Converter', description: 'Convert between different world currencies.', href: '/tools/currency-converter', icon: Landmark, category: categoryMap.get('calculators')! },

  // Generators (Ordered by popularity)
  { id: 'password-generator', name: 'Password Generator', description: 'Generate secure, random passwords.', href: '/tools/password-generator', icon: Lock, category: categoryMap.get('generators')! },
  { id: 'qr-code-generator', name: 'QR Code Generator', description: 'Generate QR codes from text, URLs, or contact info.', href: '/tools/qr-code-generator', icon: QrCode, category: categoryMap.get('generators')! },
  { id: 'lorem-ipsum-generator', name: 'Lorem Ipsum Generator', description: 'Generate placeholder dummy text for your designs.', href: '/tools/lorem-ipsum-generator', icon: BookType, category: categoryMap.get('generators')! },
  { id: 'hash-generator', name: 'Hash Generator', description: 'Generate MD5, SHA-1, SHA-256 hashes from text.', href: '/tools/hash-generator', icon: Hash, category: categoryMap.get('generators')! },
  { id: 'barcode-generator', name: 'Barcode Generator', description: 'Create various types of barcodes like Code128, EAN, UPC.', href: '/tools/barcode-generator', icon: Barcode, category: categoryMap.get('generators')! },
  { id: 'random-number-generator', name: 'Random Number Generator', description: 'Generate random numbers within a specified range.', href: '/tools/random-number-generator', icon: Wand, category: categoryMap.get('generators')! },
  { id: 'username-generator', name: 'Username Generator', description: 'Create unique and cool usernames.', href: '/tools/username-generator', icon: KeyRound, category: categoryMap.get('generators')! },
  { id: 'meme-generator', name: 'Meme Generator', description: 'Create your own memes with custom text and images.', href: '/tools/meme-generator', icon: Bot, category: categoryMap.get('generators')! },
  { id: 'domain-generator', name: 'Domain Generator', description: 'Generate available domain name ideas.', href: '/tools/domain-generator', icon: Globe, category: categoryMap.get('generators')! },
  { id: 'otp-generator', name: 'OTP Generator', description: 'Generate Time-based One-Time Passwords (TOTP).', href: '/tools/otp-generator', icon: Shield, category: categoryMap.get('generators')! },

  // CSS Tools
  { id: 'gradient-generator', name: 'Gradient Generator', description: 'Create beautiful CSS gradients visually.', href: '/tools/gradient-generator', icon: Sun, category: categoryMap.get('css')! },
  { id: 'box-shadow-generator', name: 'Box Shadow Generator', description: 'Design complex box shadows with a visual editor.', href: '/tools/box-shadow-generator', icon: SquarePen, category: categoryMap.get('css')! },
  { id: 'border-radius-generator', name: 'Border Radius Generator', description: 'Create custom border radii for your elements.', href: '/tools/border-radius-generator', icon: Component, category: categoryMap.get('css')! },
  { id: 'text-shadow-generator', name: 'Text Shadow Generator', description: 'Design layered text shadows with ease.', href: '/tools/text-shadow-generator', icon: CaseSensitive, category: categoryMap.get('css')! },
  { id: 'flexbox-playground', name: 'Flexbox Playground', description: 'Learn and experiment with CSS Flexbox.', href: '/tools/flexbox-playground', icon: Columns, category: categoryMap.get('css')! },
  { id: 'grid-generator', name: 'Grid Generator', description: 'Visually create complex CSS Grid layouts.', href: '/tools/grid-generator', icon: Rows, category: categoryMap.get('css')! },
  { id: 'animation-generator', name: 'Animation Generator', description: 'Create and customize CSS animations.', href: '/tools/animation-generator', icon: Animation, category: categoryMap.get('css')! },

  // Utilities
  { id: 'world-clock', name: 'World Clock', description: 'Check the current time in cities around the world.', href: '/tools/timezone-converter', icon: Globe, category: categoryMap.get('utilities')! },
  { id: 'stopwatch', name: 'Stopwatch', description: 'A simple online stopwatch to time anything.', href: '/tools/stopwatch', icon: Clock, category: categoryMap.get('utilities')! },
  { id: 'timer', name: 'Timer', description: 'Set a countdown timer for any task.', href: '/tools/timer', icon: Clock, category: categoryMap.get('utilities')! },
  { id: 'notes-tool', name: 'Notes Tool', description: 'A simple, private notepad in your browser.', href: '/tools/notes-tool', icon: NotepadText, category: categoryMap.get('utilities')! },
  { id: 'whois-lookup', name: 'Whois Lookup', description: 'Get registration information for any domain name.', href: '/tools/whois-lookup', icon: KeyRound, category: categoryMap.get('utilities')! },
  { id: 'dns-lookup', name: 'DNS Lookup', description: 'Look up DNS records for any domain.', href: '/tools/dns-lookup', icon: Webhook, category: categoryMap.get('utilities')! },
  { id: 'ip-lookup', name: 'IP Lookup', description: 'Find geolocation and other details for an IP address.', href: '/tools/ip-lookup', icon: MousePointer, category: categoryMap.get('utilities')! },
  { id: 'ssl-checker', name: 'SSL Checker', description: 'Check the SSL certificate details of any website.', href: '/tools/ssl-checker', icon: Shield, category: categoryMap.get('utilities')! },
];

export const toolMap = new Map(tools.map(tool => [tool.id, tool]));
