import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';
import { useConfig } from '~/utils/themeContext';

export default function Testimonials() {
  const config = useConfig();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  // Skip rendering if testimonials section is disabled in config
  if (!config.showTestimonials || !config.testimonials || config.testimonials.length === 0) {
    return null;
  }

  const handlePrev = (): void => {
    if (isAnimating || !config.testimonials || config.testimonials.length === 0) return;
    setIsAnimating(true);
    setCurrentIndex(currentIndex === 0 ? config.testimonials.length - 1 : currentIndex - 1);
    setTimeout(() => setIsAnimating(false), 500);
  };

  const handleNext = (): void => {
    if (isAnimating || !config.testimonials || config.testimonials.length === 0) return;
    setIsAnimating(true);
    setCurrentIndex(currentIndex === config.testimonials.length - 1 ? 0 : currentIndex + 1);
    setTimeout(() => setIsAnimating(false), 500);
  };

  const goToSlide = (index: number): void => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex(index);
    setTimeout(() => setIsAnimating(false), 500);
  };

  useEffect(() => {
    if (config.testimonials && config.testimonials.length > 1) {
      const interval = setInterval(handleNext, 8000);
      return () => clearInterval(interval);
    }
  }, [currentIndex, config.testimonials?.length]);

  const currentTestimonial = config.testimonials[currentIndex];

  return (
    <section id="testimonials" className="py-20 bg-gray-950">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            CHAMPION <span className="text-primary">TESTIMONIALS</span>
          </h2>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Hear what legends of the sport have to say about {config.influencerName}'s career and legacy.
          </p>
        </div>
        
        <div className="max-w-4xl mx-auto relative">
          {/* Navigation Buttons - only show if multiple testimonials */}
          {config.testimonials.length > 1 && (
            <>
              <button 
                onClick={handlePrev}
                className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-12 z-10 bg-black/30 hover:bg-primary text-white hover:text-black w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300"
                aria-label="Previous testimonial"
              >
                <ChevronLeft className="h-6 w-6" />
              </button>
              
              <button 
                onClick={handleNext}
                className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-12 z-10 bg-black/30 hover:bg-primary text-white hover:text-black w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300"
                aria-label="Next testimonial"
              >
                <ChevronRight className="h-6 w-6" />
              </button>
            </>
          )}
          
          {/* Testimonial Slider */}
          <div className="overflow-hidden rounded-lg bg-gray-900 p-6 md:p-10 shadow-xl border border-gray-800 hover:border-primary/30 transition-all duration-300">
            <div 
              className={`transition-transform duration-500 ease-in-out ${
                isAnimating ? 'opacity-0' : 'opacity-100'
              }`}
            >
              <div className="flex flex-col md:flex-row items-center">
                {/* Profile Image - conditional rendering if image exists */}
                {currentTestimonial.image && (
                  <div className="md:w-1/3 mb-6 md:mb-0">
                    <div className="relative w-32 h-32 mx-auto rounded-full overflow-hidden border-4 border-primary">
                      <img 
                        src={currentTestimonial.image} 
                        alt={currentTestimonial.name} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                )}
                
                <div className={`${currentTestimonial.image ? 'md:w-2/3 md:pl-8' : 'w-full text-center'}`}>
                  {/* Rating stars - conditional rendering if rating exists */}
                  {currentTestimonial.rating && (
                    <div className="flex mb-3 justify-center md:justify-start">
                      {[...Array(currentTestimonial.rating)].map((_, n) => (
                        <Star 
                          key={n} 
                          className="h-5 w-5 text-primary fill-primary" 
                        />
                      ))}
                    </div>
                  )}
                  
                  <blockquote className="text-white text-lg italic mb-4">
                    "{currentTestimonial.content}"
                  </blockquote>
                  
                  <div>
                    <div className="font-bold text-primary">
                      {currentTestimonial.name}
                    </div>
                    {currentTestimonial.role && (
                      <div className="text-gray-400 text-sm">
                        {currentTestimonial.role}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Indicator Dots - only show if multiple testimonials */}
          {config.testimonials.length > 1 && (
            <div className="flex justify-center mt-6 space-x-2">
              {config.testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`h-3 rounded-full transition-all duration-300 ${
                    currentIndex === index
                      ? 'bg-primary w-6'
                      : 'bg-gray-600 w-3'
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}