'use client';

import { motion } from 'framer-motion';
import { Shield, Truck, CreditCard, Headphones, Award, Globe } from 'lucide-react';

const features = [
  {
    icon: Shield,
    title: 'Secure Shopping',
    description: 'Your data and payments are protected with enterprise-grade security'
  },
  {
    icon: Truck,
    title: 'Fast Delivery',
    description: 'Quick and reliable shipping from trusted vendors worldwide'
  },
  {
    icon: CreditCard,
    title: 'Easy Payments',
    description: 'Multiple payment options with secure checkout process'
  },
  {
    icon: Headphones,
    title: '24/7 Support',
    description: 'Round-the-clock customer service to help with any questions'
  },
  {
    icon: Award,
    title: 'Quality Guarantee',
    description: 'Only verified vendors with high-quality products and ratings'
  },
  {
    icon: Globe,
    title: 'Global Reach',
    description: 'Shop from vendors around the world with international shipping'
  }
];

export default function WhyChooseUsSection() {
  return (
    <section className="max-w-7xl mx-auto px-4">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
          Why Choose ShopCart?
        </h2>
        <p className="text-gray-600 dark:text-gray-400 text-lg max-w-2xl mx-auto">
          We provide the best shopping experience with trusted vendors and exceptional service
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {features.map((feature, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.6 }}
            viewport={{ once: true }}
            className="group p-6 bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100 dark:border-gray-700"
          >
            <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center mb-4 group-hover:bg-blue-600 group-hover:scale-110 transition-all duration-300">
              <feature.icon className="h-6 w-6 text-blue-600 group-hover:text-white transition-colors duration-300" />
            </div>
            
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
              {feature.title}
            </h3>
            
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              {feature.description}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}