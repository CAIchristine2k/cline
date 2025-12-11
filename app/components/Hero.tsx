import React, {useEffect, useRef, useState} from 'react';
import {ShoppingBag, Leaf} from 'lucide-react';
import {Link} from 'react-router';
import {useConfig} from '~/utils/themeContext';

export function Hero() {
  // Get config from context instead of props
  const config = useConfig();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  // Desktop images
  const carouselImages = [
    '/images/preset/card/card1.PNG',
    '/images/image2hero.PNG',
  ];

  // Mobile images
  const mobileImages = [
    '/images/mobile1.PNG',
    '/images/mobile2.PNG',
  ];

  // Links for each carousel image
  const carouselLinks = [
    '/products',                    // mobile1.PNG -> NOS PRODUITS
    '/collections/vente-flash',     // mobile2.PNG -> VENTE FLASH
  ];

  // Distance minimale de swipe (en pixels)
  const minSwipeDistance = 50;

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % carouselImages.length);
    }, 4000); // Change slide every 4 seconds (2x faster)

    return () => clearInterval(interval);
  }, []);

  // Gestionnaires d'événements pour le swipe
  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;

    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) {
      setCurrentSlide((prev) => (prev + 1) % carouselImages.length);
    } else if (isRightSwipe) {
      setCurrentSlide((prev) => (prev - 1 + carouselImages.length) % carouselImages.length);
    }
  };

  const goToNext = () => {
    setCurrentSlide((prev) => (prev + 1) % carouselImages.length);
  };

  const goToPrev = () => {
    setCurrentSlide((prev) => (prev - 1 + carouselImages.length) % carouselImages.length);
  };

  return (
    <section
      id="home"
      className="relative w-full pt-[20px] md:pt-0"
    >
      {/* Full width carousel */}
      <div className="w-full relative overflow-hidden group">
        <div
          className="flex transition-transform duration-700 ease-in-out"
          style={{
            transform: `translateX(-${currentSlide * 100}%)`,
          }}
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
        >
          {carouselImages.map((image, index) => (
            <Link
              key={index}
              to={carouselLinks[index] || '/products'}
              className="w-full flex-shrink-0 cursor-pointer"
            >
              {/* Desktop image - hidden on mobile */}
              <picture className="hidden md:block w-full">
                <img
                  src={image}
                  alt={index === 0 ? "C'Line Hair - Perruques naturelles 100% cheveux humains, Lace Wigs premium avec densité 250%" : "C'Line Hair - Collection de perruques lace wig et bundles cheveux naturels"}
                  className="w-full h-auto object-contain"
                  loading={index === 0 ? 'eager' : 'lazy'}
                  fetchPriority={index === 0 ? 'high' : 'low'}
                  decoding={index === 0 ? 'sync' : 'async'}
                />
              </picture>
              {/* Mobile image - visible only on mobile */}
              <picture className="md:hidden w-full">
                <img
                  src={mobileImages[index]}
                  alt={index === 0 ? "C'Line Hair - Perruques naturelles 100% cheveux humains, Lace Wigs premium avec densité 250%" : "C'Line Hair - Collection de perruques lace wig et bundles cheveux naturels"}
                  className="w-full h-auto object-contain"
                  loading={index === 0 ? 'eager' : 'lazy'}
                  fetchPriority={index === 0 ? 'high' : 'low'}
                  decoding={index === 0 ? 'sync' : 'async'}
                />
              </picture>
            </Link>
          ))}
        </div>

        {/* Navigation arrows for desktop */}
        {carouselImages.length > 1 && (
          <>
            <button
              onClick={goToPrev}
              className="hidden md:flex absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-black p-3 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-110 z-10"
              aria-label="Image précédente"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={goToNext}
              className="hidden md:flex absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-black p-3 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-110 z-10"
              aria-label="Image suivante"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </>
        )}

        {/* Navigation dots */}
        <div className="hidden absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2 z-10">
          {carouselImages.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-2 h-2 md:w-3 md:h-3 rounded-full transition-all duration-300 ${
                currentSlide === index
                  ? 'bg-primary w-6 md:w-8'
                  : 'bg-white/50 hover:bg-white/80'
              }`}
              aria-label={`Aller à la diapositive ${index + 1}`}
              aria-current={currentSlide === index ? 'true' : 'false'}
            />
          ))}
        </div>
      </div>

      {/* Add the CSS styles directly to match Vue template */}
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
          
          video {
            filter: brightness(0.9) contrast(1.1);
          }
        `,
        }}
      />
    </section>
  );
}
