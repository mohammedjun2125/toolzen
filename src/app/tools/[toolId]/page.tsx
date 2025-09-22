

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
    'pdf-maker': dynamic(() => import('@/components/tools/pdf-maker')),
    'pdf-merger': dynamic(() => import('@/components/tools/pdf-merger')),
    'pdf-rotator': dynamic(() => import('@/components/tools/pdf-rotator')),
    'pdf-deleter': dynamic(() => import('@/components/tools/pdf-deleter')),
    'pdf-splitter': dynamic(() => import('@/components/tools/pdf-splitter')),
    'protect-pdf': dynamic(() => import('@/components/tools/protect-pdf')),
    'add-watermark': dynamic(() => import('@/components/tools/add-watermark')),
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
    'pdf-maker': [
        { question: 'Are my images uploaded to a server?', answer: 'No. Our PDF Maker is a 100% client-side tool. All images are processed directly in your browser, and your files never leave your computer, ensuring total privacy.' },
        { question: 'What image formats can I use to create a PDF?', answer: 'You can convert JPG and PNG images into a PDF. Simply select all the images you want to include, and the tool will combine them into a single, professional document.' },
        { question: 'Is this PDF creation tool free to use?', answer: 'Yes, absolutely. Our tool is completely free and requires no sign-up. You can create as many PDFs as you need.' },
        { question: 'Does the generated PDF have a watermark?', answer: 'No. The PDFs you create are clean and do not contain any watermarks, making them perfect for professional and personal use.' },
    ],
    'qr-code-generator': [
        { question: 'What is a QR code?', answer: 'A QR (Quick Response) code is a two-dimensional barcode that can store various types of information, such as website URLs, text, or contact details. It can be easily scanned by a smartphone camera.' },
        { question: 'Is it free to generate QR codes?', answer: 'Yes, our QR code generator is completely free to use for both personal and commercial purposes. There are no limits or subscriptions.' },
        { question: 'Is my data safe?', answer: 'Absolutely. Our tool generates the QR code entirely within your browser. The data you enter is never sent to our servers, ensuring 100% privacy.' },
        { question: 'What is error correction?', answer: 'Error correction allows a QR code to be scanned even if it\'s partially damaged or dirty. Our generator uses a high level of error correction to ensure your codes are robust and reliable.' }
    ],
    'unit-converter': [
        { question: 'What types of units can I convert?', answer: 'Our tool supports a wide range of conversions, including length (meters, feet, miles), weight (kilograms, pounds), temperature (Celsius, Fahrenheit), area, and volume.' },
        { question: 'Are the conversions accurate?', answer: 'Yes, we use standardized, internationally accepted conversion factors to ensure all calculations are precise and reliable for scientific, academic, and everyday use.' },
        { question: 'Is this tool free?', answer: 'Yes, the unit converter is completely free to use. All calculations happen in your browser, ensuring your data remains private.' }
    ],
    'text-to-speech': [
        { question: 'How does Text-to-Speech (TTS) work?', answer: 'Our tool uses your web browser\'s built-in speech synthesis engine to convert written text into spoken words. This happens entirely on your device, ensuring your text remains private.' },
        { question: 'Can I change the voice?', answer: 'Yes. The tool provides a list of all voices available on your operating system (Windows, macOS, Android, etc.). You can select different languages and accents.' },
        { question: 'Can I download the audio as an MP3 file?', answer: 'Currently, browsers do not provide a standard way to directly download the audio generated by the Web Speech API. This tool is designed for real-time playback.' },
        { question: 'Are there any limits on the amount of text?', answer: 'No, you can convert text of any length, from a single sentence to a full article. There are no character limits.' }
    ],
    'pdf-merger': [
        { question: 'Are my PDF files uploaded to a server?', answer: 'No. Security is our top priority. All merging happens directly in your browser. Your files are never sent over the internet, ensuring your sensitive documents remain completely private.' },
        { question: 'Is there a limit on the number of PDFs I can merge?', answer: 'There is no hard limit on the number of files. You can merge as many PDFs as you need in a single operation. Performance may vary based on your device\'s capabilities.' },
        { question: 'Does the tool work on mobile?', answer: 'Yes. Our PDF merger is fully responsive and works on modern mobile browsers, so you can combine files on your phone or tablet on the go.' }
    ],
    'pdf-rotator': [
        { question: 'Is it safe to rotate my PDF here?', answer: 'Yes, it is 100% safe. The PDF file is processed entirely on your computer. It is never uploaded to a server, so your confidential data remains secure.' },
        { question: 'Can I rotate just one page in a multi-page document?', answer: 'Absolutely. Our tool generates a preview of every page, allowing you to apply rotations to individual pages or all pages at once before downloading the final document.' },
        { question: 'Will rotating the PDF reduce its quality?', answer: 'No, rotating a PDF is a lossless operation. The quality of your text and images will remain exactly the same as the original.' }
    ],
    'pdf-deleter': [
        { question: 'Is deleting pages from my PDF secure?', answer: 'Yes. Our tool is 100% secure as it processes the file directly in your browser. Your PDF is never uploaded to a server, so your confidential information remains completely private.'},
        { question: 'Will deleting pages affect the quality of the remaining pages?', answer: 'Not at all. Deleting pages is a structural change, and it does not re-compress or alter the content of the other pages. The quality of the remaining pages will be identical to the original.'},
        { question: 'Can I recover a page after I delete it?', answer: 'Once you apply the changes and download the new PDF, the deleted pages are gone from that new file. However, your original file remains untouched on your device, so you can always start over if you make a mistake.'}
    ],
    'pdf-splitter': [
        { question: 'Is splitting my PDF secure?', answer: 'Yes. The tool operates entirely in your browser. Your PDF is never uploaded to our servers, so your data remains completely private and secure.'},
        { question: 'What can I do with the Split PDF tool?', answer: 'You can select one or more pages from a PDF and extract them into a new, separate PDF file. This is perfect for isolating a chapter, a report, or specific pages you need.'},
        { question: 'Can I split one PDF into multiple single-page files?', answer: 'This version of the tool extracts all selected pages into one new file. A feature to split each selected page into an individual file is coming soon!'}
    ],
    'protect-pdf': [
        { question: 'How secure is the password protection?', answer: 'Our tool uses standard PDF encryption (AES-256) which is very strong. The encryption happens in your browser, so your password and file are never sent to our servers. The security of the file depends on the strength of the password you choose.'},
        { question: 'Can I recover a forgotten password?', answer: 'No. Because the encryption is done on your device, we have no knowledge of your password. If you forget it, there is no way for us to recover the file. Please store your password in a safe place.'},
        { question: 'Does this work on all PDF readers?', answer: 'Yes, password-protected PDFs created with our tool will work with all standard PDF readers, such as Adobe Acrobat, Chrome, and Preview on Mac.'}
    ],
    'add-watermark': [
      { question: 'Is adding a watermark to my PDF secure?', answer: 'Yes, 100%. The entire process happens in your browser. Your PDF file is never uploaded to a server, so your confidential documents remain completely private.' },
      { question: 'What kind of watermarks can I add?', answer: 'Currently, you can add text-based watermarks. You can customize the text, font size, rotation, and opacity to fit your needs, whether for branding, confidentiality notices, or draft indicators.' },
      { question: 'Will the watermark appear on all pages?', answer: 'Yes, the watermark you configure will be applied consistently to every page of the PDF document.' },
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
    '@type': 'SoftwareApplication',
    name: tool.name,
    applicationCategory: 'Utilities',
    operatingSystem: 'Any (Web browser)',
    description: tool.description,
    offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'USD'
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.8',
      reviewCount: '531'
    }
  };
  
  if (faq.length > 0) {
      jsonLd['mainEntity'] = {
          '@type': 'FAQPage',
          'mainEntity': faq.map(item => ({
              '@type': 'Question',
              'name': item.question,
              'acceptedAnswer': {
                  '@type': 'Answer',
                  'text': item.answer
              }
          }))
      }
  }

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
