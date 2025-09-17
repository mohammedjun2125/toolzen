import { tools, toolMap, Tool } from '@/lib/tools';
import { notFound } from 'next/navigation';
import { type Metadata } from 'next';
import dynamic from 'next/dynamic';
import { ToolLayout } from '@/components/tool-layout';

type Props = {
  params: { toolId: string }
}

const toolComponents: { [key: string]: React.ComponentType } = {
    'age-calculator': dynamic(() => import('@/components/tools/age-calculator')),
    'bmi-calculator': dynamic(() => import('@/components/tools/bmi-calculator')),
    'case-converter': dynamic(() => import('@/components/tools/case-converter')),
    'color-palette-extractor': dynamic(() => import('@/components/tools/color-palette-extractor')),
    'image-compressor': dynamic(() => import('@/components/tools/image-compressor')),
    'json-formatter': dynamic(() => import('@/components/tools/json-formatter')),
    'markdown-preview': dynamic(() => import('@/components/tools/markdown-preview')),
    'password-generator': dynamic(() => import('@/components/tools/password-generator')),
    'pdf-maker': dynamic(() => import('@/components/tools/pdf-maker')),
    'qr-code-generator': dynamic(() => import('@/components/tools/qr-code-generator')),
    'text-to-speech': dynamic(() => import('@/components/tools/text-to-speech')),
    'unit-converter': dynamic(() => import('@/components/tools/unit-converter')),
    'url-encoder-decoder': dynamic(() => import('@/components/tools/url-encoder-decoder')),
    'word-counter': dynamic(() => import('@/components/tools/word-counter')),
    'hash-generator': dynamic(() => import('@/components/tools/hash-generator')),
    'base64-encoder-decoder': dynamic(() => import('@/components/tools/base64-encoder-decoder')),
    'lorem-ipsum-generator': dynamic(() => import('@/components/tools/lorem-ipsum-generator')),
    'timezone-converter': dynamic(() => import('@/components/tools/timezone-converter')),
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
    'hash-generator': [
      { question: 'Is my text sent to a server?', answer: 'No, all hashing is performed in your browser. Your data remains private.' },
      { question: 'Which hashing algorithms are supported?', answer: 'We support MD5, SHA-1, SHA-256, and SHA-512.' },
    ],
    'base64-encoder-decoder': [
        { question: 'Is my data secure?', answer: 'Yes, all encoding and decoding happens on your device. Nothing is sent to our servers.' },
        { question: 'What is Base64?', answer: 'Base64 is a way to represent binary data in an ASCII string format. It\'s commonly used for transferring data in text-based formats like email or JSON.' },
    ],
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
