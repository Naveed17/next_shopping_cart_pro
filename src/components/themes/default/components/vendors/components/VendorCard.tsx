'use client';

import { Star, MapPin, Mail } from 'lucide-react';
import { Vendor } from '@src/@types/common';
import Button from '@src/components/core/button/button';
import Card from '@src/components/core/card/card';
import Link from 'next/link';

interface VendorCardProps {
  vendor: Vendor;
}

export default function VendorCard({ vendor }: VendorCardProps) {
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
      {/* Vendor Header */}
      <div className="p-6 text-center">
        <div className="w-20 h-20 bg-gray-100 dark:bg-gray-800 rounded-full mx-auto mb-4 flex items-center justify-center">
          <span className="text-gray-500 dark:text-gray-400 text-sm">Logo</span>
        </div>

        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
          {vendor.name}
        </h3>

        <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
          {vendor.description}
        </p>

        {/* Rating */}
        <div className="flex items-center justify-center mb-4">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`h-4 w-4 ${i < Math.floor(vendor.rating)
                    ? 'text-yellow-400 fill-current'
                    : 'text-gray-300 dark:text-gray-600'
                  }`}
              />
            ))}
          </div>
          <span className="text-sm text-gray-600 dark:text-gray-400 ml-2">
            {vendor.rating}
          </span>
        </div>
      </div>

      {/* Vendor Info */}
      <div className="px-6 pb-4 space-y-2">
        <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
          <Mail className="h-4 w-4 mr-2" />
          <span>{vendor.email}</span>
        </div>
      </div>

      {/* Actions */}
      <div className="px-6 pb-6 space-y-3">
        <Link href={`/en/vendors/${vendor.id}`} className="block">
          <Button className="w-full">
            View Products
          </Button>
        </Link>

        <Button variant="outline" className="w-full">
          Contact Vendor
        </Button>
      </div>

      {/* Stats */}
      <div className="bg-gray-50 dark:bg-gray-800 px-6 py-4">
        <div className="flex justify-between text-sm">
          <div className="text-center">
            <div className="font-semibold text-gray-900 dark:text-white">
              {vendor.products?.length || 0}
            </div>
            <div className="text-gray-600 dark:text-gray-400">Products</div>
          </div>
          <div className="text-center">
            <div className="font-semibold text-gray-900 dark:text-white">
              {vendor.rating}
            </div>
            <div className="text-gray-600 dark:text-gray-400">Rating</div>
          </div>
          <div className="text-center">
            <div className="font-semibold text-gray-900 dark:text-white">
              Active
            </div>
            <div className="text-gray-600 dark:text-gray-400">Status</div>
          </div>
        </div>
      </div>
    </Card>
  );
}