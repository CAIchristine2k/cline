import React from 'react';
import {ShoppingBag, Star} from 'lucide-react';
import {Link} from 'react-router';
import {ProductCarousel} from '~/components/ProductCarousel';
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
    <>
      {/* Section titre au-dessus */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              <span className="text-black">LES BEST SELLERS</span><br />
              <span className="text-primary tracking-wider hero-title-glow">C'LINE HAIR</span>
            </h1>

            <div className="inline-block bg-primary text-black font-bold py-1 px-4 mb-6 tracking-wider rounded-sm">
              Nos Produits Iconiques & Recommandés par des Milliers de Femmes
            </div>
          </div>
        </div>
      </section>

      {/* Section produits */}
      <section
        id="shop"
        className="relative py-20 bg-white"
      >
        {/* Background decorative elements */}
        <div className="absolute -right-20 top-1/2 w-80 h-80 bg-primary/5 rounded-full blur-3xl"></div>
        <div className="absolute -left-40 bottom-20 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>

        <div className="relative container mx-auto px-4 z-20">

        {/* Carousel */}
        <ProductCarousel products={products} loading={loading} compact={true} />

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-5 justify-center mt-12">
          <Link
            to="/collections/best-sellers"
            className="group bg-primary hover:bg-primary-400 text-black font-bold py-4 px-8 rounded-sm transition-all duration-300 flex items-center justify-center shadow-glow"
          >
            DÉCOUVRIR LES BEST SELLERS
            <ShoppingBag className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
          </Link>

          <Link
            to="/#testimonials"
            className="group bg-white border-2 border-primary hover:bg-primary text-primary hover:text-white font-bold py-4 px-8 rounded-sm transition-all duration-300 flex items-center justify-center"
          >
            VOIR LES AVIS CLIENTES
            <Star className="ml-2 h-5 w-5 transition-transform group-hover:scale-110" />
          </Link>
        </div>
      </div>

      {/* Add the CSS styles directly */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
          .hero-title-glow {
            text-shadow: 0 0 15px rgba(var(--color-primary-rgb), 0.4);
          }

          .hero-stat-glow {
            text-shadow: 0 0 8px rgba(var(--color-primary-rgb), 0.3);
          }

          .shadow-glow {
            box-shadow: 0 4px 20px rgba(var(--color-primary-rgb), 0.25);
          }
        `,
        }}
      />
    </section>
    </>
  );
}
