'use client';

import { useState, useEffect } from 'react';
import { ArrowRight } from 'lucide-react';
import { Product } from '@src/@types/common';
import ProductCard from '@src/components/core/ProductCard';
import Link from 'next/link';

const featuredProducts: Product[] = [
  {
    id: '1',
    name: 'Premium Wireless Headphones',
    description: 'High-quality wireless headphones with active noise cancellation',
    price: 299.99,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop',
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
  },
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
    name: 'Organic Coffee Blend',
    description: 'Premium organic coffee beans from Colombian highlands',
    price: 34.99,
    image: 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=400&h=400&fit=crop',
    category: 'Food',
    vendorId: '2',
    vendor: {
      id: '2',
      name: 'Artisan Coffee Co',
      email: 'hello@coffee.com',
      description: 'Specialty coffee roasters',
      logo: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=100&h=100&fit=crop',
      rating: 4.9,
      products: []
    },
    stock: 50,
    rating: 4.9,
    reviews: 567
  },
  {
    id: '4',
    name: 'Designer Backpack',
    description: 'Stylish and functional backpack for everyday use',
    price: 89.99,
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=400&fit=crop',
    category: 'Fashion',
    vendorId: '3',
    vendor: {
      id: '3',
      name: 'Urban Style',
      email: 'info@urbanstyle.com',
      description: 'Contemporary fashion accessories',
      logo: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=100&h=100&fit=crop',
      rating: 4.4,
      products: []
    },
    stock: 30,
    rating: 4.6,
    reviews: 89
  }
];

export default function FeaturedProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setProducts(featuredProducts);
      setLoading(false);
    }, 500);
  }, []);

  if (loading) {
    return (
      <section className="max-w-7xl mx-auto px-4">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-64 mb-8"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="bg-gray-200 dark:bg-gray-700 rounded-xl h-96"></div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="max-w-7xl mx-auto px-4">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Featured Products
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Hand-picked products from our top vendors
          </p>
        </div>
        <Link
          href="/products"
          className="flex items-center text-primary-600 hover:text-primary-700 font-medium"
        >
          View All <ArrowRight className="ml-1 h-4 w-4" />
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} featured={true} />
        ))}
      </div>
    </section>
  );
}