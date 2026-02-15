'use client';

import { TrendingUp, Eye, Heart, Star, ShoppingCart, Flame } from 'lucide-react';
import { SetAddToCart } from '@src/lib/redux/cart';
import { Product } from '@src/@types/common';
import Button from '@src/components/core/button/button';
import Image from 'next/image';
import Link from 'next/link';
import { useAppDispatch, useAppSelector } from '@lib/redux/store';
import Container from '@components/core/container';
import useLocale from '@hooks/useLocale';

export default function TrendingSection() {
  const { locale } = useLocale();
  const dispatch = useAppDispatch();
  const appData = useAppSelector((state) => state.appData.data);
  const trendingProducts: Product[] = appData?.trendingProducts ?? [];
  const isLoading = !appData || trendingProducts?.length === 0;
  const handleAddToCart = (product: Product) => {
    dispatch(SetAddToCart(product));
  };

  return (
    <Container>
      <div className="relative bg-blue-50 dark:bg-blue-900/20 rounded-2xl p-8 overflow-hidden">
        <div className="relative z-10">
          <div className="text-center mb-8">
            <div className="inline-flex items-center bg-blue-600 text-white px-4 py-2 rounded-full mb-4">
              <Flame className="h-4 w-4 mr-2" />
              <span className="font-bold text-sm">Hot Trending</span>
            </div>

            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Trending Now
            </h2>

            <p className="text-lg text-blue-700 dark:text-blue-300 max-w-2xl mx-auto">
              Discover what&apos;s hot right now! These products are flying off the shelves.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {isLoading ? (
              Array.from({ length: 3 }).map((_, index) => (
                <div
                  key={index}
                  className="relative bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow border animate-pulse"
                >
                  <div className="absolute top-4 left-4 z-20 bg-gray-300 dark:bg-gray-600 w-8 h-6 rounded-full" />
                  <div className="absolute top-4 right-4 z-20 bg-gray-300 dark:bg-gray-600 w-16 h-6 rounded-full" />
                  <div className="aspect-[4/3] bg-gray-300 dark:bg-gray-600" />
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-3">
                      <div className="bg-gray-300 dark:bg-gray-600 w-20 h-5 rounded-full" />
                      <div className="bg-gray-300 dark:bg-gray-600 w-12 h-5 rounded" />
                    </div>
                    <div className="bg-gray-300 dark:bg-gray-600 w-3/4 h-6 rounded mb-2" />
                    <div className="bg-gray-300 dark:bg-gray-600 w-full h-4 rounded mb-1" />
                    <div className="bg-gray-300 dark:bg-gray-600 w-2/3 h-4 rounded mb-4" />
                    <div className="flex items-center justify-between mb-4">
                      <div className="bg-gray-300 dark:bg-gray-600 w-16 h-8 rounded" />
                      <div className="bg-gray-300 dark:bg-gray-600 w-20 h-5 rounded" />
                    </div>
                    <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
                      <div className="bg-gray-300 dark:bg-gray-600 w-12 h-4 rounded" />
                      <div className="bg-gray-300 dark:bg-gray-600 w-16 h-4 rounded" />
                      <div className="bg-gray-300 dark:bg-gray-600 w-12 h-4 rounded" />
                    </div>
                  </div>
                </div>
              ))
            ) : (
              trendingProducts.map((product, index) => (
                <div
                  key={product.id}
                  className="group relative bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow hover:shadow-lg transition-shadow border border-gray-200 dark:border-gray-700"
                >
                  <div className="absolute top-4 left-4 z-20 bg-blue-600 text-white px-2 py-1 rounded-full text-sm font-bold">
                    #{index + 1}
                  </div>

                  <div className="absolute top-4 right-4 z-20 bg-blue-500 text-white px-2 py-1 rounded-full text-xs font-bold flex items-center gap-1">
                    <TrendingUp className="h-3 w-3" />
                    {product.trend}
                  </div>

                  <div className="relative aspect-[4/3] overflow-hidden">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      sizes="(max-width: 1024px) 100vw, 33vw"
                      className="object-cover"
                      quality={75}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                    <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Button
                        onClick={() => handleAddToCart(product)}
                        className="w-full bg-blue-600 text-white hover:bg-blue-700 font-semibold"
                      >
                        <ShoppingCart className="h-4 w-4 mr-2" />
                        Quick Add
                      </Button>
                    </div>
                  </div>

                  <div className="p-6">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-xs font-medium text-blue-600 dark:text-blue-400 bg-blue-100 dark:bg-blue-900 px-2 py-1 rounded-full">
                        {product.vendor.name}
                      </span>
                      <div className="flex items-center text-blue-600 dark:text-blue-400">
                        <Star className="h-4 w-4 fill-current" />
                        <span className="text-sm font-medium ml-1">{product.rating}</span>
                      </div>
                    </div>

                    <h3 className="font-bold text-xl text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      {product.name}
                    </h3>

                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">
                      {product.description}
                    </p>

                    <div className="flex items-center justify-between mb-4">
                      <span className="text-2xl font-bold text-gray-900 dark:text-white">
                        ${product.price}
                      </span>
                      <span className="text-sm text-blue-600 dark:text-blue-400 font-semibold">
                        {product.sales} sold
                      </span>
                    </div>

                    <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400 pt-4 border-t border-gray-200 dark:border-gray-700">
                      <div className="flex items-center gap-1">
                        <Eye className="h-4 w-4" />
                        <span>{product.views}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Heart className="h-4 w-4" />
                        <span>{product.reviews} reviews</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <TrendingUp className="h-4 w-4 text-blue-500" />
                        <span className="text-blue-600 dark:text-blue-400 font-medium">{product.trend}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          <div className="text-center mt-8">
            <Link href={`/${locale}/products`}>
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-8 py-4 rounded-full">
                View All Trending Products
                <TrendingUp className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </Container>
  );
}