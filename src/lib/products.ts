
import products from './products.json';

export interface Product {
    id: string;
    title: string;
    description: string;
    images: string[];
    imageHint: string;
    affiliateLink: string;
    brand: string;
    price: string;
    originalPrice?: string;
    currency: string;
}

export interface ProductCategory {
    name: string;
    slug: string;
    description: string;
    seo: {
        title: string;
        metaDescription: string;
        keywords: string[];
    };
    faq: {
        question: string;
        answer: string;
    }[];
    products: Product[];
}

export interface ProductsData {
    categories: ProductCategory[];
}

export const productsData: ProductsData = products as ProductsData;

export const categoryMap = new Map(productsData.categories.map(cat => [cat.slug, cat]));

// Select a few products to feature as "trending"
export const trendingProducts: Product[] = [
    ...productsData.categories[0].products.slice(0, 2), // 2 from electronics
    ...productsData.categories[1].products.slice(0, 1), // 1 from home
    ...productsData.categories[2].products.slice(0, 1), // 1 from books
];
