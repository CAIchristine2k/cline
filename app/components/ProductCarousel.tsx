import React, {useCallback, useState, useEffect} from 'react';
import {ChevronLeft, ChevronRight} from 'lucide-react';
import {ProductCard} from '~/components/ProductCard';
import type {ProductItemFragment} from 'storefrontapi.generated';

interface ProductCarouselProps {
  products: ProductItemFragment[];
  loading?: 'eager' | 'lazy';
  compact?: boolean;
}

export function ProductCarousel({
  products,
  loading = 'lazy',
  compact = false,
}: ProductCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isClient, setIsClient] = useState(false);
  const [itemsPerView, setItemsPerView] = useState(1);

  useEffect(() => {
    setIsClient(true);

    const updateItemsPerView = () => {
      if (window.innerWidth >= 1280) {
        setItemsPerView(5);
      } else if (window.innerWidth >= 1024) {
        setItemsPerView(4);
      } else if (window.innerWidth >= 768) {
        setItemsPerView(3);
      } else if (window.innerWidth >= 640) {
        setItemsPerView(2);
      } else {
        setItemsPerView(1);
      }
    };

    updateItemsPerView();
    window.addEventListener('resize', updateItemsPerView);
    return () => window.removeEventListener('resize', updateItemsPerView);
  }, []);

  const maxIndex = Math.max(0, products.length - itemsPerView);

  const scrollPrev = useCallback(() => {
    setCurrentIndex((prev) => Math.max(0, prev - 1));
  }, []);

  const scrollNext = useCallback(() => {
    setCurrentIndex((prev) => Math.min(maxIndex, prev + 1));
  }, [maxIndex]);

  if (!isClient) {
    // Server-side fallback: show grid
    return (
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2">
        {products.slice(0, 10).map((product) => (
          <ProductCard key={product.id} product={product} loading={loading} compact={compact} />
        ))}
      </div>
    );
  }

  return (
    <div className="relative">
      {/* Navigation Buttons */}
      {currentIndex > 0 && (
        <button
          onClick={scrollPrev}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-primary hover:bg-primary/90 text-black p-2 sm:p-3 rounded-full shadow-lg transition-all duration-300 hover:scale-110 -translate-x-1/2 sm:-translate-x-1/2"
          aria-label="Previous"
        >
          <ChevronLeft className="w-4 h-4 sm:w-6 sm:h-6" />
        </button>
      )}

      {currentIndex < maxIndex && (
        <button
          onClick={scrollNext}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-primary hover:bg-primary/90 text-black p-2 sm:p-3 rounded-full shadow-lg transition-all duration-300 hover:scale-110 translate-x-1/2 sm:translate-x-1/2"
          aria-label="Next"
        >
          <ChevronRight className="w-4 h-4 sm:w-6 sm:h-6" />
        </button>
      )}

      {/* Carousel */}
      <div className="overflow-hidden px-1 sm:px-0">
        <div
          className="flex gap-3 sm:gap-2 transition-transform duration-500 ease-out"
          style={{
            transform: `translateX(-${currentIndex * (100 / itemsPerView)}%)`,
          }}
        >
          {products.map((product) => (
            <div
              key={product.id}
              className={`flex-shrink-0`}
              style={{
                width: `calc(${100 / itemsPerView}% - ${(itemsPerView - 1) * (window.innerWidth < 640 ? 12 : 8) / itemsPerView}px)`,
              }}
            >
              <ProductCard product={product} loading={loading} compact={compact} />
            </div>
          ))}
        </div>
      </div>

      {/* Dots indicator */}
      {maxIndex > 0 && (
        <div className="flex justify-center gap-2 mt-6">
          {Array.from({length: maxIndex + 1}).map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                idx === currentIndex ? 'bg-primary w-8' : 'bg-gray-300'
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
