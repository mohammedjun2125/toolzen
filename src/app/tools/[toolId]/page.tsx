import { tools, toolMap, Tool } from '@/lib/tools';
import { notFound } from 'next/navigation';
import { type Metadata } from 'next';

import AgeCalculator from '@/components/tools/age-calculator';
import BmiCalculator from '@/components/tools/bmi-calculator';
import CaseConverter from '@/components/tools/case-converter';
import ColorPaletteExtractor from '@/components/tools/color-palette-extractor';
import ImageCompressor from '@/components/tools/image-compressor';
import JsonFormatter from '@/components/tools/json-formatter';
import MarkdownPreview from '@/components/tools/markdown-preview';
import PasswordGenerator from '@/components/tools/password-generator';
import PdfMaker from '@/components/tools/pdf-maker';
import QrCodeGenerator from '@/components/tools/qr-code-generator';
import TextToSpeech from '@/components/tools/text-to-speech';
import UnitConverter from '@/components/tools/unit-converter';
import UrlEncoderDecoder from '@/components/tools/url-encoder-decoder';
import WordCounter from '@/components/tools/word-counter';
import LabelCropper from '@/components/tools/e-commerce-label-cropper';
import { ToolLayout } from '@/components/tool-layout';

type Props = {
  params: { toolId: string }
}

const toolComponents: { [key: string]: React.ComponentType } = {
    'age-calculator': AgeCalculator,
    'bmi-calculator': BmiCalculator,
    'case-converter': CaseConverter,
    'color-palette-extractor': ColorPaletteExtractor,
    'image-compressor': ImageCompressor,
    'json-formatter': JsonFormatter,
    'markdown-preview': MarkdownPreview,
    'password-generator': PasswordGenerator,
    'pdf-maker': PdfMaker,
    'qr-code-generator': QrCodeGenerator,
    'text-to-speech': TextToSpeech,
    'unit-converter': UnitConverter,
    'url-encoder-decoder': UrlEncoderDecoder,
    'word-counter': WordCounter,
    'e-commerce-label-cropper': LabelCropper,
};

const toolFaqs: { [key: string]: { question: string; answer: string }[] } = {
    'image-compressor': [
        { question: 'Is my image uploaded to a server?', answer: 'No, all compression is done in your browser. Your images never leave your computer.' },
        { question: 'What image formats are supported?', answer: 'You can compress JPG, PNG, WEBP, and GIF images.' },
        { question: 'Is there a file size limit?', answer: 'There is no hard limit, but performance may vary with very large images on less powerful devices.' },
    ],
    'pdf-maker': [
        { question: 'Are my images secure?', answer: 'Yes. The PDF is created entirely in your browser. Your images are not uploaded to any server.' },
        { question: 'What image formats can I use?', answer: 'You can use JPG and PNG images to create your PDF.' },
    ],
    'password-generator': [
        { question: 'Are these passwords secure?', answer: 'Yes, the passwords are generated on your device using a cryptographically secure random number generator. They are never sent over the internet.' },
        { question: 'Can I customize the password?', answer: 'Absolutely. You can control the length and the types of characters included to meet any requirement.' },
    ],
    // Add more FAQs for other tools here
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const tool = toolMap.get(params.toolId);

  if (!tool) {
    return {
      title: 'Tool Not Found'
    }
  }

  return {
    title: `${tool.name} - Free Online Tool`,
    description: tool.description,
    alternates: {
      canonical: `/tools/${params.toolId}`,
    },
    // Structured Data
    other: {
      '@context': 'https://schema.org',
      '@type': 'HowTo',
      name: `How to use the ${tool.name} tool`,
      description: tool.description,
      step: [
        { '@type': 'HowToStep', text: `Open the ${tool.name} tool on Toolzen.` },
        { '@type': 'HowToStep', text: 'Provide your input (e.g., upload a file, enter text).' },
        { '@type': 'HowToStep', text: 'Adjust any available settings to your preference.' },
        { '@type': 'HowToStep', text: 'Click the action button (e.g., "Compress", "Generate", "Calculate").' },
        { '@type': 'HowToStep', text: 'Get your result instantly on the same page.' }
      ]
    },
  }
}

export function generateStaticParams() {
  return tools.map((tool) => ({
    toolId: tool.id,
  }));
}

export default function ToolPage({ params }: Props) {
  const { toolId } = params;
  const ToolComponent = toolComponents[toolId];
  const tool = toolMap.get(toolId);

  if (!ToolComponent || !tool) {
    notFound();
  }

  const faq = toolFaqs[toolId] || [];

  return (
    <ToolLayout title={tool.name} description={tool.description} faq={faq}>
      <ToolComponent />
    </ToolLayout>
  );
}