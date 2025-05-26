import React, { useState, useEffect } from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router';
import { defaultConfig, type LandingPageConfig } from '~/utils/config';
import TimeUnit from './TimeUnit';

interface LimitedEditionProps {
  config?: LandingPageConfig;
}

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export default function LimitedEdition({ config = defaultConfig }: LimitedEditionProps) {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  // Skip rendering if limited edition section is disabled in config
  if (!config.showLimitedEdition || !config.limitedEdition) {
    return null;
  }

  useEffect(() => {
    if (!config.limitedEdition) return;

    const endDate = new Date(config.limitedEdition.endDate);
    
    const updateTimer = () => {
      const now = new Date();
      const difference = endDate.getTime() - now.getTime();

      if (difference <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      setTimeLeft({
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((difference % (1000 * 60)) / 1000)
      });
    };

    // Run once immediately
    updateTimer();

    // Then set up interval
    const timer = setInterval(updateTimer, 1000);

    return () => clearInterval(timer);
  }, [config.limitedEdition]);

  const timeUnits = [
    { value: timeLeft.days, label: 'Days' },
    { value: timeLeft.hours, label: 'Hours' },
    { value: timeLeft.minutes, label: 'Minutes' },
    { value: timeLeft.seconds, label: 'Seconds' }
  ];

  return (
    <section id="limited" className="py-16 md:py-24 relative">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/90 to-black/70 z-10"></div>
      <div 
        className="absolute inset-0 bg-cover bg-center z-0"
        style={{
          backgroundImage: `url('/images/limited-edition.jpg')`,
          backgroundAttachment: 'fixed',
        }}
      ></div>

      <div className="container mx-auto px-4 relative z-20">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-block bg-primary text-black text-xs font-bold px-2 py-1 rounded-full uppercase tracking-wider mb-6">
            LIMITED TIME OFFER
          </div>

          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            {config.limitedEdition.title}
            <br />
            <span className="text-primary">SIGNED EDITION</span>
          </h2>

          <p className="text-lg md:text-xl opacity-80 mb-8 max-w-xl mx-auto">
            {config.limitedEdition.description}
          </p>

          <div className="flex flex-wrap justify-center gap-3 md:gap-6 mb-10">
            {timeUnits.map((unit, index) => (
              <TimeUnit key={index} value={unit.value} label={unit.label} />
            ))}
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-4">
            <div className="text-lg md:text-xl font-bold">
              <span className="text-gray-400 line-through">{config.limitedEdition.originalPrice}</span>
              <span className="text-primary ml-3">
                {config.limitedEdition.salePrice}
              </span>
            </div>
          </div>

          <Link 
            to={`/products/${config.limitedEdition.productHandle}`}
            className="bg-primary hover:bg-primary-600 text-black font-bold py-2.5 px-5 rounded-sm transition-all duration-300 inline-flex items-center group shadow-glow"
          >
            SHOP LIMITED EDITION
            <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </section>
  );
}
