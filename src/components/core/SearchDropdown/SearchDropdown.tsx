'use client';

import React, { useState, useEffect } from 'react';
import { Search, Star, ShoppingCart } from 'lucide-react';
import { useFloating, autoUpdate, offset, flip, shift, useDismiss, useRole, useInteractions } from '@floating-ui/react';
import Input from '@src/components/core/input';
import Image from 'next/image';
import { useDebounce } from '@src/hooks/useDebounce';

interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  rating: number;
  category: string;
  inStock: boolean;
}

interface SearchDropdownProps {
  className?: string;
  placeholder?: string;
}

const mockProducts: Product[] = [
  {
    id: '1',
    name: 'Wireless Bluetooth Headphones',
    price: 99.99,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=60&h=60&fit=crop&crop=center',
    rating: 4.5,
    category: 'Electronics',
    inStock: true,
  },
  {
    id: '2',
    name: 'Smart Fitness Watch',
    price: 199.99,
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=60&h=60&fit=crop&crop=center',
    rating: 4.8,
    category: 'Wearables',
    inStock: true,
  },
  {
    id: '3',
    name: 'Organic Cotton T-Shirt',
    price: 29.99,
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=60&h=60&fit=crop&crop=center',
    rating: 4.2,
    category: 'Clothing',
    inStock: false,
  },
];

export default function SearchDropdown({ className = '', placeholder = 'Search products...' }: SearchDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const debouncedSearchQuery = useDebounce(searchQuery, 300);

  const { refs, floatingStyles, context } = useFloating({
    open: isOpen,
    onOpenChange: setIsOpen,
    middleware: [offset(5), flip(), shift()],
    whileElementsMounted: autoUpdate,
  });

  const dismiss = useDismiss(context);
  const role = useRole(context);
  const { getReferenceProps, getFloatingProps } = useInteractions([dismiss, role]);

  useEffect(() => {
    if (debouncedSearchQuery.trim()) {
      const filtered = mockProducts.filter(product =>
        product.name.toLowerCase().includes(debouncedSearchQuery.toLowerCase()) ||
        product.category.toLowerCase().includes(debouncedSearchQuery.toLowerCase())
      );
      setFilteredProducts(filtered);
      setIsOpen(true);
    } else {
      setFilteredProducts([]);
      setIsOpen(false);
    }
  }, [debouncedSearchQuery]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleProductClick = (product: Product) => {
    setIsOpen(false);
    setSearchQuery('');
  };

  return (
    <div className={`relative w-full ${className}`}>
      <div ref={refs.setReference} {...getReferenceProps()}>
        <Search className="absolute z-10 left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
        <Input
          type="text"
          placeholder={placeholder}
          value={searchQuery}
          onChange={handleInputChange}
          className="w-full !pl-10 pr-4 py-2 bg-white/60 dark:bg-gray-800/60 backdrop-blur-md border border-gray-200/50 dark:border-gray-700/50 rounded-lg text-gray-900 dark:text-white placeholder-gray-500 focus:ring-1 focus:ring-blue-500/30 focus:border-blue-500/50 transition-all duration-200"
        />
      </div>

      {isOpen && (
        <div
          ref={refs.setFloating}
          style={floatingStyles}
          {...getFloatingProps()}
          className="z-50 w-full min-w-[400px] bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 backdrop-blur-md"
        >
          <div className="p-2">
            <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 px-3 py-2 border-b border-gray-100 dark:border-gray-700">
              Search Results ({filteredProducts.length})
            </h3>
            <div className="max-h-80 overflow-y-auto">
              {filteredProducts.length > 0 ? (
                filteredProducts.map((product) => (
                  <button
                    key={product.id}
                    onClick={() => handleProductClick(product)}
                    className="w-full flex items-center space-x-3 p-3 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg transition-colors text-left"
                  >
                    <div className="relative w-12 h-12 rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-700 flex-shrink-0">
                      <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        className="object-cover"
                        unoptimized
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-medium text-gray-900 dark:text-white truncate">
                        {product.name}
                      </h4>
                      <div className="flex items-center space-x-2 mt-1">
                        <span className="text-xs text-gray-500 dark:text-gray-400">
                          {product.category}
                        </span>
                        <div className="flex items-center space-x-1">
                          <Star className="h-3 w-3 text-yellow-400 fill-current" />
                          <span className="text-xs text-gray-500 dark:text-gray-400">
                            {product.rating}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col items-end space-y-1">
                      <span className="text-sm font-semibold text-gray-900 dark:text-white">
                        ${product.price}
                      </span>
                      <div className="flex items-center space-x-1">
                        {product.inStock ? (
                          <span className="text-xs text-green-600 dark:text-green-400">In Stock</span>
                        ) : (
                          <span className="text-xs text-red-600 dark:text-red-400">Out of Stock</span>
                        )}
                        <ShoppingCart className="h-3 w-3 text-gray-400" />
                      </div>
                    </div>
                  </button>
                ))
              ) : (
                <div className="p-6 text-center">
                  <Search className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                  <p className="text-sm text-gray-500 dark:text-gray-400">No products found</p>
                  <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">Try searching with different keywords</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}