

import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { SiteHeader } from '@/components/site-header';
import { SiteFooter } from '@/components/site-footer';
import { mockPosts, postMap } from '@/lib/blog';
import { Badge } from '@/components/ui/badge';
import Image from 'next/image';
import { tools } from '@/lib/tools';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import TrendingProducts from '@/components/trending-products';
import ReactMarkdown from 'react-markdown';

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
        canonical: `https://www.toolzenweb.com/blog/${post.slug}`,
    },
    openGraph: {
      title,
      description,
      type: 'article',
      url: `https://www.toolzenweb.com/blog/${post.slug}`,
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
  
  const relatedTool = tools.find(tool => post.content.includes(tool.href));

  return (
    <>
    <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify({
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
                    "url": "https://www.toolzenweb.com/favicon.svg"
                }
            },
            "datePublished": post.date,
            "description": post.excerpt
        })}}
    />
    <div className="flex flex-col min-h-screen">
      <SiteHeader />
      <main className="flex-1 container mx-auto px-4 md:px-6 py-12">
        <div className="grid grid-cols-12 gap-8">
            <aside className="hidden lg:block lg:col-span-2">
                 <div className="sticky top-20 hidden">
                    <div className="bg-muted/30 rounded-lg p-4 text-center h-[600px] flex items-center justify-center">
                        <div>
                            <p className="text-sm text-muted-foreground">Advertisement</p>
                            <p className="text-xs text-muted-foreground">(160x600)</p>
                        </div>
                    </div>
                </div>
            </aside>

            <article className="col-span-12 lg:col-span-8">
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

            <div className="prose dark:prose-invert max-w-none">
              <ReactMarkdown>{post.content}</ReactMarkdown>
            </div>

            {relatedTool && (
                <div className="mt-12 text-center p-6 bg-muted/30 rounded-lg">
                    <h3 className="text-xl font-bold mb-2">Try the Tool</h3>
                    <p className="text-muted-foreground mb-4">{relatedTool.description}</p>
                    <Button asChild size="lg">
                        <Link href={relatedTool.href}>
                            Use {relatedTool.name}
                        </Link>
                    </Button>
                </div>
            )}
            <div className="my-12">
              <TrendingProducts />
            </div>
            </article>

            <aside className="hidden lg:block lg:col-span-2">
                 <div className="sticky top-20 hidden">
                    <div className="bg-muted/30 rounded-lg p-4 text-center h-[600px] flex items-center justify-center">
                        <div>
                            <p className="text-sm text-muted-foreground">Advertisement</p>
                             <p className="text-xs text-muted-foreground">(160x600)</p>
                        </div>
                    </div>
                </div>
            </aside>
        </div>
      </main>
      <SiteFooter />
    </div>
    </>
  );
}
