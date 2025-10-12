'use client';

import { ArrowRight } from 'lucide-react';
import { Product } from '@src/@types/common';
import ProductCard from '@src/components/core/ProductCard';
import Link from 'next/link';
import { useAppSelector } from '@lib/redux/store';
import Container from '@components/core/container';


export default function FeaturedProducts() {
  const appData = useAppSelector((state) => state.appData.data);
  const products: Product[] = appData?.featuredProducts ?? [];
  const isLoading = !appData || products?.length === 0;

  if (isLoading) {
    return (
      <Container>
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-64 mb-8"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="bg-gray-200 dark:bg-gray-700 rounded-xl h-96"></div>
            ))}
          </div>
        </div>
      </Container>
    );
  }

  return (
    <Container>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Featured Products
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Hand-picked products from our top vendors
          </p>
        </div>
        <Link
          href="/products"
          className="flex items-center text-primary-600 hover:text-primary-700 font-medium"
        >
          View All <ArrowRight className="ml-1 h-4 w-4" />
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} featured={true} />
        ))}
      </div>
    </Container>
  );
}