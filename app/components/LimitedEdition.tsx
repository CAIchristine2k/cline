import React, {useState, useEffect} from 'react';
import {ArrowRight} from 'lucide-react';
import {Link} from 'react-router';
import {useConfig} from '~/utils/themeContext';

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export default function LimitedEdition() {
  const config = useConfig();
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  // Skip rendering if limited edition section is disabled in config
  if (!config.showLimitedEdition || !config.limitedEdition) {
    return null;
  }

  useEffect(() => {
    if (!config.limitedEdition) return;

    // Set timer to midnight (24h countdown that resets daily)
    const updateTimer = () => {
      const now = new Date();
      const midnight = new Date();
      midnight.setHours(24, 0, 0, 0);

      const difference = midnight.getTime() - now.getTime();

      if (difference <= 0) {
        setTimeLeft({days: 0, hours: 0, minutes: 0, seconds: 0});
        return;
      }

      setTimeLeft({
        days: 0, // Always 0 for 24h timer
        hours: Math.floor(difference / (1000 * 60 * 60)),
        minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((difference % (1000 * 60)) / 1000),
      });
    };

    // Run once immediately
    updateTimer();

    // Then set up interval
    const timer = setInterval(updateTimer, 1000);

    return () => clearInterval(timer);
  }, [config.limitedEdition]);

  return (
    <section id="fete-offer" className="py-16 md:py-24 relative">
      {/* Dégradé rose pastel */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-white/90 to-accent/30 z-10"></div>

      {/* Image d'arrière-plan (remplace par une photo de produit festive) */}
      <div
        className="absolute inset-0 bg-cover bg-center z-0"
        style={{
          backgroundImage: `url('/images/astuce.png')`,
          backgroundAttachment: 'fixed',
        }}
      ></div>

      <div className="container mx-auto px-4 relative z-20">
        <div className="max-w-4xl mx-auto text-center">

          {/* Badge */}
          <div className="inline-block bg-primary text-black text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider mb-6">
            🎁 Offre Spéciale des Fêtes
          </div>

          {/* Titre principal */}
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-black">
            Sublimez vos Fêtes avec <br />
            <span className="text-primary hero-title-glow">C'LINE HAIR</span>
          </h2>

          {/* Sous-texte */}
          <p className="text-lg md:text-xl opacity-90 mb-8 max-w-xl mx-auto text-black">
            Offrez-vous la chevelure de vos rêves à prix magique ✨
            Jusqu'à <span className="text-black font-bold">-30%</span> sur nos extensions, perruques et bundles 100% naturels.
          </p>

          {/* Timer - 24h countdown */}
          <div className="flex flex-wrap justify-center gap-3 md:gap-6 mb-10">
            <div className="bg-white/80 backdrop-blur-sm border border-primary/30 rounded-sm p-4 text-center">
              <div className="text-primary text-3xl font-bold drop-shadow-[0_0_10px_rgba(var(--color-primary-rgb),0.5)]">
                {String(timeLeft.hours).padStart(2, '0')}
              </div>
              <div className="text-black text-sm tracking-wider">HEURES</div>
            </div>
            <div className="bg-white/80 backdrop-blur-sm border border-primary/30 rounded-sm p-4 text-center">
              <div className="text-primary text-3xl font-bold drop-shadow-[0_0_10px_rgba(var(--color-primary-rgb),0.5)]">
                {String(timeLeft.minutes).padStart(2, '0')}
              </div>
              <div className="text-black text-sm tracking-wider">MINUTES</div>
            </div>
            <div className="bg-white/80 backdrop-blur-sm border border-primary/30 rounded-sm p-4 text-center">
              <div className="text-primary text-3xl font-bold drop-shadow-[0_0_10px_rgba(var(--color-primary-rgb),0.5)]">
                {String(timeLeft.seconds).padStart(2, '0')}
              </div>
              <div className="text-black text-sm tracking-wider">SECONDES</div>
            </div>
          </div>

          {/* CTA Button */}
          <Link
            to="/collections/fete-offer"
            className="bg-primary hover:bg-primary-600 text-black font-bold py-4 px-8 rounded-sm transition-all duration-300 inline-flex items-center group shadow-glow"
          >
            DÉCOUVRIR L'OFFRE
            <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>

      {/* Add the CSS styles */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
          .hero-title-glow {
            text-shadow: 0 0 15px rgba(var(--color-primary-rgb), 0.4);
          }

          .shadow-glow {
            box-shadow: 0 4px 20px rgba(var(--color-primary-rgb), 0.25);
          }
        `,
        }}
      />
    </section>
  );
}
