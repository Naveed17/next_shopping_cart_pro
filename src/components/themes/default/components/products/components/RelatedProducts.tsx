'use client';

import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import { Product } from '@src/@types/common';
import ProductCard from '@src/components/core/ProductCard';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

interface RelatedProductsProps {
  products: Product[];
}

export default function RelatedProducts({ products }: RelatedProductsProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 }}
      className="mt-16"
    >
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">Related Products</h2>

      <div className="relative">
        <Swiper
          modules={[Navigation, Pagination]}
          spaceBetween={24}
          slidesPerView={1}
          navigation={{
            prevEl: '.swiper-button-prev-custom',
            nextEl: '.swiper-button-next-custom',
          }}
          pagination={{
            clickable: true,
            el: '.swiper-pagination-custom',
          }}
          breakpoints={{
            640: {
              slidesPerView: 2,
            },
            768: {
              slidesPerView: 3,
            },
            1024: {
              slidesPerView: 4,
            },
          }}
          className="!pb-12"
        >
          {products.map((product) => (
            <SwiperSlide key={product.id}>
              <ProductCard product={product} />
            </SwiperSlide>
          ))}
        </Swiper>

        <button className="swiper-button-prev-custom absolute top-1/2 -left-4 z-10 -translate-y-1/2 p-2 rounded-full bg-white/80 dark:bg-gray-800/80 backdrop-blur-md border border-gray-200/50 dark:border-gray-700/50 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all shadow-lg">
          <ChevronLeft className="h-5 w-5 text-gray-600 dark:text-gray-400" />
        </button>
        <button className="swiper-button-next-custom absolute top-1/2 -right-4 z-10 -translate-y-1/2 p-2 rounded-full bg-white/80 dark:bg-gray-800/80 backdrop-blur-md border border-gray-200/50 dark:border-gray-700/50 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all shadow-lg">
          <ChevronRight className="h-5 w-5 text-gray-600 dark:text-gray-400" />
        </button>

        <div className="swiper-pagination-custom flex justify-center gap-2 mt-6"></div>
      </div>
    </motion.div>
  );
}