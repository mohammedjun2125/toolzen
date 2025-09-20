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
    'image-resizer': dynamic(() => import('@/components/tools/image-resizer')),
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
    'percentage-calculator': dynamic(() => import('@/components/tools/percentage-calculator')),
    'loan-emi-calculator': dynamic(() => import('@/components/tools/loan-emi-calculator')),
    'barcode-generator': dynamic(() => import('@/components/tools/barcode-generator')),
    'random-number-generator': dynamic(() => import('@/components/tools/random-number-generator')),
};

const toolFaqs: { [key: string]: { question: string; answer: string }[] } = {
    'image-compressor': [
        { question: 'Is my image uploaded to a server?', answer: 'No, all compression is done in your browser. Your images never leave your computer, ensuring 100% privacy and security.' },
        { question: 'What image formats can I compress?', answer: 'Our tool supports JPG, PNG, WEBP, and GIF images. You can optimize any of these formats for free.' },
        { question: 'Is there a file size limit for the image compressor?', answer: 'There is no hard limit. However, performance may vary with very large images (over 20MB) on less powerful devices, as all processing is client-side.' },
    ],
    'image-resizer': [
        { question: 'Is my image data secure?', answer: 'Yes. All resizing is performed in your browser. Your images are never uploaded to any server, guaranteeing your privacy.' },
        { question: 'Does resizing affect image quality?', answer: 'Making an image smaller generally preserves quality well. Making an image larger than its original size may result in some loss of sharpness. Our tool uses a high-quality resampling algorithm to maintain the best possible result.'},
        { question: 'Can I maintain the aspect ratio?', answer: 'Yes, our tool includes an option to lock the aspect ratio. When you change the width, the height will adjust automatically to prevent distortion, and vice-versa.' },
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
      { question: 'Which hashing algorithms are supported?', answer: 'We support the most common and secure hashing algorithms: SHA-1, SHA-256, and SHA-512. MD5 is not supported by the Web Crypto API for security reasons but may be available in some JS libraries.' },
    ],
    'base64-encoder-decoder': [
        { question: 'Is my data secure when using this tool?', answer: 'Yes, all Base64 encoding and decoding happens on your device. No data is ever sent to our servers, ensuring your information remains private.' },
        { question: 'What is Base64 encoding used for?', answer: 'Base64 is a method to represent binary data in an ASCII string format. It is commonly used for transferring data in text-based formats like email attachments, JSON web tokens (JWT), or embedding images in CSS/HTML.' },
    ],
    'word-counter': [
        { question: 'Does this tool store my text?', answer: 'No, all calculations are done in your browser. Your text is never stored or sent to a server. Your privacy is guaranteed.'},
        { question: 'What does the word counter tool measure?', answer: 'It provides real-time statistics on the number of words, characters (with and without spaces), sentences, and paragraphs in your text.'}
    ],
    'percentage-calculator': [
        { question: 'Is this calculator free?', answer: 'Yes, our percentage calculator is completely free and works offline in your browser. All calculations are performed on your device, ensuring your data is private.'},
        { question: 'What kinds of percentage calculations can I do?', answer: 'You can perform three main types of calculations: finding what X% of Y is, determining what percentage X is of Y, and calculating the percentage increase or decrease from one number to another.'},
    ],
    'loan-emi-calculator': [
        { question: 'How is the EMI calculated?', answer: 'Our calculator uses the standard formula: EMI = [P × r × (1+r)^n] / [(1+r)^n – 1], where P is the principal amount, r is the monthly interest rate, and n is the tenure in months.'},
        { question: 'Is my financial data safe?', answer: 'Yes, absolutely. This is a client-side tool, meaning your loan amount, interest rate, and tenure details are never sent to our servers. All calculations happen privately in your browser.'},
    ],
    'barcode-generator': [
        { question: 'What types of barcodes can I generate?', answer: 'Our tool supports a wide variety of formats, including CODE128, EAN-13, EAN-8, UPC, and more. You can select the format that best fits your needs, whether for retail, inventory, or personal use.'},
        { question: 'Can I download the generated barcode?', answer: 'Yes, you can download the generated barcode as a PNG image file, which is suitable for printing or for use in digital documents and designs. The download is instant and free.'},
    ],
    'random-number-generator': [
        { question: 'How "random" are the numbers?', answer: 'The numbers are generated using your browser\'s built-in `Math.random()` function. While this is sufficient for most general-purpose needs like games or picking winners, it is not considered cryptographically secure for high-stakes security applications.'},
        { question: 'Is there a limit to the range?', answer: 'You can set any minimum and maximum values for the range. The tool will generate a random integer (whole number) that is inclusive of the min and max values you provide.'},
    ],
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
      canonical: `https://www.toolzenweb.com/tools/${params.toolId}`,
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

  const jsonLd = {
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
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ToolLayout title={tool.name} description={tool.description} faq={faq}>
        <ToolComponent />
      </ToolLayout>
    </>
  );
}
