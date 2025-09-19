
import products from './products.json';

export interface Product {
    id: string;
    title: string;
    description: string;
    image: string;
    imageHint: string;
    affiliateLink: string;
    brand: string;
    price: string;
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
