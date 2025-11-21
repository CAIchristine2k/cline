import React from 'react';
import {Link} from 'react-router';

export function CategoryGrid() {
  const categories = [
    {
      name: 'Perruques naturelles',
      image: '/images/category-mcap.jpg',
      link: '/collections/perruques-naturelles',
    },
    {
      name: 'Bulk',
      image: '/images/category-halfwig.jpg',
      link: '/collections/bulk-naturel',
    },
    {
      name: 'Ponytails',
      image: '/images/category-colored.jpg',
      link: '/collections/naturelles/ponytail',
    },
    {
      name: 'Perruques HD Lace',
      image: '/images/category-hdlace.jpg',
      link: '/collections/perruques-hd-lace',
    },
    {
      name: 'Bundles',
      image: '/images/category-bundles.jpg',
      link: '/collections/tissages-naturels',
    },
    {
      name: 'Closure & Frontale',
      image: '/images/category-newarrivals.jpg',
      link: '/collections/closures-frontals',
    },
  ];

  return (
    <section className="pt-4 md:pt-6 lg:pt-16 bg-white">
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
                <img
                  src={category.image}
                  alt={category.name}
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
