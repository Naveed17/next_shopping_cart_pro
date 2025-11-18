'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Star, ShoppingBag, Zap } from 'lucide-react';
import Button from '@src/components/core/button/button';
import Link from 'next/link';
import Image from 'next/image';
import { useAppSelector } from '@lib/redux/store';
export default function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const slides = useAppSelector(state => state.appData.data)?.slides ?? [];
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides?.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % slides?.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + slides?.length) % slides?.length);

  return (
    <section className="relative min-h-[700px] py-16 md:py-0 rounded-2xl overflow-hidden shadow-2xl m-4 mb-16">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className={`absolute inset-0 bg-gradient-to-r ${slides[currentSlide]?.gradient}`}
        >
          <div className="absolute inset-0 bg-black/40 pointer-events-none" />
          <div className="absolute right-0 rtl:left-0 rtl:right-[unset] top-0 md:w-1/2 h-full">
            {slides[currentSlide]?.image && (
              <Image
                src={slides[currentSlide].image}
                alt={slides[currentSlide]?.title || ''}
                fill
                priority
                sizes="50vw"
                className="object-cover"
              />
            )}
            <div className="absolute inset-0 bg-gradient-to-l from-transparent via-black/20 to-black/60 pointer-events-none" />
          </div>

          {/* Floating Elements */}
          <div className="absolute top-8 ltr:right-8 rtl:left-8 bg-white/10 backdrop-blur-md rounded-full p-4 animate-bounce">
            <ShoppingBag className="h-6 w-6 text-white" />
          </div>
          <div className="absolute top-32 ltr:right-32 rtl:left-32 bg-yellow-400/20 backdrop-blur-md rounded-full p-3 animate-pulse">
            <Star className="h-5 w-5 text-yellow-300" />
          </div>
          <div className="absolute bottom-32 ltr:right-16 rtl:left-32 bg-blue-400/20 backdrop-blur-md rounded-full p-3 animate-bounce delay-300">
            <Zap className="h-5 w-5 text-blue-300" />
          </div>

          <div className="relative h-full flex items-center px-8 md:px-16 z-10">
            <div className="max-w-3xl text-white">
              <motion.div
                initial={{ x: -50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.1, duration: 0.6 }}
                className="inline-flex items-center bg-white/10 backdrop-blur-md rounded-full px-4 py-2 mb-4 border border-white/20"
              >
                <span className="text-sm font-medium text-yellow-300 mr-2">{slides[currentSlide]?.badge}</span>
                <span className="text-sm text-white/80">•</span>
                <span className="text-sm text-white/80 ml-2">{slides[currentSlide]?.offer}</span>
              </motion.div>
              <motion.h1
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.8 }}
                className="text-6xl md:text-8xl text-white font-black mb-4 leading-tight"
              >
                {slides[currentSlide]?.title}
              </motion.h1>

              <motion.span
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.8 }}
                className="block text-4xl md:text-6xl font-black text-yellow-300 mb-6 leading-tight"
              >
                {slides[currentSlide]?.subtitle}
              </motion.span>

              <motion.p
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.6, duration: 0.8 }}
                className="text-xl md:text-2xl mb-8 text-blue-100 max-w-xl"
              >
                {slides[currentSlide]?.description}
              </motion.p>

              <motion.div
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.8, duration: 0.8 }}
                className="flex flex-col sm:flex-row gap-4"
              >
                <Link href="/products">
                  <Button size="lg" className="bg-gradient-to-r from-yellow-400 to-yellow-500 text-black font-bold hover:from-yellow-500 hover:to-yellow-600 transform hover:scale-105 transition-all duration-200 shadow-lg">
                    {slides[currentSlide]?.cta} →
                  </Button>
                </Link>
                <Link href="/vendors">
                  <Button size="lg" variant="outline" className="border-2 border-white text-white hover:bg-white hover:text-black font-semibold backdrop-blur-sm bg-white/10">
                    Browse Vendors
                  </Button>
                </Link>
              </motion.div>

              {/* Trust Indicators */}
              <motion.div
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 1, duration: 0.6 }}
                className="flex md:flex-row flex-col md:items-center gap-3 md:gap-6 mt-8 text-sm text-white/80"
              >
                <div className="flex items-center gap-2">
                  <div className="flex -space-x-1">
                    {[1, 2, 3, 4].map(i => (
                      <div key={i} className="w-6 h-6 rounded-full bg-white/20 border border-white/30" />
                    ))}
                  </div>
                  <span>50k+ Happy Customers</span>
                </div>
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 text-yellow-400 fill-current" />
                  <span>4.9/5 Rating</span>
                </div>
                <div>Free Shipping Worldwide</div>
              </motion.div>
            </div>
          </div>

          {/* Decorative Grid Pattern */}
          <div className="absolute inset-0 opacity-5 pointer-events-none">
            <div className="absolute inset-0 pointer-events-none" style={{
              backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)',
              backgroundSize: '40px 40px'
            }} />
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute hidden md:block left-6 top-1/2 -translate-y-1/2 p-3 bg-white/10 hover:bg-white/20 rounded-full backdrop-blur-md transition-all duration-200 border border-white/20 hover:scale-110"
      >
        <ChevronLeft className="h-6 w-6 text-white" />
      </button>

      <button
        onClick={nextSlide}
        className="absolute hidden md:block right-6 top-1/2 -translate-y-1/2 p-3 bg-white/10 hover:bg-white/20 rounded-full backdrop-blur-md transition-all duration-200 border border-white/20 hover:scale-110"
      >
        <ChevronRight className="h-6 w-6 text-white" />
      </button>

      {/* Slide Indicators */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex space-x-3">
        {slides.map((_: any, index: number) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`h-2 rounded-full transition-all duration-300 ${index === currentSlide
              ? 'bg-white w-8'
              : 'bg-white/50 w-2 hover:bg-white/70'
              }`}
          />
        ))}
      </div>
    </section>
  );
}