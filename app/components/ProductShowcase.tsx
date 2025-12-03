import React, {useMemo} from 'react';
import {ShoppingBag, Star, ArrowRight} from 'lucide-react';
import {Link} from 'react-router';
import {ProductCard} from '~/components/ProductCard';
import {useConfig} from '~/utils/themeContext';
import type {ProductItemFragment} from '~/types/custom-fragments';

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

  // Get 6 first products + 4 random products for desktop
  const displayProducts = useMemo(() => {
    // Filter out specific products
    const excludedHandles = ['beyonce-5x5-glueless-lace-wig', 'big-afro-hh-wig'];
    const filteredProducts = products.filter(
      (product) => !excludedHandles.includes(product.handle)
    );

    const firstSix = filteredProducts.slice(0, 6);

    // Get 4 random products from the remaining products
    const remainingProducts = filteredProducts.slice(6);
    if (remainingProducts.length > 0) {
      const shuffled = [...remainingProducts].sort(() => Math.random() - 0.5);
      const randomFour = shuffled.slice(0, 4);
      return [...firstSix, ...randomFour];
    }

    return firstSix;
  }, [products]);

  return (
    <section className="relative py-6 md:py-12 lg:py-16 bg-white overflow-hidden">
      {/* Subtle background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-50/50 via-white to-white pointer-events-none"></div>

      <div className="relative container mx-auto px-3 md:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-4 md:mb-8 lg:mb-10">
          <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold text-black tracking-wide mb-2">
            BEST SELLERS
          </h1>
        </div>

        {/* Products Grid - Modern Layout */}
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 md:gap-4 lg:gap-6 mb-6 md:mb-10 lg:mb-12 max-w-5xl mx-auto">
          {displayProducts.map((product, index) => (
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
            to="/collections/best-sellers"
            prefetch="intent"
            className="inline-flex items-center gap-3 bg-white hover:bg-white/90 text-black font-bold py-4 px-8 rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 group"
          >
            <ShoppingBag className="w-5 h-5" />
            VOIR NOS PRODUITS
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
