export type Product = {
    id: string;
    title: string;
    description: string;
    image: string;
    imageHint: string;
    amazonLink: string;
    brand: string;
    price: string;
    currency: string;
};

// Placeholder data - replace with your actual product info and affiliate links
export const trendingProducts: Product[] = [
    {
        id: 'prod-001',
        title: 'Smart LED Desk Lamp',
        description: 'A sleek, modern desk lamp with adjustable brightness, color temperature, and a built-in USB charging port. Perfect for any home office or study area.',
        image: 'https://picsum.photos/seed/product1/400/400',
        imageHint: 'desk lamp',
        amazonLink: '#AmazonLink-SmartLamp',
        brand: 'LumiTech',
        price: '39.99',
        currency: 'USD',
    },
    {
        id: 'prod-002',
        title: 'Portable Espresso Maker',
        description: 'Enjoy rich, cafe-quality espresso anywhere. This compact, hand-powered device is perfect for travel, camping, or your daily commute.',
        image: 'https://picsum.photos/seed/product2/400/400',
        imageHint: 'espresso maker',
        amazonLink: '#AmazonLink-EspressoMaker',
        brand: 'BrewGo',
        price: '54.95',
        currency: 'USD',
    },
    {
        id: 'prod-003',
        title: 'Wireless Noise-Cancelling Earbuds',
        description: 'Immerse yourself in sound with these high-fidelity earbuds featuring active noise cancellation, a comfortable fit, and long-lasting battery life.',
        image: 'https://picsum.photos/seed/product3/400/400',
        imageHint: 'wireless earbuds',
        amazonLink: '#AmazonLink-Earbuds',
        brand: 'AudioPhonic',
        price: '89.99',
        currency: 'USD',
    },
    {
        id: 'prod-004',
        title: 'Smart Reusable Notebook',
        description: 'The last notebook you\'ll ever need. Write traditionally, scan your notes to the cloud, and then wipe the page clean to start over.',
        image: 'https://picsum.photos/seed/product4/400/400',
        imageHint: 'smart notebook',
        amazonLink: '#AmazonLink-Notebook',
        brand: 'EverNoteCo',
        price: '29.97',
        currency: 'USD',
    },
    {
        id: 'prod-005',
        title: 'Adjustable Dumbbell Set',
        description: 'Save space with this all-in-one adjustable dumbbell set. Easily switch from 5 to 52.5 lbs for a versatile home workout.',
        image: 'https://picsum.photos/seed/product5/400/400',
        imageHint: 'dumbbell set',
        amazonLink: '#AmazonLink-Dumbbell',
        brand: 'FitFlex',
        price: '199.00',
        currency: 'USD',
    },
    {
        id: 'prod-006',
        title: 'Sunrise Simulation Alarm Clock',
        description: 'Wake up naturally with an alarm clock that simulates the sunrise, gradually brightening your room before the alarm sounds.',
        image: 'https://picsum.photos/seed/product6/400/400',
        imageHint: 'alarm clock',
        amazonLink: '#AmazonLink-AlarmClock',
        brand: 'RiseWell',
        price: '45.99',
        currency: 'USD',
    }
];

export const productMap = new Map(trendingProducts.map(product => [product.id, product]));
