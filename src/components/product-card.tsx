'use client';

import type { Product } from '@/lib/products';
import Image from 'next/image';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';

export function ProductCard({ product }: { product: Product }) {
    return (
        <Card className="h-full flex flex-col group overflow-hidden transition-all duration-300 ease-in-out hover:shadow-primary/20 hover:scale-105 bg-card/60 backdrop-blur-lg">
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
                            "availability": "https://schema.org/InStock",
                            "seller": {
                                "@type": "Organization",
                                "name": "Amazon"
                            }
                        }
                    })
                }}
            />
            <CardContent className="p-0 flex flex-col flex-grow">
                <div className="relative w-full aspect-[4/3]">
                    <Image
                        src={product.image || 'https://picsum.photos/seed/placeholder/400/300'}
                        alt={product.title}
                        fill
                        className="object-cover"
                        data-ai-hint={product.imageHint}
                        sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                    />
                </div>
                <div className="p-4 flex flex-col flex-grow">
                    <h3 className="text-base font-semibold text-foreground leading-tight group-hover:text-primary">{product.title}</h3>
                    <p className="text-sm text-muted-foreground mt-2 flex-grow">{product.description}</p>
                    <div className="flex justify-between items-center mt-4">
                        <p className="text-lg font-bold text-foreground">{product.currency}{product.price}</p>
                         <a
                            href={product.affiliateLink}
                            target="_blank"
                            rel="nofollow sponsored"
                        >
                            <Button size="sm">Buy Now</Button>
                        </a>
                    </div>
                </div>
            </CardContent>
             <div className="text-center text-xs text-muted-foreground p-2 border-t">
                As an Amazon Associate, we earn from qualifying purchases.
            </div>
        </Card>
    );
}
