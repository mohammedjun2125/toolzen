

import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { SiteHeader } from '@/components/site-header';
import { SiteFooter } from '@/components/site-footer';
import { mockPosts, postMap } from '@/lib/blog';
import { Badge } from '@/components/ui/badge';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { marked } from 'marked';

type Props = {
  params: { slug: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = postMap.get(params.slug);

  if (!post) {
    return { title: 'Post Not Found' };
  }
  
  const title = `${post.title} | Toolzen Blog`;
  const description = post.excerpt;

  return {
    title,
    description,
    alternates: {
        canonical: `https://www.toolzenweb.com/blog/${post.slug}/`,
    },
    openGraph: {
      title,
      description,
      type: 'article',
      url: `https://www.toolzenweb.com/blog/${post.slug}/`,
      publishedTime: post.date,
      authors: [post.author],
      images: [
        {
          url: post.image,
          width: 800,
          height: 600,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [post.image],
    },
  };
}

export function generateStaticParams() {
  return mockPosts.map((post) => ({
    slug: post.slug,
  }));
}

export default function BlogPostPage({ params }: Props) {
  const post = postMap.get(params.slug);

  if (!post) {
    notFound();
  }
  
  const parsedContent = marked(post.content);

  const faqSchema = post.faq && post.faq.length > 0 ? {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": post.faq.map(item => ({
        "@type": "Question",
        "name": item.question,
        "acceptedAnswer": {
            "@type": "Answer",
            "text": item.answer
        }
    }))
  } : null;

  const blogSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": post.title,
    "image": [post.image],
    "author": {
        "@type": "Organization",
        "name": "Toolzen"
    },
    "publisher": {
        "@type": "Organization",
        "name": "Toolzen",
        "logo": {
            "@type": "ImageObject",
            "url": "https://www.toolzenweb.com/logo.png"
        }
    },
    "datePublished": post.date,
    "description": post.excerpt
  };


  return (
    <>
    <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogSchema)}}
    />
    {faqSchema && (
         <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema)}}
        />
    )}
    <div className="flex flex-col min-h-screen">
      <SiteHeader />
      <main className="flex-1 container mx-auto px-4 md:px-6 py-12">
        <div className="max-w-4xl mx-auto">
            <article>
                <Button asChild variant="ghost" className="mb-4">
                <Link href="/blog">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back to Blog
                </Link>
                </Button>
            <header className="mb-8 text-center">
                <Badge variant="outline" className="mb-2">{post.category}</Badge>
                <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl">{post.title}</h1>
            </header>
            
            <div className="relative w-full h-64 md:h-96 mb-8 rounded-lg overflow-hidden">
                <Image 
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover"
                    priority
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 66vw, 800px"
                    data-ai-hint={post.imageHint}
                />
            </div>

            <div 
                className="prose dark:prose-invert max-w-none"
                dangerouslySetInnerHTML={{ __html: parsedContent as string}} 
            />

            </article>
        </div>
      </main>
      <SiteFooter />
    </div>
    </>
  );
}
