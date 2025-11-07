import React from 'react';
import {Link} from 'react-router';
import {ShoppingBag, Sparkles} from 'lucide-react';
import {ProductCard} from '~/components/ProductCard';
import type {ProductItemFragment} from 'storefrontapi.generated';

interface FeaturedProductsSectionProps {
  products: ProductItemFragment[];
}

export function FeaturedProductsSection({products}: FeaturedProductsSectionProps) {
  // Limit to 4 products for this section
  const featuredProducts = products.slice(0, 4);

  return (
    <section className="py-20 relative overflow-hidden" style={{background: 'linear-gradient(to bottom right, #FFB6C1, #FFA0AB)'}}>
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-white/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl translate-x-1/2 translate-y-1/2"></div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-white/60 text-black px-4 py-2 rounded-full mb-6 backdrop-blur-sm">
            <Sparkles className="w-4 h-4" />
            <span className="text-sm font-bold uppercase tracking-wider">Nos Produits Vedettes</span>
          </div>

          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
            Découvrez Nos{' '}
            <span className="text-black">Produits Phares</span>
          </h2>

          <p className="text-lg text-white leading-relaxed">
            Une sélection exclusive de nos produits les plus populaires,
            choisis avec soin pour sublimer votre beauté naturelle.
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} loading="lazy" />
          ))}
        </div>

        {/* CTA Button */}
        <div className="text-center">
          <Link
            to="/collections/all"
            className="inline-flex items-center gap-3 bg-white hover:bg-white/90 text-black font-bold py-4 px-8 rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 group"
          >
            <ShoppingBag className="w-5 h-5" />
            Voir Tous Les Produits
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="transition-transform group-hover:translate-x-1"
            >
              <path d="M5 12h14"/>
              <path d="m12 5 7 7-7 7"/>
            </svg>
          </Link>
        </div>
      </div>

      {/* Bottom decorative wave */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black/10 to-transparent"></div>
    </section>
  );
}
