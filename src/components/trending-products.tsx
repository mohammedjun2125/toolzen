
'use client';

import { trendingProducts, Product } from '@/lib/products';
import Image from 'next/image';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { ProductCard } from './product-card';
import Link from 'next/link';


export default function TrendingProducts() {
    return (
        <section>
            <h2 className="text-3xl font-bold text-center mb-8">🔥 Trending Products</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                {trendingProducts.map((product) => (
                    <ProductCard product={product} key={product.id} />
                ))}
            </div>
             <div className="text-center mt-12">
                <Button asChild size="lg">
                    <Link href="/products">View All Products</Link>
                </Button>
            </div>
            <div className="text-center mt-8">
                <p className="text-xs text-muted-foreground">
                    As an Amazon Associate, we earn from qualifying purchases. This does not affect the price you pay.
                </p>
            </div>
        </section>
    );
}
