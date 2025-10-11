import { Product } from '@src/@types/common';
import { ProductImageGallery, ProductTabs, ProductInfo, RelatedProducts } from '@components/themes/default';


const mockProduct: Product = {
    id: '1',
    name: 'Premium Wireless Headphones',
    description: 'High-quality wireless headphones with active noise cancellation, premium sound quality, and long-lasting battery life. Perfect for music lovers and professionals.',
    price: 299.99,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&h=800&fit=crop',
    category: 'Electronics',
    vendorId: '1',
    vendor: {
        id: '1',
        name: 'TechStore Pro',
        email: 'tech@store.com',
        description: 'Premium electronics retailer',
        logo: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=100&h=100&fit=crop',
        rating: 4.8,
        products: []
    },
    stock: 25,
    rating: 4.7,
    reviews: 342
};

export default function ProductDetailsPage() {
    const product = mockProduct;

    const images = [
        'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&h=800&fit=crop',
        'https://images.unsplash.com/photo-1484704849700-f032a568e944?w=800&h=800&fit=crop',
        'https://images.unsplash.com/photo-1583394838336-acd977736f90?w=800&h=800&fit=crop'
    ];



    const relatedProducts: Product[] = [
        {
            id: '2',
            name: 'Smart Fitness Watch',
            description: 'Advanced fitness tracking with heart rate monitoring',
            price: 199.99,
            image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop',
            category: 'Electronics',
            vendorId: '1',
            vendor: {
                id: '1',
                name: 'TechStore Pro',
                email: 'tech@store.com',
                description: 'Premium electronics retailer',
                logo: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=100&h=100&fit=crop',
                rating: 4.8,
                products: []
            },
            stock: 15,
            rating: 4.5,
            reviews: 128
        },
        {
            id: '3',
            name: 'Wireless Earbuds Pro',
            description: 'Premium wireless earbuds with noise cancellation',
            price: 149.99,
            image: 'https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?w=400&h=400&fit=crop',
            category: 'Electronics',
            vendorId: '1',
            vendor: {
                id: '1',
                name: 'TechStore Pro',
                email: 'tech@store.com',
                description: 'Premium electronics retailer',
                logo: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=100&h=100&fit=crop',
                rating: 4.8,
                products: []
            },
            stock: 32,
            rating: 4.6,
            reviews: 89
        },
        {
            id: '4',
            name: 'Bluetooth Speaker',
            description: 'Portable wireless speaker with premium sound',
            price: 79.99,
            image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400&h=400&fit=crop',
            category: 'Electronics',
            vendorId: '1',
            vendor: {
                id: '1',
                name: 'TechStore Pro',
                email: 'tech@store.com',
                description: 'Premium electronics retailer',
                logo: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=100&h=100&fit=crop',
                rating: 4.8,
                products: []
            },
            stock: 18,
            rating: 4.4,
            reviews: 156
        },
        {
            id: '5',
            name: 'Gaming Headset',
            description: 'Professional gaming headset with RGB lighting',
            price: 129.99,
            image: 'https://images.unsplash.com/photo-1599669454699-248893623440?w=400&h=400&fit=crop',
            category: 'Electronics',
            vendorId: '1',
            vendor: {
                id: '1',
                name: 'TechStore Pro',
                email: 'tech@store.com',
                description: 'Premium electronics retailer',
                logo: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=100&h=100&fit=crop',
                rating: 4.8,
                products: []
            },
            stock: 22,
            rating: 4.3,
            reviews: 94
        },
        {
            id: '6',
            name: 'Wireless Mouse',
            description: 'Ergonomic wireless mouse with precision tracking',
            price: 49.99,
            image: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=400&h=400&fit=crop',
            category: 'Electronics',
            vendorId: '1',
            vendor: {
                id: '1',
                name: 'TechStore Pro',
                email: 'tech@store.com',
                description: 'Premium electronics retailer',
                logo: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=100&h=100&fit=crop',
                rating: 4.8,
                products: []
            },
            stock: 45,
            rating: 4.2,
            reviews: 67
        },
        {
            id: '7',
            name: 'Mechanical Keyboard',
            description: 'RGB mechanical keyboard with tactile switches',
            price: 159.99,
            image: 'https://images.unsplash.com/photo-1541140532154-b024d705b90a?w=400&h=400&fit=crop',
            category: 'Electronics',
            vendorId: '1',
            vendor: {
                id: '1',
                name: 'TechStore Pro',
                email: 'tech@store.com',
                description: 'Premium electronics retailer',
                logo: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=100&h=100&fit=crop',
                rating: 4.8,
                products: []
            },
            stock: 28,
            rating: 4.7,
            reviews: 203
        }
    ];


    return (
        <div className="py-8">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    <ProductImageGallery images={images} productName={product.name} />
                    <ProductInfo product={product} />
                </div>

                <ProductTabs product={product} />

                <RelatedProducts products={relatedProducts} />
            </div>
        </div>
    );
}