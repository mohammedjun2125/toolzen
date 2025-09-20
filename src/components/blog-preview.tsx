'use client';

import type { Post } from '@/lib/blog';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from './ui/button';

export function BlogPreview({ posts }: { posts: Post[] }) {
  if (!posts || posts.length === 0) {
    return null;
  }

  return (
    <section id="blog-preview" className="container mx-auto px-4 md:px-6 py-12">
      <h2 className="text-3xl font-bold text-center mb-8">Helpful Guides & Articles</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {posts.slice(0, 3).map((post, index) => (
          <Link href={`/blog/${post.slug}`} key={post.slug} className="group">
            <article className="border rounded-lg p-4 h-full flex flex-col transition-all duration-300 ease-in-out group-hover:scale-105 group-hover:shadow-2xl group-hover:shadow-primary/20 bg-card/60 backdrop-blur-lg">
              {post.image && (
                <div className="relative w-full h-48 mb-4 rounded-md overflow-hidden">
                    <Image
                        src={post.image}
                        alt={post.title}
                        fill
                        className="object-cover"
                        data-ai-hint={post.imageHint}
                        sizes="(max-width: 768px) 100vw, 33vw"
                        priority={index === 0}
                    />
                </div>
              )}
              <h3 className="text-lg font-semibold">{post.title}</h3>
              <p className="text-sm text-muted-foreground mt-2 flex-grow line-clamp-3">{post.excerpt}</p>
              <div className="mt-4 text-sm font-semibold text-primary group-hover:underline">
                Read more →
              </div>
            </article>
          </Link>
        ))}
      </div>
      <div className="text-center mt-12">
        <Button asChild size="lg">
          <Link href="/blog">View All Posts</Link>
        </Button>
      </div>
    </section>
  );
}
