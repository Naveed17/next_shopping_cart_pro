'use client';

import { useState } from 'react';
import { Star, ShoppingCart, Heart, Eye, Tag, Zap, Check, AlertTriangle, X } from 'lucide-react';
import { SetAddToCart } from '@src/lib/redux/cart';
import { Product } from '@src/@types/common';
import Button from '@src/components/core/button/button';
import ImageBlur from '@src/utils/blurImage';
import Link from 'next/link';
import { useAppDispatch } from '@lib/redux/store';
import { getResponsiveSizes } from '@src/utils/imageOptimizer';
import useLocale from '@hooks/useLocale';

interface ProductCardProps {
  product: Product;
  featured?: boolean;
  showQuickView?: boolean;
}

export default function ProductCard({ product, featured = false, showQuickView = true }: ProductCardProps) {
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [showQuickActions, setShowQuickActions] = useState(false);
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const dispatch = useAppDispatch();
  const { locale } = useLocale();
  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsAddingToCart(true);
    dispatch(SetAddToCart(product));
    setTimeout(() => setIsAddingToCart(false), 1500);
  };

  const toggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsWishlisted(!isWishlisted);
  };

  const [discountPercentage] = useState(() => Math.floor(Math.random() * 30) + 10);
  const originalPrice = product.price * (1 + discountPercentage / 100);

  return (
    <div
      className="group relative bg-white dark:bg-gray-800 rounded-lg shadow hover:shadow-lg transition-shadow duration-200 overflow-hidden border border-gray-200 dark:border-gray-700"
      onMouseEnter={() => setShowQuickActions(true)}
      onMouseLeave={() => setShowQuickActions(false)}
    >
      <Link href={`/${locale}/products/${product.id}`}>
        <div className="relative aspect-square overflow-hidden bg-gray-100 dark:bg-gray-800">
          <ImageBlur
            src={product.image}
            alt={product.name}
            fill
            sizes={getResponsiveSizes('card')}
            quality={75}
            className="object-cover"
          />

          <div className="absolute top-3 left-3 flex flex-col gap-2">
            {featured && (
              <span className="bg-blue-600 text-white px-2 py-1 rounded text-xs font-bold flex items-center gap-1">
                <Zap className="h-3 w-3" />
                Featured
              </span>
            )}
            {discountPercentage > 0 && (
              <span className="bg-red-500 text-white px-2 py-1 rounded text-xs font-bold">
                -{discountPercentage}%
              </span>
            )}
            {product.stock < 10 && product.stock > 0 && (
              <span className="bg-orange-500 text-white px-2 py-1 rounded text-xs font-bold">
                Only {product.stock} left
              </span>
            )}
          </div>

          <div className={`absolute top-3 right-3 flex flex-col gap-2 transition-all duration-300 ${showQuickActions ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4'}`}>
            <button
              onClick={toggleWishlist}
              className={`p-2 rounded-full transition-colors ${isWishlisted
                ? 'bg-red-500 text-white'
                : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-red-500 hover:text-white'
                }`}
            >
              <Heart className={`h-4 w-4 ${isWishlisted ? 'fill-current' : ''}`} />
            </button>

            {showQuickView && (
              <button className="p-2 bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-400 rounded-full hover:bg-blue-500 hover:text-white transition-colors">
                <Eye className="h-4 w-4" />
              </button>
            )}
          </div>

          <div className={`absolute bottom-3 left-3 right-3 transition-all duration-300 ${showQuickActions ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            <div className="relative">
              <Button
                onClick={handleAddToCart}
                className={`w-full transition-colors ${isAddingToCart
                    ? 'bg-green-600 text-white hover:bg-green-700'
                    : 'bg-blue-600 text-white hover:bg-blue-700'
                  }`}
                size="sm"
                disabled={isAddingToCart}
              >
                {isAddingToCart ? (
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full mr-2 animate-spin" />
                ) : (
                  <ShoppingCart className="h-4 w-4 mr-2" />
                )}
                {isAddingToCart ? 'Adding...' : 'Quick Add'}
              </Button>
            </div>
          </div>
        </div>

        <div className="relative p-4 bg-white dark:bg-gray-800">
          <div className="flex items-center justify-between mb-3">
            <span className="inline-flex items-center text-xs font-medium text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900 px-2 py-1 rounded">
              <Tag className="h-3 w-3 mr-1" />
              {product.vendor.name}
            </span>
            <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
              <Star className="h-3 w-3 text-yellow-400 fill-current mr-1" />
              {product.vendor.rating}
            </div>
          </div>

          <h3 className="font-bold text-lg text-gray-900 dark:text-white mb-3 line-clamp-1 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors truncate">
            {product.name}
          </h3>

          <p className="text-sm text-gray-600 dark:text-gray-400 mb-3 line-clamp-2 leading-relaxed">
            {product.description}
          </p>

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
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300 ml-2">
              {product.rating}
            </span>
            <span className="text-xs text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded ml-2">
              {product.reviews} reviews
            </span>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                ${product.price}
              </span>
              {discountPercentage > 0 && (
                <span className="text-sm text-gray-500 dark:text-gray-400 line-through">
                  ${originalPrice.toFixed(2)}
                </span>
              )}
            </div>

            <div className={`text-xs font-medium px-2 py-1 rounded ${product.stock > 10
              ? 'text-green-700 bg-green-100 dark:text-green-400 dark:bg-green-900'
              : product.stock > 0
                ? 'text-yellow-700 bg-yellow-100 dark:text-yellow-400 dark:bg-yellow-900'
                : 'text-red-700 bg-red-100 dark:text-red-400 dark:bg-red-900'
              }`}>
              {product.stock > 10 ? (
                <span className="flex items-center gap-1">
                  <Check className="h-3 w-3" />
                  In Stock
                </span>
              ) : product.stock > 0 ? (
                <span className="flex items-center gap-1">
                  <AlertTriangle className="h-3 w-3" />
                  {product.stock} left
                </span>
              ) : (
                <span className="flex items-center gap-1">
                  <X className="h-3 w-3" />
                  Out of Stock
                </span>
              )}
            </div>
          </div>

          <div className="mt-4">
            <div>
              <Button
                onClick={handleAddToCart}
                disabled={product.stock === 0 || isAddingToCart}
                className={`w-full font-semibold transition-colors ${isAddingToCart
                    ? 'bg-green-600 hover:bg-green-700'
                    : 'bg-blue-600 hover:bg-blue-700'
                  }`}
              >
                {isAddingToCart ? (
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full mr-2 animate-spin" />
                ) : (
                  <ShoppingCart className="h-4 w-4 mr-2" />
                )}
                {product.stock === 0 ? 'Out of Stock' : isAddingToCart ? 'Adding to Cart...' : 'Add to Cart'}
              </Button>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}