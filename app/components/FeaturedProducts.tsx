import React from 'react';
import {Link} from 'react-router';
import {ArrowRight, ShoppingBag, Star, Award} from 'lucide-react';
import {useConfig} from '~/utils/themeContext';
import {LandingPageConfig} from '~/utils/config';

interface FeaturedProductsProps {
  config?: LandingPageConfig;
}

interface ProductFeature {
  id: string;
  title: string;
  description: string;
  link: string;
  icon?: string;
}

export default function FeaturedProducts({config}: FeaturedProductsProps) {
  const defaultConfigFromContext = useConfig();
  const effectiveConfig = config || defaultConfigFromContext;

  // Skip rendering if section is disabled in config
  if (
    !effectiveConfig.showTrainingSection ||
    !effectiveConfig.trainingPrograms
  ) {
    return null;
  }

  // Map the icon strings from config to Lucide icon components
  const getIconComponent = (iconName: string) => {
    switch (iconName) {
      case 'shopping-bag':
        return <ShoppingBag className="h-10 w-10 text-primary mb-4" />;
      case 'award':
        return <Award className="h-10 w-10 text-primary mb-4" />;
      case 'star':
        return <Star className="h-10 w-10 text-primary mb-4" />;
      default:
        return <ShoppingBag className="h-10 w-10 text-primary mb-4" />;
    }
  };

  return (
    <section
      id="featured-products"
      className="py-20 bg-gradient-to-b from-black to-gray-950"
    >
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            PREMIUM <span className="text-primary">MERCHANDISE</span>
          </h2>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Explore our exclusive collection of high-quality products designed
            in collaboration with {effectiveConfig.influencerName}, featuring
            premium materials and authentic designs.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {effectiveConfig.trainingPrograms?.map((product: ProductFeature) => (
            <div
              key={product.id}
              className="bg-black/40 backdrop-blur-sm border border-primary/20 p-8 rounded-sm hover:border-primary/50 transition-all duration-300 flex flex-col"
            >
              <div className="flex flex-col items-center text-center flex-grow">
                {product.icon ? (
                  getIconComponent(product.icon)
                ) : (
                  <ShoppingBag className="h-10 w-10 text-primary mb-4" />
                )}
                <h3 className="text-xl font-bold mb-3">{product.title}</h3>
                <p className="text-gray-300 mb-6">{product.description}</p>
              </div>
              <Link
                to={product.link}
                className="inline-flex items-center justify-center bg-primary/10 hover:bg-primary/20 text-primary font-bold py-2.5 px-5 rounded-sm transition-all duration-300 group w-full"
              >
                VIEW PRODUCTS
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link
            to="/products"
            className="bg-primary hover:bg-primary-600 text-black font-bold py-3 px-8 rounded-sm transition-all duration-300 inline-flex items-center group shadow-glow"
          >
            SHOP ALL PRODUCTS
            <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </section>
  );
}
