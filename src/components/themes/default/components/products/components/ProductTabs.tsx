'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Star, Check, ChevronDown, ChevronUp, User, Calendar } from 'lucide-react';
import { Product } from '@src/@types/common';

interface ProductTabsProps {
  product: Product;
}

export default function ProductTabs({ product }: ProductTabsProps) {
  const [activeTab, setActiveTab] = useState('description');
  const [showAllReviews, setShowAllReviews] = useState(false);

  const reviews = [
    {
      id: 1,
      user: 'John D.',
      rating: 5,
      date: '2024-01-15',
      comment: 'Excellent sound quality and comfortable to wear for long periods. The noise cancellation works perfectly!'
    },
    {
      id: 2,
      user: 'Sarah M.',
      rating: 4,
      date: '2024-01-10',
      comment: 'Great headphones overall. Battery life is impressive and the build quality feels premium.'
    },
    {
      id: 3,
      user: 'Mike R.',
      rating: 5,
      date: '2024-01-08',
      comment: 'Best purchase I\u0027ve made this year. The active noise cancellation is a game changer for my daily commute.'
    }
  ];

  const specifications = [
    { label: 'Driver Size', value: '40mm' },
    { label: 'Frequency Response', value: '20Hz - 20kHz' },
    { label: 'Battery Life', value: '30 hours' },
    { label: 'Charging Time', value: '2 hours' },
    { label: 'Weight', value: '250g' },
    { label: 'Connectivity', value: 'Bluetooth 5.0, 3.5mm' },
    { label: 'Noise Cancellation', value: 'Active ANC' },
    { label: 'Warranty', value: '2 years' }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      className="mt-16 bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl border border-gray-200/50 dark:border-gray-700/50 overflow-hidden"
    >
      <div className="border-b border-gray-200/50 dark:border-gray-700/50">
        <div className="flex space-x-8 px-6">
          {['description', 'specifications', 'reviews'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`py-4 px-2 border-b-2 font-medium text-sm capitalize transition-colors ${activeTab === tab
                  ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                  : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
                }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      <div className="p-6">
        {activeTab === 'description' && (
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Product Description</h3>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              Experience premium audio quality with our flagship wireless headphones. Featuring advanced active noise cancellation technology,
              these headphones deliver crystal-clear sound while blocking out unwanted ambient noise. The ergonomic design ensures comfort
              during extended listening sessions, making them perfect for work, travel, or leisure.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
              <div>
                <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Key Features</h4>
                <ul className="space-y-2 text-gray-600 dark:text-gray-400">
                  <li className="flex items-center gap-2"><Check className="h-4 w-4 text-green-500" />Active Noise Cancellation</li>
                  <li className="flex items-center gap-2"><Check className="h-4 w-4 text-green-500" />30-hour Battery Life</li>
                  <li className="flex items-center gap-2"><Check className="h-4 w-4 text-green-500" />Quick Charge Technology</li>
                  <li className="flex items-center gap-2"><Check className="h-4 w-4 text-green-500" />Premium Materials</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 dark:text-white mb-3">What&apos;s in the Box</h4>
                <ul className="space-y-2 text-gray-600 dark:text-gray-400">
                  <li>• Wireless Headphones</li>
                  <li>• USB-C Charging Cable</li>
                  <li>• 3.5mm Audio Cable</li>
                  <li>• Carrying Case</li>
                  <li>• User Manual</li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'specifications' && (
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Technical Specifications</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {specifications.map((spec, index) => (
                <div key={index} className="flex justify-between py-3 border-b border-gray-200/50 dark:border-gray-700/50">
                  <span className="font-medium text-gray-700 dark:text-gray-300">{spec.label}</span>
                  <span className="text-gray-600 dark:text-gray-400">{spec.value}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'reviews' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Customer Reviews</h3>
              <div className="flex items-center gap-2">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className={`h-4 w-4 ${i < Math.floor(product.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} />
                  ))}
                </div>
                <span className="text-sm text-gray-600 dark:text-gray-400">({product.reviews} reviews)</span>
              </div>
            </div>

            <div className="space-y-4">
              {reviews.slice(0, showAllReviews ? reviews.length : 2).map((review) => (
                <div key={review.id} className="bg-gray-50/50 dark:bg-gray-700/30 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                        <User className="h-4 w-4 text-white" />
                      </div>
                      <span className="font-medium text-gray-900 dark:text-white">{review.user}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className={`h-3 w-3 ${i < review.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} />
                        ))}
                      </div>
                      <span className="text-xs text-gray-500 flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {review.date}
                      </span>
                    </div>
                  </div>
                  <p className="text-gray-600 dark:text-gray-400">{review.comment}</p>
                </div>
              ))}
            </div>

            {reviews.length > 2 && (
              <button
                onClick={() => setShowAllReviews(!showAllReviews)}
                className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium"
              >
                {showAllReviews ? (
                  <><ChevronUp className="h-4 w-4" />Show Less</>
                ) : (
                  <><ChevronDown className="h-4 w-4" />Show All Reviews</>
                )}
              </button>
            )}
          </div>
        )}
      </div>
    </motion.div>
  );
}