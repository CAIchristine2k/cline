import React from 'react';
import {ShoppingCart} from 'lucide-react';
import {Link} from 'react-router';
import {Image, Money} from '@shopify/hydrogen';
import type {RecommendedProductsQuery, FeaturedCollectionFragment} from 'storefrontapi.generated';

interface ProductShowcaseProps {
  products?: RecommendedProductsQuery['products']['nodes'] | null;
  featuredCollection?: FeaturedCollectionFragment | null;
}

export function ProductShowcase({products = [], featuredCollection}: ProductShowcaseProps) {
  if (!products || products.length === 0) {
    return (
      <section id="shop" className="py-24 bg-gradient-to-b from-black via-gray-900/95 to-black relative">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-5">
            <span className="text-gold-500">EXCLUSIVE</span> MERCHANDISE
          </h2>
          <p className="text-gray-300 max-w-2xl mx-auto leading-relaxed">
            Products loading...
          </p>
        </div>
      </section>
    );
  }

  return (
    <section id="shop" className="py-24 bg-gradient-to-b from-black via-gray-900/95 to-black relative">
      <div className="container mx-auto px-4">
        <div className="mb-16 text-center">
          <div className="inline-block px-4 py-1 bg-gold-500/20 text-gold-500 text-sm font-bold tracking-wider uppercase mb-4 rounded-sm">
            Premium Collection
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-5">
            <span className="text-gold-500">EXCLUSIVE</span> MERCHANDISE
          </h2>
          <p className="text-gray-300 max-w-2xl mx-auto leading-relaxed">
            Premium quality products inspired by the legacy of Sugar Shane Mosley. Elevate your performance with our exclusive collection.
          </p>
        </div>
        
        {/* Featured Collection Banner */}
        {featuredCollection && (
          <div className="mb-16">
            <Link 
              to={`/collections/${featuredCollection.handle}`}
              className="group block relative overflow-hidden rounded-lg bg-gradient-to-r from-gold-600 to-gold-800 hover:from-gold-500 hover:to-gold-700 transition-all duration-300 transform hover:scale-[1.02]"
            >
              {featuredCollection.image && (
                <div className="absolute inset-0 opacity-30">
                  <Image
                    data={featuredCollection.image}
                    className="w-full h-full object-cover"
                    sizes="100vw"
                  />
                </div>
              )}
              <div className="relative z-10 px-8 py-12 text-center">
                <h3 className="text-3xl md:text-4xl font-bold text-black mb-4">
                  {featuredCollection.title}
                </h3>
                <span className="inline-block bg-black text-gold-500 px-6 py-3 rounded-sm font-bold uppercase tracking-wider group-hover:bg-gray-900 transition-colors duration-300">
                  Shop Collection
                </span>
              </div>
            </Link>
          </div>
        )}
        
        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((product) => (
            <Link
              key={product.id}
              to={`/products/${product.handle}`}
              className="group block bg-gray-800/50 rounded-lg overflow-hidden hover:bg-gray-800 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl border border-gray-700 hover:border-gold-500/50"
            >
              {/* Product Image */}
              <div className="relative aspect-square overflow-hidden">
                {product.featuredImage && (
                  <Image
                    data={product.featuredImage}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  />
                )}
                
                {/* Badge - simplified without tags */}
                
                {/* Quick View Overlay */}
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <span className="bg-gold-500 text-black px-6 py-2 rounded-sm font-bold uppercase tracking-wider">
                    Quick View
                  </span>
                </div>
              </div>
              
              {/* Product Info */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-gold-500 transition-colors duration-300">
                  {product.title}
                </h3>
                
                {/* Price */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Money 
                      data={product.priceRange.minVariantPrice} 
                      className="text-2xl font-bold text-gold-500"
                    />
                  </div>
                  
                  {/* Availability - simplified */}
                  <div className="text-xs px-2 py-1 rounded-sm bg-green-600/20 text-green-400">
                    Available
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
        
        {/* View All Products Button */}
        <div className="mt-16 text-center">
          <Link 
            to="/collections/all"
            className="group inline-flex items-center justify-center bg-transparent hover:bg-gold-500 text-gold-500 hover:text-black border-2 border-gold-500 font-bold py-3.5 px-10 rounded-sm transition-all duration-300 uppercase tracking-wider"
          >
            <ShoppingCart className="mr-2 h-5 w-5 transition-transform group-hover:rotate-12" />
            View All Products
          </Link>
        </div>

        {/* Background decorative elements */}
        <div className="absolute -right-20 top-1/2 w-80 h-80 bg-gold-500/5 rounded-full blur-3xl"></div>
        <div className="absolute -left-40 bottom-20 w-96 h-96 bg-gold-500/5 rounded-full blur-3xl"></div>
      </div>
    </section>
  );
}