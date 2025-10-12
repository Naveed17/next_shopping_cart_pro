'use client';

import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { useAppSelector } from '@lib/redux/store';
import Container from '@components/core/container';

export default function CategoriesSection() {
  const appData = useAppSelector((state) => state.appData.data);
  const categories = appData?.categories ?? [];
  const isLoading = !appData || categories.length === 0;

  return (
    <Container>
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
          href="/products"
          className="flex items-center text-primary-600 hover:text-primary-700 font-medium"
        >
          View All <ArrowRight className="ml-1 h-4 w-4" />
        </Link>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {isLoading ? (
          Array.from({ length: 6 }).map((_, index) => (
            <div
              key={index}
              className="group relative overflow-hidden rounded-xl bg-gray-200 dark:bg-gray-700 animate-pulse"
            >
              <div className="aspect-square relative bg-gray-300 dark:bg-gray-600" />
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded mb-2" />
                <div className="h-3 bg-gray-300 dark:bg-gray-600 rounded w-2/3" />
              </div>
            </div>
          ))
        ) : (
          categories.map((category: any) => (
            <Link
              key={category?.id}
              href={`/products?category=${category?.name}`}
              className="group relative overflow-hidden rounded-xl bg-white dark:bg-gray-800 shadow-sm hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
            >
              <div className="aspect-square relative">
                <Image
                  src={category?.image}
                  alt={category?.name}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors" />
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                <h3 className="font-semibold text-white text-lg mb-1">{category?.name}</h3>
                <p className="text-sm opacity-90">{category?.count}</p>
              </div>
            </Link>
          ))
        )}
      </div>
    </Container>
  );
}