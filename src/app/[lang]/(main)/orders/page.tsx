'use client';

import { useState, useEffect } from 'react';
import { Package, Clock, CheckCircle, Truck } from 'lucide-react';
import Card from '@src/components/core/card/card';
import Button from '@src/components/core/button/button';
import Image from 'next/image';

interface Order {
  id: string;
  date: string;
  status: 'pending' | 'confirmed' | 'shipped' | 'delivered';
  total: number;
  items: Array<{
    id: string;
    name: string;
    image: string;
    price: number;
    quantity: number;
    vendor: string;
  }>;
}

const mockOrders: Order[] = [
  {
    id: 'ORD-001',
    date: '2024-01-15',
    status: 'delivered',
    total: 299.99,
    items: [
      {
        id: '1',
        name: 'Wireless Headphones',
        image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=100&h=100&fit=crop',
        price: 299.99,
        quantity: 1,
        vendor: 'TechStore Pro'
      }
    ]
  },
  {
    id: 'ORD-002',
    date: '2024-01-20',
    status: 'shipped',
    total: 89.98,
    items: [
      {
        id: '2',
        name: 'Organic Coffee Beans',
        image: 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=100&h=100&fit=crop',
        price: 24.99,
        quantity: 2,
        vendor: 'Coffee Co'
      }
    ]
  }
];

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setOrders(mockOrders);
      setLoading(false);
    }, 1000);
  }, []);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending':
        return <Clock className="h-5 w-5 text-yellow-500" />;
      case 'confirmed':
        return <CheckCircle className="h-5 w-5 text-blue-500" />;
      case 'shipped':
        return <Truck className="h-5 w-5 text-purple-500" />;
      case 'delivered':
        return <Package className="h-5 w-5 text-green-500" />;
      default:
        return <Clock className="h-5 w-5 text-gray-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400';
      case 'confirmed':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400';
      case 'shipped':
        return 'bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-400';
      case 'delivered':
        return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400';
    }
  };

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-48 mb-8"></div>
          {[...Array(3)].map((_, i) => (
            <div key={i} className="bg-gray-200 dark:bg-gray-700 rounded-lg h-48"></div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto mt-8">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
        Your Orders
      </h1>

      <div className="space-y-6">
        {orders.map((order) => (
          <Card key={order.id} className="overflow-hidden">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    Order #{order.id}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Placed on {new Date(order.date).toLocaleDateString()}
                  </p>
                </div>

                <div className="flex items-center space-x-4">
                  <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(order.status)}`}>
                    {getStatusIcon(order.status)}
                    <span className="ml-2 capitalize">{order.status}</span>
                  </span>
                  <span className="text-lg font-bold text-gray-900 dark:text-white">
                    ${order.total.toFixed(2)}
                  </span>
                </div>
              </div>

              <div className="space-y-3 mb-4">
                {order.items.map((item) => (
                  <div key={item.id} className="flex items-center space-x-4">
                    <div className="w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden flex-shrink-0">
                      <Image
                        src={item.image}
                        alt={item.name}
                        width={64}
                        height={64}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900 dark:text-white">
                        {item.name}
                      </h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Sold by {item.vendor}
                      </p>
                      <div className="flex items-center justify-between mt-1">
                        <span className="text-sm text-gray-600 dark:text-gray-400">
                          Qty: {item.quantity}
                        </span>
                        <span className="font-medium text-gray-900 dark:text-white">
                          ${(item.price * item.quantity).toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
                <div className="flex space-x-3">
                  <Button variant="outline" size="sm">
                    View Details
                  </Button>
                  {order.status === 'delivered' && (
                    <Button variant="outline" size="sm">
                      Leave Review
                    </Button>
                  )}
                </div>

                {order.status === 'delivered' && (
                  <Button size="sm">
                    Buy Again
                  </Button>
                )}
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}