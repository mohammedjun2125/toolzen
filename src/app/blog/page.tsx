'use client';

import Link from 'next/link';
import Image from 'next/image';
import { SiteHeader } from '@/components/site-header';
import { SiteFooter } from '@/components/site-footer';
import { mockPosts } from '@/lib/blog';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import Balancer from 'react-wrap-balancer';

export default function BlogIndexPage() {
  const posts = mockPosts;
  const categories = Array.from(new Set(posts.map(p => p.category)));

  return (
    <div className="flex flex-col min-h-screen">
      <SiteHeader />
      <main className="flex-1 container mx-auto px-4 md:px-6 py-12">
        <Button asChild variant="ghost" className="mb-4">
          <Link href="/">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Home
          </Link>
        </Button>
        <header className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tighter">
            <Balancer>Toolzen Blog</Balancer>
          </h1>
          <p className="max-w-2xl mx-auto mt-4 text-muted-foreground">
            <Balancer>Guides, tips, and articles on web development, design, and online privacy.</Balancer>
          </p>
        </header>

        <div className="grid grid-cols-12 gap-8">
            <aside className="hidden lg:block lg:col-span-2">
                 <div className="sticky top-20">
                    <div className="bg-muted/30 rounded-lg p-4 text-center h-[600px] flex items-center justify-center">
                        <div>
                            <p className="text-sm text-muted-foreground">Advertisement</p>
                            <p className="text-xs text-muted-foreground">(160x600)</p>
                        </div>
                    </div>
                </div>
            </aside>

            <div className="col-span-12 lg:col-span-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                    {posts.map((post) => (
                        <Link href={`/blog/${post.slug}`} key={post.slug} className="group">
                            <article className="border rounded-lg h-full flex flex-col transition-all duration-300 ease-in-out group-hover:scale-105 group-hover:shadow-2xl group-hover:shadow-primary/20 bg-card/60 backdrop-blur-lg">
                                {post.image && (
                                    <div className="relative w-full h-48 rounded-t-lg overflow-hidden">
                                        <Image
                                            src={post.image}
                                            alt={post.title}
                                            fill
                                            className="object-cover"
                                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                            data-ai-hint={post.imageHint}
                                        />
                                    </div>
                                )}
                                <div className="p-6 flex flex-col flex-grow">
                                    <h2 className="text-xl font-semibold"><Balancer>{post.title}</Balancer></h2>
                                    <p className="text-sm text-muted-foreground mt-2">{new Date(post.date).toLocaleDateString()} &middot; {post.author}</p>
                                    <p className="text-sm mt-3 flex-grow line-clamp-3">{post.excerpt}</p>
                                    <div className="mt-4">
                                        <Badge variant="outline">{post.category}</Badge>
                                    </div>
                                </div>
                            </article>
                        </Link>
                    ))}
                </div>
            </div>

            <aside className="col-span-12 lg:col-span-2 space-y-8">
                <Card className="bg-card/60 backdrop-blur-lg">
                    <CardHeader>
                        <CardTitle>Search</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Input placeholder="Search articles..." />
                    </CardContent>
                </Card>

                <Card className="bg-card/60 backdrop-blur-lg">
                    <CardHeader>
                        <CardTitle>Categories</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ul className="space-y-2">
                            {categories.map(cat => (
                                <li key={cat}>
                                    <Link href="#" className="text-muted-foreground hover:text-primary">{cat}</Link>
                                </li>
                            ))}
                        </ul>
                    </CardContent>
                </Card>

            </aside>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
