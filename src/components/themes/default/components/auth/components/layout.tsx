import * as React from "react";
import Image from "next/image";

export interface LayoutProps {
  children: React.ReactNode;
  isLoading?: boolean;
  dict?: any;
}

export default function Layout({ children, dict }: LayoutProps): React.JSX.Element {
  return (
    <div className="min-h-screen w-full bg-amber-200 flex flex-col md:flex-row">
      {/* ------------------ FORMS SECTION ------------------ */}
      <div className="bg-white dark:bg-gray-800 w-full md:w-1/2 min-h-screen flex items-center justify-center">
        <section className="w-full h-full">
          {children}
        </section>
      </div>

      {/* ------------------ IMAGE SECTION ------------------ */}
      <div className="relative w-full md:w-1/2 min-h-screen overflow-hidden hidden md:block">
        <Image
          src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80"
          alt="Modern shopping experience"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/90 via-blue-800/70 to-black/60" />
        <div className="absolute inset-0 flex items-start justify-center pt-20 p-12">
          <div className="text-white max-w-lg">
            <div className="mb-8">
              <h1 className="text-5xl text-white font-light mb-4 leading-tight">
                Shop
                <span className="font-bold bg-gradient-to-r from-yellow-400 to-yellow-300 bg-clip-text text-transparent"> Smart</span>
              </h1>
              <p className="text-xl text-gray-200 font-light leading-relaxed">
                Experience the future of online shopping with our curated collection
              </p>
            </div>

            <div className="grid grid-cols-1 gap-6">
              <div className="flex items-center space-x-4 bg-white/10 backdrop-blur-sm rounded-xl p-4">
                <div className="w-12 h-12 bg-blue-500/20 rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-white">Premium Quality</h3>
                  <p className="text-sm text-gray-300">Handpicked products</p>
                </div>
              </div>

              <div className="flex items-center space-x-4 bg-white/10 backdrop-blur-sm rounded-xl p-4">
                <div className="w-12 h-12 bg-green-500/20 rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-white">Fast Delivery</h3>
                  <p className="text-sm text-gray-300">Same day shipping</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
