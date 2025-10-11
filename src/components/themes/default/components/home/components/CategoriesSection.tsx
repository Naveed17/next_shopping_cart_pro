'use client';

import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

const categories = [
  {
    id: 1,
    name: 'Electronics',
    image: 'https://images.unsplash.com/photo-1498049794561-7780e7231661?w=400&h=300&fit=crop',
    count: '2,341 products'
  },
  {
    id: 2,
    name: 'Fashion',
    image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&h=300&fit=crop',
    count: '1,892 products'
  },
  {
    id: 3,
    name: 'Home & Garden',
    image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=300&fit=crop',
    count: '956 products'
  },
  {
    id: 4,
    name: 'Sports',
    image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop',
    count: '743 products'
  },
  {
    id: 5,
    name: 'Books',
    image: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=300&fit=crop',
    count: '1,234 products'
  },
  {
    id: 6,
    name: 'Food & Beverages',
    image: 'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=400&h=300&fit=crop',
    count: '567 products'
  }
];

export default function CategoriesSection() {
  return (
    <section className="max-w-7xl mx-auto px-4">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Shop by Category
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Discover products across different categories
          </p>
        </div>
        <Link 
          href="/en/products" 
          className="flex items-center text-primary-600 hover:text-primary-700 font-medium"
        >
          View All <ArrowRight className="ml-1 h-4 w-4" />
        </Link>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {categories.map((category) => (
          <Link
            key={category.id}
            href={`/en/products?category=${category.name}`}
            className="group relative overflow-hidden rounded-xl bg-white dark:bg-gray-800 shadow-sm hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
          >
            <div className="aspect-square relative">
              <Image
                src={category.image}
                alt={category.name}
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors" />
            </div>
            <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
              <h3 className="font-semibold text-lg mb-1">{category.name}</h3>
              <p className="text-sm opacity-90">{category.count}</p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}