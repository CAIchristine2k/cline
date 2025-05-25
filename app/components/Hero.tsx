import React, { useEffect, useRef } from 'react';
import { ShoppingBag, Trophy } from 'lucide-react';
import { Link } from 'react-router';
import { useConfig } from '~/utils/themeContext';

export function Hero() {
  // Get config from context instead of props
  const config = useConfig();
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 0.8;
    }
  }, []);

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Video/Image Background with Overlay - follows Vue template structure */}
      <div className="absolute inset-0 z-0">
        {config.heroVideoUrl ? (
          <video
            ref={videoRef}
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover"
          >
            <source src={config.heroVideoUrl} type="video/mp4" />
            {/* Fallback to image if video doesn't load */}
            <img 
              src={config.heroBackgroundImage} 
              alt={config.influencerName} 
              className="absolute inset-0 w-full h-full object-cover"
            />
          </video>
        ) : (
          <img 
            src={config.heroBackgroundImage} 
            alt={config.influencerName} 
            className="absolute inset-0 w-full h-full object-cover"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-black/90 z-10"></div>
      </div>

      {/* Hero Content - closely matches Vue template structure */}
      <div className="relative container mx-auto px-4 z-20 py-20">
        <div className="max-w-3xl">
          <div className="inline-block bg-primary text-black font-bold py-1 px-4 mb-6 tracking-wider rounded-sm">
            {config.influencerTitle}
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            <span className="text-white">THE LEGACY OF</span>
            <br />
            <span className="text-primary tracking-wider hero-title-glow">
              {config.brandName}
            </span>
          </h1>

          <p className="text-lg md:text-xl text-gray-200 mb-10 max-w-xl leading-relaxed">
            {config.heroSubtitle}
          </p>

          <div className="flex flex-col sm:flex-row gap-5">
            <Link
              to={config.ctaLink}
              className="group bg-primary hover:bg-primary-400 text-black font-bold py-4 px-8 rounded-sm transition-all duration-300 flex items-center justify-center sm:justify-start shadow-glow"
            >
              {config.ctaText}
              <ShoppingBag className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Link>

            <Link
              to="#career"
              className="group bg-transparent border-2 border-white hover:border-primary text-white hover:text-primary font-bold py-4 px-8 rounded-sm transition-all duration-300 flex items-center justify-center sm:justify-start"
            >
              EXPLORE CAREER
              <Trophy className="ml-2 h-5 w-5 transition-transform group-hover:translate-y-[-2px]" />
            </Link>
          </div>
          
          {/* Boxing statistics badges - directly from Vue template */}
          <div className="mt-16 mb-16 md:mb-24 grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="bg-black/60 backdrop-blur-sm border border-primary/30 p-4 rounded-sm text-center transform transition-transform hover:scale-105 hover:border-primary/80">
              <div className="text-primary text-3xl font-bold hero-stat-glow">
                49
              </div>
              <div className="text-white text-sm tracking-wider">CAREER WINS</div>
            </div>
            <div className="bg-black/60 backdrop-blur-sm border border-primary/30 p-4 rounded-sm text-center transform transition-transform hover:scale-105 hover:border-primary/80">
              <div className="text-primary text-3xl font-bold hero-stat-glow">
                41
              </div>
              <div className="text-white text-sm tracking-wider">KOs</div>
            </div>
            <div className="bg-black/60 backdrop-blur-sm border border-primary/30 p-4 rounded-sm text-center transform transition-transform hover:scale-105 hover:border-primary/80">
              <div className="text-primary text-3xl font-bold hero-stat-glow">
                9
              </div>
              <div className="text-white text-sm tracking-wider">WORLD TITLES</div>
            </div>
            <div className="bg-black/60 backdrop-blur-sm border border-primary/30 p-4 rounded-sm text-center transform transition-transform hover:scale-105 hover:border-primary/80">
              <div className="text-primary text-3xl font-bold hero-stat-glow">
                3
              </div>
              <div className="text-white text-sm tracking-wider">WEIGHT DIVISIONS</div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex flex-col items-center animate-pulse z-30 md:bottom-8">
          <span className="text-white text-xs mb-2 tracking-widest">SCROLL DOWN</span>
          <div className="w-0.5 h-12 bg-primary"></div>
        </div>
      </div>
      
      {/* Add the CSS styles directly to match Vue template */}
      <style dangerouslySetInnerHTML={{
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
        `
      }} />
    </section>
  );
}