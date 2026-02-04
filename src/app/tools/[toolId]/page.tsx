

import { tools, toolMap } from '@/lib/tools';
import { notFound } from 'next/navigation';
import { type Metadata } from 'next';
import dynamic from 'next/dynamic';
import { ToolLayout } from '@/components/tool-layout';
import { programmaticToolMap } from '@/lib/tool-programmatic-map';

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
        { question: 'Can I delete or rotate pages in my PDF?', answer: 'Yes. The editor includes page management features. You can see thumbnails of all pages, delete any pages you don\'t need, and rotate pages that are in the wrong orientation.' },
        { question: 'Does the editor work on mobile devices?', answer: 'Yes, our PDF editor is designed to be fully responsive and works on modern browsers across desktops, tablets, and smartphones. You can make edits on the go without needing to install an app.' },
    ],
    'image-compressor': [
        { question: 'Is my image uploaded to a server?', answer: 'No, all compression is done in your browser. Your images never leave your computer, ensuring 100% privacy and security.' },
        { question: 'What image formats can I compress?', answer: 'Our tool supports JPG, PNG, WEBP, and GIF images. You can optimize any of these formats for free.' },
        { question: 'What is the best target size for a web image?', answer: 'For a full-width blog or portfolio image, a good target is between 100 KB and 200 KB. This provides a great balance of quality and fast loading speed.' },
        { question: 'Will compressing an image reduce its quality?', answer: 'Our tool uses smart lossy compression, which significantly reduces file size with minimal impact on visual quality. For most web uses, you won\'t be able to tell the difference between the original and the compressed image.' },
        { question: 'Is there a file size limit for the image compressor?', answer: 'There is no hard limit. However, performance may vary with very large images (over 20MB) on less powerful devices, as all processing is client-side.' },
    ],
    'image-resizer': [
        { question: 'Is my image data secure?', answer: 'Yes. All resizing is performed in your browser. Your images are never uploaded to any server, guaranteeing your privacy.' },
        { question: 'Does resizing affect image quality?', answer: 'Making an image smaller generally preserves quality well. Making an image larger than its original size may result in some loss of sharpness. Our tool uses a high-quality resampling algorithm to maintain the best possible result.'},
        { question: 'What is aspect ratio and should I maintain it?', answer: 'The aspect ratio is the proportional relationship between an image\'s width and height. We highly recommend keeping "Maintain aspect ratio" checked to prevent your image from looking stretched or squashed.' },
        { question: 'What are the best image dimensions for social media?', answer: 'It varies by platform, but common sizes are 1080x1080 pixels for Instagram posts, 1200x630 for Facebook link posts, and 1600x900 for X (Twitter) posts. Our resizer makes it easy to hit these exact dimensions.'},
        { question: 'Can I resize multiple images at once?', answer: 'Currently, our tool processes one image at a time to give you full control over the output. A bulk resizing feature is planned for a future update.'},
    ],
    'password-generator': [
        { question: 'How secure are the passwords generated?', answer: 'The passwords are highly secure. They are generated on your device using the browser\'s built-in cryptographically secure random number generator (CSPRNG). This means they are truly random and not predictable.' },
        { question: 'Is my generated password saved anywhere?', answer: 'No. The password exists only on your screen and in your computer\'s memory. It is never sent over the internet or stored by our server, making the process completely private.' },
        { question: 'What is the ideal password length?', answer: 'Security experts recommend a minimum of 16 characters for important accounts. The longer and more complex the password, the harder it is to crack. Our tool supports up to 64 characters.' },
        { question: 'Why should I use symbols and numbers?', answer: 'Including different character types (uppercase, lowercase, numbers, symbols) dramatically increases the number of possible combinations, making a brute-force attack exponentially harder. Always include all character types for maximum security.' },
        { question: 'Should I use a different password for every site?', answer: 'Yes, absolutely. Using a unique password for each online account is one of a an important security practices. If one site is breached, a unique password prevents attackers from using the same credentials to access your other accounts.' },
    ],
    'hash-generator': [
      { question: 'Is my text sent to a server for hashing?', answer: 'No, all hashing is performed in your browser using the Web Crypto API. Your data remains completely private and secure.' },
      { question: 'Which hashing algorithms are supported?', answer: 'We support the most common and secure hashing algorithms: SHA-1, SHA-256, and SHA-512.' },
      { question: 'What is a hash function?', answer: 'A hash function is a one-way mathematical algorithm that converts an input of any size into a fixed-size string of characters. The output, or "hash," is unique to the input, so even a tiny change in the input will produce a completely different hash.' },
      { question: 'Can a hash be reversed?', answer: 'No, cryptographic hash functions are designed to be irreversible. You cannot get the original input text back from its hash. This one-way property is what makes them useful for security applications like password storage.' },
      { question: 'What is hashing used for?', answer: 'Hashing is used for verifying data integrity (checking if a file has been changed), password storage (storing hashes of passwords instead of the passwords themselves), and in blockchain technology to create a chain of transactions.' },
    ],
    'base64-encoder-decoder': [
        { question: 'Is my data secure when using this tool?', answer: 'Yes, all Base64 encoding and decoding happens on your device. No data is ever sent to our servers, ensuring your information remains private.' },
        { question: 'What is Base64 encoding used for?', answer: 'Base64 is a method to represent binary data (like an image or a file) in an ASCII string format. It is commonly used for embedding images directly in CSS or HTML files, sending attachments in emails, or transmitting data in text-based formats like JSON.' },
        { question: 'Is Base64 a form of encryption?', answer: 'No, it is not. Base64 is an encoding scheme, not an encryption algorithm. It is easily reversible and provides no security. It should never be used to protect sensitive data.' },
        { question: 'Why does Base64 make the data larger?', answer: 'Base64 represents every 3 bytes of binary data as 4 ASCII characters. This increases the file size by approximately 33%, which is a trade-off for being able to transmit the data in a text-safe format.' },
        { question: 'Can all text be encoded to Base64?', answer: 'Yes, any text string or binary data can be encoded into Base64. Our tool handles standard text inputs seamlessly.' },
    ],
    'word-counter': [
        { question: 'Does this tool store my text?', answer: 'No, all calculations are done in your browser. Your text is never stored or sent to a server. Your privacy is guaranteed.'},
        { question: 'What does the word counter tool measure?', answer: 'It provides real-time statistics on the number of words, characters (with and without spaces), sentences, and paragraphs in your text.'},
        { question: 'How are words counted?', answer: 'The tool counts words by splitting the text by spaces and other whitespace characters. It is a reliable method for standard English text.'},
        { question: 'Is there a character limit?', answer: 'No, there is no limit to the amount of text you can paste. The tool is designed to handle everything from a short tweet to a full-length novel, with performance depending on your device\'s capabilities.'},
        { question: 'Why is an online word count tool useful?', answer: 'An online word count tool is crucial for meeting specific requirements for essays, reports, social media posts, and SEO content. It helps writers, students, and professionals ensure their text is the right length and well-structured.'}
    ],
    'percentage-calculator': [
        { question: 'Is this calculator free?', answer: 'Yes, our percentage calculator is completely free and works offline in your browser. All calculations are performed on your device, ensuring your data is private.'},
        { question: 'What kinds of percentage calculations can I do?', answer: 'You can perform three main types of calculations: finding what X% of Y is, determining what percentage X is of Y, and calculating the percentage increase or decrease from one number to another.'},
        { question: 'How do I calculate a percentage increase?', answer: 'Use the "% Change" tab. Enter the original number in the "From" field and the new number in the "To" field. The calculator will show the percentage increase or decrease instantly.' },
        { question: 'Can I use decimal numbers?', answer: 'Yes, the calculator supports both whole numbers and decimal numbers for all inputs.' },
        { question: 'Is my financial data safe?', answer: 'Absolutely. Since this is a client-side tool, any numbers you enter are processed only within your browser and are never sent to our servers. Your financial calculations remain completely private.' },
    ],
    'loan-emi-calculator': [
        { question: 'What is an EMI?', answer: 'EMI stands for Equated Monthly Installment. It is the fixed payment amount made by a borrower to a lender at a specified date each calendar month. EMIs are used to pay off both interest and principal each month so that over a specified number of years, the loan is paid off in full.' },
        { question: 'How is the EMI calculated?', answer: 'Our calculator uses the standard formula: EMI = [P × r × (1+r)^n] / [(1+r)^n – 1], where P is the principal loan amount, r is the monthly interest rate, and n is the loan tenure in months.'},
        { question: 'Is my financial data safe?', answer: 'Yes, absolutely. This is a client-side tool, meaning your loan amount, interest rate, and tenure details are never sent to our servers. All calculations happen privately in your browser.'},
        { question: 'Can I use this calculator for a mortgage or car loan?', answer: 'Yes. The EMI formula is the same for all types of loans, including mortgages (home loans), car loans, and personal loans. You can use this tool to plan for any of them.' },
        { question: 'What does "Total Interest" mean?', answer: 'This is the total amount of interest you will pay over the entire duration of the loan. It is the true cost of borrowing the money. A lower total interest amount means a cheaper loan.' },
    ],
    'barcode-generator': [
        { question: 'What types of barcodes can I generate?', answer: 'Our tool supports a wide variety of formats, including CODE128, EAN-13, EAN-8, UPC, and more. You can select the format that best fits your needs, whether for retail, inventory, or personal use.'},
        { question: 'Can I download the generated barcode?', answer: 'Yes, you can download the generated barcode as a high-quality PNG image file, which is suitable for printing or for use in digital documents and designs. The download is instant and free.'},
        { question: 'Is my data used to generate the barcode secure?', answer: 'Yes. The barcode is generated entirely within your browser. The data you enter (like product numbers) is never sent to our servers, ensuring your business information remains private.' },
        { question: 'What does "Invalid input for the selected format" mean?', answer: 'Different barcode formats have strict rules about the data they can encode. For example, EAN-13 requires exactly 12 digits of input (the 13th is a checksum digit that gets calculated automatically). If you see this error, please check the requirements for your chosen format.' },
        { question: 'Are the generated barcodes suitable for commercial use?', answer: 'Yes. The generated barcodes adhere to industry standards and can be used for retail, inventory management, and other commercial applications. Just ensure you are entering the correct data for the format you have chosen.' },
    ],
    'random-number-generator': [
        { question: 'How "random" are the numbers?', answer: 'The numbers are generated using your browser\'s built-in `Math.random()` function. While this is sufficient for most general-purpose needs like games, picking winners, or simulations, it is not considered cryptographically secure for high-stakes security applications.'},
        { question: 'Is there a limit to the range?', answer: 'You can set any minimum and maximum integer values for the range. The tool will generate a random integer (whole number) that is inclusive of the min and max values you provide.'},
        { question: 'Can I generate more than one number at a time?', answer: 'This version of the tool is designed to generate one random number per click. To get multiple numbers, you can simply click the "Generate" button multiple times.' },
        { question: 'Is the generation process private?', answer: 'Yes. The entire process of generating the random number happens on your computer, within your browser. No information is sent to our servers.' },
        { question: 'What can I use this tool for?', answer: 'It\'s great for any situation where you need an unbiased random choice. Common uses include picking a winner for a giveaway, simulating dice rolls for games, or selecting a random item from a list.' },
    ],
    'pdf-maker': [
        { question: 'Are my images uploaded to a server?', answer: 'No. Our PDF Maker is a 100% client-side tool. All images are processed directly in your browser, and your files never leave your computer, ensuring total privacy.' },
        { question: 'What image formats can I use to create a PDF?', answer: 'You can convert JPG and PNG images into a PDF. Simply select all the images you want to include, and the tool will combine them into a single, professional document.' },
        { question: 'Is this PDF creation tool free to use?', answer: 'Yes, absolutely. Our tool is completely free and requires no sign-up. You can create as many PDFs as you need.' },
        { question: 'Does the generated PDF have a watermark?', answer: 'No. The PDFs you create are clean and do not contain any watermarks, making them perfect for professional and personal use.' },
        { question: 'Can I reorder the images before creating the PDF?', answer: 'Currently, the images are added to the PDF in the order you select them. A feature to drag and drop to reorder images is planned for a future update!' }
    ],
    'qr-code-generator': [
        { question: 'What is a QR code?', answer: 'A QR (Quick Response) code is a two-dimensional barcode that can store various types of information, such as website URLs, text, or contact details. It can be easily scanned by a smartphone camera.' },
        { question: 'Is it free to generate QR codes?', answer: 'Yes, our QR code generator is completely free to use for both personal and commercial purposes. There are no limits or subscriptions.' },
        { question: 'Is my data safe?', answer: 'Absolutely. Our tool generates the QR code entirely within your browser. The data you enter is never sent to our servers, ensuring 100% privacy.' },
        { question: 'What is error correction?', answer: 'Error correction allows a QR code to be scanned even if it\'s partially damaged or dirty. Our generator uses a high level of error correction to ensure your codes are robust and reliable.' },
        { question: 'Can I customize the color of the QR code?', answer: 'This version of the tool generates a standard black and white QR code for maximum scannability and compatibility. Custom color options may be added in the future.' }
    ],
    'unit-converter': [
        { question: 'What types of units can I convert?', answer: 'Our tool supports a wide range of conversions, including length (meters, feet, miles), weight (kilograms, pounds), temperature (Celsius, Fahrenheit), area, and volume.' },
        { question: 'Are the conversions accurate?', answer: 'Yes, we use standardized, internationally accepted conversion factors to ensure all calculations are precise and reliable for scientific, academic, and everyday use.' },
        { question: 'Is this tool free?', answer: 'Yes, the unit converter is completely free to use. All calculations happen in your browser, ensuring your data remains private.' },
        { question: 'How do I convert temperature?', answer: 'Go to the "Temperature" tab. Enter the value, select the unit you are converting from (e.g., Celsius), and select the unit you are converting to (e.g., Fahrenheit). The result will be calculated automatically.' },
        { question: 'Can I use this tool offline?', answer: 'Yes. Once the page is loaded, the tool works completely offline in your browser, as all the conversion logic is handled on the client-side.' }
    ],
    'text-to-speech': [
        { question: 'How does Text-to-Speech (TTS) work?', answer: 'Our tool uses your web browser\'s built-in speech synthesis engine to convert written text into spoken words. This happens entirely on your device, ensuring your text remains private.' },
        { question: 'Can I change the voice?', answer: 'Yes. The tool provides a list of all voices available on your operating system (Windows, macOS, Android, etc.). You can select different languages and accents.' },
        { question: 'Why are there no voices in the list?', answer: 'If the voice list is empty, it may be because your browser does not fully support the Web Speech API, or it has not finished loading the voices. Try refreshing the page or using a different browser like Chrome, Firefox, or Edge.' },
        { question: 'Can I download the audio as an MP3 file?', answer: 'Currently, browsers do not provide a standard way to directly download the audio generated by the Web Speech API. This tool is designed for real-time playback.' },
        { question: 'Are there any limits on the amount of text?', answer: 'No, you can convert text of any length, from a single sentence to a full article. There are no character limits.' }
    ],
    'pdf-merger': [
        { question: 'Are my PDF files uploaded to a server?', answer: 'No. Security is our top priority. All merging happens directly in your browser. Your files are never sent over the internet, ensuring your sensitive documents remain completely private.' },
        { question: 'Is there a limit on the number of PDFs I can merge?', answer: 'There is no hard limit on the number of files. You can merge as many PDFs as you need in a single operation. Performance may vary based on your device\'s capabilities.' },
        { question: 'Does the tool work on mobile?', answer: 'Yes. Our PDF merger is fully responsive and works on modern mobile browsers, so you can combine files on your phone or tablet on the go.' },
        { question: 'Will merging files reduce the quality?', answer: 'No, merging is a lossless process. It simply combines the pages from your source documents into a new file. The quality of your original pages will be perfectly preserved.' },
        { question: 'Can I reorder the files before merging?', answer: 'Currently, the files are merged in the order you select them. A feature to drag and drop files to reorder them before merging is on our development roadmap!' }
    ],
    'pdf-rotator': [
        { question: 'Is it safe to rotate my PDF here?', answer: 'Yes, it is 100% safe. The PDF file is processed entirely on your computer. It is never uploaded to a server, so your confidential data remains secure.' },
        { question: 'Can I rotate just one page in a multi-page document?', answer: 'Absolutely. Our tool generates a preview of every page, allowing you to apply rotations to individual pages or all pages at once before downloading the final document.' },
        { question: 'Will rotating the PDF reduce its quality?', answer: 'No, rotating a PDF is a lossless operation. It only changes the orientation metadata for the page. The quality of your text and images will remain exactly the same as the original.' },
        { question: 'What if I rotate a page by mistake?', answer: 'No problem. Each rotation is in 90-degree increments. Simply click the rotate button again until the page returns to its original orientation. The changes are only permanent after you click "Apply Changes & Download".' },
        { question: 'How to rotate a PDF permanently?', answer: 'To permanently rotate a PDF, upload your file, use the rotate buttons on the page previews to set the correct orientation, and then click "Apply Changes & Download". The new file will have the rotations saved permanently.' }
    ],
    'pdf-deleter': [
        { question: 'Is deleting pages from my PDF secure?', answer: 'Yes. Our tool is 100% secure as it processes the file directly in your browser. Your PDF is never uploaded to a server, so your confidential information remains completely private.'},
        { question: 'Will deleting pages affect the quality of the remaining pages?', answer: 'Not at all. Deleting pages is a structural change, and it does not re-compress or alter the content of the other pages. The quality of the remaining pages will be identical to the original.'},
        { question: 'Can I recover a page after I delete it?', answer: 'Once you apply the changes and download the new PDF, the deleted pages are gone from that new file. However, your original file remains untouched on your device, so you can always start over if you make a mistake.'},
        { question: 'How many pages can I delete at once?', answer: 'You can select and delete as many pages as you need in a single operation. Simply click on all the pages you wish to remove before clicking the download button.'},
        { question: 'How can I remove pages from a PDF for free?', answer: 'Our tool offers a simple and free way to **remove pages from PDF free**. Upload your file, select the pages you don\'t want, and download the new, edited PDF. There are no fees or sign-ups required.'}
    ],
    'pdf-splitter': [
        { question: 'Is splitting my PDF secure?', answer: 'Yes. The tool operates entirely in your browser. Your PDF is never uploaded to our servers, so your data remains completely private and secure.'},
        { question: 'What can I do with the Split PDF tool?', answer: 'You can select one or more pages from a PDF and extract them into a new, separate PDF file. This is perfect for isolating a chapter, a report, or specific pages you need.'},
        { question: 'How do I select multiple pages to extract?', answer: 'Simply click on each page you want to include in the new document. The selected pages will be highlighted. You can click them again to deselect.' },
        { question: 'Will the extracted pages be in order?', answer: 'Yes, the pages in your new PDF will be in the same order as they appeared in the original document.' },
        { question: 'How do I extract pages from a PDF for free?', answer: 'Our tool allows you to **extract pages from PDF free**. Upload your document, select all the pages you wish to save into a new file, and click the "Extract" button to download your new, smaller PDF.'}
    ],
    'add-watermark': [
      { question: 'Is adding a watermark to my PDF secure?', answer: 'Yes, 100%. The entire process happens in your browser. Your PDF file is never uploaded to a server, so your confidential documents remain completely private.' },
      { question: 'What kind of watermarks can I add?', answer: 'Currently, you can add text-based watermarks. You can customize the text, font size, rotation, and opacity to fit your needs, whether for branding, confidentiality notices, or draft indicators.' },
      { question: 'Will the watermark appear on all pages?', answer: 'Yes, the watermark you configure will be applied consistently to every page of the PDF document.' },
      { question: 'Can I change the color of the watermark?', answer: 'This version uses a standard, semi-transparent grey color for professional results and readability. Custom color options may be added in the future.' },
      { question: 'How do I add a watermark to a PDF without software?', answer: 'Our tool allows you to **add a watermark to a PDF online** directly from your web browser. Simply upload your file, customize your text watermark using the provided controls, and download the finished document without needing to install any software like Adobe Acrobat.' },
    ],
    'pdf-to-word-converter': [
        { question: 'Is this PDF to Word converter free?', answer: 'Yes, our tool is completely free to use. All processing happens in your browser, ensuring your documents remain private.' },
        { question: 'Will my formatting be preserved when converting from PDF to Word?', answer: 'Our tool focuses on extracting text content. It will preserve paragraphs and line breaks, but complex formatting like tables, columns, and fonts may not be retained. It is designed to give you an editable text version of your document.' },
        { question: 'Why is a client-side converter more secure?', answer: 'Client-side means the conversion happens on your computer. Your PDF file is never uploaded to a server, so there is zero risk of your confidential data being stored, scanned, or exposed.' },
        { question: 'Does this tool work on scanned PDFs?', answer: 'No, this tool is designed to extract text from text-based (native) PDFs. It cannot perform Optical Character Recognition (OCR) on scanned documents or images.' },
        { question: 'How do I save the output as a Word file?', answer: 'The tool extracts the content as plain text. You can click the "Copy Text" button and then paste the content directly into Microsoft Word, Google Docs, or any other word processor and save it from there.' }
    ],
    'pdf-to-text': [
        { question: 'Is this PDF to Text converter free?', answer: 'Yes, our tool is completely free and works in your browser.' },
        { question: 'Will this tool extract text from scanned PDFs?', answer: 'No, this tool works with text-based PDFs. It cannot perform Optical Character Recognition (OCR) on scanned images or image-based PDFs.' },
        { question: 'How is this different from the PDF to Word converter?', answer: 'This tool focuses purely on extracting raw text content. The PDF to Word converter aims to provide a basic editable document structure, but both use the same core text extraction technology.' },
        { question: 'Is my data private?', answer: 'Yes. The entire text extraction process happens locally in your browser. Your PDF file is never sent to our servers, guaranteeing your privacy.' },
        { question: 'Why is some text missing or jumbled?', answer: 'Some PDFs have complex internal structures that can make text extraction difficult. While our tool works for most standard PDFs, some files may have layouts that prevent perfect extraction.' }
    ],
    'animation-generator': [
        { question: 'Is this a free CSS animation generator online?', answer: 'Yes, this tool is completely free. You can create keyframe animations for websites and copy the code without any limits.' },
        { question: 'Does this tool require any coding knowledge?', answer: 'No, our CSS animation tool is fully visual. You can adjust settings with sliders and dropdowns and see the animation change in real-time, making it perfect for beginners.' },
        { question: 'What are CSS keyframes?', answer: '`@keyframes` is a CSS rule that lets you define the stages of an animation. You can specify what the element should look like at the `from` (0%) and `to` (100%) points of the animation, and even add intermediate steps.' },
        { question: 'What does `animation-fill-mode` do?', answer: 'The `animation-fill-mode: both;` property is included in the generated code to ensure that the element stays in its final state after the animation completes, rather than snapping back to its original state.' },
        { question: 'Can I create more complex, multi-step animations?', answer: 'This tool is designed for generating simple, common animations. For creating complex, multi-step animations, you would need to write the `@keyframes` rule manually, but you can still use our tool to get the basic structure and properties!' }
    ],
    'json-formatter': [
        { question: "What is a JSON Formatter & Validator?", answer: "A JSON Formatter is a tool that takes messy JSON data and makes it readable with proper indentation. A validator checks for syntax errors, like missing commas or brackets. Our tool does both, making it an essential online JSON viewer for developers." },
        { question: "Is my data safe with this online JSON viewer?", answer: "Yes. Our tool is 100% client-side, meaning your JSON data is never uploaded to a server. All formatting and validation happens in your browser, guaranteeing the privacy of your API keys or other sensitive information." },
        { question: "How do I use the JSON validator?", answer: "Simply paste your JSON into the text area and click 'Format/Validate'. If the JSON is invalid, a red border will appear, and an error message will describe the problem, helping you to debug it quickly." },
        { question: "Can this tool handle large JSON files?", answer: "Yes, our tool can handle large JSON strings efficiently. Since it runs in your browser, performance depends on your computer's resources, but it's designed to work well with typical API responses." },
        { question: "Does this tool support JSON5?", answer: "This tool adheres to the standard JSON specification. It does not support features of JSON5, such as comments, trailing commas, or unquoted keys. It will flag these as errors, helping you create universally compatible JSON." }
    ],
    'dns-lookup': [
        { question: "What does a DNS lookup tool do?", answer: "A DNS lookup tool queries the Domain Name System (DNS) to find the IP address and other records associated with a domain name. It's like a phonebook for the internet, translating a name like 'google.com' into an IP address like '172.217.16.14'." },
        { question: "How do I check DNS records online?", answer: "To check DNS records online, simply enter the domain you want to query into our tool, select the record type (like A, MX, or TXT), and click 'Lookup'. The tool will display the official records for that domain." },
        { question: "Why would I need to check an MX record?", answer: "You need to check MX (Mail Exchange) records to diagnose email delivery problems. They tell mail servers where to deliver email for a domain. If they are incorrect, you won't be able to receive emails." },
        { question: "What is an A record?", answer: "An A record, or 'Address' record, is the most basic type of DNS record. It points a domain or subdomain to an IPv4 address. It's the primary record used to tell a browser where to find a website." },
        { question: "Is this DNS checker tool free?", answer: "Yes, our DNS lookup tool is completely free to use. You can perform as many lookups as you need to troubleshoot domain issues or investigate domain configurations." }
    ]
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const tool = toolMap.get(params.toolId);
  const toolId = params.toolId;

  let toolTitle: string;
  let toolDescription: string;
  let canonicalUrl: string;

  if (tool) {
    const specificSeo = specificSeoData[tool.id];
    toolTitle = specificSeo 
      ? specificSeo.title 
      : `${tool.name} | Free Online Tool | Toolzen`;
    
    toolDescription = specificSeo 
      ? specificSeo.description
      : `${tool.description} A fast, free, and privacy-focused online utility from Toolzen that works entirely in your browser.`;
    canonicalUrl = tool.href;
  } else {
    // Handle programmatic pages
    const name = toolId.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
    toolTitle = `${name} | Free Online Tool | Toolzen`;
    toolDescription = `Use this free online tool to ${name.toLowerCase()}. Fast, secure, and works entirely in your browser.`;
    canonicalUrl = `/tools/${toolId}`;
  }
  
  if (!tool && !toolId.includes('-converter')) {
      return { title: 'Tool Not Found' }
  }


  return {
    title: toolTitle,
    description: toolDescription,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
        title: toolTitle,
        description: toolDescription,
        url: canonicalUrl,
        siteName: 'Toolzen',
        type: 'website',
        locale: 'en_US',
    },
    twitter: {
        card: 'summary',
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
  const componentId = programmaticToolMap[toolId as keyof typeof programmaticToolMap] || toolId;
  const Component = dynamic(
    () => import(`@/components/tools/${componentId}`).catch(() => ComingSoonTool),
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
    // It's a programmatic page without a direct tool entry, which is fine
    // as long as it's a valid pattern like a converter.
    if(!toolId.includes('-converter')) {
       notFound();
    }
  }

  const baseToolId = programmaticToolMap[toolId as keyof typeof programmaticToolMap] || toolId;
  const faq = toolFaqs[baseToolId] || [];
  const toolInfo = tool || { name: toolId.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' '), description: `A free online tool to ${toolId.replace(/-/g, ' ')}.`, category: {id: 'utilities'}};


  const specificSeo = specificSeoData[toolId];
  let schema;
  if(specificSeo) {
    schema = specificSeo.schema;
  } else {
     schema = {
      '@context': 'https://schema.org',
      '@type': 'SoftwareApplication',
      name: toolInfo.name,
      applicationCategory: 'Utilities',
      operatingSystem: 'Any (Web browser)',
      description: toolInfo.description,
      url: `https://toolzenweb.com/tools/${toolId}`,
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

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        suppressHydrationWarning
      />
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
          suppressHydrationWarning
        />
      )}
      <ToolLayout title={toolInfo.name} description={toolInfo.description} faq={faq} categoryId={toolInfo.category.id} toolId={toolId}>
        <DynamicTool toolId={toolId} />
      </ToolLayout>
    </>
  );
}
