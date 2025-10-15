'use client';

import { useState } from 'react';
import ProductCard from '@src/components/core/ProductCard';
import { Grid3X3, LayoutGrid, Filter, ChevronDown } from 'lucide-react';
import Card from '@src/components/core/card/card';
import { useQuery } from '@tanstack/react-query';
import { fetchProducts } from '@src/actions';
import { Product } from '@src/@types/common';
import Select from '@src/components/core/select';
// Mock data - replace with API call


const getSortLabel = (value: string) => {
  const labels: Record<string, string> = {
    'name': 'Sort by Name',
    'price-low': 'Price: Low to High',
    'price-high': 'Price: High to Low',
    'rating': 'Highest Rated',
    'newest': 'Newest First'
  };
  return labels[value] || 'Sort by Name';
};

export default function ProductGrid() {
  const [sortBy, setSortBy] = useState('name');
  const [gridCols, setGridCols] = useState<2 | 3 | 4>(3);
  const [showMobileFilters, setShowMobileFilters] = useState(false);

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
        <div className="space-y-4">
          {/* Header Row */}
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600 dark:text-gray-400">
              {products.length} products
            </span>
            
            {/* Mobile Filter Button */}
            <button
              onClick={() => setShowMobileFilters(!showMobileFilters)}
              className="sm:hidden flex items-center gap-2 px-3 py-2 text-sm bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
            >
              <Filter className="h-4 w-4" />
              Filters
              <ChevronDown className={`h-4 w-4 transition-transform ${showMobileFilters ? 'rotate-180' : ''}`} />
            </button>

            {/* Desktop Filters */}
            <div className="hidden sm:flex items-center gap-4">
              <div className="w-48 md:w-60">
                <Select
                  value={{ value: sortBy, label: getSortLabel(sortBy) }}
                  size="sm"
                  onChange={(option: any) => setSortBy(option.value)}
                  options={[
                    { value: 'name', label: 'Sort by Name' },
                    { value: 'price-low', label: 'Price: Low to High' },
                    { value: 'price-high', label: 'Price: High to Low' },
                    { value: 'rating', label: 'Highest Rated' },
                    { value: 'newest', label: 'Newest First' }
                  ]}
                  isSearchable={false}
                />
              </div>

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
                    {Array.from({ length: 4 }).map((_, i) => (
                      <div key={i} className="bg-current w-1.5 h-1.5 rounded-sm" />
                    ))}
                  </div>
                </button>
              </div>
            </div>
          </div>

          {/* Mobile Filters Collapse */}
          {showMobileFilters && (
            <div className="sm:hidden space-y-3 pt-3 border-t border-gray-200 dark:border-gray-700">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Sort by
                </label>
                <Select
                  value={{ value: sortBy, label: getSortLabel(sortBy) }}
                  size="sm"
                  onChange={(option: any) => setSortBy(option.value)}
                  options={[
                    { value: 'name', label: 'Sort by Name' },
                    { value: 'price-low', label: 'Price: Low to High' },
                    { value: 'price-high', label: 'Price: High to Low' },
                    { value: 'rating', label: 'Highest Rated' },
                    { value: 'newest', label: 'Newest First' }
                  ]}
                  isSearchable={false}
                />
              </div>
            </div>
          )}
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