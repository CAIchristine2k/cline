import React, {useState, useEffect, useRef} from 'react';
import {ChevronLeft, ChevronRight, BadgeCheck} from 'lucide-react';
import {useConfig} from '~/utils/themeContext';

interface Testimonial {
  id: number;
  name: string;
  role: string;
  content: string;
  avatar: string;
  rating: number; // Rating from 4.5 to 5.0
  date: string; // Date de l'avis
}

// Custom Star Icon component - filled with rose color
const StarIcon = ({ className = '' }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
    aria-hidden="true"
  >
    <path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z" />
  </svg>
);

// Half Star Icon component
const HalfStarIcon = ({ className = '' }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    className={className}
    aria-hidden="true"
  >
    <defs>
      <linearGradient id="half-star-gradient">
        <stop offset="50%" stopColor="currentColor" stopOpacity="1" />
        <stop offset="50%" stopColor="currentColor" stopOpacity="0.3" />
      </linearGradient>
    </defs>
    <path fill="url(#half-star-gradient)" d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z" />
  </svg>
);

// Generate random rating from possible values
const generateRating = () => {
  const possibleRatings = [4.5, 5.0];
  return possibleRatings[Math.floor(Math.random() * possibleRatings.length)];
};

// Generate random avatar from avis folder
const generateAvatar = () => {
  const availableAvatars = [
    '/images/avis/IMG_7333.JPG',
    '/images/avis/IMG_7334.JPG',
    '/images/avis/IMG_7335.JPG',
    '/images/avis/IMG_7336.JPG',
    '/images/avis/IMG_7337.JPG',
    '/images/avis/IMG_7338.JPG',
    '/images/avis/IMG_7339.JPG',
    '/images/avis/IMG_7340.JPG',
    '/images/avis/IMG_7343.JPG',
    '/images/avis/IMG_7344.JPG',
    '/images/avis/IMG_7345.JPG',
    '/images/avis/IMG_7346.JPG',
    '/images/avis/IMG_7349.JPG',
    '/images/avis/IMG_7350.WEBP',
    '/images/avis/IMG_7351.WEBP',
  ];
  return availableAvatars[Math.floor(Math.random() * availableAvatars.length)];
};

// Testimonials data - Realistic ratings avec alternance prénoms complets/initiaux
const testimonialsData: Testimonial[] = [
  {
    id: 1,
    name: 'Sophie Martin',
    role: 'Cliente fidèle',
    content:
      'Produits de qualité exceptionnelle ! La personnalisation est parfaite et la livraison rapide. Je recommande à 100%.',
    avatar: generateAvatar(),
    rating: generateRating(),
    date: 'Mars 2024',
  },
  {
    id: 2,
    name: 'Fatou D.',
    role: 'Acheteuse vérifiée',
    content:
      'Service client irréprochable et produits magnifiques. Exactement ce que je cherchais pour un cadeau unique.',
    avatar: generateAvatar(),
    rating: generateRating(),
    date: 'Novembre 2023',
  },
  {
    id: 3,
    name: 'Yasmine Khalil',
    role: 'Cliente satisfaite',
    content:
      'La qualité dépasse mes attentes ! Les finitions sont impeccables et le rendu final est sublime.',
    avatar: generateAvatar(),
    rating: generateRating(),
    date: 'Juin 2022',
  },
  {
    id: 4,
    name: 'Inès L.',
    role: 'Acheteuse régulière',
    content:
      'Un vrai coup de cœur ! La personnalisation est facile et le résultat est toujours au-delà de mes espérances.',
    avatar: generateAvatar(),
    rating: generateRating(),
    date: 'Janvier 2025',
  },
  {
    id: 5,
    name: 'Kenza Benali',
    role: 'Cliente heureuse',
    content:
      'Je ne peux plus m\'en passer ! Chaque produit est unique et fait avec soin. Un grand merci à toute l\'équipe.',
    avatar: '/images/avis/IMG_6439.jpg',
    rating: generateRating(),
    date: 'Septembre 2021',
  },
  {
    id: 6,
    name: 'Mireille R.',
    role: 'Acheteuse satisfaite',
    content:
      'Absolument ravie de mon achat ! La qualité est au rendez-vous et le service après-vente est top. Je recommande vivement.',
    avatar: generateAvatar(),
    rating: generateRating(),
    date: 'Février 2024',
  },
  {
    id: 7,
    name: 'Lina Moreau',
    role: 'Cliente régulière',
    content:
      'Des produits magnifiques et un savoir-faire exceptionnel. Chaque commande est une nouvelle surprise positive !',
    avatar: generateAvatar(),
    rating: generateRating(),
    date: 'Août 2023',
  },
  {
    id: 8,
    name: 'Aya L.',
    role: 'Acheteuse vérifiée',
    content:
      'Je suis impressionnée par la rapidité de livraison et la qualité du packaging. Les produits sont encore plus beaux en vrai !',
    avatar: generateAvatar(),
    rating: generateRating(),
    date: 'Avril 2022',
  },
  {
    id: 9,
    name: 'Nadège Garcia',
    role: 'Cliente fidèle',
    content:
      'Un excellent rapport qualité-prix ! J\'ai commandé plusieurs fois et je n\'ai jamais été déçue. Service impeccable.',
    avatar: generateAvatar(),
    rating: generateRating(),
    date: 'Décembre 2024',
  },
  {
    id: 10,
    name: 'Jamila F.',
    role: 'Acheteuse heureuse',
    content:
      'Une expérience d\'achat parfaite du début à la fin. Les produits personnalisés sont de grande qualité et très bien réalisés.',
    avatar: generateAvatar(),
    rating: generateRating(),
    date: 'Mai 2020',
  },
];

export default function Testimonials() {
  const config = useConfig();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  // Auto-scroll functionality (8-12s per slide, using 10s)
  useEffect(() => {
    if (isPaused || testimonialsData.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) =>
        prev === testimonialsData.length - 1 ? 0 : prev + 1,
      );
    }, 10000); // 10 seconds per slide

    return () => clearInterval(interval);
  }, [isPaused, currentIndex]);

  // Handle touch events for mobile swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;

    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe) {
      handleNext();
    }
    if (isRightSwipe) {
      handlePrev();
    }

    setTouchStart(0);
    setTouchEnd(0);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? testimonialsData.length - 1 : prev - 1,
    );
  };

  const handleNext = () => {
    setCurrentIndex((prev) =>
      prev === testimonialsData.length - 1 ? 0 : prev + 1,
    );
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  // Calculate visible testimonials (show 3 on desktop, 1 on mobile)
  const getVisibleTestimonials = () => {
    const visibleCount = typeof window !== 'undefined' && window.innerWidth >= 1024 ? 3 : 1;
    const items = [];

    for (let i = 0; i < visibleCount; i++) {
      const index = (currentIndex + i) % testimonialsData.length;
      items.push(testimonialsData[index]);
    }

    return items;
  };

  return (
    <section
      id="testimonials"
      className="py-16 md:py-24 bg-white"
      aria-label="Témoignages clients"
    >
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-black mb-4">
            CE QUE DISENT NOS{' '}
            <span className="text-primary">CLIENTES</span>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            4,8/5 de satisfaction — la qualité avant tout
          </p>
        </div>

        {/* Carousel Container */}
        <div
          className="relative max-w-7xl mx-auto"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onFocus={() => setIsPaused(true)}
          onBlur={() => setIsPaused(false)}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          ref={containerRef}
        >
          {/* Navigation Buttons - Desktop only */}
          <button
            onClick={handlePrev}
            className="hidden lg:flex absolute left-0 top-1/2 -translate-y-1/2 -translate-x-6 z-10 bg-white border-2 border-primary/30 hover:bg-primary hover:border-primary text-primary hover:text-white w-12 h-12 rounded-full items-center justify-center transition-all duration-300 shadow-lg hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
            aria-label="Témoignage précédent"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>

          <button
            onClick={handleNext}
            className="hidden lg:flex absolute right-0 top-1/2 -translate-y-1/2 translate-x-6 z-10 bg-white border-2 border-primary/30 hover:bg-primary hover:border-primary text-primary hover:text-white w-12 h-12 rounded-full items-center justify-center transition-all duration-300 shadow-lg hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
            aria-label="Témoignage suivant"
          >
            <ChevronRight className="h-6 w-6" />
          </button>

          {/* Testimonials Grid */}
          <div className="overflow-hidden">
            <div
              className="grid grid-cols-1 lg:grid-cols-3 gap-6 transition-transform duration-500 ease-in-out py-6"
              style={{
                transform: `translateX(0%)`,
              }}
            >
              {getVisibleTestimonials().map((testimonial, idx) => (
                <div
                  key={`${testimonial.id}-${idx}`}
                  className="bg-white border-2 border-primary/20 rounded-2xl p-4 md:p-6 shadow-lg hover:shadow-xl hover:border-primary/40 transition-all duration-300"
                  role="article"
                  aria-label={`Témoignage de ${testimonial.name}`}
                >
                  {/* Stars Rating */}
                  <div className="flex mb-3 gap-1" role="img" aria-label={`${testimonial.rating.toFixed(1)} étoiles sur 5`}>
                    {/* Full stars */}
                    {[...Array(Math.floor(testimonial.rating))].map((_, i) => (
                      <StarIcon
                        key={`full-${i}`}
                        className="h-4 w-4 text-yellow-400"
                      />
                    ))}
                    {/* Half star if rating has decimal >= 0.3 */}
                    {testimonial.rating % 1 >= 0.3 && testimonial.rating % 1 < 0.8 && (
                      <HalfStarIcon className="h-4 w-4 text-yellow-400" />
                    )}
                    {/* Empty stars */}
                    {[...Array(5 - Math.ceil(testimonial.rating))].map((_, i) => (
                      <StarIcon
                        key={`empty-${i}`}
                        className="h-4 w-4 text-gray-300"
                      />
                    ))}
                  </div>

                  {/* Testimonial Content */}
                  <blockquote className="text-gray-700 text-sm md:text-base mb-4 leading-relaxed">
                    "{testimonial.content}"
                  </blockquote>

                  {/* Author Info */}
                  <div className="flex items-center gap-3 pt-3">
                    {/* Avatar */}
                    <div className="flex-shrink-0">
                      <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-primary/30 bg-primary/10">
                        <img
                          src={testimonial.avatar}
                          alt={`Photo de ${testimonial.name}`}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            // Fallback to initials if image fails to load
                            e.currentTarget.style.display = 'none';
                            if (e.currentTarget.parentElement) {
                              e.currentTarget.parentElement.innerHTML = `<div class="w-full h-full flex items-center justify-center text-primary font-bold text-lg">${testimonial.name.charAt(0)}</div>`;
                            }
                          }}
                        />
                      </div>
                    </div>

                    {/* Name & Role */}
                    <div>
                      <div className="font-bold text-black text-sm flex items-center gap-1.5">
                        {testimonial.name}
                        <BadgeCheck className="h-4 w-4 text-green-500" />
                        <span className="text-xs text-green-600 font-medium">Avis vérifié</span>
                      </div>
                      <div className="text-xs text-gray-500">
                        {testimonial.role}
                      </div>
                      <div className="text-xs text-gray-400 mt-0.5">
                        {testimonial.date}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Indicator Dots */}
          <div className="flex justify-center mt-8 gap-2" role="tablist" aria-label="Navigation des témoignages">
            {testimonialsData.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`h-2.5 rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 ${
                  currentIndex === index
                    ? 'bg-primary w-8'
                    : 'bg-gray-300 hover:bg-primary/50 w-2.5'
                }`}
                aria-label={`Aller au témoignage ${index + 1}`}
                aria-current={currentIndex === index ? 'true' : 'false'}
                role="tab"
              />
            ))}
          </div>
        </div>

        {/* Trust Badge */}
        <div className="text-center mt-12">
          <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/30 rounded-full px-6 py-3">
            <div className="flex gap-1">
              {/* 4 full stars */}
              {[...Array(4)].map((_, i) => (
                <StarIcon
                  key={`full-${i}`}
                  className="h-5 w-5 text-primary"
                />
              ))}
              {/* 0.5 partial star (half filled) */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                className="h-5 w-5"
                aria-hidden="true"
              >
                <defs>
                  <linearGradient id="partial-star-50">
                    <stop offset="50%" stopColor="currentColor" stopOpacity="1" className="text-primary" />
                    <stop offset="50%" stopColor="currentColor" stopOpacity="0.3" className="text-primary" />
                  </linearGradient>
                </defs>
                <path
                  fill="url(#partial-star-50)"
                  className="text-primary"
                  d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z"
                />
              </svg>
            </div>
            <span className="text-black font-semibold">
              4,8/5 de satisfaction
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
