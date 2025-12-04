import React, {useCallback, useState, useEffect, useRef} from 'react';
import {ChevronLeft, ChevronRight} from 'lucide-react';
import {ProductCard} from '~/components/ProductCard';
import type {ProductItemFragment} from '~/types/custom-fragments';

interface ProductCarouselProps {
  products: ProductItemFragment[];
  loading?: 'eager' | 'lazy';
  compact?: boolean;
  collectionHandle?: string;
}

export function ProductCarousel({
  products,
  loading = 'lazy',
  compact = false,
  collectionHandle,
}: ProductCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isClient, setIsClient] = useState(false);
  const [itemsPerView, setItemsPerView] = useState(4);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsClient(true);

    const updateItemsPerView = () => {
      const width = window.innerWidth;
      if (width >= 1280) {
        setItemsPerView(4); // Desktop large
      } else if (width >= 1024) {
        setItemsPerView(3); // Desktop
      } else if (width >= 768) {
        setItemsPerView(2); // Tablette
      } else {
        setItemsPerView(2); // Mobile - 2 cartes compactes
      }
    };

    updateItemsPerView();
    window.addEventListener('resize', updateItemsPerView);
    return () => window.removeEventListener('resize', updateItemsPerView);
  }, []);

  const maxIndex = Math.max(0, products.length - itemsPerView);

  // Auto-scroll carousel
  useEffect(() => {
    if (!isClient || isPaused || isDragging || maxIndex === 0) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => {
        if (prev >= maxIndex) {
          return 0;
        }
        return prev + 1;
      });
    }, 4000); // Défile toutes les 4 secondes

    return () => clearInterval(interval);
  }, [isClient, isPaused, isDragging, maxIndex]);

  const scrollPrev = useCallback(() => {
    setCurrentIndex((prev) => Math.max(0, prev - 1));
  }, []);

  const scrollNext = useCallback(() => {
    setCurrentIndex((prev) => Math.min(maxIndex, prev + 1));
  }, [maxIndex]);

  // Gestion du swipe tactile (mobile)
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
    setIsPaused(true);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;

    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe && currentIndex < maxIndex) {
      scrollNext();
    }
    if (isRightSwipe && currentIndex > 0) {
      scrollPrev();
    }

    setTouchStart(0);
    setTouchEnd(0);
    setIsPaused(false);
  };

  // Gestion du drag (desktop)
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setDragStart(e.clientX);
    setIsPaused(true);
    if (containerRef.current) {
      containerRef.current.style.cursor = 'grabbing';
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    e.preventDefault();
  };

  const handleMouseUp = (e: React.MouseEvent) => {
    if (!isDragging) return;

    const distance = dragStart - e.clientX;
    const isLeftDrag = distance > 50;
    const isRightDrag = distance < -50;

    if (isLeftDrag && currentIndex < maxIndex) {
      scrollNext();
    }
    if (isRightDrag && currentIndex > 0) {
      scrollPrev();
    }

    setIsDragging(false);
    setDragStart(0);
    setIsPaused(false);
    if (containerRef.current) {
      containerRef.current.style.cursor = 'grab';
    }
  };

  const handleMouseLeave = () => {
    if (isDragging) {
      setIsDragging(false);
      setDragStart(0);
      setIsPaused(false);
      if (containerRef.current) {
        containerRef.current.style.cursor = 'grab';
      }
    }
  };

  if (!isClient) {
    // Server-side fallback: show grid
    return (
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {products.slice(0, 8).map((product) => (
          <ProductCard key={product.id} product={product} loading={loading} compact={compact} />
        ))}
      </div>
    );
  }

  return (
    <div className="relative max-w-7xl mx-auto px-2 md:px-8 lg:px-12">
      {/* Navigation Buttons */}
      {currentIndex > 0 && (
        <button
          onClick={scrollPrev}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-20 bg-white hover:bg-primary text-black p-3 rounded-full shadow-xl transition-all duration-300 hover:scale-110 border border-gray-200"
          aria-label="Produits précédents"
          title="Voir les produits précédents"
        >
          <ChevronLeft className="w-5 h-5" aria-hidden="true" />
        </button>
      )}

      {currentIndex < maxIndex && (
        <button
          onClick={scrollNext}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-20 bg-white hover:bg-primary text-black p-3 rounded-full shadow-xl transition-all duration-300 hover:scale-110 border border-gray-200"
          aria-label="Produits suivants"
          title="Voir les produits suivants"
        >
          <ChevronRight className="w-5 h-5" aria-hidden="true" />
        </button>
      )}

      {/* Carousel */}
      <div
        ref={containerRef}
        className="overflow-hidden cursor-grab active:cursor-grabbing py-4"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseLeave}
        onMouseEnter={() => !isDragging && setIsPaused(true)}
      >
        <div
          className="flex transition-transform duration-700 ease-in-out gap-2 md:gap-4 pr-2 md:pr-8"
          style={{
            transform: `translateX(-${currentIndex * (100 / itemsPerView)}%)`,
          }}
        >
          {products.map((product, index) => (
            <div
              key={product.id}
              className="flex-shrink-0 h-full"
              style={{
                width: itemsPerView === 2
                  ? 'calc((100% - 8px - 8px) / 2)' // Mobile: 2 cartes, gap 8px + padding 8px
                  : itemsPerView === 3
                  ? `calc((100% - ${(itemsPerView - 1) * 16}px - 32px) / ${itemsPerView})` // Desktop: 3 cartes
                  : `calc((100% - ${(itemsPerView - 1) * 16}px - 32px) / ${itemsPerView})`, // Desktop large: 4 cartes
              }}
            >
              <ProductCard
                product={product}
                loading={index < itemsPerView * 2 ? 'eager' : 'lazy'}
                compact={compact}
                collectionHandle={collectionHandle}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Dots indicator */}
      {maxIndex > 0 && (
        <div className="flex justify-center gap-2 mt-8" role="tablist" aria-label="Navigation du carrousel de produits">
          {Array.from({length: maxIndex + 1}).map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={`transition-all duration-300 rounded-full ${
                idx === currentIndex
                  ? 'bg-primary w-8 h-2'
                  : 'bg-gray-300 hover:bg-gray-400 w-2 h-2'
              }`}
              role="tab"
              aria-label={`Aller à la page ${idx + 1}`}
              aria-selected={idx === currentIndex}
              aria-current={idx === currentIndex ? 'true' : 'false'}
            />
          ))}
        </div>
      )}
    </div>
  );
}
