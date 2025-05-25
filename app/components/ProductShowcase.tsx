import React from 'react';
import { ShoppingCart } from 'lucide-react';
import { Link } from 'react-router';
import { Image } from '@shopify/hydrogen';
import { ProductCard } from './ProductCard';
import { useConfig } from '~/utils/themeContext';
import type { ProductItemFragment, CollectionFragment } from 'storefrontapi.generated';

interface ProductShowcaseProps {
  products?: ProductItemFragment[] | null;
  featuredCollection?: CollectionFragment | null;
}

export default function ProductShowcase({ 
  products = [], 
  featuredCollection 
}: ProductShowcaseProps) {
  // Use centralized config from context
  const config = useConfig();
  
  // Use Shopify products if available, otherwise fall back to config products
  const displayProducts = products && products.length > 0 ? products : null;
  const configProducts = config.products;

  return (
    <section id="shop" className="py-20 md:py-24 bg-gradient-to-b from-black via-gray-900/95 to-black relative overflow-hidden">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mb-12 md:mb-16 text-center">
          <div className="inline-block px-4 py-1 bg-primary/20 text-primary text-sm font-bold tracking-wider uppercase mb-4 rounded-sm">
            Premium Collection
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-5">
            <span className="text-primary">EXCLUSIVE</span> MERCHANDISE
          </h2>
          <p className="text-gray-300 max-w-2xl mx-auto leading-relaxed">
            Premium quality products inspired by the legacy of {config.influencerName}. Elevate your performance with our exclusive collection.
          </p>
        </div>
        
        {/* Products Grid - Shopify products with config fallbacks */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {displayProducts ? (
            // Using Shopify products when available
            displayProducts.map((product: ProductItemFragment, index: number) => (
              <ProductCard 
                key={product.id} 
                product={product} 
                loading={index < 4 ? 'eager' : 'lazy'}
              />
            ))
          ) : (
            // Fallback to config products when Shopify products aren't available
            configProducts.map((product, index) => (
              <div key={index} className="group relative rounded-sm overflow-hidden bg-gray-900/80 backdrop-blur-sm border border-gray-800 hover:border-primary transition-all duration-300 shadow-lg hover:shadow-xl">
                {/* Product image */}
                <div className="relative h-72 overflow-hidden">
                  <img 
                    src={product.image} 
                    alt={product.name} 
                    className="w-full h-full object-cover object-center transform group-hover:scale-110 transition-transform duration-700 ease-out"
                    loading={index < 4 ? 'eager' : 'lazy'}
                  />
                  
                  {/* Badge if available */}
                  {product.label && (
                    <div className="bg-primary text-black text-xs font-bold py-1 px-3 rounded-sm absolute top-4 right-4">
                      {product.label}
                    </div>
                  )}

                  {/* Quick view overlay */}
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <Link 
                      to={product.handle ? `/products/${product.handle}` : '#'}
                      className="bg-primary hover:bg-primary-600 text-black font-bold py-3 px-6 rounded-sm transition-all duration-300 flex items-center justify-center uppercase text-sm mx-2"
                    >
                      Quick View
                    </Link>
                  </div>
                </div>
                
                {/* Product details */}
                <div className="p-6">
                  <h3 className="text-lg font-bold text-white mb-2">
                    {product.name}
                  </h3>
                  
                  <p className="text-gray-400 text-sm mb-4 line-clamp-2">
                    {product.description}
                  </p>
                  
                  {/* Features list */}
                  {product.features && product.features.length > 0 && (
                    <ul className="space-y-2 mb-4">
                      {product.features.slice(0, 2).map((feature, idx) => (
                        <li key={idx} className="flex items-start text-xs text-gray-500">
                          <div className="w-1 h-1 bg-primary rounded-full mr-2 mt-1.5"></div>
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                  
                  {/* Rating stars - matching Vue template */}
                  <div className="flex items-center mb-4">
                    <div className="flex text-primary">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <svg key={star} className="w-4 h-4 fill-current text-primary" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                          <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                        </svg>
                      ))}
                    </div>
                    <span className="text-sm text-gray-400 ml-2">(75+)</span>
                  </div>
                  
                  {/* Price and CTA button */}
                  <div className="flex justify-between items-center">
                    <p className="text-primary font-bold text-lg">
                      {product.price}
                    </p>
                    <Link
                      to={product.handle ? `/products/${product.handle}` : '#shop'}
                      className="bg-gray-800 hover:bg-primary text-white hover:text-black rounded-sm p-2.5 transition-all duration-300 transform hover:scale-105"
                      aria-label="Add to cart"
                    >
                      <ShoppingCart className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
        
        {/* View All Products Button */}
        <div className="mt-16 text-center">
          <Link 
            to="/collections/all"
            className="group inline-flex items-center justify-center bg-transparent hover:bg-primary text-primary hover:text-black border-2 border-primary font-bold py-3.5 px-10 rounded-sm transition-all duration-300 uppercase tracking-wider"
          >
            <ShoppingCart className="mr-2 h-5 w-5 transition-transform group-hover:rotate-12" />
            View All Products
          </Link>
        </div>

        {/* Background decorative element */}
        <div className="absolute -right-20 top-1/2 w-80 h-80 bg-primary/5 rounded-full blur-3xl"></div>
        <div className="absolute -left-40 bottom-20 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>
      </div>
    </section>
  );
}