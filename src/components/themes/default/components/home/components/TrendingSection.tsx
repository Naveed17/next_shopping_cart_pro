'use client';

import { motion } from 'framer-motion';
import { TrendingUp, Eye, Heart, Star, ShoppingCart, Flame } from 'lucide-react';
import { SetAddToCart } from '@src/lib/redux/cart';
import { Product } from '@src/@types/common';
import Button from '@src/components/core/button/button';
import Image from 'next/image';
import Link from 'next/link';
import { useAppDispatch, useAppSelector } from '@lib/redux/store';
import Container from '@components/core/container';


export default function TrendingSection() {
  const dispatch = useAppDispatch();
  const appData = useAppSelector((state) => state.appData.data);
  const trendingProducts: Product[] = appData?.trendingProducts ?? [];
  const isLoading = !appData || trendingProducts?.length === 0;
  const handleAddToCart = (product: Product) => {
    dispatch(SetAddToCart(product));
  };

  return (
    <Container>
      <div className="relative bg-gradient-to-br from-blue-50/80 via-blue-100/60 to-blue-200/40 dark:from-blue-900/20 dark:via-blue-800/15 dark:to-blue-700/10 backdrop-blur-xl border border-blue-200/30 dark:border-blue-800/30 rounded-3xl p-8 md:p-12 overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: 'radial-gradient(circle at 2px 2px, currentColor 1px, transparent 0)',
            backgroundSize: '32px 32px'
          }} />
        </div>

        {/* Floating Elements */}
        <div className="absolute top-8 right-8 w-16 h-16 bg-blue-400/20 rounded-full animate-pulse" />
        <div className="absolute bottom-8 left-8 w-12 h-12 bg-blue-500/20 rounded-full animate-bounce" />

        <div className="relative z-10">
          {/* Header */}
          <div className="text-center mb-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="inline-flex items-center bg-blue-600/20 backdrop-blur-md border border-blue-300/30 dark:border-blue-700/30 text-blue-800 dark:text-blue-200 px-6 py-3 rounded-full mb-6 shadow-lg"
            >
              <Flame className="h-5 w-5 mr-2 animate-pulse" />
              <span className="font-bold text-sm uppercase tracking-wide">Hot Trending</span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white mb-4"
            >
              Trending Now
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="text-lg text-blue-700 dark:text-blue-300 max-w-2xl mx-auto"
            >
              Discover what's hot right now! These products are flying off the shelves.
            </motion.p>
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {isLoading ? (
              Array.from({ length: 3 }).map((_, index) => (
                <div
                  key={index}
                  className="relative bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg rounded-2xl overflow-hidden shadow-lg border border-white/50 dark:border-gray-700/50 animate-pulse"
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
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="group relative bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 border border-white/50 dark:border-gray-700/50"
                >
                  {/* Rank Badge */}
                  <div className="absolute top-4 left-4 z-20 bg-blue-600/90 backdrop-blur-md border border-blue-400/30 text-white px-3 py-1 rounded-full text-sm font-black shadow-lg">
                    #{index + 1}
                  </div>

                  {/* Trend Badge */}
                  <div className="absolute top-4 right-4 z-20 bg-blue-500/80 backdrop-blur-md border border-blue-400/30 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg flex items-center gap-1">
                    <TrendingUp className="h-3 w-3" />
                    {product.trend}
                  </div>

                  {/* Image */}
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                    {/* Quick Actions */}
                    <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-4 group-hover:translate-y-0">
                      <Button
                        onClick={() => handleAddToCart(product)}
                        className="w-full bg-blue-600/90 backdrop-blur-md border border-blue-400/30 text-white hover:bg-blue-700/90 font-semibold"
                      >
                        <ShoppingCart className="h-4 w-4 mr-2" />
                        Quick Add
                      </Button>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-xs font-medium text-blue-600 dark:text-blue-400 bg-blue-100 dark:bg-blue-900/30 px-2 py-1 rounded-full">
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
                      <span className="text-2xl font-black text-gray-900 dark:text-white">
                        ${product.price}
                      </span>
                      <span className="text-sm text-blue-600 dark:text-blue-400 font-semibold">
                        {product.sales} sold
                      </span>
                    </div>

                    {/* Stats */}
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
                </motion.div>
              ))
            )}
          </div>

          {/* View All Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <Link href="/products">
              <Button size="lg" className="bg-blue-600/80 backdrop-blur-md border border-blue-400/30 hover:bg-blue-700/80 text-white font-bold px-8 py-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300">
                View All Trending Products
                <TrendingUp className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </div>
    </Container>
  );
}