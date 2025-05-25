import React from 'react';
import {ShoppingCart} from 'lucide-react';
import {Link} from 'react-router';
import {Image} from '@shopify/hydrogen';
import {ProductCard} from './ProductCard';
import type {LandingPageConfig} from '~/lib/config';
import type {ProductItemFragment, CollectionFragment} from 'storefrontapi.generated';

interface ProductShowcaseProps {
  config: LandingPageConfig;
  products?: ProductItemFragment[] | null;
  featuredCollection?: CollectionFragment | null;
}

export default function ProductShowcase({config, products = [], featuredCollection}: ProductShowcaseProps) {
  // Use Shopify products if available, otherwise fall back to config products
  const displayProducts = products && products.length > 0 ? products : null;
  const configProducts = config.products;

  return (
    <section id="shop" className="py-24 bg-gradient-to-b from-black via-gray-900/95 to-black relative overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="mb-16 text-center">
          <div className="inline-block px-4 py-1 bg-primary/20 text-primary text-sm font-bold tracking-wider uppercase mb-4 rounded-sm">
            Premium Collection
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-5">
            <span className="text-primary">EXCLUSIVE</span> MERCHANDISE
          </h2>
          <p className="text-gray-300 max-w-2xl mx-auto leading-relaxed">
            Premium quality products inspired by the legacy of {config.influencerName}. Elevate your performance with our exclusive collection.
          </p>
        </div>
        
        {/* Featured Collection Banner - Shopify integration */}
        {featuredCollection && (
          <div className="mb-16">
            <Link 
              to={`/collections/${featuredCollection.handle}`}
              className="group block relative overflow-hidden rounded-lg bg-gradient-to-r from-primary/80 to-primary hover:from-primary/90 hover:to-primary/110 transition-all duration-300 transform hover:scale-[1.02]"
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
                <span className="inline-block bg-black text-primary px-6 py-3 rounded-sm font-bold uppercase tracking-wider group-hover:bg-gray-900 transition-colors duration-300">
                  Shop Collection
                </span>
              </div>
            </Link>
          </div>
        )}
        
        {/* Products Grid - Shopify products with config fallbacks */}
        {displayProducts ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {displayProducts.map((product: ProductItemFragment, index: number) => (
              <ProductCard 
                key={product.id} 
                product={product} 
                loading={index < 4 ? 'eager' : 'lazy'}
              />
            ))}
          </div>
        ) : (
          /* Fallback to config products if Shopify products not available */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {configProducts.map((product, index) => (
              <div key={index} className="group bg-gray-900/50 rounded-lg overflow-hidden border border-gray-800 hover:border-primary transition-all duration-300 transform hover:scale-[1.02]">
                <div className="relative overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                    loading={index < 4 ? 'eager' : 'lazy'}
                  />
                  {product.label && (
                    <div className="absolute top-4 left-4 bg-primary text-black px-3 py-1 rounded-sm text-sm font-bold uppercase">
                      {product.label}
                    </div>
                  )}
                </div>
                
                <div className="p-6">
                  <h3 className="text-xl font-bold text-white mb-2 group-hover:text-primary transition-colors duration-300">
                    {product.name}
                  </h3>
                  <p className="text-gray-400 text-sm mb-4 line-clamp-2">
                    {product.description}
                  </p>
                  
                  {product.features && product.features.length > 0 && (
                    <ul className="text-xs text-gray-500 mb-4 space-y-1">
                      {product.features.slice(0, 2).map((feature, idx) => (
                        <li key={idx} className="flex items-center">
                          <div className="w-1 h-1 bg-primary rounded-full mr-2"></div>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  )}
                  
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-primary">
                      {product.price}
                    </span>
                    {product.handle ? (
                      <Link 
                        to={`/products/${product.handle}`}
                        className="bg-primary hover:bg-primary/90 text-black font-bold px-4 py-2 rounded-sm transition-all duration-300 uppercase text-sm"
                      >
                        Shop Now
                      </Link>
                    ) : (
                      <button className="bg-primary hover:bg-primary/90 text-black font-bold px-4 py-2 rounded-sm transition-all duration-300 uppercase text-sm">
                        Add to Cart
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
        
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

        {/* Background decorative elements */}
        <div className="absolute -right-20 top-1/2 w-80 h-80 bg-primary/5 rounded-full blur-3xl"></div>
        <div className="absolute -left-40 bottom-20 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>
      </div>
    </section>
  );
}