import React from 'react';
import {Link} from 'react-router';
import {CATEGORY_IMAGES} from '~/utils/assetsConfig';
import {SafeImage} from './SafeImage';

export function CategoryGrid() {
  const categories = [
    {
      name: 'Perruques',
      image: CATEGORY_IMAGES.mcap,
      link: '/collections/perruques',
    },
    {
      name: 'Bundles',
      image: CATEGORY_IMAGES.bundles,
      link: '/collections/bundles',
    },
    {
      name: 'Naturelles',
      image: CATEGORY_IMAGES.colored,
      link: '/collections/naturelles',
    },
    {
      name: 'Closures',
      image: CATEGORY_IMAGES.newArrivals,
      link: '/collections/naturelles-closure',
    },
    {
      name: 'Synthétique',
      image: CATEGORY_IMAGES.halfwig,
      link: '/collections/synthetique-perruques',
    },
    {
      name: 'Accessoires',
      image: CATEGORY_IMAGES.hdlace,
      link: '/collections/accessoires',
    },
  ];

  return (
    <section className="pt-4 md:pt-6 lg:pt-16 pb-8 md:pb-12 lg:pb-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-10 mt-4 md:mt-6 lg:mt-8">
          {categories.map((category) => (
            <Link
              key={category.name}
              to={category.link}
              className="flex flex-col items-center group"
            >
              {/* Image ronde */}
              <div className="relative w-full max-w-[120px] md:max-w-none aspect-square rounded-full overflow-hidden mb-3 md:mb-4 transition-transform duration-300 group-hover:scale-105 mx-auto">
                <SafeImage
                  src={category.image}
                  alt={category.name}
                  showPlaceholder={true}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Titre */}
              <h3 className="text-xs md:text-base font-medium text-gray-900 text-center group-hover:text-primary transition-colors duration-300">
                {category.name}
              </h3>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
