
import type { LucideIcon } from 'lucide-react';
import {
  Image as ImageIcon, FileText, Mic, Palette, Ruler, QrCode, Sigma, CaseSensitive, Link as LinkIcon,
  Calendar, Calculator, Lock, FileCode, Braces, Hash, Binary, BookType, Clock, Crop, Percent, Landmark,
  Barcode, Sparkles, Merge, RotateCw, Trash2, Split, Shield, SquarePen, FileScan, FileKey2, Beaker,
  FileCog, Paintbrush, Bot, Sun, Wand, Rows, Columns, MousePointer, UtilityPole, Webhook,
  NotepadText, CheckCheck, KeyRound, Globe, Component, FileType as GifIcon
} from 'lucide-react';

export type ToolCategoryInfo = {
  id: 'image-media' | 'pdf' | 'text-data' | 'calculators' | 'generators' | 'css' | 'utilities';
  name: string;
  description_short: string;
  icon: string;
};

export type Tool = {
  id: string;
  name: string;
  description: string;
  href: string;
  icon: string;
  category: ToolCategoryInfo;
};

const categoryInfo: { [key: string]: Omit<ToolCategoryInfo, 'id'> } = {
  'image-media': { name: 'Image & Media Tools', description_short: 'Free tools to compress, resize, convert, and edit images online. Optimize your media for web and social media securely and instantly.', icon: 'image' },
  'pdf': { name: 'PDF Tools', description_short: 'A full suite of free online PDF tools. Merge, split, compress, rotate, and edit PDF documents securely in your browser.', icon: 'file-text' },
  'text-data': { name: 'Text & Data Tools', description_short: 'Format, convert, and analyze text and data. Includes word counters, JSON formatters, and case converters.', icon: 'notepad-text' },
  'calculators': { name: 'Online Calculators', description_short: 'A suite of free calculators for finance, health, and mathematics, from loan EMIs to percentage calculations.', icon: 'calculator' },
  'generators': { name: 'Generators', description_short: 'Generate secure passwords, QR codes, dummy text (Lorem Ipsum), barcodes, and more with our free online tools.', icon: 'sparkles' },
  'css': { name: 'CSS Tools for Developers', description_short: 'Visually create gradients, box shadows, and complex layouts like Flexbox and Grid, then copy the code.', icon: 'paintbrush' },
  'utilities': { name: 'Web Utilities', description_short: 'Handy online utilities for developers and webmasters, including DNS lookup, IP finder, and timers.', icon: 'utility-pole' },
};

export const categories: ToolCategoryInfo[] = Object.entries(categoryInfo).map(([id, info]) => ({
  id: id as ToolCategoryInfo['id'],
  ...info
}));

export const categoryMap = new Map(categories.map(c => [c.id, c]));

export const tools: Tool[] = [
  // Image & Media (Ordered by popularity)
  { id: 'image-compressor', name: 'Image Compressor', description: 'Compress JPG, PNG, & WEBP file sizes online. Reduce image size for web performance without losing quality.', href: '/tools/image-compressor', icon: 'image-icon', category: categoryMap.get('image-media')! },
  { id: 'image-resizer', name: 'Image Resizer', description: 'Resize images to exact dimensions online. Perfect for social media posts, blogs, and web assets.', href: '/tools/image-resizer', icon: 'crop', category: categoryMap.get('image-media')! },
  { id: 'color-palette-extractor', name: 'Color Palette Extractor', description: 'Extract a color palette from any image. Get HEX codes for your design inspiration instantly.', href: '/tools/color-palette-extractor', icon: 'palette', category: categoryMap.get('image-media')! },
  { id: 'image-converter', name: 'Image Converter', description: 'Convert images to JPG, PNG, or WEBP. A free and private online image format converter.', href: '/tools/image-converter', icon: 'component', category: categoryMap.get('image-media')! },
  { id: 'meme-generator', name: 'Meme Generator', description: 'Create your own memes with custom text and images. Upload a picture and add top and bottom text.', href: '/tools/meme-generator', icon: 'bot', category: categoryMap.get('image-media')! },
  
  // PDF Tools (Ordered by popularity)
  { id: 'pdf-maker', name: 'Image to PDF Converter', description: 'Convert JPG and PNG images into a single PDF document. Fast, free, and completely private.', href: '/tools/pdf-maker', icon: 'file-text', category: categoryMap.get('pdf')! },
  { id: 'pdf-merger', name: 'Merge PDF', description: 'Combine multiple PDF documents into one single file. A secure and free online PDF combiner.', href: '/tools/pdf-merger', icon: 'merge', category: categoryMap.get('pdf')! },
  { id: 'pdf-splitter', name: 'Split PDF', description: 'Extract specific pages from a PDF into a new document. A free and private PDF splitter tool.', href: '/tools/pdf-splitter', icon: 'split', category: categoryMap.get('pdf')! },
  { id: 'pdf-deleter', name: 'Delete PDF Pages', description: 'Remove one or more pages from a PDF document. Securely edit PDFs in your browser.', href: '/tools/pdf-deleter', icon: 'trash-2', category: categoryMap.get('pdf')! },
  { id: 'add-watermark', name: 'Add Watermark to PDF', description: 'Add a custom text watermark to your PDF files to protect and brand your documents.', href: '/tools/add-watermark', icon: 'square-pen', category: categoryMap.get('pdf')! },
  { id: 'pdf-rotator', name: 'Rotate PDF', description: 'Rotate pages in a PDF document clockwise or counterclockwise, individually or all at once.', href: '/tools/pdf-rotator', icon: 'rotate-cw', category: categoryMap.get('pdf')! },
  { id: 'pdf-compressor', name: 'PDF Compressor', description: 'Reduce the file size of your PDF documents while maintaining quality. Make PDFs smaller for email.', href: '/tools/pdf-compressor', icon: 'image-icon', category: categoryMap.get('pdf')! },
  { id: 'pdf-to-word-converter', name: 'PDF to Word (Text Extraction)', description: 'Extract text from your PDF into an editable format that you can copy and paste into Word.', href: '/tools/pdf-to-word-converter', icon: 'file-key-2', category: categoryMap.get('pdf')! },
  { id: 'pdf-to-text', name: 'PDF to Text Extractor', description: 'Extract all raw text content from a PDF file. Fast, private, and works on non-scanned PDFs.', href: '/tools/pdf-to-text', icon: 'file-cog', category: categoryMap.get('pdf')! },
  
  // Text & Data Tools (Ordered by popularity)
  { id: 'word-counter', name: 'Word Counter', description: 'Count words, characters, sentences, and paragraphs in real-time. A free online text analysis tool.', href: '/tools/word-counter', icon: 'sigma', category: categoryMap.get('text-data')! },
  { id: 'json-formatter', name: 'JSON Formatter & Validator', description: 'Format, beautify, and validate your JSON data. Makes debugging APIs and data structures easy.', href: '/tools/json-formatter', icon: 'braces', category: categoryMap.get('text-data')! },
  { id: 'case-converter', name: 'Case Converter', description: 'Convert text between different case formats: Sentence case, lowercase, UPPERCASE, and Title Case.', href: '/tools/case-converter', icon: 'case-sensitive', category: categoryMap.get('text-data')! },
  { id: 'text-to-speech', name: 'Text to Speech', description: 'Convert text into natural-sounding speech with adjustable voices, pitch, and speed. 100% free.', href: '/tools/text-to-speech', icon: 'mic', category: categoryMap.get('text-data')! },
  { id: 'remove-duplicate-lines', name: 'Remove Duplicate Lines', description: 'Clean up your lists by deleting duplicate lines from any text block with one click.', href: '/tools/remove-duplicate-lines', icon: 'rows', category: categoryMap.get('text-data')! },
  { id: 'url-encoder-decoder', name: 'URL Encoder & Decoder', description: 'Encode or decode text strings for URL-safe usage. Essential for web developers and SEOs.', href: '/tools/url-encoder-decoder', icon: 'link-icon', category: categoryMap.get('text-data')! },
  { id: 'base64-encoder-decoder', name: 'Base64 Encoder & Decoder', description: 'Encode or decode data in Base64 format. A private, client-side developer utility.', href: '/tools/base64-encoder-decoder', icon: 'binary', category: categoryMap.get('text-data')! },
  { id: 'markdown-preview', name: 'Markdown Preview', description: 'Write and preview Markdown in a live, split-screen editor. Supports all standard Markdown syntax.', href: '/tools/markdown-preview', icon: 'file-code', category: categoryMap.get('text-data')! },
  { id: 'email-extractor', name: 'Email Extractor', description: 'Extract all email addresses from a block of text automatically. Useful for creating mailing lists.', href: '/tools/email-extractor', icon: 'webhook', category: categoryMap.get('text-data')! },
  { id: 'text-reverser', name: 'Text Reverser', description: 'Reverse any text string instantly. A fun and simple text manipulation tool.', href: '/tools/text-reverser', icon: 'rotate-cw', category: categoryMap.get('text-data')! },

  // Calculators (Ordered by popularity)
  { id: 'percentage-calculator', name: 'Percentage Calculator', description: 'A free tool to calculate percentages, percentage changes, and ratios for any numbers.', href: '/tools/percentage-calculator', icon: 'percent', category: categoryMap.get('calculators')! },
  { id: 'loan-emi-calculator', name: 'Loan EMI Calculator', description: 'Calculate your Equated Monthly Installment for home, car, or personal loans. Free and private.', href: '/tools/loan-emi-calculator', icon: 'landmark', category: categoryMap.get('calculators')! },
  { id: 'age-calculator', name: 'Age Calculator', description: 'Calculate age in years, months, and days from a date of birth. Find out exactly how old you are.', href: '/tools/age-calculator', icon: 'calendar', category: categoryMap.get('calculators')! },
  { id: 'unit-converter', name: 'Unit Converter', description: 'Convert units of length, weight, temperature, area, and volume with our comprehensive free tool.', href: '/tools/unit-converter', icon: 'ruler', category: categoryMap.get('calculators')! },
  { id: 'bmi-calculator', name: 'BMI Calculator', description: 'Calculate your Body Mass Index (BMI) using metric or imperial units to monitor your health.', href: '/tools/bmi-calculator', icon: 'calculator', category: categoryMap.get('calculators')! },
  { id: 'date-difference-calculator', name: 'Date Difference Calculator', description: 'Calculate the duration (years, months, days) between two dates. Find the number of days between dates.', href: '/tools/date-difference-calculator', icon: 'calendar', category: categoryMap.get('calculators')! },
  { id: 'discount-calculator', name: 'Discount Calculator', description: 'Quickly calculate the final price after a discount percentage is applied. Find out how much you save.', href: '/tools/discount-calculator', icon: 'percent', category: categoryMap.get('calculators')! },
  { id: 'currency-converter', name: 'Currency Converter', description: 'Convert between major world currencies with real-time exchange rates. Updated daily.', href: '/tools/currency-converter', icon: 'landmark', category: categoryMap.get('calculators')! },

  // Generators (Ordered by popularity)
  { id: 'password-generator', name: 'Password Generator', description: 'Generate secure, strong, and random passwords with customizable length and character types.', href: '/tools/password-generator', icon: 'lock', category: categoryMap.get('generators')! },
  { id: 'qr-code-generator', name: 'QR Code Generator', description: 'Generate high-quality QR codes from any text or URL for free. Download as a PNG instantly.', href: '/tools/qr-code-generator', icon: 'qr-code', category: categoryMap.get('generators')! },
  { id: 'lorem-ipsum-generator', name: 'Lorem Ipsum Generator', description: 'Generate placeholder dummy text (paragraphs, sentences, or words) for your designs and mockups.', href: '/tools/lorem-ipsum-generator', icon: 'book-type', category: categoryMap.get('generators')! },
  { id: 'hash-generator', name: 'Hash Generator', description: 'Generate cryptographic hashes (SHA-1, SHA-256, SHA-512) from text. A secure, client-side tool.', href: '/tools/hash-generator', icon: 'hash', category: categoryMap.get('generators')! },
  { id: 'barcode-generator', name: 'Barcode Generator', description: 'Create various types of barcodes like Code128, EAN, and UPC. Download as a PNG.', href: '/tools/barcode-generator', icon: 'barcode', category: categoryMap.get('generators')! },
  { id: 'random-number-generator', name: 'Random Number Generator', description: 'Generate random numbers within a specified min/max range. Simple and fast.', href: '/tools/random-number-generator', icon: 'wand', category: categoryMap.get('generators')! },
  { id: 'username-generator', name: 'Username Generator', description: 'Create unique and cool usernames for social media, gaming, or online accounts based on a keyword.', href: '/tools/username-generator', icon: 'key-round', category: categoryMap.get('generators')! },
  { id: 'domain-generator', name: 'Domain Name Generator', description: 'Get creative ideas for available domain names based on your keywords. Find the perfect name for your site.', href: '/tools/domain-generator', icon: 'globe', category: categoryMap.get('generators')! },
  { id: 'otp-generator', name: 'OTP Generator (TOTP)', description: 'Generate Time-based One-Time Passwords for 2FA. A secure, browser-based authenticator.', href: '/tools/otp-generator', icon: 'shield', category: categoryMap.get('generators')! },

  // CSS Tools
  { id: 'gradient-generator', name: 'CSS Gradient Generator', description: 'Visually create linear and radial CSS gradients and copy the code instantly.', href: '/tools/gradient-generator', icon: 'sun', category: categoryMap.get('css')! },
  { id: 'box-shadow-generator', name: 'CSS Box Shadow Generator', description: 'Design complex, layered box shadows with a visual editor and copy the CSS.', href: '/tools/box-shadow-generator', icon: 'square-pen', category: categoryMap.get('css')! },
  { id: 'border-radius-generator', name: 'CSS Border Radius Generator', description: 'Visually create custom border-radius values for your elements and copy the CSS code.', href: '/tools/border-radius-generator', icon: 'component', category: categoryMap.get('css')! },
  { id: 'text-shadow-generator', name: 'CSS Text Shadow Generator', description: 'Design layered text shadows with an easy-to-use visual tool and copy the generated CSS.', href: '/tools/text-shadow-generator', icon: 'case-sensitive', category: categoryMap.get('css')! },
  { id: 'flexbox-playground', name: 'CSS Flexbox Playground', description: 'Learn and experiment with all CSS Flexbox properties visually to build complex layouts.', href: '/tools/flexbox-playground', icon: 'columns', category: categoryMap.get('css')! },
  { id: 'grid-generator', name: 'CSS Grid Generator', description: 'Visually create complex CSS Grid layouts and copy the generated code for your projects.', href: '/tools/grid-generator', icon: 'rows', category: categoryMap.get('css')! },
  { id: 'animation-generator', name: 'CSS Animation Generator', description: 'Create and customize CSS keyframe animations with a live preview and copy the code.', href: '/tools/animation-generator', icon: 'sparkles', category: categoryMap.get('css')! },

  // Utilities
  { id: 'timezone-converter', name: 'Time Zone Converter', description: 'Easily convert times between different cities and time zones around the world. Perfect for scheduling.', href: '/tools/timezone-converter', icon: 'globe', category: categoryMap.get('utilities')! },
  { id: 'stopwatch', name: 'Online Stopwatch', description: 'A simple, accurate online stopwatch to time anything, with lap functionality included.', href: '/tools/stopwatch', icon: 'clock', category: categoryMap.get('utilities')! },
  { id: 'timer', name: 'Countdown Timer', description: 'Set a countdown timer for any task. Get an audio notification when your time is up.', href: '/tools/timer', icon: 'clock', category: categoryMap.get('utilities')! },
  { id: 'notes-tool', name: 'Simple Notes', description: 'A simple, private notepad in your browser. Your notes are automatically saved to your device.', href: '/tools/notes-tool', icon: 'notepad-text', category: categoryMap.get('utilities')! },
  { id: 'dns-lookup', name: 'DNS Lookup Tool', description: 'Perform a DNS lookup for any domain. Check DNS records like A, AAAA, CNAME, MX, and NS.', href: '/tools/dns-lookup', icon: 'webhook', category: categoryMap.get('utilities')! },
  { id: 'ip-lookup', name: 'IP Address Lookup', description: 'Find the geolocation of any IP address. Get details like country, city, and ISP instantly.', href: '/tools/ip-lookup', icon: 'mouse-pointer', category: categoryMap.get('utilities')! },
];

export const toolMap = new Map(tools.map(tool => [tool.id, tool]));

    