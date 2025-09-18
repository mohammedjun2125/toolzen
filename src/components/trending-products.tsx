'use client';

import { trendingProducts, Product } from '@/lib/products';
import Image from 'next/image';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';

function ProductCard({ product }: { product: Product }) {
    return (
        <article className="h-full flex flex-col group bg-card/60 backdrop-blur-lg rounded-lg border shadow-lg transition-all duration-300 ease-in-out hover:shadow-primary/20 hover:scale-105">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org/",
                        "@type": "Product",
                        "name": product.title,
                        "image": product.image,
                        "description": product.description,
                        "brand": {
                            "@type": "Brand",
                            "name": product.brand
                        },
                        "offers": {
                            "@type": "Offer",
                            "url": product.amazonLink,
                            "priceCurrency": product.currency,
                            "price": product.price,
                            "availability": "https://schema.org/InStock"
                        }
                    })
                }}
            />
            <div className="relative w-full aspect-square rounded-t-lg overflow-hidden">
                <Image
                    src={product.image}
                    alt={product.title}
                    fill
                    className="object-cover"
                    data-ai-hint={product.imageHint}
                />
            </div>
            <div className="p-3 flex flex-col flex-grow">
                <h3 className="text-base font-semibold text-foreground">{product.title}</h3>
                <p className="text-xs text-muted-foreground mt-1 flex-grow">{product.description}</p>
                <div className="mt-3">
                    <a
                        href={product.amazonLink}
                        target="_blank"
                        rel="nofollow sponsored"
                        className="w-full"
                    >
                        <Button className="w-full" size="sm">View on Amazon</Button>
                    </a>
                </div>
            </div>
        </article>
    );
}


export default function TrendingProducts() {
    return (
        <section>
            <h2 className="text-3xl font-bold text-center mb-8">🔥 Trending Products</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {trendingProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>
            <div className="text-center mt-8">
                <p className="text-xs text-muted-foreground">
                    As an Amazon Associate, we earn from qualifying purchases. This does not affect the price you pay.
                </p>
            </div>
        </section>
    );
}
