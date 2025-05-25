import React from 'react';
import {Star, Truck, Shield, ArrowLeft} from 'lucide-react';
import {Image, Money, type MappedProductOptions} from '@shopify/hydrogen';
import {ProductForm} from './ProductForm';
import {Link} from 'react-router';
import type {ProductFragment} from 'storefrontapi.generated';
import type {LandingPageConfig} from '~/lib/config';

interface ProductDetailProps {
  product: ProductFragment;
  selectedVariant: ProductFragment['selectedOrFirstAvailableVariant'];
  productOptions: MappedProductOptions[];
  config: LandingPageConfig;
}

export function ProductDetail({
  product,
  selectedVariant,
  productOptions,
  config,
}: ProductDetailProps) {
  const {title, descriptionHtml, vendor} = product;

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="container mx-auto px-4 py-24">
        {/* Back Navigation */}
        <div className="mb-8">
          <Link 
            to="/collections/all"
            className="inline-flex items-center text-gold-500 hover:text-gold-400 transition-colors duration-300"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Shop
          </Link>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="aspect-square rounded-sm overflow-hidden bg-gray-900/80 backdrop-blur-sm border border-gray-800">
              {selectedVariant?.image && (
                <Image
                  data={selectedVariant.image}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              )}
            </div>
          </div>

          {/* Product Details */}
          <div className="space-y-8">
            {/* Product Title & Vendor */}
            <div>
              <div className="inline-block px-4 py-1 bg-gold-500/20 text-gold-500 text-sm font-bold tracking-wider uppercase mb-4 rounded-sm">
                {vendor}
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-4">{title}</h1>
              
              {/* Rating */}
              <div className="flex items-center space-x-2 mb-4">
                <div className="flex space-x-1 text-gold-500">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-current" />
                  ))}
                </div>
                <span className="text-gray-400 text-sm">(4.9) 247 reviews</span>
              </div>
            </div>

            {/* Price */}
            <div className="border-t border-gray-800 pt-6">
              <div className="flex items-center space-x-4 mb-6">
                {selectedVariant?.price && (
                  <Money 
                    data={selectedVariant.price} 
                    className="text-3xl font-bold text-gold-500"
                  />
                )}
                {selectedVariant?.compareAtPrice && (
                  <Money 
                    data={selectedVariant.compareAtPrice} 
                    className="text-xl text-gray-500 line-through"
                  />
                )}
              </div>
            </div>

            {/* Product Form */}
            <div className="border-t border-gray-800 pt-6">
              <ProductForm product={product} />
            </div>

            {/* Product Features */}
            <div className="border-t border-gray-800 pt-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="flex items-center space-x-3 p-4 bg-gray-900/80 backdrop-blur-sm rounded-sm border border-gray-800">
                  <Truck className="h-6 w-6 text-gold-500" />
                  <div>
                    <div className="font-bold text-sm text-white">Free Shipping</div>
                    <div className="text-xs text-gray-400">On orders over $100</div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3 p-4 bg-gray-900/80 backdrop-blur-sm rounded-sm border border-gray-800">
                  <Shield className="h-6 w-6 text-gold-500" />
                  <div>
                    <div className="font-bold text-sm text-white">Authentic</div>
                    <div className="text-xs text-gray-400">{config.influencerName} Approved</div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3 p-4 bg-gray-900/80 backdrop-blur-sm rounded-sm border border-gray-800">
                  <Star className="h-6 w-6 text-gold-500" />
                  <div>
                    <div className="font-bold text-sm text-white">Premium Quality</div>
                    <div className="text-xs text-gray-400">Championship Grade</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Product Description */}
            {descriptionHtml && (
              <div className="border-t border-gray-800 pt-6">
                <h3 className="text-xl font-bold mb-4 text-white">Product Details</h3>
                <div 
                  className="text-gray-300 leading-relaxed"
                  dangerouslySetInnerHTML={{__html: descriptionHtml}} 
                />
              </div>
            )}

            {/* Championship Guarantee */}
            <div className="border-t border-gray-800 pt-6">
              <div className="bg-gradient-to-r from-gold-900/20 via-gold-500/10 to-gold-900/20 border border-gold-500/30 rounded-sm p-6">
                <h4 className="text-lg font-bold text-gold-500 mb-2">
                  {config.influencerName}'s Championship Guarantee
                </h4>
                <p className="text-gray-300 text-sm leading-relaxed">
                  Every product is crafted to championship standards and backed by {config.influencerName}'s legacy of excellence. 
                  Train like a champion with gear approved by a {config.influencerTitle.toLowerCase()}.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}