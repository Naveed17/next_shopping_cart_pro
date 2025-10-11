'use client';

import { useRouter } from 'next/navigation';
import { useAppDispatch, useAppSelector } from '@src/lib/redux/store';
import { CheckoutForm, OrderSummary } from '@components/themes/default';
import { ShoppingBag } from 'lucide-react';
import Link from 'next/link';
import Button from '@src/components/core/button/button';
import { SetClearCart } from '@lib/redux/cart';

export default function CheckoutPage() {
  const { items } = useAppSelector((state) => state.cart);
  const dispatch = useAppDispatch();
  const router = useRouter();

  const handleOrderComplete = () => {
    dispatch(SetClearCart());
    const orderId = 'ORD-' + Date.now();
    router.push(`/en/orders/complete?orderId=${orderId}`);
  };

  if (items.length === 0) {
    return (
      <div className="max-w-4xl mx-auto text-center py-16">
        <ShoppingBag className="h-24 w-24 text-gray-400 mx-auto mb-6" />
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
          Your cart is empty
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mb-8">
          Add some items to your cart before checking out.
        </p>
        <Link href="/en/products">
          <Button size="lg">Continue Shopping</Button>
        </Link>
      </div>
    );
  }



  return (
    <div className="max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
        Checkout
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <CheckoutForm onOrderComplete={handleOrderComplete} />
        </div>

        <div className="lg:col-span-1">
          <OrderSummary />
        </div>
      </div>
    </div>
  );
}