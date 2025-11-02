'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { getResponsiveSizes } from '@src/utils/imageOptimizer';

interface ProductImageGalleryProps {
  images: string[];
  productName: string;
}

export default function ProductImageGallery({ images, productName }: ProductImageGalleryProps) {
  const [selectedImage, setSelectedImage] = useState(0);

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      className="space-y-4"
    >
      <div className="relative aspect-square bg-white dark:bg-gray-800 rounded-2xl overflow-hidden border border-gray-200 dark:border-gray-700">
        <Image
          src={images[selectedImage]}
          alt={productName}
          fill
          sizes={getResponsiveSizes('gallery')}
          className="object-cover"
          quality={80}
          priority={true}
        />
      </div>
      <div className="flex gap-3">
        {images.map((image, index) => (
          <button
            key={index}
            onClick={() => setSelectedImage(index)}
            className={`relative w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${
              selectedImage === index
                ? 'border-blue-500 ring-2 ring-blue-500/20'
                : 'border-gray-200 dark:border-gray-700 hover:border-blue-300'
            }`}
          >
            <Image src={image} alt="" fill sizes={getResponsiveSizes('thumbnail')} className="object-cover" quality={60} loading="lazy" />
          </button>
        ))}
      </div>
    </motion.div>
  );
}