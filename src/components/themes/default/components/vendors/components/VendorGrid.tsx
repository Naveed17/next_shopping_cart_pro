'use client';

import { useState, useEffect } from 'react';
import VendorCard from './VendorCard';
import { Vendor } from '@src/@types/common';

// Mock data - replace with API call
const mockVendors: Vendor[] = [
  {
    id: '1',
    name: 'TechStore',
    email: 'tech@store.com',
    description: 'Your one-stop shop for the latest electronics and gadgets',
    logo: '/api/placeholder/100/100',
    rating: 4.5,
    products: []
  },
  {
    id: '2',
    name: 'Coffee Co',
    email: 'hello@coffee.com',
    description: 'Premium coffee beans and brewing equipment from around the world',
    logo: '/api/placeholder/100/100',
    rating: 4.8,
    products: []
  },
  {
    id: '3',
    name: 'Fashion Hub',
    email: 'info@fashionhub.com',
    description: 'Trendy clothing and accessories for all occasions',
    logo: '/api/placeholder/100/100',
    rating: 4.3,
    products: []
  },
  {
    id: '4',
    name: 'Home & Garden',
    email: 'contact@homeandgarden.com',
    description: 'Everything you need to make your house a home',
    logo: '/api/placeholder/100/100',
    rating: 4.6,
    products: []
  }
];

export default function VendorGrid() {
  const [vendors, setVendors] = useState<Vendor[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setVendors(mockVendors);
      setLoading(false);
    }, 1000);
  }, []);

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="animate-pulse">
            <div className="bg-gray-200 dark:bg-gray-700 rounded-lg h-48 mb-4"></div>
            <div className="bg-gray-200 dark:bg-gray-700 rounded h-4 mb-2"></div>
            <div className="bg-gray-200 dark:bg-gray-700 rounded h-4 w-2/3"></div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {vendors.map((vendor) => (
        <VendorCard key={vendor.id} vendor={vendor} />
      ))}
    </div>
  );
}