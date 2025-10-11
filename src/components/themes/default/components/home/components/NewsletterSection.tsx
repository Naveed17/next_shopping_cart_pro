'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Gift, Zap, Shield, Bell, Users, Star } from 'lucide-react';
import Button from '@src/components/core/button/button';

export default function NewsletterSection() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubscribed(true);
    setEmail('');
  };

  const benefits = [
    { icon: Gift, text: 'Exclusive Deals', desc: 'Member-only discounts' },
    { icon: Zap, text: 'Early Access', desc: 'New products first' },
    { icon: Shield, text: 'No Spam', desc: 'Unsubscribe anytime' },
    { icon: Bell, text: 'Price Alerts', desc: 'Never miss a sale' }
  ];

  const stats = [
    { number: '50K+', label: 'Subscribers' },
    { number: '4.9', label: 'Rating' },
    { number: '95%', label: 'Satisfaction' }
  ];

  return (
    <section className="max-w-7xl mx-auto px-4">
      <div className="relative bg-blue-50/30 dark:bg-blue-900/10 backdrop-blur-2xl border border-blue-200/40 dark:border-blue-800/40 rounded-3xl p-8 md:p-16 overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: 'radial-gradient(circle at 2px 2px, currentColor 1px, transparent 0)',
            backgroundSize: '40px 40px'
          }} />
        </div>

        {/* Floating Glass Elements */}
        <div className="absolute top-8 right-8 w-20 h-20 bg-blue-400/10 backdrop-blur-md rounded-full border border-blue-300/20 animate-pulse" />
        <div className="absolute bottom-12 left-12 w-16 h-16 bg-blue-500/10 backdrop-blur-md rounded-full border border-blue-300/20 animate-bounce" />
        <div className="absolute top-1/2 right-1/4 w-12 h-12 bg-blue-600/10 backdrop-blur-md rounded-full border border-blue-300/20" />

        <div className="relative z-10">
          {/* Header */}
          <div className="text-center mb-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="inline-flex items-center bg-blue-600/20 backdrop-blur-md border border-blue-300/30 dark:border-blue-700/30 text-blue-800 dark:text-blue-200 px-6 py-3 rounded-full mb-6"
            >
              <Mail className="h-5 w-5 mr-2" />
              <span className="font-semibold text-sm uppercase tracking-wide">Newsletter</span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white mb-4"
            >
              Stay in the Loop
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="text-lg text-blue-700 dark:text-blue-300 max-w-2xl mx-auto mb-8"
            >
              Join thousands of smart shoppers who never miss a deal. Get exclusive offers, early access to sales, and insider shopping tips.
            </motion.p>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
              className="flex items-center justify-center gap-8 mb-12"
            >
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">{stat.number}</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Side - Form */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
            >
              {/* Benefits Grid */}
              <div className="grid grid-cols-2 gap-4 mb-8">
                {benefits.map((benefit, index) => (
                  <div key={index} className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-md border border-blue-200/30 dark:border-blue-700/30 rounded-xl p-4">
                    <benefit.icon className="h-6 w-6 text-blue-600 dark:text-blue-400 mb-2" />
                    <div className="font-semibold text-gray-900 dark:text-white text-sm">{benefit.text}</div>
                    <div className="text-xs text-gray-600 dark:text-gray-400">{benefit.desc}</div>
                  </div>
                ))}
              </div>

              {!subscribed ? (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-blue-500 h-5 w-5" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email address"
                      required
                      className="w-full pl-12 pr-4 py-4 bg-white/70 dark:bg-gray-800/70 backdrop-blur-md border border-blue-200/40 dark:border-blue-700/40 rounded-xl text-gray-900 dark:text-white placeholder-blue-500/60 dark:placeholder-blue-400/60 focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all"
                    />
                  </div>
                  <Button type="submit" size="lg" className="w-full bg-blue-600/80 backdrop-blur-md border border-blue-400/30 hover:bg-blue-700/80 text-white font-bold py-4 rounded-xl">
                    Subscribe Now
                  </Button>
                </form>
              ) : (
                <div className="bg-blue-100/50 dark:bg-blue-900/30 backdrop-blur-md border border-blue-300/40 dark:border-blue-700/40 rounded-xl p-6">
                  <div className="flex items-center justify-center mb-3">
                    <div className="w-12 h-12 bg-blue-600/20 backdrop-blur-md rounded-full flex items-center justify-center border border-blue-400/30">
                      <Mail className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                    </div>
                  </div>
                  <p className="text-blue-800 dark:text-blue-200 font-semibold text-center">
                    Welcome to the family! Check your email for exclusive offers.
                  </p>
                </div>
              )}

              <p className="text-xs text-center text-gray-500 dark:text-gray-400 mt-4">
                By subscribing, you agree to our Privacy Policy. Unsubscribe anytime.
              </p>
            </motion.div>

            {/* Right Side - Offer Card */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="bg-blue-600/80 backdrop-blur-lg border border-blue-400/30 rounded-3xl p-8 text-white relative overflow-hidden">
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-10">
                  <div className="absolute inset-0" style={{
                    backgroundImage: 'radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)',
                    backgroundSize: '24px 24px'
                  }} />
                </div>

                <div className="relative z-10 text-center">
                  <div className="inline-flex items-center bg-white/20 backdrop-blur-md rounded-full px-4 py-2 mb-6 border border-white/30">
                    <Gift className="h-4 w-4 mr-2" />
                    <span className="text-sm font-semibold">Welcome Offer</span>
                  </div>

                  <div className="text-6xl font-black mb-2">20% OFF</div>
                  <div className="text-xl mb-6 opacity-90">Your First Order</div>

                  <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 mb-6">
                    <div className="text-sm opacity-80 mb-2">Use code:</div>
                    <div className="text-2xl font-mono font-bold tracking-wider bg-white/20 backdrop-blur-sm rounded-lg py-2 px-4 border border-white/30">
                      WELCOME20
                    </div>
                  </div>

                  <div className="flex items-center justify-center gap-4 text-sm opacity-80">
                    <div className="flex items-center gap-1">
                      <Users className="h-4 w-4" />
                      <span>50K+ used</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 fill-current" />
                      <span>4.9 rating</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}