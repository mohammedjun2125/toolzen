
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
        { question: 'Is my image uploaded to a server?', answer: 'No, all compression is done in your browser. Your images never leave your computer, ensuring 100% privacy and security.' },
        { question: 'What image formats can I compress?', answer: 'Our tool supports JPG, PNG, WEBP, and GIF images. You can optimize any of these formats for free.' },
        { question: 'Is there a file size limit for the image compressor?', answer: 'There is no hard limit. However, performance may vary with very large images (over 20MB) on less powerful devices, as all processing is client-side.' },
    ],
    'pdf-maker': [
        { question: 'Is this PDF maker tool free to use?', answer: 'Yes, our PDF maker is completely free. You can convert as many images to PDF as you like without any cost.' },
        { question: 'Are my images secure?', answer: 'Absolutely. The PDF is created entirely in your browser. Your images are never uploaded to any server, guaranteeing your data privacy.' },
        { question: 'What image formats can I use to create a PDF?', answer: 'You can use JPG and PNG images to create your PDF. Simply drag and drop them to get started.' },
    ],
    'password-generator': [
        { question: 'How secure are the passwords generated?', answer: 'The passwords are highly secure. They are generated on your device using the browser\'s built-in cryptographically secure random number generator. They are never sent over the internet.' },
        { question: 'Can I customize the generated password?', answer: 'Yes. You can control the length and the types of characters (uppercase, lowercase, numbers, symbols) to meet any security requirement.' },
    ],
    'hash-generator': [
      { question: 'Is my text sent to a server for hashing?', answer: 'No, all hashing is performed in your browser using the Web Crypto API. Your data remains completely private and secure.' },
      { question: 'Which hashing algorithms are supported?', answer: 'We support the most common and secure hashing algorithms: SHA-1, SHA-256, and SHA-512. MD5 is not supported due to security vulnerabilities.' },
    ],
    'base64-encoder-decoder': [
        { question: 'Is my data secure when using this tool?', answer: 'Yes, all Base64 encoding and decoding happens on your device. No data is ever sent to our servers, ensuring your information remains private.' },
        { question: 'What is Base64 encoding used for?', answer: 'Base64 is a method to represent binary data in an ASCII string format. It is commonly used for transferring data in text-based formats like email attachments, JSON web tokens (JWT), or embedding images in CSS/HTML.' },
    ],
    'word-counter': [
        { question: 'Does this tool store my text?', answer: 'No, all calculations are done in your browser. Your text is never stored or sent to a server. Your privacy is guaranteed.'},
        { question: 'What does the word counter tool measure?', answer: 'It provides real-time statistics on the number of words, characters (with and without spaces), sentences, and paragraphs in your text.'}
    ]
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const tool = toolMap.get(params.toolId);

  if (!tool) {
    return {
      title: 'Tool Not Found'
    }
  }

  const toolTitle = `${tool.name} | Toolzen`;
  const toolDescription = `${tool.description} A fast, free, and privacy-focused online utility from Toolzen that works entirely in your browser.`;

  return {
    title: toolTitle,
    description: toolDescription,
    alternates: {
      canonical: `/tools/${params.toolId}`,
    },
    openGraph: {
        title: toolTitle,
        description: toolDescription,
        url: `/tools/${params.toolId}`,
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        title: toolTitle,
        description: toolDescription,
    },
    // Structured Data
    other: {
      '@context': 'https://schema.org',
      '@type': 'HowToTool',
      name: tool.name,
      description: tool.description,
      step: [
        { '@type': 'HowToStep', text: `Open the ${tool.name} tool on Toolzen.` },
        { '@type': 'HowToStep', text: 'Provide your input (e.g., upload a file, enter text, select options).' },
        { '@type': 'HowToStep', text: 'Adjust any available settings to your preference.' },
        { '@type': 'HowToStep', text: 'Click the action button (e.g., "Compress", "Generate", "Calculate").' },
        { '@type': 'HowToStep', text: 'Get your result instantly on the same page, ready to copy or download.' }
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
