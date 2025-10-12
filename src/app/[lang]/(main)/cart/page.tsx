'use client';

import { useSelector } from 'react-redux';
import { RootState } from '@src/lib/redux/store';
import { CartItem, CartSummary } from '@components/themes/default';
import Button from '@src/components/core/button/button';
import Link from 'next/link';
import { ShoppingBag } from 'lucide-react';
import Container from '@components/core/container';

export default function CartPage() {
  const { items } = useSelector((state: RootState) => state.cart);

  if (items.length === 0) {
    return (
      <div className="max-w-4xl mx-auto text-center py-16">
        <div className="bg-white/20 dark:bg-gray-800/40 backdrop-blur-xl rounded-3xl border border-white/30 dark:border-gray-700/50 p-12 shadow-xl">
          <div className="bg-blue-500/20 dark:bg-blue-500/30 backdrop-blur-sm rounded-full w-32 h-32 flex items-center justify-center mx-auto mb-6 border border-blue-500/30">
            <ShoppingBag className="h-16 w-16 text-blue-500 dark:text-blue-400" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Your cart is empty
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-8">
            Looks like you haven't added any items to your cart yet.
          </p>
          <Link href="/products">
            <Button size="lg" className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800">Continue Shopping</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <Container>
      <div className="bg-white/15 dark:bg-gray-800/30 backdrop-blur-lg rounded-2xl border border-white/25 dark:border-gray-700/40 p-6 my-8 shadow-lg">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          Shopping Cart ({items.length} items)
        </h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-4">
          {items.map((item) => (
            <CartItem key={item.id} item={item} />
          ))}
        </div>

        {/* Cart Summary */}
        <div className="lg:col-span-1">
          <CartSummary />
        </div>
      </div>
    </Container>
  );
}