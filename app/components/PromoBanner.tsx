import React, {useState, useEffect} from 'react';

export function PromoBanner() {
  const [timeLeft, setTimeLeft] = useState({hours: 0, minutes: 0, seconds: 0});

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date();
      const midnight = new Date();
      midnight.setHours(24, 0, 0, 0);

      const diff = midnight.getTime() - now.getTime();

      const hours = Math.floor(diff / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);

      setTimeLeft({hours, minutes, seconds});
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, []);

  const promoItems = [
    '🚚 Livraison offerte à partir de 50€',
    '⚡ Offre flash jusqu\'à -40%',
    `⏰ ${String(timeLeft.hours).padStart(2, '0')}:${String(timeLeft.minutes).padStart(2, '0')}:${String(timeLeft.seconds).padStart(2, '0')}`,
  ];

  return (
    <div className="overflow-hidden relative w-full" style={{backgroundColor: '#f5a6c6'}} role="banner" aria-label="Bannière promotionnelle">
      <div className="promo-scroll-container">
        <div className="promo-scroll-content">
          {/* Première série */}
          {promoItems.map((item, index) => (
            <span
              key={`set1-${index}`}
              className="text-black font-medium text-sm uppercase tracking-wide px-6 inline-block"
            >
              {item}
            </span>
          ))}
          {/* Deuxième série (pour continuité) */}
          {promoItems.map((item, index) => (
            <span
              key={`set2-${index}`}
              className="text-black font-medium text-sm uppercase tracking-wide px-6 inline-block"
            >
              {item}
            </span>
          ))}
        </div>
      </div>

      <style dangerouslySetInnerHTML={{
        __html: `
          .promo-scroll-container {
            display: flex;
            width: 100%;
            overflow: hidden;
            padding: 0.5rem 0;
          }

          .promo-scroll-content {
            display: flex;
            white-space: nowrap;
            animation: scroll-infinite 20s linear infinite;
            will-change: transform;
          }

          @keyframes scroll-infinite {
            0% {
              transform: translateX(0);
            }
            100% {
              transform: translateX(-50%);
            }
          }

          /* Pause on hover for desktop */
          @media (min-width: 768px) {
            .promo-scroll-content:hover {
              animation-play-state: paused;
            }
          }
        `
      }} />
    </div>
  );
}
