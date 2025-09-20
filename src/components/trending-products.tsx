
'use client';

import { trendingProducts, Product } from '@/lib/products';
import Image from 'next/image';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { ProductCard } from './product-card';


export default function TrendingProducts() {
    return (
        <section>
            <h2 className="text-3xl font-bold text-center mb-8">🔥 Trending Products</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                {trendingProducts.map((product) => (
                    <div key={product.id}>
                        <script
                            type="application/ld+json"
                            dangerouslySetInnerHTML={{
                                __html: JSON.stringify({
                                    "@context": "https://schema.org/",
                                    "@type": "Product",
                                    "name": product.title,
                                    "image": product.images,
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
                        <ProductCard product={product} />
                    </div>
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
