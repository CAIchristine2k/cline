import React from 'react';
import {Star, StarHalf, ShoppingCart} from 'lucide-react';

export interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  rating: number;
  reviews: number;
  badge: string | null;
}

interface ProductCardProps {
  product: Product;
}

export function ProductCard({product}: ProductCardProps) {
  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    // Full stars
    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <Star key={`full-${i}`} className="w-4 h-4 fill-gold-500 stroke-gold-500" />
      );
    }

    // Half star
    if (hasHalfStar) {
      stars.push(
        <StarHalf key="half" className="w-4 h-4 fill-gold-500 stroke-gold-500" />
      );
    }

    // Empty stars
    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <Star key={`empty-${i}`} className="w-4 h-4 stroke-current fill-transparent" />
      );
    }

    return stars;
  };

  return (
    <div className="group relative rounded-sm overflow-hidden bg-gray-900/80 backdrop-blur-sm border border-gray-800 hover:border-gold-500 transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-1">
      {/* Product image */}
      <div className="relative h-72 overflow-hidden">
        <img 
          src={product.image} 
          alt={product.name} 
          className="w-full h-full object-cover object-center transform group-hover:scale-110 transition-transform duration-700 ease-out"
        />
        
        {/* Badge if available */}
        {product.badge && (
          <div className="absolute top-3 right-3 bg-gold-500 text-black text-xs font-bold py-1 px-3 rounded-sm">
            {product.badge}
          </div>
        )}

        {/* Quick view overlay */}
        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <button className="bg-gold-500 hover:bg-gold-400 text-black font-bold py-2 px-6 rounded-sm transition-all duration-300">
            Quick View
          </button>
        </div>
      </div>

      <div className="p-5">
        {/* Product name */}
        <h3 className="text-lg font-semibold mb-3 text-white group-hover:text-gold-400 transition-colors duration-300">
          {product.name}
        </h3>
        
        {/* Rating */}
        <div className="flex items-center mb-4">
          <div className="flex items-center text-gold-500">
            {renderStars(product.rating)}
          </div>
          <span className="text-sm text-gray-400 ml-2">({product.reviews})</span>
        </div>
        
        {/* Price */}
        <div className="flex justify-between items-center">
          <p className="text-gold-500 font-bold text-lg">${product.price.toFixed(2)}</p>
          <button 
            className="bg-gray-800 hover:bg-gold-500 text-white hover:text-black rounded-sm p-2.5 transition-all duration-300 transform hover:scale-105"
            aria-label="Add to cart"
          >
            <ShoppingCart className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}