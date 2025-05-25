import React, { useEffect, useRef } from 'react';
import { ShoppingBag, Trophy } from 'lucide-react';
import { Link } from 'react-router';
import { useConfig } from '~/utils/themeContext';
import { cssVars } from '~/lib/themeConfig';
import { buttonStyles, sectionStyles, cardStyles, accentStyles, inlineStyles, animationStyles } from '~/utils/styleUtils';
import { LandingPageConfig, defaultConfig } from '~/lib/config';

interface HeroProps {
  config?: LandingPageConfig;
}

export function Hero({ config: propConfig }: HeroProps = {}) {
  // Use config from props if provided, otherwise use the context
  const contextConfig = useConfig();
  const config = propConfig || contextConfig;

  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 0.8;
    }
  }, []);

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Video/Image Background */}
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
        <div className={`absolute inset-0 ${accentStyles.overlay} z-10`}></div>
      </div>

      {/* Hero Content */}
      <div className={`relative ${sectionStyles.container} z-20 py-20`}>
        <div className="max-w-3xl">
          <div className="inline-block bg-primary text-black font-bold py-1 px-4 mb-6 tracking-wider rounded-sm">
            {config.influencerTitle}
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            <span className="text-white">THE LEGACY OF</span>
            <br />
            <span className={`${accentStyles.primaryText} tracking-wider ${accentStyles.glowText}`}>
              {config.brandName}
            </span>
          </h1>

          <p className="text-lg md:text-xl text-gray-200 mb-10 max-w-xl leading-relaxed">
            {config.heroSubtitle}
          </p>

          <div className="flex flex-col sm:flex-row gap-5">
            <Link
              to={config.ctaLink}
              className={`${buttonStyles.primary} group shadow-glow`}
              style={inlineStyles.primaryBackgroundWithText}
            >
              {config.ctaText}
              <ShoppingBag className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Link>

            <Link
              to="#career"
              className={`${buttonStyles.secondary} group`}
              style={inlineStyles.hoverPrimary as React.CSSProperties}
            >
              EXPLORE CAREER
              <Trophy className="ml-2 h-5 w-5 transition-transform group-hover:translate-y-[-2px]" />
            </Link>
          </div>
          
          {/* Boxing statistics badges - directly from Vue template */}
          <div className="mt-16 mb-16 md:mb-24 grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div 
              className={cardStyles.stat}
              style={inlineStyles.primaryWithOpacity(0.3)}
            >
              <div 
                className={`${accentStyles.primaryText} text-3xl font-bold ${accentStyles.glowText}`}
                style={inlineStyles.primaryText}
              >
                49
              </div>
              <div className="text-white text-sm tracking-wider">CAREER WINS</div>
            </div>
            <div 
              className={cardStyles.stat}
              style={inlineStyles.primaryWithOpacity(0.3)}
            >
              <div 
                className={`${accentStyles.primaryText} text-3xl font-bold ${accentStyles.glowText}`}
                style={inlineStyles.primaryText}
              >
                41
              </div>
              <div className="text-white text-sm tracking-wider">KOs</div>
            </div>
            <div 
              className={cardStyles.stat}
              style={inlineStyles.primaryWithOpacity(0.3)}
            >
              <div 
                className={`${accentStyles.primaryText} text-3xl font-bold ${accentStyles.glowText}`}
                style={inlineStyles.primaryText}
              >
                9
              </div>
              <div className="text-white text-sm tracking-wider">WORLD TITLES</div>
            </div>
            <div 
              className={cardStyles.stat}
              style={inlineStyles.primaryWithOpacity(0.3)}
            >
              <div 
                className={`${accentStyles.primaryText} text-3xl font-bold ${accentStyles.glowText}`}
                style={inlineStyles.primaryText}
              >
                3
              </div>
              <div className="text-white text-sm tracking-wider">WEIGHT DIVISIONS</div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className={`absolute bottom-4 left-1/2 transform -translate-x-1/2 flex flex-col items-center ${animationStyles.fadeIn} z-30 md:bottom-8`}>
          <span className="text-white text-xs mb-2 tracking-widest">SCROLL DOWN</span>
          <div className="w-0.5 h-12 bg-primary" style={inlineStyles.primaryBackground}></div>
        </div>
      </div>
    </section>
  );
}