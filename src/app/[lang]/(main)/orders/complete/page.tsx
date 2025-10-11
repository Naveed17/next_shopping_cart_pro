'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { CheckCircle, Package, Truck, ArrowRight, Mail, MapPin, CreditCard } from 'lucide-react';
import Link from 'next/link';
import Card from '@src/components/core/card/card';
import Button from '@src/components/core/button/button';
import Image from 'next/image';
import Confetti from 'react-confetti';

interface OrderDetails {
  id: string;
  total: number;
  estimatedDelivery: string;
  customer: {
    name: string;
    email: string;
    phone: string;
    address: {
      street: string;
      city: string;
      state: string;
      zipCode: string;
    };
  };
  items: Array<{
    id: string;
    name: string;
    price: number;
    quantity: number;
    vendor: string;
    image: string;
  }>;
}

export default function OrderCompletePage() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get('orderId') || 'ORD-' + Date.now();
  const [orderDetails, setOrderDetails] = useState<OrderDetails | null>(null);
  const [showConfetti, setShowConfetti] = useState(true);
  const [windowDimensions, setWindowDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const mockOrder: OrderDetails = {
      id: orderId,
      total: 299.99,
      estimatedDelivery: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toLocaleDateString(),
      customer: {
        name: 'John Doe',
        email: 'john.doe@example.com',
        phone: '+1 (555) 123-4567',
        address: {
          street: '123 Main Street',
          city: 'New York',
          state: 'NY',
          zipCode: '10001'
        }
      },
      items: [
        {
          id: '1',
          name: 'Wireless Headphones',
          price: 299.99,
          quantity: 1,
          vendor: 'TechStore Pro',
          image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=100&h=100&fit=crop'
        }
      ]
    };
    setOrderDetails(mockOrder);

    // Set window dimensions and handle resize
    const updateDimensions = () => {
      setWindowDimensions({
        width: document.documentElement.clientWidth,
        height: document.documentElement.clientHeight
      });
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);

    // Stop confetti after 5 seconds
    const timer = setTimeout(() => {
      setShowConfetti(false);
    }, 5000);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', updateDimensions);
    };
  }, []);

  if (!orderDetails) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <div className="overflow-x-hidden">
      {showConfetti && windowDimensions.width > 0 && (
        <Confetti
          width={windowDimensions.width}
          height={windowDimensions.height}
          recycle={false}
          numberOfPieces={700}
          colors={['#10B981', '#3B82F6', '#8B5CF6', '#F59E0B', '#EF4444']}
          style={{ position: 'fixed', top: 0, left: 0, zIndex: 9999 }}
        />
      )}
      <div className="max-w-4xl mx-auto py-12 px-4 space-y-8 relative">
        {/* Success Header */}
        <Card className="p-6">
          <div className="space-y-4">
            <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">
              Order Confirmed
            </h1>

            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center">
                <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400" />
              </div>
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Order #{orderDetails.id}
                </p>
                <p className="font-medium text-gray-900 dark:text-white">
                  Thank you {orderDetails.customer.name}!
                </p>
              </div>
            </div>

            <div className="p-4 bg-blue-50 dark:bg-blue-900/10 rounded-lg border border-blue-200 dark:border-blue-800">
              <div className="flex items-start space-x-3">
                <Mail className="h-5 w-5 text-blue-600 dark:text-blue-400 mt-0.5" />
                <div>
                  <h3 className="font-medium text-gray-900 dark:text-white mb-1">
                    Order Updates
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    You will receive order and shipping updates via email
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Order Timeline */}
        <Card className="p-6">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
            Order Status
          </h2>

          <div className="flex items-center justify-between">
            <div className="flex flex-col items-center">
              <div className="w-8 h-8 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center mb-2">
                <CheckCircle className="h-4 w-4 text-green-600 dark:text-green-400" />
              </div>
              <span className="text-sm font-medium text-green-600 dark:text-green-400">Confirmed</span>
              <span className="text-xs text-gray-500 mt-1">Just now</span>
            </div>

            <div className="flex-1 h-px bg-gray-200 dark:bg-gray-700 mx-4"></div>

            <div className="flex flex-col items-center">
              <div className="w-8 h-8 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mb-2">
                <Package className="h-4 w-4 text-gray-400" />
              </div>
              <span className="text-sm font-medium text-gray-400">Processing</span>
              <span className="text-xs text-gray-500 mt-1">1-2 days</span>
            </div>

            <div className="flex-1 h-px bg-gray-200 dark:bg-gray-700 mx-4"></div>

            <div className="flex flex-col items-center">
              <div className="w-8 h-8 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mb-2">
                <Truck className="h-4 w-4 text-gray-400" />
              </div>
              <span className="text-sm font-medium text-gray-400">Shipped</span>
              <span className="text-xs text-gray-500 mt-1">3-4 days</span>
            </div>

            <div className="flex-1 h-px bg-gray-200 dark:bg-gray-700 mx-4"></div>

            <div className="flex flex-col items-center">
              <div className="w-8 h-8 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mb-2">
                <CheckCircle className="h-4 w-4 text-gray-400" />
              </div>
              <span className="text-sm font-medium text-gray-400">Delivered</span>
              <span className="text-xs text-gray-500 mt-1">{orderDetails.estimatedDelivery}</span>
            </div>
          </div>
        </Card>

        {/* Customer & Shipping Details */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="p-6">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Contact Information
            </h2>

            <div className="space-y-3">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Name</p>
                <p className="font-medium text-gray-900 dark:text-white">
                  {orderDetails.customer.name}
                </p>
              </div>

              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Email</p>
                <p className="font-medium text-gray-900 dark:text-white">
                  {orderDetails.customer.email}
                </p>
              </div>

              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Phone</p>
                <p className="font-medium text-gray-900 dark:text-white">
                  {orderDetails.customer.phone}
                </p>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Shipping Address
            </h2>

            <div className="space-y-1">
              <p className="font-medium text-gray-900 dark:text-white">
                {orderDetails.customer.address.street}
              </p>
              <p className="text-gray-600 dark:text-gray-400">
                {orderDetails.customer.address.city}, {orderDetails.customer.address.state}
              </p>
              <p className="text-gray-600 dark:text-gray-400">
                {orderDetails.customer.address.zipCode}
              </p>
            </div>
          </Card>
        </div>

        {/* Order Summary */}
        <Card className="p-6">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
            Order Summary
          </h2>

          <div className="space-y-4 mb-6">
            {orderDetails.items.map((item) => (
              <div key={item.id} className="flex items-center space-x-4 p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                <div className="w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden">
                  <Image
                    src={item.image}
                    alt={item.name}
                    width={64}
                    height={64}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="flex-1">
                  <h3 className="font-medium text-gray-900 dark:text-white">
                    {item.name}
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {item.vendor} • Qty: {item.quantity}
                  </p>
                </div>

                <div className="text-right">
                  <p className="font-medium text-gray-900 dark:text-white">
                    ${(item.price * item.quantity).toFixed(2)}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
            <div className="flex items-center justify-between">
              <span className="text-lg font-semibold text-gray-900 dark:text-white">
                Total
              </span>
              <span className="text-lg font-semibold text-gray-900 dark:text-white">
                ${orderDetails.total.toFixed(2)}
              </span>
            </div>
          </div>
        </Card>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4">
          <Link href="/orders" className="flex-1">
            <Button className="w-full">
              <Package className="h-4 w-4 mr-2" />
              View All Orders
            </Button>
          </Link>

          <Link href="/products" className="flex-1">
            <Button variant="outline" className="w-full">
              Continue Shopping
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}