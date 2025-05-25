import React from 'react';
import { ShoppingCart } from 'lucide-react';
import { Link } from 'react-router';
import { Image } from '@shopify/hydrogen';
import { ProductCard } from './ProductCard';
import { defaultConfig, type LandingPageConfig } from '~/lib/config';
import type { ProductItemFragment, CollectionFragment } from 'storefrontapi.generated';
import { buttonStyles, sectionStyles, cardStyles, accentStyles, inlineStyles } from '~/utils/styleUtils';

interface ProductShowcaseProps {
  config?: LandingPageConfig;
  products?: ProductItemFragment[] | null;
  featuredCollection?: CollectionFragment | null;
}

export default function ProductShowcase({ 
  config = defaultConfig, 
  products = [], 
  featuredCollection 
}: ProductShowcaseProps) {
  // Use Shopify products if available, otherwise fall back to config products
  const displayProducts = products && products.length > 0 ? products : null;
  const configProducts = config.products;

  return (
    <section id="shop" className={`${sectionStyles.padding} ${sectionStyles.darkGradient} relative overflow-hidden`}>
      <div className={sectionStyles.container}>
        <div className={sectionStyles.headingWrapper}>
          <div className={sectionStyles.tag}>
            Premium Collection
          </div>
          <h2 className={sectionStyles.heading}>
            <span className={accentStyles.primaryText}>EXCLUSIVE</span> MERCHANDISE
          </h2>
          <p className={sectionStyles.subheading}>
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
              <div key={index} className={cardStyles.product}>
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
                    <div className={accentStyles.badge} style={inlineStyles.primaryBackgroundWithText}>
                      {product.label}
                    </div>
                  )}

                  {/* Quick view overlay */}
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <Link 
                      to={product.handle ? `/products/${product.handle}` : '#'}
                      className={`${buttonStyles.primary} uppercase text-sm mx-2`}
                      style={inlineStyles.primaryBackgroundWithText}
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
                          <div className="w-1 h-1 bg-primary rounded-full mr-2 mt-1.5" style={inlineStyles.primaryBackground}></div>
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                  
                  {/* Rating stars - adding this to match Vue template */}
                  <div className="flex items-center mb-4">
                    <div className="flex text-primary">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <svg key={star} className="w-4 h-4 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" style={inlineStyles.primaryText}>
                          <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                        </svg>
                      ))}
                    </div>
                    <span className="text-sm text-gray-400 ml-2">(75+)</span>
                  </div>
                  
                  {/* Price and CTA button */}
                  <div className="flex justify-between items-center">
                    <p className={`${accentStyles.primaryText} font-bold text-lg`} style={inlineStyles.primaryText}>
                      {product.price}
                    </p>
                    <Link
                      to={product.handle ? `/products/${product.handle}` : '#shop'}
                      className={buttonStyles.subtle}
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
            style={{
              borderColor: inlineStyles.primaryText.color,
              color: inlineStyles.primaryText.color,
            }}
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