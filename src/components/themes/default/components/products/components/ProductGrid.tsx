'use client';

import { useState } from 'react';
import ProductCard from '@src/components/core/ProductCard';
import { Grid3X3, LayoutGrid, ChevronDown } from 'lucide-react';
import Card from '@src/components/core/card/card';
import { useQuery } from '@tanstack/react-query';
import { fetchProducts } from '@src/actions';
import { Product } from '@src/@types/common';
// Mock data - replace with API call


export default function ProductGrid() {
  const [sortBy, setSortBy] = useState('name');
  const [gridCols, setGridCols] = useState<2 | 3 | 4>(3);

  const { data: products, isLoading: loading
  } = useQuery({
    queryKey: ['products'],
    select: (data) => data.products,
    queryFn: () => fetchProducts({})
  });

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
        {products.map((product: Product) => (
          <ProductCard key={product.id} product={product} showQuickView={true} />
        ))}
      </div>
    </div>
  );
}