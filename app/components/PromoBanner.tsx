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
    <div className="bg-primary overflow-x-hidden relative w-full max-w-full">
      <div className="flex animate-scroll whitespace-nowrap py-2">
        {[...promoItems, ...promoItems, ...promoItems, ...promoItems].map((item, index) => (
          <span
            key={index}
            className="text-black font-medium text-sm uppercase tracking-wide px-6"
          >
            {item}
          </span>
        ))}
      </div>

      <style dangerouslySetInnerHTML={{
        __html: `
          @keyframes scroll {
            0% {
              transform: translateX(0);
            }
            100% {
              transform: translateX(-25%);
            }
          }

          .animate-scroll {
            animation: scroll 30s linear infinite;
            will-change: transform;
          }

          .animate-scroll:hover {
            animation-play-state: paused;
          }
        `
      }} />
    </div>
  );
}
