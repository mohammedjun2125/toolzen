
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { SiteHeader } from '@/components/site-header';
import { SiteFooter } from '@/components/site-footer';
import { mockPosts, postMap } from '@/lib/blog';
import { Badge } from '@/components/ui/badge';
import Image from 'next/image';
import { marked } from 'marked';
import { tools } from '@/lib/tools';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import TrendingProducts from '@/components/trending-products';

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
  const htmlContent = marked.parse(post.content);
  // Simple logic to insert an ad after the first paragraph
  const contentParts = htmlContent.split('</p>');
  const adPlaceholder = `
    <div id="ad-in-article" class="hidden my-8 min-h-[250px] min-w-[300px] max-w-full mx-auto flex items-center justify-center text-muted-foreground bg-muted/20 rounded-lg">
      <div class="text-center">
        <p>In-Article Ad</p>
        <p class="text-xs">(e.g., Fluid or Responsive)</p>
      </div>
      <ins class="adsbygoogle"
            style="display: block; text-align: center;"
            data-ad-layout="in-article"
            data-ad-format="fluid"
            data-ad-client="ca-pub-XXXXXXXXXXXXXXXX"
            data-ad-slot="1234567890"></ins>
    </div>
  `;
  const contentWithAd = contentParts.length > 2
    ? contentParts.slice(0, 2).join('</p>') + '</p>' + adPlaceholder + contentParts.slice(2).join('</p>')
    : htmlContent;


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
                <div id="ad-article-sidebar-left" className="hidden sticky top-20 min-h-[600px] w-full flex items-center justify-center text-muted-foreground bg-muted/20 rounded-lg">
                    <div className="text-center">
                        <p>Left Sidebar Ad</p>
                        <p className="text-xs">(e.g., 160x600)</p>
                    </div>
                    <ins class="adsbygoogle"
                         style={{ display: 'none' }}
                         data-ad-client="ca-pub-XXXXXXXXXXXXXXXX"
                         data-ad-slot="1234567890"
                         data-ad-format="auto"
                         data-full-width-responsive="true"></ins>
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
                <p className="mt-4 text-muted-foreground">{new Date(post.date).toLocaleDateString()} by {post.author}</p>
            </header>
            
            <div className="relative w-full h-64 md:h-96 mb-8 rounded-lg overflow-hidden">
                <Image 
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover"
                    priority
                    data-ai-hint={post.imageHint}
                />
            </div>

            <div 
                className="prose dark:prose-invert max-w-none"
                dangerouslySetInnerHTML={{ __html: contentWithAd }}
            />

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
                <div id="ad-article-sidebar-right" className="hidden sticky top-20 min-h-[600px] w-full flex items-center justify-center text-muted-foreground bg-muted/20 rounded-lg">
                    <div className="text-center">
                        <p>Right Sidebar Ad</p>
                        <p className="text-xs">(e.g., 160x600)</p>
                    </div>
                    <ins class="adsbygoogle"
                         style={{ display: 'none' }}
                         data-ad-client="ca-pub-XXXXXXXXXXXXXXXX"
                         data-ad-slot="1234567890"
                         data-ad-format="auto"
                         data-full-width-responsive="true"></ins>
                </div>
            </aside>
        </div>
      </main>
      <SiteFooter />
    </div>
    </>
  );
}
