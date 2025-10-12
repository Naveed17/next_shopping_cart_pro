'use client';

import Container from '@components/core/container';
import { useAppSelector } from '@lib/redux/store';
import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';
import Image from 'next/image';



export default function TestimonialsSection() {
  const appData = useAppSelector((state) => state.appData.data);
  const testimonials = appData?.testimonials ?? [];
  const isLoading = !appData || testimonials?.length === 0;
  return (
    <Container>
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
          What Our Customers Say
        </h2>
        <p className="text-gray-600 dark:text-gray-400 text-lg max-w-2xl mx-auto">
          Real feedback from our satisfied customers around the world
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {isLoading ? (
          Array.from({ length: 3 }).map((_, index) => (
            <div
              key={index}
              className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-100 dark:border-gray-700 relative animate-pulse"
            >
              <div className="absolute -top-3 left-6 w-6 h-6 bg-gray-300 dark:bg-gray-600 rounded-full" />
              <div className="flex items-center mb-4 gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <div key={i} className="w-4 h-4 bg-gray-300 dark:bg-gray-600 rounded" />
                ))}
              </div>
              <div className="space-y-2 mb-6">
                <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-full" />
                <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-5/6" />
                <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-4/6" />
              </div>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-gray-300 dark:bg-gray-600 rounded-full mr-4" />
                <div>
                  <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-24 mb-2" />
                  <div className="h-3 bg-gray-300 dark:bg-gray-600 rounded w-20" />
                </div>
              </div>
            </div>
          ))
        ) : (
          testimonials.map((testimonial: any, index: number) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2, duration: 0.6 }}
              viewport={{ once: true }}
              className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-100 dark:border-gray-700 relative"
            >
              <div className="absolute -top-3 left-6 w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center">
                <Quote className="h-3 w-3 text-white" />
              </div>

              <div className="flex items-center mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                ))}
              </div>

              <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                &ldquo;{testimonial.text}&rdquo;
              </p>

              <div className="flex items-center">
                <div className="w-12 h-12 rounded-full overflow-hidden mr-4">
                  <Image
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    width={48}
                    height={48}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <div className="font-semibold text-gray-900 dark:text-white">
                    {testimonial.name}
                  </div>
                  <div className="text-sm text-blue-600 dark:text-blue-400">
                    {testimonial.role}
                  </div>
                </div>
              </div>
            </motion.div>
          ))
        )}
      </div>
    </Container>
  );
}