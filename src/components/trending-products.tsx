'use client';

import { trendingProducts, Product } from '@/lib/products';
import Image from 'next/image';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';

function ProductCard({ product }: { product: Product }) {
    return (
        <article className="h-full flex flex-col group bg-card/60 backdrop-blur-lg rounded-lg border shadow-sm transition-all duration-300 ease-in-out hover:shadow-primary/20 hover:scale-105 overflow-hidden">
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
                            "url": product.affiliateLink,
                            "priceCurrency": product.currency,
                            "price": product.price,
                            "availability": "https://schema.org/InStock"
                        }
                    })
                }}
            />
            <div className="relative w-full aspect-[4/3] rounded-t-lg overflow-hidden">
                {product.image ? (
                    <Image
                        src={product.image}
                        alt={product.title}
                        fill
                        className="object-cover"
                        data-ai-hint={product.imageHint}
                    />
                ) : (
                    <div className="w-full h-full bg-muted flex items-center justify-center">
                        <span className="text-xs text-muted-foreground">No Image</span>
                    </div>
                )}
            </div>
            <div className="p-3 flex flex-col flex-grow">
                <h3 className="text-sm font-semibold text-foreground leading-tight">{product.title}</h3>
                <p className="text-xs text-muted-foreground mt-1 flex-grow">{product.description}</p>
                <div className="mt-3">
                    <a
                        href={product.affiliateLink}
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
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
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
