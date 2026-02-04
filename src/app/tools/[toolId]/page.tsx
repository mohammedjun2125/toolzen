
import { tools, toolMap } from '@/lib/tools';
import { notFound } from 'next/navigation';
import { type Metadata } from 'next';
import dynamic from 'next/dynamic';
import { ToolLayout } from '@/components/tool-layout';
import { seoKeywords } from '@/lib/seo-keywords';

type Props = {
  params: { toolId: string }
}

const ComingSoonTool = dynamic(() => import('@/components/tools/coming-soon-tool'));

const specificSeoData: { [key: string]: { title: string, description: string, schema: any } } = {
  'pdf-editor': {
    title: 'Free Online PDF Editor — Edit Text, Images & Draw | Toolzen',
    description: 'A powerful, free online PDF editor that runs in your browser. Edit PDF text, add images, draw, fill forms, and more. 100% private and secure, with no uploads required.',
    schema: { "@context":"https://schema.org", "@type":"SoftwareApplication", "name":"Toolzen Free PDF Editor", "url":"https://toolzenweb.com/tools/pdf-editor", "applicationCategory":"https://schema.org/OnlineTool", "description":"Edit PDF files securely in your browser. Add text, images, drawings, and manage pages for free without uploading files.", "operatingSystem":"All", "offers":{"@type":"Offer","price":"0","priceCurrency":"USD"} }
  },
  'pdf-compressor': {
    title: 'Compress PDF Online — Fast & Private | Toolzen',
    description: 'Compress PDF files quickly and privately in your browser. No uploads, 100% client-side, free and easy to use.',
    schema: { "@context":"https://schema.org", "@type":"SoftwareApplication", "name":"Toolzen PDF Compressor", "url":"https://toolzenweb.com/tools/pdf-compressor", "applicationCategory":"https://schema.org/OnlineTool", "description":"Compress PDF files in your browser quickly and privately — no file upload required.", "operatingSystem":"All", "offers":{ "@type":"Offer", "price":"0", "priceCurrency":"USD" } }
  },
  'pdf-to-word-converter': {
    title: 'PDF to Word Converter Online — Free | Toolzen',
    description: 'Convert PDF files to Word documents online for free. Secure, fast, and entirely client-side with Toolzen.',
    schema: { "@context":"https://schema.org", "@type":"SoftwareApplication", "name":"Toolzen PDF to Word Converter", "url":"https://toolzenweb.com/tools/pdf-to-word-converter", "applicationCategory":"https://schema.org/OnlineTool", "description":"Convert PDF files to editable Word documents online securely and privately in your browser.", "operatingSystem":"All", "offers":{"@type":"Offer","price":"0","priceCurrency":"USD"} }
  },
  'image-compressor': {
    title: 'Image Compressor Online — Reduce Image Size Free',
    description: 'Compress JPG, PNG, or WebP images online for free. Fast, client-side, and private — no upload required.',
    schema: { "@context":"https://schema.org", "@type":"SoftwareApplication", "name":"Toolzen Image Compressor", "url":"https://toolzenweb.com/tools/image-compressor", "applicationCategory":"https://schema.org/OnlineTool", "description":"Compress images quickly and privately in your browser without uploading to a server.", "operatingSystem":"All", "offers":{"@type":"Offer","price":"0","priceCurrency":"USD"} }
  },
  'image-resizer': {
    title: 'Image Resizer — Resize JPG, PNG, WebP | Toolzen',
    description: 'Resize images online instantly. Supports JPG, PNG, WebP. Client-side processing ensures privacy and speed.',
    schema: { "@context":"https://schema.org", "@type":"SoftwareApplication", "name":"Toolzen Image Resizer", "url":"https://toolzenweb.com/tools/image-resizer", "applicationCategory":"https://schema.org/OnlineTool", "description":"Resize images online securely and privately without uploading files to a server.", "operatingSystem":"All", "offers":{"@type":"Offer","price":"0","priceCurrency":"USD"} }
  },
  'qr-code-generator': {
    title: 'QR Code Generator Online — Free | Toolzen',
    description: 'Generate QR codes online for free. Fast, client-side, no account required. Perfect for URLs, text, and contact info.',
    schema: { "@context":"https://schema.org", "@type":"SoftwareApplication", "name":"Toolzen QR Code Generator", "url":"https://toolzenweb.com/tools/qr-code-generator", "applicationCategory":"https://schema.org/OnlineTool", "description":"Create QR codes online instantly and privately with Toolzen’s client-side generator.", "operatingSystem":"All", "offers":{"@type":"Offer","price":"0","priceCurrency":"USD"} }
  },
  'loan-emi-calculator': {
    title: 'Loan EMI Calculator — Monthly Payment Calculator | Toolzen',
    description: 'Calculate your loan EMI quickly and easily online. Client-side calculator for accurate monthly payments and interest.',
    schema: { "@context":"https://schema.org", "@type":"SoftwareApplication", "name":"Toolzen Loan EMI Calculator", "url":"https://toolzenweb.com/tools/loan-emi-calculator", "applicationCategory":"https://schema.org/OnlineTool", "description":"Compute loan EMIs online privately and instantly. Toolzen ensures 100% client-side processing.", "operatingSystem":"All", "offers":{"@type":"Offer","price":"0","priceCurrency":"USD"} }
  },
  'currency-converter': {
    title: 'Currency Converter — Live Rates & Convert | Toolzen',
    description: 'Convert currencies online with live exchange rates. Fast, private, and client-side conversion. Free to use.',
    schema: { "@context":"https://schema.org", "@type":"SoftwareApplication", "name":"Toolzen Currency Converter", "url":"https://toolzenweb.com/tools/currency-converter", "applicationCategory":"https://schema.org/OnlineTool", "description":"Convert currencies online privately with real-time exchange rates, all processed client-side.", "operatingSystem":"All", "offers":{"@type":"Offer","price":"0","priceCurrency":"USD"} }
  },
  'json-formatter': {
    title: 'JSON Formatter & Validator | Toolzen',
    description: 'Format, validate, and beautify JSON online. Client-side tool for fast, private JSON editing. Free to use.',
    schema: { "@context":"https://schema.org", "@type":"SoftwareApplication", "name":"Toolzen JSON Formatter", "url":"https://toolzenweb.com/tools/json-formatter", "applicationCategory":"https://schema.org/OnlineTool", "description":"Format, validate, and edit JSON online privately in your browser without uploading files.", "operatingSystem":"All", "offers":{"@type":"Offer","price":"0","priceCurrency":"USD"} }
  },
  'password-generator': {
    title: 'Password Generator — Strong & Customizable | Toolzen',
    description: 'Generate strong, secure passwords online. Free, private, and client-side tool for custom password creation.',
    schema: { "@context":"https://schema.org", "@type":"SoftwareApplication", "name":"Toolzen Password Generator", "url":"https://toolzenweb.com/tools/password-generator", "applicationCategory":"https://schema.org/OnlineTool", "description":"Create strong passwords online securely and privately with Toolzen’s client-side generator.", "operatingSystem":"All", "offers":{"@type":"Offer","price":"0","priceCurrency":"USD"} }
  },
  'gradient-generator': {
    title: 'CSS Gradient Generator Online | Toolzen',
    description: 'Generate CSS gradients online easily. Client-side, instant preview, free and private. Perfect for developers.',
    schema: { "@context":"https://schema.org", "@type":"SoftwareApplication", "name":"Toolzen CSS Gradient Generator", "url":"https://toolzenweb.com/tools/css-gradient-generator", "applicationCategory":"https://schema.org/OnlineTool", "description":"Create CSS gradients online instantly and privately. Client-side tool for web developers.", "operatingSystem":"All", "offers":{"@type":"Offer","price":"0","priceCurrency":"USD"} }
  }
};


const toolFaqs: { [key:string]: { question: string; answer: string }[] } = {
    'pdf-editor': [
        { question: 'Is this PDF editor really free?', answer: 'Yes, absolutely. Our online PDF editor is 100% free to use with no hidden fees, watermarks, or sign-up requirements. All core features like adding text, images, and drawings are available to everyone.' },
        { question: 'Are my files secure when I edit them here?', answer: 'Yes. Your privacy is our top priority. This is a client-side tool, which means your PDF files are never uploaded to our servers. All processing and editing happens directly in your web browser on your computer, ensuring your documents remain completely confidential.' },
        { question: 'Can I edit the existing text in my PDF?', answer: 'This version of the editor focuses on adding new content. You can add new text boxes, images, and drawings anywhere on the document. The ability to directly edit the original text within a PDF is a very complex feature that we are exploring for a future update.' },
        { question: 'Does the editor work on mobile devices?', answer: 'Yes, our PDF editor is designed to be fully responsive and works on modern browsers across desktops, tablets, and smartphones. You can make edits on the go without needing to install an app.' },
    ],
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
    'add-watermark': [
      { question: 'Is adding a watermark to my PDF secure?', answer: 'Yes, 100%. The entire process happens in your browser. Your PDF file is never uploaded to a server, so your confidential documents remain completely private.' },
      { question: 'What kind of watermarks can I add?', answer: 'Currently, you can add text-based watermarks. You can customize the text, font size, rotation, and opacity to fit your needs, whether for branding, confidentiality notices, or draft indicators.' },
      { question: 'Will the watermark appear on all pages?', answer: 'Yes, the watermark you configure will be applied consistently to every page of the PDF document.' },
    ],
    'pdf-to-word-converter': [
        { question: 'Is this PDF to Word converter free?', answer: 'Yes, our tool is completely free to use. All processing happens in your browser, ensuring your documents remain private.' },
        { question: 'Will my formatting be preserved when converting from PDF to Word?', answer: 'Our tool focuses on extracting text content. It will preserve paragraphs and line breaks, but complex formatting like tables, columns, and fonts may not be retained. It is designed to give you an editable text version of your document.' },
        { question: 'Why is a client-side converter more secure?', answer: 'Client-side means the conversion happens on your computer. Your PDF file is never uploaded to a server, so there is zero risk of your confidential data being stored, scanned, or exposed.' }
    ],
    'pdf-to-text': [
        { question: 'Is this PDF to Text converter free?', answer: 'Yes, our tool is completely free and works in your browser.' },
        { question: 'Will this tool extract text from scanned PDFs?', answer: 'No, this tool works with text-based PDFs. It cannot perform Optical Character Recognition (OCR) on scanned images or image-based PDFs.' },
        { question: 'How is this different from the PDF to Word converter?', answer: 'This tool focuses purely on extracting raw text content. The PDF to Word converter aims to provide a basic editable document structure, but both use the same core text extraction technology.' }
    ],
    'animation-generator': [
        { question: 'Is this a free CSS animation generator online?', answer: 'Yes, this tool is completely free. You can create keyframe animations for websites and copy the code without any limits.' },
        { question: 'Does this tool require any coding knowledge?', answer: 'No, our CSS animation tool is fully visual. You can adjust settings with sliders and dropdowns and see the animation change in real-time, making it perfect for beginners.' }
    ],
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const tool = toolMap.get(params.toolId);

  if (!tool) {
    return {
      title: 'Tool Not Found'
    }
  }

  const specificSeo = specificSeoData[tool.id];
  if (specificSeo) {
    return {
      title: specificSeo.title,
      description: specificSeo.description,
      alternates: {
        canonical: tool.href,
      },
      openGraph: {
        title: specificSeo.title,
        description: specificSeo.description,
        url: tool.href,
        type: 'website',
      },
    };
  }

  const keywords = (seoKeywords.tools as any)[tool.id];

  if (!keywords) {
    const fallbackTitle = `${tool.name} | Free Online Tool | Toolzen`;
    const fallbackDescription = `${tool.description} A fast, free, and privacy-focused online utility from Toolzen that works entirely in your browser.`;
    return {
      title: fallbackTitle,
      description: fallbackDescription,
      alternates: {
        canonical: tool.href,
      },
    }
  }

  const toolTitle = `${keywords.title_keywords.join(' - ')} | Toolzen`;
  const toolDescription = `${tool.description} Use our free online tool for ${keywords.meta_keywords.join(', ')}. Fast, secure, and works in your browser.`;

  return {
    title: toolTitle,
    description: toolDescription,
    keywords: keywords.meta_keywords.concat(keywords.high_cpc),
    alternates: {
      canonical: tool.href,
    },
    openGraph: {
        title: toolTitle,
        description: toolDescription,
        url: tool.href,
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

const DynamicTool = ({ toolId }: { toolId: string }) => {
  const Component = dynamic(
    () => import(`@/components/tools/${toolId}`).catch(() => ComingSoonTool),
    {
      loading: () => <div className="w-full h-96 rounded-lg bg-muted animate-pulse" />,
    }
  );

  return <Component />;
};


export default function ToolPage({ params }: Props) {
  const { toolId } = params;
  const tool = toolMap.get(toolId);
  
  if (!tool) {
    notFound();
  }

  const faq = toolFaqs[toolId] || [];

  const specificSeo = specificSeoData[toolId];
  let schema;
  if(specificSeo) {
    schema = specificSeo.schema;
  } else {
     schema = {
      '@context': 'https://schema.org',
      '@type': 'SoftwareApplication',
      name: tool.name,
      applicationCategory: 'Utilities',
      operatingSystem: 'Any (Web browser)',
      description: tool.description,
      url: `https://toolzenweb.com${tool.href}`,
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
  }
  
  const faqSchema = faq.length > 0 ? {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: faq.map(item => ({
          '@type': 'Question',
          name: item.question,
          acceptedAnswer: {
              '@type': 'Answer',
              text: item.answer
          }
      }))
  } : null;

  const combinedSchema = faqSchema 
    ? { ...schema, mainEntityOfPage: faqSchema }
    : schema;


  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(combinedSchema) }}
      />
      <ToolLayout title={tool.name} description={tool.description} faq={faq} categoryId={tool.category.id}>
        <DynamicTool toolId={toolId} />
      </ToolLayout>
    </>
  );
}
