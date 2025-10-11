'use client';

import { RootState, useAppSelector } from '@src/lib/redux/store';
import Button from '@src/components/core/button/button';
import Link from 'next/link';
import { Shield, Package, CreditCard, RotateCcw } from 'lucide-react';
import { motion } from 'framer-motion';

export default function CartSummary() {
  const { items, total } = useAppSelector((state: RootState) => state.cart);

  const shipping = total > 50 ? 0 : 9.99;
  const tax = total * 0.08; // 8% tax
  const finalTotal = total + shipping + tax;

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="bg-white/20 dark:bg-gray-800/40 backdrop-blur-xl rounded-2xl border border-white/30 dark:border-gray-700/50 p-6 shadow-xl sticky top-4"
    >
      <div className="flex items-center gap-2 mb-6">
        <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
          <CreditCard className="h-4 w-4 text-white" />
        </div>
        <h3 className="text-xl font-bold text-gray-900 dark:text-white">
          Order Summary
        </h3>
      </div>

      <div className="space-y-3 mb-6">
        <div className="flex justify-between text-gray-600 dark:text-gray-400">
          <span>Subtotal ({items.length} items)</span>
          <span>${total.toFixed(2)}</span>
        </div>

        <div className="flex justify-between text-gray-600 dark:text-gray-400">
          <span>Shipping</span>
          <span>{shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}</span>
        </div>

        <div className="flex justify-between text-gray-600 dark:text-gray-400">
          <span>Tax</span>
          <span>${tax.toFixed(2)}</span>
        </div>

        <div className="border-t border-gray-200 dark:border-gray-700 pt-3">
          <div className="flex justify-between text-lg font-semibold text-gray-900 dark:text-white">
            <span>Total</span>
            <span>${finalTotal.toFixed(2)}</span>
          </div>
        </div>
      </div>

      {total > 0 && total < 50 && (
        <div className="bg-blue-500/10 dark:bg-blue-500/20 backdrop-blur-sm border border-blue-500/30 dark:border-blue-500/40 rounded-xl p-3 mb-4">
          <p className="text-sm text-blue-800 dark:text-blue-200 font-medium">
            Add ${(50 - total).toFixed(2)} more for free shipping!
          </p>
        </div>
      )}

      <div className="space-y-3">
        <Link href="/en/checkout" className="block">
          <Button className="w-full" size="lg">
            Proceed to Checkout
          </Button>
        </Link>

        <Link href="/en/products" className="block">
          <Button variant="outline" className="w-full">
            Continue Shopping
          </Button>
        </Link>
      </div>

      {/* Security badges */}
      <div className="mt-6 pt-6 border-t border-white/30 dark:border-gray-600/30">
        <div className="grid grid-cols-3 gap-2 text-xs">
          <div className="flex flex-col items-center gap-1 text-center">
            <div className="w-8 h-8 bg-green-100/50 dark:bg-green-900/30 rounded-full flex items-center justify-center">
              <Shield className="h-4 w-4 text-green-600 dark:text-green-400" />
            </div>
            <span className="text-gray-600 dark:text-gray-400 font-medium">Secure</span>
          </div>
          <div className="flex flex-col items-center gap-1 text-center">
            <div className="w-8 h-8 bg-blue-100/50 dark:bg-blue-900/30 rounded-full flex items-center justify-center">
              <Package className="h-4 w-4 text-blue-600 dark:text-blue-400" />
            </div>
            <span className="text-gray-600 dark:text-gray-400 font-medium">Fast</span>
          </div>
          <div className="flex flex-col items-center gap-1 text-center">
            <div className="w-8 h-8 bg-purple-100/50 dark:bg-purple-900/30 rounded-full flex items-center justify-center">
              <RotateCcw className="h-4 w-4 text-purple-600 dark:text-purple-400" />
            </div>
            <span className="text-gray-600 dark:text-gray-400 font-medium">Returns</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}