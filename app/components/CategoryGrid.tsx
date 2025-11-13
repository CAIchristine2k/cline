import React from 'react';
import {Link} from 'react-router';

export function CategoryGrid() {
  const categories = [
    {
      name: 'ISEE M-Cap',
      image: '/images/category-mcap.jpg',
      link: '/collections/mcap',
    },
    {
      name: 'ISEE Half Wig',
      image: '/images/category-halfwig.jpg',
      link: '/collections/half-wig',
    },
    {
      name: 'Colored Wigs',
      image: '/images/category-colored.jpg',
      link: '/collections/colored-wigs',
    },
    {
      name: 'HD Lace Wig',
      image: '/images/category-hdlace.jpg',
      link: '/collections/hd-lace',
    },
    {
      name: 'Bundles Deal',
      image: '/images/category-bundles.jpg',
      link: '/collections/bundles',
    },
    {
      name: 'New Arrivals',
      image: '/images/category-newarrivals.jpg',
      link: '/collections/nouveautes',
    },
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 md:gap-10">
          {categories.map((category) => (
            <Link
              key={category.name}
              to={category.link}
              className="flex flex-col items-center group"
            >
              {/* Image ronde */}
              <div className="relative w-full aspect-square rounded-full overflow-hidden mb-4 transition-transform duration-300 group-hover:scale-105">
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Titre */}
              <h3 className="text-sm md:text-base font-medium text-gray-900 text-center group-hover:text-primary transition-colors duration-300">
                {category.name}
              </h3>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
