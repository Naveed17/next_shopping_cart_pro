'use client';

import { useSelector } from 'react-redux';
import { RootState } from '@src/lib/redux/store';
import Card from '@src/components/core/card/card';
import Image from 'next/image';

export default function OrderSummary() {
  const { items, total } = useSelector((state: RootState) => state.cart);

  const shipping = total > 50 ? 0 : 9.99;
  const tax = total * 0.08;
  const finalTotal = total + shipping + tax;

  return (
    <Card className="p-6 sticky top-4">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
        Order Summary
      </h3>

      {/* Items */}
      <div className="space-y-4 mb-6">
        {items.map((item) => (
          <div key={item.id} className="flex items-center space-x-3">
            <div className="w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden flex-shrink-0">
              <Image
                src={item.product.image}
                alt={item.product.name}
                width={64}
                height={64}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="text-sm font-medium text-gray-900 dark:text-white truncate">
                {item.product.name}
              </h4>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                {item.product.vendor.name}
              </p>
              <div className="flex items-center justify-between mt-1">
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  Qty: {item.quantity}
                </span>
                <span className="text-sm font-medium text-gray-900 dark:text-white">
                  ${(item.price * item.quantity).toFixed(2)}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pricing Breakdown */}
      <div className="space-y-3 mb-6 pt-6 border-t border-gray-200 dark:border-gray-700">
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

        {total > 0 && total < 50 && (
          <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-3">
            <p className="text-sm text-blue-800 dark:text-blue-200">
              Add ${(50 - total).toFixed(2)} more for free shipping!
            </p>
          </div>
        )}

        <div className="border-t border-gray-200 dark:border-gray-700 pt-3">
          <div className="flex justify-between text-lg font-semibold text-gray-900 dark:text-white">
            <span>Total</span>
            <span>${finalTotal.toFixed(2)}</span>
          </div>
        </div>
      </div>

      {/* Security Info */}
      <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4">
        <div className="flex items-center">
          <div className="text-green-600 dark:text-green-400 mr-2">🔒</div>
          <div>
            <p className="text-sm font-medium text-green-800 dark:text-green-200">
              Secure Checkout
            </p>
            <p className="text-xs text-green-600 dark:text-green-400">
              Your payment information is encrypted and secure
            </p>
          </div>
        </div>
      </div>
    </Card>
  );
}