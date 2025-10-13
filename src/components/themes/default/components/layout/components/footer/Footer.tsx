'use client'
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Facebook, Twitter, Instagram, Youtube, Star, Shield, Truck, CreditCard, Send, Award, Users, Globe, Sparkles, Package, Target, Check, Heart } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setIsSubscribed(true);
      setEmail('');
      setTimeout(() => setIsSubscribed(false), 3000);
    }
  };

  const quickLinks = [
    { name: 'Products', href: '/products' },
    { name: 'Vendors', href: '/vendors' },
    { name: 'Categories', href: '/categories' },
    { name: 'Deals', href: '/deals' }
  ];

  const support = [
    { name: 'Help Center', href: '/help' },
    { name: 'Returns', href: '/returns' },
    { name: 'Shipping Info', href: '/shipping' },
    { name: 'Track Order', href: '/track' }
  ];

  const company = [
    { name: 'About Us', href: '/about' },
    { name: 'Careers', href: '/careers' },
    { name: 'Press', href: '/press' },
    { name: 'Blog', href: '/blog' }
  ];

  const legal = [
    { name: 'Privacy Policy', href: '/privacy' },
    { name: 'Terms of Service', href: '/terms' },
    { name: 'Cookie Policy', href: '/cookies' },
    { name: 'GDPR', href: '/gdpr' }
  ];

  const socialLinks = [
    { icon: Facebook, href: '#', name: 'Facebook' },
    { icon: Twitter, href: '#', name: 'Twitter' },
    { icon: Instagram, href: '#', name: 'Instagram' },
    { icon: Youtube, href: '#', name: 'YouTube' }
  ];

  const features = [
    { icon: Shield, text: 'Secure Shopping' },
    { icon: Truck, text: 'Free Shipping' },
    { icon: CreditCard, text: 'Easy Returns' },
    { icon: Star, text: 'Top Rated' }
  ];

  const stats = [
    { icon: Users, value: '50K+', label: 'Happy Customers' },
    { icon: Globe, value: '100+', label: 'Countries' },
    { icon: Award, value: '99.9%', label: 'Uptime' },
    { icon: Star, value: '4.9/5', label: 'Rating' }
  ];

  const paymentMethods = [
    { name: 'Visa', icon: CreditCard },
    { name: 'Mastercard', icon: CreditCard },
    { name: 'PayPal', icon: CreditCard },
    { name: 'Apple Pay', icon: CreditCard },
    { name: 'Google Pay', icon: CreditCard }
  ];

  return (
    <footer className="relative bg-gray-900/95 dark:bg-gray-950/95 backdrop-blur-xl border-t border-blue-200/20 dark:border-blue-800/20 text-white overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle at 2px 2px, currentColor 1px, transparent 0)',
          backgroundSize: '48px 48px'
        }} />
      </div>

      {/* Floating Glass Elements */}
      <div className="absolute top-12 right-12 w-24 h-24 bg-blue-500/10 backdrop-blur-md rounded-full border border-blue-400/20" />
      <div className="absolute bottom-20 left-16 w-16 h-16 bg-blue-600/10 backdrop-blur-md rounded-full border border-blue-400/20" />

      <div className="relative z-10 container mx-auto px-4 py-16">
        {/* Newsletter Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 backdrop-blur-md rounded-2xl border border-blue-400/30 p-8 mb-16"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl font-bold text-white mb-3">
                Stay Updated with Latest Deals
              </h3>
              <p className="text-blue-200 mb-4">
                Get exclusive offers, new product alerts, and shopping tips delivered to your inbox.
              </p>
              <div className="flex md:flex-row flex-col gap-4 text-sm text-blue-300">
                <span className="flex items-center gap-1">
                  <Sparkles className="h-4 w-4" />
                  Exclusive Deals
                </span>
                <span className="flex items-center gap-1">
                  <Package className="h-4 w-4" />
                  New Arrivals
                </span>
                <span className="flex items-center gap-1">
                  <Target className="h-4 w-4" />
                  Personalized Offers
                </span>
              </div>
            </div>
            <div>
              <form onSubmit={handleNewsletterSubmit} className="flex flex-col md:flex-row gap-3">
                <div className="flex-1 relative">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address"
                    className="w-full px-4 py-3 bg-white/10 backdrop-blur-md border border-blue-400/30 rounded-lg text-white placeholder-blue-300 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20"
                    required
                  />
                </div>
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
                >
                  <Send className="h-4 w-4" />
                  Subscribe
                </motion.button>
              </form>
              {isSubscribed && (
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-green-400 text-sm mt-2 flex items-center gap-2"
                >
                  <Check className="h-4 w-4" />
                  Successfully subscribed!
                </motion.p>
              )}
            </div>
          </div>
        </motion.div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-16"
        >
          {stats.map((stat, index) => (
            <div key={index} className="text-center bg-blue-900/20 backdrop-blur-md rounded-xl border border-blue-700/30 p-6">
              <stat.icon className="h-8 w-8 text-blue-400 mx-auto mb-3" />
              <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
              <div className="text-blue-300 text-sm">{stat.label}</div>
            </div>
          ))}
        </motion.div>

        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12 mb-12">
          {/* Company Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="md:col-span-2 lg:col-span-2"
          >
            <div className="flex items-center mb-6">
              <div className="w-10 h-10 bg-blue-600/80 backdrop-blur-md rounded-lg flex items-center justify-center mr-3 border border-blue-400/30">
                <span className="text-white font-bold text-xl">S</span>
              </div>
              <span className="text-2xl font-bold">ShopCart</span>
            </div>

            <p className="text-blue-200 dark:text-blue-300 mb-6 leading-relaxed">
              Your trusted multi-vendor marketplace connecting you with quality products from verified sellers worldwide. Shop with confidence and discover amazing deals every day.
            </p>

            {/* Contact Info */}
            <div className="space-y-3 mb-6">
              <div className="flex items-center text-blue-200 dark:text-blue-300">
                <Mail className="h-4 w-4 mr-3 text-blue-400" />
                <span className="text-sm">support@shopcart.com</span>
              </div>
              <div className="flex items-center text-blue-200 dark:text-blue-300">
                <Phone className="h-4 w-4 mr-3 text-blue-400" />
                <span className="text-sm">+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center text-blue-200 dark:text-blue-300">
                <MapPin className="h-4 w-4 mr-3 text-blue-400" />
                <span className="text-sm">123 Commerce St, NY 10001</span>
              </div>
            </div>


          </motion.div>

          {/* Quick Links & Support - Mobile 2 columns */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
            className="grid grid-cols-2 gap-8 md:contents"
          >
            <div>
              <h4 className="text-lg font-bold mb-6 text-white">Quick Links</h4>
              <ul className="space-y-3">
                {quickLinks.map((link, index) => (
                  <li key={index}>
                    <Link href={link.href} className="text-blue-200 dark:text-blue-300 hover:text-white transition-colors text-sm flex items-center group">
                      <span className="w-1 h-1 bg-blue-400 rounded-full mr-3 group-hover:w-2 transition-all"></span>
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-bold mb-6 text-white">Support</h4>
              <ul className="space-y-3">
                {support.map((link, index) => (
                  <li key={index}>
                    <Link href={link.href} className="text-blue-200 dark:text-blue-300 hover:text-white transition-colors text-sm flex items-center group">
                      <span className="w-1 h-1 bg-blue-400 rounded-full mr-3 group-hover:w-2 transition-all"></span>
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>

          {/* Company */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            viewport={{ once: true }}
          >
            <h4 className="text-lg font-bold mb-6 text-white">Company</h4>
            <ul className="space-y-3 mb-8">
              {company.map((link, index) => (
                <li key={index}>
                  <Link href={link.href} className="text-blue-200 dark:text-blue-300 hover:text-white transition-colors text-sm flex items-center group">
                    <span className="w-1 h-1 bg-blue-400 rounded-full mr-3 group-hover:w-2 transition-all"></span>
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>

            {/* Social Links */}
            <div>
              <h5 className="text-sm font-semibold mb-4 text-blue-200">Follow Us</h5>
              <div className="flex space-x-3">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.href}
                    className="w-10 h-10 bg-blue-600/20 backdrop-blur-md border border-blue-500/30 rounded-lg flex items-center justify-center hover:bg-blue-600/40 transition-all duration-300 group"
                    aria-label={social.name}
                  >
                    <social.icon className="h-4 w-4 text-blue-400 group-hover:text-white transition-colors" />
                  </a>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Payment Methods */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          viewport={{ once: true }}
          className="border-t border-blue-800/30 pt-8 mb-8"
        >
          <div className="text-center">
            <h4 className="text-lg font-semibold text-white mb-4">We Accept</h4>
            <div className="flex justify-center items-center gap-2 md:gap-4 flex-wrap">
              {paymentMethods.map((method, index) => (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.1, y: -2 }}
                  className="bg-white/10 backdrop-blur-md border border-blue-400/30 rounded-lg p-3 flex items-center gap-2 min-w-[100px] justify-center"
                >
                  <method.icon className="h-5 w-5 text-blue-400" />
                  <span className="text-blue-200 text-sm font-medium">{method.name}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Bottom Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          viewport={{ once: true }}
          className="border-t border-blue-800/30 pt-8"
        >
          <div className="flex flex-col lg:flex-row justify-between items-center gap-6">
            {/* Copyright */}
            <div className="text-center lg:text-left">
              <p className="text-blue-200 dark:text-blue-300 text-sm">
                © 2024 ShopCart. All rights reserved. Made with <Heart className="h-4 w-4 text-red-400 inline mx-1" /> for shoppers worldwide.
              </p>
            </div>

            {/* Legal Links */}
            <div className="flex flex-wrap justify-center gap-6">
              {legal.map((link, index) => (
                <Link
                  key={index}
                  href={link.href}
                  className="text-blue-300 hover:text-white text-sm transition-colors"
                >
                  {link.name}
                </Link>
              ))}
            </div>

            {/* Trust Badges */}
            <div className="flex items-center gap-4">
              <div className="bg-blue-600/20 backdrop-blur-md border border-blue-500/30 rounded-lg px-3 py-2">
                <span className="text-xs text-blue-200">SSL Secured</span>
              </div>
              <div className="bg-blue-600/20 backdrop-blur-md border border-blue-500/30 rounded-lg px-3 py-2">
                <span className="text-xs text-blue-200">GDPR Compliant</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}