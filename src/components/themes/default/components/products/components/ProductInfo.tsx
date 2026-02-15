'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { Star, ShoppingCart, Heart, Share2, Minus, Plus, Check, AlertTriangle, X, Tag, Shield, Truck, RotateCcw, ArrowRight } from 'lucide-react';

import { SetAddToCart } from '@src/lib/redux/cart';
import { Product } from '@src/@types/common';
import Button from '@src/components/core/button/button';
import { useAppDispatch, useAppSelector } from '@lib/redux/store';
import useLocale from '@hooks/useLocale';

interface ProductInfoProps {
  product: Product;
}

export default function ProductInfo({ product }: ProductInfoProps) {
  const { locale } = useLocale();
  const dispatch = useAppDispatch();
  const cartItems = useAppSelector((state) => state.cart.items);
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const router = useRouter()
  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      dispatch(SetAddToCart(product));
    }
  };

  const discountPercentage = 15;
  const originalPrice = product.price * (1 + discountPercentage / 100);

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="space-y-6"
    >
      <div className="flex items-center gap-3">
        <span className="inline-flex items-center text-sm font-medium text-blue-600 dark:text-blue-400 bg-blue-50/80 dark:bg-blue-900/30 backdrop-blur-sm px-3 py-1.5 rounded-full border border-blue-200/30 dark:border-blue-700/30">
          <Tag className="h-4 w-4 mr-2" />
          {product.vendor.name}
        </span>
        <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
          <Star className="h-4 w-4 text-yellow-400 fill-current mr-1" />
          {product.vendor.rating}
        </div>
      </div>

      <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
        {product.name}
      </h1>

      <div className="flex items-center gap-4">
        <div className="flex items-center">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={`h-5 w-5 ${i < Math.floor(product.rating)
                ? 'text-yellow-400 fill-current'
                : 'text-gray-300 dark:text-gray-600'
                }`}
            />
          ))}
        </div>
        <span className="text-lg font-medium text-gray-700 dark:text-gray-300">
          {product.rating}
        </span>
        <span className="text-gray-500 dark:text-gray-400">
          ({product.reviews} reviews)
        </span>
      </div>

      <div className="space-y-2">
        <div className="flex items-baseline gap-3">
          <span className="text-4xl font-bold text-blue-600 dark:text-blue-400">
            ${product.price}
          </span>
          <span className="text-xl text-gray-500 dark:text-gray-400 line-through">
            ${originalPrice.toFixed(2)}
          </span>
          <span className="text-lg font-medium text-green-600 dark:text-green-400 bg-green-50/80 dark:bg-green-900/20 px-2 py-1 rounded">
            Save ${(originalPrice - product.price).toFixed(2)}
          </span>
        </div>
      </div>

      <div className={`inline-flex items-center text-sm font-medium px-4 py-2 rounded-full backdrop-blur-sm border ${product.stock > 10
        ? 'text-green-700 bg-green-100/80 dark:text-green-400 dark:bg-green-900/30 border-green-200/30 dark:border-green-700/30'
        : product.stock > 0
          ? 'text-yellow-700 bg-yellow-100/80 dark:text-yellow-400 dark:bg-yellow-900/30 border-yellow-200/30 dark:border-yellow-700/30'
          : 'text-red-700 bg-red-100/80 dark:text-red-400 dark:bg-red-900/30 border-red-200/30 dark:border-red-700/30'
        }`}>
        {product.stock > 10 ? (
          <><Check className="h-4 w-4 mr-2" />In Stock</>
        ) : product.stock > 0 ? (
          <><AlertTriangle className="h-4 w-4 mr-2" />{product.stock} left</>
        ) : (
          <><X className="h-4 w-4 mr-2" />Out of Stock</>
        )}
      </div>

      <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
        {product.description}
      </p>

      <div className="space-y-4">
        <div className="flex items-center gap-4">
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Quantity:</span>
          <div className="flex items-center border border-gray-300 dark:border-gray-600 rounded-lg">
            <button
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            >
              <Minus className="h-4 w-4" />
            </button>
            <span className="px-4 py-2 font-medium">{quantity}</span>
            <button
              onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            >
              <Plus className="h-4 w-4" />
            </button>
          </div>
        </div>

        <div className="flex gap-3">
          <Button
            onClick={handleAddToCart}
            disabled={product.stock === 0}
            className="flex-1 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold py-3"
          >
            <ShoppingCart className="h-5 w-5 mr-2" />
            Add to Cart
          </Button>
          <Button
            onClick={() => router.push(`/${locale}/cart`)}
            disabled={cartItems.length === 0}
            className="px-6 py-3 bg-gradient-to-r from-gray-800 to-black hover:from-black hover:to-gray-900 dark:from-orange-500 dark:to-orange-600 dark:hover:from-orange-600 dark:hover:to-orange-700 text-white font-medium disabled:bg-gray-300 disabled:text-gray-500 disabled:cursor-not-allowed"
          >

            Go to Cart
            <ArrowRight className="h-4 w-4 ml-2" />
          </Button>
          <Button
            onClick={() => setIsWishlisted(!isWishlisted)}
            variant="outline"
            className={`p-3 ${isWishlisted ? 'text-red-500 border-red-500' : ''}`}
          >
            <Heart className={`h-5 w-5 ${isWishlisted ? 'fill-current' : ''}`} />
          </Button>
          <Button variant="outline" className="p-3">
            <Share2 className="h-5 w-5" />
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 border-t border-gray-200 dark:border-gray-700">
        <div className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-400">
          <Shield className="h-5 w-5 text-blue-500" />
          <span>Secure Payment</span>
        </div>
        <div className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-400">
          <Truck className="h-5 w-5 text-blue-500" />
          <span>Free Shipping</span>
        </div>
        <div className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-400">
          <RotateCcw className="h-5 w-5 text-blue-500" />
          <span>Easy Returns</span>
        </div>
      </div>
    </motion.div>
  );
}