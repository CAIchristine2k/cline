import React, {useEffect, useRef, useState} from 'react';
import {ShoppingBag, Leaf} from 'lucide-react';
import {Link} from 'react-router';
import {useConfig} from '~/utils/themeContext';

export function Hero() {
  // Get config from context instead of props
  const config = useConfig();
  const [currentSlide, setCurrentSlide] = useState(0);

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

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % carouselImages.length);
    }, 8000); // Change slide every 8 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <section
      id="home"
      className="relative w-full pt-[50px]"
    >
      {/* Full width carousel */}
      <div className="w-full relative overflow-hidden">
        <div
          className="flex transition-transform duration-700 ease-in-out"
          style={{
            transform: `translateX(-${currentSlide * 100}%)`,
          }}
        >
          {carouselImages.map((image, index) => (
            <Link
              key={index}
              to="/collections/vente-flash"
              className="w-full flex-shrink-0 cursor-pointer"
            >
              {/* Desktop image - hidden on mobile */}
              <picture className="hidden md:block w-full">
                <img
                  src={image}
                  alt={`C'Line Hair ${index + 1}`}
                  className="w-full h-auto object-contain"
                  loading={index === 0 ? 'eager' : 'lazy'}
                  fetchpriority={index === 0 ? 'high' : 'low'}
                />
              </picture>
              {/* Mobile image - visible only on mobile */}
              <picture className="md:hidden w-full">
                <img
                  src={mobileImages[index]}
                  alt={`C'Line Hair Mobile ${index + 1}`}
                  className="w-full h-auto object-contain"
                  loading={index === 0 ? 'eager' : 'lazy'}
                  fetchpriority={index === 0 ? 'high' : 'low'}
                />
              </picture>
            </Link>
          ))}
        </div>

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
              aria-label={`Go to slide ${index + 1}`}
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
