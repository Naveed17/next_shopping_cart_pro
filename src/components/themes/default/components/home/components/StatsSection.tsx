'use client';

import { motion } from 'framer-motion';
import { Users, ShoppingBag, Star, TrendingUp } from 'lucide-react';

const stats = [
  {
    icon: Users,
    value: '50K+',
    label: 'Happy Customers',
    description: 'Satisfied shoppers worldwide'
  },
  {
    icon: ShoppingBag,
    value: '100K+',
    label: 'Products Sold',
    description: 'Items delivered successfully'
  },
  {
    icon: Star,
    value: '4.9',
    label: 'Average Rating',
    description: 'Customer satisfaction score'
  },
  {
    icon: TrendingUp,
    value: '99%',
    label: 'Success Rate',
    description: 'Order completion rate'
  }
];

export default function StatsSection() {
  return (
    <section className="max-w-7xl mx-auto px-4">
      <div className="bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 rounded-2xl p-8 md:p-12">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Trusted by Thousands
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-lg max-w-2xl mx-auto">
            Join our growing community of satisfied customers and vendors from around the world
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <stat.icon className="h-8 w-8 text-white" />
              </div>
              <div className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-2">
                {stat.value}
              </div>
              <div className="text-lg font-semibold text-blue-600 dark:text-blue-400 mb-1">
                {stat.label}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                {stat.description}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}