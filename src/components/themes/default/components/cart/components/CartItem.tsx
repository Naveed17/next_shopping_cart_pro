'use client';

import { Minus, Plus, Trash2, Heart, Star } from 'lucide-react';
import { SetUpdateQuantity, SetRemoveFromCart } from '@src/lib/redux/cart';
import { CartItem as CartItemType } from '@src/@types/common';
import Button from '@src/components/core/button/button';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { useAppDispatch } from '@lib/redux/store';

interface CartItemProps {
  item: CartItemType;
}

export default function CartItem({ item }: CartItemProps) {
  const dispatch = useAppDispatch();

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity > 0) {
      dispatch(SetUpdateQuantity({ id: item.id, quantity: newQuantity }));
    }
  };

  const handleRemove = () => {
    dispatch(SetRemoveFromCart(item.id));
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -2 }}
      className="bg-white/20 dark:bg-gray-800/40 backdrop-blur-xl rounded-2xl border border-white/30 dark:border-gray-700/50 p-6 shadow-xl hover:shadow-2xl transition-all duration-300"
    >
      <div className="flex flex-col lg:flex-row lg:items-center space-y-4 lg:space-y-0 lg:space-x-6">
        {/* Product Image */}
        <div className="relative w-24 h-24 lg:w-20 lg:h-20 bg-gradient-to-br from-blue-100/30 to-blue-200/30 dark:from-blue-900/20 dark:to-blue-800/20 backdrop-blur-sm rounded-xl flex items-center justify-center flex-shrink-0 border border-blue-200/40 dark:border-blue-700/40 overflow-hidden">
          <Image
            src={item.product.image || '/placeholder.jpg'}
            alt={item.product.name}
            fill
            className="object-cover"
          />
        </div>

        {/* Product Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between mb-2">
            <h3 className="font-bold text-lg text-gray-900 dark:text-white line-clamp-2">
              {item.product.name}
            </h3>
            <Button
              variant="ghost"
              size="sm"
              className="text-gray-400 hover:text-red-500 transition-colors ml-2"
            >
              <Heart className="h-4 w-4" />
            </Button>
          </div>

          <div className="flex items-center gap-2 mb-2">
            <span className="text-sm font-medium text-blue-600 dark:text-blue-400 bg-blue-100/50 dark:bg-blue-900/30 px-2 py-1 rounded-full">
              {item.product.vendor.name}
            </span>
            <div className="flex items-center gap-1">
              <Star className="h-3 w-3 text-yellow-400 fill-current" />
              <span className="text-xs text-gray-600 dark:text-gray-400">{item.product.rating}</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xl font-bold text-blue-600 dark:text-blue-400">
              ${item.price}
            </span>
            <span className="text-sm text-gray-500 dark:text-gray-400 line-through">
              ${(item.price * 1.2).toFixed(2)}
            </span>
            <span className="text-xs bg-green-100/80 dark:bg-green-900/30 text-green-700 dark:text-green-400 px-2 py-1 rounded-full">
              Save 20%
            </span>
          </div>
        </div>

        {/* Controls Section */}
        <div className="flex flex-col lg:flex-row items-center gap-4">
          {/* Quantity Controls */}
          <div className="flex items-center bg-white/30 dark:bg-gray-700/30 backdrop-blur-sm rounded-xl border border-white/40 dark:border-gray-600/40 p-1">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleQuantityChange(item.quantity - 1)}
              disabled={item.quantity <= 1}
              className="h-8 w-8 rounded-lg hover:bg-blue-100/50 dark:hover:bg-blue-900/30"
            >
              <Minus className="h-3 w-3" />
            </Button>

            <span className="w-12 text-center font-bold text-gray-900 dark:text-white">
              {item.quantity}
            </span>

            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleQuantityChange(item.quantity + 1)}
              className="h-8 w-8 rounded-lg hover:bg-blue-100/50 dark:hover:bg-blue-900/30"
            >
              <Plus className="h-3 w-3" />
            </Button>
          </div>

          {/* Total Price */}
          <div className="text-center lg:text-right">
            <div className="text-2xl font-bold text-gray-900 dark:text-white">
              ${(item.price * item.quantity).toFixed(2)}
            </div>
            <div className="text-xs text-gray-500 dark:text-gray-400">
              ${item.quantity} × ${item.price}
            </div>
          </div>

          {/* Remove Button */}
          <Button
            variant="ghost"
            size="sm"
            onClick={handleRemove}
            className="text-red-500 hover:text-red-600 hover:bg-red-100/50 dark:hover:bg-red-900/30 rounded-xl p-2"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </motion.div>
  );
}