'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { Star, Mail, Calendar } from 'lucide-react';
import { Vendor, Product } from '@src/@types/common';
import { ProductCard } from '@components/themes/default';
import Button from '@src/components/core/button/button';
import Card from '@src/components/core/card/card';
import Image from 'next/image';

const mockVendor: Vendor = {
  id: '1',
  name: 'TechStore Pro',
  email: 'contact@techstore.com',
  description: 'Premium electronics retailer specializing in cutting-edge technology and gadgets.',
  logo: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=200&h=200&fit=crop',
  rating: 4.8,
  products: []
};

const mockProducts: Product[] = [
  {
    id: '1',
    name: 'Premium Wireless Headphones',
    description: 'High-quality wireless headphones with active noise cancellation',
    price: 299.99,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop',
    category: 'Electronics',
    vendorId: '1',
    vendor: mockVendor,
    stock: 25,
    rating: 4.7,
    reviews: 342
  },
  {
    id: '2',
    name: 'Smart Fitness Watch',
    description: 'Advanced fitness tracking with heart rate monitoring',
    price: 199.99,
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop',
    category: 'Electronics',
    vendorId: '1',
    vendor: mockVendor,
    stock: 15,
    rating: 4.5,
    reviews: 128
  }
];

export default function VendorPage() {
  const params = useParams();
  const [vendor, setVendor] = useState<Vendor | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setVendor(mockVendor);
      setProducts(mockProducts);
      setLoading(false);
    }, 1000);
  }, [params.id]);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto animate-pulse">
        <div className="bg-gray-200 dark:bg-gray-700 rounded-lg h-64 mb-8"></div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="bg-gray-200 dark:bg-gray-700 rounded-lg h-96"></div>
          ))}
        </div>
      </div>
    );
  }

  if (!vendor) return <div>Vendor not found</div>;

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      <Card className="overflow-hidden">
        <div className="bg-gradient-to-r from-primary-600 to-primary-800 px-8 py-12 text-white">
          <div className="flex flex-col md:flex-row items-start md:items-center space-y-6 md:space-y-0 md:space-x-8">
            <div className="w-32 h-32 bg-white rounded-full overflow-hidden flex-shrink-0">
              <Image
                src={vendor.logo}
                alt={vendor.name}
                width={128}
                height={128}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="flex-1">
              <h1 className="text-4xl font-bold mb-4">{vendor.name}</h1>
              <p className="text-primary-100 text-lg mb-6">{vendor.description}</p>

              <div className="flex flex-wrap items-center gap-6 text-primary-100">
                <div className="flex items-center">
                  <Star className="h-5 w-5 text-yellow-400 mr-2" />
                  <span className="font-medium">{vendor.rating}</span>
                </div>
                <div className="flex items-center">
                  <Mail className="h-5 w-5 mr-2" />
                  <span>{vendor.email}</span>
                </div>
                <div className="flex items-center">
                  <Calendar className="h-5 w-5 mr-2" />
                  <span>Member since 2020</span>
                </div>
              </div>
            </div>

            <Button variant="secondary" className="bg-white text-primary-600">
              Contact Vendor
            </Button>
          </div>
        </div>
      </Card>

      <div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
          Products from {vendor.name}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
}