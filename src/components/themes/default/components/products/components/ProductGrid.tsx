'use client';

import { useState, useEffect } from 'react';
import ProductCard from '@src/components/core/ProductCard';
import { Product } from '@src/@types/common';
import { Grid3X3, LayoutGrid, ChevronDown } from 'lucide-react';
import Card from '@src/components/core/card/card';

// Mock data - replace with API call
const mockProducts: Product[] = [
  {
    id: '1',
    name: 'Wireless Headphones',
    description: 'High-quality wireless headphones with noise cancellation',
    price: 199.99,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop',
    category: 'Electronics',
    vendorId: '1',
    vendor: {
      id: '1',
      name: 'TechStore',
      email: 'tech@store.com',
      description: 'Electronics specialist',
      logo: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=100&h=100&fit=crop',
      rating: 4.5,
      products: []
    },
    stock: 50,
    rating: 4.5,
    reviews: 128
  },
  {
    id: '2',
    name: 'Smart Watch',
    description: 'Feature-rich smartwatch with health monitoring',
    price: 299.99,
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop',
    category: 'Electronics',
    vendorId: '1',
    vendor: {
      id: '1',
      name: 'TechStore',
      email: 'tech@store.com',
      description: 'Electronics specialist',
      logo: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=100&h=100&fit=crop',
      rating: 4.5,
      products: []
    },
    stock: 30,
    rating: 4.7,
    reviews: 89
  },
  {
    id: '3',
    name: 'Organic Coffee Beans',
    description: 'Premium organic coffee beans from Colombia',
    price: 24.99,
    image: 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=400&h=400&fit=crop',
    category: 'Food',
    vendorId: '2',
    vendor: {
      id: '2',
      name: 'Coffee Co',
      email: 'hello@coffee.com',
      description: 'Premium coffee supplier',
      logo: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=100&h=100&fit=crop',
      rating: 4.8,
      products: []
    },
    stock: 100,
    rating: 4.9,
    reviews: 256
  },
  {
    id: '4',
    name: 'Gaming Laptop',
    description: 'High-performance gaming laptop with RTX graphics',
    price: 1299.99,
    image: 'https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=400&h=400&fit=crop',
    category: 'Electronics',
    vendorId: '1',
    vendor: {
      id: '1',
      name: 'TechStore',
      email: 'tech@store.com',
      description: 'Electronics specialist',
      logo: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=100&h=100&fit=crop',
      rating: 4.5,
      products: []
    },
    stock: 15,
    rating: 4.8,
    reviews: 67
  },
  {
    id: '5',
    name: 'Designer Sunglasses',
    description: 'Premium UV protection sunglasses with polarized lenses',
    price: 149.99,
    image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=400&h=400&fit=crop',
    category: 'Fashion',
    vendorId: '3',
    vendor: {
      id: '3',
      name: 'Fashion Hub',
      email: 'info@fashionhub.com',
      description: 'Trendy fashion accessories',
      logo: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=100&h=100&fit=crop',
      rating: 4.3,
      products: []
    },
    stock: 40,
    rating: 4.4,
    reviews: 92
  },
  {
    id: '6',
    name: 'Yoga Mat Set',
    description: 'Eco-friendly yoga mat with carrying strap and blocks',
    price: 79.99,
    image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400&h=400&fit=crop',
    category: 'Sports',
    vendorId: '4',
    vendor: {
      id: '4',
      name: 'Wellness Store',
      email: 'contact@wellness.com',
      description: 'Health and wellness products',
      logo: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=100&h=100&fit=crop',
      rating: 4.6,
      products: []
    },
    stock: 25,
    rating: 4.7,
    reviews: 134
  },
  {
    id: '7',
    name: 'Ceramic Plant Pot',
    description: 'Handcrafted ceramic pot perfect for indoor plants',
    price: 39.99,
    image: 'https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=400&h=400&fit=crop',
    category: 'Home & Garden',
    vendorId: '5',
    vendor: {
      id: '5',
      name: 'Home Decor Plus',
      email: 'hello@homedecor.com',
      description: 'Beautiful home decoration items',
      logo: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=100&h=100&fit=crop',
      rating: 4.2,
      products: []
    },
    stock: 60,
    rating: 4.3,
    reviews: 78
  },
  {
    id: '8',
    name: 'Bestseller Novel',
    description: 'Award-winning fiction novel by renowned author',
    price: 16.99,
    image: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=400&fit=crop',
    category: 'Books',
    vendorId: '6',
    vendor: {
      id: '6',
      name: 'Book Haven',
      email: 'info@bookhaven.com',
      description: 'Curated collection of books',
      logo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop',
      rating: 4.7,
      products: []
    },
    stock: 80,
    rating: 4.6,
    reviews: 203
  }
];

export default function ProductGrid() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState('name');
  const [gridCols, setGridCols] = useState<2 | 3 | 4>(3);

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setProducts(mockProducts);
      setLoading(false);
    }, 1000);
  }, []);

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(8)].map((_, i) => (
          <div key={i} className="animate-pulse">
            <div className="bg-gray-200 dark:bg-gray-700 rounded-lg h-64 mb-4"></div>
            <div className="bg-gray-200 dark:bg-gray-700 rounded h-4 mb-2"></div>
            <div className="bg-gray-200 dark:bg-gray-700 rounded h-4 w-2/3"></div>
          </div>
        ))}
      </div>
    );
  }

  const gridClasses: Record<2 | 3 | 4, string> = {
    2: 'grid-cols-1 md:grid-cols-2',
    3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4'
  };

  return (
    <div className="space-y-6">
      {/* Navigation Bar */}
      <Card className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <span className="text-sm text-gray-600 dark:text-gray-400">
              {products.length} products
            </span>
          </div>

          <div className="flex items-center space-x-4">
            {/* Sort Filter */}
            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="appearance-none bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2 pr-8 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="name">Sort by Name</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
                <option value="newest">Newest First</option>
              </select>
              <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
            </div>

            {/* Grid Switcher */}
            <div className="flex items-center border border-gray-300 dark:border-gray-600 rounded-lg">
              <button
                onClick={() => setGridCols(2)}
                className={`p-2 ${gridCols === 2 ? 'bg-blue-500 text-white' : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'} rounded-l-lg transition-colors`}
              >
                <LayoutGrid className="h-4 w-4" />
              </button>
              <button
                onClick={() => setGridCols(3)}
                className={`p-2 ${gridCols === 3 ? 'bg-blue-500 text-white' : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'} transition-colors`}
              >
                <Grid3X3 className="h-4 w-4" />
              </button>
              <button
                onClick={() => setGridCols(4)}
                className={`p-2 ${gridCols === 4 ? 'bg-blue-500 text-white' : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'} rounded-r-lg transition-colors`}
              >
                <div className="grid grid-cols-2 gap-0.5 w-4 h-4">
                  <div className="bg-current w-1.5 h-1.5 rounded-sm"></div>
                  <div className="bg-current w-1.5 h-1.5 rounded-sm"></div>
                  <div className="bg-current w-1.5 h-1.5 rounded-sm"></div>
                  <div className="bg-current w-1.5 h-1.5 rounded-sm"></div>
                </div>
              </button>
            </div>
          </div>
        </div>
      </Card>

      {/* Products Grid */}
      <div className={`grid ${gridClasses[gridCols]} gap-6`}>
        {products.map((product) => (
          <ProductCard key={product.id} product={product} showQuickView={true} />
        ))}
      </div>
    </div>
  );
}