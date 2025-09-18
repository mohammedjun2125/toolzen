export type Post = {
    slug: string;
    title: string;
    excerpt: string;
    date: string;
    image: string;
    imageHint: string;
    author: string;
    category: string;
    content: string; // Markdown content
};

export const mockPosts: Post[] = [
    {
        slug: 'how-to-compress-images-online',
        title: 'How to Compress Images Online Without Losing Quality',
        excerpt: 'Learn the best techniques to reduce image file sizes for the web without any visible quality loss. We cover the best formats, tools, and tips for optimal performance.',
        date: '2024-08-15',
        image: 'https://picsum.photos/seed/blog1/800/600',
        imageHint: 'image compression',
        author: 'Toolzen Team',
        category: 'Image Optimization',
        content: `
## Why Image Compression Matters

Large images slow down your website, leading to poor user experience and lower search engine rankings. By compressing your images, you can significantly improve page load times.

### Types of Compression
1.  **Lossy Compression:** Reduces file size by permanently removing some data. This is great for photos on the web where a tiny loss in quality is unnoticeable. JPG is a lossy format.
2.  **Lossless Compression:** Reduces file size without any loss of quality. This is ideal for logos, icons, and graphics where sharp lines are important. PNG is a lossless format.

## Using Our Free Image Compressor

Our tool makes it easy.

1.  **Upload:** Drag and drop your JPG, PNG, or WEBP file.
2.  **Compress:** The tool automatically applies the best compression algorithm.
3.  **Download:** Get your optimized image instantly.

The best part? It all happens in your browser, so your files are never uploaded to a server.`,
    },
    {
        slug: 'online-pdf-merge-guide',
        title: 'How to Merge PDFs Safely and for Free',
        excerpt: 'Discover how to combine multiple PDF files into a single document securely using free online tools. Your privacy is protected with client-side processing.',
        date: '2024-08-10',
        image: 'https://picsum.photos/seed/blog2/800/600',
        imageHint: 'document management',
        author: 'Toolzen Team',
        category: 'PDF Tools',
        content: `
## The Need for PDF Merging

Whether you're compiling a report, submitting a project, or archiving documents, merging PDFs is a common task. But is it safe to use online tools?

### Privacy Concerns with Online Tools

Many websites upload your files to their servers to process them. This can be a security risk, especially for sensitive documents.

## The Toolzen Advantage: Client-Side Processing

Our [PDF Maker](/tools/pdf-maker) (which can merge images into a PDF) and other file-handling tools work entirely within your browser.

- **No Uploads:** Your files never leave your computer.
- **100% Secure:** Your data remains private.
- **Fast & Free:** No sign-ups or payments required.

Simply drag your images into the tool, and it will generate a single PDF for you to download.
`,
    },
    {
        slug: 'are-online-tools-secure',
        title: 'Are Online Tools Secure? A Guide to Client-Side Processing',
        excerpt: 'Not all online tools are created equal. Learn the difference between server-side and client-side processing and how to choose tools that protect your privacy.',
        date: '2024-08-05',
        image: 'https://picsum.photos/seed/blog3/800/600',
        imageHint: 'online privacy',
        author: 'Toolzen Team',
        category: 'Security',
        content: `
## The Big Question: Where Does Your Data Go?

When you use an online tool to edit a photo, convert a file, or format code, your data can be handled in two ways:

1.  **Server-Side Processing:** Your file is uploaded to the website's server, processed there, and then you download the result. This is common but poses a privacy risk. Your data is on someone else's computer, even if temporarily.
2.  **Client-Side Processing:** All the work happens directly in your web browser using JavaScript or WebAssembly. Your data never leaves your computer.

### Why Client-Side is Better for Privacy

At Toolzen, we are committed to client-side processing for all our file-based tools. This means:

-   **Total Privacy:** We never see or store your files.
-   **Enhanced Security:** There's no risk of a server breach exposing your data.
-   **Faster Performance:** Processing happens on your device, often resulting in quicker results without waiting for uploads/downloads.

Next time you use an online utility, check their privacy policy to see how they handle your data. Choose client-side tools whenever possible.`,
    },
    {
        slug: 'mastering-text-conversion',
        title: 'A Deep Dive into Text Conversion Tools',
        excerpt: 'From changing case to encoding URLs, text conversion tools are a developer\'s best friend. Explore the most useful utilities and how they work.',
        date: '2024-07-28',
        image: 'https://picsum.photos/seed/blog4/800/600',
        imageHint: 'text editing',
        author: 'Toolzen Team',
        category: 'Developer Tools',
        content: `
## Why Text Tools Matter

In the world of web development, marketing, and content creation, text is everywhere. Manipulating it efficiently can save hours of manual work.

### Essential Text Utilities

- **[Case Converter](/tools/case-converter):** Quickly switch between SENTENCE CASE, lowercase, UPPERCASE, and Title Case. Indispensable for formatting headlines and content.
- **[URL Encoder/Decoder](/tools/url-encoder-decoder):** Ensures that special characters in URLs are transmitted correctly, preventing broken links and errors.
- **[Word Counter](/tools/word-counter):** Essential for SEO, academic writing, and social media. Instantly get word, character, sentence, and paragraph counts.

All these tools work client-side, making them blazingly fast and completely secure.
`,
    },
    {
        slug: 'choosing-the-right-hash-algorithm',
        title: 'Choosing the Right Hash Algorithm: MD5, SHA-1, SHA-256',
        excerpt: 'Hashing is fundamental to data integrity and security. This guide breaks down the differences between popular hashing algorithms and helps you choose the right one.',
        date: '2024-07-20',
        image: 'https://picsum.photos/seed/blog5/800/600',
        imageHint: 'cyber security',
        author: 'Toolzen Team',
        category: 'Security',
        content: `
## What is Hashing?

A hash function takes an input (like text or a file) and returns a fixed-size string of bytes. The output, called a hash, is unique to the input. Even a tiny change in the input will produce a completely different hash.

### Common Algorithms

- **MD5:** Now considered insecure and should not be used for security purposes due to collision vulnerabilities. Still sometimes used for file checksums.
- **SHA-1:** Also considered weak and deprecated for most security uses.
- **SHA-256 / SHA-512:** Part of the SHA-2 family, these are the current standards for most cryptographic applications, including SSL certificates and password storage.

### Which One Should You Use?

For any security-related application, **SHA-256** is the minimum standard you should use. It offers a great balance of security and performance. Our [Hash Generator](/tools/hash-generator) lets you experiment with all these formats safely in your browser.`,
    },
];

export const postMap = new Map(mockPosts.map(post => [post.slug, post]));
