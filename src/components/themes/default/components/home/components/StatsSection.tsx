'use client';

import Container from '@components/core/container';
import { useAppSelector } from '@lib/redux/store';
import { motion } from 'framer-motion';
import { Users, ShoppingBag, Star, TrendingUp, Package, Award, Heart, Zap } from 'lucide-react';

// Icon mapping for dynamic icons from API
const iconMap = {
  Users,
  ShoppingBag,
  Star,
  TrendingUp,
  Package,
  Award,
  Heart,
  Zap
};

const getIcon = (iconName: string) => {
  return iconMap[iconName as keyof typeof iconMap] || Users;
};



export default function StatsSection() {
  const appData = useAppSelector((state) => state.appData.data);
  const stats = appData?.stats ?? [];
  const isLoading = !appData || stats?.length === 0;
  return (
    <Container>
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
          {isLoading ? (
            Array.from({ length: 4 }).map((_, index) => (
              <div key={index} className="text-center animate-pulse">
                <div className="w-16 h-16 bg-gray-300 dark:bg-gray-600 rounded-full mx-auto mb-4" />
                <div className="h-8 bg-gray-300 dark:bg-gray-600 rounded mb-2 w-20 mx-auto" />
                <div className="h-5 bg-gray-300 dark:bg-gray-600 rounded mb-1 w-24 mx-auto" />
                <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-32 mx-auto" />
              </div>
            ))
          ) : (
            stats.map((stat: any, index: number) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  {(() => {
                    const IconComponent = getIcon(stat.iconName);
                    return <IconComponent className="h-8 w-8 text-white" />;
                  })()}
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
            ))
          )}
        </div>
      </div>
    </Container>
  );
}