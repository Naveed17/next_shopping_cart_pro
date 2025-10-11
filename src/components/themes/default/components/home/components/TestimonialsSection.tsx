'use client';

import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';
import Image from 'next/image';

const testimonials = [
  {
    id: 1,
    name: 'Sarah Johnson',
    role: 'Verified Customer',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop',
    rating: 5,
    text: 'Amazing shopping experience! The variety of vendors and quality of products exceeded my expectations. Fast delivery and excellent customer service.'
  },
  {
    id: 2,
    name: 'Michael Chen',
    role: 'Tech Enthusiast',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop',
    rating: 5,
    text: 'Found the perfect electronics here. The vendor ratings and reviews helped me make informed decisions. Highly recommend this platform!'
  },
  {
    id: 3,
    name: 'Emily Davis',
    role: 'Fashion Lover',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop',
    rating: 5,
    text: 'Love the fashion selection from different vendors. Great prices, authentic products, and the checkout process is seamless. Will shop again!'
  }
];

export default function TestimonialsSection() {
  return (
    <section className="max-w-7xl mx-auto px-4">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
          What Our Customers Say
        </h2>
        <p className="text-gray-600 dark:text-gray-400 text-lg max-w-2xl mx-auto">
          Real feedback from our satisfied customers around the world
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {testimonials.map((testimonial, index) => (
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
        ))}
      </div>
    </section>
  );
}