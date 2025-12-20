'use client'
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Facebook, Twitter, Instagram, Youtube, Send, Sparkles, Package, Target, Check } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import Input from '@src/components/core/input';
import Image from 'next/image';
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


  const paymentMethods = [
    {
      name: 'Visa',
      icon: () => (
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          className="w-6 h-6 mx-auto text-current"
        >
          <path fill="none" d="M0 0h24v24H0z" />
          <path d="M1 4h22v2H1V4zm0 14h22v2H1v-2zm18.622-3.086-.174-.87h-1.949l-.31.863-1.562.003c1.005-2.406 1.75-4.19 2.236-5.348.127-.303.353-.457.685-.455.254.002.669.002 1.245 0L21 14.912l-1.378.003zm-1.684-2.062h1.256l-.47-2.18-.786 2.18zM7.872 9.106l1.57.002-2.427 5.806-1.59-.001c-.537-2.07-.932-3.606-1.184-4.605-.077-.307-.23-.521-.526-.622-.263-.09-.701-.23-1.315-.419v-.16h2.509c.434 0 .687.21.769.64l.62 3.289 1.574-3.93zm3.727.002-1.24 5.805-1.495-.002 1.24-5.805 1.495.002zM14.631 9c.446 0 1.01.138 1.334.267l-.262 1.204c-.293-.118-.775-.277-1.18-.27-.59.009-.954.256-.954.493 0 .384.632.578 1.284.999.743.48.84.91.831 1.378-.01.971-.831 1.929-2.564 1.929-.791-.012-1.076-.078-1.72-.306l.272-1.256c.656.274.935.361 1.495.361.515 0 .956-.207.96-.568.002-.257-.155-.384-.732-.702-.577-.317-1.385-.756-1.375-1.64C12.033 9.759 13.107 9 14.63 9z" />
        </svg>

      )
    },
    {
      name: 'Mastercard',
      icon: () => (
        <svg
          width="24"
          height="24"
          viewBox="0 0 372.48 372.48"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          className="w-6 h-6 mx-auto text-current"
        >
          <path d="M357.48,71.246H15c-8.271,0-15,6.729-15,15v199.988c0,8.271,6.728,15,15,15h342.48c8.271,0,15-6.729,15-15V86.246 C372.48,77.975,365.752,71.246,357.48,71.246z M86.293,186.24c0-23.568,14.379-43.842,34.824-52.509l-34.718,55.855 C86.335,188.479,86.293,187.364,86.293,186.24z M89.167,204.076l46.162-74.268c2.604-0.366,5.261-0.568,7.964-0.568 c5.59,0,11.068,0.811,16.301,2.369l-59.086,92.232C95.492,218.142,91.6,211.44,89.167,204.076z M107.887,230.86l61.16-95.469 c3.521,1.79,6.867,3.955,9.984,6.473c-10.889,12.254-16.844,27.809-16.844,44.376c0,1.22,0.037,2.434,0.102,3.643l-34.881,51.088 C120.215,238.88,113.606,235.409,107.887,230.86z M143.293,243.24c-1.74,0-3.459-0.091-5.16-0.245l26.49-38.798 c2.689,9.732,7.572,18.726,14.408,26.419C168.92,238.784,156.41,243.24,143.293,243.24z M229.188,243.24 c-14.785,0-28.808-5.651-39.482-15.912c-11.297-10.858-17.518-25.45-17.518-41.088s6.221-30.23,17.518-41.088 c10.675-10.261,24.697-15.912,39.482-15.912c31.43,0,57,25.57,57,57S260.617,243.24,229.188,243.24z" />
        </svg>

      )
    },
    {
      name: 'PayPal',
      icon: () => (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 48 48"
          width="24"
          height="24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-6 h-6 mx-auto text-current"
        >
          <path d="M14.25,4.5H26.37c4.18,0,7.44.88,9.24,2.94,1.64,1.87,2.13,3.94,1.65,7A6.09,6.09,0,0,1,39,15.74C40.53,17.5,40.83,20,40.25,23c-1.4,7.18-6.18,9.67-12.29,9.67H27A1.52,1.52,0,0,0,25.51,34l-.07.41L24.25,41.9l-.06.32a1.52,1.52,0,0,1-1.5,1.28H16.38A1.41,1.41,0,0,1,14.86,42c.84-5.36,1.65-10.39,2.49-15.74a5.25,5.25,0,0,1,1.49-.06h4.24c7,0,12.46-2.83,14.06-11l.12-.71A9.21,9.21,0,0,0,36,13.85l-.36-.11-.76-.19c-.26-.06-.52-.11-.8-.15a19.18,19.18,0,0,0-3.13-.23H20.71a1.45,1.45,0,0,0-.66.15,1.52,1.52,0,0,0-.84,1.13q-1.93,12.32-3.89,24.61l0,.11H8.52a1,1,0,0,1-1-1.2l5-32A1.74,1.74,0,0,1,14.25,4.5Z" />
        </svg>





      )
    },
    {
      name: 'Apple Pay',
      icon: () => (
        <svg
          fill="currentColor"
          width="24"
          height="24"
          viewBox="0 0 32 32"
          xmlns="http://www.w3.org/2000/svg"
          className="w-6 h-6 mx-auto text-current"
        >
          <path d="M5.849 11.047c-.376.448-.975.803-1.573.751-.079-.604.219-1.251.563-1.652.375-.457 1.031-.785 1.563-.812.063.631-.183 1.251-.552 1.713zM6.396 11.917c-.869-.053-1.615.499-2.027.499-.421 0-1.052-.473-1.739-.457-.891.011-1.724.52-2.177 1.339-.943 1.629-.245 4.041.661 5.369.443.656.973 1.375 1.672 1.355.661-.027.927-.437 1.724-.437.807 0 1.036.437 1.74.421.723-.011 1.181-.656 1.624-1.312.505-.745.713-1.475.724-1.511-.011-.016-1.401-.552-1.411-2.167-.011-1.355 1.093-2 1.14-2.037-.62-.937-1.599-1.036-1.932-1.061zM11.412 10.083v9.855h1.515v-3.369h2.095c1.911 0 3.255-1.328 3.255-3.245 0-1.921-1.317-3.24-3.203-3.24zm1.515 1.292h1.745c1.312 0 2.063.708 2.063 1.953s-.751 1.959-2.073 1.959h-1.735zM21.036 20.011c.953 0 1.833-.484 2.235-1.256h.032v1.183h1.4v-4.907c0-1.416-1.124-2.337-2.859-2.337-1.604 0-2.792.932-2.833 2.208h1.359c.115-.609.667-1.005 1.433-1.005.927 0 1.443.437 1.443 1.24v.541l-1.885.115c-1.761.109-2.709.833-2.709 2.099 0 1.276.98 2.12 2.385 2.12zm.412-1.167c-.808 0-1.323-.391-1.323-.989 0-.62.495-.985 1.437-1.043l1.683-.104v.557c0 .923-.776 1.579-1.803 1.579zM26.573 22.62c1.473 0 2.167-.573 2.771-2.297l2.656-7.531h-1.536l-1.781 5.817h-.032l-1.781-5.817h-1.583l2.563 7.172-.136.437c-.235.735-.609 1.02-1.276 1.02-.12 0-.349-.015-.443-.025v1.183c.088.025.464.036.573.036z" />
        </svg>

      )
    },
    {
      name: 'Google Pay',
      icon: () => (
        <svg
          fill="currentColor"
          width="24"
          height="24"
          viewBox="0 0 32 32"
          xmlns="http://www.w3.org/2000/svg"
          className="w-6 h-6 mx-auto text-current"
        >
          <g strokeWidth="0"></g>
          <g strokeLinecap="round" strokeLinejoin="round"></g>
          <g>
            <path d="M32 13.333l-4.177 9.333h-1.292l1.552-3.266-2.75-6.068h1.359l1.99 4.651h0.026l1.927-4.651zM14.646 16.219v3.781h-1.313v-9.333h3.474c0.828-0.021 1.63 0.266 2.25 0.807 0.615 0.505 0.953 1.219 0.943 1.974 0.010 0.766-0.339 1.5-0.943 1.979-0.604 0.531-1.354 0.792-2.25 0.792zM14.641 11.818v3.255h2.198c0.484 0.016 0.958-0.161 1.297-0.479 0.339-0.302 0.526-0.714 0.526-1.141 0-0.432-0.188-0.844-0.526-1.141-0.349-0.333-0.818-0.51-1.297-0.495zM22.63 13.333c0.833 0 1.495 0.234 1.979 0.698s0.724 1.099 0.724 1.906v3.859h-1.083v-0.87h-0.047c-0.469 0.714-1.089 1.073-1.865 1.073-0.667 0-1.219-0.203-1.667-0.615-0.438-0.385-0.682-0.948-0.672-1.531 0-0.646 0.234-1.161 0.708-1.547 0.469-0.38 1.099-0.573 1.885-0.573 0.672 0 1.224 0.13 1.656 0.385v-0.271c0.005-0.396-0.167-0.776-0.464-1.042-0.297-0.276-0.688-0.432-1.094-0.427-0.63 0-1.13 0.276-1.5 0.828l-0.995-0.646c0.547-0.818 1.359-1.229 2.432-1.229zM21.167 17.88c-0.005 0.302 0.135 0.583 0.375 0.766 0.25 0.203 0.563 0.313 0.88 0.307 0.474 0 0.932-0.198 1.271-0.547 0.359-0.333 0.563-0.802 0.563-1.292-0.354-0.292-0.844-0.438-1.474-0.438-0.464 0-0.844 0.115-1.151 0.344-0.307 0.234-0.464 0.516-0.464 0.859zM5.443 10.667c1.344-0.016 2.646 0.479 3.641 1.391l-1.552 1.521c-0.568-0.526-1.318-0.813-2.089-0.797-1.385 0.005-2.609 0.891-3.057 2.198-0.229 0.661-0.229 1.38 0 2.042 0.448 1.307 1.672 2.193 3.057 2.198 0.734 0 1.365-0.182 1.854-0.505 0.568-0.375 0.964-0.958 1.083-1.625h-2.938v-2.052h5.13c0.063 0.359 0.094 0.719 0.094 1.083 0 1.625-0.594 3-1.62 3.927-0.901 0.813-2.135 1.286-3.604 1.286-2.047 0.010-3.922-1.125-4.865-2.938-0.771-1.505-0.771-3.286 0-4.792 0.943-1.813 2.818-2.948 4.859-2.938z"></path>
          </g>
        </svg>
      )
    }
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

      <div className="relative z-10 container mx-auto px-4 pt-16 pb-6">
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
                  <Input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address"
                    className="w-full px-4 py-3 bg-white/10 backdrop-blur-md border border-blue-400/30 rounded-lg text-black placeholder-blue-300 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20"
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



        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12 mb-16">
          {/* Company Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="md:col-span-2 lg:col-span-2"
          >
            {/* Logo */}
            <Link href="/" className="flex items-center justify-start mb-3 max-w-40">
              <Image src='/logo.png' alt="logo" width={160} height={30} />
            </Link>

            <p className="text-blue-100/80 mb-8 leading-relaxed text-base">
              Your trusted multi-vendor marketplace connecting you with quality products from verified sellers worldwide. Shop with confidence and discover amazing deals every day.
            </p>

            {/* Contact Info */}
            <div className="space-y-4 mb-8">
              <div className="flex items-center text-blue-100/70 hover:text-white transition-colors group">
                <div className="w-8 h-8 bg-blue-500/20 rounded-lg flex items-center justify-center mr-4 group-hover:bg-blue-500/30 transition-colors">
                  <Mail className="h-4 w-4 text-blue-400" />
                </div>
                <span className="text-sm font-medium">support@shopcart.com</span>
              </div>
              <div className="flex items-center text-blue-100/70 hover:text-white transition-colors group">
                <div className="w-8 h-8 bg-blue-500/20 rounded-lg flex items-center justify-center mr-4 group-hover:bg-blue-500/30 transition-colors">
                  <Phone className="h-4 w-4 text-blue-400" />
                </div>
                <span className="text-sm font-medium">+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center text-blue-100/70 hover:text-white transition-colors group">
                <div className="w-8 h-8 bg-blue-500/20 rounded-lg flex items-center justify-center mr-4 group-hover:bg-blue-500/30 transition-colors">
                  <MapPin className="h-4 w-4 text-blue-400" />
                </div>
                <span className="text-sm font-medium">123 Commerce St, NY 10001</span>
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
              <h4 className="text-xl font-black mb-6 text-white relative">
                Quick Links
                <div className="absolute -bottom-2 left-0 w-8 h-0.5 bg-gradient-to-r from-blue-400 to-blue-600 rounded-full"></div>
              </h4>
              <ul className="space-y-4">
                {quickLinks.map((link, index) => (
                  <li key={index}>
                    <Link href={link.href} className="text-blue-100/70 hover:text-white transition-all duration-300 text-sm flex items-center group hover:translate-x-1">
                      <div className="w-1.5 h-1.5 bg-blue-400 rounded-full mr-3 group-hover:w-3 group-hover:bg-blue-300 transition-all duration-300"></div>
                      <span className="font-medium">{link.name}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-xl font-black mb-6 text-white relative">
                Support
                <div className="absolute -bottom-2 left-0 w-8 h-0.5 bg-gradient-to-r from-blue-400 to-blue-600 rounded-full"></div>
              </h4>
              <ul className="space-y-4">
                {support.map((link, index) => (
                  <li key={index}>
                    <Link href={link.href} className="text-blue-100/70 hover:text-white transition-all duration-300 text-sm flex items-center group hover:translate-x-1">
                      <div className="w-1.5 h-1.5 bg-blue-400 rounded-full mr-3 group-hover:w-3 group-hover:bg-blue-300 transition-all duration-300"></div>
                      <span className="font-medium">{link.name}</span>
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
            <h4 className="text-xl font-black mb-6 text-white relative">
              Company
              <div className="absolute -bottom-2 left-0 w-8 h-0.5 bg-gradient-to-r from-blue-400 to-blue-600 rounded-full"></div>
            </h4>
            <ul className="space-y-4 mb-10">
              {company.map((link, index) => (
                <li key={index}>
                  <Link href={link.href} className="text-blue-100/70 hover:text-white transition-all duration-300 text-sm flex items-center group hover:translate-x-1">
                    <div className="w-1.5 h-1.5 bg-blue-400 rounded-full mr-3 group-hover:w-3 group-hover:bg-blue-300 transition-all duration-300"></div>
                    <span className="font-medium">{link.name}</span>
                  </Link>
                </li>
              ))}
            </ul>

            {/* Social Links */}
            <div>
              <h5 className="text-base font-bold mb-5 text-white">Follow Us</h5>
              <div className="flex space-x-3">
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={index}
                    href={social.href}
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-11 h-11 bg-gradient-to-br from-blue-500/20 to-blue-600/20 backdrop-blur-xl border border-blue-400/30 rounded-xl flex items-center justify-center hover:from-blue-500/40 hover:to-blue-600/40 hover:border-blue-300/50 transition-all duration-300 group shadow-lg shadow-blue-500/10"
                    aria-label={social.name}
                  >
                    <social.icon className="h-5 w-5 text-blue-300 group-hover:text-white transition-colors duration-300" />
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Bottom Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          viewport={{ once: true }}
          className="border-t border-gray-800 pt-6 relative after:absolute after:top-0 after:left-0 after:right-0 after:h-px after:bg-gray-600"
        >
          <div className="flex flex-col lg:flex-row justify-between items-center gap-4">
            {/* Copyright */}
            <div className="text-center lg:text-left">
              <p className="text-blue-100/70 text-sm font-medium">
                © 2025 ShopCart. All rights reserved.
              </p>
            </div>

            {/* Payment Methods */}
            <div className="flex items-center gap-2">
              {paymentMethods.map((method, index) => (
                <div
                  key={index}
                  className="w-16 h-8  border border-white/20 rounded-lg flex items-center justify-center hover:bg-white/20 transition-colors"
                >
                  <div className="text-blue-300 text-sm">
                    <method.icon />
                  </div>
                </div>
              ))}
            </div>

            {/* Legal Links */}
            <div className="flex flex-wrap justify-center gap-4">
              {legal.map((link, index) => (
                <Link
                  key={index}
                  href={link.href}
                  className="text-blue-200 hover:text-white text-xs transition-colors"
                >
                  {link.name}
                </Link>
              ))}
            </div>

            {/* Trust Badges */}
            <div className="flex items-center gap-2">
              <div className="bg-green-500/20 border border-green-400/30 rounded-md px-2 py-1">
                <span className="text-xs text-green-200 font-medium">SSL</span>
              </div>
              <div className="bg-purple-500/20 border border-purple-400/30 rounded-md px-2 py-1">
                <span className="text-xs text-purple-200 font-medium">GDPR</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}