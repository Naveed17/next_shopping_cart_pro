'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Star, ShoppingCart, Heart, Eye, Tag, Zap, Check, AlertTriangle, X } from 'lucide-react';
import { SetAddToCart } from '@src/lib/redux/cart';
import { Product } from '@src/@types/common';
import Button from '@src/components/core/button/button';
import ImageBlur from '@src/utils/blurImage';
import Link from 'next/link';
import { useAppDispatch } from '@lib/redux/store';

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

  const [discountPercentage] = useState(() => Math.floor(Math.random() * 30) + 10); // Mock discount
  const originalPrice = product.price * (1 + discountPercentage / 100);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -10, scale: 1.03 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="group relative bg-white/95 dark:bg-gray-800/95 backdrop-blur-2xl rounded-2xl shadow-xl hover:shadow-2xl hover:shadow-blue-500/25 transition-all duration-500 overflow-hidden border-2 border-white/30 dark:border-gray-700/40"
      onMouseEnter={() => setShowQuickActions(true)}
      onMouseLeave={() => setShowQuickActions(false)}
    >
      {/* Enhanced Glass Background Effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50/30 via-white/20 to-blue-100/20 dark:from-blue-900/20 dark:via-gray-800/30 dark:to-blue-800/20" />
      <div className="absolute inset-0 bg-gradient-to-t from-transparent via-white/10 to-blue-50/20 dark:from-transparent dark:via-gray-800/10 dark:to-blue-900/20" />

      {/* Floating Glass Orbs */}
      <div className="absolute -top-4 -right-4 w-20 h-20 bg-blue-400/10 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-purple-400/10 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
      <Link href={`/en/products/${product.id}`}>
        {/* Image Container */}
        <div className="relative aspect-square overflow-hidden bg-gradient-to-br from-gray-50/80 to-blue-50/30 dark:from-gray-900/80 dark:to-blue-900/20 backdrop-blur-sm">
          <ImageBlur
            src={product.image}
            alt={product.name}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-500"
          />

          {/* Enhanced Overlay Gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-blue-900/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <div className="absolute inset-0 bg-gradient-to-br from-transparent via-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-2">
            {featured && (
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="bg-gradient-to-r from-blue-600/90 to-blue-700/90 backdrop-blur-md text-white px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1 border border-blue-400/30 shadow-lg"
              >
                <Zap className="h-3 w-3" />
                Featured
              </motion.span>
            )}
            {discountPercentage > 0 && (
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.1 }}
                className="bg-gradient-to-r from-red-500/90 to-red-600/90 backdrop-blur-md text-white px-3 py-1 rounded-full text-xs font-bold border border-red-400/30 shadow-lg"
              >
                -{discountPercentage}%
              </motion.span>
            )}
            {product.stock < 10 && product.stock > 0 && (
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2 }}
                className="bg-gradient-to-r from-orange-500/90 to-orange-600/90 backdrop-blur-md text-white px-3 py-1 rounded-full text-xs font-bold border border-orange-400/30 shadow-lg"
              >
                Only {product.stock} left
              </motion.span>
            )}
          </div>

          {/* Quick Actions */}
          <div className={`absolute top-3 right-3 flex flex-col gap-2 transition-all duration-300 ${showQuickActions ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4'
            }`}>
            <motion.button
              onClick={toggleWishlist}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className={`p-2.5 rounded-full backdrop-blur-xl border transition-all duration-300 shadow-lg ${isWishlisted
                ? 'bg-red-500/90 text-white border-red-400/30 shadow-red-500/20'
                : 'bg-white/90 dark:bg-gray-800/90 text-gray-600 dark:text-gray-400 hover:bg-red-500/90 hover:text-white border-white/30 dark:border-gray-700/30 hover:border-red-400/30'
                }`}
            >
              <Heart className={`h-4 w-4 ${isWishlisted ? 'fill-current' : ''}`} />
            </motion.button>

            {showQuickView && (
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="p-2.5 bg-white/90 dark:bg-gray-800/90 text-gray-600 dark:text-gray-400 rounded-full backdrop-blur-xl hover:bg-blue-500/90 hover:text-white transition-all duration-300 border border-white/30 dark:border-gray-700/30 hover:border-blue-400/30 shadow-lg"
              >
                <Eye className="h-4 w-4" />
              </motion.button>
            )}
          </div>

          {/* Quick Add to Cart */}
          <div className={`absolute bottom-3 left-3 right-3 transition-all duration-300 ${showQuickActions ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}>
            <div className="absolute inset-0 bg-blue-600/20 backdrop-blur-md rounded-lg border border-blue-500/30" />
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="relative"
            >
              <Button
                onClick={handleAddToCart}
                className={`w-full backdrop-blur-xl border shadow-lg transition-all duration-300 ${
                  isAddingToCart 
                    ? 'bg-green-600/90 text-white border-green-400/30 hover:border-green-300/50 hover:shadow-green-500/30' 
                    : 'bg-blue-600/90 text-white hover:bg-blue-700/90 border-blue-400/30 hover:border-blue-300/50 hover:shadow-blue-500/30'
                }`}
                size="sm"
                disabled={isAddingToCart}
              >
                {isAddingToCart ? (
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    className="w-4 h-4 border-2 border-white border-t-transparent rounded-full mr-2"
                  />
                ) : (
                  <ShoppingCart className="h-4 w-4 mr-2" />
                )}
                {isAddingToCart ? 'Adding...' : 'Quick Add'}
              </Button>
            </motion.div>
          </div>
        </div>

        {/* Content */}
        <div className="relative p-5 bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl border-t border-white/20 dark:border-gray-700/20">
          {/* Vendor Badge */}
          <div className="flex items-center justify-between mb-3">
            <span className="inline-flex items-center text-xs font-medium text-blue-600 dark:text-blue-400 bg-blue-50/80 dark:bg-blue-900/30 backdrop-blur-sm px-3 py-1.5 rounded-full border border-blue-200/30 dark:border-blue-700/30">
              <Tag className="h-3 w-3 mr-1" />
              {product.vendor.name}
            </span>
            <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
              <Star className="h-3 w-3 text-yellow-400 fill-current mr-1" />
              {product.vendor.rating}
            </div>
          </div>

          {/* Product Name */}
          <h3 className="font-bold text-lg text-gray-900 dark:text-white mb-3 line-clamp-1 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors truncate">
            {product.name}
          </h3>

          {/* Description */}
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-3 line-clamp-2 leading-relaxed">
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
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300 ml-2">
              {product.rating}
            </span>
            <span className="text-xs text-gray-500 dark:text-gray-400 bg-gray-100/80 dark:bg-gray-700/30 px-2 py-1 rounded-full ml-2">
              {product.reviews} reviews
            </span>
          </div>

          {/* Price */}
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

            {/* Stock Status */}
            <div className={`text-xs font-medium px-3 py-1.5 rounded-full backdrop-blur-sm border ${product.stock > 10
              ? 'text-green-700 bg-green-100/80 dark:text-green-400 dark:bg-green-900/30 border-green-200/30 dark:border-green-700/30'
              : product.stock > 0
                ? 'text-yellow-700 bg-yellow-100/80 dark:text-yellow-400 dark:bg-yellow-900/30 border-yellow-200/30 dark:border-yellow-700/30'
                : 'text-red-700 bg-red-100/80 dark:text-red-400 dark:bg-red-900/30 border-red-200/30 dark:border-red-700/30'
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

          {/* Add to Cart Button */}
          <div className="mt-4">
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Button
                onClick={handleAddToCart}
                disabled={product.stock === 0 || isAddingToCart}
                className={`w-full font-semibold backdrop-blur-sm border shadow-lg transition-all duration-300 ${
                  isAddingToCart
                    ? 'bg-gradient-to-r from-green-600/90 to-green-700/90 hover:from-green-700/90 hover:to-green-800/90 border-green-500/30 hover:shadow-green-500/30'
                    : 'bg-gradient-to-r from-blue-600/90 to-blue-700/90 hover:from-blue-700/90 hover:to-blue-800/90 border-blue-500/30 hover:shadow-blue-500/30'
                }`}
              >
                {isAddingToCart ? (
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    className="w-4 h-4 border-2 border-white border-t-transparent rounded-full mr-2"
                  />
                ) : (
                  <ShoppingCart className="h-4 w-4 mr-2" />
                )}
                {product.stock === 0 ? 'Out of Stock' : isAddingToCart ? 'Adding to Cart...' : 'Add to Cart'}
              </Button>
            </motion.div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}