'use client';

import { Star, ShoppingCart, Heart } from 'lucide-react';
import { SetAddToCart } from '@src/lib/redux/cart';
import { Product } from '@src/@types/common';
import Button from '@src/components/core/button/button';
import Card from '@src/components/core/card/card';
import Image from 'next/image';
import { useAppDispatch } from '@lib/redux/store';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const dispatch = useAppDispatch();

  const handleAddToCart = () => {
    dispatch(SetAddToCart(product));
  };

  return (
    <Card className="group hover:shadow-lg transition-shadow duration-300 overflow-hidden">
      <div className="relative">
        <div className="aspect-square bg-gray-100 dark:bg-gray-800 relative overflow-hidden">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-300"
          />
        </div>

        {/* Wishlist button */}
        <button className="absolute top-3 right-3 p-2 bg-white dark:bg-gray-800 rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity">
          <Heart className="h-4 w-4 text-gray-600 dark:text-gray-400" />
        </button>

        {/* Vendor badge */}
        <div className="absolute top-3 left-3 bg-primary-600 text-white px-2 py-1 rounded-md text-xs font-medium">
          {product.vendor.name}
        </div>
      </div>

      <div className="p-4">
        <h3 className="font-semibold text-gray-900 dark:text-white mb-2 line-clamp-2">
          {product.name}
        </h3>

        <p className="text-sm text-gray-600 dark:text-gray-400 mb-3 line-clamp-2">
          {product.description}
        </p>

        {/* Rating */}
        <div className="flex items-center mb-3">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`h-4 w-4 ${i < Math.floor(product.rating)
                  ? 'text-yellow-400 fill-current'
                  : 'text-gray-300 dark:text-gray-600'
                  }`}
              />
            ))}
          </div>
          <span className="text-sm text-gray-600 dark:text-gray-400 ml-2">
            ({product.reviews})
          </span>
        </div>

        {/* Price and Add to Cart */}
        <div className="flex items-center justify-between">
          <div>
            <span className="text-2xl font-bold text-gray-900 dark:text-white">
              ${product.price}
            </span>
          </div>

          <Button
            onClick={handleAddToCart}
            size="sm"
            className="flex items-center space-x-1"
          >
            <ShoppingCart className="h-4 w-4" />
            <span>Add</span>
          </Button>
        </div>

        {/* Stock indicator */}
        <div className="mt-2">
          <span className={`text-xs ${product.stock > 10
            ? 'text-green-600 dark:text-green-400'
            : product.stock > 0
              ? 'text-yellow-600 dark:text-yellow-400'
              : 'text-red-600 dark:text-red-400'
            }`}>
            {product.stock > 10 ? 'In Stock' : product.stock > 0 ? `Only ${product.stock} left` : 'Out of Stock'}
          </span>
        </div>
      </div>
    </Card>
  );
}