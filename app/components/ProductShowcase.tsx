import React from 'react';
import {ShoppingBag, Star, ArrowRight} from 'lucide-react';
import {Link} from 'react-router';
import {ProductCard} from '~/components/ProductCard';
import {useConfig} from '~/utils/themeContext';
import type {ProductItemFragment} from 'storefrontapi.generated';

interface ProductShowcaseProps {
  products: ProductItemFragment[];
  title?: string;
  subtitle?: string;
  loading?: 'eager' | 'lazy';
}

export function ProductShowcase({
  products,
  title = 'EXCLUSIVE MERCHANDISE',
  subtitle,
  loading = 'lazy',
}: ProductShowcaseProps) {
  const config = useConfig();

  return (
    <section className="relative py-6 md:py-12 lg:py-16 bg-white overflow-hidden">
      {/* Subtle background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-50/50 via-white to-white pointer-events-none"></div>

      <div className="relative container mx-auto px-3 md:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-4 md:mb-8 lg:mb-10">
          <div className="inline-flex items-center gap-1.5 bg-primary/10 text-primary px-3 py-1.5 rounded-full mb-3">
            <Star className="w-3 h-3 md:w-4 md:h-4 fill-current" />
            <span className="text-xs md:text-sm font-semibold uppercase tracking-wide">Best Sellers</span>
          </div>

          <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-2">
            Nos Produits
          </h2>

          <p className="text-gray-600 text-xs md:text-sm lg:text-base max-w-2xl mx-auto px-4">
            Découvrez nos produits les plus populaires, recommandés par des milliers de clientes satisfaites
          </p>
        </div>

        {/* Products Grid - Modern Layout */}
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 md:gap-4 lg:gap-6 mb-6 md:mb-10 lg:mb-12 max-w-5xl mx-auto">
          {products.slice(0, 6).map((product, index) => (
            <div
              key={product.id}
              className="animate-fade-in lg:scale-[0.85]"
              style={{
                animationDelay: `${index * 50}ms`,
                animationFillMode: 'backwards',
              }}
            >
              <ProductCard
                product={product}
                loading={index < 4 ? 'eager' : 'lazy'}
                compact={true}
              />
            </div>
          ))}
        </div>

        {/* View All Button */}
        <div className="flex justify-center">
          <Link
            to="/collections/all"
            className="group inline-flex items-center gap-2 bg-black hover:bg-primary text-white hover:text-black font-semibold px-6 py-3 md:px-8 md:py-4 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 text-sm md:text-base"
          >
            <span>Voir tous les produits</span>
            <ArrowRight className="w-4 h-4 md:w-5 md:h-5 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>

      {/* CSS Animations */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
          @keyframes fade-in {
            from {
              opacity: 0;
              transform: translateY(20px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

          .animate-fade-in {
            animation: fade-in 0.6s ease-out;
          }
        `,
        }}
      />
    </section>
  );
}
